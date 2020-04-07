import { useRouter } from "next/router";

const getPathName = () => {
  const router = useRouter();
  return router.pathname;
};

export const useGetPathName = () => {
  const pathData: { id: string | null, index: number | null, name: string | null } = {
    id: null,
    index: null,
    name: null
  };
  const pathName = getPathName();
  const id = pathName.substring(pathName.length - 3);
  pathData.name = pathName;
  pathData.id = id;
  if (pathName.match("00")) {
    pathData.index = parseInt(id[2]);
  } else if (pathName[0] === "0") {
    pathData.index = parseInt(id.slice(0));
  } else {
    pathData.index = parseInt(id);
  }
  return pathData;
};