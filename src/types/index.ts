// User Types
export interface User {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  role: 'ADMIN' | 'USER';
  score: number;
  nbAbsences: number;
  isActive: boolean;
  dateCreation: string;
  derniereConnexion?: string;
}

// Auth Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  nom: string;
  prenom: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

// Session Types
export interface Session {
  id: number;
  titre: string;
  description?: string;
  date: string;
  heureDebut: string;
  heureFin: string;
  statut: 'PLANIFIEE' | 'EN_COURS' | 'TERMINEE' | 'ANNULEE';
  points: number;
  dateCreation: string;
  creePar?: User;
}

export interface CreateSessionRequest {
  titre: string;
  description?: string;
  date: string;
  heureDebut: string;
  heureFin: string;
  points?: number;
}

// Presence Types
export interface Presence {
  id: number;
  user: User;
  session: Session;
  statut: 'PRESENT' | 'ABSENT' | 'RETARD' | 'JUSTIFIE';
  heureValidation: string;
  points: number;
  commentaire?: string;
  validePar?: User;
}

export interface PresenceResponse {
  id: number;
  statut: string;
  heureValidation: string;
  points: number;
  session: {
    id: number;
    titre: string;
    date: string;
  };
}

// Attestation Types
export interface Attestation {
  id: number;
  user: User;
  annee: number;
  scoreFinal: number;
  pdfPath?: string;
  dateGeneration: string;
  statut: 'GENEREE' | 'ENVOYEE' | 'TELECHARGEE';
}

// Statistique Types
export interface Statistique {
  id: number;
  user: User;
  totalPresences: number;
  totalAbsences: number;
  totalRetards: number;
  tauxPresence: number;
  derniereMiseAJour: string;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface ApiError {
  message: string;
  status: number;
  errors?: string[];
}

// Dashboard Stats
export interface DashboardStats {
  totalUsers: number;
  totalSessions: number;
  sessionEnCours?: Session;
  tauxPresence: number;
}