import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, LogOut } from "lucide-react";
import { useAuth } from "@/context/auth-context";

export function Navbar() {
  const { logout } = useAuth();
  return (
    <nav className="w-full border-b ">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
        {/* Left: Logo / Home */}
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <span className="hidden sm:inline">Membership</span>
          </Link>

          <Link
            to="/plans"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Plans
          </Link>
        </div>

        {/* Right: Logout */}
        <Button
          variant="ghost"
          className="flex items-center gap-2"
          onClick={() => {
            logout();
            console.log("logout");
          }}
        >
          <LogOut className="h-4 w-4" />
          <span className="hidden sm:inline">Logout</span>
        </Button>
      </div>
    </nav>
  );
}
