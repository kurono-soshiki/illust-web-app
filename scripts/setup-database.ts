import {
  CreateTableCommand,
  DescribeTableCommand,
  ResourceNotFoundException,
  BillingMode,
  KeyType,
  ScalarAttributeType,
  ProjectionType,
} from "@aws-sdk/client-dynamodb";
import { dynamoDBClient, TABLES } from "../lib/dynamodb";

/**
 * DynamoDBテーブルの作成
 */
async function createTable(tableName: string) {
  try {
    // テーブルが既に存在するかチェック
    await dynamoDBClient.send(new DescribeTableCommand({ TableName: tableName }));
    console.log(`✅ テーブル '${tableName}' は既に存在します`);
    return;
  } catch (error) {
    if (!(error instanceof ResourceNotFoundException)) {
      throw error;
    }
  }

  // テーブル作成コマンド
  const createTableCommand = new CreateTableCommand({
    TableName: tableName,
    AttributeDefinitions: [
      {
        AttributeName: "pk",
        AttributeType: ScalarAttributeType.S,
      },
      {
        AttributeName: "sk",
        AttributeType: ScalarAttributeType.S,
      },
      {
        AttributeName: "gsi1pk",
        AttributeType: ScalarAttributeType.S,
      },
      {
        AttributeName: "gsi1sk",
        AttributeType: ScalarAttributeType.S,
      },
      {
        AttributeName: "gsi2pk",
        AttributeType: ScalarAttributeType.S,
      },
      {
        AttributeName: "gsi2sk",
        AttributeType: ScalarAttributeType.S,
      },
    ],
    KeySchema: [
      {
        AttributeName: "pk",
        KeyType: KeyType.HASH,
      },
      {
        AttributeName: "sk",
        KeyType: KeyType.RANGE,
      },
    ],
    GlobalSecondaryIndexes: [
      {
        IndexName: "GSI1",
        KeySchema: [
          {
            AttributeName: "gsi1pk",
            KeyType: KeyType.HASH,
          },
          {
            AttributeName: "gsi1sk",
            KeyType: KeyType.RANGE,
          },
        ],
        Projection: {
          ProjectionType: ProjectionType.ALL,
        },
      },
      {
        IndexName: "GSI2",
        KeySchema: [
          {
            AttributeName: "gsi2pk",
            KeyType: KeyType.HASH,
          },
          {
            AttributeName: "gsi2sk",
            KeyType: KeyType.RANGE,
          },
        ],
        Projection: {
          ProjectionType: ProjectionType.ALL,
        },
      },
    ],
    BillingMode: BillingMode.PAY_PER_REQUEST,
  });

  try {
    await dynamoDBClient.send(createTableCommand);
    console.log(`✅ テーブル '${tableName}' を作成しました`);
  } catch (error) {
    console.error(`❌ テーブル '${tableName}' の作成に失敗しました:`, error);
    throw error;
  }
}

/**
 * 全テーブルを作成
 */
async function setupDatabase() {
  console.log("🚀 データベースのセットアップを開始します...");

  try {
    // 各テーブルを作成
    for (const [name, tableName] of Object.entries(TABLES)) {
      console.log(`📋 ${name}テーブル (${tableName}) を作成中...`);
      await createTable(tableName);
    }

    console.log("✅ データベースのセットアップが完了しました！");
  } catch (error) {
    console.error("❌ データベースのセットアップに失敗しました:", error);
    process.exit(1);
  }
}

// スクリプトとして実行される場合
if (require.main === module) {
  setupDatabase();
}
