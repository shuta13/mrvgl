import React from "react";
import dynamic from "next/dynamic";
const F003 = dynamic(() => import("../../components/partials/founds/F003"), {
  ssr: false,
});

const _003: React.FC = () => {
  return <F003 />;
};

export default _003;
