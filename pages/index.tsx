import React from "react";
import Link from "next/link";

import archives from "../utils/data/archives.json";

const ids: Array<string> = [];
for (let i = 0; i < archives.length; i++) {
  if (i > 0 && i < 10) {
    ids.push(`00${i}`);
  } else if (i >= 10 && i < 100) {
    ids.push(`0${i}`);
  } else if (i >= 100) {
    ids.push(`${i}`);
  }
}

const Home: React.FC = () => {
  return (
    <div className="container">
      <ul>
        {ids.map((id) => (
          <li key={id}>
            <Link href="/archive/[id]" as={`archive/${id}`}>
              <a className="ArchivesLink">{id}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
