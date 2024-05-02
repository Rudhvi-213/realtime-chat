import Cookies from "js-cookie";

import Conversations from "../Conversations";
import { useNavigate } from "react-router-dom";

const Sidebar = (props) => {
  const navigate = useNavigate();
  const onClickLogout = () => {
    Cookies.remove("jwt_token");
    navigate("/login");
  };
  return (
    <div>
      <Conversations />
      <button
        type="button"
        className="logout-desktop-btn"
        onClick={onClickLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
