import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Profile from "./pages/Profile.jsx";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import Header from "./components/Header.jsx";
import PrivateRoute from "./pages/PrivateRoute.jsx";
import CreateListing from "./pages/CreateListing.jsx";
import EditListing from "./pages/EditListing.jsx";
import GetListing from "./pages/GetListing.jsx";
// import VideoShow from "./pages/VideoShow.jsx";
// import VideoShowLoop from "./pages/VideoShowLoop.jsx";
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/video" element={<VideoShow />} />
        <Route path="/loopvideo" element={<VideoShowLoop />} /> */}
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-listing" element={<CreateListing />} />
          <Route path="/edit-listing/:id" element={<EditListing />} />
        </Route>
        <Route path="/listing/:id" element={<GetListing />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
