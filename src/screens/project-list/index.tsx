import React from "react";
import { useEffect, useState } from "react";
import List from "./List";
import SearchPanel from "./SearchPanel";
import { cleanObj, useMount, useDebounce } from "utils";
import { useHttp } from "utils/http";

const ProjectListScreen = () => {
  // 受控组件的状态
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  // 负责人列表
  const [users, setUsers] = useState([]);
  // 展示任务列表
  const [list, setList] = useState([]);

  const debouncedParam = useDebounce(param, 500);

  const client = useHttp();

  useEffect(() => {
    client("projects", { data: cleanObj(debouncedParam) }).then(setList);
  }, [debouncedParam]);

  useMount(() => {
    client("users").then(setUsers);
  });

  return (
    <>
      <SearchPanel param={param} setParam={setParam} users={users} />
      <List list={list} users={users} />
    </>
  );
};

export default ProjectListScreen;
