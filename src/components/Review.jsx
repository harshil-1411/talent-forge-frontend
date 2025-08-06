import React from "react";

const Review = ({ review }) => {
  if (!review) {
    return null;
  }

  const user = review.userId;

  return (
    <div className="flex flex-col gap-5 my-5 border-t border-gray-200 pt-5">
      <div className="flex items-center gap-4">
        <img
          className="h-12 w-12 rounded-full object-cover"
          src={user.img || "/img/profile-avatar.png"}
          alt={user.username}
        />
        <div className="info">
          <span className="font-semibold text-gray-900">{user.username}</span>
          <div className="flex items-center gap-2.5 text-gray-500">
            <img
              src="https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png"
              alt={user.country}
              className="w-5"
            />
            <span>{user.country}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-1">
        {Array(review.star)
          .fill()
          .map((item, i) => (
            <img src="/img/star.png" alt="" key={i} className="h-3.5 w-3.5" />
          ))}
        <span className="text-sm font-bold text-[#ffc108] ml-2">
          {review.star}
        </span>
      </div>
      <p className="text-gray-700 leading-relaxed">{review.desc}</p>
      <div className="flex items-center gap-2.5 text-sm">
        <span className="font-medium text-gray-700">Helpful?</span>
        <div className="flex items-center gap-1 cursor-pointer hover:opacity-80">
          <img src="/img/like.png" alt="Like" className="w-3.5" />
          <span>Yes</span>
        </div>
        <div className="flex items-center gap-1 cursor-pointer hover:opacity-80">
          <img src="/img/dislike.png" alt="Dislike" className="w-3.5" />
          <span>No</span>
        </div>
      </div>
    </div>
  );
};

export default Review;