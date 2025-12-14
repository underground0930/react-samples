import { useEffect, useRef, type RefObject } from 'react';

/**
 * 指定された要素の外側をクリックした時にコールバックを実行するフック
 * refを内部で作成して返すバージョン
 * @param handler - 外側クリック時に実行される関数
 * @param enabled - フックを有効にするかどうか（デフォルト: true）
 * @param excludeRefs - クリック判定から除外する要素のref（配列も可）
 * @returns 監視対象要素に設定するref
 */
export function useClickOutside<T extends HTMLElement = HTMLElement>(
  handler: (event: MouseEvent | TouchEvent) => void,
  enabled: boolean = true,
  excludeRefs?: RefObject<HTMLElement | null>[],
): RefObject<T | null> {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;

      // 監視対象要素内のクリックかチェック
      if (ref.current && ref.current.contains(target)) return;

      // 除外要素内のクリックかチェック
      if (excludeRefs) {
        const excludeArray = excludeRefs;
        const isInsideExcludedElement = excludeArray.some((excludeRef) => {
          return excludeRef.current && excludeRef.current.contains(target);
        });
        if (isInsideExcludedElement) return;
      }

      // 外側のクリックならハンドラーを実行
      handler(event);
    };

    // mousedownとtouchstartの両方に対応
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [handler, enabled, excludeRefs]);

  return ref;
}
