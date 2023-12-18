import {
  Box,
  Button,
  Container,
  Loader,
  Paper,
  PasswordInput,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import classes from "./Login.module.css";
import { useContext, useState } from "react";
import { useForm, isNotEmpty, isEmail } from "@mantine/form";
import { toast } from "react-toastify";
import { UserContext } from "../../App";
import Wrapper from "../Wrapper/Wrapper";

export function Login() {
  const { updateUserData } = useContext(UserContext);

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: isEmail("Invalid email"),
      password: isNotEmpty("Password is required"),
    },
  });

  async function loginUser(formData) {
    setLoading(true);
    try {
      const response = await axios.post("/user/login", {
        email: formData.email,
        password: formData.password,
      });
      navigate("/dashboard");
      setLoading(false);
      toast.success("Login successful");
      updateUserData(response?.data);
    } catch (err) {
      setLoading(false);
      console.log(err);
      toast.error("Error logging in!");
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
              width: "500px",
            }}
            component="form"
            onSubmit={form.onSubmit((data) => {
              loginUser(data);
            })}
          >
            <Stack gap={"lg"}>
              <Title order={2}>Log in </Title>
              <TextInput
                name="email"
                placeholder="Your email"
                label="Email"
                withAsterisk
                {...form.getInputProps("email")}
              />
              <PasswordInput
                name="password"
                placeholder="Your password"
                label="password"
                id="your-password"
                withAsterisk
                {...form.getInputProps("password")}
              />
              <Link
                style={{
                  color: "grape",
                  fontSize: "14px",
                  alignSelf: "flex-start",
                }}
                to={"/forgotpassword"}
              >
                Forgot your password?
              </Link>

              <Button type="submit" fullWidth variant="filled">
                {loading ? (
                  <Loader size={"sm"} color="rgba(255, 255, 255, 1)" type="bars" />
                ) : (
                  "Login"
                )}
              </Button>
            </Stack>
          </Paper>
        </Container>
      </Box>
    </Wrapper>
  );
}
