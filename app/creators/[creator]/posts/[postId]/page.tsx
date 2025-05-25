import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Post, Creator } from "@/lib/types";

/**
 * 投稿詳細ページ
 * 個別の作品を表示するページ
 */
interface PostPageProps {
  params: {
    postId: string;
  };
}

// モックデータ - 投稿詳細用
const MOCK_POSTS_DETAIL: Record<string, Post & { creator: Creator }> = {
  "post-1": {
    postId: "post-1",
    userId: "demo-user-1",
    title: "ファンタジーキャラクター",
    description: "ファンタジー世界の主人公を描きました。魔法を使う冒険者です。この作品では、青い魔法の光を纏った若い戦士を描いています。詳細なキャラクター設定として、彼女は失われた古代魔法の継承者で、世界を脅かす闇の力と戦う運命を背負っています。",
    imageUrl: "https://placehold.jp/3d4070/ffffff/800x1200.png?text=Fantasy+Character+Detail",
    thumbnailUrl: "https://placehold.jp/3d4070/ffffff/300x300.png?text=FC",
    category: "イラスト",
    tags: ["ファンタジー", "キャラクター", "魔法", "戦士"],
    isPublic: true,
    viewsCount: 1250,
    createdAt: "2023-05-10T00:00:00Z",
    updatedAt: "2023-05-10T00:00:00Z",
    creator: {
      userId: "demo-user-1",
      username: "artist_demo",
      displayName: "デモアーティスト",
      bio: "イラストレーター・漫画家です。ファンタジー作品を中心に活動しています。",
      avatarUrl: "https://placehold.jp/150x150.png",
      website: "https://example.com/artist_demo",
      socialLinks: {
        Twitter: "https://twitter.com/demo",
        Instagram: "https://instagram.com/demo",
        Pixiv: "https://pixiv.net/demo"
      },
      isVerified: true,
      createdAt: "2023-01-01T00:00:00Z",
      updatedAt: "2023-04-01T00:00:00Z"
    }
  },
  "post-2": {
    postId: "post-2",
    userId: "demo-user-1",
    title: "風景イラスト「古城と湖」",
    description: "ファンタジー世界の古城と湖の風景イラストです。夕暮れ時の幻想的な雰囲気を表現しました。古城は何百年も前に建てられた魔法使いの塔で、現在は誰も住んでいませんが、夜になると不思議な光が窓から漏れ出すと言われています。湖の水面に映る城の影が特に美しく、多くの旅人がこの景色を求めて訪れます。",
    imageUrl: "https://placehold.jp/7d6e50/ffffff/1200x800.png?text=Fantasy+Landscape+Detail",
    thumbnailUrl: "https://placehold.jp/7d6e50/ffffff/300x200.png?text=FL",
    category: "イラスト",
    tags: ["風景", "ファンタジー", "夕暮れ", "城", "湖"],
    isPublic: true,
    viewsCount: 850,
    createdAt: "2023-06-15T00:00:00Z",
    updatedAt: "2023-06-15T00:00:00Z",
    creator: {
      userId: "demo-user-1",
      username: "artist_demo",
      displayName: "デモアーティスト",
      bio: "イラストレーター・漫画家です。ファンタジー作品を中心に活動しています。",
      avatarUrl: "https://placehold.jp/150x150.png",
      website: "https://example.com/artist_demo",
      socialLinks: {
        Twitter: "https://twitter.com/demo",
        Instagram: "https://instagram.com/demo",
        Pixiv: "https://pixiv.net/demo"
      },
      isVerified: true,
      createdAt: "2023-01-01T00:00:00Z",
      updatedAt: "2023-04-01T00:00:00Z"
    }
  },
  "post-3": {
    postId: "post-3",
    userId: "demo-user-1",
    title: "キャラクターデザイン「氷の魔術師」",
    description: "オリジナルキャラクター「氷の魔術師エリナ」のデザイン画です。北の国出身の若い魔術師で、氷と雪を操る力を持っています。青い髪と氷のような瞳が特徴的で、常に冷静沈着な性格をしています。彼女の魔法は攻撃だけでなく、氷の橋を作ったり、水を浄化したりと様々な用途に使用できます。",
    imageUrl: "https://placehold.jp/50a0c0/ffffff/800x1200.png?text=Ice+Mage+Detail",
    thumbnailUrl: "https://placehold.jp/50a0c0/ffffff/300x300.png?text=IM",
    category: "イラスト",
    tags: ["キャラクターデザイン", "魔法使い", "氷", "オリジナル"],
    isPublic: true,
    viewsCount: 735,
    createdAt: "2023-07-20T00:00:00Z",
    updatedAt: "2023-07-20T00:00:00Z",
    creator: {
      userId: "demo-user-1",
      username: "artist_demo",
      displayName: "デモアーティスト",
      bio: "イラストレーター・漫画家です。ファンタジー作品を中心に活動しています。",
      avatarUrl: "https://placehold.jp/150x150.png",
      website: "https://example.com/artist_demo",
      socialLinks: {
        Twitter: "https://twitter.com/demo",
        Instagram: "https://instagram.com/demo",
        Pixiv: "https://pixiv.net/demo"
      },
      isVerified: true,
      createdAt: "2023-01-01T00:00:00Z",
      updatedAt: "2023-04-01T00:00:00Z"
    }
  },
  "post-4": {
    postId: "post-4",
    userId: "demo-user-2",
    title: "4コマ漫画「冒険者の日常」",
    description: "冒険者たちの日常を描いた4コマ漫画です。第1話「依頼の受け方」。新米冒険者のリオが初めてギルドで依頼を受ける時の失敗談をコミカルに描いています。経験豊富な先輩冒険者に教わりながら、徐々に成長していく姿を描いたシリーズの第一作目です。",
    imageUrl: "https://placehold.jp/5d5d5d/ffffff/800x3200.png?text=4-Panel+Comic+Detail",
    thumbnailUrl: "https://placehold.jp/5d5d5d/ffffff/300x300.png?text=Comic",
    category: "漫画",
    tags: ["4コマ", "ファンタジー", "冒険者", "コメディ"],
    isPublic: true,
    viewsCount: 1520,
    createdAt: "2023-04-05T00:00:00Z",
    updatedAt: "2023-04-05T00:00:00Z",
    creator: {
      userId: "demo-user-2",
      username: "manga_creator",
      displayName: "漫画家デモ",
      bio: "漫画家です。ショートコミックを中心に活動しています。",
      avatarUrl: "https://placehold.jp/3d4070/ffffff/150x150.png?text=MC",
      website: "https://example.com/manga_creator",
      socialLinks: {
        Twitter: "https://twitter.com/manga_demo",
        Pixiv: "https://pixiv.net/manga_demo"
      },
      isVerified: true,
      createdAt: "2023-02-01T00:00:00Z",
      updatedAt: "2023-05-01T00:00:00Z"
    }
  },
  "post-5": {
    postId: "post-5",
    userId: "demo-user-2",
    title: "ショートコミック「魔法学校の放課後」",
    description: "魔法学校を舞台にしたショートコミックです。放課後の図書館で起こる小さな魔法の事件を描いています。主人公のマナは魔法の才能はあまりありませんが、知識と工夫で様々な問題を解決していきます。友情と成長をテーマにした心温まるストーリーです。",
    imageUrl: "https://placehold.jp/705090/ffffff/800x2400.png?text=Short+Comic+Detail",
    thumbnailUrl: "https://placehold.jp/705090/ffffff/300x300.png?text=SC",
    category: "漫画",
    tags: ["学園", "魔法", "ファンタジー", "青春"],
    isPublic: true,
    viewsCount: 980,
    createdAt: "2023-05-22T00:00:00Z",
    updatedAt: "2023-05-22T00:00:00Z",
    creator: {
      userId: "demo-user-2",
      username: "manga_creator",
      displayName: "漫画家デモ",
      bio: "漫画家です。ショートコミックを中心に活動しています。",
      avatarUrl: "https://placehold.jp/3d4070/ffffff/150x150.png?text=MC",
      website: "https://example.com/manga_creator",
      socialLinks: {
        Twitter: "https://twitter.com/manga_demo",
        Pixiv: "https://pixiv.net/manga_demo"
      },
      isVerified: true,
      createdAt: "2023-02-01T00:00:00Z",
      updatedAt: "2023-05-01T00:00:00Z"
    }
  }
};

