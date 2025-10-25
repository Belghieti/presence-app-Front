import axiosInstance from './axios';
import { 
  AuthResponse, 
  LoginRequest, 
  RegisterRequest, 
  User, 
  Session,
  CreateSessionRequest,
  PresenceResponse 
} from '@/types';

// ==================== AUTH ====================
export const authApi = {
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await axiosInstance.post('/auth/login', data);
    return response.data;
  },

  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await axiosInstance.post('/auth/register', data);
    return response.data;
  },

  registerAdmin: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await axiosInstance.post('/auth/register-admin', data);
    return response.data;
  },
};

// ==================== ADMIN ====================
export const adminApi = {
  createSession: async (data: CreateSessionRequest): Promise<Session> => {
    const response = await axiosInstance.post('/admin/sessions', data);
    return response.data;
  },

  lancerSession: async (sessionId: number): Promise<Session> => {
    const response = await axiosInstance.post(`/admin/sessions/${sessionId}/lancer`);
    return response.data;
  },

  terminerSession: async (sessionId: number): Promise<Session> => {
    const response = await axiosInstance.post(`/admin/sessions/${sessionId}/terminer`);
    return response.data;
  },

  validerPresence: async (presenceId: number): Promise<PresenceResponse> => {
    const response = await axiosInstance.post(`/admin/presences/${presenceId}/valider`);
    return response.data;
  },
};

// ==================== USER ====================
export const userApi = {
  getProfil: async (): Promise<User> => {
    const response = await axiosInstance.get('/user/profil');
    return response.data;
  },

  validerMaPresence: async (sessionId: number): Promise<PresenceResponse> => {
    const response = await axiosInstance.post(`/user/sessions/${sessionId}/presence`);
    return response.data;
  },

  getHistorique: async (): Promise<PresenceResponse[]> => {
    const response = await axiosInstance.get('/user/historique');
    return response.data;
  },
};