/**
 * モックデータを提供するためのインメモリデータストア
 * 実際の開発環境ではDynamoDBを使用します
 */

// モックユーザーストア
const MOCK_USERS = new Map();

// モック投稿ストア
const MOCK_POSTS = new Map();

// モックいいねストア
const MOCK_LIKES = new Map();

// ユーザー関連のモックメソッド
export const userMock = {
  // ユーザーを作成
  create: (userData: any) => {
    MOCK_USERS.set(userData.userId, userData);
    return userData;
  },
  // メールアドレスでユーザーを検索
  findByEmail: (email: string) => {
    for (const user of MOCK_USERS.values()) {
      if (user.email === email) {
        return user;
      }
    }
    return null;
  },
  // ユーザーIDでユーザーを取得
  findById: (userId: string) => {
    return MOCK_USERS.get(userId) || null;
  },
  // ユーザー名でユーザーを検索
  findByUsername: (username: string) => {
    for (const user of MOCK_USERS.values()) {
      if (user.username === username) {
        return user;
      }
    }
    return null;
  },
};

// 投稿関連のモックメソッド
export const postMock = {
  // 投稿を作成
  create: (postData: any) => {
    MOCK_POSTS.set(postData.postId, postData);
    return postData;
  },
  // 投稿IDで投稿を取得
  findById: (postId: string) => {
    return MOCK_POSTS.get(postId) || null;
  },
  // ユーザーIDで投稿を取得
  findByUserId: (userId: string) => {
    return Array.from(MOCK_POSTS.values()).filter(post => post.userId === userId);
  },
  // 全ての公開投稿を取得
  findAllPublic: () => {
    return Array.from(MOCK_POSTS.values()).filter(post => post.isPublic);
  },
};

// いいね関連のモックメソッド
export const likeMock = {
  // いいねを追加
  create: (likeData: any) => {
    const key = `${likeData.postId}:${likeData.userId}`;
    MOCK_LIKES.set(key, likeData);
    return likeData;
  },
  // いいねを削除
  delete: (postId: string, userId: string) => {
    const key = `${postId}:${userId}`;
    return MOCK_LIKES.delete(key);
  },
  // いいねを確認
  exists: (postId: string, userId: string) => {
    const key = `${postId}:${userId}`;
    return MOCK_LIKES.has(key);
  },
  // 投稿のいいね数を取得
  countByPostId: (postId: string) => {
    let count = 0;
    for (const key of MOCK_LIKES.keys()) {
      if (key.startsWith(`${postId}:`)) {
        count++;
      }
    }
    return count;
  },
};
