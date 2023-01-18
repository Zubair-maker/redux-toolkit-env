import React, { useState, useEffect } from 'react';
import { skipToken } from '@reduxjs/toolkit/query/react';
import Button from '@mui/material/Button';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FileUpload from 'react-material-file-upload';
import { LoadingButton } from '@mui/lab';
// eslint-disable-next-line import/no-unresolved
import ImagePreview from 'src/components/imagePreview/ImagePreview';
// eslint-disable-next-line import/no-unresolved
import { useGetCompanyInfoQuery, useUpdateCompanyInfoMutation, useUpdateCompanyLogoMutation } from 'src/redux/services/settings/CareerSiteService';
// eslint-disable-next-line import/no-unresolved
import { useGetCountryQuery, useGetStateQuery, useGetCityQuery } from 'src/redux/services/settings/CountryStateCityService';
import { showToast } from '../../../utils/toast';




const CareerSite = () => {
  const [files, setFiles] = React.useState([]);
  const { data, isLoading, refetch } = useGetCompanyInfoQuery();
  const { data: countryData } = useGetCountryQuery();
  const [countryId, setCountryId] = useState(skipToken);
  const [stateId, setStateId] = useState(skipToken);
  const { data: stateData } = useGetStateQuery(countryId);
  const { data: cityData } = useGetCityQuery(stateId);
  const [UpdateCompany, UpdateCompanyInfo] = useUpdateCompanyInfoMutation();
  const [UpdateCompanyLogo, UpdateCompanyLogoInfo] = useUpdateCompanyLogoMutation();
  const [companyData, setCompanyData] = useState({
    company: "",
    logo: "",
    website: "",
    address: "",
    landmark: "",
    country_id: "",
    state_id: "",
    city: "",
    pincode: "",
    description: ""
  })
  console.log("UpdateCompanyLogoInfo", UpdateCompanyLogoInfo);

  useEffect(() => {
    if (data) {
      const response = data?.company;
      setCompanyData({
        company: response.name,
        logo: response.logo,
        website: response.website,
        address: response.address,
        landmark: response.landmark,
        country_id: response.country_id,
        state_id: response.state_id,
        city: response.city_id,
        pincode: response.pincode,
        description: response.description
      });
      setCountryId(data?.company?.country_id);
      setStateId(data?.company?.state_id)
    }
  }, [data])


  if (UpdateCompanyInfo.isSuccess) {
    showToast("success", "career site updated successfully");
    refetch();
    UpdateCompanyInfo.reset();
  }
  if (UpdateCompanyInfo.isError) {
    showToast("error", UpdateCompanyInfo.error.data.msg);
    UpdateCompanyInfo.reset();
  }
  if (UpdateCompanyLogoInfo.isSuccess) {
    showToast("success", UpdateCompanyLogoInfo.data.msg);
    refetch();
    UpdateCompanyLogoInfo.reset();
  }
  if (UpdateCompanyLogoInfo.isError) {
    showToast("error", "error while updating logo..");
    UpdateCompanyLogoInfo.reset();
  }

  const updateCareerSite = async () => {
    const formData = new FormData();
    formData.append('company', companyData.company);
    formData.append('address', companyData.address);
    formData.append('landmark', companyData.landmark);
    formData.append('city', companyData.city);
    formData.append('pincode', companyData.pincode);
    formData.append('website', companyData.website);
    formData.append('description', 'test');
    await UpdateCompany(formData);

  }

  const companyLogoChangeHandler = async (file) => {
    console.log("file", file);
    const formData = new FormData();
    formData.append('logo', file);
    await UpdateCompanyLogo(formData);
  }

  const onInputChangeHandler = (e) => {
    setCompanyData({ ...companyData, [e.target.name]: e.target.value })
  }


  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom>
          Career Site
        </Typography>
      </Stack>
      <DialogContent>
        <Card sx={{ minWidth: 275, p: 4 }} variant="outlined">
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={3} justifyContent="center">
              <Grid item xs={12} md={7}>
                <TextField
                  autoFocus
                  margin="dense"
                  variant="outlined"
                  fullWidth
                  name="company"
                  value={companyData.company}
                  label="Institute Name"
                  onChange={onInputChangeHandler}
                />
              </Grid>
              <Grid item xs={12} md={7}>
                {/* <FileUpload value={files} onChange={setFiles} /> */}
                <ImagePreview
                  logo={companyData.logo}
                  onFileSelectSuccess={(file) => companyLogoChangeHandler(file)}
                  onFileSelectError={({ error }) => showToast("error", error)}
                />
              </Grid>
              <Grid item xs={12} md={7}>
                <TextField
                  autoFocus
                  margin="dense"
                  variant="outlined"
                  fullWidth
                  name="website"
                  value={companyData.website}
                  label="Institute Website"
                  onChange={onInputChangeHandler}
                />
              </Grid>
              <Grid item xs={12} md={7}>
                <TextField
                  autoFocus
                  margin="dense"
                  variant="outlined"
                  fullWidth
                  name="address"
                  value={companyData.address}
                  label="Institute Address"
                  onChange={onInputChangeHandler}
                />
              </Grid>
              <Grid item xs={12} md={7}>
                <TextField
                  autoFocus
                  margin="dense"
                  variant="outlined"
                  fullWidth
                  value={companyData.landmark}
                  label="Address Landmark"
                  name="landmark"
                  onChange={onInputChangeHandler}
                />
              </Grid>

              <Grid item xs={12} md={7}>
                <FormControl variant="outlined" sx={{ minWidth: '100%' }}>
                  <InputLabel id="select-country">Select Country</InputLabel>
                  <Select
                    labelId="select-country"
                    id="country"
                    value={companyData.country_id}
                    // onChange={() => console.log("hello")}
                    // onClick={() => console.log("click")}
                    label="Select Country"
                  >
                    {countryData && countryData?.countries?.map((country) => <MenuItem key={country?.id} value={country?.id}>{country?.name}</MenuItem>)}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={7}>
                <FormControl variant="outlined" sx={{ minWidth: '100%' }}>
                  <InputLabel id="select-state">Select State</InputLabel>
                  <Select
                    labelId="select-state"
                    id="state"
                    value={companyData.state_id}
                    //   onChange={handleChange}
                    label="Select State"
                  >
                    {stateData && stateData?.states?.map((state) => <MenuItem key={state?.id} value={state?.id}>{state?.name}</MenuItem>)}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={7}>
                <FormControl variant="outlined" sx={{ minWidth: '100%' }}>
                  <InputLabel id="select-city">Select City</InputLabel>
                  <Select
                    labelId="select-city"
                    id="city"
                    name="city"
                    value={companyData.city}
                    onChange={onInputChangeHandler}
                    label="Select City"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {cityData && cityData?.cities?.map((city) => <MenuItem key={city?.id} value={city?.id}>{city?.name}</MenuItem>)}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={7}>
                <TextField
                  autoFocus
                  margin="dense"
                  variant="outlined"
                  label="Pincode"
                  name="pincode"
                  fullWidth
                  value={companyData.pincode}
                  onChange={onInputChangeHandler}
                />
              </Grid>
              <Grid item xs={12} md={7}>
                <Box style={{ display: 'flex', justifyContent: 'center' }}>
                  <LoadingButton variant="contained" onClick={updateCareerSite} loading={UpdateCompanyInfo.isLoading}> Update </LoadingButton>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Card>
      </DialogContent>
    </Container>
  );
};

export default CareerSite;
