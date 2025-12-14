import { useQueryState, parseAsInteger } from 'nuqs';
import { useCallback } from 'react';

import { DEFAULT_PER_PAGE } from '@/constants';

export const usePage = () => {
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1));
  const [perPage, setPerPage] = useQueryState(
    'perPage',
    parseAsInteger.withDefault(DEFAULT_PER_PAGE),
  );

  const handlePerPageChange = useCallback(
    (newPerPage: number) => {
      setPerPage(newPerPage);
      setPage(1); // 件数変更時は1ページ目に戻す
    },
    [setPerPage, setPage],
  );

  return { page, setPage, perPage, setPerPage, handlePerPageChange };
};
