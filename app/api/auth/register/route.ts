import { NextRequest } from "next/server";
import { errorResponse } from "@/lib/api-response";

/**
 * クリエイター登録API
 * 注: このAPIはポートフォリオサイトの仕様上、一般ユーザーは使用できません
 * 管理者のみがバックエンドから直接作成する方針です
 * 
 * POST /api/auth/register
 */
export async function POST(request: NextRequest) {
  // 常に登録不可のレスポンスを返す
  return errorResponse(
    "REGISTRATION_DISABLED",
    "このサイトでの新規登録は無効化されています。クリエイターアカウントが必要な場合は管理者にお問い合わせください。",
    403
  );
}
