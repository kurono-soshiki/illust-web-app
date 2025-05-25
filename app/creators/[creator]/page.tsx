import Link from "next/link";
import { notFound } from "next/navigation";

/**
 * 任意のクリエイター用プロフィールページ（動的ルート）
 * デモ用データ（artist_demo）を仮実装
 */
const demoArtist = {
  name: "デモアーティスト",
  bio: "ファンタジーや風景画を得意とするイラストレーター。多様なタッチで作品を制作。",
  works: [
    {
      id: "post-1",
      title: "ファンタジーキャラクター",
      description: "オリジナルのファンタジーキャラクターイラスト。",
    },
    {
      id: "post-2",
      title: "風景イラスト『古城と湖』",
      description: "幻想的な古城と湖の風景画。",
    },
  ],
};

export default function CreatorPage({ params }: { params: { creator: string } }) {
  // クリエイター名に応じてデータ取得（現状はartist_demoのみ）
  const artist = params.creator === "artist_demo" ? demoArtist : null;

  if (!artist) {
    // データがなければ準備中メッセージ
    return (
      <div className="max-w-3xl mx-auto py-12 px-4 text-center">
        <h2 className="text-2xl font-bold mb-4">{params.creator} のプロフィールは準備中です</h2>
        <Link href="/gallery" className="btn-secondary">ギャラリーに戻る</Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold mb-4">{artist.name}</h2>
      <p className="text-gray-700 mb-8">{artist.bio}</p>
      <h3 className="text-xl font-semibold mb-3">サンプル作品</h3>
      <ul className="space-y-4 mb-8">
        {artist.works.map((work) => (
          <li key={work.id} className="border rounded p-4">
            <Link href={`/creators/${params.creator}/posts/${work.id}`} className="text-blue-600 hover:underline font-medium">
              {work.title}
            </Link>
            <p className="text-gray-600 text-sm mt-1">{work.description}</p>
          </li>
        ))}
      </ul>
      <Link href="/gallery" className="btn-secondary">ギャラリーに戻る</Link>
    </div>
  );
}
