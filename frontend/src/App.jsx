import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { MantineProvider, createTheme } from "@mantine/core";
import { Header } from "./components/Header/Header";
import Home from "./components/Home/Home";
import { Login } from "./components/Login/Login";
import { Signup } from "./components/Signup/Signup";
import { Footer } from "./components/Footer/Footer";
import Dashboard from "./components/Dashboard/Dashboard";
import Contactus from "./components/Contactus/Contactus";
import Aboutus from "./components/Aboutus/Aboutus";
import axios from "axios";
import { ToastContainer, Zoom, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createContext, useEffect, useState } from "react";
import Template1 from "./GeneratedSites/Template1";
export const UserContext = createContext({});
export const TemplateContext = createContext({});
const theme = createTheme({
  shadows: {
    md: "1px 1px 3px rgba(0, 0, 0, .25)",
    xl: "5px 5px 3px rgba(0, 0, 0, .25)",
  },

  fontFamily: "Montserrat, sans-serif",
  defaultRadius: "20px",
  fontSmoothing: true,
  primaryColor: "grape",
});

export default function App() {
  axios.defaults.baseURL = "https://wwg-backend.onrender.com/api/";
  const [userData, setUserData] = useState(null);
  const [templateData, setTemplateData] = useState({
    userId: "",
    eventDetails: {
      brideName: "",
      groomName: "",
      weddingDate: "",
      weddingTime: "",
      weddingVenue: "",
      yourStory: "",
    },
    guestList: [],
    photoGallery: [],
    mapAndDirections: {
      link: "",
      directions: "",
    },
    travelAndAccommodation: {
      travelInfo: "",
      accommodationsInfo: "",
    },
    colorManagement: "",
    errors: {
      eventDetails: true,
      mapAndDirections: true,
      travelAndAccommodation: true,
      colorManagement: true,
    },
  });

  function updateUserData(userData) {
    setUserData(userData);
  }

  return (
    <MantineProvider theme={theme}>
      <UserContext.Provider value={{ userData, updateUserData }}>
        <TemplateContext.Provider value={{ templateData, setTemplateData }}>
          <ToastContainer
            position="top-center"
            autoClose="30000"
            hideProgressBar={false}
            closeOnClick={false}
            pauseOnHover={true}
            draggable={true}
            transition={Zoom}
            theme="colored"
          />
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<Aboutus />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route
                path="/dashboard"
                element={
                  <SecureRoute auth={userData?.token}>
                    <Dashboard />
                  </SecureRoute>
                }
              ></Route>
              <Route path="/contact" element={<Contactus />} />
              <Route path="/template/:templateId" element={<Template1 />} />
            </Routes>
          </Router>
        </TemplateContext.Provider>
      </UserContext.Provider>
    </MantineProvider>
  );
}

function SecureRoute({ auth, children }) {
  if (!auth) {
    toast.error("Unauthorized! Please login to access dashboard!");
    return <Navigate to="/login" replace />;
  }
  return children;
}

