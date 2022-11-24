import React from "react";
import { useEffect, useState } from "react";
import List from "./List";
import SearchPanel from "./SearchPanel";
import { cleanObj, useMount, useDebounce } from "utils";
import { useHttp } from "utils/http";
import styled from "@emotion/styled";

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedParam]);

  useMount(() => {
    client("users").then(setUsers);
  });

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel param={param} setParam={setParam} users={users} />
      <List list={list} users={users} />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;

export default ProjectListScreen;
