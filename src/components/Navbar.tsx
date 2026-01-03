import { FunctionComponent, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/navbar.css";
import lightlogo from "../media/BUZZINESS BLACK.svg";
import darklogo from "../media/BUZZINESS WHITE.svg";

interface AuthUser {
    _id: string;
    isAdmin: boolean;
    isBusiness: boolean;
    image?: string;
}

interface NavbarProps {
    theme: "light" | "dark";
    toggleTheme: () => void;
}

const Navbar: FunctionComponent<NavbarProps> = ({ theme, toggleTheme }) => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const searchRef = useRef<HTMLInputElement>(null);

    const getAuthUser = (): AuthUser | null => {
        const token = localStorage.getItem("token");
        if (!token) return null;

        try {
            return JSON.parse(atob(token.split(".")[1]));
        } catch {
            return null;
        }
    };

    const authUser = getAuthUser();

    const logout = () => {
        localStorage.removeItem("token");
        setIsMenuOpen(false);
        navigate("/login");
    };

    const goToAddBiz = () => {
        setIsMenuOpen(false);
        navigate("/add-bizcard");
    };

    return (
        <>
            <nav className="navbar">
                {/* LEFT */}
                <div className="nav-left">
                    <img
                        className="logo"
                        src={theme === "light" ? lightlogo : darklogo}
                        alt="Buzziness logo"
                        onClick={() => navigate("/")}
                    />

                    <div className="desktop-only nav-links">
                        <NavLink to="/">Home</NavLink>
                        <NavLink to="/about">About</NavLink>
                        {authUser?.isAdmin && (
                            <NavLink to="/admin">Admin Panel</NavLink>
                        )}
                    </div>

                    <form
                        className="nav-search"
                        onSubmit={(e) => {
                            e.preventDefault();
                            const query = (e.currentTarget.elements.namedItem(
                                "q"
                            ) as HTMLInputElement).value;
                            navigate(`/?q=${encodeURIComponent(query)}`);
                        }}
                    >
                        <input
                            ref={searchRef}
                            type="search"
                            name="q"
                            placeholder="Search cards..."
                        />
                    </form>
                </div>

                {/* RIGHT */}
                <div className="nav-right">
                    <div className="desktop-only">
                        {(authUser?.isBusiness || authUser?.isAdmin) && (
                            <button
                                className="add-biz-btn"
                                onClick={goToAddBiz}
                            >
                                + Add Business
                            </button>
                        )}

                        {!authUser && (
                            <>
                                <NavLink to="/login">Login</NavLink>
                                <NavLink to="/register">Register</NavLink>
                            </>
                        )}

                        <button
                            className="theme-toggle"
                            onClick={toggleTheme}
                        >
                            {theme === "light" ? "🌙" : "☀️"}
                        </button>

                        {authUser && (
                            <>
                                <button
                                    className="avatar-btn"
                                    onClick={() => navigate("/myprofile")}
                                >
                                    <img
                                        className="profilePic"
                                        src={
                                            authUser.image ||
                                            "https://i.sstatic.net/34AD2.jpg"
                                        }
                                        alt="My profile"
                                    />
                                </button>

                                <button
                                    className="logout-btn"
                                    onClick={logout}
                                >
                                    Logout
                                </button>

                            </>
                        )}
                    </div>

                    {/* MOBILE ICONS */}
                    <div className="mobile-only mobile-icons">
                        <button
                            className="icon-btn"
                            onClick={() => searchRef.current?.focus()}
                        >
                            🔍
                        </button>

                        <button
                            className="icon-btn"
                            onClick={() =>
                                setIsMenuOpen((prev) => !prev)
                            }
                        >
                            {isMenuOpen ? "✖" : "☰"}
                        </button>
                    </div>
                </div>
            </nav>

            {/* MOBILE MENU */}
            <div className={`mobile-menu ${isMenuOpen ? "open" : ""}`}>
                <NavLink to="/" onClick={() => setIsMenuOpen(false)}>
                    Home
                </NavLink>
                <NavLink to="/about" onClick={() => setIsMenuOpen(false)}>
                    About
                </NavLink>

                {(authUser?.isBusiness || authUser?.isAdmin) && (
                    <button
                        className="mobile-add-biz"
                        onClick={goToAddBiz}
                    >
                        + Add Business
                    </button>
                )}

                {authUser?.isAdmin && (
                    <NavLink
                        to="/admin"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Admin Panel
                    </NavLink>
                )}

                {!authUser && (
                    <>
                        <NavLink
                            to="/login"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Login
                        </NavLink>
                        <NavLink
                            to="/register"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Register
                        </NavLink>
                    </>
                )}

                {authUser && (
                    <>
                        <NavLink
                            to="/myprofile"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Profile
                        </NavLink>
                        <button
                            className="logout-btn"
                            onClick={logout}
                        >
                            Logout
                        </button>
                    </>
                )}
            </div>
        </>
    );
};

export default Navbar;
