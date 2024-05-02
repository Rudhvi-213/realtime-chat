import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./components/Home";
// import About from './components/About'
import Login from "./components/Login";
import Signup from "./components/Signup";
import NotFound from "./components/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

import "./App.css";

const App = () => (
  <>
    <Routes>
      <Route exact path="/signup" Component={Signup} />
      <Route exact path="/login" Component={Login} />
      <Route exact path="/" element={<ProtectedRoute />}>
        <Route exact path="/" Component={Home} />
      </Route>
      {/* <ProtectedRoute exact path="/about" component={About} /> */}
      <Route component={NotFound} />
    </Routes>
    <Toaster />
  </>
);

export default App;
