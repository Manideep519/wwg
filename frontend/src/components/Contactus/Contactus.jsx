import {
  TextInput,
  Textarea,
  SimpleGrid,
  Group,
  Title,
  Button,
  Container,
  Paper,
  Box,
} from "@mantine/core";

import classes from "./Contactus.module.css";
import Wrapper from "../Wrapper/Wrapper";

export default function Contactus() {
  return (
    <Wrapper>
      <Box className={classes.bg}>
        <Container
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: "100px",
            alignItems: "flex-start",
            minHeight: `calc(100vh - 60px)`,
          }}
        >
          <Paper
            radius="md"
            withBorder
            style={{
              padding: "50px",
              width: "500px",
            }}
          >
            <form>
              <Title
                order={2}
                size="h1"
                style={{ fontFamily: "Greycliff CF, var(--mantine-font-family)" }}
                fw={900}
                ta="center"
              >
                Get in touch
              </Title>

              <TextInput mt="md" label="Name" placeholder="Your name" name="name" />
              <TextInput mt="md" label="Email" placeholder="Your email" name="email" />

              <TextInput label="Subject" placeholder="Subject" mt="md" name="subject" />
              <Textarea
                mt="md"
                label="Message"
                placeholder="Your message"
                maxRows={10}
                minRows={5}
                autosize
                name="message"
              />

              <Group justify="center" mt="xl">
                <Button type="submit" size="md">
                  Send message
                </Button>
              </Group>
            </form>
          </Paper>
        </Container>
      </Box>
    </Wrapper>
  );
}
