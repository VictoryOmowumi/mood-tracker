import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Home, History, Calendar, Settings, NotebookPen } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion } from "framer-motion";
const navItems = [
  { name: "Home", path: "/", icon: Home },
  { name: "History", path: "/history", icon: History },
  { name: "Journal", path: "/journal", icon: NotebookPen },
  { name: "Calendar", path: "/calendar", icon: Calendar },
  { name: "Settings", path: "/settings", icon: Settings },
];

export const Navigation = () => {
  const location = useLocation();
  const { moodTheme } = useTheme();

  return (
    <>
      {/* Desktop Sidebar - Icons Only */}
      <aside
        className={`hidden md:flex md:flex-col  md:w-24 md:fixed md:inset-y-0 ${
          moodTheme?.light.secondary || "bg-card"
        } border-r`}
      >
        <div className="flex-1 flex flex-col  py-4">
          <nav className="flex-1 flex flex-col h-full justify-center items-center gap-5 px-2">
            {navItems.map((item) => (
              <Tooltip key={item.name} delayDuration={0}>
                <TooltipTrigger asChild>
                  <NavLink
                    to={item.path}
                    className={cn(
                      "flex items-center justify-center px-5 py-6 rounded-xl transition-all",
                      location.pathname === item.path
                        ? `${
                            moodTheme?.light.primary || "bg-primary"
                          } text-primary-foreground`
                        : `${
                            moodTheme?.light.text
                              ? `${moodTheme?.light.text}/50`
                              : "text-muted-foreground"
                          } hover:${
                            moodTheme?.light.secondary
                              ? `${moodTheme?.light.secondary}/80`
                              : "bg-accent"
                          }`
                    )}
                  >
                    <motion.div
                      key={item.name}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className=""
                    >
                      <item.icon className="w-6 h-6" strokeWidth={1} />
                    </motion.div>
                  </NavLink>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className={`${moodTheme?.light.primary || "bg-primary"} ${
                    moodTheme?.light.text
                      ? "text-white"
                      : "text-primary-foreground"
                  }`}
                >
                  {item.name}
                </TooltipContent>
              </Tooltip>
            ))}
          </nav>
        </div>
      </aside>

      {/* Mobile Bottom Navigation - Compact */}
      <nav
        className={`md:hidden fixed z-50 bottom-0 w-full ${
          moodTheme?.light.secondary || "bg-card"
        } border-t`}
      >
        <div className="flex justify-around">
          {navItems.map((item) => (
            <Tooltip key={item.name} delayDuration={0}>
              <TooltipTrigger asChild>
                <NavLink
                  to={item.path}
                  className={cn(
                    "flex flex-col items-center py-5 px-4 transition-colors ",
                    location.pathname === item.path
                      ? `border-t-5 border-t-border ${
                          moodTheme?.light.primary || "text-primary "
                        }`
                      : `${
                          moodTheme?.light.text
                            ? `${moodTheme?.light.text}/70`
                            : "text-muted-foreground"
                        }`
                  )}
                >
                  <item.icon className="h-5 w-5" strokeWidth={1} />
                </NavLink>
              </TooltipTrigger>
              <TooltipContent
                side="top"
                className={`${moodTheme?.light.primary || "bg-primary"} ${
                  moodTheme?.light.text
                    ? "text-white"
                    : "text-primary-foreground"
                }`}
              >
                {item.name}
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </nav>
    </>
  );
};
