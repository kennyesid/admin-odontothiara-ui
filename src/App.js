import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CalendarPage from "@/pages/CalendarPage";
import Dashboard from "@/pages/Dashboard";
import VisitPage from "@/pages/VisitPage/VisitPage";
import HistoryPage from "@/pages/HistoryPage/HistoryPage";
import UserMain from "./pages/CreateUser";
import NavBar2026 from "./components/NavBar/NavBar2026";
import VisitPageMain from "./pages/VisitPage/VisitPageMain";

const App = () => {
  return (
    <Router>
      {/* <div className="w-full h-screen bg-[#B3CDD7] p-6 px-32 flex gap-6 overflow-hidden font-sans antialiased"> */}
      <div className="w-full h-screen bg-[#B3CDD7] p-4 md:p-6 lg:px-32 flex flex-col md:flex-row gap-4 md:gap-6 overflow-hidden font-sans antialiased">
        <NavBar2026 />
        <div className="flex-1 h-full overflow-hidden">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/visitPage" element={<VisitPage />} />
            <Route path="/createUser" element={<UserMain />} />
            <Route path="/visit" element={<VisitPageMain />} />
            {/* <Route path="/patients" element={<PatientsPage />} /> */}
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/calendar" element={<CalendarPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
