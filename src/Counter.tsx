import { Button } from "antd";
import "antd/dist/antd.css";
import { observer } from "mobx-react-lite";
import { types } from "mobx-state-tree";
import React from "react";

const Count = types
  .model({
    count: 0,
  })
  .actions((self) => ({
    increment() {
      self.count++;
    },
  }))
  .views((self) => ({
    get double() {
      return self.count * 2;
    },
  }));

const theCount = Count.create();

export const Counter = observer(() => {
  return (
    <>
      <p>Counter: {theCount.count}</p>
      <Button
        onClick={() => {
          theCount.increment();
        }}
      >
        Increment
      </Button>
    </>
  );
});

export const CounterDouble = observer(() => {
  return <p>Double: {theCount.double}</p>;
});
