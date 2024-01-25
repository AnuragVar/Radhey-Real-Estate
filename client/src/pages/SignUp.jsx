import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  function handleChange(e) {
    setFormData((formData) => ({ ...formData, [e.target.id]: e.target.value }));
  }
  async function handleSubmit(e) {
    try {
      e.preventDefault();
      setLoading(true);
      const res = await fetch(`/api/auth/sign-up`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setError(data.message);
      } else {
        navigate("/sign-in");
      }
      setError(null);
      setLoading(false);
    } catch (error) {
      setError(error.message);
    }
  }
  return (
    <div className="flex flex-col p-3 max-w-lg gap-4 mx-auto mt-10">
      <h1 className="text-3xl mx-auto font-semibold">Sign Up</h1>
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
        {loading ? "Loading..." : "SignUp"}
      </button>
      <div className="flex gap-2">
        <p>Already have an account?</p>
        <Link to={"/sign-in"}>
          <p className="text-blue-700 hover:underline">Sign In</p>
        </Link>
      </div>
      {error && <p className="text-red-700 text-lg">{error}</p>}
    </div>
  );
}

export default SignUp;
