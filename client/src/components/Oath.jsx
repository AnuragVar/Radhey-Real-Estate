import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

function Oath() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);

    const result = await signInWithPopup(auth, provider);
    // console.log(result);

    const res = await fetch("/api/auth/google", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL,
      }),
    });
    const data = await res.json();
    console.log(data);
    dispatch(signInSuccess(data.data));
    navigate("/");
  };

  return (
    <button
      onClick={() => handleGoogleClick()}
      type="button"
      //bydefault it will submit the data, as it is inside the form
      //but we need to keep it unrefresh
      className="bg-red-700 text-white p-3 rounded-lg hover:opacity-90 disabled:opacity-80 text-center"
    >
      CONTINUE WITH GOOGLE
    </button>
  );
}

export default Oath;
