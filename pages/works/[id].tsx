import { useRouter } from "next/router";

const Works = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <div>
      page id : {id}
    </div>
  );
};

export default Works;