// 関連投稿を取得する関数
function getRelatedPosts(currentPost: Post): Post[] {
  const allPosts = Object.values(MOCK_POSTS_DETAIL);
  
  // 同じクリエイターの他の作品を取得（最大3件）
  return allPosts
    .filter(post => post.userId === currentPost.userId && post.postId !== currentPost.postId)
    .slice(0, 3);
}

// メタデータ生成
export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { postId } = params;
  
  try {
    // モックデータを使用
    const post = MOCK_POSTS_DETAIL[postId];
    
    if (!post) {
      return {
        title: "投稿が見つかりません",
      };
    }
    
    return {
      title: `${post.title} - ${post.creator.displayName}`,
      description: post.description,
    };
  } catch (error) {
    console.error("Failed to fetch post metadata:", error);
    return {
      title: "投稿詳細",
    };
  }
}

async function getPostData(postId: string) {
  // モックデータを使用
  const post = MOCK_POSTS_DETAIL[postId];
  if (!post) {
    throw new Error("投稿が見つかりません");
  }
  
  const relatedPosts = getRelatedPosts(post);
  
  return {
    post,
    relatedPosts,
  };
}

export default async function PostDetailPage({ params }: PostPageProps) {
  const { postId } = params;
  
  try {
    const { post, relatedPosts } = await getPostData(postId);
    
    return (
      <div className="bg-gray-50 min-h-screen">
        {/* ヘッダー */}
        <div className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav className="flex items-center gap-2 text-sm text-gray-500">
              <Link href="/" className="hover:text-gray-700">ホーム</Link>
              <span>/</span>
              <Link href={`/creators/${post.creator.username}`} className="hover:text-gray-700">
                {post.creator.displayName}
              </Link>
              <span>/</span>
              <span className="text-gray-900">{post.title}</span>
            </nav>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* メインコンテンツ */}
            <div className="lg:col-span-2">
              {/* 作品画像 */}
              <div className="bg-white rounded-lg overflow-hidden shadow-sm mb-8">
                <div className="aspect-w-16 aspect-h-12 bg-gray-100">
                  <Image 
                    src={post.imageUrl} 
                    alt={post.title}
                    width={800}
                    height={600}
                    className="w-full h-full object-contain"
                    priority
                  />
                </div>
              </div>

              {/* 作品情報 */}
              <div className="bg-white rounded-lg p-6 shadow-sm mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h1>
                
                <div className="flex items-center gap-4 mb-6">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {post.category}
                  </span>
                  <span className="text-gray-500 text-sm">
                    閲覧数 {post.viewsCount.toLocaleString()}
                  </span>
                  <span className="text-gray-500 text-sm">
                    {new Date(post.createdAt).toLocaleDateString("ja-JP")}
                  </span>
                </div>

                <p className="text-gray-700 leading-relaxed mb-6">{post.description}</p>

                {/* タグ */}
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 cursor-pointer"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* 関連作品 */}
              {relatedPosts.length > 0 && (
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">
                    {post.creator.displayName}さんの他の作品
                  </h2>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {relatedPosts.map((relatedPost) => (
                      <Link href={`/posts/${relatedPost.postId}`} key={relatedPost.postId} className="block">
                        <div className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                          <div className="aspect-w-1 aspect-h-1 bg-gray-200">
                            <Image 
                              src={relatedPost.thumbnailUrl} 
                              alt={relatedPost.title}
                              width={200}
                              height={200}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="p-3">
                            <h3 className="font-medium text-gray-900 text-sm mb-1 line-clamp-2">
                              {relatedPost.title}
                            </h3>
                            <p className="text-xs text-gray-500">
                              {relatedPost.category} • {relatedPost.viewsCount.toLocaleString()}閲覧
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* サイドバー */}
            <div className="lg:col-span-1">
              {/* クリエイター情報 */}
              <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">クリエイター</h3>
                
                <Link href={`/creators/${post.creator.username}`} className="block hover:bg-gray-50 rounded-lg p-4 -m-4 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200">
                      {post.creator.avatarUrl ? (
                        <Image 
                          src={post.creator.avatarUrl} 
                          alt={post.creator.displayName}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-blue-100 text-blue-500">
                          <span className="text-xl">{post.creator.displayName.charAt(0)}</span>
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900">{post.creator.displayName}</h4>
                      <p className="text-sm text-gray-500">@{post.creator.username}</p>
                    </div>
                  </div>
                  
                  {post.creator.bio && (
                    <p className="text-sm text-gray-600 mt-3">{post.creator.bio}</p>
                  )}
                </Link>

                <div className="mt-4 pt-4 border-t border-gray-100">
                  <Link 
                    href={`/creators/${post.creator.username}`}
                    className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-center block"
                  >
                    ポートフォリオを見る
                  </Link>
                </div>
              </div>

              {/* アクション */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-4">アクション</h3>
                
                <div className="space-y-3">
                  <button className="w-full bg-red-100 text-red-800 px-4 py-2 rounded-lg hover:bg-red-200 transition-colors">
                    ♡ いいね
                  </button>
                  
                  <button className="w-full bg-blue-100 text-blue-800 px-4 py-2 rounded-lg hover:bg-blue-200 transition-colors">
                    🔖 ブックマーク
                  </button>
                  
                  <button className="w-full bg-gray-100 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                    📤 シェア
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">投稿が見つかりません</h1>
          <p className="text-gray-600 mb-6">指定された投稿は存在しないか、非公開になっています。</p>
          <Link href="/" className="text-blue-600 hover:text-blue-800">
            トップページに戻る
          </Link>
        </div>
      </div>
    );
  }
}
