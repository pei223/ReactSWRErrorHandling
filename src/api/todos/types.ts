export type TodoList = {
  items: Todo[];
  total: number;
};

export type Todo = {
  id: string;
  title: string;
  done: boolean;
};
