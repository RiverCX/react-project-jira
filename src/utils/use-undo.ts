import { useCallback, useReducer, useState } from "react";

const UNDO = "undo";
const REDO = "redo";
const SET = "set";
const RESET = "reset";

type State<T> = {
  past: T[];
  present: T;
  future: T[];
};

type Action<T> = {
  type: typeof UNDO | typeof REDO | typeof SET | typeof RESET;
  newPresent?: T;
};

// 更新状态的纯函数，类似于useState的函数式更新，传入旧状态，返回新状态
const undoReducer = <T>(state: State<T>, action: Action<T>) => {
  const { past, present, future } = state;
  const { type, newPresent } = action;
  switch (type) {
    case UNDO: {
      if (past.length === 0) return state;
      const previous = past[past.length - 1];
      const newPast = past.slice(0, past.length - 1);
      const newFuture = [present, ...future];
      return {
        past: newPast,
        present: previous,
        future: newFuture,
      };
    }
    case REDO: {
      if (future.length === 0) return state;
      const next = future[0];
      const newFuture = future.slice(1);
      const newPast = [...past, present];
      return {
        past: newPast,
        present: next,
        future: newFuture,
      };
    }
    case SET: {
      const { past, present } = state;
      if (newPresent === present) return state;
      return {
        past: [...past, present],
        present: newPresent,
        future: [],
      };
    }
    case RESET: {
      return {
        past: [],
        present: newPresent,
        future: [],
      };
    }
    default:
      break;
  }
  return state;
};

export const useUndo = <T>(initialPresent: T) => {
  const [state, dispatch] = useReducer(undoReducer, {
    past: [], // 当前数据之前的数据数组
    present: initialPresent, // 当前数据
    future: [], // 当前数据之后的数据数组
  } as State<T>);

  const canUndo = state.past.length !== 0;
  const canRedo = state.future.length !== 0;

  const undo = useCallback(() => dispatch({ type: UNDO }), []);
  const redo = useCallback(() => dispatch({ type: REDO }), []);
  const set = useCallback(
    (newPresent: T) => dispatch({ type: SET, newPresent }),
    []
  );
  const reset = useCallback(
    (newPresent: T) => dispatch({ type: RESET, newPresent }),
    []
  );

  return [state, { set, reset, undo, redo, canUndo, canRedo }] as const;
};
