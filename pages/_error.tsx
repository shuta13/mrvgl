import { NextPage } from "next";
import { _Error } from "../components/partials/_Error";

interface Props {
  statusCode?: number;
}

const Error: NextPage<Props> = ({ statusCode }) => {
  return (
    <div className="container">
      <_Error statusCode={statusCode} />
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
