import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { List, ListItemButton, ListItemText } from '@mui/material';

function PatientList() {
    const [patients, setPaitents] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [open, setOpen] = useState(false);

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
        setOpen(true);
        console.log(open);
    };

    useEffect(() => {
        const fetchPatients = async () => {
            const res = await axios.get("http://localhost:3000/api/patients");
            setPaitents(res.data.data);
            console.log('refreshed')
        }
        fetchPatients();
    }, [])

    return (
        <div>
            <List component="nav" sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', margin: 'auto' }}>
                {patients.map((item, index) => {
                    return (
                        <React.Fragment key={index}>
                            <ListItemButton
                                selected={selectedIndex === index}
                                onClick={(event) => handleListItemClick(event, 0)}
                            >
                                <ListItemText primary={item.Name} secondary={item.Id} />
                            </ListItemButton>
                        </React.Fragment>
                    )
                })}
            </List>
        </div>
    )
}

export default PatientList;