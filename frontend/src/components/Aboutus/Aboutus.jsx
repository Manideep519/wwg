import React from "react";

import classes from "./Aboutus.module.css";
import {
  Badge,
  Box,
  Card,
  Container,
  Group,
  SimpleGrid,
  Text,
  Title,
  rem,
  useMantineTheme,
} from "@mantine/core";
import { IconGauge, IconUser, IconCookie } from "@tabler/icons-react";
import Wrapper from "../Wrapper/Wrapper";
const mockdata = [
  {
    title: "Intuitive Website Creation",
    description:
      "The application allows couples to easily create bespoke wedding websites, providing a range of customizable templates to suit their unique style and preferences.",
    icon: IconGauge,
  },
  {
    title: "Comprehensive Wedding Information",
    description:
      "The platform offers a centralized hub for sharing critical wedding details, including event information, guest list management, photo galleries, and RSVP functionality, ensuring a seamless and personalized experience for guests.",
    icon: IconUser,
  },
  {
    title: "Mobile-Friendly Design",
    description:
      "The design of the wedding websites is optimized for mobile devices, ensuring that guests can access and view important information on various screen sizes and devices.",
    icon: IconCookie,
  },
];

const Aboutus = () => {
  const theme = useMantineTheme();
  const features = mockdata.map((feature) => (
    <Card key={feature.title} shadow="md" radius="md" className={classes.card} padding="xl">
      <feature.icon
        style={{ width: rem(50), height: rem(50) }}
        stroke={2}
        color={theme.colors.grape[6]}
      />
      <Text fz="lg" fw={500} className={classes.cardTitle} mt="md">
        {feature.title}
      </Text>
      <Text fz="sm" c="dimmed" mt="sm">
        {feature.description}
      </Text>
    </Card>
  ));
  return (
    <Wrapper>
      <Box className={classes.bg}>
        <Container
          style={{
            paddingTop: "100px",

            minHeight: `calc(100vh - 60px)`,
          }}
        >
          <Title order={2} className={classes.title} ta="center" mt="sm">
            Craft Your Dream Wedding Website, Seamlessly
          </Title>

          <Text className={classes.description} ta="center" mt="md">
            The Personalized Wedding Website Generator is a web application empowering couples to
            effortlessly create and personalize their wedding websites. This platform acts as a
            centralized space for sharing vital wedding details with guests, providing a seamless
            and individualized experience.
          </Text>

          <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl" mt={50}>
            {features}
          </SimpleGrid>
        </Container>
      </Box>
    </Wrapper>
  );
};

export default Aboutus;
