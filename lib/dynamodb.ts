import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

/**
 * DynamoDB設定
 * 環境に応じてローカルまたはAWSの設定を使用
 */
const dynamoDBConfig = {
  region: process.env.AWS_REGION || "ap-northeast-1",
  ...(process.env.NODE_ENV === "development" && {
    endpoint: process.env.DATABASE_URL || "http://localhost:8000",
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID || "local-access-key",
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "local-secret-key",
    },
  }),
};

/**
 * DynamoDBクライアントのインスタンス
 */
export const dynamoDBClient = new DynamoDBClient(dynamoDBConfig);

/**
 * DynamoDBドキュメントクライアント
 * 簡潔なAPIでDynamoDBとのやり取りを行う
 */
export const docClient = DynamoDBDocumentClient.from(dynamoDBClient);

/**
 * テーブル名の定数
 */
export const TABLES = {
  USERS: process.env.USERS_TABLE || "illust-users",
  POSTS: process.env.POSTS_TABLE || "illust-posts",
  LIKES: process.env.LIKES_TABLE || "illust-likes",
} as const;
