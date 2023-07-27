import Navbar from "../components/Navbar";
import { HeaderSearchProps } from "../utils/interface/app.interface";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

function MyPost() {
  const [data, setData] = useState<any>();
  // const [err, setErr] = useState<string>("");

  const { id } = useParams();
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

  // Fetching user info
  const config = {
    headers: { Authorization: `Bearer ${id}` },
  };
  useEffect(() => {
    axios
      .get("https://blog-media-backend.onrender.com/api/user/info", config)
      .then((res) => setData(res.data))
      .catch((error) => {
        console.error(error);
        // setErr(error.response.data);
      });
  }, []);

  console.log(data);
  return (
    <>
      <Navbar links={headerLinks} />
    </>
  );
}

export default MyPost;
