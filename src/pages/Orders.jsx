import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../utils/newRequest";
import { MessageCircle } from "lucide-react"; // Using an icon for better UI

const Orders = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userStr = localStorage.getItem("currentUser");
    if (!userStr) {
      navigate("/login");
      return;
    }
    try {
      setCurrentUser(JSON.parse(userStr));
    } catch (err) {
      console.error("Error parsing user data:", err);
      navigate("/login");
    }
  }, [navigate]);

  const { isPending, error, data } = useQuery({
    queryKey: ["orders"],
    queryFn: () => newRequest.get(`/orders`).then((res) => res.data),
    enabled: !!currentUser,
  });

  const handleContact = async (order) => {
    const sellerId = order.sellerId;
    const buyerId = order.buyerId;
    // FIX: Sort IDs to create a unique, consistent conversation ID
    const id = [sellerId, buyerId].sort().join("");

    try {
      const res = await newRequest.get(`/conversations/single/${id}`);
      navigate(`/message/${res.data.id}`);
    } catch (err) {
      if (err.response?.status === 404) {
        const res = await newRequest.post(`/conversations/`, {
          to: currentUser.isSeller ? buyerId : sellerId,
        });
        navigate(`/message/${res.data.id}`);
      } else {
        console.error("Failed to handle contact:", err);
      }
    }
  };

  return (
    <div className="flex justify-center text-gray-700">
      <div className="w-full max-w-7xl py-12 px-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Orders</h1>
        </div>
        {isPending ? (
          <div className="text-center py-10">Loading orders...</div>
        ) : error ? (
          <div className="text-center py-10 text-red-600">Error loading orders.</div>
        ) : (
          <table className="w-full border-separate border-spacing-y-4">
            <thead>
              <tr className="text-left">
                <th className="p-3 font-medium text-gray-500 uppercase">Image</th>
                <th className="p-3 font-medium text-gray-500 uppercase">Title</th>
                <th className="p-3 font-medium text-gray-500 uppercase">Price</th>
                <th className="p-3 font-medium text-gray-500 uppercase">Contact</th>
              </tr>
            </thead>
            <tbody>
              {data.map((order) => (
                <tr key={order._id} className="bg-white rounded-md shadow-sm transition-all duration-200 hover:shadow-md">
                  <td className="p-4 align-middle rounded-l-md">
                    <img
                      className="w-[60px] h-[30px] object-cover"
                      src={order.img}
                      alt="Gig Image"
                    />
                  </td>
                  <td className="p-4 align-middle">{order.title}</td>
                  <td className="p-4 align-middle font-semibold">${order.price.toFixed(2)}</td>
                  <td className="p-4 align-middle rounded-r-md">
                    <MessageCircle 
                      className="w-6 h-6 text-blue-600 cursor-pointer hover:opacity-80"
                      onClick={() => handleContact(order)}
                    />
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

export default Orders;