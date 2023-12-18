import { Box, Button, Flex, Group, Image, Paper, Stack, Text, rem } from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { useContext, useRef, useState } from "react";
import { IconUpload, IconPhoto, IconX } from "@tabler/icons-react";
import { Carousel } from "@mantine/carousel";
import { uploadFile } from "@uploadcare/upload-client";
import { TemplateContext } from "../../../App";

const PhotoGallery = ({ setView }) => {
  const openRef = useRef(null);
  const [files, setFiles] = useState([]);
  const [urls, setUrls] = useState([]);
  const [error, setError] = useState("");

  const { templateData, setTemplateData } = useContext(TemplateContext);

  function addNewFiles(newFiles) {
    if (urls.length >= 5) {
      setError("Maximum limit of 5 images reached!");
    } else {
      setError("");
      setFiles((prev) => {
        let allFiles = [...prev, ...newFiles];
        let tempUrls = allFiles.reverse().map((file) => URL.createObjectURL(file));
        setUrls(() => [...tempUrls]);
        return [...prev, ...newFiles];
      });
    }
  }

  async function uploadImages() {
    if (templateData?.photoGallery?.length === 0) {
      const params = {
        publicKey: "367ef15bdf858ee4e78a",
        store: "auto",
        metadata: {
          subsystem: "Wedding-Website-Generator",
          template: "photo-gallery",
        },
      };
      let file = files;

      let arrayOfImageUploadPromises = files.map((file) => {
        return uploadFile(file, params);
      });
      console.log(arrayOfImageUploadPromises);
      const response = await Promise.allSettled(arrayOfImageUploadPromises);
      let imageURLs = response?.map((image) => {
        if (image.status === "fulfilled") {
          return image.value?.cdnUrl;
        }
      });
      setTemplateData((prev) => {
        return {
          ...prev,
          photoGallery: [...imageURLs],
        };
      });
    }
  }

  return (
    <Stack>
      {templateData?.photoGallery?.length === 0 ? (
        <>
          <Flex align={"center"} gap={"md"}>
            <Text size={"lg"}>Upload your photos here </Text>
            {error ? (
              <Text
                style={{
                  fontWeight: "bold",
                  color: "red",
                }}
                size="md"
              >
                ({error})
              </Text>
            ) : null}
          </Flex>
          <Dropzone
            maxSize={3 * 1024 ** 2}
            accept={IMAGE_MIME_TYPE}
            openRef={openRef}
            maxFiles={5}
            onDrop={(files) => {
              addNewFiles(files);
            }}
            onReject={(files) => {
              setError("Select maximum of 5 images at a time");
            }}
            style={{
              border: "1px dashed #dee2e6",
              borderRadius: "20px",
              cursor: "pointer",
            }}
          >
            <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: "none" }}>
              <Dropzone.Accept>
                <IconUpload
                  style={{ width: rem(52), height: rem(52), color: "var(--mantine-color-blue-6)" }}
                  stroke={1.5}
                />
              </Dropzone.Accept>
              <Dropzone.Reject>
                <IconX
                  style={{ width: rem(52), height: rem(52), color: "var(--mantine-color-red-6)" }}
                  stroke={1.5}
                />
              </Dropzone.Reject>
              <Dropzone.Idle>
                <IconPhoto
                  style={{ width: rem(52), height: rem(52), color: "var(--mantine-color-dimmed)" }}
                  stroke={1.5}
                />
              </Dropzone.Idle>

              <div>
                <Text size="xl" inline>
                  Drag images here or click to select files
                </Text>
                <Text size="sm" c="dimmed" inline mt={7}>
                  Attach upto 5 images, each image should not exceed 5mb
                </Text>
              </div>
            </Group>
          </Dropzone>
          <Group justify="center">
            <Button variant="light" onClick={() => openRef.current?.()}>
              {"Browse images"}
            </Button>
          </Group>

          <Flex align={"center"} justify={"space-between"}>
            <Text size={"lg"}>Preview of images to be uploaded ({urls.length})</Text>
            <Button
              onClick={() => {
                setError("");
                setUrls([]);
                setFiles([]);
              }}
            >
              Clear images
            </Button>
          </Flex>
          <Paper bg={"grape.1"} p={"sm"}>
            <Carousel
              withIndicators
              height={200}
              slideSize="33.333333%"
              slideGap="xl"
              align="start"
              slidesToScroll={3}
              style={{
                backgroundColor: "grape",
              }}
            >
              {urls.map((src, index) => {
                return (
                  <Box mr={"10px"} key={index}>
                    <Image
                      style={{
                        minWidth: "200px",
                        height: "200px",
                        borderRadius: "10px",
                      }}
                      src={src}
                    />
                  </Box>
                );
              })}
            </Carousel>
          </Paper>
        </>
      ) : (
        <>
          <Flex align={"center"} justify={"space-between"}>
            <Text size={"lg"}>Uploaded images ({templateData?.photoGallery?.length})</Text>
            {templateData?.photoGallery?.length === 0 ? (
              <Button
                onClick={() => {
                  setError("");
                  setUrls([]);
                  setFiles([]);
                }}
              >
                Clear images
              </Button>
            ) : null}
          </Flex>
          <Paper bg={"grape.1"} p={"sm"}>
            <Carousel
              withIndicators
              height={300}
              slideSize="33.333333%"
              slideGap="xl"
              align="start"
              slidesToScroll={3}
              style={{
                backgroundColor: "grape",
              }}
            >
              {templateData?.photoGallery?.map((src, index) => {
                return (
                  <Box mr={"10px"} key={index}>
                    <Image
                      style={{
                        height: "300px",
                        borderRadius: "10px",
                      }}
                      src={src}
                    />
                  </Box>
                );
              })}
            </Carousel>
          </Paper>
        </>
      )}
      <Button
        style={{
          alignSelf: "flex-end",
        }}
        onClick={() => {
          uploadImages();
          setView(() => "Map and Directions");
        }}
        size="md"
      >
        {templateData?.photoGallery?.length === 0 ? "Save" : "Next"}
      </Button>
    </Stack>
  );
};

export default PhotoGallery;
