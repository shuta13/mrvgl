import { useRouter } from "next/router";

const getPathName = () => {
  const router = useRouter();
  const pathName = router.pathname;
  return pathName.substring(pathName.length - 3);
};

export const useGetPathName = () => {
  const pathData: { id: string | null, index: number | null } = {
    id: null,
    index: null
  };
  const pathName = getPathName();
  pathData.id = pathName;
  if (pathName.match("00")) {
    pathData.index = parseInt(pathName[2]);
  } else if (pathName[0] === "0") {
    pathData.index = parseInt(pathName.slice(0));
  } else {
    pathData.index = parseInt(pathName);
  }
  return pathData;
};