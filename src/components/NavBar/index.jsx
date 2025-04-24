import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import {
    AppBar,
    Container,
    Toolbar,
    Typography,
    Box,
    IconButton,
    Menu,
    MenuItem,
    Tooltip,
    Avatar,
    Button,
} from "@mui/material";
import ExploreIcon from "@mui/icons-material/Explore";
import MenuIcon from "@mui/icons-material/Menu";

const usernameGuest = "guest";

// attribute "ref" is used to highlight the corresponding nav button when refreshing the page
// or accessing deeper into the routes
const pageLinks = [
    {
        name: "home",
        to: "",
        ref: "",
    },
    {
        name: "itinerary",
        to: "/itinerary",
        ref: "itinerary",
    },
    {
        name: "my",
        to: "/my",
        ref: "my",
    }
];

const NavBar = () => {
    const { user, isAuthenticated, loginWithRedirect, logout, getAccessTokenSilently } = useAuth0();
    const [anchorElNav, setAnchorElNav] = useState(null); // mobile view
    const [anchorElUser, setAnchorElUser] = useState(null); // all views
    const [onPage, setOnPage] = useState(null); // all views - highlight the nav button of current page
    let navigate = useNavigate();

    useEffect(() => {
        handleCloseNavMenu();
    }, [onPage]);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleNavigateTo = (page) => {
        navigate(page.to);
        setOnPage(page.name);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const isOnPage = (ref) => {
        let url = window.location.pathname;
        let path = url.split('/');
        return path[1] === ref;
    }

    const settings = [
        {
            name: "Profile",
            onClick: handleCloseUserMenu,
        },
        {
            name: "Account",
            onClick: handleCloseUserMenu,
        },
        {
            name: "Dashboard",
            onClick: handleCloseUserMenu,
        },
        {
            name: "Logout",
            onClick: logout,
        },
    ];

    let username = isAuthenticated ? user?.name : usernameGuest;

    return (
        <AppBar id="app-bar" color="primary" position="sticky" sx={{top: 0}}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    {/* web view - logo */}
                    <ExploreIcon
                        sx={{
                            display: { xs: "none", md: "flex", scale: "1.5" },
                            mr: 3,
                        }}
                    />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: "none", md: "flex" },
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "inherit",
                            textDecoration: "none",
                        }}
                    >
                        TRAVEL-PLANNER
                    </Typography>

                    {/* mobile view - page nav */}
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "flex", md: "none" },
                        }}
                    >
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{ display: { xs: "block", md: "none" } }}
                        >
                            {pageLinks.map((page) => (
                                <MenuItem
                                    key={page.name}
                                    onClick={() => handleNavigateTo(page)}
                                >
                                    <Typography sx={{ textAlign: "center" }}>
                                        {page.name.toUpperCase()}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <ExploreIcon
                        sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
                    />

                    {/* mobile view - logo */}
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: "flex", md: "none" },
                            flexGrow: 1,
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "inherit",
                            textDecoration: "none",
                        }}
                    >
                        TRAVEL-PLANNER
                    </Typography>

                    {/* web view - page nav */}
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "none", md: "flex" },
                        }}
                    >
                        {pageLinks.map((page) => (
                            <Button
                                key={page.name}
                                onClick={() => handleNavigateTo(page)}
                                sx={{
                                    my: 2,
                                    color: isOnPage(page.ref) ? "white" : "#bbbbbb",
                                    fontWeight: "bold",
                                    display: "block",
                                    letterSpacing: ".1rem",
                                    textDecorationLine: isOnPage(page.ref) ? "overline" : "none",
                                    textDecorationThickness: 2,
                                    transition: "color .2s ease-in",
                                    ":hover": {
                                        color: "white",
                                        textDecorationLine: isOnPage(page.ref) ? "overline" : "none",
                                        textDecorationThickness: 2,
                                    }
                                }}
                            >
                                {page.name}
                            </Button>
                        ))}
                    </Box>

                    {!isAuthenticated && (
                        <Box>
                            <Button
                                onClick={() => loginWithRedirect({
                                    authorizationParams: {
                                        audience: process.env.REACT_APP_AUTH0_AUDIENCE,
                                    },
                                })}
                                sx={{ my: 2, color: "white" }}
                            >
                                Login
                            </Button>
                        </Box>
                    )}

                    {isAuthenticated && (
                        <>
                            {/* mobile view - page nav */}
                            <Box sx={{ display: { xs: "none", md: "block" } }}>
                                <Typography
                                    sx={{
                                        mr: 2,
                                        flexGrow: 2,
                                        fontWeight: 700,
                                        color: "inherit",
                                        textDecoration: "none",
                                    }}
                                >
                                    {username}
                                </Typography>
                            </Box>
                            {/* all view - avatar */}
                            <Box sx={{ flexGrow: 0, display: "block" }}>
                                <Tooltip title="Open settings">
                                    <IconButton
                                        onClick={handleOpenUserMenu}
                                        sx={{ p: 0 }}
                                    >
                                        <Avatar
                                            alt={username}
                                            src="/static/images/avatar/2.jpg" // TODO - change this
                                        />
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: "45px" }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: "top",
                                        horizontal: "right",
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: "top",
                                        horizontal: "right",
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    {settings.map((setting) => (
                                        <MenuItem
                                            key={setting.name}
                                            onClick={setting.onClick}
                                        >
                                            <Typography
                                                sx={{ textAlign: "center" }}
                                            >
                                                {setting.name}
                                            </Typography>
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </Box>
                        </>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default NavBar;
