# illust-web-app

イラスト・漫画ポートフォリオサイト

## 概要

Next.js 15とDynamoDBを使用したドキュメント駆動開発によるフルスタックWebアプリケーション。
クリエイターがイラストや漫画を展示・管理できるポートフォリオサイトとして機能します。
各クリエイターの作品は独立したポートフォリオとして公開され、一般ユーザーは登録不要で閲覧できます。

## 開発方針
- **ドキュメント駆動開発**: DynamoDBのドキュメント構造を直接マッピング
- **型安全性**: TypeScriptを使用して厳密な型チェックを実施
- ドキュメント指向、オブジェクト指向を意識する
- 過度に抽象化せず、シンプルな構造を維持

## 機能

- **認証**: クリエイターのみログイン可能・JWT認証（サイトからの新規登録は無効）
- **投稿管理**: クリエイターがイラスト・漫画の投稿・編集・削除を管理
- **閲覧**: 一般ユーザーはアカウント不要で作品閲覧が可能
- **ポートフォリオ表示**: 各クリエイターの作品集を独立したポートフォリオとして表示
- **クリエイターダッシュボード**: 作品管理、統計情報の閲覧、プロフィール編集などの機能
- **ギャラリー**: 全作品の検索・フィルタリング・閲覧機能
- **作品詳細**: 個別作品の詳細表示、関連作品の表示

## 技術スタック

### 言語・フレームワーク
- **TypeScript** - 型安全なJavaScript
- **Next.js 15** - フルスタックReactフレームワーク（App Router）
- **Tailwind CSS** - ユーティリティファーストCSS

### 状態管理・データフェッチ
- **Zustand** - 軽量状態管理
- **React Query (TanStack Query)** - サーバー状態管理
- **React Hook Form + Zod** - フォーム管理とバリデーション

### データベース・ストレージ
- **DynamoDB** - NoSQLデータベース（ドキュメント指向）
- **S3 (MinIO)** - オブジェクトストレージ

### 開発・テスト
- **pnpm** - 高速パッケージマネージャー
- **Vitest** - ユニットテストフレームワーク
- **Playwright** - E2Eテストフレームワーク
- **Docker Compose** - 開発環境コンテナ化

### 認証・セキュリティ
- **JWT** - JSON Web Token
- **bcryptjs** - パスワードハッシュ化
- **Zod** - ランタイム型検証

### インフラ・デプロイ
- **Vercel** - Next.jsアプリケーションデプロイ
- **AWS DynamoDB** - 本番データベース
- **AWS S3** - 本番ストレージ

## 開発環境セットアップ

### 必要な環境
- Node.js 18+
- pnpm 8+
- Docker & Docker Compose

### クイックスタート

```bash
# リポジトリをクローン
git clone <repository-url>
cd illust-web-app

# 依存関係のインストール
pnpm install

# 環境変数ファイルの設定
cp .env.example .env
# .env ファイルを編集

# Dockerコンテナの起動（DynamoDB Local, MinIO）
docker-compose up -d

# 開発サーバーの起動
pnpm dev
```

## 開発コマンド

```bash
# 開発サーバー起動
pnpm dev

# プロダクションビルド
pnpm build

# 本番環境での起動
pnpm start

# テスト実行
pnpm test

# E2Eテスト実行
pnpm test:e2e

# リント実行
pnpm lint

# 型チェック実行
pnpm type-check

# Dockerコンテナ操作
pnpm docker:up      # コンテナ起動
pnpm docker:down    # コンテナ停止
pnpm docker:logs    # ログ表示
```

## デモページ

このプロジェクトには、機能を実際に体験できる複数のデモページが含まれています：

