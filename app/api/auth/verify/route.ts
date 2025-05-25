import { NextRequest } from "next/server";
import { type UserDocument } from "@/lib/schemas";
import { verifyToken, extractBearerToken } from "@/lib/auth";
import { userMock } from "@/lib/mock-data";
import {
  successResponse,
  unauthorizedResponse,
  internalServerErrorResponse,
} from "@/lib/api-response";

/**
 * トークン検証API
 * GET /api/auth/verify
 */
export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    const token = extractBearerToken(authHeader);
    
    if (!token) {
      return unauthorizedResponse("認証トークンが提供されていません");
    }

    // JWTトークンを検証
    const payload = verifyToken(token);
    if (!payload) {
      return unauthorizedResponse("無効な認証トークンです");
    }

    // ユーザー情報をモックから取得
    const user = userMock.findById(payload.userId);

    if (!user) {
      return unauthorizedResponse("ユーザーが見つかりません");
    }

    // レスポンス用のユーザー情報（パスワードハッシュを除外）
    const { passwordHash: _, ...safeUser } = user;

    return successResponse(
      {
        user: safeUser,
        token: payload,
      },
      "トークンの検証が完了しました"
    );
  } catch (error: any) {
    console.error("Token verification error:", error);
    return internalServerErrorResponse(
      "トークン検証中にエラーが発生しました"
    );
  }
}
