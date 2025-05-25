/**
 * クリエイター関連の型定義
 */

export interface Creator {
  userId: string;
  username: string;
  email: string;
  displayName: string;
  avatarUrl?: string;
  bio?: string;
  website?: string;
  socialLinks?: Record<string, string>;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreatorProfile {
  userId: string;
  username: string;
  displayName: string;
  avatarUrl?: string;
  bio?: string;
  website?: string;
  socialLinks?: Record<string, string>;
}

/**
 * 投稿関連の型定義
 */

export interface Post {
  postId: string;
  userId: string; // クリエイターID
  title: string;
  description?: string;
  imageUrl: string;
  thumbnailUrl?: string;
  tags?: string[];
  category: "イラスト" | "漫画" | "その他";
  isPublic: boolean;
  viewsCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface PostSummary {
  postId: string;
  userId: string;
  title: string;
  thumbnailUrl?: string;
  category: "イラスト" | "漫画" | "その他";
  isPublic: boolean;
  viewsCount: number;
  createdAt: string;
}

/**
 * 認証関連の型定義
 */

export interface AuthState {
  isAuthenticated: boolean;
  userId?: string;
  username?: string;
  displayName?: string;
  avatarUrl?: string;
  isLoading: boolean;
  error?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    userId: string;
    username: string;
    displayName: string;
    avatarUrl?: string;
  };
}

/**
 * API関連の型定義
 */

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

/**
 * ダッシュボード関連の型定義
 */

export interface DashboardStats {
  totalViews: number;
  totalPosts: number;
  publicPosts: number;
  draftPosts: number;
}
