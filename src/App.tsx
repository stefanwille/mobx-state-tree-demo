import "antd/dist/antd.css";
import { getSnapshot, Instance, types } from "mobx-state-tree";
import React from "react";
import "./App.css";
import { Counter, CounterDouble } from "./Counter";

const Todo = types
  .model({
    name: "",
    done: false,
    user: types.maybe(types.reference(types.late(() => User))),
  })
  .actions((self) => ({
    setUser(user: Instance<typeof User>) {
      self.user = user;
    },
  }));

const User = types
  .model({
    id: types.identifier,
    name: "",
  })
  .actions((self) => ({
    setName(newName: string) {
      self.name = newName;
    },
  }));

const RootStore = types
  .model({
    users: types.map(User),
    todos: types.map(Todo),
  })
  .actions((self) => ({
    addTodo(id: string, name: string) {
      self.todos.set(id, Todo.create({ name }));
    },
  }));

const rootStore = RootStore.create({
  users: {
    "1": {
      id: "1",
      name: "Stefan",
    },
    "2": {
      id: "2",
      name: "Henry",
    },
  },
  todos: {
    "0": {
      name: "Buy milk",
      done: false,
    },
  },
});

const user: Instance<typeof User> | undefined = rootStore.users.get("1");
const todo: Instance<typeof Todo> | undefined = rootStore.todos.get("0");
todo!.setUser(user!);

console.log("rootStore", getSnapshot(rootStore));

function App() {
  return (
    <div className="App">
      <Counter />
      <CounterDouble />
    </div>
  );
}

export default App;
