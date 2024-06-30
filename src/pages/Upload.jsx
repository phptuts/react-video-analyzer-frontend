import { useState } from "react";

const Upload = () => {
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    file: null,
    title: "",
  });
  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleTitleChange = (e) => {
    setFormData({ ...formData, title: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    alert("FORM_SUBMITTED");
  };
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
      <div className="row">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              value={formData.title}
              onChange={handleTitleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="formFile" className="form-label">
              Upload Video
            </label>
            <input
              type="file"
              className="form-control"
              id="formFile"
              accept="video/*"
              onChange={handleFileChange}
            />
          </div>
          <div className="mb-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Upload;
