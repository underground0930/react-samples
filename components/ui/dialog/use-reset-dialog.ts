import { type DependencyList, useEffect, useRef } from 'react';

/** ダイアログの閉じるアニメーション時間 (150ms) + バッファ */
const DIALOG_CLOSE_ANIMATION_DURATION = 200;

type Props = {
  /** ダイアログの開閉状態 */
  open: boolean;
  /** リセット処理のコールバック */
  onReset: () => void;
  /** 追加の依存配列（オプション） */
  deps?: DependencyList;
  /** アニメーション後の遅延時間（デフォルト: 200ms） */
  delay?: number;
};

/**
 * ダイアログが閉じた時にリセット処理を実行するフック
 *
 * 閉じるアニメーションが終わってからコールバックを実行します。
 *
 * @example
 * const { reset } = useForm();
 *
 * useResetDialog({
 *   open,
 *   onReset: reset,
 * });
 *
 * @example
 * // isSubmitSuccessful時もリセットしたい場合
 * useResetDialog({
 *   open,
 *   onReset: reset,
 *   deps: [isSubmitSuccessful],
 * });
 */
export const useResetDialog = ({
  open,
  onReset,
  deps = [],
  delay = DIALOG_CLOSE_ANIMATION_DURATION,
}: Props) => {
  const prevOpenRef = useRef(open);

  useEffect(() => {
    const wasOpen = prevOpenRef.current;
    prevOpenRef.current = open;

    // ダイアログが閉じた時（open: true → false）
    if (wasOpen && !open) {
      const timer = setTimeout(() => {
        onReset();
      }, delay);

      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, delay, ...deps]);
};
