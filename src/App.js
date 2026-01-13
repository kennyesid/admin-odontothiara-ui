import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "@/pages/Dashboard";
import VisitPage from "@/pages/VisitPage/VisitPage";
import PatientsPage from "@/pages/PatientsPage/PatientsPage";
import HistoryPage from "@/pages/HistoryPage/HistoryPage";
import CalendarPage from "@/pages/CalendarPage";
import NavBarTwo from "@/components/NavBar/NavBarTwo";
import UserMain from "./pages/CreateUser";
import NavBar2026 from "./components/NavBar/NavBar2026";
import UserMainTest from "./pages/CreateUser/UserMainTest";

const App = () => {
  return (
    <Router>
      {/* F1F5F9 */}
      <div className="w-full h-screen bg-[#B3CDD7] p-6 px-32 flex gap-6 overflow-hidden font-sans antialiased">
        <NavBar2026 />
        <div className="flex-1 h-full overflow-hidden">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            {/* <Route path="/createUser" element={<UserMainTest />} /> */}
            <Route path="/createUser" element={<UserMain />} />
            <Route path="/visit" element={<VisitPage />} />
            <Route path="/patients" element={<PatientsPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/calendar" element={<CalendarPage />} />
          </Routes>
        </div>
      </div>
      {/* <div className="min-h-screen w-full ">
        <div className="flex w-full min-h-screen">
          <div className="w-[20%] bg-[#F1F5F9]">
            <NavBar2026 />
          </div>
          <div className="w-[80%] bg-[#F1F5F9]">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/createUser" element={<UserMain />} />
              <Route path="/visit" element={<VisitPage />} />
              <Route path="/patients" element={<PatientsPage />} />
              <Route path="/history" element={<HistoryPage />} />
              <Route path="/calendar" element={<CalendarPage />} />
            </Routes>
          </div>
        </div>
      </div> */}
    </Router>
  );
};

export default App;
