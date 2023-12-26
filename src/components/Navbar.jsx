import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import {NavLink, useNavigate} from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import Avatar from "@mui/material/Avatar";
import { useState } from "react";
import { useEffect } from "react";

const pages = [
    { path: "/", name: "Home" },
    { path: "/about", name: "About" },
];
const settings = [
    { path: "/profile", name: "Profile" },
    { path: "/logout", name: "Logout" },
];

export const Navbar = () => {
    const { user, logoutUser } = useContext(UserContext);
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [navPages, setNavPages] = useState(pages);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) setNavPages([...pages, { path: "/create", name: "Create Blog" }]);
        else setNavPages([...pages]);
    }, [user]);

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
    //console.log(user);
    return (
        <AppBar
            position="fixed"
            sx={{
                backgroundImage: "linear-gradient(to top, #a3bded 0%, #6991c7 100%)",
            }}
        >
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: {xs: "none", md: "flex"},
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "inherit",
                            textDecoration: "none",
                        }}
                    >
                        <img className='vinyl-image' src='/Vinyl.png' alt='Vinyl Image'/>
                    </Typography>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: {xs: "flex", md: "none"},
                            flexGrow: 1,
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "inherit",
                            textDecoration: "none",
                        }}
                    >
                        <img className='vinyl-image' src='/Vinyl.png' alt='Vinyl Image'/>
                    </Typography>
                    <Box sx={{flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                        <IconButton
                            size="small"
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
                            sx={{
                                display: { xs: "block", md: "none" },
                            }}
                        >
                            {navPages.map((obj) => (
                                <NavLink
                                    key={obj.name}
                                    to={obj.path}
                                    className={({ isActive }) => (isActive ? "active" : "")}
                                >
                                    <MenuItem onClick={handleCloseNavMenu}>
                                        <Typography textAlign="center">{obj.name}</Typography>
                                    </MenuItem>
                                </NavLink>
                            ))}
                        </Menu>
                    </Box>
                    <Box sx={{flexGrow: 1, display: {xs: "none", md: "flex"}}}>
                    {navPages.map((obj) => (
                            <NavLink
                                key={obj.name}
                                to={obj.path}
                                className={({ isActive }) => (isActive ? "active" : "")}
                            >
                                <Button
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: "white", display: "block" }}
                                >
                                    {obj.name}
                                </Button>
                            </NavLink>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        {!user ? (
                            <>
                                <IconButton sx={{ p: 0 }}>
                                    <NavLink
                                        to="/signin"
                                        className={({ isActive }) => (isActive ? "active" : "")}
                                    >
                                        <Typography
                                            textAlign="center"
                                            sx={{ color: "white", padding: "10px" }}
                                        >
                                            Sign In
                                        </Typography>
                                    </NavLink>
                                </IconButton>
                                <IconButton sx={{ p: 0 }}>
                                    <NavLink
                                        to="/signup"
                                        className={({ isActive }) => (isActive ? "active" : "")}
                                    >
                                        <Typography
                                            textAlign="center"
                                            sx={{ color: "white", padding: "10px" }}
                                        >
                                            Sign Up
                                        </Typography>
                                    </NavLink>
                                </IconButton>
                            </>
                        ) : (
                            <Box sx={{ flexGrow: 0 }}>

                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar
                                        alt="Remy Sharp"
                                        src="/static/images/avatar/2.jpg"
                                    />
                                </IconButton>
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
                                        <MenuItem key={setting.name} onClick={handleCloseUserMenu}>
                                            <Typography textAlign="center"
                                                        onClick={()=> setting.name == 'Logout' ? logoutUser() : navigate(setting.path)}
                                            >{setting.name}
                                            </Typography>
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </Box>
                        )}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};