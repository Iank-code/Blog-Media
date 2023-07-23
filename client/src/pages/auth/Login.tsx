import "../../output.css";
import { IconCheck, IconX } from "@tabler/icons-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm, yupResolver } from "@mantine/form";
import {
  LoginInput,
  loginValidator,
} from "../../utils/validators/auth.validators";
import {
  TextInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  // Button,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import Navbar from "../../components/Navbar";
import { HeaderSearchProps } from "../../utils/interface/app.interface";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate()
  const form = useForm<LoginInput>({
    initialValues: {
      email: "",
      zipcode: "",
    },

    validate: yupResolver(loginValidator),
  });

  const submitForm = () => {
    const formItem = new FormData();

    formItem.append("email", form.values.email);
    formItem.append("zipcode", form.values.zipcode);

    if (form.validate().hasErrors === true) {
      for (const [key, value] of Object.entries(form.validate().errors)) {
        notifications.show({
          title: `Invalid ${key}`,
          message: `${value}🤥`,
          color: "red",
          autoClose: 2000,
          icon: <IconX />,
        });
      }
    }

    axios({
      method: "post",
      url: "http://localhost:3000/api/auth/login",
      // url: `{process.env.SERVER_URL}/auth/login`,
      data: {
        email: form.values.email,
        zipcode: form.values.zipcode,
      },
    })
      .then((res: any) => {
        if (res.status === 200) {
          console.log(res.data)
          localStorage.setItem("uid", res.data._id);
          localStorage.setItem("accessToken", res.data.accessToken)
          localStorage.setItem("username", res.data.username);
          notifications.show({
            title: `Login Successfull`,
            message: `Welcome back`,
            color: "green",
            autoClose: 2000,
            icon: <IconCheck />,
          });

          const accessToken = localStorage.getItem("accessToken");
          if(accessToken){
            navigate("/landing")
          }
        }
      })
      .catch((error) => {
        console.log(error.response.data);
        notifications.show({
          title: `Invalid Username or email address`,
          message: `Check if you entered the correct information🤥`,
          color: "red",
          autoClose: 2000,
          icon: <IconX />,
        });
      });
  };

  // Interface for Navbar
  const headerLinks: HeaderSearchProps["links"] = [
    {
      link: "/",
      label: "Home",
    },
    {
      link: "/login",
      label: "Login",
    },
    {
      link: "/register",
      label: "Register",
    },
    // Add more link groups as needed
  ];
  return (
    <>
      <Navbar links={headerLinks} />
      <Container size={420} my={40}>
        <Title
          align="center"
          sx={(theme) => ({
            fontFamily: `Greycliff CF, ${theme.fontFamily}`,
            fontWeight: 900,
          })}
        >
          Welcome back!
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          Do not have an account yet?{" "}
          <Anchor size="sm" component="button">
            <NavLink to="/register">Create account</NavLink>
          </Anchor>
        </Text>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <form onSubmit={form.onSubmit((values) => values)}>
            <TextInput
              label="Email"
              placeholder="you@mantine.dev"
              required
              {...form.getInputProps("email")}
            />
            <TextInput
              label="Zip Code"
              placeholder="Your Zip Code"
              required
              mt="md"
              {...form.getInputProps("zipcode")}
            />
            <Group position="apart" mt="lg">
              <Checkbox label="Remember me" />
              <Anchor component="button" size="sm">
                Forgot password?
              </Anchor>
            </Group>
            <button
              className="bg-blue-500 text-white py-1 w-full rounded mt-4"
              type="submit"
              onClick={submitForm}
            >
              Sign in
            </button>
          </form>
        </Paper>
      </Container>
    </>
  );
}
