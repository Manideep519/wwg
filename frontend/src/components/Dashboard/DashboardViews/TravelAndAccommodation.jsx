import { Box, Button, Stack, Text, TextInput, Textarea, Title } from "@mantine/core";
import { useContext } from "react";
import { TemplateContext } from "../../../App";
import { isNotEmpty, useForm } from "@mantine/form";

const TravelAndAccommodation = ({ setView }) => {
  const { templateData, setTemplateData } = useContext(TemplateContext);
  const form = useForm({
    initialValues: {
      travelInfo: templateData?.travelAndAccommodation?.travelInfo,
      accommodationsInfo: templateData?.travelAndAccommodation?.accommodationsInfo,
    },

    validate: {
      travelInfo: isNotEmpty("Travel info is required"),
      accommodationsInfo: isNotEmpty("Accommodations info is required"),
    },
  });

  function handleAddTravelAndAccommodation(data) {
    console.log(data);
    setTemplateData((prev) => {
      return {
        ...prev,
        errors: { ...prev.errors, travelAndAccommodation: false },
        travelAndAccommodation: { ...data },
      };
    });
    setView("Color Management");
  }

  return (
    <Box
      component="form"
      onSubmit={form.onSubmit((data) => {
        handleAddTravelAndAccommodation(data);
      })}
    >
      <Stack>
        <Text size={"lg"}>Add info about tarvel and accommodation</Text>
        <Stack>
          <Textarea
            rows={5}
            name="travelInfo"
            label="Travel info"
            withAsterisk
            {...form.getInputProps("travelInfo")}
          />
          <Textarea
            rows={5}
            name="accommodationsInfo"
            label="Accommodations info"
            withAsterisk
            {...form.getInputProps("accommodationsInfo")}
          />
        </Stack>
        <Button
          type="submit"
          style={{
            alignSelf: "flex-end",
          }}
          size="md"
        >
          Save
        </Button>
      </Stack>
    </Box>
  );
};

export default TravelAndAccommodation;
