import { useTaskTypes } from "utils/task-type";
import { IdSelect } from "./id-select";

// 任务类型的Select组件

export const TaskTypeSelect = (
  props: React.ComponentProps<typeof IdSelect>
) => {
  const { data: tasks } = useTaskTypes();
  return <IdSelect options={tasks || []} {...props}></IdSelect>;
};
