import { Container, Group, Title } from "@mantine/core";
import classes from "./Footer.module.css";
import { Link } from "react-router-dom";

const links = [
  { link: "/", label: "Home" },
  { link: "/about", label: "About" },
  { link: "/login", label: "Log in" },
  { link: "/signup", label: "Sign up" },
  { link: "/contact", label: "Contact" },
];

export function Footer() {
  const items = links.map((link) => (
    <Link
      key={link.label}
      to={link.link}
      style={{
        color: "grape",
        fontSize: "14px",
      }}
    >
      {link.label}
    </Link>
  ));

  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <Title
          style={{
            color: "grey",
          }}
          size={20}
        >
          &copy; 2023 Wedding Website Generator
        </Title>
        <Group className={classes.links}>{items}</Group>
      </Container>
    </div>
  );
}
