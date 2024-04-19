import React, { useMemo } from "react";
import { COLUMNS } from "./columns";

const Dashboard = () => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(
    () =>
      fetch(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      )
        .then((res) => res.json())
        .then((dataInfo) => console.log(dataInfo))
        .catch((err) => console.error(err)),
    []
  );

  return <div></div>;
};

export default Dashboard;
