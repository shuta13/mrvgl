import React from "react";
import dynamic from "next/dynamic";

const A004 = dynamic(() => import("../../components/archive/A004"), {
  ssr: false,
});

const _004: React.FC = () => {
  return <A004 />;
};

export default _004;
