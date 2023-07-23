import "../../output.css";
// import axios from "axios";
import { IconX } from "@tabler/icons-react";
import { NavLink } from "react-router-dom";

import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
} from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import {
  SignupInput,
  signupValidator,
} from "../../utils/validators/auth.validators";
import { notifications } from "@mantine/notifications";
import { HeaderSearchProps } from "../../utils/interface/app.interface";
import Navbar from "../../components/Navbar";

export default function Register() {
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

  const form = useForm<SignupInput>({
    initialValues: {
      username: "",
      email: "",
      zipcode: "",
      password: "",
      password_confirmation: "",
    },

    validate: yupResolver(signupValidator),
  });

  // Function for submitting the form
  const submitForm = () => {
    const formItem = new FormData();

    formItem.append("username", form.values.username);
    formItem.append("email", form.values.email);
    formItem.append("zipcode", form.values.zipcode);
    formItem.append("password", form.values.password);
    formItem.append("password_confirmation", form.values.password_confirmation);

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
    // axios.post()
  };
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
          Already have an account?{" "}
          <Anchor size="sm" component="button">
            <NavLink to="/login">Login</NavLink>
          </Anchor>
        </Text>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <form onSubmit={form.onSubmit((values) => values)}>
            <TextInput
              label="Username"
              placeholder="your name"
              required
              {...form.getInputProps("username")}
            />

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

            <PasswordInput
              label="Password"
              placeholder="Your password"
              required
              mt="md"
              {...form.getInputProps("password")}
            />
            <PasswordInput
              label="Confirm Password"
              placeholder="Confirm Your password"
              required
              mt="md"
              {...form.getInputProps("password_confirmation")}
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
              Create
            </button>
          </form>
        </Paper>
      </Container>
    </>
  );
}
