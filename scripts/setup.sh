#!/bin/bash

# 開発環境セットアップスクリプト

echo "🚀 イラスト投稿Webアプリケーション開発環境セットアップ"
echo "=================================================="

# 環境変数ファイルの作成
if [ ! -f .env ]; then
    echo "📝 環境変数ファイルを作成中..."
    cp .env.example .env
    echo "✅ .env ファイルが作成されました"
    echo "⚠️  必要に応じて .env ファイルを編集してください"
else
    echo "✅ .env ファイルは既に存在します"
fi

# 依存関係のインストール
echo ""
echo "📦 依存関係をインストール中..."
pnpm install

# 共有ライブラリのビルド
echo ""
echo "🔨 共有ライブラリをビルド中..."
cd shared && pnpm build && cd ..

# Dockerコンテナの起動
echo ""
echo "🐳 Dockerコンテナを起動中..."
docker-compose up -d

echo ""
echo "✅ セットアップが完了しました！"
echo ""
echo "🌐 アクセス可能なURL:"
echo "  - フロントエンド: http://localhost:3000"
echo "  - バックエンドAPI: http://localhost:3001"
echo "  - MinIO管理画面: http://localhost:9001"
echo "  - DynamoDB管理画面: http://localhost:8001"
echo ""
echo "🚀 開発を開始するには:"
echo "  pnpm dev"
echo ""
echo "📋 その他のコマンド:"
echo "  pnpm build       - 全プロジェクトをビルド"
echo "  pnpm test        - 全プロジェクトのテストを実行"
echo "  pnpm lint        - 全プロジェクトのリントを実行"
echo "  docker-compose logs -f  - Dockerログを表示"
