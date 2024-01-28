import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signInFailure, signInStart, signInSuccess } from "../redux/userSlice";
import Oath from "../components/Oath";
function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  function handleChange(e) {
    setFormData((formData) => ({
      ...formData,
      [e.target.id]: e.target.value,
    }));
  }
  async function handleSubmit(e) {
    try {
      e.preventDefault();
      dispatch(signInStart());

      const res = await fetch(`/api/auth/sign-in`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }

      dispatch(signInSuccess(data.data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  }
  return (
    <form className="flex flex-col p-3 max-w-lg gap-4 mx-auto mt-10">
      <h1 className="text-3xl mx-auto font-semibold">Sign In</h1>
      <input
        type="text"
        placeholder="username"
        id="userName"
        className="p-3 border rounded-lg"
        onChange={(e) => handleChange(e)}
      />
      <input
        type="text"
        placeholder="email"
        id="email"
        className="p-3 border rounded-lg"
        onChange={(e) => handleChange(e)}
      />
      <input
        type="text"
        placeholder="password"
        id="password"
        className="p-3 border rounded-lg"
        onChange={(e) => handleChange(e)}
      />
      <button
        className="bg-slate-700 text-white p-3 rounded-lg hover:opacity-90 disabled:opacity-80"
        onClick={(e) => handleSubmit(e)}
      >
        {loading ? "Loading..." : "SignIn"}
      </button>
      <Oath />
      <div className="flex gap-2">
        <p>Don't have an account?</p>
        <Link to={"/sign-up"}>
          <p className="text-blue-700 hover:underline">Sign Up</p>
        </Link>
      </div>
      {error && <p className="text-red-700 text-lg">{error}</p>}
    </form>
  );
}

export default SignIn;
