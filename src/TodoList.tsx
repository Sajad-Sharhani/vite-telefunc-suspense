// @ts-ignore
import { Todo } from "@prisma/client";
import { useEffect, useState, Suspense, lazy } from "react";
import { NewTodo } from "./NewTodo";
import { onGetTodos } from "./TodoList.telefunc";

import ReactLoading from "react-loading";

export { TodoList };

const TodoItem = lazy(() => import("./TodoItem"));

function TodoList() {
  const [todoItems, setTodoItems] = useState<Todo[]>([]);

  const fetch = async () => {
    setTodoItems(await onGetTodos());
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <>
      <NewTodo refetch={fetch} />

      <hr />
      <Suspense
        fallback={
          <ReactLoading
            type="spin"
            delay={300}
            color="#730210"
            height={667}
            width={375}
          />
        }
      >
        <ul>
          {todoItems.map((todoItem) => (
            <TodoItem key={todoItem.id} refetch={fetch} {...todoItem} />
          ))}
        </ul>
      </Suspense>
    </>
  );
}
