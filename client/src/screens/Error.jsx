import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
//   const { error } = useError();

  return (
    <div>
      {/* {error ? <p>{error.message}</p> : <p>Oops! Something went wrong.</p>} */}
      <Link to="/">Go Back</Link>
    </div>
  );
};

export default Error;
