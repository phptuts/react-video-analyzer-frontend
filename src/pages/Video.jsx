import { useParams } from "react-router-dom";
import { collection, doc, getDoc, getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";

const Video = () => {
  const { videoId } = useParams();
  const [video, setVideo] = useState();
  useEffect(() => {
    async function getVideo() {
      const db = getFirestore();
      const videoDoc = doc(collection(db, "videos"), videoId);
      const videoRef = await getDoc(videoDoc);
      const videoData = videoRef.data();
      console.log(videoData);
      setVideo({ ...videoData, id: videoRef.id });
    }

    getVideo();
  }, [videoId]);
  return (
    <>
      <div className="row">
        <div className="col">
          <h1>Video: {video?.title}</h1>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <h2>Video Transcription</h2>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <p>{video?.transcribedText}</p>
        </div>
      </div>
      {video?.questions.map((q, index) => {
        return (
          <div key={q.id}>
            <div className="row">
              <div className="col">
                <h3>
                  {index + 1}) {q.text}
                </h3>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <p>{q.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Video;
