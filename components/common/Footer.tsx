import React from "react";

export const Footer: React.FC<{
  pathData: { id: string; index: number; name: string };
  worksData: Array<{ name: string; desc: string }>;
}> = ({ pathData, worksData }) => {
  return (
    <div className="FooterWrap">
      <p>{worksData[pathData.index].name}</p>
      <p>{worksData[pathData.index].desc}</p>
    </div>
  );
};
