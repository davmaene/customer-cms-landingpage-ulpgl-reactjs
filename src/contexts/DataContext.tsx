import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import {
  fetchPosts, fetchStaff, fetchCenters, fetchDomains,
  fetchFaculties, fetchFilieres, fetchFaqs, fetchKeyFacts,
  fetchActivities, fetchCategories
} from "../utils/api";
import {
  posts as fallbackPosts,
  staffMembers as fallbackStaff,
  centers as fallbackCenters,
  domainsData as fallbackDomains,
  faqs as fallbackFaqs,
  keyFacts as fallbackKeyFacts,
  activities as fallbackActivities,
  categoriesArticles as fallbackCategories,
} from "../utils/utils.statiquedata";
import { randomNumber } from "../utils/utils.fucntions";

type DomainItem = typeof fallbackDomains[0];

interface DataContextType {
  loading: boolean;

  posts: Post[];
  addPost: (post: Omit<Post, "id">) => void;
  updatePost: (id: number, post: Partial<Post>) => void;
  deletePost: (id: number) => void;

  staffMembers: StaffMember[];
  addStaffMember: (member: Omit<StaffMember, "uuid">) => void;
  updateStaffMember: (uuid: string | number, member: Partial<StaffMember>) => void;
  deleteStaffMember: (uuid: string | number) => void;

  centers: Center[];
  addCenter: (center: Center) => void;
  updateCenter: (flug: string, center: Partial<Center>) => void;
  deleteCenter: (flug: string) => void;

  domainsData: DomainItem[];
  addDomain: (domain: DomainItem) => void;
  updateDomain: (idx: number, domain: Partial<DomainItem>) => void;
  deleteDomain: (idx: number) => void;

  faqs: FAQItemProps[];
  keyFacts: KeysFacts[];
  activities: Activity[];
  categoriesArticles: { name: string; href: string }[];
}

const DataContext = createContext<DataContextType | undefined>(undefined);

function mapStaff(raw: any): StaffMember {
  return {
    uuid: raw.uuid,
    slug: raw.slug,
    name: raw.name,
    role: raw.role,
    email: raw.email || [],
    phone: raw.phone || [],
    image: raw.image || undefined,
    description: raw.description || undefined,
    isOrganizer: raw.isOrganizer || false,
    extra: {
      bibliography: raw.bibliography || undefined,
      researchInterests: raw.researchInterests || [],
      publications: raw.publications || [],
      cv: raw.cv || undefined,
    },
    socialLinks: raw.socialLinks || [],
  };
}

function mapCenter(raw: any): Center {
  return {
    flug: raw.flug,
    title: raw.title,
    href: raw.href || "",
    description: raw.description || "",
    profile: raw.profile || undefined,
    domaineInterventions: raw.domaineInterventions || [],
    etudesRealisees: raw.etudesRealisees || [],
    partenaires: raw.partenaires || [],
    contacts: raw.contacts || [],
    images: raw.images || [],
    direction: raw.directionName
      ? {
          uuid: raw.uuid,
          name: raw.directionName,
          role: raw.directionRole || "Direction",
          slug: raw.directionSlug || "",
          image: raw.directionImage || undefined,
          description: raw.directionDescription || undefined,
        }
      : undefined,
  };
}

function mapPost(raw: any): Post {
  return {
    id: raw.id || 0,
    post_author: raw.post_author || "Admin",
    post_date: raw.post_date || "",
    post_date_gmt: raw.post_date_gmt || "",
    post_title: raw.post_title || "",
    post_content: raw.post_content || "",
    post_category: raw.post_category || "",
    post_excerpt: raw.post_excerpt || "",
    post_status: raw.post_status || "publish",
    comment_status: raw.comment_status ?? true,
    ping_status: raw.ping_status || "open",
    post_name: raw.post_name || "",
    post_type: raw.post_type || "post",
    comment_count: raw.comment_count || 0,
    post_image: raw.post_image || "",
  };
}

