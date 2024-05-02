// import { extractTime } from "../utils/time";

const Message = (props) => {
  const { message, selectConversation } = props;
  const fromMe = message.senderId === "";
  // const formattedTime = extractTime(message.createdAt).format("h:mm A");
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const bubbleBgColor = fromMe ? "bg-blue-500" : "";
  const shakeClass = message.shouldShake ? "shake" : "";

  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS chat bubble component" src="" />
        </div>
      </div>
      <div
        className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}
      >
        {message.message}
      </div>
    </div>
  );
};

export default Message;
