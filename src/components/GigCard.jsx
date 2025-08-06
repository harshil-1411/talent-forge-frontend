import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';
import newRequest from "../utils/newRequest";

const GigCard = ({ item }) => {
  const { isPending, error, data: user } = useQuery({
    queryKey: ["gigUser", item.userId],
    queryFn: () => newRequest.get(`/users/${item.userId}`).then((res) => res.data),
  });

  return (
    <Link to={`/gig/${item._id}`} className="text-inherit no-underline">
      <div className="w-[324px] h-[400px] border border-gray-200 mb-10 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col">
        <img
          src={item.cover}
          alt={item.desc}
          className="w-full h-1/2 object-cover"
        />
        <div className="py-2.5 px-5 flex flex-col gap-4">
          <div className="flex items-center gap-2.5 h-[26px]">
            {isPending ? (
              <span className="text-sm text-gray-400">Loading user...</span>
            ) : error ? (
              <span className="text-sm text-red-500">Error</span>
            ) : (
              <>
                <img
                  src={user?.img || "./img/check.png"} // Use optional chaining and a fallback image
                  alt={user?.username}
                  className="w-[26px] h-[26px] rounded-full object-cover"
                />
                <span className="text-sm font-semibold">{user?.username}</span>
              </>
            )}
          </div>
          <p className="text-zinc-800 font-normal leading-snug h-12 overflow-hidden">
            {item.desc.length > 80
              ? `${item.desc.substring(0, 80)}...`
              : item.desc}
          </p>
          <div className="flex items-center gap-1">
            <img src="./img/star.png" alt="star" className="w-3.5 h-3.5" />
            <span className="text-sm font-bold text-yellow-500">
              {/* Ensure star rating is calculated and displayed correctly */}
              {!isNaN(item.totalStars / item.starNumber) &&
                Math.round(item.totalStars / item.starNumber)}
            </span>
          </div>
        </div>
        {/* Use flex-grow to push the footer to the bottom */}
        <div className="flex-grow"></div>
        <hr className="border-t border-gray-200" />
        <div className="py-2.5 px-5 flex items-center justify-between">
          <img
            src="./img/heart.png"
            alt="favorite"
            className="w-4 h-4 cursor-pointer"
          />
          <div className="text-right">
            <span className="text-gray-500 text-xs">STARTING AT</span>
            <h2 className="text-gray-700 text-lg font-normal">
              $ {item.price}
            </h2>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GigCard;