import { createStyles, Header, Container, Group, rem } from "@mantine/core";
import { MantineLogo } from "@mantine/ds";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
  },

  links: {
    [theme.fn.smallerThan("xs")]: {
      // display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      color: theme.colors.blue,
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  linkActive: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
    },
  },
}));

interface HeaderSimpleProps {
  links: { link: string; label: string }[];
}

export default function Navbar({ links }: HeaderSimpleProps) {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");
  // const [opened, { toggle }] = useDisclosure(false);
  const { classes } = useStyles();

  const items = links.map((link, index) => (
    <NavLink to={link.link} key={index}>
      {link.label}
    </NavLink>
  ));

  return (
    <Header height={60} mb={120}>
      <Container className={classes.header}>
        <MantineLogo size={28} />
        <Group spacing={40} className={classes.links}>
          {items}
          {accessToken && (
            <button
              onClick={() => {
                localStorage.clear();

                navigate("/login");
              }}
            >
              Log Out
            </button>
          )}
        </Group>
      </Container>
    </Header>
  );
}
