import React from "react";
import { useGetPathName } from "../../utils/hooks/useGetPathName";

const _001: React.FC = () =>  {
  const data = useGetPathName();
  console.log(data);
  return (
    <div>
      this is 001
    </div>
  );
};

export default _001;