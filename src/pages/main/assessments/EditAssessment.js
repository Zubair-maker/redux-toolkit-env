import React from 'react';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Link as RouterLink } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

const EditAssessment = () => {
  return (
    <>
      <Grid container spacing={2} padding="20px">
        <Grid item xs={6} display="flex">
          <Grid>
            <IconButton
              edge="start"
              color="inherit"
              component={RouterLink}
              to="/dashboard/assessments"
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Grid>
          <Grid>
            <Typography variant="h4" gutterBottom>
              Edit an Assessment
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={6} display="flex" justifyContent="right">
          <Grid style={{ marginRight: 5 }}>
            <Button
              variant="contained"
              component={RouterLink}
              to="#"
              // onClick={addNewDepartmentHandler}
              // startIcon={<Iconify icon="eva:plus-fill" />}
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Card variant="outlined" style={{ padding: 20 }}>
              <Grid item xs={12} style={{ marginBottom: 20 }}>
                <TextField
                  autoFocus
                  margin="dense"
                  variant="standard"
                  placeholder="Enter First Name"
                  fullWidth
                  name="firstName"
                  // value={textValue.jobTitle}
                  label="First Name"
                  // onChange={onInputChangeHandler}
                />
              </Grid>
              <Grid item style={{ marginBottom: 30 }}>
                <Typography variant="h5" gutterBottom>
                  Select Question Types
                </Typography>
              </Grid>
              <Grid item xs={12} display="flex" style={{ margin: 20 }}>
                <Grid item xs={10}>
                  <Typography variant="h6" gutterBottom>
                    Select Question Types
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Button
                    variant="contained"
                    component={RouterLink}
                    to="#"
                    // onClick={addNewDepartmentHandler}
                    // startIcon={<Iconify icon="eva:plus-fill" />}
                  >
                    ADD
                  </Button>
                </Grid>
              </Grid>
              <hr />
              <Grid item xs={12} display="flex" style={{ margin: 20 }}>
                <Grid item xs={10}>
                  <Typography variant="h6" gutterBottom>
                    Select Question Types
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Button
                    variant="contained"
                    component={RouterLink}
                    to="#"
                    // onClick={addNewDepartmentHandler}
                    // startIcon={<Iconify icon="eva:plus-fill" />}
                  >
                    ADD
                  </Button>
                </Grid>
              </Grid>
              <hr />
              <Grid item xs={12} display="flex" style={{ margin: 20 }}>
                <Grid item xs={10}>
                  <Typography variant="h6" gutterBottom>
                    Select Question Types
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Button
                    variant="contained"
                    component={RouterLink}
                    to="#"
                    // onClick={addNewDepartmentHandler}
                    // startIcon={<Iconify icon="eva:plus-fill" />}
                  >
                    ADD
                  </Button>
                </Grid>
              </Grid>
              <hr />
              <Grid item xs={12} display="flex" style={{ margin: 20 }}>
                <Grid item xs={10}>
                  <Typography variant="h6" gutterBottom>
                    Select Question Types
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Button
                    variant="contained"
                    component={RouterLink}
                    to="#"
                    // onClick={addNewDepartmentHandler}
                    // startIcon={<Iconify icon="eva:plus-fill" />}
                  >
                    ADD
                  </Button>
                </Grid>
              </Grid>
            </Card>
          </Grid>

          <Grid item xs={6}>
            <Card variant="outlined" style={{ padding: 20 }}>
              <Grid item xs={12} style={{ marginBottom: 20 }}>
                <TextField
                  autoFocus
                  margin="dense"
                  variant="standard"
                  placeholder="Enter First Name"
                  fullWidth
                  name="giveName"
                  // value={textValue.jobTitle}
                  label="Give Name to Your Assessment"
                  // onChange={onInputChangeHandler}
                />
              </Grid>
              <Grid item style={{ marginBottom: 30 }}>
                <Typography variant="h5" gutterBottom>
                  Question 1 : Multiple Choice Question
                </Typography>
              </Grid>
              <Grid item xs={12} style={{ margin: 15 }}>
                <Grid item xs={10}>
                  <TextField
                    autoFocus
                    margin="dense"
                    variant="standard"
                    placeholder="Enter First Name"
                    fullWidth
                    name="option1"
                    // value={textValue.jobTitle}
                    label="Option 1"
                    // onChange={onInputChangeHandler}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12} style={{ margin: 15 }}>
                <Grid item xs={10}>
                  <TextField
                    autoFocus
                    margin="dense"
                    variant="standard"
                    placeholder="Enter First Name"
                    fullWidth
                    name="option1"
                    // value={textValue.jobTitle}
                    label="Option 1"
                    // onChange={onInputChangeHandler}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12} style={{ margin: 15 }}>
                <Grid item xs={10}>
                  <TextField
                    autoFocus
                    margin="dense"
                    variant="standard"
                    placeholder="Enter First Name"
                    fullWidth
                    name="option1"
                    // value={textValue.jobTitle}
                    label="Option 1"
                    // onChange={onInputChangeHandler}
                  />
                </Grid>
              </Grid>
              <Grid item xs={10} style={{ marginTop: 40 }}>
                <Grid item xs={12} display="flex" justifyContent="end">
                  <Button
                    variant="contained"
                    component={RouterLink}
                    to="#"
                    // onClick={addNewDepartmentHandler}
                    // startIcon={<Iconify icon="eva:plus-fill" />}
                  >
                    DONE
                  </Button>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default EditAssessment;


