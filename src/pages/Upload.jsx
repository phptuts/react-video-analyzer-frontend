import { useContext, useState } from "react";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import {
  addDoc,
  collection,
  getFirestore,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { AuthContext } from "../context/auth.context";

const Upload = () => {
  const { user } = useContext(AuthContext);

  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    file: null,
    title: "",
    questions: [{ id: new Date().getTime(), text: "" }],
  });
  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleTitleChange = (e) => {
    setFormData({ ...formData, title: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const storage = getStorage();
      const db = getFirestore();
      const docRef = await addDoc(collection(db, "videos"), {
        questions: formData.questions,
        title: formData.title,
        userId: user.uid,
        status: "created",
        created_at: serverTimestamp(),
      });
      const firelocation = ref(storage, `videos/${user.uid}/${docRef.id}`);
      const destination = await uploadBytes(firelocation, formData.file);
      await updateDoc(docRef, {
        videoPath: destination.metadata.fullPath,
        status: "uploaded",
      });
      setFormData({
        file: null,
        title: "",
        questions: [{ id: new Date().getTime(), text: "" }],
      });
      alert("Your video being processed");
    } catch (error) {
      alert("Error");
      console.log(error);
    }

    setSubmitting(false);
  };

  const addQuestion = () => {
    const newQuestion = {
      id: new Date().getTime(),
      text: "",
    };
    setFormData({
      ...formData,
      questions: [...formData.questions, newQuestion],
    });
  };

  const removeQuestion = (id) => {
    const updatedQuestions = formData.questions.filter(
      (question) => question.id !== id
    );
    setFormData({ ...formData, questions: updatedQuestions });
  };

  const handleQuestionChange = (id, value) => {
    const updatedQuestions = formData.questions.map((question) =>
      question.id === id ? { ...question, text: value } : question
    );
    setFormData({ ...formData, questions: updatedQuestions });
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
          {formData.questions.map((question, index) => (
            <div key={question.id} className="mb-3">
              <label
                htmlFor={`formQuestion${question.id}`}
                className="form-label"
              >
                Question {index + 1}
              </label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  id={`formQuestion${question.id}`}
                  placeholder="Enter your answer"
                  value={question.text}
                  onChange={(e) =>
                    handleQuestionChange(question.id, e.target.value)
                  }
                />
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => removeQuestion(question.id)}
                  disabled={formData.questions.length === 1}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="mb-3">
            <button
              type="button"
              className="btn btn-secondary me-2"
              onClick={addQuestion}
            >
              Add Question
            </button>
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
