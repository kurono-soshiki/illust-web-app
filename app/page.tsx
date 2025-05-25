import Link from "next/link";

/**
 * ホームページ
 * イラスト・漫画ポートフォリオサイトのランディングページ
 */
export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* ヘッダー */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                🎨 イラスト・漫画ポートフォリオ
              </h1>
            </div>
            <nav className="flex space-x-4">
              <Link 
                href="/gallery" 
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md"
              >
                ギャラリー
              </Link>
              <Link 
                href="/creators/artist_demo" 
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md"
              >
                デモ作家
              </Link>
              <Link 
                href="/creators/dashboard" 
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md"
              >
                クリエイター
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* ヒーローセクション */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            クリエイターの
            <span className="text-blue-600">作品を展示</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            プロフェッショナルなイラストレーターや漫画家の作品を展示するポートフォリオサイト。
            各作家の個性あふれる作品をお楽しみください。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/gallery" 
              className="btn-primary text-lg px-8 py-3"
            >
              作品を見る
            </Link>
            <Link 
              href="/creators/artist_demo" 
              className="btn-secondary text-lg px-8 py-3"
            >
              デモ作品を見る
            </Link>
          </div>
        </div>

        {/* 機能紹介 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="card p-8 text-center">
            <div className="text-4xl mb-4">🖼️</div>
            <h3 className="text-xl font-semibold mb-3">プロの作品</h3>
            <p className="text-gray-600">
              プロフェッショナルなイラストレーターや漫画家の高品質な作品を閲覧できます
            </p>
          </div>
          <div className="card p-8 text-center">
            <div className="text-4xl mb-4">🧑‍🎨</div>
            <h3 className="text-xl font-semibold mb-3">作家ポートフォリオ</h3>
            <p className="text-gray-600">
              各クリエイターの個別ポートフォリオで作風や経歴を確認できます
            </p>
          </div>
          <div className="card p-8 text-center">
            <div className="text-4xl mb-4">📱</div>
            <h3 className="text-xl font-semibold mb-3">レスポンシブ対応</h3>
            <p className="text-gray-600">
              スマートフォンやタブレットからも快適に作品を閲覧できます
            </p>
          </div>
        </div>

        {/* 注目の作品 */}
        <section className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-8">注目の作品</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/creators/artist_demo/posts/post-1" className="card overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gradient-to-br from-blue-200 to-indigo-300 flex items-center justify-center text-white text-sm">
                ファンタジーキャラクター
              </div>
              <div className="p-4">
                <h4 className="font-semibold mb-2">ファンタジーキャラクター</h4>
                <p className="text-sm text-gray-600">デモアーティスト</p>
                <div className="flex items-center mt-2 text-sm text-gray-500">
                  <span>閲覧数: 1,250</span>
                </div>
              </div>
            </Link>

            <Link href="/creators/artist_demo/posts/post-2" className="card overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gradient-to-br from-amber-200 to-orange-300 flex items-center justify-center text-white text-sm">
                古城と湖
              </div>
              <div className="p-4">
                <h4 className="font-semibold mb-2">風景イラスト「古城と湖」</h4>
                <p className="text-sm text-gray-600">デモアーティスト</p>
                <div className="flex items-center mt-2 text-sm text-gray-500">
                  <span>閲覧数: 850</span>
                </div>
              </div>
            </Link>

            <Link href="/creators/manga_creator/posts/post-4" className="card overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-400 flex items-center justify-center text-white text-sm">
                4コマ漫画
              </div>
              <div className="p-4">
                <h4 className="font-semibold mb-2">4コマ漫画「冒険者の日常」</h4>
                <p className="text-sm text-gray-600">漫画家デモ</p>
                <div className="flex items-center mt-2 text-sm text-gray-500">
                  <span>閲覧数: 1,520</span>
                </div>
              </div>
            </Link>

            <Link href="/creators/urban_artist/posts/post-7" className="card overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gradient-to-br from-slate-200 to-slate-400 flex items-center justify-center text-white text-sm">
                都市の夜景
              </div>
              <div className="p-4">
                <h4 className="font-semibold mb-2">現代風景「都市の夜景」</h4>
                <p className="text-sm text-gray-600">アーバンアーティスト</p>
                <div className="flex items-center mt-2 text-sm text-gray-500">
                  <span>閲覧数: 920</span>
                </div>
              </div>
            </Link>
          </div>
          <div className="text-center mt-6">
            <Link href="/gallery" className="btn-secondary">もっと見る</Link>
          </div>
        </section>
      </main>

      {/* フッター */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-semibold">イラスト・漫画ポートフォリオ</h3>
              <p className="text-gray-400">クリエイターの作品を展示するプラットフォーム</p>
            </div>
            <div>
              <p className="text-gray-400">© {new Date().getFullYear()} Portfolio Platform</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}