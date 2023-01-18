import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const Billing = () => {
  const [textValue, setTextValue] = useState({
    firstName: '',
    lastname: '',
    email: '',
    mobileNumber: '',
    alternateEmail: '',
    alternateMobNum: '',
    address: '',
    country: '',
    state: '',
    city: '',
    zipcode: '',
    highestDegree: '',
    totalExp: '',
    institute: '',
    Degree: '',
  });

  const handleChange = () => {};

  const onInputChangeHandler = (e) => {
    // console.log(e.target.name);
    // console.log(e.target.value);
    setTextValue(e.target.value);
    const myObj = {};
    myObj[e.target.name] = e.target.value;
  };

  return (
    <>
      
        <Box sx={{ flexGrow: 1 }}>
          <Card style={{ padding: 40 }}>
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12} style={{ marginBottom: 40 }} textAlign="center">
                <Typography variant="h6" gutterBottom>
                  Your Current Plan
                </Typography>
              </Grid>
              <Divider style={{ width: '100%' }} />
              <Card sx={{ minWidth: 275, mt: 2 }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography sx={{ fontSize: 40 }} gutterBottom>
                    $15/Month
                  </Typography>
                  <Typography variant="h5">Basic</Typography>
                  <Typography sx={{ mb: 2.5 }} color="text.secondary">
                    10 users inculded
                    <br />
                    2GB of storage
                    <br />
                    Email support
                    <br />
                    Help center access
                    <br />
                    Sign Up for Free
                  </Typography>
                  <CardActions sx={{ justifyContent: 'center' }}>
                    <Button
                      style={{ backgroundColor: '#FF4E50', background: 'linear-gradient(to right, #F9D423, #FF4E50)' }}
                      size="small"
                      variant="contained"
                    >
                      UPGRADE
                    </Button>
                  </CardActions>
                </CardContent>
              </Card>
            </Grid>
            <Divider style={{ width: '100%', marginTop: 40, marginBottom: 20 }} />
            <Grid container spacing={2} justifyContent="space-evenly">
              <Grid item xs={12} style={{ marginBottom: 20 }} textAlign="center">
                <Typography sx={{ fontSize: 30 }} gutterBottom>
                  Select Plan
                </Typography>
              </Grid>
              <Divider style={{ width: '100%' }} />
              <Card sx={{ minWidth: 275, mt: 2 }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography sx={{ fontSize: 40 }} gutterBottom>
                    $15/Month
                  </Typography>
                  <Typography variant="h5">Basic</Typography>
                  <Typography sx={{ mb: 2.5 }} color="text.secondary">
                    10 users inculded
                    <br />
                    2GB of storage
                    <br />
                    Email support
                    <br />
                    Help center access
                    <br />
                    Sign Up for Free
                  </Typography>
                  <CardActions sx={{ justifyContent: 'center' }}>
                    <Button size="small" variant="contained" disabled>
                      CURRENT PLAN
                    </Button>
                  </CardActions>
                </CardContent>
              </Card>
              <Card sx={{ minWidth: 275, mt: 2 }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography sx={{ fontSize: 40 }} gutterBottom>
                    $35/Month
                  </Typography>
                  <Typography variant="h5">Advanced</Typography>
                  <Typography sx={{ mb: 2.5 }} color="text.secondary">
                    15 users inculded
                    <br />
                    5GB of storage
                    <br />
                    Email/Call support
                    <br />
                    Help center access
                    <br />
                    Sign Up for Free
                  </Typography>
                  <CardActions sx={{ justifyContent: 'center' }}>
                    <Button
                      style={{ backgroundColor: '#FF4E50', background: 'linear-gradient(to right, #F9D423, #FF4E50)' }}
                      size="small"
                      variant="contained"
                    >
                      UPGRADE
                    </Button>
                  </CardActions>
                </CardContent>
              </Card>
              <Card sx={{ minWidth: 275, mt: 2 }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography sx={{ fontSize: 40 }} gutterBottom>
                    $65/Month
                  </Typography>
                  <Typography variant="h5">Premium</Typography>
                  <Typography sx={{ mb: 2.5 }} color="text.secondary">
                    30 users inculded
                    <br />
                    20GB of storage
                    <br />
                    Priority support
                    <br />
                    Help center access
                    <br />
                    Sign Up for Free
                  </Typography>
                  <CardActions sx={{ justifyContent: 'center' }}>
                    <Button
                      style={{ backgroundColor: '#FF4E50', background: 'linear-gradient(to right, #F9D423, #FF4E50)' }}
                      size="small"
                      variant="contained"
                    >
                      UPGRADE
                    </Button>
                  </CardActions>
                </CardContent>
              </Card>
            </Grid>
          </Card>
        </Box>
     
    </>
  );
};

export default Billing;
