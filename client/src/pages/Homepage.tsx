import "../output.css";
import { Pagination } from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";
import Feed from "../components/Feed";

function Homepage() {
  const [err, setErr] = useState<string>("");
  const [activePage, setPage] = useState<number>(1);
  const [data, setData] = useState<any>();
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:3000/api/feed?page=${activePage}`)
      .then((res) => setData(res.data))
      .catch((error) => {
        setErr(error.response.data);
      });
  }, [activePage]);

  return (
    <div>
      {err && alert(err)}
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
