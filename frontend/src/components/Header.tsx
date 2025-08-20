import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Trend Engine", path: "/trends" },
    { name: "Campaign Generator", path: "/campaigns" },
    { name: "Dashboard", path: "/dashboard" },
  ];

  return (
    <header className="w-full bg-background/95 backdrop-blur-sm border-b border-border/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              GullyKart
            </div>
            <span className="text-xl font-medium text-muted-foreground">vision</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === item.path
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Login Button */}
          <Link to="/login">
            <Button variant="secondary" className="font-medium">
              Login
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;