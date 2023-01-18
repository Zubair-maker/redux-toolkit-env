import React, { useEffect } from 'react';
import Card from '@mui/material/Card';

import Container from '@mui/material/Container';
import InputBase from '@mui/material/InputBase';

import Grid from '@mui/material/Grid';
import { Stack } from '@mui/material';
import Box from '@mui/material/Box';

import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Link as RouterLink, useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';
import FormLabel from '@mui/material/FormLabel';
import './JobPriview.css';
import { useAddJobMutation } from '../../../redux/services/jobs/JobServices';

const JobPreview = () => {
  const [addJobData] = useAddJobMutation();
  const job = useSelector((state) => state.job.job);

  const handleComplete = async () => {
    await addJobData(job);
  };
  return (
    <Card sx={{ p: 4, m: 2 }} variant="outlined">
      <Stack direction="row" alignItems="center" mb={5}>
        <IconButton edge="start" color="inherit" aria-label="close" component={RouterLink} to="/dashboard/jobs">
          <CloseIcon />
        </IconButton>
        <Typography variant="h6" gutterBottom>
          Preview | {job.title}
        </Typography>
        <Button variant="contained" onClick={handleComplete} style={{ marginLeft: 120 }}>
          Publish
        </Button>
      </Stack>
      <Grid container overflow="scroll">
        <Grid item xs={12} display={'flex'}>
          <Container>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={4}>
                <Grid item xs={6}>
                  <FormControl>
                    <FormLabel>Job title</FormLabel>
                    <InputBase margin="dense" variant="standard" value={job.title} />
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl>
                    <FormLabel>Number of Vacancies</FormLabel>
                    <InputBase margin="dense" variant="standard" value={job.vacancies} />
                  </FormControl>
                </Grid>

                <Grid item xs={6}>
                  <FormControl>
                    <FormLabel>Department</FormLabel>
                    <InputBase margin="dense" variant="standard" value={job.department} />
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl>
                    <FormLabel>Job Owner</FormLabel>
                    <InputBase margin="dense" variant="standard" value={job.owner} />
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl>
                    <FormLabel>Team Members Involved</FormLabel>
                    <InputBase margin="dense" variant="standard" value={job.member_ids} />
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl>
                    <FormLabel>Type</FormLabel>
                    <InputBase margin="dense" variant="standard" value={job.type} />
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl>
                    <FormLabel>Job Nature</FormLabel>
                    <InputBase margin="dense" variant="standard" value={job.nature} />
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl>
                    <FormLabel>Education</FormLabel>
                    <InputBase margin="dense" variant="standard" value={job.education} />
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl>
                    <FormLabel>Major/ Speciality</FormLabel>
                    <InputBase margin="dense" variant="standard" value={job.speciality} />
                  </FormControl>
                </Grid>
                <Grid item xs={3}>
                  <FormControl>
                    <FormLabel>Work Ex. min. (Years)</FormLabel>
                    <InputBase margin="dense" variant="standard" value={job.exp_min} />
                  </FormControl>
                </Grid>
                <Grid item xs={3}>
                  <FormControl>
                    <FormLabel>Work Ex. max. (Years)</FormLabel>
                    <InputBase margin="dense" variant="standard" value={job.exp_max} />
                  </FormControl>
                </Grid>
                <Grid item xs={3}>
                  <FormControl>
                    <FormLabel>Salary Minimum</FormLabel>
                    <InputBase margin="dense" variant="standard" value={job.salary_min} />
                  </FormControl>
                </Grid>
                <Grid item xs={3}>
                  <FormControl>
                    <FormLabel>Salary Max</FormLabel>
                    <InputBase margin="dense" variant="standard" value={job.salary_max} />
                  </FormControl>
                </Grid>
                <Grid item xs={3}>
                  <FormControl>
                    <FormLabel>Currency</FormLabel>
                    <InputBase margin="dense" variant="standard" value={job.currency} />
                  </FormControl>
                </Grid>
                <Grid item xs={3}>
                  <FormControl>
                    <FormLabel>Salary Type</FormLabel>
                    <InputBase margin="dense" variant="standard" value={job.salary_type} />
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl>
                    <FormLabel>State</FormLabel>
                    <InputBase margin="dense" variant="standard" value={job.state} />
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl>
                    <FormLabel>City</FormLabel>
                    <InputBase margin="dense" variant="standard" value={job.city} />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <FormLabel>Job Description</FormLabel>
                    <InputBase multiline margin="dense" variant="standard" value={job.description} />
                  </FormControl>
                </Grid>
              </Grid>
            </Box>
          </Container>
          <Grid item xs={4} marginLeft={'35px'}>
            <FormControl>
              <FormLabel>Assesment</FormLabel>
              <InputBase margin="dense" variant="standard" />
            </FormControl>
            <FormControl>
              <FormLabel>Hiring Pipeline*</FormLabel>
              <InputBase margin="dense" variant="standard" />
            </FormControl>
            <FormControl>
              <FormLabel>Web form*</FormLabel>
              <InputBase margin="dense" variant="standard" />
            </FormControl>
            <FormControl>
              <FormLabel>Job Boards</FormLabel>
              <InputBase margin="dense" variant="standard" />
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

export default JobPreview;
