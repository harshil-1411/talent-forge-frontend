import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Link, useParams } from "react-router-dom";
import newRequest from "../utils/newRequest";

const Message = () => {
  const { id } = useParams();
  const [currentUser, setCurrentUser] = React.useState(null);
  const queryClient = useQueryClient();
  const messageEndRef = React.useRef(null);

  React.useEffect(() => {
    const userStr = localStorage.getItem("currentUser");
    if (userStr) {
      try {
        setCurrentUser(JSON.parse(userStr));
      } catch (err) {
        console.error("Error parsing user data:", err);
      }
    }
  }, []);

  // Fetch messages
  const { isPending, error, data: messages } = useQuery({
    queryKey: ["messages", id],
    queryFn: () => newRequest.get(`/messages/${id}`).then((res) => res.data),
    enabled: !!currentUser && !!id,
  });

  // Fetch conversation details
  const { data: conversation } = useQuery({
    queryKey: ["conversation", id],
    queryFn: () => newRequest.get(`/conversations/single/${id}`).then((res) => res.data),
    enabled: !!currentUser && !!id,
  });

  const mutation = useMutation({
    mutationFn: async (message) => {
      console.log("Sending message:", message);
      try {
        const response = await newRequest.post("/messages", message);
        console.log("Message sent response:", response.data);
        return response.data;
      } catch (err) {
        console.error("Mutation error details:", {
          message: err.message,
          response: err.response?.data,
          status: err.response?.status,
          config: err.config
        });
        throw err;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["messages", id]);
      queryClient.invalidateQueries(["conversations"]);
      messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    },
    onError: (error) => {
      console.error("Error sending message:", error?.response?.data || error.message);
      alert(error?.response?.data?.message || "Failed to send message. Please try again.");
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const messageInput = e.target.elements[0];
    const messageText = messageInput.value;
    
    if (!messageText.trim() || !currentUser || !id) return;

    try {
      await mutation.mutateAsync({
        conversationId: id,
        desc: messageText.trim(),
      });
      
      messageInput.value = "";
      
      // Update conversation read status
      try {
        await newRequest.put(`/conversations/${id}`);
      } catch (err) {
        console.error("Error updating conversation read status:", err);
      }
    } catch (err) {
      console.error("Error in handleSubmit:", err);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-[1200px] m-12">
        <span className="font-light text-sm text-gray-600">
          <Link to="/messages" className="hover:underline">Messages</Link>
          {conversation && <>&gt; {currentUser?.isSeller === conversation.isSeller ? conversation.buyerUsername : conversation.sellerUsername} &gt;</>}
        </span>
        {!currentUser ? (
          <div className="py-12 text-center">Please log in to view messages</div>
        ) : isPending ? (
          <div className="py-12 text-center">Loading messages...</div>
        ) : error ? (
          <div className="py-12 text-center text-red-500">Error loading messages: {error.message}</div>
        ) : (
          <div className="my-8 p-12 flex flex-col gap-5 h-[500px] overflow-y-auto">
            {messages?.map((m) => (
              <div
                key={m._id}
                className={`flex gap-5 max-w-[600px] text-lg ${
                  m.senderId === currentUser._id ? "self-end flex-row-reverse" : ""
                }`}
              >
                <img
                  src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  alt=""
                  className="w-10 h-10 rounded-full object-cover"
                />
                <p
                  className={`max-w-[500px] p-5 font-light ${
                    m.senderId === currentUser._id
                      ? "rounded-l-2xl rounded-t-2xl bg-blue-600 text-white"
                      : "rounded-r-2xl rounded-t-2xl bg-gray-100 text-gray-600"
                  }`}
                >
                  {m.desc}
                </p>
              </div>
            ))}
            <div ref={messageEndRef} />
          </div>
        )}
        <hr className="border-t border-gray-200 mb-5" />
        <form className="flex items-center justify-between gap-5" onSubmit={handleSubmit}>
          <textarea
            type="text"
            placeholder="write a message"
            className="w-4/5 h-24 p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400"
          />
          <button
            type="submit"
            className="w-[100px] bg-[#1dbf73] p-5 text-white font-medium border-none rounded-lg cursor-pointer hover:bg-[#19a565] transition-colors"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Message;