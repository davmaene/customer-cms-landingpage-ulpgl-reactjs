interface StaffMember {
    uuid: string | number;
    slug: string;
    name: string;
    role: string;
    email?: string[];
    phone?: string[];
    description?: string;
    image?: string;
    isOrganizer?: boolean;
    extra?: {
        bibliography?: string;
        researchInterests?: string[];
        publications?: string[];
        cv?: string;
    };
    socialLinks?: { platform: string; url: string }[];
}

interface Laureat {
    numero: number;
    nom: string;
    annee: number;
    option: string;
    pourcentage: number;
}

interface Center {
    flug: string;
    title: string;
    direction?: StaffMember;
    images?: string[];
    href: string;
    description: string;
    profile?: string;
    domaineInterventions: string[];
    etudesRealisees?: string[];
    partenaires?: string[];
    contacts?: string[];
    testmonials?: { quote: string; author: string; role: string; imageProfile?: string }[];
}

type InputFormat = 'email' | 'phone' | 'url' | 'unknown';
interface KeysFacts {
    title: string;
    value: string;
}

interface Faculty {
    faculte: string;
    href: string;
    filiaires: { filiere: string }[];
}

interface Domaine {
    domaine: string;
    faculties: Faculty[];
}

interface Post {
    id: number;
    post_author: string;
    post_date: string;
    post_date_gmt?: string;
    post_content: string;
    post_title: string;
    post_category: string;
    post_excerpt: string;
    post_status?: string;
    comment_status?: boolean;
    ping_status?: string;
    post_password?: string;
    post_name: string;
    to_ping?: string;
    pinged?: string;
    post_modified?: string;
    post_modified_gmt?: string;
    post_content_filtered?: string;
    post_parent?: number;
    guid?: string;
    menu_order?: number;
    post_type?: string;
    post_mime_type?: string;
    comment_count?: number;
    post_image?: string;
    post_attached_images?: string[];
}

interface Activity {
    id: number;
    name: string;
    category: string;
    description: string;
    link: string;
}

interface SubItem {
    label: string;
    href: string;
    icon?: React.ReactNode;
    subItems?: SubItem[];
    state?: any;
}

interface NavItemProps {
    href: string;
    label: string;
    hasPlus?: boolean;
    color?: string;
    icon?: React.ReactNode;
    subItems?: SubItem[];
    isSubMenu?: boolean;
    state?: any;
    onClick?: () => void;
}

interface FAQItemProps {
    number: string;
    question: string;
    answer: string;
}

interface ReglePret {
    id: number;
    categorie: string;
    nombre_ouvrages: number;
    duree_pret: string;
}

interface DetailsFrais {
    frais_academiques: number;
    releve: number;
    reinscription: number | null;
    carte: number;
    bibliotheque: number;
    coordination: number;
    diplome: number;
    construction: number;
    stage: number;
    jury: number;
}

interface Tranches {
    premiere: number;
    deuxieme: number;
    troisieme: number;
}

interface ItemFrais {
    key: number;
    promotion: string;
    faculte: string;
    details_frais: DetailsFrais;
    total: number;
    tranches: Tranches;
}

interface InfoPaiement {
    key: string;
    typeFrais: string;
    banque: string;
    compte: string;
    note?: string;
}
