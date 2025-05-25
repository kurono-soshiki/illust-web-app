import { NextRequest } from "next/server";
import { loginSchema, type CreatorDocument } from "@/lib/schemas";
import { verifyPassword, generateToken } from "@/lib/auth";
import { userMock } from "@/lib/mock-data"; // 後でcreatorMockに変更必要
import {
  successResponse,
  validationErrorResponse,
  unauthorizedResponse,
  internalServerErrorResponse,
} from "@/lib/api-response";

/**
 * クリエイターログインAPI
 * POST /api/auth/login
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // バリデーション
    const validation = loginSchema.safeParse(body);
    if (!validation.success) {
      return validationErrorResponse(
        "入力データが無効です",
        validation.error.issues
      );
    }

    const { email, password } = validation.data;

    // メールアドレスでクリエイターを検索
    const creator = userMock.findByEmail(email); // 後でcreatorMockに変更必要

    if (!creator) {
      return unauthorizedResponse("メールアドレスまたはパスワードが正しくありません");
    }

    // パスワードを検証
    const isPasswordValid = await verifyPassword(password, creator.passwordHash);
    if (!isPasswordValid) {
      return unauthorizedResponse("メールアドレスまたはパスワードが正しくありません");
    }

    // JWTトークンを生成
    const token = generateToken({
      userId: creator.creatorId || creator.userId, // 互換性のために両方サポート
      email: creator.email,
      username: creator.username,
    });

    // レスポンス用のクリエイター情報（パスワードハッシュを除外）
    const { passwordHash: _, ...safeCreator } = creator;

    return successResponse(
      {
        creator: safeCreator,
        token,
      },
      "ログインが完了しました"
    );
  } catch (error: any) {
    console.error("Login error:", error);
    return internalServerErrorResponse(
      "ログイン処理中にエラーが発生しました"
    );
  }
}
