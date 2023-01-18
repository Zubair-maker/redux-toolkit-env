import React, { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Button from '@mui/material/Button';
import { Link as RouterLink, useParams } from 'react-router-dom';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Box, FormControl } from '@mui/material';

import InputBase from '@mui/material/InputBase';
import { useSelector } from 'react-redux';

import FormLabel from '@mui/material/FormLabel';

const PriviewInterview = (props) => {
    console.log(props);

  const [textValue, setTextValue] = useState({
    candidate_id: '',
    job_id: '',
    title: '',
    date: '',
    time_start: '',
    time_end: '',
    location_id: '',
    type: '',
    interviewers: '',
    email_temp_id: '',
    email_sub: '',
    email_msg: '',
  });

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
              <ArrowBackIcon />
            </IconButton>
          </Grid>
          <Grid>
            <Typography variant="h4" gutterBottom>
              Create an Interview
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid container style={{marginLeft:'25px'}}>
        <Grid item xs={12} display={'flex'}>
          <Grid Container xs={4} >
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={4} >
                <Grid item xs={6} >
                  <FormControl>
                    <FormLabel>Name</FormLabel>
                    <InputBase margin="dense" variant="standard" />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Type</FormLabel>
                    <InputBase margin="dense" variant="standard" />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Date</FormLabel>
                    <InputBase margin="dense" variant="standard" />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Start Time</FormLabel>
                    <InputBase margin="dense" variant="standard" />
                  </FormControl>
                  <FormControl>
                    <FormLabel>End Time</FormLabel>
                    <InputBase margin="dense" variant="standard" />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Location</FormLabel>
                    <InputBase margin="dense" variant="standard" />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Interviewers</FormLabel>
                    <InputBase margin="dense" variant="standard" />
                  </FormControl>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid sx={8}>
            <Box>
              <Grid>
                <FormControl>
                  <FormLabel>Select Candidate</FormLabel>
                  <InputBase margin="dense" variant="standard" />
                </FormControl>
              </Grid>
              <Grid>
                <FormControl>
                  <FormLabel>Select Job</FormLabel>
                  <InputBase margin="dense" variant="standard" />
                </FormControl>
              </Grid>
              <Grid>
                <FormControl>
                  <FormLabel>Select Template</FormLabel>
                  <InputBase margin="dense" variant="standard" />
                </FormControl>
              </Grid>
              <Grid>
                <FormControl>
                  <FormLabel>Subject</FormLabel>
                  <InputBase margin="dense" variant="standard" />
                </FormControl>
              </Grid>
              <Grid>
                <FormControl>
                  <FormLabel>Email Body</FormLabel>
                  <InputBase margin="dense" variant="standard" />
                </FormControl>
              </Grid>
              <Grid>
                <FormControl>
                  <FormLabel>Attachment</FormLabel>
                  <InputBase margin="dense" variant="standard" />
                </FormControl>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Grid>

      <Grid sx={12} style={{ width: '50%', marginLeft: '30%' }}>
        <Box>
          <Button variant="contained">Create</Button>
        </Box>
      </Grid>
    </>
  );
};

export default PriviewInterview;
