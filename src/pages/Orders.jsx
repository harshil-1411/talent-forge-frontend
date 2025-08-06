import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../utils/newRequest";

const Orders = () => {
  const [currentUser, setCurrentUser] = React.useState(null);
  const navigate = useNavigate();

  React.useEffect(() => {
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
    enabled: !!currentUser // Only fetch when we have a user
  });

  const handleContact = async (order) => {
    const sellerId = order.sellerId;
    const buyerId = order.buyerId;
    const id = sellerId + buyerId;

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
    <div className="flex justify-center text-gray-600">
      {isPending ? (
        <span className="py-12">Loading...</span>
      ) : error ? (
        <span className="py-12">Error loading orders.</span>
      ) : (
        <div className="w-full max-w-[1400px] py-12 px-4 md:px-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Orders</h1>
          </div>
          <table className="w-full border-separate border-spacing-y-2">
            <thead>
              <tr className="text-left">
                <th className="py-3 px-2 font-medium text-gray-500 uppercase">Image</th>
                <th className="py-3 px-2 font-medium text-gray-500 uppercase">Title</th>
                <th className="py-3 px-2 font-medium text-gray-500 uppercase">Price</th>
                <th className="py-3 px-2 font-medium text-gray-500 uppercase">Contact</th>
              </tr>
            </thead>
            <tbody>
              {data.map((order) => (
                <tr key={order._id} className="bg-white even:bg-[#1dbf730f] h-14 transition-all duration-200 hover:bg-[#1dbf731a]">
                  <td className="py-2 px-2 rounded-l-md">
                    <img
                      className="w-[50px] h-[25px] object-cover"
                      src={order.img}
                      alt="Gig Image"
                    />
                  </td>
                  <td className="py-2 px-2">{order.title}</td>
                  <td className="py-2 px-2">${order.price}</td>
                  <td className="py-2 px-2 rounded-r-md">
                    <img
                      className="w-6 cursor-pointer"
                      src="./img/message.png"
                      alt="Contact"
                      onClick={() => handleContact(order)}
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
};

export default Orders;