import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
// eslint-disable-next-line import/no-unresolved
import { useDepartmentGetQuery } from 'src/redux/services/settings/DepartmentService';
// eslint-disable-next-line import/no-unresolved
import { useDesignationGetQuery } from 'src/redux/services/settings/DesignationService';
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
// eslint-disable-next-line import/no-unresolved
import ImagePreview from 'src/components/imagePreview/ImagePreview';

const UserModalList = (props) => {
  const { open, handleClose, onsubmit, type, formData } = props;
  const { data: departmentData } = useDepartmentGetQuery();
  const { data: designationData } = useDesignationGetQuery();
  const departmentResponse = departmentData?.data;
  const desginationResponse = designationData?.data;
  const [textValue, setTextValue] = useState(formData);
  const [departmentId, setDepartmentId] = useState(null);
  const [designationId, setDesignationId] = useState(null);

  useEffect(() => {
    if (formData?.account_id) {
      const departmentArr = departmentResponse;
      const designationArr = desginationResponse;
      const foundDepartment = departmentArr?.find((departmentFound) => departmentFound?.name === formData?.department);
      const foundDesignation = designationArr?.find(
        (designationFound) => designationFound?.name === formData?.designation
      );
      setDepartmentId(foundDepartment?.id);
      setDesignationId(foundDesignation?.id);
      setTextValue({
        ...formData,
        department: foundDepartment?.id,
        designation: foundDesignation?.id,
      });
    } else {
      setTextValue(formData);
      setDepartmentId(null);
      setDesignationId(null);
    }
  }, [formData, type, departmentResponse, desginationResponse]);

  const clickHandler = () => {
    onsubmit(textValue);
  };

  const modalCloseHandler = () => {
    handleClose(false);
  };

  const onInputChangeHandler = (e) => {
    setTextValue({ ...textValue, [e.target.name]: e.target.value });
  };

  const userLogoChangeHandler = (file) => {
    setTextValue({ ...textValue, photo: file });
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
          <DialogTitle>{type === 'Add' ? 'Create User' : 'Update User'}</DialogTitle>
          <DialogContent>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container>
                <Grid item md={4}>
                  <ImagePreview
                    logo={textValue.photo}
                    // eslint-disable-next-line no-undef
                    onFileSelectSuccess={(file) => userLogoChangeHandler(file)}
                    onFileSelectError={({ error }) => console.log('error', error)}
                  />
                </Grid>
                <Grid item md={8}>
                  <TextField
                    autoFocus
                    margin="dense"
                    variant="standard"
                    fullWidth
                    name="first_name"
                    value={textValue.first_name}
                    label="First Name"
                    onChange={onInputChangeHandler}
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    variant="standard"
                    fullWidth
                    name="last_name"
                    value={textValue.last_name}
                    label="Last Name"
                    onChange={onInputChangeHandler}
                  />
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                {/* <Grid item xs={12}>
                  <TextField
                    autoFocus
                    margin="dense"
                    variant="standard"
                    fullWidth
                    name="first_name"
                    value={textValue.first_name}
                    label="First Name"
                    onChange={onInputChangeHandler}
                  />
                </Grid> */}
                {/* <Grid item xs={12}>
                  <TextField
                    autoFocus
                    margin="dense"
                    variant="standard"
                    fullWidth
                    name="last_name"
                    value={textValue.last_name}
                    label="Last Name"
                    onChange={onInputChangeHandler}
                  />
                </Grid> */}
                <Grid item xs={6}>
                  <TextField
                    autoFocus
                    margin="dense"
                    variant="standard"
                    label="Email"
                    name="email"
                    fullWidth
                    value={textValue.email}
                    onChange={onInputChangeHandler}
                    disabled={formData?.email_desable}
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
                    value={textValue.mobile}
                    onChange={onInputChangeHandler}
                    name="mobile"
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControl variant="standard" sx={{ mt: 1, minWidth: '100%' }}>
                    <InputLabel id="department-label">Department</InputLabel>
                    <Select
                      labelId="department-label"
                      id="department"
                      name="department"
                      value={textValue.department}
                      onChange={onInputChangeHandler}
                      label="Department"
                    >
                      {departmentResponse?.length > 0 &&
                        departmentResponse?.map((department) => (
                          <MenuItem key={department?.id} value={department?.id}>
                            {department.name}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl variant="standard" sx={{ mt: 1, minWidth: '100%' }}>
                    <InputLabel id="designation-label">Designation</InputLabel>
                    <Select
                      labelId="designation-label"
                      id="designation"
                      name="designation"
                      value={textValue.designation}
                      onChange={onInputChangeHandler}
                      label="Designation"
                    >
                      {desginationResponse?.length > 0 &&
                        desginationResponse?.map((designation) => (
                          <MenuItem key={designation?.id} value={designation?.id}>
                            {designation?.name}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6} sx={{ mt: 2 }}>
                  <FormControl>
                    <FormLabel id="role-label">Role</FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="role-label"
                      name="role"
                      onChange={onInputChangeHandler}
                      value={textValue.role}
                    >
                      <FormControlLabel value="A" control={<Radio />} label="Admin" />
                      <FormControlLabel value="U" control={<Radio />} label="HR" />
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
              <Button onClick={clickHandler} variant="contained">
                {type === 'Add' ? 'Add user' : 'Update List'}
              </Button>
            </Box>
          </DialogActions>
        </div>
      </Dialog>
    </>
  );
};

export default UserModalList;
