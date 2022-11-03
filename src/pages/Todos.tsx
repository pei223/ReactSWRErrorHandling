import React from "react";
import { withPrevData } from "../api/swr-helper";
import { useTodos } from "../api/todos";
import { useUserInfo } from "../api/user-info";
import Layout from "../components/Layout";

const TodosPage = () => {
  const { data, loading, prevData, mutate } = withPrevData(
    useTodos({ page: 0, limit: 10 }, { refreshInterval: 5000 })
  );
  const { data: userInfo, loading: userInfoLoading } = useUserInfo();

  return (
    <Layout>
      <h3>User info</h3>
      {userInfoLoading && <div>Loading...</div>}
      {userInfo && (
        <>
          <p>id: {userInfo.id}</p>
          <p>name: {userInfo.name}</p>
          <p>email: {userInfo.email}</p>
        </>
      )}

      <h2>Todo list</h2>
      <button
        onClick={() => {
          mutate();
        }}
      >
        Reload
      </button>
      {loading && <div>Loading...</div>}
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
      <h2>Prev Todo list</h2>
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
    </Layout>
  );
};

export default TodosPage;
