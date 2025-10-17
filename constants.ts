import { InventoryData, ProductStatus } from './types';

// NOTE: Please replace this URL with the raw URL of your JSON file on GitHub.
// Example: https://raw.githubusercontent.com/your-username/your-repo/main/inventory.json
export const GITHUB_JSON_URL = 'https://raw.githubusercontent.com/9477781/goods-sales-data/main/inventory.json';

// Fallback data used when the fetch from GITHUB_JSON_URL fails.
// This allows the UI to be displayed with sample data for development purposes.
export const MOCK_INVENTORY_DATA: InventoryData = {
  products: ["アクリルスタンド", "缶バッジ", "クリアファイル", "Tシャツ", "ジオラマアクリルスタンド", "トレーディングメタリック缶バッチ", "バーマット", "トレーディングキーホルダー"],
  stores: [
    {
      name: "HUB秋葉原店",
      status: {
        "アクリルスタンド": ProductStatus.InStock,
        "缶バッジ": ProductStatus.SoldOut,
        "クリアファイル": ProductStatus.InStock,
        "Tシャツ": ProductStatus.SoldOut,
        "ジオラマアクリルスタンド": ProductStatus.InStock,
        "トレーディングメタリック缶バッチ": ProductStatus.SoldOut,
        "バーマット": ProductStatus.InStock,
        "トレーディングキーホルダー": ProductStatus.InStock,
      }
    },
    {
      name: "HUB池袋西口公園前店",
      status: {
        "アクリルスタンド": ProductStatus.SoldOut,
        "缶バッジ": ProductStatus.SoldOut,
        "クリアファイル": ProductStatus.InStock,
        "Tシャツ": ProductStatus.InStock,
        "ジオラマアクリルスタンド": ProductStatus.SoldOut,
        "トレーディングメタリック缶バッチ": ProductStatus.InStock,
        "バーマット": ProductStatus.SoldOut,
        "トレーディングキーホルダー": ProductStatus.InStock,
      }
    },
    {
      name: "HUB新宿区役所通り店",
      status: {
        "アクリルスタンド": ProductStatus.InStock,
        "缶バッジ": ProductStatus.InStock,
        "クリアファイル": ProductStatus.InStock,
        "Tシャツ": ProductStatus.InStock,
        "ジオラマアクリルスタンド": ProductStatus.InStock,
        "トレーディングメタリック缶バッチ": ProductStatus.InStock,
        "バーマット": ProductStatus.InStock,
        "トレーディングキーホルダー": ProductStatus.InStock,
      }
    },
    {
      name: "HUB仙台一番町四丁目店",
      status: {
        "アクリルスタンド": ProductStatus.SoldOut,
        "缶バッジ": ProductStatus.InStock,
        "クリアファイル": ProductStatus.SoldOut,
        "Tシャツ": ProductStatus.InStock,
        "ジオラマアクリルスタンド": ProductStatus.SoldOut,
        "トレーディングメタリック缶バッチ": ProductStatus.SoldOut,
        "バーマット": ProductStatus.InStock,
        "トレーディングキーホルダー": ProductStatus.InStock,
      }
    },
    {
      name: "HUB名古屋栄錦通り店",
      status: {
        "アクリルスタンド": ProductStatus.InStock,
        "缶バッジ": ProductStatus.InStock,
        "クリアファイル": ProductStatus.InStock,
        "Tシャツ": ProductStatus.SoldOut,
        "ジオラマアクリルスタンド": ProductStatus.InStock,
        "トレーディングメタリック缶バッチ": ProductStatus.InStock,
        "バーマット": ProductStatus.SoldOut,
        "トレーディングキーホルダー": ProductStatus.SoldOut,
      }
    },
    {
      name: "HUB LINKS UMEDA店",
      status: {
        "アクリルスタンド": ProductStatus.SoldOut,
        "缶バッジ": ProductStatus.SoldOut,
        "クリアファイル": ProductStatus.SoldOut,
        "Tシャツ": ProductStatus.SoldOut,
        "ジオラマアクリルスタンド": ProductStatus.InStock,
        "トレーディングメタリック缶バッチ": ProductStatus.InStock,
        "バーマット": ProductStatus.InStock,
        "トレーディングキーホルダー": ProductStatus.InStock,
      }
    },
  ],
  lastUpdated: "サンプルデータ"
};