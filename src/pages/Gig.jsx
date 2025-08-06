import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";
import newRequest from "../utils/newRequest";
import Reviews from "../components/Reviews";

// NEW: Swiper for the image gallery
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// NEW: Icons for a cleaner UI
import { Star, Clock, RefreshCw, Check, Award } from "lucide-react";

function Gig() {
  const { id } = useParams();

  // Data fetching for the gig itself (your logic is already solid)
  const { isPending, error, data } = useQuery({
    queryKey: ["gig", id],
    queryFn: () => newRequest.get(`/gigs/single/${id}`).then((res) => res.data),
  });

  // Dependent query for the seller's data
  const {
    isPending: isLoadingUser,
    error: errorUser,
    data: dataUser,
  } = useQuery({
    queryKey: ["user", data?.userId],
    queryFn: () => newRequest.get(`/users/${data.userId}`).then((res) => res.data),
    enabled: !!data?.userId,
  });

  const starCount = data ? Math.round(data.totalStars / data.starNumber) : 0;

  return (
    <div className="bg-gray-50 flex justify-center py-10">
      <div className="w-full max-w-7xl px-6">
        {isPending ? (
          <div className="text-center py-20">Loading Gig...</div>
        ) : error ? (
          <div className="text-center py-20 text-red-500">Could not load gig.</div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* --- LEFT COLUMN (MAIN CONTENT) --- */}
            <div className="lg:col-span-2 flex flex-col gap-8">
              <span className="font-light text-sm text-gray-500 uppercase tracking-wider">
                TalentForge &gt; {data.cat}
              </span>
              <h1 className="text-4xl font-extrabold text-gray-900">{data.title}</h1>

              {/* User Info Header */}
              {isLoadingUser ? (
                <div className="animate-pulse flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                  <div className="h-6 w-32 bg-gray-200 rounded"></div>
                </div>
              ) : errorUser ? (
                <div className="text-red-500">Error loading seller information</div>
              ) : (
                <div className="flex flex-col gap-4 bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-center gap-4">
                    <img
                      className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                      src={dataUser.img || "https://static.vecteezy.com/system/resources/previews/027/951/137/non_2x/stylish-spectacles-guy-3d-avatar-character-illustrations-png.png"}
                      alt={dataUser.username}
                    />
                    <div className="flex flex-col">
                      <span className="text-xl font-semibold text-gray-800">{dataUser.username}</span>
                      {dataUser.country && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <img
                            src={`https://flagcdn.com/24x18/${dataUser.country.toLowerCase()}.png`}
                            alt={dataUser.country}
                            className="w-5"
                          />
                          <span>{dataUser.country}</span>
                        </div>
                      )}
                    </div>
                    {!isNaN(starCount) && starCount > 0 && (
                      <div className="flex items-center gap-1 border-l pl-4 ml-auto">
                        {Array(starCount).fill().map((_, i) => (
                          <Star key={i} size={20} className="text-yellow-400 fill-yellow-400" />
                        ))}
                        <span className="text-lg font-bold text-yellow-500">{starCount}</span>
                      </div>
                    )}
                  </div>
                  {dataUser.desc && (
                    <div className="mt-2 text-gray-600">
                      <p className="text-sm leading-relaxed">{dataUser.desc}</p>
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-4 mt-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock size={16} />
                      <span>Member since {new Date(dataUser.createdAt).getFullYear()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Award size={16} />
                      <span>{dataUser.isSeller ? "Verified Seller" : "Buyer"}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* NEW: Swiper Image Gallery */}
              <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={10}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                className="w-full rounded-lg shadow-md"
              >
                {data.images.map((image) => (
                  <SwiperSlide key={image}>
                    <img
                      className="w-full h-auto max-h-[500px] object-cover"
                      src={image}
                      alt="Gig preview"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* About this Gig */}
              <div className="mt-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">About This Gig</h2>
                  <p className="text-gray-600 text-lg leading-relaxed whitespace-pre-line">{data.desc}</p>
              </div>

              {/* About The Seller */}
              {isLoadingUser ? ( "Loading..." ) : errorUser ? ( "Error" ) : (
                <div className="mt-12">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">About The Seller</h2>
                  <div className="flex items-center gap-6 p-6 border rounded-lg bg-white">
                    <img
                      src={dataUser.img || "https://static.vecteezy.com/system/resources/previews/027/951/137/non_2x/stylish-spectacles-guy-3d-avatar-character-illustrations-png.png"}
                      alt={dataUser.username}
                      className="w-28 h-28 rounded-full object-cover"
                    />
                    <div className="flex flex-col gap-2">
                      <span className="text-xl font-bold">{dataUser.username}</span>
                      {/* Seller star rating would go here if available */}
                      <button className="mt-2 w-max border border-gray-400 rounded-md px-5 py-2 hover:bg-gray-100 transition-colors">
                        Contact Me
                      </button>
                    </div>
                  </div>
                  <div className="mt-6 border rounded-lg p-6 bg-white">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-1">
                        <span className="font-light text-gray-500">From</span>
                        <span className="font-semibold text-gray-800">{dataUser.country}</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="font-light text-gray-500">Member since</span>
                        <span className="font-semibold text-gray-800">Aug 2022</span>
                      </div>
                      {/* You can add more seller stats here */}
                    </div>
                    <hr className="my-6" />
                    <p className="text-gray-600 leading-relaxed whitespace-pre-line">{dataUser.desc}</p>
                  </div>
                </div>
              )}

              {/* Reviews Section */}
              <Reviews gigId={id} />
            </div>

            {/* --- RIGHT COLUMN (STICKY SIDEBAR) --- */}
            <div className="lg:col-span-1">
                <div className="sticky top-24 border border-gray-200 p-6 rounded-lg bg-white shadow-sm flex flex-col gap-5">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold text-gray-800">{data.shortTitle}</h3>
                        <h2 className="text-3xl font-semibold text-gray-900">${data.price}</h2>
                    </div>
                    <p className="text-gray-600 leading-relaxed">{data.shortDesc}</p>
                    <div className="flex items-center justify-between text-md font-semibold text-gray-700">
                        <div className="flex items-center gap-2">
                            <Clock size={20} />
                            <span>{data.deliveryTime} days Delivery</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <RefreshCw size={20} />
                            <span>{data.revisionNumber} Revisions</span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3 mt-2">
                        {data.features.map((feature) => (
                            <div className="flex items-center gap-2 font-medium text-gray-600" key={feature}>
                                <Check size={20} className="text-green-500" />
                                <span>{feature}</span>
                            </div>
                        ))}
                    </div>
                    <button className="w-full bg-blue-600 text-white font-bold text-lg py-3 border-none cursor-pointer rounded-md hover:bg-blue-700 transition-colors mt-2">
                    Continue (${data.price})
                    </button>
                </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Gig;