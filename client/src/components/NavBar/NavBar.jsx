import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import BookIcon from "@mui/icons-material/Book";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: { md: "row", xs: "column" },
            flexWrap: "wrap",
          }}
        >
          <div
            style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}
          >
            <BookIcon sx={{ mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                mr: 2,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <Link style={{ color: "white" }} to="/">
                BLOG
              </Link>
            </Typography>
          </div>

          <Link to="/blogs">
            <Button sx={{ my: 2, color: "white", display: "block" }}>
              All Blog
            </Button>
          </Link>
          <Link to="/createPost">
            <Button sx={{ my: 2, color: "white", display: "block" }}>
              Create Post
            </Button>
          </Link>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
