import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Slide from '@mui/material/Slide';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';

const UsersModalApproval = (props) => {
  const { open, handleClose } = props;
  const [textValue, setTextValue] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    department: '',
    designation: '',
    password: '',
  });

  const handleChange = () => { };

  const modalCloseHandler = () => {
    handleClose(false);
  };

  const onInputChangeHandler = (e) => {
    // console.log(e.target.name);
    // console.log(e.target.value);
    setTextValue(e.target.value);
    const myObj = {};
    myObj[e.target.name] = e.target.value;
  };

  return (
    <>
      <Dialog
        open={open}
        fullWidth
        maxWidth="sm"
        onClose={() => {
          handleClose(false);
        }}
        aria-labelledby="alertmodalCloseHandler-dialog-title"
        aria-describedby="alert-dialog-description"
        BackdropProps={{ style: { background: 'rgba(0, 0, 0, 0.5)' } }}
      >
        <div>
          <DialogTitle>Approval List</DialogTitle>
          <DialogContent>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoFocus
                    margin="dense"
                    variant="standard"
                    fullWidth
                    name="FirstName"
                    value={textValue.firstName}
                    label="First Name"
                    onChange={onInputChangeHandler}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    autoFocus
                    margin="dense"
                    variant="standard"
                    fullWidth
                    name="LastName"
                    value={textValue.lastName}
                    label="Last Name"
                    onChange={onInputChangeHandler}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    autoFocus
                    margin="dense"
                    variant="standard"
                    label="Email"
                    fullWidth
                    value={textValue.email}
                    onChange={onInputChangeHandler}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    autoFocus
                    type="number"
                    margin="dense"
                    variant="standard"
                    label="Phone Number"
                    fullWidth
                    value={textValue.phoneNumber}
                    onChange={onInputChangeHandler}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControl variant="standard" sx={{ mt: 1, minWidth: '100%' }}>
                    <InputLabel id="demo-simple-select-standard-label">Department</InputLabel>
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      value={textValue.department}
                      onChange={handleChange}
                      label="Department"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl variant="standard" sx={{ mt: 1, minWidth: '100%' }}>
                    <InputLabel id="demo-simple-select-standard-label">Designation</InputLabel>
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      value={textValue.designation}
                      onChange={handleChange}
                      label="Designation"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6} sx={{ mt: 2 }}>
                  <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">Role</FormLabel>
                    <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group">
                      <FormControlLabel value="candidate" control={<Radio />} label="Admin" />
                      <FormControlLabel value="internal" control={<Radio />} label="HR" />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                {/* <Grid item xs={6} sx={{ mt: 2 }}>
                  <TextField
                    autoFocus
                    autoComplete="new-password"
                    type="password"
                    margin="dense"
                    variant="standard"
                    label="Create a Password"
                    fullWidth
                    value={textValue.password}
                    onChange={onInputChangeHandler}
                  />
                </Grid> */}
                {/* <Grid item xs={6}>
                  <FormGroup>
                    <FormControlLabel control={<Checkbox defaultChecked />} label="I AGREE THE" />
                  </FormGroup>
                </Grid> */}
              </Grid>
            </Box>
          </DialogContent>
          <DialogActions>
            <Box>
              <Button onClick={modalCloseHandler} autoFocus variant="outlined" style={{ marginRight: 5 }}>
                Cancel
              </Button>
              <Button onClick={modalCloseHandler} variant="contained">
                Add Approval
              </Button>
            </Box>
          </DialogActions>
        </div>
      </Dialog>
    </>
  );
};

export default UsersModalApproval;
