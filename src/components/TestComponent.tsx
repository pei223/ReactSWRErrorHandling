import React, { useEffect, useRef, useState } from "react";
import ky from "ky";
import useSWR from "swr";

type TodoList = {
  items: Todo[];
  total: number;
};

type Todo = {
  id: string;
  title: string;
  done: boolean;
};
const fetcher = (url: string): Promise<TodoList> => {
  return ky.get("http://localhost:8080/todos").json();
};

const TestComponent = () => {
  const { data, error } = useSWR<TodoList>(["todos"], fetcher);
  const [prevData, setPrevData] = useState<TodoList | undefined>(undefined);
  const prevDataRef = useRef<TodoList | undefined>(undefined);

  useEffect(() => {
    setPrevData(prevDataRef.current);
    prevDataRef.current = data;
  }, [data]);

  console.log(prevData);
  const loading = !error && !data;
  return (
    <div>
      {loading && <div>Loading...</div>}
      <h2>Todo list</h2>
      {data &&
        data.items.map((todo) => (
          <div
            key={todo.id}
            style={{
              borderTop: "1px solid gray",
            }}
          >
            <p>id: {todo.id}</p>
            <p>title: {todo.title}</p>
            <p>status: {todo.done ? "finished" : "not finished"}</p>
          </div>
        ))}
      <h2>PrevTodo list</h2>
      {prevData &&
        prevData.items.map((todo) => (
          <div
            key={todo.id}
            style={{
              borderTop: "1px solid gray",
            }}
          >
            <p>id: {todo.id}</p>
            <p>title: {todo.title}</p>
            <p>status: {todo.done ? "finished" : "not finished"}</p>
          </div>
        ))}
    </div>
  );
};

export default TestComponent;
