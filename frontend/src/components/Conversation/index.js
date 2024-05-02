import useConversation from "../Zustand";
import "./index.css";

const Conversation = (props) => {
  const { userConversation } = props;
  const { selectedConversation, setSelectedConversation } = useConversation();

  const isSelected = selectedConversation?._id === userConversation._id;
  return (
    <>
      <div
        className={`chat_container ${isSelected ? "blue_background" : ""}`}
        onClick={() => setSelectedConversation(userConversation)}
      >
        <div className="avatar online">
          <div className="w-24 rounded-full">
            <img
              className="conversation_profile_img"
              src={userConversation.profilePic}
              alt="profile-pic"
            />
          </div>
        </div>
        <div>
          <p>{userConversation.fullName}</p>
        </div>
      </div>
    </>
  );
};

export default Conversation;
