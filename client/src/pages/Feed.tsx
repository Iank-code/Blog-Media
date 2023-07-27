import Homepage from "./Homepage";
import Navbar from "../components/Navbar";
import { HeaderSearchProps } from "../utils/interface/app.interface";

function Feed() {
  const accessToken = localStorage.getItem("accessToken");
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
      link: `/mypost/${accessToken}`,
      label: "My Posts",
    },
    {
      link: "/following",
      label: "Following",
    },
  ];

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
