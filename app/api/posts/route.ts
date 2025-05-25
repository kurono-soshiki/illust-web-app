import { NextRequest } from "next/server";
import { postMock } from "@/lib/mock-data";
import { verifyToken, extractBearerToken } from "@/lib/auth";
import {
  successResponse,
  unauthorizedResponse,
  internalServerErrorResponse,
} from "@/lib/api-response";

/**
 * 認証ヘルパー関数
 */
function authenticateRequest(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const token = extractBearerToken(authHeader);
  
  if (!token) {
    return null;
  }
  
  const payload = verifyToken(token);
  // payloadのuserIdはcreatorIdと見なす
  return payload ? payload.userId : null;
}

/**
 * 作品一覧取得API
 * GET /api/posts
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "20");
    const category = searchParams.get("category") || null;
    
    // 公開作品を取得
    let posts = postMock.findAllPublic();
    
    // カテゴリでフィルタリング（オプション）
    if (category) {
      posts = posts.filter(post => post.category === category);
    }
    
    // 制限を適用
    posts = posts.slice(0, limit);
    
    return successResponse(
      { posts },
      "作品一覧を取得しました"
    );
  } catch (error) {
    console.error("Posts fetch error:", error);
    return internalServerErrorResponse(
      "作品一覧の取得中にエラーが発生しました"
    );
  }
}

/**
 * 作品投稿API
 * POST /api/posts
 */
export async function POST(request: NextRequest) {
  try {
    // 認証チェック - クリエイターのみ可能
    const creatorId = authenticateRequest(request);
    
    if (!creatorId) {
      return unauthorizedResponse("クリエイターとして認証が必要です");
    }
    
    const body = await request.json();
    
    // 本来はここでバリデーションとアップロード処理を行います
    // モック用に簡略化しています
    
    const postId = `post-${Date.now()}`;
    const now = new Date().toISOString();
    
    const post = {
      postId,
      creatorId,
      title: body.title,
      description: body.description || "",
      imageUrl: "https://example.com/placeholder.jpg", // モック画像URL
      imageKey: `uploads/${creatorId}/${postId}.jpg`,
      tags: body.tags || [],
      category: body.category || "イラスト",
      isPublic: body.isPublic ?? true,
      viewsCount: 0,
      createdAt: now,
      updatedAt: now,
    };
    
    // 投稿をモックデータに追加
    postMock.create(post);
    
    return successResponse(
      { post },
      "作品を投稿しました"
    );
  } catch (error) {
    console.error("Post creation error:", error);
    return internalServerErrorResponse(
      "作品の投稿中にエラーが発生しました"
    );
  }
}
