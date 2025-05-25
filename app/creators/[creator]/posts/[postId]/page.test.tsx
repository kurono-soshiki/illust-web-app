import { render, screen, within } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import PostDetailPage from './page';

// Next.js のルーター機能をモック
vi.mock('next/link', () => {
  return {
    default: ({ children, href, ...props }: any) => (
      <a href={href} {...props}>
        {children}
      </a>
    ),
  };
});

vi.mock('next/image', () => {
  return {
    default: ({ src, alt, ...props }: any) => (
      <img src={src} alt={alt} {...props} />
    ),
  };
});

describe('PostDetailPage', () => {
  it('存在する投稿の詳細を正しく表示する', async () => {
    const params = { postId: 'post-1' };
    const component = await PostDetailPage({ params });
    
    render(component);
    
    // メインタイトルが表示されることを確認（h1要素のみ）
    expect(screen.getByRole('heading', { level: 1, name: 'ファンタジーキャラクター' })).toBeInTheDocument();
    
    // クリエイター名が表示されることを確認（パンくずリストではなくメインコンテンツから）
    const creatorSection = screen.getByText('クリエイター').closest('.bg-white') as HTMLElement;
    expect(within(creatorSection!).getByText('デモアーティスト')).toBeInTheDocument();
    
    // カテゴリが表示されることを確認
    expect(screen.getByText('イラスト')).toBeInTheDocument();
    
    // 説明文が表示されることを確認
    expect(screen.getByText(/ファンタジー世界の主人公を描きました/)).toBeInTheDocument();
    
    // タグが表示されることを確認
    expect(screen.getByText('#ファンタジー')).toBeInTheDocument();
    expect(screen.getByText('#キャラクター')).toBeInTheDocument();
    expect(screen.getByText('#魔法')).toBeInTheDocument();
  });

  it('投稿画像が正しく表示される', async () => {
    const params = { postId: 'post-1' };
    const component = await PostDetailPage({ params });
    
    render(component);
    
    // メイン画像が表示されることを確認
    const mainImage = screen.getByAltText('ファンタジーキャラクター');
    expect(mainImage).toBeInTheDocument();
    expect(mainImage).toHaveAttribute('src', 'https://placehold.jp/3d4070/ffffff/800x1200.png?text=Fantasy+Character+Detail');
  });

  it('クリエイター情報が正しく表示される', async () => {
    const params = { postId: 'post-1' };
    const component = await PostDetailPage({ params });
    
    render(component);
    
    // クリエイターのアバターが表示されることを確認
    const avatar = screen.getByAltText('デモアーティスト');
    expect(avatar).toBeInTheDocument();
    
    // ユーザー名が表示されることを確認
    expect(screen.getByText('@artist_demo')).toBeInTheDocument();
    
    // ポートフォリオリンクが表示されることを確認
    expect(screen.getByText('ポートフォリオを見る')).toBeInTheDocument();
  });

  it('パンくずリストが正しく表示される', async () => {
    const params = { postId: 'post-1' };
    const component = await PostDetailPage({ params });
    
    render(component);
    
    // パンくずリストの各要素が表示されることを確認
    const breadcrumb = screen.getByRole('navigation');
    expect(breadcrumb).toBeInTheDocument();
    
    within(breadcrumb).getByText('ホーム');
    within(breadcrumb).getByText('デモアーティスト');
    within(breadcrumb).getByText('ファンタジーキャラクター');
  });

  it('アクションボタンが表示される', async () => {
    const params = { postId: 'post-1' };
    const component = await PostDetailPage({ params });
    
    render(component);
    
    // アクションボタンが表示されることを確認
    expect(screen.getByText('♡ いいね')).toBeInTheDocument();
    expect(screen.getByText('🔖 ブックマーク')).toBeInTheDocument();
    expect(screen.getByText('📤 シェア')).toBeInTheDocument();
  });

  it('関連作品が表示される', async () => {
    const params = { postId: 'post-1' };
    const component = await PostDetailPage({ params });
    
    render(component);
    
    // 関連作品セクションが表示されることを確認
    expect(screen.getByText('デモアーティストさんの他の作品')).toBeInTheDocument();
    
    // 他の作品タイトルが表示されることを確認
    expect(screen.getByText('風景イラスト「古城と湖」')).toBeInTheDocument();
    expect(screen.getByText('キャラクターデザイン「氷の魔術師」')).toBeInTheDocument();
  });

  it('漫画作品の詳細を正しく表示する', async () => {
    const params = { postId: 'post-4' };
    const component = await PostDetailPage({ params });
    
    render(component);
    
    // 漫画作品のタイトルが表示されることを確認
    expect(screen.getByRole('heading', { level: 1, name: '4コマ漫画「冒険者の日常」' })).toBeInTheDocument();
    
    // カテゴリが漫画であることを確認
    expect(screen.getByText('漫画')).toBeInTheDocument();
    
    // 漫画クリエイターの名前が表示されることを確認
    const creatorSection = screen.getByText('クリエイター').closest('.bg-white') as HTMLElement;
    expect(within(creatorSection!).getByText('漫画家デモ')).toBeInTheDocument();
    
    // 漫画の説明が表示されることを確認
    expect(screen.getByText(/冒険者たちの日常を描いた4コマ漫画です/)).toBeInTheDocument();
  });

  it('存在しない投稿でエラーページを表示する', async () => {
    const params = { postId: 'non-existent-post' };
    const component = await PostDetailPage({ params });
    
    render(component);
    
    // エラーメッセージが表示されることを確認
    expect(screen.getByText('投稿が見つかりません')).toBeInTheDocument();
    expect(screen.getByText('指定された投稿は存在しないか、非公開になっています。')).toBeInTheDocument();
    expect(screen.getByText('トップページに戻る')).toBeInTheDocument();
  });

  it('統計情報が正しく表示される', async () => {
    const params = { postId: 'post-1' };
    const component = await PostDetailPage({ params });
    
    render(component);
    
    // 閲覧数が表示されることを確認
    expect(screen.getByText('閲覧数 1,250')).toBeInTheDocument();
    
    // 投稿日が表示されることを確認
    expect(screen.getByText('2023/5/10')).toBeInTheDocument();
  });

  it('すべてのタグが表示される', async () => {
    const params = { postId: 'post-3' };
    const component = await PostDetailPage({ params });
    
    render(component);
    
    // すべてのタグが表示されることを確認
    expect(screen.getByText('#キャラクターデザイン')).toBeInTheDocument();
    expect(screen.getByText('#魔法使い')).toBeInTheDocument();
    expect(screen.getByText('#氷')).toBeInTheDocument();
    expect(screen.getByText('#オリジナル')).toBeInTheDocument();
  });
});
