import { AppBar, Button, Container, Toolbar, Typography } from "@mui/material";
import { useRouter } from "next/router";

const NavBar = () => {
  const router = useRouter();
  return (
    <>
      <AppBar>
        <Container>
          <Toolbar>
            <Button
              variant="contained"
              color="success"
              onClick={() => router.push("/")}
            >
              Anime Score
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={() => router.push("/anime")}
              style={{ marginLeft: "auto" }}
            >
              New Anime
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default NavBar;
