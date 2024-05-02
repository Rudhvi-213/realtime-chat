import { Component } from "react";
import Conversation from "../Conversation";
import toast from "react-hot-toast";

class Conversations extends Component {
  state = { conversationData: [] };
  componentDidMount = () => {
    return this.getAllConversations();
  };

  getAllConversations = async () => {
    try {
      const url = "/api/users";
      const response = await fetch(url);
      const data = await response.json();
      this.setState({ conversationData: data });
      if (data.error) {
        throw new Error(data.error);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  render() {
    const { conversationData } = this.state;
    return (
      <div>
        {conversationData.map((eachUser, idx) => (
          <Conversation key={eachUser._id} userConversation={eachUser} />
        ))}
      </div>
    );
  }
}

export default Conversations;
