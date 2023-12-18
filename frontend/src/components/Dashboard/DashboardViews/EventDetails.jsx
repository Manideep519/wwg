import { Box, Button, Stack, Text, TextInput, Textarea } from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import { TemplateContext } from "../../../App";
import { isNotEmpty, useForm } from "@mantine/form";

const EventDetails = ({ setView }) => {
  const { templateData, setTemplateData } = useContext(TemplateContext);
  const [load, setLoad] = useState(false);

  const form = useForm({
    initialValues: {
      brideName: templateData?.eventDetails?.brideName,
      groomName: templateData?.eventDetails?.groomName,
      weddingDate: templateData?.eventDetails?.weddingDate,
      weddingTime: templateData?.eventDetails?.weddingTime,
      weddingVenue: templateData?.eventDetails?.weddingVenue,
      yourStory: templateData?.eventDetails?.yourStory,
    },

    validate: {
      brideName: isNotEmpty("brideName is required"),
      groomName: isNotEmpty("groomName is required"),
      weddingDate: isNotEmpty("weddingDate is required"),
      weddingTime: isNotEmpty("weddingTime is required"),
      weddingVenue: isNotEmpty("weddingVenue is required"),
      yourStory: isNotEmpty("yourStory is required"),
    },
  });

  function handleAddEventDetails(eventData) {
    setTemplateData((prev) => {
      return {
        ...prev,
        errors: { ...prev.errors, eventDetails: false },
        eventDetails: { ...eventData },
      };
    });
    setView("Guest List Management");
  }

  useEffect(() => {
    form.setFieldValue("brideName", templateData?.eventDetails?.brideName);
    form.setFieldValue("groomName", templateData?.eventDetails?.groomName);
    form.setFieldValue("weddingDate", templateData?.eventDetails?.weddingDate);
    form.setFieldValue("weddingTime", templateData?.eventDetails?.weddingTime);
    form.setFieldValue("weddingVenue", templateData?.eventDetails?.weddingVenue);
    form.setFieldValue("yourStory", templateData?.eventDetails?.yourStory);
  }, [templateData]);

  return (
    <>
      <Text size="lg" mb={"lg"}>
        Fill your event details
      </Text>
      <Box
        component="form"
        onSubmit={form.onSubmit((data) => {
          handleAddEventDetails(data);
        })}
      >
        <Stack>
          <TextInput
            name="brideName"
            label="Bride's name"
            withAsterisk
            {...form.getInputProps("brideName")}
          />
          <TextInput
            name="groomName"
            label="Groom's name"
            withAsterisk
            {...form.getInputProps("groomName")}
          />
          <TextInput
            name="weddingDate"
            type="date"
            label="Wedding Date"
            withAsterisk
            {...form.getInputProps("weddingDate")}
          />
          <TextInput
            name="weddingTime"
            type="time"
            label="Wedding Time"
            withAsterisk
            {...form.getInputProps("weddingTime")}
          />
          <TextInput
            name="weddingVenue"
            label="Wedding Venue"
            withAsterisk
            {...form.getInputProps("weddingVenue")}
          />
          <Textarea
            name="yourStory"
            rows={5}
            label="Your story"
            withAsterisk
            {...form.getInputProps("yourStory")}
          />

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
    </>
  );
};

export default EventDetails;
