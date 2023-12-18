import { Box, Button, Flex, Loader, Stack, Text, Title } from "@mantine/core";
import axios from "axios";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { TemplateContext, UserContext } from "../../../App";
import { toast } from "react-toastify";

const ColorManagement = () => {
  const colors = [
    "red",
    "pink",
    "grape",
    "violet",
    "indigo",
    "blue",
    "cyan",
    "teal",
    "green",
    "lime",
    "yellow",
    "orange",
  ];
  const { templateData, setTemplateData } = useContext(TemplateContext);
  const { userData } = useContext(UserContext);
  const [color, setColor] = useState(templateData?.colorManagement);
  const [loading, setLoading] = useState(false);
  const [templateId, setTemplateId] = useState("");

  function handleAddColor(color) {
    console.log(color);
    setColor(color);
    setTemplateData((prev) => {
      return {
        ...prev,
        userId: userData?._id,
        errors: { ...prev.errors, colorManagement: false },
        colorManagement: color,
      };
    });
  }

  async function generateSite() {
    setLoading(true);

    let missingFields = Object.keys(templateData?.errors).filter(
      (key) => templateData?.errors[key] === true
    );

    let { errors, ..._templateData } = templateData;
    if (missingFields.length > 0) {
      toast.error(
        <>
          Missing fileds in <br />
          <b>{missingFields?.join(" ")}</b>
        </>,
        {
          autoClose: "10000",
          theme: "light",
        }
      );

      return;
    }

    try {
      const response = await axios.post("/template/create", {
        token: userData.token,
        ..._templateData,
      });
      toast.success("Successfully saved the details!");
      setLoading(false);
      setTemplateId(response?.data?.template?._id);
    } catch (err) {
      toast.error("Error saving the data!");
      setLoading(false);
      console.log(err);
    }
  }

  return (
    <Stack>
      <Text size="xl" mb={"lg"}>
        Choose a color for your website
      </Text>
      <Flex mb={"lg"} align={"center"}>
        <Text size="lg">Selected color : &nbsp;</Text>
        <Box
          bg={color}
          style={{
            borderRadius: "10px",
            width: "35px",
            height: "35px",
          }}
        ></Box>
      </Flex>
      <Flex wrap={"wrap"}>
        {colors.map((color, index) => {
          return (
            <Flex
              style={{
                flexDirection: "column",
                alignItems: "center",
                gap: "20px",
              }}
              gap={"20px"}
              key={index}
            >
              <Box
                onClick={() => {
                  handleAddColor(color);
                }}
                bg={color}
                style={{
                  borderRadius: "10px",
                  width: "75px",
                  height: "75px",
                  cursor: "pointer",
                  marginRight: "10px",
                }}
              ></Box>
              <Text>{color}</Text>
            </Flex>
          );
        })}
      </Flex>

      <Button
        style={{
          width: "250px",
          alignSelf: "flex-end",
        }}
        onClick={() => {
          generateSite();
        }}
        size="md"
      >
        {loading ? <Loader color="white" type="bars" size={"sm"} /> : "Generate your website"}
      </Button>

      {templateId?.length !== 0 ? (
        <>
          <Link to={`/template/${templateId}`}>
            testing
            <Button
              style={{
                alignSelf: "stretch",
                width: "100%",
                display: "block",
              }}
              mt="lg"
              component="div"
            >
              Site Generated, Click to visit
            </Button>
          </Link>
        </>
      ) : null}
    </Stack>
  );
};

export default ColorManagement;
