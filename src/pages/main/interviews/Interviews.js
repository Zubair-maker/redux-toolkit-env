import React, { useState, useEffect, useMemo } from 'react';
import MUIDataTable from 'mui-datatables';
import { sentenceCase } from 'change-case';
import { Link as RouterLink, useParams } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

// material
import {
  Card,
  Stack,
  Button,
  Container,
  Typography,
  ListItemIcon,
  DialogContentText,
  DialogActions,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  DialogContent,
  Dialog,
  Box,
} from '@mui/material';
// components
import Page from '../../../components/Page';
import Label from '../../../components/Label';
import Iconify from '../../../components/Iconify';
import { sortedDataFn } from '../../../utils/getSortedData';
import { showToast } from '../../../utils/toast';

// mock

import {
  useGetInterviewListAllQuery,
  useDeleteInterviewMutation,
} from '../../../redux/services/interview/InterviewServices';

const Interviews = () => {
  const { data = [], refetch } = useGetInterviewListAllQuery();
  const { editInterview } = useParams();

  const [deleteInterview, deleteInterviewInfo] = useDeleteInterviewMutation();
  const [open, setOpen] = useState(false);
  
  const handleClose = () => {
    setOpen(false);
  };

  const sortData = useMemo(() => {
    const sortresult = sortedDataFn(data?.list);
    return sortresult;
  }, [data]);

  const onDeletAssesmenteHandler = async (id) => {
    setOpen(true);

    await deleteInterview(id);
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    if (deleteInterviewInfo.isSuccess) {
      showToast('success', deleteInterviewInfo.data.msg);
      deleteInterviewInfo.reset();
      refetch();
      setOpen(false);
    }
    if (deleteInterviewInfo.isError) {
      showToast('error', deleteInterviewInfo.error.data.msg);
      deleteInterviewInfo.reset();
      refetch();
      setOpen(false);
    }
  }, [deleteInterviewInfo, refetch]);

  const columns = [
    {
      name: 'id',
      label: 'Candidate',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'title',
      label: 'job',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'date',
      label: 'Date',
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: 'time_start',
      label: 'Time',
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: 'type',
      label: 'type',
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: 'action',
      label: 'Action',
      options: {
        filter: false,
        sort: false,
        customBodyRenderLite: (dataIndex) => (
          <>
            <Button
              style={{ minWidth: 0 }}
              variant="contained"
              component={RouterLink}
              to={`/dashboard/interviews/edit-interview/${data.list[dataIndex].id}`}
            >
              <ListItemIcon style={{ color: '#fff', padding: '0px', minWidth: 0 }}>
                <Iconify icon="ep:edit" width={24} height={24} />
              </ListItemIcon>
            </Button>
            <LoadingButton
              style={{ minWidth: 0, margin: '0px 5px' }}
              variant="contained"
              color="error"
              onClick={() => onDeletAssesmenteHandler(data.list[dataIndex].id)}
            >
              <ListItemIcon style={{ color: '#fff', padding: '0px', minWidth: 0 }}>
                <Iconify icon="eva:trash-2-outline" width={24} height={24} />
              </ListItemIcon>
            </LoadingButton>
          </>
        ),
      },
    },
  ];

  const options = {
    filterType: 'dropdown',
    responsive: 'stacked',
    filter: false,
    download: false,
    print: false,
  };

  const [value, setValue] = React.useState(null);

  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <Page title="User">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Interviews
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="/dashboard/interviews/create-interview"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            {editInterview ? 'Edit' : 'Create'} an Interview
          </Button>
        </Stack>
        <Card>
          <DialogContent>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="From Date"
                      value={value}
                      onChange={(newValue) => {
                        setValue(newValue);
                      }}
                      renderInput={(params) => <TextField {...params} sx={{ minWidth: '100%' }} />}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={4}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="To Date"
                      value={value}
                      onChange={(newValue) => {
                        setValue(newValue);
                      }}
                      renderInput={(params) => <TextField {...params} sx={{ minWidth: '100%' }} />}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={4}>
                  <FormControl sx={{ minWidth: '100%' }}>
                    <InputLabel id="demo-simple-select-autowidth-label">Experience</InputLabel>
                    <Select
                      labelId="demo-simple-select-autowidth-label"
                      id="demo-simple-select-autowidth-label"
                      value={age}
                      onChange={handleChange}
                      label="Experience"
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
                <Grid item xs={4}>
                  <FormControl sx={{ minWidth: '100%' }}>
                    <InputLabel id="demo-simple-select-autowidth-label">Skills</InputLabel>
                    <Select
                      labelId="demo-simple-select-autowidth-label"
                      id="demo-simple-select-autowidth-label"
                      value={age}
                      label="Skills"
                      onChange={handleChange}
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
                <Grid item xs={4}>
                  <FormControl sx={{ minWidth: '100%' }}>
                    <InputLabel id="demo-simple-select-autowidth-label">Job Applied</InputLabel>
                    <Select
                      labelId="demo-simple-select-autowidth-label"
                      id="demo-simple-select-autowidth-label"
                      value={age}
                      label="Job Applied"
                      onChange={handleChange}
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
                <Grid item xs={4}>
                  <FormControl sx={{ minWidth: '100%' }}>
                    <InputLabel id="demo-simple-select-autowidth-label">Education</InputLabel>
                    <Select
                      labelId="demo-simple-select-autowidth-label"
                      id="demo-simple-select-autowidth-label"
                      value={age}
                      label="Education"
                      onChange={handleChange}
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
                <Grid item xs={4}>
                  <FormControl sx={{ minWidth: '100%' }}>
                    <InputLabel id="demo-simple-select-autowidth-label">Hiring Status</InputLabel>
                    <Select
                      labelId="demo-simple-select-autowidth-label"
                      id="demo-simple-select-autowidth-label"
                      value={age}
                      label="Hiring Status"
                      onChange={handleChange}
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
                <Grid item xs={4}>
                  <FormControl sx={{ minWidth: '100%' }}>
                    <InputLabel id="demo-simple-select-autowidth-label">Sourced from</InputLabel>
                    <Select
                      labelId="demo-simple-select-autowidth-label"
                      id="demo-simple-select-autowidth-label"
                      value={age}
                      label="Sourced from"
                      onChange={handleChange}
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
                <Grid item xs={4} display="flex" justifyContent="end">
                  <Button
                    variant="contained"
                    component={RouterLink}
                    to="#"
                    startIcon={<Iconify icon="bi:filter-square-fill" />}
                  >
                    Apply Filter
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </DialogContent>
        </Card>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5} />
        <Card>
          <MUIDataTable title={'Interview List'} data={data?.list} columns={columns} options={options} />
        </Card>
      </Container>
      <Box>
        <Dialog aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
          <DialogContent sx={{ width: '250px', height: '150px' }}>
            <DialogContentText id="alert-dialog-description">Are you sure Want to delete?</DialogContentText>
          </DialogContent>
          <DialogActions>
            <FormControl>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={onDeletAssesmenteHandler} autoFocus>
                Ok
              </Button>
            </FormControl>
          </DialogActions>
        </Dialog>
      </Box>
    </Page>
  );
};

export default Interviews;
