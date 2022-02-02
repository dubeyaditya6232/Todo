import React, { useContext, useState, useEffect } from 'react';
import { Navbar, Nav, NavItem, NavbarBrand, Collapse, NavbarToggler } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { Autocomplete, TextField, Switch, Tooltip, Box } from '@mui/material';
import { useLocation } from 'react-router-dom'
import { navBarSearch, useAuth } from '../../useContext';

function Header({ list, isDark, setIsDark, setIsFiltered, setfilteredResult }) {

    const [isOpen, setIsOpen] = useState(false);
    const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

    const navSearch = useContext(navBarSearch);
    const { user } = useAuth();

    const location = useLocation();

    useEffect(() => {

        const handleResize = () => {
            setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        }

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [])

    function toggleNav() {
        setIsOpen(!isOpen);
    }

    const handleChange = (value) => {
        navSearch.setSearch(value);
        if (value !== null) {
            const filteredResult = list.filter(item => item.name.localeCompare(value.name) === 0);
            setfilteredResult(filteredResult);
            setIsFiltered(true);
        } else {
            setIsFiltered(false);
            setfilteredResult([]);
        }
    }

    const toggleDarkMode = () => {
        setIsDark(!isDark);
    }

    return (
        <div>
            <Navbar className={isDark ? "navbar-dark" : "navbar-light"} color={isDark ? "dark" : "light"} expand="md">
                {/* <Navbar className={isDark ? "navbar-dark" : "navbar-light"} color={isDark ? "dark" : "light"} {...(isDark) ? "dark" : "light"} expand="md"> */}
                <NavbarBrand className='me-auto' href="/">ToDo</NavbarBrand>
                <NavbarToggler className='mb-2 me-0' onClick={() => toggleNav()} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className='ms-auto' navbar>
                        <NavItem>
                            <Box sx={{ flex: 1 }}>
                                {(windowSize.width <= 768) ? "Dark Mode" : ""}
                                <Tooltip title="Dark Mode">
                                    <Switch checked={isDark} onClick={toggleDarkMode} />
                                </Tooltip>
                            </Box>
                        </NavItem>
                        <NavItem>
                            <NavLink className="nav-link" to="/home">
                                <span className="fa fa-home fa-lg"></span> Home
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <Box>
                                <NavLink className="nav-link" to="/me">
                                    {(windowSize.width <= 768) ? "Profile  " : ""}
                                    <img src={user.photoURL} alt="profile" className="round_image rounded-circle" />
                                </NavLink>
                            </Box>
                        </NavItem>
                        {(location.pathname === "/me") ? (" ") : (
                            <Autocomplete
                                disablePortal
                                id='search'
                                value={navSearch.search}
                                onChange={(event, newValue) => {
                                    handleChange(newValue);
                                }}
                                options={(list?.length > 0) ? list : []}
                                sx={{ width: 250, borderRadius: '10px' }}
                                getOptionLabel={option => `${option.name}`}
                                renderInput={(params) => <TextField
                                    {...params}
                                    label="Search"
                                    size='small'
                                    variant="filled"
                                />}
                            >
                            </Autocomplete>
                        )}
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
}

export default Header;
