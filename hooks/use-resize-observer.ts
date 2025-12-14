import { useEffect, useRef } from 'react';

export const useResizeObserver = <T extends HTMLElement = HTMLElement>(
  onResize: (element: T) => void,
) => {
  const ref = useRef<T>(null);
  const onResizeRef = useRef(onResize);

  // onResizeが変わるたびに、最新の関数をrefに保存
  useEffect(() => {
    onResizeRef.current = onResize;
  }, [onResize]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new ResizeObserver(() => {
      if (!ref.current) return;
      onResizeRef.current(ref.current);
    });

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, []); // 依存配列を空にして、マウント時のみ実行

  return ref;
};
