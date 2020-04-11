import { NextPage } from "next";
import dynamic from "next/dynamic";

interface Props {
  statusCode?: number;
}

const Dynamic_Error = dynamic(
  () => import("../components/partials/_Error"),
  { ssr: false }
)

const Error: NextPage<Props> = ({ statusCode }) => {
  return (
    <div className="container">
      <Dynamic_Error statusCode={statusCode} />
    </div>
  );
};

Error.getInitialProps = (context) => {
  const statusCode = context.res
    ? context.res.statusCode
    : context.err
    ? context.err.statusCode
    : 404;
  return { statusCode };
};

export default Error;
