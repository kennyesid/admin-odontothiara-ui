import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import CalendarPage from "@/pages/CalendarPage";
import Dashboard from "@/pages/Dashboard";
import VisitPage from "@/pages/VisitPage/VisitPage";
import HistoryPage from "@/pages/HistoryPage/HistoryPage";
import UserMain from "./pages/CreateUser";
import NavBar2026 from "./components/NavBar/NavBar2026";
import VisitPageMain from "./pages/VisitPage/VisitPageMain";
import LoginPage from "./pages/LoginPage/LoginPage";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("authenticated") === "true";
  });

  const handleLogin = () => {
    localStorage.setItem("authenticated", "true");
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("authenticated");
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <Router>
      {/* <div className="w-full h-screen bg-[#B3CDD7] p-6 px-32 flex gap-6 overflow-hidden font-sans antialiased"> */}
      <div className="w-full h-screen bg-[#B3CDD7] p-4 md:p-6 lg:px-32 flex flex-col md:flex-row gap-4 md:gap-6 overflow-hidden font-sans antialiased">
        <NavBar2026 onLogout={handleLogout} />
        <div className="flex-1 h-full overflow-hidden">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/visitPage" element={<VisitPage />} />
            <Route path="/createUser" element={<UserMain />} />
            <Route path="/visit" element={<VisitPage />} />
            {/* <Route path="/visit" element={<VisitPageMain />} /> */}
            {/* <Route path="/patients" element={<PatientsPage />} /> */}
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
