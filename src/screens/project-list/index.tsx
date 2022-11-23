import React from "react";
import { useEffect, useState } from "react";
import List from "./List";
import SearchPanel from "./SearchPanel";
import { cleanObj, useMount, useDebounce } from "utils";
import * as qs from "qs";

const apiUrl = process.env.REACT_APP_API_URL;
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

  const fetchList = async () => {
    try {
      const response = await fetch(
        `${apiUrl}/projects?${qs.stringify(cleanObj(debouncedParam))}`
      );
      const data = await response.json();
      setList(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${apiUrl}/users`);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchList();
  }, [debouncedParam]);

  useMount(fetchUsers);

  return (
    <>
      <SearchPanel param={param} setParam={setParam} users={users} />
      <List list={list} users={users} />
    </>
  );
};

export default ProjectListScreen;
