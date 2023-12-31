import Navbar from "../components/Navbar";
import { HeaderSearchProps } from "../utils/interface/app.interface";
import Homepage from "./Homepage";

function LandingPage() {
  const accessToken = localStorage.getItem("accessToken");
  const headerLinks: HeaderSearchProps["links"] = [
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
      <Navbar links={headerLinks} />
      <Homepage />
    </>
  );
}

export default LandingPage;
