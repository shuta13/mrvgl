import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
// import works from "../../assets/data/works.json";

const Works: React.FC = () => {
  const router = useRouter();
  const [id, setId] = useState<string | Array<string>>("")
  useEffect(() => {
    setId(router.query.id);
  },
  [
    router.query.id
  ]);
  // const [num, setNum] = useState(0);
  // useEffect(() => {
  //   if (typeof id === "string") {
  //     if (id.match("00")) {
  //       setNum(parseInt(id));
  //     } else if (id[0] === "0") {
  //       setNum(parseInt(id.slice(0)));
  //     } else {
  //       setNum(parseInt(id));
  //     }
  //   }
  // },
  // []);
  const DynamicWork = dynamic(() => 
    import(`../../components/pages/works/${id}`)
  );
  return (
    <>
      {/* name : {works[num].name} desc : {works[num].desc} */}
      <DynamicWork />
    </>
  );
};

export default Works;