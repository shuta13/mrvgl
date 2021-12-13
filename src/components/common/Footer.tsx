import React from "react";

export const Footer: React.FC<{
  pathData: { id: string; index: number; name: string };
  archivesData: Array<{ id: string; createdAt: string; desc: string }>;
}> = ({ pathData, archivesData }) => {
  return (
    <div className="FooterWrap">
      <div className="FooterTextHeader">
        {archivesData[pathData.index].desc}
      </div>
      <div className="FooterText">{archivesData[pathData.index].createdAt}</div>
      <div className="FooterText">{archivesData[pathData.index].id}</div>
    </div>
  );
};
