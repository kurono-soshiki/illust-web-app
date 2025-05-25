"use client";

import Link from "next/link";

/**
 * 登録案内ページ
 * 新規登録は管理者のみが可能なことを説明するページ
 */
export default function RegisterInfoPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          クリエイター登録について
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="text-center">
            <div className="mb-4 flex justify-center">
              <div className="rounded-full bg-yellow-100 p-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-yellow-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
            </div>

            <h3 className="text-lg font-medium mb-2 text-gray-900">
              このサイトでは一般ユーザーの登録は行っていません
            </h3>

            <p className="mt-2 text-sm text-gray-600">
              このポートフォリオサイトは、厳選されたイラストレーターや漫画家の作品を展示するための専用プラットフォームです。
              クリエイターアカウントの登録は管理者による招待制となっています。
            </p>

            <div className="mt-6">
              <p className="text-sm text-gray-600 mb-4">
                作品をお楽しみいただくには、アカウント登録は必要ありません。
              </p>

              <div className="flex justify-center space-x-4">
                <Link
                  href="/"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  トップページに戻る
                </Link>
                <Link
                  href="/posts"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  作品を見る
                </Link>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                すでにクリエイターアカウントをお持ちの方は
                <Link
                  href="/auth/login"
                  className="font-medium text-blue-600 hover:text-blue-500 ml-1"
                >
                  こちらからログイン
                </Link>
                してください。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
