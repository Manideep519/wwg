import { Box, Button, Stack, Text, TextInput, Textarea, Title } from "@mantine/core";
import { useContext } from "react";
import { TemplateContext } from "../../../App";
import { isNotEmpty, useForm } from "@mantine/form";

const MapAndDirections = ({ setView }) => {
  const { templateData, setTemplateData } = useContext(TemplateContext);
  const form = useForm({
    initialValues: {
      link: templateData?.mapAndDirections?.link,
      directions: templateData?.mapAndDirections?.directions,
    },

    validate: {
      link: isNotEmpty("Location url is required"),
      directions: isNotEmpty("Directions to reach is required"),
    },
  });

  function handleAddMapAndDirections(data) {
    console.log(data);
    setTemplateData((prev) => {
      return {
        ...prev,
        errors: { ...prev.errors, mapAndDirections: false },
        mapAndDirections: { ...data },
      };
    });
    setView("Travel and Accommodation");
  }

  return (
    <Box
      component="form"
      onSubmit={form.onSubmit((data) => {
        handleAddMapAndDirections(data);
      })}
    >
      <Stack>
        <Text size={"lg"}>Add map and directions</Text>
        <Stack>
          <TextInput
            name="link"
            label="Location url"
            withAsterisk
            {...form.getInputProps("link")}
          />
          <Textarea
            rows={10}
            name="directions"
            label="Directions to reach"
            withAsterisk
            {...form.getInputProps("directions")}
          />
        </Stack>
        <Button
          style={{
            alignSelf: "flex-end",
          }}
          type="submit"
          size="md"
        >
          Save
        </Button>
      </Stack>
    </Box>
  );
};

export default MapAndDirections;