### 🏠 ホームページ
- **URL**: [http://localhost:3000](http://localhost:3000)
- **説明**: サイトの概要、注目作品、各ページへのナビゲーション

### 🖼️ ギャラリーページ  
- **URL**: [http://localhost:3000/gallery](http://localhost:3000/gallery)
- **機能**: 
  - 全作品の一覧表示
  - カテゴリフィルタリング（イラスト/漫画）
  - キーワード検索（作品名、クリエイター名、タグ）
  - ソート機能（最新順、人気順、古い順）
  - 人気タグによる検索

### 👨‍🎨 クリエイターポートフォリオ
- **URL**: [http://localhost:3000/creators/artist_demo](http://localhost:3000/creators/artist_demo)
- **URL**: [http://localhost:3000/creators/manga_creator](http://localhost:3000/creators/manga_creator)
- **機能**: 
  - クリエイターのプロフィール表示
  - 作品一覧とギャラリー
  - ソーシャルリンク表示
  - 認証バッジ表示

### 📊 クリエイターダッシュボード
- **URL**: [http://localhost:3000/creators/dashboard](http://localhost:3000/creators/dashboard)
- **機能**: 
  - 統計情報の表示（総閲覧数、投稿数、公開作品数、下書き数）
  - 作品管理テーブル（CRUD操作）
  - レスポンシブデザイン
  - ※現在はモックデータで動作（認証フローはテスト用に簡略化）

### 🎨 作品詳細ページ
- **URL例**: [http://localhost:3000/posts/post-1](http://localhost:3000/posts/post-1)
- **機能**: 
  - 高解像度作品表示
  - 作品説明とタグ表示
  - クリエイター情報
  - 関連作品の表示
  - アクションボタン（いいね、ブックマーク、シェア）

### 🎯 作品管理ページ
- **URL**: [http://localhost:3000/creators/artist_demo/works](http://localhost:3000/creators/artist_demo/works)
- **機能**: 
  - 詳細な作品一覧表示
  - カテゴリ別フィルタリング
  - 作品統計情報
  - グリッドレイアウト

## デモデータ

デモ用のモックデータが以下に含まれています：

### デモクリエイター
- **artist_demo**: ファンタジーイラストを専門とするデモアーティスト
- **manga_creator**: 4コマ漫画とショートコミックを描く漫画家デモ
- **urban_artist**: 現代的な都市風景を描くアーバンアーティスト

### サンプル作品
- ファンタジーキャラクター
- 風景イラスト「古城と湖」
- キャラクターデザイン「氷の魔術師」
- 4コマ漫画「冒険者の日常」
- ショートコミック「魔法学校の放課後」
- ドラゴンとナイト
- 現代風景「都市の夜景」
- カフェの日常

## アクセス先

- **アプリケーション**: http://localhost:3000
- **API エンドポイント**: http://localhost:3000/api
- **MinIO管理画面**: http://localhost:9001 (minioadmin/minioadmin)
- **DynamoDB管理画面**: http://localhost:8001

## API エンドポイント

### 認証
- `POST /api/auth/login` - クリエイターログイン
- `GET /api/auth/verify` - トークン検証

### 作品管理
- `GET /api/posts` - 公開作品一覧取得
- `GET /api/posts/{id}` - 作品詳細取得
- `GET /api/creators/{username}/posts` - 特定クリエイターの作品一覧
- `POST /api/posts` - 作品投稿（要認証）
- `PUT /api/posts/{id}` - 作品更新（要認証）
- `DELETE /api/posts/{id}` - 作品削除（要認証）

### クリエイター情報
- `GET /api/creators/{username}` - クリエイター情報取得
- `PUT /api/creators/profile` - クリエイタープロフィール更新（要認証）


## 開発方針

1. **ドキュメント駆動開発**: データ構造をDynamoDBドキュメントに直接マッピング
2. **クリエイター中心**: イラストレーターや漫画家のためのポートフォリオプラットフォームとして設計
3. **閲覧者重視**: 一般ユーザーはアカウント登録不要で作品を閲覧可能
4. **型安全性**: TypeScriptによる厳密な型チェック
5. **シンプルなアーキテクチャ**: 複雑な抽象化を排除し、直感的な構造を維持
6. **テスト駆動**: 高いテストカバレッジを維持
7. **コードの可読性**: 適切なコメントと明確な命名規則