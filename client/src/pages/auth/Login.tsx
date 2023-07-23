import "../../output.css";
import { IconX } from "@tabler/icons-react";
import { NavLink } from "react-router-dom";
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

export default function Login() {
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
    console.log({
      email: form.values.email,
      zipcode: form.values.zipcode,
    });
    // fetch("http://localhost:3000/user/login", {
    //   method: "POST",
    //   body: formItem,
    // })
    //   .then((res) => {
    //     if (!res.ok) {
    //       notifications.show({
    //         title: "Failed",
    //         message: "Seems there is something wrong 🤥",
    //         color: "red",
    //         autoClose: 1800,
    //         icon: <IconX />,
    //       });
    //       throw new Error("Can't perform request");
    //     }
    //     return res.json();
    //   })
    //   .then((data) => {
    //     if (data.data.token) {
    //       notifications.show({
    //         title: data.message,
    //         message: "Hey there, your code is awesome! 🤥",
    //         color: "green",
    //         autoClose: 1800,
    //         icon: <IconCheck />,
    //       });
    //       navigate("/home");
    //     }
    //     localStorage.setItem("id", data.data.data.id);
    //     localStorage.setItem("token", data.data.token);
    //     localStorage.setItem("name", data.data.data.name);
    //     localStorage.setItem("isAdmin", data.data.data.IsAdmin);
    //     localStorage.setItem("email", data.data.data.email);
    //     localStorage.setItem("image", data.data.image);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
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
