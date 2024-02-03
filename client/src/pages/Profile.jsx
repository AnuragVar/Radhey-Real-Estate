import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import {
  deleteFailure,
  deleteStart,
  deleteSuccess,
  signInSuccess,
  signOutFailure,
  signOutStart,
  signOutSuccess,
  updateFailure,
  updateStart,
  updateSuccess,
} from "../redux/userSlice";
function Profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const fileref = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showListings, setShowListing] = useState(false);
  const [listing, setListing] = useState([]);
  const [showListingsError, setShowListingsError] = useState(false);
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
    //take reference of storage/root reference

    const fileName = new Date().getTime() + file;
    //name the file

    const storageRef = ref(storage, fileName);
    //take reference of file
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

  async function handleSignOut() {
    try {
      dispatch(signOutStart());
      const res = await fetch(`/api/user/sign-out/${currentUser._id}`, {
        method: "GET",
      });
      const data = await res.json();

      if (data.success === "false") {
        dispatch(signOutFailure(data.message));
      }
      dispatch(signInSuccess());
    } catch (error) {
      dispatch(signOutFailure(error.message));
    }
  }
  async function handleDelete() {
    try {
      dispatch(deleteStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteFailure("Something went wrong while deleting User"));
      }

      dispatch(deleteSuccess());
    } catch (error) {
      dispatch(deleteFailure(error.message));
    }
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
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateFailure(data.message));
      }
      dispatch(updateSuccess(data.data));
    } catch (error) {
      dispatch(updateFailure(error.message));
    }
  }
  async function handleShowListings() {
    try {
      setShowListingsError(false);
      if (showListings === false) {
        const res = await fetch(`/api/listing/listings/${currentUser._id}`, {
          method: "GET",
        });
        const data = await res.json();
        console.log(data);

        setListing(data.data);
        setShowListing(true);
      } else {
        setShowListing(false);
      }
      setShowListingsError(false);
    } catch (error) {
      setShowListingsError(error);
    }
  }
  const [errorDeleting, setErrorDeleting] = useState(false);

  async function handleDeleteListing(id) {
    setErrorDeleting(false);
    const res = await fetch(`/api/listing/delete/${id}`, {
      method: "DELETE",
    });
    console.log(res);
    const data = await res.json();
    console.log(data);
    if (data.success === false) {
      setErrorDeleting(data.data);
      return;
    }
    setErrorDeleting(false);
    setListing(listing.filter((item) => item._id !== id));
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
        ) : filePerc !== 0 ? (
          <p className="text-green-700 self-center">Successfully Uploaded</p>
        ) : null}
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
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg hover:opacity-90 disabled:opacity-80"
          onClick={(e) => handleSubmit(e)}
        >
          {loading ? "Loading..." : "Update"}
        </button>
        <button
          className="bg-green-700 text-white p-3 rounded-lg hover:opacity-90 disabled:opacity-80"
          onClick={() => navigate("/create-listing")}
        >
          Create Listing
        </button>
        <div className="flex justify-between text-red-700 ">
          <p className="cursor-pointer" onClick={() => handleDelete()}>
            Delete Account
          </p>
          <p className="cursor-pointer" onClick={() => handleSignOut()}>
            Sign Out
          </p>
        </div>
        {error && <p className="text-red-700 text-lg">{error}</p>}
      </form>
      <p
        onClick={() => handleShowListings()}
        className="text-center text-slate-600 cursor-pointer hover:text-slate-800"
      >
        Show Listings
      </p>
      {setShowListingsError && (
        <p className="text-red-600 ">{showListingsError}</p>
      )}
      {showListings && listing.length > 0 && (
        <div className="flex flex-col justify-center items-center gap-4">
          <div>
            <h3 className="text-2xl p-4">Your listings</h3>
            <ul className="flex flex-col gap-3">
              {listing &&
                listing.map((item) => (
                  <Item
                    errorDeleting={errorDeleting}
                    handleDeleteListing={handleDeleteListing}
                    item={item}
                    key={item._id}
                  />
                ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
function Item({ item, errorDeleting, handleDeleteListing }) {
  return (
    <li className="flex justify-between  items-center border-2 p-3 px-5 rounded-lg  container mx-auto">
      <div className=" overflow-hidden flex gap-2 items-center">
        <Link to={`/listing/${item._id}`}>
          <img
            src={item?.imageUrls[0]}
            alt="property's image"
            className="w-16 h-14 rounded-lg object-cover"
          />
        </Link>
        <Link to={`/listing/${item._id}`}>
          <p className="font-semibold hover:underline truncate flex-1">
            {item.name}
          </p>
        </Link>
      </div>
      <div className="flex flex-col">
        <button
          className="text-red-600 uppercase"
          onClick={() => handleDeleteListing(item._id)}
        >
          Delete
        </button>
        <button className="text-green-700 uppercase">EDIT</button>
      </div>
      {errorDeleting && <p className="text-red-600">{errorDeleting}</p>}
    </li>
  );
}

export default Profile;
