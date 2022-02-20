import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { List, ListItemButton, ListItemText } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

function FormDialog() {
    const [textDisabled, settextDisabled] = useState(true);
    const [show, setShow] = useState(false);
    const [order, setOrder] = useState();
    const [patients, setPaitents] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [selectedPatientName, setSelectedPatientName] = useState('');
    const [open, setOpen] = useState(false);

    const handleCreateNewOrder = () => {
        settextDisabled(false);
        setShow(true);
    };

    const handleOrderCancel = () => {
        setOrder();
        settextDisabled(true);
        setShow(false);
    };

    const handleOrderSave = () => {
        const createOrder = async () => {
            await axios.post("http://localhost:3000/api/order",{
                Id:patients.at(selectedIndex).Id,
                Message:document.getElementById("message").value
            });
        }

        const updateOrder = async () => {
            await axios.put("http://localhost:3000/api/order/"+patients.at(selectedIndex).OrderId,{
                Message:document.getElementById("message").value
            });
        }

        if(order){
            updateOrder();
        }else{
            createOrder();
        }
        handleClose();
    };

    const handleClose = () => {
        setOpen(false);
        settextDisabled(true);
        setShow(false);
    };

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
        setSelectedPatientName(patients.at(index).Name)
        setOpen(true);

        const fetchOrder = async ()=>{
            await axios.get("http://localhost:3000/api/order/" + patients.at(index).OrderId).then((res) => {
                setOrder(res.data.data); 
                document.getElementById("message").value = res.data.data.Message;
            }).catch((err)=>{});                     
        }
        fetchOrder();
    };

    useEffect(() => {
        const fetchPatients = async () => {
            const res = await axios.get("http://localhost:3000/api/patients");
            setPaitents(res.data.data);
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
                                onClick={(event) => handleListItemClick(event, index)}
                            >
                                <ListItemText primary={item.Name} secondary={item.Id} />
                            </ListItemButton>
                        </React.Fragment>
                    )
                })}
            </List>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                    <Button onClick={handleCreateNewOrder} sx={{ maxWidth: 200, display: 'block', margin: 'auto', float: 'right' }}>新增Order</Button>
                </DialogTitle>
                <DialogContent>
                    <TextField
                        disabled
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Patient Name:"
                        type="string"
                        fullWidth
                        value={selectedPatientName}
                        variant="standard"
                    />
                    <TextField
                        disabled = {textDisabled}
                        autoFocus
                        margin="dense"
                        id="message"
                        label="Doctors Order"
                        type="string"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    {show && <Button onClick={handleOrderCancel} disabled={textDisabled}>Cancel</Button>}
                    {show && <Button onClick={handleOrderSave}>Save</Button>}
                </DialogActions>
            </Dialog>
        </div>
    )
}
export default FormDialog;
