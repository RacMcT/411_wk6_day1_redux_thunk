import axios from 'axios';
import React, { useState, useContext, createContext } from 'react';
import { Button, Table, TableHead, TableBody, TableRow, TableCell, Container, Menu, MenuItem } from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';

const Import = (props) => {
    let [cars, setCars] = useState([]);    

    async function getMakes() {
        let url = 'https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json';
        let res = await axios.get(url);
        
        setCars(res.data.Results)
    };    

    let [anchor, setAnchor] = useState(null);
    let [idx, setIdx] = useState(null);

    let onClick = (e, idx) => {
        setAnchor(e.currentTarget);
        setIdx(idx);
    };

    let onClose = () => {
        setAnchor(null);
        setIdx(null);
    };

    let deleteCar = () => {
        cars.splice(idx, 1)
        setCars([...cars])
        onClose();
    };

    return (
        <Container maxWidth="md" style={{ margin: '50px auto' }}>
            <Button onClick={getMakes} variant="contained" color="primary">Import</Button>
            <h2>Count: {cars.length}</h2>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell>Make</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cars.map((make, idx) => {
                        return (
                            <TableRow key={idx}>
                                <TableCell>{make.MakeId}</TableCell>
                                <TableCell>{make.MakeName}</TableCell>
                                <TableCell>
                                    <MoreVert onClick={(e) => onClick(e, idx)}></MoreVert></TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
            <Menu id="delMenu" anchorEl={anchor} keepMounted open={Boolean(anchor)} onClose={onClose}            >
                <MenuItem onClick={deleteCar}>Delete</MenuItem>
            </Menu>
        </Container>
    )
};
export default Import