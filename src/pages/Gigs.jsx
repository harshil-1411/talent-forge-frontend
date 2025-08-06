import React, { useState, useRef } from "react";
import GigCard from "../components/GigCard";
import newRequest from "../utils/newRequest";
import { useQuery } from '@tanstack/react-query';
import { useLocation } from "react-router-dom";

function Gigs() {
  const [open, setOpen] = useState(false);
  const [sort, setSort] = useState("sales");
  
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const minRef = useRef();
  const maxRef = useRef();
  const { search } = useLocation();

  const { isPending, error, data } = useQuery({
    queryKey: ["gigs", search, sort, minPrice, maxPrice],
    queryFn: () => {
      let url = `/gigs${search ? '' : '?'}sort=${sort}`;
      if (minPrice) url += `&min=${minPrice}`;
      if (maxPrice) url += `&max=${maxPrice}`;
      
      return newRequest.get(url).then((res) => res.data);
    },
  });

  const apply = () => {
    setMinPrice(minRef.current.value);
    setMaxPrice(maxRef.current.value);
  };
  
  const reSort = (type) => {
    setSort(type);
    setOpen(false);
  };
  

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-[1400px] py-8 px-4 md:px-6 lg:px-8 flex flex-col gap-4">
        <span className="font-light text-sm uppercase text-gray-600">
          Liverr &gt; Graphics &amp; Design &gt;
        </span>
        <h1 className="text-4xl font-bold text-gray-800">AI Artists</h1>
        <p className="text-gray-500 font-light">
          Explore the boundaries of art and technology with Liverr's AI artists
        </p>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-5 gap-4">
          <div className="flex items-center gap-2.5 text-gray-600 font-light">
            <span>Budget</span>
            <input ref={minRef} type="number" placeholder="min" className="p-1 border border-gray-300 rounded-md outline-none w-20 placeholder:text-gray-400" />
            <input ref={maxRef} type="number" placeholder="max" className="p-1 border border-gray-300 rounded-md outline-none w-20 placeholder:text-gray-400" />
            <button onClick={apply} className="py-1 px-2.5 bg-[#1dbf73] text-white border-none font-medium rounded-md cursor-pointer hover:bg-[#19a565] transition-colors">
              Apply
            </button>
          </div>

          <div className="relative flex items-center gap-2.5">
            <span className="text-gray-600 font-light">Sort by</span>
            <span className="font-medium">{sort === "sales" ? "Best Selling" : "Newest"}</span>
            <img src="./img/down.png" alt="sort" className="w-4 cursor-pointer" onClick={() => setOpen(!open)} />
            {open && (
              <div className="p-5 bg-white border border-gray-200 rounded-md absolute top-8 right-0 z-10 flex flex-col gap-5 text-gray-600 shadow-lg">
                <span className="cursor-pointer hover:text-black" onClick={() => reSort("createdAt")}>Newest</span>
                <span className="cursor-pointer hover:text-black" onClick={() => reSort("sales")}>Best Selling</span>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {isPending
            ? "Loading..."
            : error
              ? "Something went wrong!"
              : data.map((gig) => <GigCard key={gig._id} item={gig} />)
          }
        </div>
      </div>
    </div>
  );
}

export default Gigs;