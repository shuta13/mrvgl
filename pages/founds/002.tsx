import React from "react";
import dynamic from "next/dynamic";

const F002 = dynamic(
  () => import("../../components/partials/founds/F002"),
  { ssr: false }
)

const _002: React.FC = () => {
  return <F002 />;
};

export default _002;
