import React, { useState } from 'react';
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
import Typography from '@mui/material/Typography';

const PreviewAssesment = (props) => {
  // eslint-disable-next-line react/prop-types
  const {
    open,
    handleclose,
    textboxlabel,
    addclickhandler,
    loadingbtn,
    selectedAssesmentCategory,
    assesmentName,
    questions,
  } = props;
  const modalPriviewCloseHandler = () => {
    handleclose(true);
  };

  return (
    <>
      <Dialog
        open={open}
        fullWidth
        maxWidth="lg"
        onClose={() => {
          handleclose(false);
        }}
        aria-labelledby="alertmodalCloseHandler-dialog-title"
        aria-describedby="alert-dialog-description"
        BackdropProps={{ style: { background: 'rgba(0, 0, 0, 0.5)' } }}
      >
        <div>
          <DialogTitle>Preview</DialogTitle>
          <DialogContent overflow="scroll">
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography gutterBottom>Category:{selectedAssesmentCategory}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>Name: {assesmentName}</Typography>
                </Grid>
              </Grid>
              {questions.map((question, index) => {
                return (
                  <div>
                    <Grid display={'flex'} flexDirection="row">
                      <Grid item xs={12}>
                        <Typography gutterBottom>Question {index + 1}</Typography>
                        <Typography gutterBottom>{question.question}</Typography>
                        <Typography gutterBottom>Type : {question.type}</Typography>
                        <Typography gutterBottom>Answer: {question.answer}</Typography>
                        <Typography gutterBottom>Marks: {question.marks}</Typography>
                        <Typography variant="h6">Options</Typography>
                        {question.options?.map((opt) => {
                          return <Typography gutterBottom>{opt}</Typography>;
                        })}
                      </Grid>
                    </Grid>
                  </div>
                );
              })}
            </Box>
          </DialogContent>
          <DialogActions>
            <Box>
              <LoadingButton onClick={() => modalPriviewCloseHandler()} variant="contained">
                ok
              </LoadingButton>
            </Box>
          </DialogActions>
        </div>
      </Dialog>
    </>
  );
};

export default PreviewAssesment;
