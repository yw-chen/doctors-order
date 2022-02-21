import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { DialogContentText, List, ListItemButton, ListItemText } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

function FormDialog() {
    const [showUpdate, setShowUpdate] = useState(false);
    const [show, setShow] = useState(false);
    const [dialogMessage, setDialogMessage] = useState("");
    const [patients, setPaitents] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [selectedPatientName, setSelectedPatientName] = useState('');
    const [open, setOpen] = useState(false);    

    const fetchPatients = async () => {
        const res = await axios.get("http://localhost:3000/api/patients");
        setPaitents(res.data.data);
    }     

    const handleCreateNewOrder = () => {
        setDialogMessage("Please create an order for:");
        document.getElementById("message").value = "";
        setShow(true);
        setShowUpdate(false);
    };

    const handleOrderCancel = () => {
        handleClose();
    };

    const handleOrderSave = () => {
        const getOrderLastId = () => {
            axios.get("http://localhost:3000/api/table/orders").then((res) => {
                createOrder(res.data.data.LastId + 1);
            });

        }

        const createOrder = (id) => {
            axios.post("http://localhost:3000/api/order", {
                Id: id,
                Message: document.getElementById("message").value
            }).then(() =>{
                updateTable(id);
            });
        }       

        const updatePatient = (id) => {
            axios.put("http://localhost:3000/api/patient/" + patients.at(selectedIndex).Id, {
                OrderId: id
            }).then(() =>{
                fetchPatients();
            }).catch(error => console.log(error));
        }

        const updateTable = (id) => {
            axios.put("http://localhost:3000/api/table/orders", {
                LastId: id
            }).then(() =>{
                updatePatient(id);
            });
        }

        getOrderLastId();
        handleClose();
    };

    const handleOrderUpdate = () => {
        const updateOrder = () => {
            axios.put("http://localhost:3000/api/order/" + patients.at(selectedIndex).OrderId, {
                Message: document.getElementById("message").value
            });
        }

        updateOrder();
        handleClose();
    };

    const handleClose = () => {
        setOpen(false);
        setShow(false);
        setShowUpdate(false);
    };

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
        setSelectedPatientName(patients.at(index).Name)
        setOpen(true);

        const fetchOrder = async () => {
            await axios.get("http://localhost:3000/api/order/" + patients.at(index).OrderId).then((res) => {
                document.getElementById("message").value = res.data.data.Message;
            }).catch((err) => { });
        }
        if (patients.at(index).OrderId > 0) {
            fetchOrder();
            setDialogMessage("This is current order of:");
            setShowUpdate(true);
        } else {
            setDialogMessage("Please create an order for:");
            setShow(true);
        }
    };

    useEffect(() => {           
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
                <DialogContent></DialogContent>
                <DialogContentText sx={{display:'block', margin:'auto'}}>{dialogMessage}</DialogContentText>
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
                    {showUpdate && <Button onClick={handleOrderCancel}>Close</Button>}
                    {showUpdate && <Button onClick={handleOrderUpdate}>Update</Button>}
                    {show && <Button onClick={handleOrderCancel}>Cancel</Button>}
                    {show && <Button onClick={handleOrderSave}>Save</Button>}
                </DialogActions>
            </Dialog>
        </div>
    )
}
export default FormDialog;
