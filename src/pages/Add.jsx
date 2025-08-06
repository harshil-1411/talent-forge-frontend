import React, { useReducer, useState } from "react";
import { gigReducer, INITIAL_STATE } from "../reducers/gigReducer";
import upload from "../utils/upload";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import newRequest from "../utils/newRequest";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const [singleFile, setSingleFile] = useState(undefined);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const [state, dispatch] = useReducer(gigReducer, INITIAL_STATE);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleChange = (e) => {
    dispatch({
      type: "CHANGE_INPUT",
      payload: { name: e.target.name, value: e.target.value },
    });
  };

  const handleFeature = (e) => {
    e.preventDefault();
    if (e.target[0].value.trim() === "") return; // Prevent adding empty features
    dispatch({
      type: "ADD_FEATURE",
      payload: e.target[0].value,
    });
    e.target[0].value = "";
  };

  const handleUpload = async () => {
    setUploading(true);
    try {
      const cover = await upload(singleFile);
      const images = await Promise.all(
        [...files].map((file) => upload(file))
      );
      setUploading(false);
      dispatch({ type: "ADD_IMAGES", payload: { cover, images } });
    } catch (err) {
      console.log(err);
      setUploading(false);
    }
  };

  const mutation = useMutation({
    mutationFn: (gig) => {
      return newRequest.post("/gigs", gig);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myGigs"]);
      navigate("/mygigs");
    },
    onError: (error) => {
      console.error("Error creating gig:", error);
      alert("Failed to create gig. Please try again.");
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting gig data:", state);
    
    // Validate required fields
    if (!state.title || !state.desc || !state.cat || !state.price) {
      alert("Please fill in all required fields");
      return;
    }

    // Ensure we have at least one image
    if (!state.cover) {
      alert("Please upload a cover image");
      return;
    }

    mutation.mutate(state);
  };
  
  const inputStyle = "p-5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500";
  const labelStyle = "text-gray-600 text-lg";

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-[1400px] py-12 px-4 md:px-6">
        <h1 className="w-max mb-8 text-gray-500 font-light text-3xl">
          Add New Gig
        </h1>
        <div className="flex justify-between gap-[100px]">
          <div className="flex-1 flex flex-col gap-4">
            <label htmlFor="title" className={labelStyle}>Title</label>
            <input
              id="title" type="text" name="title" onChange={handleChange}
              placeholder="e.g. I will do something I'm really good at"
              className={inputStyle}
            />
            <label htmlFor="cat" className={labelStyle}>Category</label>
            <select name="cat" id="cat" onChange={handleChange} className={inputStyle}>
              <option value="design">Design</option>
              <option value="web">Web Development</option>
              <option value="animation">Animation</option>
              <option value="music">Music</option>
            </select>
            {/* .images */}
            <div className="my-4">
              <div className="flex gap-5 items-start">
                {/* .imagesInputs */}
                <div className="flex-1 flex flex-col gap-4">
                  <label className={labelStyle}>Cover Image</label>
                  <input type="file" className="text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100" onChange={(e) => setSingleFile(e.target.files[0])} />
                  <label className={labelStyle}>Upload Images</label>
                  <input type="file" multiple className="text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100" onChange={(e) => setFiles(e.target.files)} />
                </div>
                <button onClick={handleUpload} className="h-full border-none p-4 text-white font-medium text-lg bg-[#1dbf73] cursor-pointer rounded-md hover:bg-[#19a565]">
                  {uploading ? "Uploading..." : "Upload"}
                </button>
              </div>
            </div>
            <label htmlFor="desc" className={labelStyle}>Description</label>
            <textarea
              name="desc" id="desc" onChange={handleChange}
              placeholder="Brief descriptions to introduce your service to customers"
              rows="10" className={inputStyle}
            ></textarea>
            <button onClick={handleSubmit} className="border-none p-5 text-white font-medium text-lg bg-[#1dbf73] cursor-pointer rounded-md hover:bg-[#19a565]">
              Create
            </button>
          </div>
          {/* Right Column */}
          <div className="flex-1 flex flex-col gap-4">
            <label className={labelStyle}>Service Title</label>
            <input type="text" name="shortTitle" onChange={handleChange} placeholder="e.g. One-page web design" className={inputStyle} />
            <label className={labelStyle}>Short Description</label>
            <textarea
              name="shortDesc" onChange={handleChange}
              placeholder="Short description of your service"
              rows="4" className={inputStyle}
            ></textarea>
            <label className={labelStyle}>Delivery Time (e.g. 3 days)</label>
            <input type="number" min={1} name="deliveryTime" onChange={handleChange} className={inputStyle} />
            <label className={labelStyle}>Revision Number</label>
            <input type="number" min={1} name="revisionNumber" onChange={handleChange} className={inputStyle} />
            <label className={labelStyle}>Add Features</label>
            <form onSubmit={handleFeature} className="flex justify-between">
              <input type="text" placeholder="e.g. page design" className={`${inputStyle} w-4/5`} />
              <button type="submit" className="w-1/5 bg-transparent text-[#1dbf73] border border-[#1dbf73] hover:bg-green-50">add</button>
            </form>
            <div className="flex flex-wrap gap-3 mt-4">
              {state?.features?.map((f) => (
                <div className="item" key={f}>
                  <button
                    type="button"
                    onClick={() => dispatch({ type: "REMOVE_FEATURE", payload: f })}
                    className="h-[30px] px-3 text-xs font-normal bg-transparent text-red-500 border border-red-500 rounded-full flex items-center gap-2 hover:bg-red-50"
                  >
                    <span>{f}</span>
                    <span className="font-bold">X</span>
                  </button>
                </div>
              ))}
            </div>
            <label className={labelStyle}>Price</label>
            <input type="number" min={1} onChange={handleChange} name="price" className={inputStyle} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;