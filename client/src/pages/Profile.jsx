import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { updateFailure, updateStart, updateSuccess } from "../redux/userSlice";
function Profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const fileref = useRef(null);
  const dispatch = useDispatch();
  console.log(formData);
  // console.log(file);
  // console.log(filePerc);
  // console.log(fileUploadError);
  // console.log(formData);
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);
  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    //tell which storage we are talking about
    const fileName = new Date().getTime() + file;
    //name the file

    const storageRef = ref(storage, fileName);

    const uploadTask = uploadBytesResumable(storageRef, file);
    //uploadBytesResumable gives us the percentage upload too

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  function handleChange(e) {
    setFormData((formData) => ({ ...formData, [e.target.id]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log(res);
      console.log(1);
      const data = await res.json();
      console.log(data);
      console.log(2);
      if (data.success === false) {
        dispatch(updateFailure(data.message));
      }
      dispatch(updateSuccess(data.data));
    } catch (error) {
      dispatch(updateFailure(error.message));
    }
  }

  return (
    <div className="">
      <h1 className="text-center text-4xl pt-8 font-semibold">Profile</h1>
      <form className="flex flex-col max-w-lg gap-4 mx-auto mt-10">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          //[0] to accept only first selected file
          type="file"
          ref={fileref}
          hidden
        />
        <img
          className=" self-center rounded-full w-20 h-20 cursor-pointer"
          src={formData.avatar || currentUser.avatar}
          alt="profie pic"
          onClick={() => fileref.current.click()}
        />
        {fileUploadError ? (
          <p className="text-red-700 self-center">File is not uploading</p>
        ) : filePerc > 0 && filePerc < 100 ? (
          <p className="text-green-700 self-center">Uploading {filePerc}%</p>
        ) : (
          <p className="text-green-700 self-center">Successfully Uploaded</p>
        )}
        <input
          type="text"
          placeholder="username"
          id="userName"
          defaultValue={currentUser.userName}
          className="p-3 border rounded-lg"
          onChange={(e) => handleChange(e)}
        />
        <input
          type="text"
          placeholder="email"
          id="email"
          className="p-3 border rounded-lg"
          defaultValue={currentUser.email}
          onChange={(e) => handleChange(e)}
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          className="p-3 border rounded-lg"
          onChange={(e) => handleChange(e)}
        />
        <button
          className="bg-slate-700 text-white p-3 rounded-lg hover:opacity-90 disabled:opacity-80"
          onClick={(e) => handleSubmit(e)}
        >
          {loading ? "Loading..." : "Update"}
        </button>
        <div className="flex justify-between text-red-700 ">
          <p>Delete Account</p>
          <p>Sign Out</p>
        </div>
        {error && <p className="text-red-700 text-lg">{error}</p>}
      </form>
    </div>
  );
}

export default Profile;
