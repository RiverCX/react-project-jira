import React from "react";
import { useUsers } from "utils/user";
import { IdSelect } from "./id-select";

// 负责人的Select组件

export const UserSelect = (props: React.ComponentProps<typeof IdSelect>) => {
  const { data: users } = useUsers();
  return <IdSelect options={users || []} {...props}></IdSelect>;
};
