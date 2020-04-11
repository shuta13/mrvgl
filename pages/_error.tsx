import { NextPage } from "next";

interface Props {
  statusCode?: number;
}

const Error: NextPage<Props> = ({ statusCode }) => {
  return <div className="container">
    <div className="ErrorText">
      {statusCode} - Missed Archive Page.
    </div>
  </div>;
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