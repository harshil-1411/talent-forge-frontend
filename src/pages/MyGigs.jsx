import React from "react";
import { Link } from "react-router-dom";
import getCurrentUser from "../utils/getCurrentUser";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "../utils/newRequest";

function MyGigs() {
  const currentUser = getCurrentUser();
  const queryClient = useQueryClient();

  // Using isPending for React Query v5
  const { isPending, error, data } = useQuery({
    queryKey: ["myGigs"],
    queryFn: async () => {
      if (!currentUser?.isSeller) {
        throw new Error("Only sellers can view their gigs");
      }
      try {
        console.log("Fetching gigs for user:", currentUser._id);
        console.log("User is seller:", currentUser.isSeller);
        const response = await newRequest.get(`/gigs?userId=${currentUser._id}`);
        console.log("Gigs response:", response.data);
        return response.data;
      } catch (err) {
        console.error("Error fetching gigs:", err);
        throw err;
      }
    },
    enabled: !!currentUser?._id // Only run query if we have a user ID
  });

  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.delete(`/gigs/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myGigs"]);
    },
  });

  const handleDelete = (id) => {
    mutation.mutate(id);
  };

  return (
    <div className="flex justify-center text-gray-600">
      {!currentUser ? (
        <div className="py-12">Please log in to view your gigs</div>
      ) : isPending ? (
        <div className="py-12">Loading your gigs...</div>
      ) : error ? (
        <div className="py-12">
          <p>Error loading your gigs:</p>
          <pre className="mt-2 text-sm text-red-500">{JSON.stringify(error, null, 2)}</pre>
        </div>
      ) : !data || data.length === 0 ? (
        <div className="py-12">
          <p>No gigs found. Create your first gig!</p>
          <Link to="/add" className="mt-4 inline-block bg-[#1dbf73] text-white px-4 py-2 rounded">
            Add New Gig
          </Link>
        </div>
      ) : (
        <div className="w-full max-w-[1400px] py-12 px-4 md:px-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">My Gigs</h1>
            {currentUser.isSeller && (
              <Link to="/add">
                <button className="bg-[#1dbf73] text-white font-medium border-none py-2 px-4 rounded-md cursor-pointer hover:bg-[#19a565] transition-colors">
                  Add New Gig
                </button>
              </Link>
            )}
          </div>
          <table className="w-full border-separate" style={{ borderSpacing: '0 0.75rem' }}>
            <thead>
              <tr className="text-left">
                <th className="p-3 font-medium text-gray-500 uppercase">Image</th>
                <th className="p-3 font-medium text-gray-500 uppercase">Title</th>
                <th className="p-3 font-medium text-gray-500 uppercase">Price</th>
                <th className="p-3 font-medium text-gray-500 uppercase">Sales</th>
                <th className="p-3 font-medium text-gray-500 uppercase">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((gig) => (
                <tr key={gig._id} className="bg-white h-14 transition-all duration-200 hover:bg-gray-50 even:bg-[#1dbf730f]">
                  <td className="p-3 rounded-l-md align-middle">
                    <img className="w-[50px] h-[25px] object-cover" src={gig.cover} alt="" />
                  </td>
                  <td className="p-3 align-middle">{gig.title}</td>
                  <td className="p-3 align-middle">${gig.price}</td>
                  <td className="p-3 align-middle">{gig.sales}</td>
                  <td className="p-3 rounded-r-md align-middle">
                    <img
                      className="w-5 cursor-pointer"
                      src="./img/delete.png"
                      alt="Delete"
                      onClick={() => handleDelete(gig._id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default MyGigs;