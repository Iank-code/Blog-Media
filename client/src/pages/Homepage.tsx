import "../output.css";
import { Pagination } from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";
import Feed from "../components/Feed";

function Homepage() {
  const [err, setErr] = useState<string>("");
  const [isErr, setIsErr] = useState<boolean>(false);
  const [activePage, setPage] = useState<number>(1);
  const [data, setData] = useState<any>();
  const accessToken = localStorage.getItem("accessToken");
  useEffect(() => {
    if (accessToken) {
      const config = {
        headers: { Authorization: `Bearer ${accessToken}` },
      };
      axios
        .get(
          `https://blog-media-backend.onrender.com/api/feed?page=${activePage}`,
          config
        )
        .then((res) => setData(res.data))
        .catch((error) => {
          setErr(error.response.data);
        });
    }
    axios
      .get(
        `https://blog-media-backend.onrender.com/api/feed?page=${activePage}`
      )
      .then((res) => setData(res.data))
      .catch((error) => {
        setErr(error.response.data);
        setIsErr(true);
        setTimeout(() => {
          setIsErr(false);
        }, 4000);
      });
  }, [activePage]);

  return (
    <div>
      {!accessToken && isErr && (
        <div>
          <h3
            style={{
              color: "red",
            }}
          >
            {err}
          </h3>
        </div>
      )}
      <Pagination value={activePage} onChange={setPage} total={10} />
      <br />
      {data &&
        data.map((feed: any) => {
          return <Feed post={feed} key={feed.id} />;
        })}
      <Pagination value={activePage} onChange={setPage} total={10} />
      <br />
    </div>
  );
}

export default Homepage;
