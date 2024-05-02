import { Component } from "react";
import toast from "react-hot-toast";

class MessageInput extends Component {
  state = { message: "", selectedConversations: null, messages: [] };

  componentDidMount = () => {
    const { selectConversation } = this.props;
    this.setState({ selectedConversations: selectConversation });
  };

  changeMessage = (message) => {
    this.setState({ message });
  };

  sendMessage = async (event) => {
    event.preventDefault();
    const { message, selectedConversations, messages } = this.state;
    if (!message) return;
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      };

      const response = await fetch(
        `/api/messages/send/${selectedConversations._id}`,
        options
      );

      const data = await response.json();

      console.log(data);
      if (data.error) throw new Error(data.error);

      this.setState({ messages: [...messages, data.message], message: "" });
    } catch (error) {
      toast.error(error.message);
    }
  };
  render() {
    const { message, messages } = this.state;
    return (
      <form onSubmit={this.sendMessage}>
        <div>
          <input
            onChange={(e) => this.changeMessage(e.target.value)}
            type="text"
            placeholder="Send a message"
            value={message}
          />
          <button type="submit">Send</button>
        </div>
      </form>
    );
  }
}

export default MessageInput;
