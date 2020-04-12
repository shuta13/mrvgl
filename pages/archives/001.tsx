import React from "react";
import dynamic from "next/dynamic";

const A001 = dynamic(() => import("../../components/partials/archives/A001"), {
  ssr: false,
});

const _001: React.FC = () => {
  return <A001 />;
};

export default _001;
