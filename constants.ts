import { InventoryData, ProductStatus } from './types';

// NOTE: Please replace this URL with the raw URL of your JSON file on GitHub.
// Example: https://raw.githubusercontent.com/your-username/your-repo/main/inventory.json
export const GITHUB_JSON_URL = 'https://raw.githubusercontent.com/9477781/goods-sales-data/main/inventory.json';

// Fallback data used when the fetch from GITHUB_JSON_URL fails.
// This allows the UI to be displayed with sample data for development purposes.
export const MOCK_INVENTORY_DATA: InventoryData = {
  products: [
    "アクリルスタンド\n井芹 仁菜",
    "アクリルスタンド\n河原木 桃花",
    "アクリルスタンド\n安和 すばる",
    "コラボロゴTシャツ",
    "コラボロゴパイントグラス"
  ],
  stores: [
    {
      name: "HUB川崎店",
      status: {
        "アクリルスタンド\n井芹 仁菜": ProductStatus.SoldOut,
        "アクリルスタンド\n河原木 桃花": ProductStatus.InStock,
        "アクリルスタンド\n安和 すばる": ProductStatus.BeforeSale,
        "コラボロゴTシャツ": ProductStatus.InStock,
        "コラボロゴパイントグラス": ProductStatus.BeforeSale,
      }
    },
    {
      name: "HUB池袋西口公園前店",
      status: {
        "アクリルスタンド\n井芹 仁菜": ProductStatus.InStock,
        "アクリルスタンド\n河原木 桃花": ProductStatus.SoldOut,
        "アクリルスタンド\n安和 すばる": ProductStatus.InStock,
        "コラボロゴTシャツ": ProductStatus.SoldOut,
        "コラボロゴパイントグラス": ProductStatus.BeforeSale,
      }
    },
    {
      name: "HUB新宿区役所通り店",
      status: {
        "アクリルスタンド\n井芹 仁菜": ProductStatus.InStock,
        "アクリルスタンド\n河原木 桃花": ProductStatus.InStock,
        "アクリルスタンド\n安和 すばる": ProductStatus.InStock,
        "コラボロゴTシャツ": ProductStatus.InStock,
        "コラボロゴパイントグラス": ProductStatus.InStock,
      }
    },
  ],
  lastUpdated: "サンプルデータ"
};
