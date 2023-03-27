import { Button, Input } from "antd";
import { Row } from "components/lib";
import { TaskTypeSelect } from "components/type-select";
import { UserSelect } from "components/user-select";
import { useTasksSearchParams } from "./util";

export const SearchPanel = () => {
  const [param, setParam] = useTasksSearchParams();
  const reset = () => {
    setParam({
      typeId: undefined,
      processorId: undefined,
      tagId: undefined,
      name: undefined,
    });
  };
  return (
    <Row marginBottom={4} gap={true}>
      <Input
        style={{ width: "20rem" }}
        placeholder="任务名"
        value={param.name}
        onChange={(evt) => setParam({ ...param, name: evt.target.value })}
      />
      <UserSelect
        defaultOptionName="经办人"
        value={param.processorId}
        onChange={(value) => setParam({ ...param, processorId: value })}
      />
      <TaskTypeSelect
        defaultOptionName="类型"
        value={param.typeId}
        onChange={(value) => setParam({ ...param, typeId: value })}
      />
      <Button onClick={reset}>清除筛选器</Button>
    </Row>
  );
};
