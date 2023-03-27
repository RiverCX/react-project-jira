import { Input } from "antd";
import { useState } from "react";
import { useAddKanban } from "utils/kanban";
import { Container } from "./kanban-column";
import { useCurrentProjectId, useKanbansQueryKey } from "./util";

export const CreateKanban = () => {
  const [name, setName] = useState("");
  const projectId = useCurrentProjectId();
  const { mutateAsync } = useAddKanban(useKanbansQueryKey());

  const submit = () => {
    mutateAsync({ name, projectId });
    setName("");
  };

  return (
    <Container>
      <Input
        style={{ width: "20rem" }}
        placeholder="新建看板名称"
        value={name}
        onChange={(evt) => setName(evt.target.value)}
        onPressEnter={submit}
      />
    </Container>
  );
};
