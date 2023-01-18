// import React, { useState, useEffect } from 'react';
// import Button from '@mui/material/Button';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
// import TextField from '@mui/material/TextField';
// import Slide from '@mui/material/Slide';
// import Container from '@mui/material/Container';
// import Grid from '@mui/material/Grid';
// import { styled } from '@mui/material/styles';
// import ClearIcon from '@mui/icons-material/Clear';
// import Paper from '@mui/material/Paper';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { Typography, ButtonGroup } from '@mui/material';
// import InputAdornment from '@mui/material/InputAdornment';

// import Box from '@mui/material/Box';
// import { LoadingButton } from '@mui/lab';
// import { Stack } from 'immutable';
// import { IndeterminateCheckBox } from '@mui/icons-material';

// import { positions } from '@mui/system';
// import { showToast } from '../../utils/toast';
// import { useAddWebformApiMutation, useUpdateWebformMutation } from '../../redux/services/settings/WebformService';

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: 'center',
//   color: theme.palette.text.secondary,
// }));

// const WebFormsModal = (props) => {
//   // eslint-disable-next-line react/prop-types
//   const { open, handleclose, textboxlabel, loadingbtn, webFormFieldsData } = props;
//   const [AddWebform, AddWebformInfo] = useAddWebformApiMutation();
//   const [UpdateWebform, UpdateWebformInfo] = useUpdateWebformMutation();

//   const [selectedFields, setSelectedFields] = useState([]);
//   const [webFormName, setWebFormName] = useState('');

//   const modalCloseHandler = () => {
//     handleclose(false);
//   };
//   const onFieldsButtonClicked = (index) => {
//     setSelectedFields([...selectedFields, webFormFieldsData[index]]);
//     console.log('button clickedddddd', webFormFieldsData[index]);
//   };

//   const onSelectFieldClose = (index) => {
//     const newSelected = selectedFields.filter((item) => item !== selectedFields[index]);
//     setSelectedFields(newSelected);
//   };
//   const onWebFormNameInputChange = (e) => {
//     setWebFormName(e.target.value);
//   };
//   const addClickHandler = async () => {
//     await AddWebform({ name: webFormName, form: selectedFields });
//   };
//   useEffect(() => {
//     if (AddWebformInfo.isSuccess) {
//       // setModalOpen(false);
//       showToast('success', 'Webform successfully added.');
//       modalCloseHandler();
//       AddWebformInfo.reset();
//     }
//     if (AddWebformInfo.isError) {
//       showToast('error', AddWebformInfo.error.data.msg);

//       AddWebformInfo.reset();
//     }
//   }, [AddWebformInfo, modalCloseHandler]);

//   return (
//     <>
//       <Dialog
//         open={open}
//         fullWidth
//         maxWidth="lg"
//         onClose={() => {
//           handleclose(false);
//         }}
//         aria-labelledby="alertmodalCloseHandler-dialog-title"
//         aria-describedby="alert-dialog-description"
//         BackdropProps={{ style: { background: 'rgba(0, 0, 0, 0.5)' } }}
//       >
//         {/* <div> */}
//         <Container>
//           <div style={{ background: 'green' }}>
//             <DialogTitle textAlign="center">{textboxlabel}</DialogTitle>
//           </div>
//           <DialogContent>
//             <Box sx={{ flexGrow: 1 }}>
//               <Grid container>
//                 <Grid item xs={4}>
//                   <Item>
//                     {' '}
//                     <Grid item xs={12}>
//                       <Typography variant="h4" gutterBottom style={{ float: 'left', fontWeight: 'bolder' }}>
//                         Select Fields
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={12}>
//                       <Grid
//                         container
//                         style={{ overflow: 'scroll', height: '450px' }}
//                         rowSpacing={1}
//                         columnSpacing={{ xs: 1, sm: 2, md: 3 }}
//                       >
//                         {webFormFieldsData &&
//                           webFormFieldsData.map((item, index) => {
//                             return (
//                               <Grid item xs={6}>
//                                 <Item key={index}>
//                                   <Button variant="outlined" onClick={() => onFieldsButtonClicked(index)}>
//                                     {item.name}
//                                   </Button>
//                                 </Item>
//                               </Grid>
//                             );
//                           })}
//                       </Grid>
//                     </Grid>
//                   </Item>
//                 </Grid>
//                 <Grid item xs={8}>
//                   <Item>
//                     <Grid item xs={12}>
//                       <TextField
//                         autoFocus
//                         placeholder="Give name to your webform"
//                         margin="dense"
//                         variant="outlined"
//                         fullWidth
//                       />
//                     </Grid>
//                     <Grid item xs={12}>
//                       <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
//                         {selectedFields.map((item, index) => {
//                           return (
//                             <Grid item xs={6} style={{ display: 'flex', alignItems: 'center' }}>
//                               <Item>
//                                 <TextField
//                                   type={item.type}
//                                   placeholder={item.name}
//                                   margin="dense"
//                                   variant="standard"
//                                   fullWidth
//                                   disabled={'true'}
//                                   // InputProps={{
//                                   //   endAdornment: (
//                                   //     <InputAdornment>
//                                   //       <ClearIcon/>
//                                   //     </InputAdornment>
//                                   //   ),
//                                   // }}
//                                 />
//                               </Item>
//                               <Item>
//                                 <ClearIcon onClick={() => onSelectFieldClose(index)} />
//                               </Item>
//                             </Grid>
//                           );
//                         })}

