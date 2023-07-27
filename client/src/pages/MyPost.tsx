import Navbar from "../components/Navbar";
import { HeaderSearchProps } from "../utils/interface/app.interface";
import { useParams } from "react-router-dom";

function MyPost() {
  const { id } = useParams();
  console.log(id);
  const headerLinks: HeaderSearchProps["links"] = [
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
  return (
    <>
      <Navbar links={headerLinks} />
    </>
  );
}

export default MyPost;
