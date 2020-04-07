import React from "react";
import { useGetPathName } from "../../utils/hooks/useGetPathName";
import { Footer } from "../../components/common/Footer";

const _001: React.FC = () =>  {
  const path = useGetPathName();
  return (
    <>
      <div className="container">
        this is {path.id}
      </div>
      <Footer pathData={path} />
    </>
  );
};

export default _001;