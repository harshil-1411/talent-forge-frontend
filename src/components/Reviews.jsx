import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import newRequest from "../utils/newRequest";
import Review from "./Review";

const Reviews = ({ gigId }) => {
  const queryClient = useQueryClient();

  const { isPending, error, data } = useQuery({
    queryKey: ["reviews", gigId],
    queryFn: () => newRequest.get(`/reviews/${gigId}`).then((res) => res.data),
  });

  const mutation = useMutation({
    mutationFn: (review) => {
      return newRequest.post("/reviews", review);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews", gigId]);
      queryClient.invalidateQueries(["gig", gigId]);
    },
    onError: (error) => {
      console.error("Error adding review:", error);
      alert(error.response?.data?.message || "Something went wrong!");
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const desc = e.target[0].value;
    const star = parseInt(e.target[1].value); // Convert to number
    
    try {
      mutation.mutate({ 
        gigId, 
        desc, 
        star 
      });
      e.target[0].value = ""; // Clear textarea after submit
    } catch (err) {
      console.error("Error submitting review:", err);
    }
  };

  return (
    // .reviews -> margin-top: 50px -> mt-12
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Reviews</h2>
      {isPending ? (
        <div className="text-gray-500">Loading reviews...</div>
      ) : error ? (
        <div className="text-red-500">Error loading reviews</div>
      ) : !data || data.length === 0 ? (
        <div className="text-gray-500">No reviews yet</div>
      ) : (
        data.map((review) => (
          <Review key={review._id} review={review} />
        ))
      )}

      <div className="mt-8 pt-8 border-t border-gray-200">
        <h3 className="text-xl font-semibold">Add a review</h3>
        <form
          action=""
          className="flex flex-col gap-5 mt-4"
          onSubmit={handleSubmit}
        >
          <textarea
            name="desc"
            placeholder="Write your opinion"
            className="p-5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1dbf73]"
            rows={5}
          />
          <div className="flex items-center justify-end gap-5">
            <select
              name="star"
              className="w-[200px] p-4 border border-gray-300 rounded-md bg-white focus:outline-none"
            >
              <option value={1}>1 Star</option>
              <option value={2}>2 Stars</option>
              <option value={3}>3 Stars</option>
              <option value={4}>4 Stars</option>
              <option value={5}>5 Stars</option>
            </select>
            <button
              type="submit"
              className="w-[100px] self-end border-none p-2.5 text-white bg-[#1dbf73] rounded-md cursor-pointer hover:bg-[#19a565] transition-colors disabled:bg-gray-400"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Sending..." : "Send"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Reviews;