//                         {/* <Grid item xs={6}>
//                             <Item>
//                               <TextField autoFocus placeholder="LastName" margin="dense" variant="standard" fullWidth />
//                             </Item>
//                           </Grid>
//                           <Grid item xs={6}>
//                             <Item>
//                               <TextField autoFocus placeholder="Email" margin="dense" variant="standard" fullWidth />
//                             </Item>
//                           </Grid>
//                           <Grid item xs={6}>
//                             <Item>
//                               <TextField placeholder="Mobile" autoFocus margin="dense" variant="standard" fullWidth />
//                             </Item>
//                           </Grid> */}
//                       </Grid>
//                     </Grid>
//                   </Item>
//                 </Grid>
//               </Grid>
//             </Box>
//           </DialogContent>

//           <div style={{ position: 'relative', background: 'deeppink' }}>
//             <DialogActions>
//               <Box>
//                 <Item>
//                   <Button onClick={modalCloseHandler} variant="outlined" style={{ marginRight: 5 }}>
//                     Cancel
//                   </Button>
//                   <LoadingButton onClick={() => addClickHandler()} variant="contained" loading={loadingbtn}>
//                     Add
//                   </LoadingButton>
//                 </Item>
//               </Box>
//             </DialogActions>
//           </div>
//         </Container>
//         {/* </div> */}
//       </Dialog>
//     </>
//   );
// };

// export default WebFormsModal;
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { LoadingButton } from '@mui/lab';
import './web_form.css'

import ClearIcon from '@mui/icons-material/Clear';
import { showToast } from '../../utils/toast';

