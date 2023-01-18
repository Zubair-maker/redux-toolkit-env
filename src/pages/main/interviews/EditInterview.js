import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import { Link as RouterLink } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Box, FormControl, InputLabel, Select, DialogActions, TextField, MenuItem } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
// import FileUpload from 'react-material-file-upload';
import { useGetLocationQuery } from '../../../redux/services/settings/LocationService';
import { useGetJobQuery } from '../../../redux/services/jobs/JobServices';
import { useGetEmailTamplateQuery } from '../../../redux/services/settings/EmailTamplateService';
import {
  useAddInterviewMutation,
  useDeleteInterviewMutation,
} from '../../../redux/services/interview/InterviewServices';
import { useGetCandidateListQuery } from '../../../redux/services/candidate/CandidateServices';
import PriviewInterview from './PriviewInterview';

const EditInterview = () => {
  const { data: locationData } = useGetLocationQuery();

  console.log('Location===:', locationData);

  const { data: jobsData } = useGetJobQuery();

  const { data: emailtemplateData } = useGetEmailTamplateQuery();

  console.log('Email template Data:', emailtemplateData);

  const { data: candidateListData } = useGetCandidateListQuery();

  console.log('Candidate List:', candidateListData);

  const [textValue, setTextValue] = useState({
    interviewName: '',
    date: '',
    startTime: '',
    endTime: '',
    interviewer: '',
    selectCandidate: '',
    selectTemplate: '',
    subject: '',
    emailBody: '',
  });

  const handleChange = () => {};

  const onInputChangeHandler = (e) => {
    setTextValue(e.target.value);
    const myObj = {};
    myObj[e.target.name] = e.target.value;
  };

  //   const [files, setFiles] = React.useState([]);
  return (
    <>
      <Grid container spacing={2} padding="20px">
        <Grid item xs={6} display="flex">
          <Grid>
            <IconButton
              edge="start"
              color="inherit"
              component={RouterLink}
              to="/dashboard/interviews"
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Grid>
          <Grid>
            <Typography variant="h4" gutterBottom>
              Edit an Interview
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={6}>
          <Card variant="outlined" style={{ padding: 20, margin: 20 }}>
            <Grid item xs={12}>
              <TextField
                autoFocus
                margin="dense"
                variant="standard"
                placeholder="Type interview name..."
                fullWidth
                name="title"
                value={textValue.title}
                label="Name"
                onChange={onInputChangeHandler}
              />
            </Grid>
            <Grid item xs={12} margin="20px 0 10px 0">
              <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                <FormControlLabel
                  control={<Checkbox onChange={onInputChangeHandler} value="IP" name="type" />}
                  label="In person"
                />
                <FormControlLabel
                  control={<Checkbox onChange={onInputChangeHandler} value="T" name="type" />}
                  label="Telephonic"
                />
                <FormControlLabel
                  control={<Checkbox value="V" name="type" onChange={onInputChangeHandler} />}
                  label="Video"
                />
              </FormGroup>
            </Grid>
            <Grid item xs={12} marginBottom="10px">
              <InputLabel>date</InputLabel>
              <TextField
                margin="dense"
                variant="standard"
                fullWidth
                type="date"
                name="date"
                value={textValue.date}
                onChange={onInputChangeHandler}
              />
            </Grid>
            <Grid item xs={12} marginBottom="10px">
              <InputLabel>Start Time</InputLabel>

              <TextField
                margin="dense"
                variant="standard"
                type={'time'}
                fullWidth
                name="time_start"
                value={textValue.time_start}
                onChange={onInputChangeHandler}
              />
            </Grid>
            <Grid item xs={12} marginBottom="10px">
              <InputLabel>End Time</InputLabel>
              <TextField
                margin="dense"
                type={'time'}
                variant="standard"
                fullWidth
                name="time_end"
                value={textValue.time_end}
                onChange={onInputChangeHandler}
              />
            </Grid>
            <Grid item xs={12} marginBottom="10px">
              <FormControl variant="standard" sx={{ mt: 1, minWidth: '100%' }}>
                <InputLabel id="demo-simple-select-standard-label">Location</InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={textValue.location_id}
                  onChange={onInputChangeHandler}
                  label="Department"
                  name="location_id"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>

                  {locationData &&
                    locationData?.data?.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item?.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} marginBottom="10px">
              <TextField
                margin="dense"
                variant="standard"
                fullWidth
                name="interviewers"
                value={textValue.interviewers}
                label="Interviewer"
                onChange={onInputChangeHandler}
              />
            </Grid>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card variant="outlined" style={{ padding: 20, margin: 20 }}>
            <Grid item xs={12}>
              <FormControl variant="standard" sx={{ mt: 1, minWidth: '100%' }}>
                <InputLabel id="demo-simple-select-standard-label">Select Candidate</InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={textValue.candidate_id}
                  onChange={onInputChangeHandler}
                  label="Candidate"
                  name="candidate_id"
                >
                  {candidateListData &&
                    candidateListData?.list.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item?.job_title}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} marginBottom="10px">
              <FormControl variant="standard" sx={{ mt: 1, minWidth: '100%' }}>
                <InputLabel id="demo-simple-select-standard-label">Select Job</InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={textValue.job_id}
                  onChange={onInputChangeHandler}
                  label="Department"
                  name="job_id"
                >
                  {jobsData &&
                    jobsData?.list.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item?.title}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} marginBottom="10px">
              <FormControl variant="standard" sx={{ mt: 1, minWidth: '100%' }}>
                <InputLabel id="demo-simple-select-standard-label">Select Template</InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  onChange={onInputChangeHandler}
                  name="email_temp_id"
                  value={textValue.email_temp_id}
                  label="Department"
                >
                  {jobsData &&
                    emailtemplateData?.data.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item?.subject}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} marginBottom="10px">
              <TextField
                autoFocus
                margin="dense"
                variant="standard"
                fullWidth
                name="email_sub"
                value={textValue.email_sub}
                label="email_sub"
                onChange={onInputChangeHandler}
              />
            </Grid>
            <Grid item xs={12} marginBottom="10px">
              <TextField
                autoFocus
                margin="dense"
                variant="standard"
                fullWidth
                name="email_msg"
                value={textValue.email_msg}
                label="Email Body"
                onChange={onInputChangeHandler}
              />
            </Grid>

            <Grid item xs={12} marginTop="20px" display="flex">
              <Grid sx={6}>
                <InputLabel>Attachment</InputLabel>
              </Grid>
              <Grid marginLeft={'10px'} sx={6}>
                <Button variant="contained" component="label">
                  Upload File
                  <input type="file" hidden />
                </Button>
              </Grid>
              {/* <FileUpload value={files} onChange={setFiles} /> */}
            </Grid>
          </Card>
        </Grid>
      </Grid>
      <Grid sx={12} style={{ width: '50%', marginLeft: '30%' }}>
        {/* <DialogActions style={{ display: 'flex',backgroundColor:'transparent' }}> */}
        <Box>
          <Button variant="contained">Update</Button>
        </Box>
        {/* </DialogActions> */}
      </Grid>
    </>
  );
};

export default EditInterview;
