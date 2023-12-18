import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  NavLink,
  Paper,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import {
  IconCalendarEvent,
  IconChecklist,
  IconPhotoPlus,
  IconLocation,
  IconBuildingSkyscraper,
  IconPalette,
  IconLogout,
} from "@tabler/icons-react";
import { useContext, useEffect, useState } from "react";

import EventDetails from "./DashboardViews/EventDetails";
import GuestListManagement from "./DashboardViews/GuestListManagement";
import PhotoGallery from "./DashboardViews/PhotoGallery";
import MapAndDirections from "./DashboardViews/MapAndDirections";
import TravelAndAccommodation from "./DashboardViews/TravelAndAccommodation";
import ColorManagement from "./DashboardViews/ColorManagement";
import axios from "axios";
import { TemplateContext, UserContext } from "../../App";
import { useNavigate } from "react-router-dom";
import Wrapper from "../Wrapper/Wrapper";

const Dashboard = () => {
  const dashboardNavItems = [
    { item: "Event Details", icon: <IconCalendarEvent size="1rem" stroke={1.5} /> },
    { item: "Guest List Management", icon: <IconChecklist size="1rem" stroke={1.5} /> },
    { item: "Photo Gallery", icon: <IconPhotoPlus size="1rem" stroke={1.5} /> },
    { item: "Map and Directions", icon: <IconLocation size="1rem" stroke={1.5} /> },
    { item: "Travel and Accommodation", icon: <IconBuildingSkyscraper size="1rem" stroke={1.5} /> },
    { item: "Color Management", icon: <IconPalette size="1rem" stroke={1.5} /> },
  ];
  const navigate = useNavigate();

  const { userData, updateUserData } = useContext(UserContext);
  const { templateData, setTemplateData } = useContext(TemplateContext);

  const [view, setView] = useState("Event Details");
  function changeDashboardView(item) {
    setView(() => {
      return item;
    });
  }

  useEffect(() => {
    const getTemplateData = async () => {
      const response = await axios.get(`/template/user/${userData?._id}`);
      setTemplateData((prev) => {
        return {
          ...prev,
          errors: {
            eventDetails: false,
            mapAndDirections: false,
            travelAndAccommodation: false,
            colorManagement: false,
          },
          ...response.data[0],
        };
      });
    };
    getTemplateData();
  }, [setTemplateData, userData]);

  return (
    <Wrapper>
      <Container size={"xl"}>
        <Paper
          withBorder
          my={"xl"}
          style={{
            display: "flex",
            minHeight: `600px`,
          }}
        >
          <Paper withBorder m={"xs"}>
            <Title
              style={{
                fontSize: "20px",
              }}
              my="lg"
              pl={"lg"}
            >
              Dashboard
            </Title>
            <Divider />
            <Stack gap={"0"}>
              <Box>
                {dashboardNavItems.map((menu, index) => {
                  return (
                    <NavLink
                      onClick={() => {
                        changeDashboardView(menu.item);
                      }}
                      py="md"
                      style={{
                        borderBottom: "1px solid #dee2e6",
                        background: view === menu.item ? "#ae3ec9" : "inherit",
                        color: view === menu.item ? "white" : "inherit",
                      }}
                      key={index}
                      component="div"
                      label={menu.item}
                      leftSection={menu.icon}
                    />
                  );
                })}
              </Box>
              <NavLink
                onClick={() => {
                  if (confirm("Confirm Logout!")) {
                    navigate("/");
                    updateUserData(() => {
                      return null;
                    });
                    setTemplateData(null);
                  }
                }}
                variant="subtle"
                py="md"
                component="button"
                style={{
                  borderBottom: "1px solid #dee2e6",
                  marginTop: "auto",
                }}
                label={"Log out"}
                leftSection={<IconLogout size="1rem" stroke={1.5} />}
              />
            </Stack>
          </Paper>
          <Paper withBorder m="sm" style={{ flex: 1, alignSelf: "stretch", overflow: "hidden" }}>
            <Title
              style={{
                fontSize: "20px",
              }}
              my="lg"
              pl={"lg"}
            >
              {view}
            </Title>
            <Divider />
            <Box p={"xl"}>
              {view === "Event Details" ? (
                <EventDetails setView={setView} />
              ) : view === "Guest List Management" ? (
                <GuestListManagement setView={setView} />
              ) : view === "Photo Gallery" ? (
                <PhotoGallery setView={setView} />
              ) : view === "Map and Directions" ? (
                <MapAndDirections setView={setView} />
              ) : view === "Travel and Accommodation" ? (
                <TravelAndAccommodation setView={setView} />
              ) : view === "Color Management" ? (
                <ColorManagement setView={setView} />
              ) : (
                ""
              )}
            </Box>
          </Paper>
        </Paper>
      </Container>
    </Wrapper>
  );
};

export default Dashboard;
