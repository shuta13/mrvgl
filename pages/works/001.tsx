import React from "react";
import { useGetPathName } from "../../utils/hooks/useGetPathName";

const _001: React.FC = () =>  {
  const path = useGetPathName();
  return (
    <div className="container">
      this is {path.id}
    </div>
  );
};

export default _001;