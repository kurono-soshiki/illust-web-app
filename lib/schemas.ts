import { z } from "zod";

/**
 * クリエイター登録スキーマ（管理者のみが使用）
 * 注: サイトからの直接登録は無効
 */
export const registerCreatorSchema = z.object({
  username: z
    .string()
    .min(3, "ユーザー名は3文字以上で入力してください")
    .max(20, "ユーザー名は20文字以内で入力してください")
    .regex(/^[a-zA-Z0-9_-]+$/, "ユーザー名は英数字、ハイフン、アンダースコアのみ使用可能です"),
  email: z
    .string()
    .email("有効なメールアドレスを入力してください"),
  password: z
    .string()
    .min(8, "パスワードは8文字以上で入力してください")
    .max(100, "パスワードは100文字以内で入力してください"),
  displayName: z
    .string()
    .min(1, "表示名を入力してください")
    .max(50, "表示名は50文字以内で入力してください"),
  bio: z
    .string()
    .max(500, "自己紹介は500文字以内で入力してください")
    .optional(),
  website: z
    .string()
    .url("有効なURLを入力してください")
    .optional(),
});

/**
 * ログインスキーマ
 */
export const loginSchema = z.object({
  email: z
    .string()
    .email("有効なメールアドレスを入力してください"),
  password: z
    .string()
    .min(1, "パスワードを入力してください"),
});

/**
 * 作品投稿スキーマ
 */
export const createPostSchema = z.object({
  title: z
    .string()
    .min(1, "タイトルを入力してください")
    .max(100, "タイトルは100文字以内で入力してください"),
  description: z
    .string()
    .max(1000, "説明は1000文字以内で入力してください")
    .optional(),
  tags: z
    .array(z.string())
    .max(10, "タグは10個まで設定できます")
    .optional(),
  category: z
    .enum(["イラスト", "漫画", "その他"])
    .default("イラスト"),
  isPublic: z.boolean().default(true),
});

/**
 * クリエイタープロフィール更新スキーマ
 */
export const updateProfileSchema = z.object({
  displayName: z
    .string()
    .min(1, "表示名を入力してください")
    .max(50, "表示名は50文字以内で入力してください"),
  bio: z
    .string()
    .max(500, "自己紹介は500文字以内で入力してください")
    .optional(),
  website: z
    .string()
    .url("有効なURLを入力してください")
    .optional(),
  socialLinks: z
    .record(z.string().url("有効なURLを入力してください"))
    .optional(),
});

/**
 * 型定義
 */
export type RegisterCreatorInput = z.infer<typeof registerCreatorSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type CreatePostInput = z.infer<typeof createPostSchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;

/**
 * DynamoDBドキュメント型定義
 */
export interface CreatorDocument {
  pk: string; // CREATOR#{creatorId}
  sk: string; // CREATOR#{creatorId}
  gsi1pk: string; // EMAIL#{email}
  gsi1sk: string; // CREATOR#{creatorId}
  gsi2pk: string; // USERNAME#{username}
  gsi2sk: string; // CREATOR#{creatorId}
  creatorId: string;
  username: string;
  email: string;
  displayName: string;
  passwordHash: string;
  avatarUrl?: string;
  bio?: string;
  website?: string;
  socialLinks?: Record<string, string>;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PostDocument {
  pk: string; // CREATOR#{creatorId}
  sk: string; // POST#{postId}
  gsi1pk: string; // POST#{postId}
  gsi1sk: string; // POST#{postId}
  gsi2pk: string; // POSTS_BY_DATE
  gsi2sk: string; // {createdAt}#{postId}
  postId: string;
  creatorId: string;
  title: string;
  description?: string;
  imageUrl: string;
  imageKey: string;
  thumbnailUrl?: string;
  tags?: string[];
  category: "イラスト" | "漫画" | "その他";
  isPublic: boolean;
  viewsCount: number;
  createdAt: string;
  updatedAt: string;
}
