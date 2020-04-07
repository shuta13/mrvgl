import React from "react";
import { useGetPathName } from "../../utils/hooks/useGetPathName";

const _001: React.FC = () =>  {
  const num = useGetPathName("num");
  console.log(num);
  return (
    <div>
      this is 001
    </div>
  );
};

export default _001;