import React, { useState } from 'react';
import { Navbar, Nav, NavItem, NavbarBrand, Collapse, NavbarToggler } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { Autocomplete, TextField, Switch, Tooltip } from '@mui/material';

function Header({ list, isDark, setIsDark, setIsFiltered, setfilteredResult }) {

    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState(null);
    const [checked, setChecked] = useState(false);

    function toggleNav() {
        setIsOpen(!isOpen);
    }

    const handleChange = (value) => {
        setSearch(value);
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
        setChecked(!checked);
        setIsDark(!isDark);
    }

    return (
        <div>
            <Navbar className={isDark ? "navbar-dark" : "navbar-light"} color={isDark ? "dark" : "light"} {...(isDark) ? "dark" : "light"} expand="md">
                <NavbarBrand className='me-auto' href="/">ToDo</NavbarBrand>
                <NavbarToggler className='mb-2 me-0' onClick={() => toggleNav()} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className='ms-auto' navbar>
                        <NavItem>
                            <Tooltip title="Dark Mode">
                                <Switch checked={checked} onClick={toggleDarkMode} />
                            </Tooltip>
                        </NavItem>
                        <NavItem>
                            <NavLink className="nav-link" to="/home">
                                <span className="fa fa-home fa-lg"></span> Home
                            </NavLink>
                        </NavItem>

                        <NavItem>
                            <NavLink className="nav-link" to="/aboutus">
                                <span className="fa fa-info fa-lg"></span> About us
                            </NavLink>
                        </NavItem>

                        <NavItem>
                            <NavLink className="nav-link" to="/details">
                                <span className="fa fa-list fa-lg"></span> Details
                            </NavLink>
                        </NavItem>

                        <NavItem>
                            <NavLink className="nav-link" to="/contactus">
                                <span className="fa fa-address-card fa-lg"></span> Contact us
                            </NavLink>
                        </NavItem>

                        <Autocomplete
                            disablePortal
                            id='search'
                            value={search}
                            onChange={(event, newValue) => {
                                handleChange(newValue);
                            }}
                            options={(list?.length > 0) ? list : []}
                            sx={{ width: 250, borderRadius: '10px' }}
                            getOptionLabel={option => option.name}
                            renderInput={(params) => <TextField
                                {...params}
                                label="Search"
                                size='small'
                                variant="filled"
                            />}
                        >
                        </Autocomplete>
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
}

export default Header;
