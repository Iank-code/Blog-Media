import "../../output.css";
import { NavLink } from "react-router-dom";
import { useForm, yupResolver } from "@mantine/form";
import {
  LoginInput,
  loginValidator,
} from "../../utils/validators/auth.validators";
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
  Button,
} from "@mantine/core";
// import { notifications } from "@mantine/notifications";

export default function Login() {
  const form = useForm<LoginInput>({
    initialValues: {
      email: "",
      password: "",
    },

    validate: yupResolver(loginValidator),
  });

  const submitForm = () => {
    const formItem = new FormData();

    formItem.append("email", form.values.email);
    formItem.append("password", form.values.password);

    console.log({
      email: form.values.email,
      password: form.values.password,
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
  return (
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
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            mt="md"
            {...form.getInputProps("password")}
          />
          <Group position="apart" mt="lg">
            <Checkbox label="Remember me" />
            <Anchor component="button" size="sm">
              Forgot password?
            </Anchor>
          </Group>
          <Button fullWidth mt="xl">
            <button type="submit" onClick={submitForm}>
              Sign in
            </button>
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
