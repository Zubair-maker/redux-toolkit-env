import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Slide from '@mui/material/Slide';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { LoadingButton } from '@mui/lab';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { useGetStagesQuery } from '../../redux/services/settings/StageService';

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
const PipelineModel = (props) => {
  const { open, handleclose, textboxlabel, loadingbtn, formstagedata, onsubmit, type } = props;

  const theme = useTheme();
  const [stageData, setStageData] = useState([]);
  const [stageTextValue, setStageTextValue] = useState(formstagedata);
  // console.log('stagetext', formStageData);
  const { data: stageApiData } = useGetStagesQuery();
  const [stageId, setStagetId] = useState(null);

  const stageResponse = stageApiData?.data;

  useEffect(() => {
    if (formstagedata?.id) {
      const stageArr = stageResponse;
      const foundStage = stageArr?.find((stageFound) => stageFound?.formstagedata?.stage);
      setStagetId(foundStage?.id);
      setStageTextValue({
        ...formstagedata,
        stage: foundStage.id,
      });
    } else {
      setStageTextValue(formstagedata);
      setStagetId(null);
    }
  }, [formstagedata, type, stageResponse]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setStageData(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
    setStageTextValue({ ...stageTextValue, fileds: typeof value === 'string' ? value.split(',') : value });
    // console.log('value', value);
    // console.log('split value', typeof value === 'string' ? value.split(',') : value);
  };

  // eslint-disable-next-line react/prop-types

  const modalCloseHandler = () => {
    handleclose(true);
  };

  const addclickhandler = () => {
    onsubmit(stageTextValue);
  };

  const onInputChangeHandler = (e) => {
    setStageTextValue({ ...stageTextValue, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Dialog
        open={open}
        fullWidth
        maxWidth="xs"
        onClose={() => {
          handleclose(false);
        }}
        aria-labelledby="alertmodalCloseHandler-dialog-title"
        aria-describedby="alert-dialog-description"
        BackdropProps={{ style: { background: 'rgba(0, 0, 0, 0.5)' } }}
      >
        <div>
          <DialogTitle>{textboxlabel}</DialogTitle>
          <DialogContent>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2} mt={1}>
                <Grid item xs={12}>
                  <TextField
                    id="pipeline"
                    label="Pipleline Name"
                    variant="outlined"
                    fullWidth
                    onChange={onInputChangeHandler}
                  />
                </Grid>
              </Grid>
            </Box>
            <Box>
              {/* {console.log('stageData', stageData)} */}
              <FormControl sx={{ mt: 5, width: 390 }}>
                <InputLabel id="Stage label">Add Pipeline Satges</InputLabel>
                <Select
                  labelId="Stage label"
                  id="stage"
                  name="stage"
                  multiple
                  fullWidth
                  value={stageData}
                  onChange={handleChange}
                  input={<OutlinedInput id="select-multiple-chip" label="Add Pipeline filed" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected?.length > 0 && selected?.map((value) => <Chip key={value} label={value} />)}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {stageResponse?.length > 0 &&
                    stageResponse?.map((value) => (
                      <MenuItem key={value.name} value={value.name}>
                        {value.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions>
            <Box>
              <Button onClick={modalCloseHandler} autoFocus variant="outlined" style={{ marginRight: 5 }}>
                Cancel
              </Button>
              <LoadingButton onClick={() => addclickhandler()} variant="contained" loading={loadingbtn}>
                Add
              </LoadingButton>
            </Box>
          </DialogActions>
        </div>
      </Dialog>
    </>
  );
};

export default PipelineModel;
