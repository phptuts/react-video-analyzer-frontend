import { useParams } from "react-router-dom";

const Video = () => {
  const { videoId } = useParams();

  return (
    <>
      <div className="row">
        <div className="col">
          <h1>Video: {videoId}</h1>
        </div>
      </div>
    </>
  );
};

export default Video;
