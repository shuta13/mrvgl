import React from "react";
import { useGetPathName } from "../../utils/hooks/useGetPathName";

const _001: React.FC = () =>  {
  const pathData = useGetPathName();
  return (
    <>
      <div className="container">
        this is { pathData.name }
      </div>
    </>
  );
};

export default _001;