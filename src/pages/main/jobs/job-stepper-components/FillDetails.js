import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';

import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { jobAction } from '../../../../redux/job/JobReducer';
import { useDegreeGetQuery } from '../../../../redux/services/settings/DegreeService';
import { useGetUsersApiQuery } from '../../../../redux/services/settings/UserService';
import { useDepartmentGetQuery } from '../../../../redux/services/settings/DepartmentService';
import { useGetStateQuery, useGetCityQuery } from '../../../../redux/services/settings/CountryStateCityService';
import { useGetPipelineQuery } from '../../../../redux/services/settings/PipelineService';
import { useDesignationGetQuery } from '../../../../redux/services/settings/DesignationService';

const FillDetails = () => {
  const dispatch = useDispatch();
  const textValue = useSelector((state) => state.job.job);

  const { data: jobDegreeData } = useDegreeGetQuery();
  const { data: jobGetuserData } = useGetUsersApiQuery();
  const { data: jobGetDepartmentData } = useDepartmentGetQuery();
  const { data: jobStateData } = useGetStateQuery(1);
  const { data: jobCityData } = useGetCityQuery(1);
  const { data: jobGetPipelineData } = useGetPipelineQuery();
  const { data: jobGetDesignationData } = useDesignationGetQuery();

  const experienceArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  //  const [textValue, setTextValue] = useState(job);
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const onInputChangeHandler = (e) => {
    const myObj = { ...textValue };
    if (e.target.name === 'education') {
      myObj[e.target.name] = [e.target.value];
    } else if (e.target.name === 'member_ids') {
      console.log('Member name', e);
      myObj.member_names = typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value;
      // myObj.member_names = [];
      // eslint-disable-next-line no-plusplus
      // for (let index = 0; index < e.target.value.length; index++) {
      //   const mId = myObj[e.target.name][index];
      //   const foundId = jobGetuserData?.list?.find((user) => `${user.first_name} ${user.last_name}` === mId);
      //   if (foundId) {
      //     myObj.member_names.push(`${foundId.first_name} ${foundId.last_name}`);
      //   }
      // }
      console.log('name memberId', myObj[e.target.name]);
      console.log('name membrer name', myObj.member_names);
      // myObj.member_name = typeof value === 'string' ? e.target.value.split(',') : e.target.value;
    } else if (
      e.target.name === 'vacancies' ||
      e.target.name === 'department' ||
      e.target.name === 'assesment' ||
      e.target.name === 'exp_min' ||
      e.target.name === 'exp_max'
    ) {
      myObj[e.target.name] = parseInt(e.target.value, 10);
    } else {
      myObj[e.target.name] = e.target.value;
    }

    dispatch(jobAction({ ...myObj }));
  };
  const renderMultiSelectValues = (selected) => {
    console.log('selected', selected);
    return textValue.member_names;
  };

  return (
    <Card sx={{ p: 4, m: 2 }} variant="outlined">
      <Container>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={4}>
            <Grid item xs={6}>
              <TextField
                autoFocus
                margin="dense"
                variant="standard"
                fullWidth
                name="title"
                value={textValue.title}
                label="Job Title"
                onChange={onInputChangeHandler}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                margin="dense"
                variant="standard"
                fullWidth
                name="vacancies"
                value={textValue.vacancies}
                label="Number of Vacancies"
                onChange={onInputChangeHandler}
              />
            </Grid>

            <Grid item xs={6}>
              <FormControl variant="standard" sx={{ mt: 1, minWidth: '100%' }}>
                <InputLabel id="demo-simple-select-standard-label">Department</InputLabel>
                <Select
                  required
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={textValue.department}
                  onChange={onInputChangeHandler}
                  label="Select the Department"
                  name="department"
                >
                  {jobGetDepartmentData &&
                    jobGetDepartmentData?.data?.map((item) => (
                      <MenuItem key={item.id} name="department" value={item.id}>
                        {item?.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl variant="standard" sx={{ mt: 1, minWidth: '100%' }}>
                <InputLabel id="demo-simple-select-standard-label">owner</InputLabel>
                <Select
                  margin="dense"
                  variant="standard"
                  fullWidth
                  name="owner"
                  value={textValue.owner}
                  label="owner"
                  onChange={onInputChangeHandler}
                >
                  {jobGetuserData &&
                    jobGetuserData?.list?.map((item) => (
                      <MenuItem key={item.id} value={item.account_id}>
                        {item?.first_name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl variant="standard" sx={{ m: 1, width: 300 }}>
                {/* <InputLabel id="demo-simple-select-standard-label">Team Member</InputLabel> */}
                {/* <TextField
                  select
                  margin="dense"
                  variant="standard"
                  fullWidth
                  name="member_ids"
                  value={textValue.member_ids}
                  onChange={onInputChangeHandler}
                  SelectProps={{
                    multiple:true,
                  }}
                >
                  {jobGetuserData &&
                    jobGetuserData?.list?.map((item) => (
                      <MenuItem key={item.id} value={item.account_id}>
                        {item?.first_name}
                      </MenuItem>
                    ))}
                </TextField> */}
                <InputLabel id="demo-multiple-checkbox-label">Team Member</InputLabel>
                <Select
                  labelId="demo-multiple-checkbox-label"
                  id="demo-multiple-checkbox"
                  multiple
                  value={textValue.member_names}
                  name="member_ids"
                  fullWidth
                  onChange={onInputChangeHandler}
                  input={<OutlinedInput label="Team Member" />}
                  renderValue={renderMultiSelectValues}
                  MenuProps={MenuProps}
                >
                  {jobGetuserData &&
                    jobGetuserData?.list?.map((item) => (
                      <MenuItem key={item.account_id} value={`${item.first_name} ${item.last_name}`}>
                        <Checkbox
                          checked={textValue.member_names.indexOf(`${item.first_name} ${item.last_name}`) > -1}
                        />
                        <ListItemText primary={`${item.first_name} ${item.last_name}`} />
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl variant="standard" sx={{ mt: 1, minWidth: '100%' }}>
                <InputLabel id="demo-simple-select-standard-label">Type</InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={textValue.type}
                  onChange={onInputChangeHandler}
                  label="Type"
                  name="type"
                >
                  <MenuItem value={'F'}>Full Time</MenuItem>
                  <MenuItem value={'P'}>Part Time</MenuItem>
                  {/* <MenuItem value={'C'}>Contract</MenuItem> */}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl variant="standard" sx={{ mt: 1, minWidth: '100%' }}>
                <InputLabel id="demo-simple-select-standard-label">Job Nature</InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={textValue.nature}
                  onChange={onInputChangeHandler}
                  label="on site"
                  name="nature"
                >
                  <MenuItem value={'O'}>Work From Office </MenuItem>
                  <MenuItem value={'R'}>Remote</MenuItem>
                  {/* <MenuItem value={30}>Thirty</MenuItem> */}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl variant="standard" sx={{ mt: 1, minWidth: '100%' }}>
                <InputLabel id="demo-simple-select-standard-label">Education</InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={textValue.education}
                  onChange={onInputChangeHandler}
                  label="Choose Degree"
                  name="education"
                >
                  {jobDegreeData &&
                    jobDegreeData?.data?.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item?.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl variant="standard" sx={{ mt: 1, minWidth: '100%' }}>
                <InputLabel id="demo-simple-select-standard-label">Major/Speciality</InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={textValue.speciality}
                  onChange={onInputChangeHandler}
                  label="Major/Speciality"
                  name="speciality"
                >
                  {jobGetDesignationData &&
                    jobGetDesignationData?.data?.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
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
            <Grid item xs={3}>
              <FormControl variant="standard" sx={{ mt: 1, minWidth: '100%' }}>
                <InputLabel id="demo-simple-select-standard-label">Work Ex. min. (years)</InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={textValue.exp_min}
                  onChange={onInputChangeHandler}
                  label="Work Ex. min. (years)"
                  name="exp_min"
                >
                  {experienceArray.map((item) => (
                    <MenuItem key={`min-${item}`} name="min" value={item}>
                      {item}
                    </MenuItem>
                  ))}

                  {/* <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem> */}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              <FormControl variant="standard" sx={{ mt: 1, minWidth: '100%' }}>
                <InputLabel id="demo-simple-select-standard-label">Work Ex. max. (years)</InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={textValue.exp_max}
                  onChange={onInputChangeHandler}
                  label="Work Ex. max. (years)"
                  name="exp_max"
                >
                  {/* <MenuItem value="">
                    <em>None</em>
                  </MenuItem> */}
                  {experienceArray.map((item) => (
                    <MenuItem key={`max-${item}`} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              <TextField
                margin="dense"
                variant="standard"
                fullWidth
                name="salary_min"
                value={textValue.salary_min}
                label="Salary Minimum"
                onChange={onInputChangeHandler}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                margin="dense"
                variant="standard"
                fullWidth
                name="salary_max"
                value={textValue.salary_max}
                label="Salary Maximum"
                onChange={onInputChangeHandler}
              />
            </Grid>
            <Grid item xs={3}>
              <FormControl variant="standard" sx={{ mt: 1, minWidth: '100%' }}>
                <InputLabel id="demo-simple-select-standard-label">Currency</InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={textValue.currency}
                  onChange={onInputChangeHandler}
                  label="Currency"
                  name="currency"
                >
                  <MenuItem value={'INR'}>INR</MenuItem>
                  <MenuItem value={'US'}>US Dollar</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              <FormControl variant="standard" sx={{ mt: 1, minWidth: '100%' }}>
                <InputLabel id="demo-simple-select-standard-label">Salary Type</InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={textValue.salary_type}
                  onChange={onInputChangeHandler}
                  label="Salary Type"
                  name="salary_type"
                >
                  <MenuItem value={'M'}>Monthly</MenuItem>
                  <MenuItem value={'Y'}>Per Anum</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl variant="standard" sx={{ mt: 1, minWidth: '100%' }}>
                <InputLabel id="demo-simple-select-standard-label">State</InputLabel>
                <Select
                  margin="dense"
                  variant="standard"
                  fullWidth
                  name="state"
                  value={textValue.state}
                  label="State"
                  onChange={onInputChangeHandler}
                >
                  {jobStateData &&
                    jobStateData?.states?.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item?.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl variant="standard" sx={{ mt: 1, minWidth: '100%' }}>
                <InputLabel id="demo-simple-select-standard-label">Pipeline</InputLabel>
                <Select
                  margin="dense"
                  variant="standard"
                  fullWidth
                  name="pipeline"
                  value={textValue.pipeline}
                  label="pipeline"
                  onChange={onInputChangeHandler}
                >
                  {jobGetPipelineData &&
                    jobGetPipelineData?.data?.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item?.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl variant="standard" sx={{ mt: 1, minWidth: '100%' }}>
                <InputLabel id="demo-simple-select-standard-label">City</InputLabel>
                <Select
                  margin="dense"
                  variant="standard"
                  fullWidth
                  name="city"
                  value={textValue.city}
                  label="City"
                  onChange={onInputChangeHandler}
                >
                  {jobCityData &&
                    jobCityData?.cities?.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item?.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                variant="standard"
                fullWidth
                name="description"
                value={textValue.description}
                label="Job Description"
                onChange={onInputChangeHandler}
              />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Card>
  );
};

export default FillDetails;
