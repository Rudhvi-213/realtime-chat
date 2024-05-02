import { Component } from "react";
import Message from "../Message";
import toast from "react-hot-toast";

class Messages extends Component {
  state = { selectedConversation: this.props.selectConversation, messages: [] };

  componentDidMount() {
    // this.setState({ selectedConversation: this.props.selectConversation });
    this.getMessages();
  }

  getMessages = async () => {
    const { selectedConversation } = this.state;
    console.log(selectedConversation);
    console.log(selectedConversation);
    try {
      const response = await fetch(`/api/messages/${selectedConversation._id}`);
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      console.log(data);
      this.setState({ messages: data });
    } catch (error) {
      toast.error(error.message);
    }
  };

  render() {
    const { messages, selectedConversation } = this.state;
    return (
      <div>
        {messages.length > 0 &&
          messages.map((eachMessage) => (
            <div key={eachMessage._id}>
              <Message
                message={eachMessage}
                selectConversation={selectedConversation}
              />
            </div>
          ))}
        {messages.length === 0 && <p>Start The Conversation</p>}
      </div>
    );
  }
}

export default Messages;
