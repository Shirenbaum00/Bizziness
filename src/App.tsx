import React from 'react';
import logo from './logo.svg';

import './App.css';
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from './components/Login';
import Home from './components/Home';
import Register from './components/Register';

import AdminPanel from './components/AdminPanel';
import About from './components/About';
import Footer from './components/Footer';
import MyProfile from './components/MyProfile';
import BusinessPage from "./components/BusinessPage";


const App = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const saved = localStorage.getItem("theme") as "light" | "dark" | null;
    const initial = saved ?? "light";
    setTheme(initial);
    document.documentElement.setAttribute("data-theme", initial);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === "light" ? "dark" : "light";
      localStorage.setItem("theme", next);
      document.documentElement.setAttribute("data-theme", next);
      return next;
    });
  };

  return (
    <>
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/business/:id" element={<BusinessPage />} />

        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/myprofile" element={<MyProfile />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
