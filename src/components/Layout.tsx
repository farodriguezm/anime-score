import { Container } from "@mui/material";
import { ReactNode } from "react";
import NavBar from "./NavBar";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <NavBar />
      <Container style={{ paddingTop: "5rem" }}>{children}</Container>
    </>
  );
};

export default Layout;
