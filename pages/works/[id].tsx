import { useRouter } from "next/router";
import works from "../../assets/data/works.json";

let num = 0;

const Works = () => {
  const router = useRouter();
  const { id } = router.query;
  if (typeof id === "string") {
    if (id.match("00")) {
      num = parseInt(id);
    } else if (id[0] === "0") {
      num = parseInt(id.slice(0));
    } else {
      num = parseInt(id);
    }
  }
  return (
    <div>
      page id : {num}
    </div>
  );
};

export default Works;