function assembleDomains(
  rawDomains: any[],
  rawFaculties: any[],
  rawFilieres: any[]
): DomainItem[] {
  return rawDomains.map((d: any) => ({
    domaine: d.domaine,
    href: d.href,
    faculties: rawFaculties
      .filter((f: any) => f.domainUuid === d.uuid)
      .map((f: any) => ({
        faculte: f.faculte,
        href: f.href,
        filiaires: rawFilieres
          .filter((fl: any) => fl.facultyUuid === f.uuid)
          .map((fl: any) => ({
            filiere: fl.filiere,
            profil: fl.profil || "",
            responsable: {
              uuid: fl.uuid || randomNumber(),
              name: fl.responsableName || "",
              role: fl.responsableRole || "",
              slug: fl.responsableSlug || "",
            },
            saf: {
              uuid: fl.uuid || randomNumber(),
              name: fl.safName || "",
              role: fl.safRole || "",
              slug: fl.safSlug || "",
            },
          })),
      })),
  }));
}

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<Post[]>([]);
  const [staffMembers, setStaffMembers] = useState<StaffMember[]>([]);
  const [centers, setCenters] = useState<Center[]>([]);
  const [domainsData, setDomainsData] = useState<DomainItem[]>([]);
  const [faqs, setFaqs] = useState<FAQItemProps[]>([]);
  const [keyFacts, setKeyFacts] = useState<KeysFacts[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [categoriesArticles, setCategoriesArticles] = useState<{ name: string; href: string }[]>([]);

  useEffect(() => {
    let cancelled = false;

    async function loadAll() {
      try {
        const [
          rawPosts, rawStaff, rawCenters,
          rawDomains, rawFaculties, rawFilieres,
          rawFaqs, rawKeyFacts, rawActivities, rawCategories,
        ] = await Promise.all([
          fetchPosts(), fetchStaff(), fetchCenters(),
          fetchDomains(), fetchFaculties(), fetchFilieres(),
          fetchFaqs(), fetchKeyFacts(), fetchActivities(), fetchCategories(),
        ]);

        if (cancelled) return;

        setPosts(rawPosts.map(mapPost));
        setStaffMembers(rawStaff.map(mapStaff));
        setCenters(rawCenters.map(mapCenter));
        setDomainsData(assembleDomains(rawDomains, rawFaculties, rawFilieres));
        setFaqs(
          rawFaqs.map((f: any) => ({
            number: f.number || "",
            question: f.question,
            answer: f.answer,
          }))
        );
        setKeyFacts(
          rawKeyFacts.map((k: any) => ({ title: k.title, value: k.value }))
        );
        setActivities(
          rawActivities.map((a: any) => ({
            id: a.id || 0,
            name: a.name,
            category: a.category,
            description: a.description || "",
            link: a.link || "#",
          }))
        );
        setCategoriesArticles(
          rawCategories.map((c: any) => ({ name: c.name, href: c.href }))
        );
      } catch (err) {
        console.warn("API unavailable, using static fallback data:", err);
        if (cancelled) return;
        setPosts([...fallbackPosts]);
        setStaffMembers([...fallbackStaff]);
        setCenters([...fallbackCenters]);
        setDomainsData([...fallbackDomains]);
        setFaqs([...fallbackFaqs]);
        setKeyFacts([...fallbackKeyFacts]);
        setActivities([...fallbackActivities]);
        setCategoriesArticles([...fallbackCategories]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadAll();
    return () => { cancelled = true; };
  }, []);

  // CRUD callbacks (local state mutations for dashboard)
  const addPost = useCallback((post: Omit<Post, "id">) => {
    setPosts((prev) => [{ ...post, id: Math.max(0, ...prev.map((p) => p.id)) + 1 } as Post, ...prev]);
  }, []);

  const updatePost = useCallback((id: number, updates: Partial<Post>) => {
    setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)));
  }, []);

  const deletePost = useCallback((id: number) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const addStaffMember = useCallback((member: Omit<StaffMember, "uuid">) => {
    setStaffMembers((prev) => [{ ...member, uuid: String(randomNumber()) } as StaffMember, ...prev]);
  }, []);

  const updateStaffMember = useCallback((uuid: string | number, updates: Partial<StaffMember>) => {
    setStaffMembers((prev) => prev.map((m) => (m.uuid === uuid ? { ...m, ...updates } : m)));
  }, []);

  const deleteStaffMember = useCallback((uuid: string | number) => {
    setStaffMembers((prev) => prev.filter((m) => m.uuid !== uuid));
  }, []);

  const addCenter = useCallback((center: Center) => {
    setCenters((prev) => [center, ...prev]);
  }, []);

  const updateCenter = useCallback((flug: string, updates: Partial<Center>) => {
    setCenters((prev) => prev.map((c) => (c.flug === flug ? { ...c, ...updates } : c)));
  }, []);

  const deleteCenter = useCallback((flug: string) => {
    setCenters((prev) => prev.filter((c) => c.flug !== flug));
  }, []);

  const addDomain = useCallback((domain: DomainItem) => {
    setDomainsData((prev) => [...prev, domain]);
  }, []);

  const updateDomain = useCallback((idx: number, updates: Partial<DomainItem>) => {
    setDomainsData((prev) => prev.map((d, i) => (i === idx ? { ...d, ...updates } : d)));
  }, []);

  const deleteDomain = useCallback((idx: number) => {
    setDomainsData((prev) => prev.filter((_, i) => i !== idx));
  }, []);

  return (
    <DataContext.Provider
      value={{
        loading,
        posts, addPost, updatePost, deletePost,
        staffMembers, addStaffMember, updateStaffMember, deleteStaffMember,
        centers, addCenter, updateCenter, deleteCenter,
        domainsData, addDomain, updateDomain, deleteDomain,
        faqs, keyFacts, activities, categoriesArticles,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
