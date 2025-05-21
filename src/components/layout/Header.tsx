import { useAuth } from "@/context/AuthContext";
import { LogOut } from "lucide-react";
const Header = () => {
  const { currentUser, logout } = useAuth();

  // Fallback avatar: first letter of displayName or email
  const avatarLetter =
    currentUser?.displayName?.charAt(0).toUpperCase() ||
    currentUser?.email?.charAt(0).toUpperCase() ||
    "?";

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-background/80 backdrop-blur-md glass sticky top-0 z-50 border-b h-20 rounded-b-4xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Mood Tracker 🌱</h1>
        {/* <span className="text-sm text-muted-foreground">Track your mood, journal, and grow </span> */}
      </div>
      <div className="flex items-center gap-4">
        {currentUser && (
          <>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
                {avatarLetter}
              </div>
              {/* <span className="text-sm font-medium">{currentUser.displayName || currentUser.email}</span> */}
            </div>
            <button
              onClick={logout}
              className=" w-8 h-8 flex justify-center items-center p-1.5 rounded-full bg-primary text-primary-foreground hover:bg-primary/80 transition"
            >
              <LogOut strokeWidth={1} />
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;