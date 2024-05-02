import Messages from "../Messages";
import MessageInput from "../MessageInput";
import useConversation from "../Zustand";
import { useEffect } from "react";

const MessageSection = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  useEffect(() => {
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  return (
    <div>
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          <div>
            <span>To:</span> <span>{selectedConversation.fullName}</span>
          </div>

          <Messages selectConversation={selectedConversation} />
          <MessageInput selectConversation={selectedConversation} />
        </>
      )}
    </div>
  );
};

export default MessageSection;

const NoChatSelected = () => {
  return (
    <div>
      <h1>No Chat Selected</h1>
    </div>
  );
};
