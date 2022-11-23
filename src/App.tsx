import React from "react";
import logo from "./logo.svg";
import "./App.css";
import ProjectListScreen from "screens/project-list";
import { LoginScreen } from "screens/login";
import { loadDevTools } from "jira-dev-tool";

function App() {
  return (
    <>
      <LoginScreen />
      <ProjectListScreen />
    </>
  );
}

export default App;