import {
  useAddWebformApiMutation,
  useUpdateWebformMutation,
  useGetWebformDetailsQuery,
} from '../../redux/services/settings/WebformService';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const WebFormsModal = (props) => {
  // eslint-disable-next-line react/prop-types
  const { open, handleClose, textboxlabel, loadingbtn, webFormFieldsData, webFormRowEdit } = props;
  const [AddWebform, AddWebformInfo] = useAddWebformApiMutation();
  const [UpdateWebform, UpdateWebformInfo] = useUpdateWebformMutation();
  const { data: webFormDataById, isError, isLoading, refetch } = useGetWebformDetailsQuery(webFormRowEdit?.id);
  const [selectedFields, setSelectedFields] = useState([]);
  const [webFormName, setWebFormName] = useState(webFormRowEdit?.name || '');
  const [allWebFormFields, setAllWebFormFields] = useState([]);

  const modalCloseHandler = () => {
    handleClose(false);
  };
  const onFieldsButtonClicked = (dataIndex) => {
    const itemFound = selectedFields.find((item) => item.name === webFormFieldsData[dataIndex].name);
    if (!itemFound) {
      setAllWebFormFields(
        allWebFormFields.map((item, index) => {
          if (index === dataIndex) {
            return { ...item, selected: true };
          }
          return item;
        })
      );
      setSelectedFields([...selectedFields, webFormFieldsData[dataIndex]]);
    }
  };
  const onSelectFieldClose = (index) => {
    const newSelected = selectedFields.filter((item) => item !== selectedFields[index]);
    setSelectedFields(newSelected);
  };
  const onWebFormNameInputChange = (e) => {
    setWebFormName(e.target.value);
  };
  const addClickHandler = async () => {
    if (webFormRowEdit) {
      await UpdateWebform({ name: webFormName, form: selectedFields });
    } else {
      await AddWebform({ name: webFormName, form: selectedFields });
    }
  };

  useEffect(() => {
    if (AddWebformInfo.isSuccess) {
      // setModalOpen(false);
      showToast('success', 'Webform successfully added.');
      modalCloseHandler();
      AddWebformInfo.reset();
    }
    if (AddWebformInfo.isError) {
      showToast('error', AddWebformInfo.error.data.msg);

      AddWebformInfo.reset();
    }

    if (UpdateWebformInfo.isSuccess) {
      // setModalOpen(false);
      showToast('success', 'Webform updated successfully.');
      modalCloseHandler();
      UpdateWebformInfo.reset();
    }
    if (UpdateWebformInfo.isError) {
      showToast('error', UpdateWebformInfo.error.data.msg);

      UpdateWebformInfo.reset();
    }
  }, [AddWebformInfo, modalCloseHandler, UpdateWebformInfo]);
  useEffect(() => {
    console.log('edit row value', webFormRowEdit);
    if (webFormFieldsData) {
      setAllWebFormFields(
        webFormFieldsData.map((item) => {
          return { ...item, selected: false };
        })
      );
    }
  }, [webFormFieldsData]);
  useEffect(() => {
    if (webFormDataById?.data) {
      setSelectedFields(webFormDataById.data.form);
      setAllWebFormFields(
        webFormFieldsData.map((item) => {
          const foundEdit = webFormDataById.data.form.find((editRowData) => editRowData.name === item.name);
          if (foundEdit) {
            return { ...item, selected: true };
          }
          return { ...item, selected: false };
        })
      );
    }
  }, webFormDataById);
  return (
    <>
      <Dialog
        open={open}
        fullWidth
        maxWidth="md"
        onClose={() => {
          handleClose(false);
        }}
        aria-labelledby="alertmodalCloseHandler-dialog-title"
        aria-describedby="alert-dialog-description"
        BackdropProps={{ style: { background: 'rgba(0, 0, 0, 0.5)' } }}
      >
        {/* <div> */}
        <Container>
          <DialogTitle textAlign="center">{textboxlabel}</DialogTitle>

          <DialogContent dividers>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container>
                <Grid item xs={4} overflow="scroll">
                  <Item>
                    {' '}
                    <Grid item xs={12}>
                      <Typography variant="h4" style={{ float: 'left' }}>
                        Select Fields
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        {allWebFormFields &&
                          allWebFormFields.map((item, index) => (
                            <Grid item xs={6} key={`fields-${item}-${index}`}>
                              <Item>
                                <Button
                                  variant={item.selected ? 'contained' : 'outlined'}
                                  onClick={() => onFieldsButtonClicked(index)}
                                >
                                  {item.name}
                                </Button>
                              </Item>
                            </Grid>
                          ))}
                      </Grid>
                    </Grid>
                  </Item>
                </Grid>
                <Grid item xs={8}>
                  <Item>
                    <Grid item xs={12}>
                      <TextField
                        placeholder="Give name to your webform"
                        margin="dense"
                        autoFocus
                        variant="outlined"
                        fullWidth
                        value={webFormName}
                        onChange={onWebFormNameInputChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        {selectedFields &&
                          selectedFields.map((item, index) => (
                            <Grid
                              item
                              xs={6}
                              style={{ display: 'flex', alignItems: 'center' }}
                              key={`selectedfield-${item}-${index}`}
                            >
                              <Item>
                                <TextField
                                  type={item.type}
                                  placeholder={item.name}
                                  margin="dense"
                                  variant="outlined"
                                  disabled
                                  fullWidth
                                />
                              </Item>
                              <Item>
                                <ClearIcon onClick={() => onSelectFieldClose(index)} />
                              </Item>
                            </Grid>
                          ))}

                        {/* <Grid item xs={6}>
                            <Item>
                              <TextField autoFocus placeholder="LastName" margin="dense" variant="standard" fullWidth />
                            </Item>
                          </Grid>
                          <Grid item xs={6}>
                            <Item>
                              <TextField autoFocus placeholder="Email" margin="dense" variant="standard" fullWidth />
                            </Item>
                          </Grid>
                          <Grid item xs={6}>
                            <Item>
                              <TextField placeholder="Mobile" autoFocus margin="dense" variant="standard" fullWidth />
                            </Item>
                          </Grid> */}
                      </Grid>
                    </Grid>
                  </Item>
                </Grid>
              </Grid>
            </Box>
          </DialogContent>
          <DialogActions>
            <Box>
              <Button onClick={modalCloseHandler} variant="outlined" style={{ marginRight: 5 }}>
                Cancel
              </Button>
              <LoadingButton onClick={() => addClickHandler()} variant="contained" loading={loadingbtn}>
                {webFormRowEdit ? 'Update' : 'Add'}
              </LoadingButton>
            </Box>
          </DialogActions>
        </Container>
        {/* </div> */}
      </Dialog>
    </>
  );
};

export default WebFormsModal;
