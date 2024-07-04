import { useState } from "react";

const Videos = () => {
  const [loading, setLoading] = useState(true);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div className="row">
        <div className="col">
          <h1 className="mt-3 mb-3 text-center">Your Videos</h1>
        </div>
      </div>
      <div className="row">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Title</th>
              <th scope="col">Created Date</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </>
  );
};

export default Videos;
