import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useState } from "react";
import { app } from "../firebase";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function CreateListing() {
  const [file, setFile] = useState([]);
  const [uploading, setUploading] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    address: "",
    regularPrice: "",
    discountPrice: "",
    type: "rent",
    parkingSpot: false,
    furnished: false,
    offer: false,
    bedrooms: 1,
    bathrooms: 1,
    imageUrls: [],
  });

  const navigate = useNavigate();

  const handleFileUploads = async () => {
    let totalFile = file.length;
    if (formData.length && formData?.imageUrls && formData.imageUrls?.length)
      totalFile = totalFile + formData.imageUrls.length;

    console.log(file.length);
    console.log(totalFile);
    if (file.length >= 0 && totalFile < 7) {
      setUploading(true);
      setFileUploadError(false);

      const promises = [];

      for (let i = 0; i < file.length; i++) {
        promises.push(handleFileUpload(file[i]));
      }

      Promise.all(promises)
        .then((urls) => {
          let h;
          if (formData?.imageUrls) h = formData.imageUrls.concat(urls);
          else h = urls;
          console.log(h);
          setFormData({
            ...formData,
            imageUrls: h,
          });
          setFileUploadError(null);
          setUploading(false);
        })
        .catch((err) => {
          setFileUploadError(
            "File upload Error!! You can only upload file upto 6 mb"
          );
          setUploading(false);
        });
    } else {
      setFileUploadError("You can upload upto 6 images per listing!!");
      setUploading(false);
    }
  };

  const handleFileUpload = (file) => {
    // console.log(file);
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // console.log(snapshot);
        },
        (error) => {
          console.error("Error uploading file:", error);
          reject(error);
        },
        async () => {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(url);
        }
      );
    });
  };

  function handleInput(e) {
    if (e.target.id === "rent" || e.target.id === "sale") {
      console.log(1);
      setFormData({ ...formData, type: e.target.id });
    } else if (e.target.type === "checkbox") {
      setFormData({ ...formData, [e.target.id]: e.target.checked });
    } else {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    }
    console.log(formData);
  }
  function handleDelete(index) {
    console.log(index);
    let imageUrls = formData.imageUrls.filter((_, i) => index !== i);
    console.log(imageUrls);
    setFormData({ ...formData, imageUrls });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1) {
        return setError("At least one image is required!!");
      }

      if (formData.regularPrice < formData.discountPrice) {
        return setError("Discount Price should be lower than Regular Price!!");
      }
      setLoading(true);
      setError(false);
      console.log(formData);
      const res = await fetch(`/api/listing/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, userRef: currentUser._id }),
      });
      const data = await res.json();
      setLoading(false);

      if (data.success === false) {
        setError(data.message);
      }
      navigate(`/listing/${data.data._id}`);
      console.log(data);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  }
  return (
    <div>
      <h1 className="text-center font-semibold text-3xl mt-7">
        Create a Listing
      </h1>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="grid grid-cols-1  sm:grid-cols-2 gap-8"
      >
        <div className="sm:ml-auto sm:mr-0 flex flex-col gap-5 mt-7 mx-auto">
          <input
            className="text-sm p-2 w-90 rounded-lg shadow-sm"
            required
            id="name"
            maxLength="60"
            minLength="10"
            type="text"
            placeholder="name"
            onChange={(e) => handleInput(e)}
            value={formData.name}
          />
          <textarea
            className="text-sm p-2 w-90 rounded-lg shadow-sm"
            placeholder="Description..."
            id="description"
            required
            onChange={(e) => handleInput(e)}
            value={formData.description}
          />
          <input
            className="text-sm p-2 w-90 rounded-lg shadow-sm"
            type="text"
            placeholder="Address"
            required
            id="address"
            value={formData.address}
            onChange={(e) => handleInput(e)}
          />
          <div className="flex flex-wrap gap-5">
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-5 aspect-square"
                id="sale"
                checked={formData.type === "sale"}
                onChange={(e) => handleInput(e)}
              />
              <span>Sell</span>
            </p>
            <p className="flex gap-2">
              <input
                className="w-5 aspect-square"
                type="checkbox"
                id="rent"
                checked={formData.type === "rent"}
                onChange={(e) => handleInput(e)}
              />
              <span>Rent</span>
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-5 aspect-square"
                id="parking"
                value={formData.parkingSpot}
                onChange={(e) => handleInput(e)}
              />
              <span>Parking spot</span>
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-5 aspect-square"
                id="furnished"
                checked={formData.furnished}
                onChange={(e) => handleInput(e)}
              />
              <span>Furnished</span>
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-5 aspect-square"
                id="offer"
                checked={formData.offer}
                onChange={(e) => handleInput(e)}
              />
              <span>Offer</span>
            </p>
          </div>
          <div className="flex gap-5">
            <p className="flex gap-2 items-center">
              <input
                type="Number"
                id="bedrooms"
                min="1"
                max="10"
                required
                value={formData.bedrooms}
                className="p-2 rounded-lg"
                onChange={(e) => handleInput(e)}
              />
              <span>Beds</span>
            </p>
            <p className="flex gap-2 items-center">
              <input
                type="Number"
                id="bathrooms"
                value={formData.bathrooms}
                min="1"
                max="10"
                required
                className="p-2 rounded-lg"
                onChange={(e) => handleInput(e)}
              />
              <span>Baths</span>
            </p>
          </div>
          <p className="flex gap-4 items-center">
            <input
              className="w-40 px-2 rounded-md h-10 "
              type="text"
              id="regularPrice"
              onChange={(e) => handleInput(e)}
              value={formData.regularPrice}
            />
            <div className="flex flex-col items-center">
              <span>Regular price</span>
              <span>($/month)</span>
            </div>
          </p>
          <p className="flex gap-4 items-center">
            <input
              hidden={formData.offer === false}
              className="px-2 w-40 rounded-md h-10"
              type="text"
              id="discountPrice"
              onChange={(e) => handleInput(e)}
              value={formData.discountPrice}
            />
            {formData.offer && (
              <div className="flex flex-col items-center">
                <span>Discounted price</span>
                <span>($/month)</span>
              </div>
            )}
          </p>
        </div>
        <div className="mx-auto  sm:ml-0 flex flex-col gap-5 mt-7  sm:mr-auto">
          <p>
            <span>
              <strong>Images:</strong>
            </span>{" "}
            The first image will be the cover(max 6)
          </p>
          <div className="space-y-2 mr-auto">
            <div className="flex gap-2 w-50 ">
              <input
                accept="image/*"
                multiple
                id="images"
                type="file"
                className=" rounded-lg border-gray-300 border p-4"
                onChange={(e) => {
                  setFile(e.target.files);
                  setFileUploadError(null);
                }}
              ></input>
              <p
                className=" border-2 rounded-lg text-lg font-semibold text-green-700 border-green-700 cursor-pointer p-4 hover:text-green-800 
                hover:shadow-md
                hover:border-green-800 uppercase"
                onClick={(e) => handleFileUploads(e)}
                type="button"
              >
                {uploading ? "uploading..." : "upload"}
              </p>
            </div>

            <div>
              {fileUploadError && (
                <p className="text-red-700">{fileUploadError}</p>
              )}

              <ul className="flex flex-col gap-5 ">
                {formData.imageUrls &&
                  formData.imageUrls.map((url, index) => (
                    <li
                      className="flex justify-between items-center border p-3 px-8"
                      key={url}
                    >
                      <img
                        className="w-20 h-12 rounded-lg"
                        src={url}
                        alt="listing images"
                      />
                      <button
                        className="text-red-500 text-xl hover:text-red-600 cursor-pointer"
                        onClick={() => {
                          handleDelete(index);
                        }}
                      >
                        Delete
                      </button>
                    </li>
                  ))}
              </ul>
            </div>

            <button
              className="bg-green-700 uppercase  disabled:opacity-80 cursor-pointer hover:opacity-90 p-3 text-center  rounded-lg font-semibold text-white self-center"
              disabled={loading || uploading}
            >
              {loading ? "listing..." : "Create Listing"}
            </button>
            {error && <p className="text-red-700">{error}</p>}
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateListing;
