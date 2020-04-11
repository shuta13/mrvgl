import React from "react";

export const Footer: React.FC<{
  pathData: { id: string; index: number; name: string };
  archivesData: Array<{ name: string; desc: string }>;
}> = ({ pathData, archivesData }) => {
  return (
    <div className="FooterWrap">
      <p>{archivesData[pathData.index].name}</p>
      <p>{archivesData[pathData.index].desc}</p>
    </div>
  );
};
