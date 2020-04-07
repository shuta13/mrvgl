import { useRouter } from "next/router";

const getPathName = () => {
  const router = useRouter();
  const pathName = router.pathname;
  return pathName.substring(pathName.length - 3);
};

export const useGetPathName = (type: "str" | "num") => {
  const pathName = getPathName();
  if (type === "str") {
    return pathName;
  } else if (type === "num") {
    if (pathName.match("00")) {
      return parseInt(pathName[2]);
    } else if (pathName[0] === "0") {
      return parseInt(pathName.slice(0));
    } else {
      return parseInt(pathName);
    }
  }
};