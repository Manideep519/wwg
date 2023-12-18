import {
  Group,
  Button,
  Text,
  Divider,
  Box,
  Burger,
  Drawer,
  ScrollArea,
  rem,
  Avatar,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "./Header.module.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../App";

export function Header() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const { userData } = useContext(UserContext);

  return (
    <Box>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <Text
            style={{
              fontWeight: "500",
            }}
            size="xl"
          >
            <Link
              style={{
                color: "inherit",
              }}
              to="/"
            >
              Wedding Website Generator
            </Link>
          </Text>

          <Group h="100%" gap={0} visibleFrom="sm">
            <Link to="/" className={classes.link}>
              Home
            </Link>
            <Link to="/about" className={classes.link}>
              About
            </Link>
            <Link to="/contact" className={classes.link}>
              Contact
            </Link>
          </Group>

          <Group visibleFrom="sm">
            {userData ? (
              <Link to="/dashboard">
                <Button size="md" component="div" variant="outline">
                  <Avatar color="grape" radius="xl">
                    {`${userData?.firstName?.charAt(0)}${userData?.lastName?.charAt(0)}`}
                  </Avatar>
                  &nbsp;&nbsp; Dashboard
                </Button>
              </Link>
            ) : (
              <>
                <Link
                  style={{
                    color: "inherit",
                    textDecoration: "none",
                  }}
                  to="/login"
                >
                  <Button component="div" variant="default">
                    Log in
                  </Button>
                </Link>
                <Link
                  style={{
                    color: "inherit",
                    textDecoration: "none",
                  }}
                  to="/signup"
                >
                  <Button component="div">Sign up</Button>
                </Link>
              </>
            )}
          </Group>

          <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
        </Group>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Wedding Website Generator"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Divider my="sm" />

          <Link to="/" className={classes.link}>
            Home
          </Link>
          <Link to="/about" className={classes.link}>
            About
          </Link>
          <Link to="/contact" className={classes.link}>
            Contact
          </Link>

          <Group py="lg" px="md">
            <Link to="/login">
              <Button component="div" variant="default">
                Log in
              </Button>
            </Link>
            <Link to="/signup">
              <Button component="div">Sign up</Button>
            </Link>
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
