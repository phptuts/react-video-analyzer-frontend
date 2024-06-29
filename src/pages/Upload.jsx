import { useState } from "react";

const Upload = () => {
  const [submitting, setSubmitting] = useState(false);
  if (submitting) {
    return (
      <>
        <div className="row">
          <div className="col mt-3">
            <h1>Upload Video</h1>
          </div>
        </div>
        <div className="row">
          <div className="col mt-3">
            <h2 className="text-center">
              Your video is being upload to our site, please do not leave the
              page...
            </h2>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="row">
        <div className="col mt-3">
          <h1>Upload Video</h1>
        </div>
      </div>
    </>
  );
};

export default Upload;
