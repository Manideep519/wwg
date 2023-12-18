import {
  Box,
  Button,
  Container,
  Flex,
  Loader,
  Paper,
  PasswordInput,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import classes from "./Signup.module.css";
import { useState } from "react";
import { useForm, isNotEmpty, isEmail, hasLength, matchesField } from "@mantine/form";
import { toast } from "react-toastify";
import Wrapper from "../Wrapper/Wrapper";
export function Signup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    },

    validate: {
      firstName: hasLength({ min: 2, max: 10 }, "firstName must be 2-10 characters long"),
      lastName: hasLength({ min: 2, max: 10 }, "lastName must be 2-10 characters long"),
      email: isEmail("Invalid email"),
      phoneNumber: isNotEmpty("Phone number is required"),
      password: hasLength({ min: 6, max: 20 }, "Password must be 2-10 characters long "),
      confirmPassword: matchesField("password", "Passwords do not match"),
    },
  });

  async function signUpUser(formData) {
    setLoading(true);
    try {
      const response = await axios.post("/user/signup", {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phoneNumber: formData.phoneNumber,
        email: formData.email,
        password: formData.password,
      });
      navigate("/login");
      setLoading(false);
      toast.success("Registration successful");
      console.log(response);
    } catch (err) {
      setLoading(false);
      toast.error(err.response.data.message);
      console.log(err.response.data.message);
    }
  }

  return (
    <Wrapper>
      <Box className={classes.bg}>
        <Container
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: "150px",
            alignItems: "flex-start",
            minHeight: `calc(100vh - 60px)`,
          }}
        >
          <Paper
            radius="md"
            withBorder
            style={{
              padding: "50px",
              width: "700px",
            }}
            component="form"
            onSubmit={form.onSubmit((data) => {
              signUpUser(data);
            })}
          >
            <Stack gap={"lg"}>
              <Title order={2}>Sign up </Title>
              <Flex gap="md">
                <TextInput
                  name="firstName"
                  placeholder="Your firstname"
                  style={{ flex: 1 }}
                  label="First name"
                  withAsterisk
                  {...form.getInputProps("firstName")}
                />
                <TextInput
                  placeholder="Your lastname"
                  style={{ flex: 1 }}
                  label="Last name"
                  name="lastName"
                  withAsterisk
                  {...form.getInputProps("lastName")}
                />
              </Flex>
              <Flex gap="md">
                <TextInput
                  placeholder="Your email"
                  type="email"
                  style={{ flex: 1 }}
                  label="Email"
                  name="email"
                  withAsterisk
                  {...form.getInputProps("email")}
                />
                <TextInput
                  placeholder="Your number"
                  type="tel"
                  style={{ flex: 1 }}
                  label="Phone number"
                  name="phoneNumber"
                  withAsterisk
                  {...form.getInputProps("phoneNumber")}
                />
              </Flex>
              <Flex gap="md">
                <PasswordInput
                  placeholder="At least 6 characters"
                  style={{ flex: 1 }}
                  label="Password"
                  id="password"
                  name="password"
                  withAsterisk
                  {...form.getInputProps("password")}
                />
                <PasswordInput
                  placeholder="Re-enter your password"
                  style={{ flex: 1 }}
                  label="Confirm password"
                  id="confirm-password"
                  name="confirmPassword"
                  withAsterisk
                  {...form.getInputProps("confirmPassword")}
                />
              </Flex>
              <Link
                style={{
                  alignSelf: "flex-start",
                  color: "grape",
                  fontSize: "14px",
                }}
                to={"/login"}
              >
                Already have an account? Login
              </Link>
              <Button type="submit" fullWidth variant="filled">
                {loading ? (
                  <Loader size={"sm"} color="rgba(255, 255, 255, 1)" type="bars" />
                ) : (
                  "Sign up"
                )}
              </Button>
            </Stack>
          </Paper>
        </Container>
      </Box>
    </Wrapper>
  );
}
