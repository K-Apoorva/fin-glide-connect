export type UserRole = 'student' | 'professional' | 'high_networth' | 'retiree' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
  lastLogin?: string;
  financialProfile?: {
    income: number;
    expenses: number;
    savings: number;
    investmentGoals: string[];
    riskTolerance: 'low' | 'medium' | 'high';
  };
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData extends LoginCredentials {
  name: string;
  role: UserRole;
  confirmPassword: string;
}
