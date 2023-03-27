import styled from "@emotion/styled";
import { ProjectModal } from "screens/project-list/project-modal";
import { PageHeader } from "components/page-header";
import { useCreateRoutes } from "routes";

export const AuthenticatedApp = () => {
  const routes = useCreateRoutes();
  return (
    <Container>
      <PageHeader />
      <Main>{routes}</Main>
      <ProjectModal />
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`;

const Main = styled.main`
  display: flex;
  overflow: hidden;
`;
