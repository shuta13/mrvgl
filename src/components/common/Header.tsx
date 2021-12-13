import React from "react";
import Link from "next/link";

export const Header: React.FC = () => {
  return (
    <Link href="/">
      <a className="HeaderTitle">Maraviglia</a>
    </Link>
  );
};
