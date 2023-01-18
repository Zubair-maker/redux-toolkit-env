import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Link as RouterLink } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import { useGetCandidateListQuery } from '../../../redux/services/candidate/CandidateServices';


const CreateCandidate = () => {
  const {data: getCandidateData, getCandidateDataInfo} = useGetCandidateListQuery()
  const [textValue, setTextValue] = useState({
    first_name: '',
    middle_name:'',
    last_name: '',
    marital_status:'',
    email: '',
    mobile: '',
    date_of_birth:'',
    street:'',
    pincode:'',
    city: '',
    state_id:'',
    exp_years:'',
    exp_months:'',
    qualification:'',
    cur_job:'',
    cur_employer:'',
   certifications:'',
    fun_area:'',
    subjects:'',
    skills:'',
    resume:'',

  });


  const handleChange=()=>{}
  const onInputChangeHandler = (e) => {
    const myObj = {...textValue};
    myObj[e.target.name] = e.target.value;
    setTextValue({...myObj});
  };

  return (
    <>
     
        <Grid container spacing={2} padding="20px">
          <Grid item xs={6} display="flex">
            <Grid>
              <IconButton edge="start" color="inherit" component={RouterLink}
                to="/dashboard/candidates"  aria-label="close">
                <CloseIcon />
              </IconButton>
            </Grid>
            <Grid>
              <Typography variant="h4" gutterBottom>
                Create a Candidate
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={6} display="flex" justifyContent="right">
            <Grid style={{ marginRight: 40 }}>
              <Button
                variant="contained"
                component={RouterLink}
                to="#"
                // onClick={addNewDepartmentHandler}
                // startIcon={<Iconify icon="eva:plus-fill" />}
              >
                Create
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <DialogContent>
          <Box sx={{ flexGrow: 1 }}>
            <Card style={{ padding: 40 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>
                    Personal Details
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    autoFocus
                    margin="dense"
                    variant="standard"
                    fullWidth
                    name="first_name"
                    value={textValue.first_name}
                    label="First Name"
                    placeholder="Enter First Name"
                    onChange={onInputChangeHandler}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    autoFocus
                    margin="dense"
                    variant="standard"
                    fullWidth
                    name="middle_name"
                    value={textValue.middle_name}
                    label="middle name"
                    placeholder="Enter middle name"
                    onChange={onInputChangeHandler}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    autoFocus
                    margin="dense"
                    variant="standard"
                    fullWidth
                    name="last_name"
                    value={textValue.last_name}
                    label="Last Name"
                    placeholder="Enter Last Name"
                    onChange={onInputChangeHandler}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    autoFocus
                    margin="dense"
                    variant="standard"
                    fullWidth
                    name="marital_status"
                    value={textValue.marital_status}
                    label="marital status"
                    placeholder="Enter marital status"
                    onChange={onInputChangeHandler}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControl variant="standard" sx={{ mt: 1, minWidth: '100%' }}>
                    <InputLabel id="demo-simple-select-standard-label">E-mail</InputLabel>
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      value={textValue.email}
                      name='email'
                      onChange={onInputChangeHandler}
                      label="E-mail"
                    >
                         {getCandidateData &&
                    getCandidateData?.list?.map((item) => (
                      <MenuItem key={item.id} name="email" value={item.id}>
                        {item?.name}
                      </MenuItem>
                    ))}
                      {/* <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem> */}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    autoFocus
                    margin="dense"
                    variant="standard"
                    label="Mobile Number"
                    placeholder="Enter Mobile Number"
                    fullWidth
                    value={textValue.mobile}
                    name='mobile'
                    onChange={onInputChangeHandler}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    autoFocus
                    margin="dense"
                    variant="standard"
                    label="Date Of Birth"
                    placeholder="Enter Date Of Birth"
                    fullWidth
                    value={textValue.date_of_birth}
                    name='date_of_birth'
                    onChange={onInputChangeHandler}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    autoFocus
                    margin="dense"
                    variant="standard"
                    label="Street"
                    placeholder="Enter Street"
                    fullWidth
                    value={textValue.street}
                    name='street'
                    onChange={onInputChangeHandler}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    autoFocus
                    margin="dense"
                    variant="standard"
                    label="State"
                    placeholder="Enter State"
                    fullWidth
                    value={textValue.state_id}
                    onChange={onInputChangeHandler}
                    name="state_id"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    autoFocus
                    margin="dense"
                    variant="standard"
                    label="Qualification"
                    placeholder="Enter Qualification"
                    fullWidth
                    value={textValue.qualification}
                    onChange={onInputChangeHandler}
                    name="qualification"
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControl variant="standard" sx={{ mt: 1, minWidth: '100%' }}>
                    <InputLabel id="demo-simple-select-standard-label">Exp Years</InputLabel>
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      value={textValue.exp_years}
                      name='exp_years'
                      onChange={onInputChangeHandler}
                      label="Exp Years"
                    >
                         {getCandidateData &&
                    getCandidateData?.list?.map((item) => (
                      <MenuItem key={item.id} name="exp_years" value={item.id}>
                        {item?.name}
                      </MenuItem>
                    ))}
                     
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl variant="standard" sx={{ mt: 1, minWidth: '100%' }}>
                    <InputLabel id="demo-simple-select-standard-label">Exp Months</InputLabel>
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      value={textValue.exp_months}
                      name='exp_months'
                      onChange={onInputChangeHandler}
                      label="Exp Months"
                    >
                         {getCandidateData &&
                    getCandidateData?.list?.map((item) => (
                      <MenuItem key={item.id} name="exp_months" value={item.id}>
                        {item?.name}
                      </MenuItem>
                    ))}
                     
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    autoFocus
                    margin="dense"
                    variant="standard"
                    label="Current Job"
                    placeholder="Enter Current Job"
                    fullWidth
                    value={textValue.cur_job}
                    onChange={onInputChangeHandler}
                    name="cur_job"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    autoFocus
                    margin="dense"
                    variant="standard"
                    label="Current Employer"
                    placeholder="Enter Current Employer"
                    fullWidth
                    value={textValue.cur_employer}
                    onChange={onInputChangeHandler}
                    name="cur_employer"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    autoFocus
                    margin="dense"
                    variant="standard"
                    label="Certifications"
                    placeholder="Enter Certifications"
                    fullWidth
                    value={textValue.certifications}
                    onChange={onInputChangeHandler}
                    name="certifications"
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControl variant="standard" sx={{ mt: 1, minWidth: '100%' }}>
                    <InputLabel id="demo-simple-select-standard-label">State</InputLabel>
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      value={textValue.state}
                      onChange={handleChange}
                      label="State"
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
                <Grid item xs={3}>
                  <FormControl variant="standard" sx={{ mt: 1, minWidth: '100%' }}>
                    <InputLabel id="demo-simple-select-standard-label">From Month</InputLabel>
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      // value={textValue.}
                      onChange={handleChange}
                      label="From Month"
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
                <Grid item xs={3}>
                  <FormControl variant="standard" sx={{ mt: 1, minWidth: '100%' }}>
                    <InputLabel id="demo-simple-select-standard-label">From Year</InputLabel>
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      // value={textValue.}
                      onChange={handleChange}
                      label="From Year"
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
                <Grid item xs={3}>
                  <FormControl variant="standard" sx={{ mt: 1, minWidth: '100%' }}>
                    <InputLabel id="demo-simple-select-standard-label">To Month</InputLabel>
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      // value={textValue.toMonth}
                      onChange={handleChange}
                      label="To Month"
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
                <Grid item xs={3}>
                  <FormControl variant="standard" sx={{ mt: 1, minWidth: '100%' }}>
                    <InputLabel id="demo-simple-select-standard-label">To Year</InputLabel>
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      // value={textValue.toYear}
                      onChange={handleChange}
                      label="To Year"
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
              </Grid>

              <Grid container spacing={2} style={{ marginTop: 40 }}>
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>
                    Educational Details
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    autoFocus
                    margin="dense"
                    variant="standard"
                    fullWidth
                    name="institute"
                    value={textValue.institute}
                    label="Institute Name"
                    placeholder="Enter Institute Name"
                    onChange={onInputChangeHandler}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    autoFocus
                    margin="dense"
                    variant="standard"
                    fullWidth
                    name="Degree"
                    value={textValue.Degree}
                    label="Degree Name"
                    placeholder="Enter Degree Name"
                    onChange={onInputChangeHandler}
                  />
                </Grid>
                <Grid item xs={3}>
                  <FormControl variant="standard" sx={{ mt: 1, minWidth: '100%' }}>
                    <InputLabel id="demo-simple-select-standard-label">City</InputLabel>
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      value={textValue.city}
                      onChange={handleChange}
                      label="City"
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
                <Grid item xs={3}>
                  <FormControl variant="standard" sx={{ mt: 1, minWidth: '100%' }}>
                    <InputLabel id="demo-simple-select-standard-label">Zip Code</InputLabel>
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      value={textValue.zipcode}
                      onChange={handleChange}
                      label="Zip Code"
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
                <Grid item xs={3}>
                  <FormControl variant="standard" sx={{ mt: 1, minWidth: '100%' }}>
                    <InputLabel id="demo-simple-select-standard-label">Highest Degree</InputLabel>
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      value={textValue.highestDegree}
                      onChange={handleChange}
                      label="Highest Degree"
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
                <Grid item xs={3}>
                  <FormControl variant="standard" sx={{ mt: 1, minWidth: '100%' }}>
                    <InputLabel id="demo-simple-select-standard-label">Total Experience</InputLabel>
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      value={textValue.totalExp}
                      onChange={handleChange}
                      label="Total Experience"
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
                    <InputLabel id="demo-simple-select-standard-label">Assign to a job</InputLabel>
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      // value={textValue.assignJob}
                      onChange={handleChange}
                      label="Assign to a job"
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
              </Grid>
            </Card>
          </Box>
        </DialogContent>
      
    </>
  );
};

export default CreateCandidate;
