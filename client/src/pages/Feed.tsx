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
  return (
    <>
      <Navbar links={headerLinks} />
      <Homepage />
    </>
  );
}

export default Feed;
