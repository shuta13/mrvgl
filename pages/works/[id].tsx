import React from "react";
import { useRouter } from "next/router";
import works from "../../assets/data/works.json";

let num = 0;

const Works: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  if (typeof id === "string") {
    if (id.match("00")) {
      num = parseInt(id);
    } else if (id[0] === "0") {
      num = parseInt(id.slice(0));
    } else {
      num = parseInt(id);
    }
  }
  return (
    <>
      name : {works[num].name} desc : {works[num].desc}
    </>
  );
};

export default Works;