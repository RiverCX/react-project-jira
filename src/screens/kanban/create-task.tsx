import { Card, Input } from "antd";
import { useEffect, useState } from "react";
import { useAddTask } from "utils/task";
import { useCurrentProjectId, useTasksQueryKey } from "./util";

export const CreateTask = ({ kanbanId }: { kanbanId: number }) => {
  const [name, setName] = useState("");
  const [inputMode, setInputMode] = useState(false);
  const projectId = useCurrentProjectId();
  const { mutateAsync } = useAddTask(useTasksQueryKey());

  const toggle = () => setInputMode(!inputMode);

  const submit = () => {
    mutateAsync({ name, projectId, kanbanId });
    setInputMode(false);
    setName("");
  };

  useEffect(() => {
    if (!inputMode) setName(""); //清除输入
  }, [inputMode]);

  if (!inputMode) return <div onClick={toggle}>+创建任务</div>;

  return (
    <Card>
      <Input
        style={{ width: "20rem" }}
        placeholder="需要做些什么"
        value={name}
        onChange={(evt) => setName(evt.target.value)}
        autoFocus={true}
        onBlur={toggle}
        onPressEnter={submit}
      />
    </Card>
  );
};
