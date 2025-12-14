// 任意の時間待つ
// テスト用のユーティリティ

export const wait = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
