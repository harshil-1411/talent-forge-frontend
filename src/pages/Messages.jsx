import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import newRequest from "../utils/newRequest";
import moment from "moment";

const Messages = () => {
  const queryClient = useQueryClient();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const userStr = localStorage.getItem("currentUser");
    if (userStr) {
      try {
        setCurrentUser(JSON.parse(userStr));
      } catch (err) {
        console.error("Error parsing user data:", err);
      }
    }
  }, []);

  const { isPending, error, data: conversations } = useQuery({
    queryKey: ["conversations"],
    queryFn: () => newRequest.get("/conversations").then((res) => res.data),
    enabled: !!currentUser,
  });

  const mutation = useMutation({
    mutationFn: (id) => newRequest.put(`/conversations/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["conversations"]);
    },
  });

  const handleRead = (id) => {
    mutation.mutate(id);
  };

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-7xl py-12 px-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Messages</h1>
        </div>

        {isPending ? (
          <div className="text-center py-10 text-gray-500">Loading conversations...</div>
        ) : error ? (
          <div className="text-center py-10 text-red-600">Error: Could not load messages.</div>
        ) : (
          <table className="w-full border-separate border-spacing-y-4">
            <thead>
              <tr className="text-left h-12">
                <th className="p-3 font-medium text-gray-500 uppercase">
                  {currentUser?.isSeller ? "Buyer" : "Seller"}
                </th>
                <th className="p-3 font-medium text-gray-500 uppercase">Last Message</th>
                <th className="p-3 font-medium text-gray-500 uppercase">Date</th>
                <th className="p-3 font-medium text-gray-500 uppercase">Action</th>
              </tr>
            </thead>
            <tbody>
              {conversations?.map((c) => (
                <tr
                  key={c._id}
                  className={`transition-colors duration-200 rounded-md shadow-sm ${
                    ((currentUser.isSeller && !c.readBySeller) ||
                      (!currentUser.isSeller && !c.readByBuyer))
                      ? "bg-green-50" 
                      : "bg-white"
                  }`}
                >
                  <td className="p-4 font-semibold text-gray-800 rounded-l-md">
                    {/* DISPLAY USERNAME INSTEAD OF ID */}
                    {currentUser.isSeller ? c.buyerId.username : c.sellerId.username}
                  </td>
                  <td className="p-4 text-gray-600">
                    <Link to={`/message/${c._id}`} className="hover:underline">
                      {c.lastMessage ? `${c.lastMessage.substring(0, 100)}...` : 'No messages yet'}
                    </Link>
                  </td>
                  <td className="p-4 text-gray-500">{moment(c.updatedAt).fromNow()}</td>
                  <td className="p-4 rounded-r-md">
                    {((currentUser.isSeller && !c.readBySeller) ||
                      (!currentUser.isSeller && !c.readByBuyer)) && (
                      <button 
                        onClick={() => handleRead(c._id)}
                        className="bg-[#1dbf73] text-white py-2 px-4 rounded-md border-none cursor-pointer hover:bg-[#19a565]"
                      >
                        Mark as Read
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Messages;