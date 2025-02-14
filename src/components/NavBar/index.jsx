import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
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

const pageLinks = [
    {
        name: "HOME",
        to: "",
    },
];

const NavBar = () => {
    const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const settings = [{
        name: "Profile",
        onClick: handleCloseUserMenu,
    }, {
        name: "Account",
        onClick: handleCloseUserMenu,
    }, {
        name: "Dashboard",
        onClick: handleCloseUserMenu,
    }, {
        name: "Logout",
        onClick: logout,
    }
    ];

    let username = isAuthenticated ? user?.name : usernameGuest;

    return (
        <AppBar color="primary" position="sticky">
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
                        TRAVEL-PLAN
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
                                    onClick={handleCloseNavMenu}    // TODO - navTo page
                                >
                                    <Typography sx={{ textAlign: "center" }}>
                                        {page.name}
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
                        TRAVEL-PLAN
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
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: "white", display: "block" }}
                            >
                                {page.name}
                            </Button>
                        ))}
                    </Box>

                    {!isAuthenticated && (
                        <Box>
                            <Button 
                                onClick={loginWithRedirect}
                                sx={{ my: 2, color: "white" }}
                            >
                                Login
                            </Button>
                        </Box>
                    )}

                    {/* all view - avatar */}
                    {isAuthenticated && (
                        <>
                            <Box>
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
