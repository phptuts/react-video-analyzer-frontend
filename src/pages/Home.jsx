import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { toast } from "react-toastify";

const Home = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth();
      const result = await signInWithPopup(auth, provider);
      console.log(result.user);
    } catch (error) {
      if (error.code == "auth/cancelled-popup-request") {
        return;
      }
      toast("Unexpected error please report to support.", {
        type: "error",
      });
    }
  };
  return (
    <>
      <div className="row">
        <div className="col">
          <h1>Home Page</h1>
        </div>
      </div>
      {!isLoggedIn && (
        <div className="row">
          <div className="col">
            <button onClick={loginWithGoogle} className="btn btn-success">
              Login With Google
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
