import {
  useQueries,
  queryOptions,
  type QueryObserverResult,
} from '@tanstack/react-query';
import { useState } from 'react';
type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

const todoQueries = (id: number) =>
  queryOptions({
    queryKey: ['post', id],
    queryFn: () =>
      fetch(`https://jsonplaceholder.typicode.com/todos/${id}`).then(
        (res) => res.json() as Promise<Todo>,
      ),
    retry: 0,
    staleTime: 10000,
  });

const useFetchTodo = (ids: number[]) => {
  return useQueries({
    queries: ids.map((id) => todoQueries(id)),
    combine: (results: QueryObserverResult<Todo, Error>[]) => {
      return {
        data: results
          .filter(
            (result) => result?.data && Object.keys(result.data).length > 0,
          )
          .map((result) => result.data),
        isLoading: results.some((result) => result.isLoading),
        isPending: results.some((result) => result.isPending),
        isError: results.some((result) => result.isError),
        error: results.find((result) => result.isError)?.error,
      };
    },
  });
};

export const Sample = () => {
  const [ids, setIds] = useState([1, 2, 3]);

  const { data, isLoading, isPending, error } = useFetchTodo(ids);
  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '10px',
          marginBottom: '20px',
        }}
      >
        <button onClick={() => setIds([1, 2, 3])}>1, 2, 3</button>
        <button onClick={() => setIds([3])}>3</button>
        <button onClick={() => setIds([1, 2, 4])}>1, 2, 4</button>
        <button onClick={() => setIds([1, 2, 3, 4, 5])}>1, 2, 3, 4, 5</button>
      </div>

      <>
        {isLoading && <div>Loading...</div>}
        {isPending && <div>Pending...</div>}
        {error && <div>{error.message}</div>}
        {data &&
          data.map((todo) => (
            <div key={todo?.id}>
              {todo?.id} : {todo?.title}
            </div>
          ))}
      </>
    </div>
  );
};
