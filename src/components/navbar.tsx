import { useState, useEffect } from "react";
import { Link, useRouter } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Download, Home, Package, Info, FlaskConical } from "lucide-react";

type NavbarProps = {
  variant?: "home" | "product";
  tabs?: { id: string; label: string }[];
  activeTab?: string;
  onTabChange?: (id: string) => void;
  onDownload?: () => void;
  productName?: string;
};

const NAV_LINKS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/hazelnut-chocolate", label: "Products", icon: Package },
  { href: "#about", label: "About", icon: Info, isAnchor: true },
];

export function Navbar({
  variant = "home",
  tabs = [],
  activeTab,
  onTabChange,
  onDownload,
  productName,
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [router.state.location.pathname]);

  // Handle scroll for shadow effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleTabClick = (id: string) => {
    onTabChange?.(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setIsOpen(false);
  };

  if (variant === "product") {
    return (
      <>
        <nav
          className={`fixed top-0 left-0 right-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-2xl transition-shadow duration-300 ${
            scrolled ? "shadow-md" : "shadow-sm"
          }`}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="flex items-center justify-between py-3">
              {/* Logo - Mobile */}
              <Link
                to="/"
                className="md:hidden font-serif text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
              >
                Trustable
              </Link>

              {/* Tabs - Desktop */}
              <div className="hidden md:flex items-center gap-2 overflow-x-auto scrollbar-hide">
                <Link
                  to="/"
                  className="font-serif text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mr-4"
                >
                  Trustable
                </Link>
                {tabs.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => handleTabClick(t.id)}
                    className={`relative whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
                      activeTab === t.id
                        ? "bg-gradient-to-r from-primary to-primary/90 text-primary-foreground shadow-lg shadow-primary/25 scale-105"
                        : "text-muted-foreground hover:bg-muted/80 hover:text-foreground hover:scale-105"
                    }`}
                  >
                    {t.label}
                    {activeTab === t.id && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 -z-10 rounded-full bg-primary"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Right side */}
              <div className="flex items-center gap-3">
                {/* Download Button - Desktop */}
                {onDownload && (
                  <button
                    onClick={onDownload}
                    className="hidden sm:inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2.5 text-sm font-semibold text-background transition-all hover:scale-105 hover:shadow-lg"
                  >
                    <Download className="h-4 w-4" /> Lab Report
                  </button>
                )}

                {/* Hamburger Menu - Mobile */}
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="md:hidden p-2 rounded-lg hover:bg-muted/80 transition-colors"
                  aria-label="Toggle menu"
                >
                  {isOpen ? (
                    <X className="h-6 w-6 text-foreground" />
                  ) : (
                    <Menu className="h-6 w-6 text-foreground" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm md:hidden"
                onClick={() => setIsOpen(false)}
              />

              {/* Menu Panel */}
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="fixed top-0 right-0 bottom-0 z-50 w-[280px] bg-background border-l border-border shadow-2xl md:hidden"
              >
                <div className="flex flex-col h-full">
                  {/* Menu Header */}
                  <div className="flex items-center justify-between p-4 border-b border-border">
                    <span className="font-serif text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      {productName || "Menu"}
                    </span>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="p-2 rounded-lg hover:bg-muted/80 transition-colors"
                    >
                      <X className="h-5 w-5 text-foreground" />
                    </button>
                  </div>

                  {/* Tabs */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-2">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3 px-2">
                      Sections
                    </p>
                    {tabs.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => handleTabClick(t.id)}
                        className={`w-full flex items-center gap-3 rounded-xl px-4 py-3 text-left transition-all ${
                          activeTab === t.id
                            ? "bg-primary text-primary-foreground shadow-md"
                            : "text-foreground hover:bg-muted"
                        }`}
                      >
                        <FlaskConical className="h-4 w-4" />
                        <span className="font-medium">{t.label}</span>
                      </button>
                    ))}

                    <div className="my-4 border-t border-border" />

                    <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3 px-2">
                      Navigate
                    </p>
                    <Link
                      to="/"
                      className="w-full flex items-center gap-3 rounded-xl px-4 py-3 text-foreground hover:bg-muted transition-all"
                      onClick={() => setIsOpen(false)}
                    >
                      <Home className="h-4 w-4" />
                      <span className="font-medium">Home</span>
                    </Link>
                  </div>

                  {/* Download Button - Mobile */}
                  {onDownload && (
                    <div className="p-4 border-t border-border">
                      <button
                        onClick={() => {
                          onDownload();
                          setIsOpen(false);
                        }}
                        className="w-full flex items-center justify-center gap-2 rounded-xl bg-foreground px-4 py-3 text-sm font-semibold text-background transition-all hover:opacity-90"
                      >
                        <Download className="h-4 w-4" /> Download Lab Report
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </>
    );
  }

  // Home variant
  return (
    <>
      <header
        className={`relative z-10 border-b border-border/50 bg-background/80 backdrop-blur-xl transition-shadow duration-300 ${
          scrolled ? "shadow-md" : ""
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-4 sm:py-6">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="font-serif text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
            >
              Trustable
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              <Link
                to="/hazelnut-chocolate"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Products
              </Link>
              <a
                href="#about"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                About
              </a>
            </div>

            {/* Hamburger Menu - Mobile */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-muted/80 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="h-6 w-6 text-foreground" />
              ) : (
                <Menu className="h-6 w-6 text-foreground" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm md:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[280px] bg-background border-l border-border shadow-2xl md:hidden"
            >
              <div className="flex flex-col h-full">
                {/* Menu Header */}
                <div className="flex items-center justify-between p-4 border-b border-border">
                  <span className="font-serif text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    Menu
                  </span>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-lg hover:bg-muted/80 transition-colors"
                  >
                    <X className="h-5 w-5 text-foreground" />
                  </button>
                </div>

                {/* Navigation Links */}
                <div className="flex-1 overflow-y-auto p-4 space-y-2">
                  {NAV_LINKS.map((link) =>
                    link.isAnchor ? (
                      <a
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="w-full flex items-center gap-3 rounded-xl px-4 py-3 text-foreground hover:bg-muted transition-all"
                      >
                        <link.icon className="h-5 w-5" />
                        <span className="font-medium">{link.label}</span>
                      </a>
                    ) : (
                      <Link
                        key={link.href}
                        to={link.href}
                        onClick={() => setIsOpen(false)}
                        className="w-full flex items-center gap-3 rounded-xl px-4 py-3 text-foreground hover:bg-muted transition-all"
                      >
                        <link.icon className="h-5 w-5" />
                        <span className="font-medium">{link.label}</span>
                      </Link>
                    )
                  )}

                  <div className="my-4 border-t border-border" />

                  <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3 px-2">
                    Products
                  </p>
                  <Link
                    to="/hazelnut-chocolate"
                    onClick={() => setIsOpen(false)}
                    className="w-full flex items-center gap-3 rounded-xl px-4 py-3 text-foreground hover:bg-muted transition-all"
                  >
                    <Package className="h-5 w-5" />
                    <span className="font-medium">Hazelnut Chocolate</span>
                  </Link>
                  <Link
                    to="/protien-herbs"
                    onClick={() => setIsOpen(false)}
                    className="w-full flex items-center gap-3 rounded-xl px-4 py-3 text-foreground hover:bg-muted transition-all"
                  >
                    <Package className="h-5 w-5" />
                    <span className="font-medium">Protein & Herbs</span>
                  </Link>
                  <Link
                    to="/hazelnut-chocolate"
                    onClick={() => setIsOpen(false)}
                    className="w-full flex items-center gap-3 rounded-xl px-4 py-3 text-foreground hover:bg-muted transition-all"
                  >
                    <Package className="h-5 w-5" />
                    <span className="font-medium">Choco-Hazel Whey</span>
                  </Link>
                  <Link
                    to="/natural-strawberry"
                    onClick={() => setIsOpen(false)}
                    className="w-full flex items-center gap-3 rounded-xl px-4 py-3 text-foreground hover:bg-muted transition-all"
                  >
                    <Package className="h-5 w-5" />
                    <span className="font-medium">Natural Strawberry</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
