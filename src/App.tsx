import { Routes, Route, Outlet } from "react-router-dom";
import { AppShell } from "./components/layout/AppShell";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import Home from "./pages/Home";
import Journal from "./pages/Journal";
import History from "./pages/History";
import Calendar from "./pages/Calendar";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Onboarding from "./pages/onboarding/Onboarding";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { MusicPlayerProvider } from "./context/MusicPlayerContext";
export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <MusicPlayerProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/onboarding" element={<Onboarding />} />

            <Route
              element={
                <ProtectedRoute>
                  <AppShell>
                    <Outlet />
                  </AppShell>
                </ProtectedRoute>
              }
            >
              <Route path="/" element={<Home />} />
              <Route path="/history" element={<History />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/journal" element={<Journal />} />
            </Route>
          </Routes>
        </MusicPlayerProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
