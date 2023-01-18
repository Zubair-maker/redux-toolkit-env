import React, { useState } from 'react';
import {
  Modal,
  Box,
  Card,
  Grid,
  Button,
  Typography,
  Stack,
  Input,
  FormGroup,
  FormControlLabel,
  Switch,
  CardActions,
  CardContent,
  CardMedia,
  TextField,
} from '@mui/material';
import linkedinnn from '../../../assets/images/job-boards/linkedinnn.jpg';
import naukri from '../../../assets/images/job-boards/naukriii.jpg';
import indeedlogo from '../../../assets/images/job-boards/indeeeddddddd.jpg';

const JobBoards = () => {
  const [openLinkedin, setOpenLinkedin] = useState(false);
  const [OpenNaukri, setOpenNaukri] = useState(false);
  const [Openindeeed, setOpenindeeed] = useState(false);
  const [textValue, setTextValue] = useState({
    userIdLinkedin: '',
    privateKeyTokenLinkedin: '',
  });

  const onInputChangeHandler = (e) => {
    setTextValue(e.target.value);
    const myObj = {};
    myObj[e.target.name] = e.target.value;
  };

  const handleOpen = () => {
    setOpenLinkedin(true);
  };
  const handleClose = () => {
    setOpenLinkedin(false);
  };
  // naukri
  const naukriOpen = () => {
    setOpenNaukri(true);
  };
  const naukriClose = () => {
    setOpenNaukri(false);
  };
  // indeed
  const indeedOpen = () => {
    setOpenindeeed(true);
  };
  const indeedClose = () => {
    setOpenindeeed(false);
  };

  const handleChange = () => {};
  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <Card align="center">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card>
                <br />
                <Box>
                  <img src={linkedinnn} alt="linkedinnn" style={{ height: '150px', width: '200px' }} />
                </Box>
                <Box>
                  <FormGroup style={{ alignContent: 'center' }}>
                    <FormControlLabel
                      textAlign="center"
                      component={Button}
                      onClick={handleOpen}
                      control={<Switch onChange={handleChange} name="checkedA" />}
                      label=" "
                    />
                  </FormGroup>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Card>
      </Grid>
      {/* second boxxxxx */}
      <Grid item xs={4}>
        <Card align="center">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card>
                <br />
                <Box>
                  <img src={naukri} alt="naukri" style={{ height: '150px', width: '200px' }} />
                </Box>
                <Box>
                  <FormGroup style={{ alignContent: 'center' }}>
                    <FormControlLabel
                      textAlign="center"
                      component={Button}
                      onClick={naukriOpen}
                      control={<Switch onChange={handleChange} name="checkedA" />}
                      label=" "
                    />
                  </FormGroup>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Card>
      </Grid>
      {/* third box */}
      <Grid item xs={4}>
        <Card align="center">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card>
                <br />
                <Box>
                  <img src={indeedlogo} alt="indeedlogo" style={{ height: '150px', width: '200px' }} />
                </Box>
                <Box>
                  <FormGroup style={{ alignContent: 'center' }}>
                    <FormControlLabel
                      textAlign="center"
                      component={Button}
                      onClick={indeedOpen}
                      control={<Switch onChange={handleChange} name="checkedA" />}
                      label=" "
                    />
                  </FormGroup>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Card>
      </Grid>

      {/* modal linkin */}
      <Modal
        open={openLinkedin}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Box sx={{ maxWidth: 600 }}>
          <Card p={2}>
            <CardMedia component="img" alt="linkedinnn" height="180" image={linkedinnn} />
            <CardContent>
              <Grid item xs={12}>
                <TextField
                  autoFocus
                  margin="dense"
                  variant="standard"
                  fullWidth
                  name="userIdLinkedin"
                  value={textValue.userIdLinkedin}
                  label="User ID"
                  onChange={onInputChangeHandler}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoFocus
                  margin="dense"
                  variant="standard"
                  fullWidth
                  name="privateKeyTokenLinkedin"
                  value={textValue.privateKeyTokenLinkedin}
                  label="Private key Token"
                  onChange={onInputChangeHandler}
                />
              </Grid>
            </CardContent>
            <CardActions>
              <Button variant="gradient" buttonColor="info" fullwidth>
                Validate
              </Button>
            </CardActions>
          </Card>
        </Box>
      </Modal>

      {/* modal naukri */}
      <Modal
        open={OpenNaukri}
        onClose={naukriClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Box sx={{ maxWidth: 600 }}>
          <Card p={2}>
            <CardMedia component="img" alt="linkedinnn" height="180" image={naukri} />
            <CardContent>
              <Grid item xs={12}>
                <TextField
                  autoFocus
                  margin="dense"
                  variant="standard"
                  fullWidth
                  name="userIdLinkedin"
                  value={textValue.userIdLinkedin}
                  label="User ID"
                  onChange={onInputChangeHandler}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoFocus
                  margin="dense"
                  variant="standard"
                  fullWidth
                  name="privateKeyTokenLinkedin"
                  value={textValue.privateKeyTokenLinkedin}
                  label="Private key Token"
                  onChange={onInputChangeHandler}
                />
              </Grid>
            </CardContent>
            <CardActions>
              <Button variant="gradient" buttonColor="info" fullwidth>
                Validate
              </Button>
            </CardActions>
          </Card>
        </Box>
      </Modal>
      {/* modal indeed */}
      <Modal
        open={Openindeeed}
        onClose={indeedClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Box sx={{ maxWidth: 600 }}>
          <Card p={2}>
            <CardMedia component="img" alt="linkedinnn" height="180" image={indeedlogo} />
            <CardContent>
              <Grid item xs={12}>
                <TextField
                  autoFocus
                  margin="dense"
                  variant="standard"
                  fullWidth
                  name="userIdLinkedin"
                  value={textValue.userIdLinkedin}
                  label="User ID"
                  onChange={onInputChangeHandler}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoFocus
                  margin="dense"
                  variant="standard"
                  fullWidth
                  name="privateKeyTokenLinkedin"
                  value={textValue.privateKeyTokenLinkedin}
                  label="Private key Token"
                  onChange={onInputChangeHandler}
                />
              </Grid>
            </CardContent>
            <CardActions>
              <Button variant="gradient" buttonColor="info" fullwidth>
                Validate
              </Button>
            </CardActions>
          </Card>
        </Box>
      </Modal>
    </Grid>
  );
};

export default JobBoards;
