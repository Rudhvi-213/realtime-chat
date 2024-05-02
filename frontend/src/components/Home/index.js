import Sidebar from "../Sidebar";
import MessageSection from "../MessageSection";

import "./index.css";

const Home = () => {
  return (
    <div className="home_container">
      <div className="chat_card">
        <Sidebar />
        <MessageSection />
      </div>
    </div>
  );
};

export default Home;
