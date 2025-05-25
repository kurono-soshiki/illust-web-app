import { NextResponse } from "next/server";

/**
 * API成功レスポンスの型定義
 */
export interface ApiSuccessResponse<T = any> {
  success: true;
  data: T;
  message?: string;
}

/**
 * APIエラーレスポンスの型定義
 */
export interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: any;
  };
}

/**
 * 成功レスポンスを生成
 */
export function successResponse<T>(
  data: T,
  message?: string,
  status: number = 200
): NextResponse<ApiSuccessResponse<T>> {
  return NextResponse.json(
    {
      success: true,
      data,
      message,
    },
    { status }
  );
}

/**
 * エラーレスポンスを生成
 */
export function errorResponse(
  code: string,
  message: string,
  status: number = 400,
  details?: any
): NextResponse<ApiErrorResponse> {
  return NextResponse.json(
    {
      success: false,
      error: {
        code,
        message,
        details,
      },
    },
    { status }
  );
}

/**
 * バリデーションエラーレスポンスを生成
 */
export function validationErrorResponse(
  message: string = "入力データが無効です",
  details?: any
): NextResponse<ApiErrorResponse> {
  return errorResponse("VALIDATION_ERROR", message, 400, details);
}

/**
 * 認証エラーレスポンスを生成
 */
export function unauthorizedResponse(
  message: string = "認証が必要です"
): NextResponse<ApiErrorResponse> {
  return errorResponse("UNAUTHORIZED", message, 401);
}

/**
 * 権限エラーレスポンスを生成
 */
export function forbiddenResponse(
  message: string = "この操作を実行する権限がありません"
): NextResponse<ApiErrorResponse> {
  return errorResponse("FORBIDDEN", message, 403);
}

/**
 * リソースが見つからないエラーレスポンスを生成
 */
export function notFoundResponse(
  message: string = "リソースが見つかりません"
): NextResponse<ApiErrorResponse> {
  return errorResponse("NOT_FOUND", message, 404);
}

/**
 * サーバーエラーレスポンスを生成
 */
export function internalServerErrorResponse(
  message: string = "内部サーバーエラーが発生しました",
  details?: any
): NextResponse<ApiErrorResponse> {
  return errorResponse("INTERNAL_SERVER_ERROR", message, 500, details);
}
