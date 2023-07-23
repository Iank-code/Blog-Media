import Homepage from "./Homepage";
import Navbar from "../components/Navbar";
import { HeaderSearchProps } from "../utils/interface/app.interface";

function Feed() {
  const headerLinks: HeaderSearchProps["links"] = [
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

  const newHeaderLinks: HeaderSearchProps["links"] = [
    {
      link: "/feed",
      label: "Feed",
    },
    {
      link: "/mypost",
      label: "My Posts",
    },
    {
      link: "/following",
      label: "Following",
    },
  ];
  const accessToken = localStorage.getItem("accessToken");

  return (
    <>
      {accessToken ? (
        <Navbar links={newHeaderLinks} />
      ) : (
        <Navbar links={headerLinks} />
      )}
      {<Homepage />}
    </>
  );
}

export default Feed;
