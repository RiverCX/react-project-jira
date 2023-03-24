import { Link, Outlet } from "react-router-dom";

export const ProjectScreen = () => {
  return (
    <div>
      <Link to={"kanban"}>看板</Link>
      <Link to={"epic"}>任务组</Link>
      <Outlet />
    </div>
  );
};
