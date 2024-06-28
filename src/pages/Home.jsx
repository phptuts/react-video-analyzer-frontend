import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

const Home = () => {
  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth();
      const result = await signInWithPopup(auth, provider);
      console.log(result.user);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div className="row">
        <div className="col">
          <h1>Home Page</h1>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <button onClick={loginWithGoogle} className="btn btn-success">
            Login With Google
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
