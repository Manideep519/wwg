import { Box, Container, Flex, Image, Text } from "@mantine/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Carousel, CarouselSlide } from "@mantine/carousel";
import classes from "./Template1.module.css";
import landingBg from "../assets/landing.jpg";
import travel from "../assets/info.jpg";

const Template1 = () => {
  const { templateId } = useParams();

  const [templateData, setTemplateData] = useState();

  async function fetchTemplateData(templateId) {
    try {
      const response = await axios.get(`/template/${templateId}`);
      console.log(response.data);
      setTemplateData(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchTemplateData(templateId);
    console.log(templateId);
  }, [templateId]);

  return (
    <>
      <Box
        style={{
          backgroundImage: `linear-gradient(to right bottom,rgba(200, 163, 182,.4),rgba(200, 163, 182,.4)),url(${landingBg})`,
        }}
        className={classes.landing}
      >
        <Container>
          <Flex
            direction={"column"}
            style={{
              height: "100vh",
            }}
            justify={"center"}
            align={"center"}
          >
            <Text
              style={{
                fontSize: "100px",
                textTransform: "uppercase",
                fontWeight: "lighter",
                background: "#dec4d7",
                padding: "0 30px",
              }}
            >
              {templateData?.eventDetails?.brideName}{" "}
              <span
                style={{
                  fontSize: "80px",
                }}
              >
                &
              </span>{" "}
              {templateData?.eventDetails?.groomName}
            </Text>
            <Text
              style={{
                fontFamily: "Times New Roman",
                fontSize: "50px",
                fontWeight: "lighter",
                color: "rgba(0,0,0,.6)",
              }}
            >
              <i>Are Getting Married</i>
            </Text>
          </Flex>
        </Container>
      </Box>
      <Box className={classes.story}>
        <Flex
          style={{
            textAlign: "center",
          }}
          gap={"lg"}
          direction={"column"}
          justify={"center"}
          align={"center"}
        >
          <Text
            style={{
              fontSize: "40px",
              textTransform: "uppercase",
              fontWeight: "lighter",
            }}
          >
            OUR STORY
          </Text>
          <Text
            style={{
              fontSize: "26px",
              color: "#dec4d7",
            }}
          >
            WE ARE GETTING MARRIED (:
          </Text>
          <Text
            style={{
              fontSize: "15px",
              lineHeight: "1.9",
              maxWidth: "50%",
            }}
          >
            {templateData?.eventDetails?.yourStory}
          </Text>
        </Flex>
      </Box>
      <Flex direction={"column"} gap={"lg"} className={classes.gallery}>
        <Text
          style={{
            fontSize: "40px",
            textAlign: "center",
            textTransform: "uppercase",
            fontWeight: "lighter",
          }}
        >
          Photo Gallery
        </Text>
        <Carousel align="start" slideGap="md" controlSize={32} dragFree slideSize="33.333333%" loop>
          {templateData?.photoGallery?.map((src, index) => {
            return (
              <CarouselSlide key={index}>
                <Box mr={"10px"} key={index}>
                  <Image
                    style={{
                      borderRadius: "10px",
                      height: "460px",
                    }}
                    src={src}
                  />
                </Box>
              </CarouselSlide>
            );
          })}
        </Carousel>
      </Flex>

      <Flex gap="lg" className={classes.info} align={"center"} direction={"column"}>
        <Text
          style={{
            fontSize: "50px",
            textTransform: "uppercase",
            fontWeight: "lighter",
            padding: "0 30px",
          }}
        >
          THE WEDDING DAY
        </Text>
        <Flex gap={"120px"}>
          <Flex direction={"column"} gap="lg">
            <Text
              style={{
                fontSize: "26px",
                color: "#dec4d7",
              }}
            >
              <i>When</i>
            </Text>
            <Text>
              Date : {templateData?.eventDetails?.weddingDate} <br />
              Time: {templateData?.eventDetails?.weddingTime}
            </Text>
          </Flex>
          <Flex direction={"column"} gap="lg">
            <Text
              style={{
                fontSize: "26px",
                color: "#dec4d7",
              }}
            >
              <i>Where</i>
            </Text>
            <Text>{templateData?.eventDetails?.weddingVenue}</Text>
          </Flex>
        </Flex>
      </Flex>
      <Flex
        className={classes.travel}
        direction={"column"}
        align={"center"}
        gap={"lg"}
        style={{
          textAlign: "center",
          color: "white",
          backgroundImage: `linear-gradient(to right bottom,rgba(200, 163, 182,.85),rgba(200, 163, 182,.85)),url(${travel})`,
        }}
      >
        <Text
          style={{
            fontSize: "50px",
            textTransform: "uppercase",
            fontWeight: "lighter",
            marginBottom: "30px",
          }}
        >
          GETTING THERE
        </Text>
        <Text
          style={{
            fontSize: "26px",
          }}
        >
          TRANSPORTATION
        </Text>
        <Text
          style={{
            fontSize: "15px",
            lineHeight: "1.9",
            maxWidth: "50%",
          }}
        >
          {templateData?.travelAndAccommodation?.travelInfo}
        </Text>
        <Text
          style={{
            fontSize: "26px",
          }}
        >
          ACCOMMODATION
        </Text>
        <Text
          style={{
            fontSize: "15px",
            lineHeight: "1.9",
            maxWidth: "50%",
          }}
        >
          {templateData?.travelAndAccommodation?.accommodationsInfo}
        </Text>
      </Flex>
      <Flex direction={"column"} align={"center"} py="lg">
        <Text
          style={{
            fontSize: "26px",
            color: "#dec4d7",
          }}
        >
          #{templateData?.eventDetails?.brideName}&{templateData?.eventDetails?.groomName}
        </Text>
        <Text>© 2023 By Wedding Website Generator</Text>
      </Flex>
    </>
  );
};

export default Template1;
