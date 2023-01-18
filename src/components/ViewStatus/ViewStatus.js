import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { LoadingButton } from '@mui/lab';
import ListItemIcon from '@mui/material';
import { useAddStatusApiMutation, useGetStatusApiQuery } from '../../redux/services/settings/StatusServices';
import { showToast } from '../../utils/toast';

const ViewStatus = (props) => {
  const { open, handleclose, currentRowValue } = props;
  const [AddSatus, AddStatusInfo] = useAddStatusApiMutation();
  const { data: statusDataByid, isError, isLoading, refetch } = useGetStatusApiQuery(currentRowValue.id);
  const [statusData, setStatusData] = useState(statusDataByid?.data?.status || ['']);
  const modalCloseHandler = () => {
    handleclose(true);
  };

  const addFormFields = () => {
    setStatusData([...statusData, '']);
  };

  const removeFormFields = (i) => {
    const newFormValues = [...statusData];
    newFormValues.splice(i, 1);
    setStatusData([...newFormValues]);
  };
  const onAddStatusTextBoxChange = (e, index) => {
    e.preventDefault();
    statusData[index] = e.target.value;
    setStatusData([...statusData]);
  };
  const addStatusData = () => {
    AddSatus({ stage: currentRowValue.id, status: statusData });
  };
  useEffect(() => {
    if (AddStatusInfo.isSuccess) {
      refetch();
      showToast('success', 'Stage Status successfully added.');
      AddStatusInfo.reset();
      setStatusData(['']);
      handleclose(true);
    }
    if (AddStatusInfo.isError) {
      showToast('error', AddStatusInfo.error.data.msg);
      AddStatusInfo.reset();
    }
  }, [AddStatusInfo, handleclose, refetch]);

  useEffect(() => {
    if (statusDataByid?.data?.status) {
      setStatusData(statusDataByid?.data?.status);
    }
  }, [statusDataByid]);
  return (
    <>
      <Dialog
        open={open}
        onClose={() => {
          handleclose(false);
        }}
        fullWidth
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Status Details'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Grid container style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Grid col-md={12}>
                <LoadingButton onClick={() => addFormFields()} variant="contained">
                  Add Status
                </LoadingButton>
              </Grid>
            </Grid>
            <Grid container>
              {statusData?.map((element, index) => (
                <>
                  <Grid item md={9} key={`text-grid-${index}`}>
                    <TextField
                      key={`text-box-${index}`}
                      id="standard-basic"
                      fullWidth
                      label="Add Status"
                      variant="standard"
                      value={element}
                      onChange={(e) => onAddStatusTextBoxChange(e, index, element)}
                    />
                  </Grid>
                  <Grid
                    item
                    md={3}
                    style={{ display: 'flex', alignItems: 'end', justifyContent: 'end' }}
                    key={`delete-${index}`}
                  >
                    {index !== 0 ? (
                      <LoadingButton onClick={() => removeFormFields(index)} variant="contained">
                        Remove
                      </LoadingButton>
                    ) : null}
                  </Grid>
                </>
              ))}
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={modalCloseHandler} autoFocus variant="outlined" style={{ marginRight: 5 }}>
            Cancel
          </Button>
          <LoadingButton onClick={addStatusData} variant="contained">
            Add
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ViewStatus;
