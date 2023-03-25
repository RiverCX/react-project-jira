import { User } from "./search-panel";
import { Dropdown, Table } from "antd";
import dayjs from "dayjs";
import { TableProps } from "antd/es/table";
import { Link } from "react-router-dom";
import { Pin } from "components/pin";
import { useDeleteProject, useEditProject } from "utils/project";
import { ButtonNoPadding } from "components/lib";
import { useProjectModal } from "./util";

// Projects列表

export interface Project {
  id: number;
  name: string;
  personId: number;
  pin: boolean;
  organization: string;
  created: number;
}

// TableProps是一个泛型
interface ListProps extends TableProps<Project> {
  users: User[];
}

export const List = ({ users, ...props }: ListProps) => {
  // 收藏和删除直接调用异步
  const { mutate: editMutate } = useEditProject();
  const { mutate: deleteMutate } = useDeleteProject();
  const pinProject = (id: number) => (pin: boolean) => editMutate({ id, pin });
  const deleteProject = (id: number) => deleteMutate(id);
  // 编辑需要打开Modal
  const { openEditingModal } = useProjectModal();

  return (
    <Table
      rowKey={"id"}
      pagination={false}
      columns={[
        {
          title: <Pin checked={true} disabled={true} />,
          render(value, project) {
            return (
              <Pin
                checked={project.pin}
                onCheckedChange={pinProject(project.id)}
              />
            );
          },
        },
        {
          title: "名称",
          sorter: (a, b) => a.name.localeCompare(b.name),
          render(value, project) {
            return <Link to={`/projects/${project.id}`}>{project.name}</Link>;
          },
        },
        {
          title: "部门",
          dataIndex: "organization",
        },
        {
          title: "负责人",
          render(value, project) {
            return (
              <span>
                {users.find((user) => user.id === project.personId)?.name ||
                  "未知"}
              </span>
            );
          },
        },
        {
          title: "创建时间",
          render(value, project) {
            return (
              <span>
                {project.created
                  ? dayjs(project.created).format("YYYY-MM-DD")
                  : "无"}
              </span>
            );
          },
        },
        {
          render(value, project) {
            return (
              <Dropdown
                menu={{
                  items: [
                    {
                      key: "edit",
                      label: (
                        <ButtonNoPadding
                          type="link"
                          onClick={() => openEditingModal(project.id)}
                        >
                          编辑项目
                        </ButtonNoPadding>
                      ),
                    },
                    {
                      key: "delete",
                      label: (
                        <ButtonNoPadding
                          type="link"
                          onClick={() => {
                            deleteProject(project.id);
                          }}
                        >
                          删除
                        </ButtonNoPadding>
                      ),
                    },
                  ],
                }}
              >
                <ButtonNoPadding type="link">...</ButtonNoPadding>
              </Dropdown>
            );
          },
        },
      ]}
      {...props}
    />
  );
};
