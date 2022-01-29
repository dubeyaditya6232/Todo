import React, { useState } from 'react';
import CardDisplay from './CardDisplay';
import ListDisplay from './ListDisplay';
import LoadingComponent from '../Loading';
import MenuIcon from '@mui/icons-material/Menu';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Typography, Box } from '@mui/material';

import { deleteDoc, doc } from 'firebase/firestore'
import {db} from '../../firebase/firebase';

function ShowData({ list,setId, setState, state, isFiltered, filteredResult, setfilteredResult, loading }) {

    const [isOpen, setIsOpen] = useState(false);
    const [componentType, setComponentType] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);

    const result = (isFiltered) ? filteredResult : list;

    function handleClick(item) {
        setState({ ...state, name: item.name, description: item.description, priority: item.priority });
        setId(item.id);
    }

    function menuClick(e) {
        setIsOpen(!isOpen);
        setAnchorEl(e.currentTarget)
    }

    function menuClose() {
        setIsOpen(false);
        setAnchorEl(null);
    }

    function handleClose(e) {
        setAnchorEl(null);
        setIsOpen(!isOpen);
        setComponentType(e.currentTarget.id);
    }

    const deleteData = async (items, id) => {
        const docRef = doc(db, "Task", id);
        await deleteDoc(docRef)
            .then(() => {
                items.splice(items.indexOf(id), 1);
                setfilteredResult(items);
            })
            .catch(err => { console.log(err) })
    }

    function handleDelete(item) {
        let items = [...result];
        deleteData(items, item.id);
    }

    return (
        <div className="container displayData">
            <Box display="flex">
                <Typography
                    sx={{ flex: 1 }}
                    variant='h5'
                    component="h2">
                    Show Task
                </Typography>
                <Tooltip title='Menu'>
                    <MenuIcon
                        onClick={(e) => { menuClick(e) }}
                    />
                </Tooltip>
                <Menu
                    anchorEl={anchorEl}
                    id="basic-menu"
                    open={isOpen}
                    onClose={() => menuClose()}
                >
                    <MenuItem
                        onClick={(e) => handleClose(e)}
                        id="list"
                    >List</MenuItem>
                    <MenuItem
                        onClick={(e) => handleClose(e)}
                        id="card"
                    >card</MenuItem>
                </Menu>
            </Box>
            <hr className='dispHrLine' />
            {loading ? (<LoadingComponent />) : (
                (componentType === 'list') ? (
                    <ListDisplay
                        list={result}
                        handleClick={handleClick}
                        handleDelete={handleDelete}
                    />
                ) : (
                    <CardDisplay
                        list={result}
                        handleClick={handleClick}
                        handleDelete={handleDelete}
                    />
                )
            )}
        </div>
    );
}
export default ShowData;