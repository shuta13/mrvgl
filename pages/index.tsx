import React from "react";
import Link from "next/link";

import archives from "../utils/data/archives.json";

const ids: Array<string> = [];
for (let i = 1; i < archives.length + 1; i++) {
  if (i < 10) {
    ids.push(`00${i}`);
  } else if (i >= 10 && i < 100) {
    ids.push(`0${i}`);
  } else {
    ids.push(`${i}`);
  }
}

const Home: React.FC = () => {
  return (
    <div className="container">
      <ul>
        {ids.map((id) => (
          <li key={id}>
            <Link href="/archives/[id]" as={`archives/${id}`}>
              <a className="Link">{id}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
