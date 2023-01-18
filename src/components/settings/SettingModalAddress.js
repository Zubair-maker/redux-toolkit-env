import React, { useState, useEffect } from 'react';
import { skipToken } from '@reduxjs/toolkit/query/react';
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
// eslint-disable-next-line import/no-unresolved
import { useGetCountryQuery, useGetStateQuery, useGetCityQuery } from 'src/redux/services/settings/CountryStateCityService';


const SettingModalAddress = (props) => {
  const { open, handleClose, formData, type, onSubmit } = props;
  const [fieldValue, setFieldValue] = useState(formData);
  const [countryId, setCountryId] = useState(skipToken);
  const [stateId, setStateId] = useState(skipToken);
  const { data: stateData } = useGetStateQuery(countryId);
  const { data: countryData } = useGetCountryQuery();
  const { data: cityData } = useGetCityQuery(stateId);

  // console.log("formData", formData)
  // console.log("countryId", countryId);


  useEffect(() => {
    if (formData?.id) {
      setCountryId(formData.country);
      setStateId(formData.state);
      setFieldValue(formData);
    } else {
      setFieldValue(formData);
    }


  }, [formData, skipToken])


  const modalCloseHandler = () => {
    handleClose(false);
  };

  const onInputChangeHandler = (e) => {
    // console.log(e.target.name);
    // console.log(e.target.value);
    if (e.target.name === "country") {
      setCountryId(e.target.value)
      setFieldValue({ ...fieldValue, [e.target.name]: e.target.value });
    }
    if (e.target.name === "state") {
      setStateId(e.target.value)
      setFieldValue({ ...fieldValue, [e.target.name]: e.target.value });
    }
    setFieldValue({ ...fieldValue, [e.target.name]: e.target.value });
  };

  const SubmitHanlder = () => {
    console.log("submit", fieldValue);
    onSubmit(fieldValue);

  }

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
          <DialogTitle>{type === "Add" ? "Add Address" : "Update Address"}</DialogTitle>
          <DialogContent>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoFocus
                    margin="dense"
                    variant="standard"
                    fullWidth
                    name="name"
                    value={fieldValue.name}
                    label="Name"
                    onChange={onInputChangeHandler}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    autoFocus
                    margin="dense"
                    variant="standard"
                    fullWidth
                    multiline
                    rows={2}
                    name="address"
                    value={fieldValue.address}
                    label="Address"
                    onChange={onInputChangeHandler}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    autoFocus
                    margin="dense"
                    variant="standard"
                    label="Pincode"
                    fullWidth
                    name="pincode"
                    value={fieldValue.pincode}
                    onChange={onInputChangeHandler}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControl variant="standard" sx={{ m: 1, minWidth: '100%' }}>
                    <InputLabel id="select-country">Select Country</InputLabel>
                    <Select
                      labelId="select-country"
                      id="country"
                      name="country"
                      value={fieldValue.country}
                      onChange={onInputChangeHandler}
                      label="Select Country"
                    >
                      {countryData && countryData?.countries?.map((country) => <MenuItem key={country.id} value={country.id}>{country.name}</MenuItem>)}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl variant="standard" sx={{ m: 1, minWidth: '100%' }}>
                    <InputLabel id="select-state">State</InputLabel>
                    <Select
                      labelId="select-state"
                      id="state"
                      value={fieldValue.state}
                      onChange={onInputChangeHandler}
                      label="State"
                      name="state"
                    >
                      {stateData ? stateData?.states?.map((state) => <MenuItem key={state.id} value={state.id}>{state.name}</MenuItem>) : <MenuItem value="">
                        <em>None</em>
                      </MenuItem>}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl variant="standard" sx={{ m: 1, minWidth: '100%' }}>
                    <InputLabel id="select-city">select City</InputLabel>
                    <Select
                      labelId="select-city"
                      id="city"
                      name="city"
                      value={fieldValue.city}
                      onChange={onInputChangeHandler}
                      label="Select City"
                    >
                      {cityData ? cityData?.cities?.map((city) => <MenuItem key={city.id} value={city.id}>{city.name}</MenuItem>) : <MenuItem value="">
                        <em>None</em>
                      </MenuItem>}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Box>
          </DialogContent>
          <DialogActions>
            <Box>
              <Button onClick={modalCloseHandler} autoFocus variant="outlined" style={{ marginRight: 5 }}>
                Cancel
              </Button>
              <Button onClick={SubmitHanlder} variant="contained">
                {type === "Add" ? "Add Address" : "Update Address"}
              </Button>
            </Box>
          </DialogActions>
        </div>
      </Dialog>
    </>
  );
};

export default SettingModalAddress;
