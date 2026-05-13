import React, { createContext, useContext, useState, useCallback } from "react";
import {
  posts as initialPosts,
  staffMembers as initialStaff,
  centers as initialCenters,
  domainsData as initialDomains,
} from "../utils/utils.statiquedata";
import { randomNumber } from "../utils/utils.fucntions";

interface DataContextType {
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

  domainsData: typeof initialDomains;
  addDomain: (domain: typeof initialDomains[0]) => void;
  updateDomain: (idx: number, domain: Partial<typeof initialDomains[0]>) => void;
  deleteDomain: (idx: number) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>([...initialPosts]);
  const [staffMembers, setStaffMembers] = useState<StaffMember[]>([...initialStaff]);
  const [centers, setCenters] = useState<Center[]>([...initialCenters]);
  const [domainsData, setDomainsData] = useState([...initialDomains]);

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

  const addDomain = useCallback((domain: typeof initialDomains[0]) => {
    setDomainsData((prev) => [...prev, domain]);
  }, []);

  const updateDomain = useCallback((idx: number, updates: Partial<typeof initialDomains[0]>) => {
    setDomainsData((prev) => prev.map((d, i) => (i === idx ? { ...d, ...updates } : d)));
  }, []);

  const deleteDomain = useCallback((idx: number) => {
    setDomainsData((prev) => prev.filter((_, i) => i !== idx));
  }, []);

  return (
    <DataContext.Provider
      value={{
        posts, addPost, updatePost, deletePost,
        staffMembers, addStaffMember, updateStaffMember, deleteStaffMember,
        centers, addCenter, updateCenter, deleteCenter,
        domainsData, addDomain, updateDomain, deleteDomain,
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
