import React, { useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Link as RouterLink, useParams } from 'react-router-dom';

import Grid from '@mui/material/Grid';

// material
import { Card, Button, Container, Typography, FormControl, Select, MenuItem, InputLabel } from '@mui/material';
import TextField from '@mui/material/TextField';
import PreviewAssesment from './PreviewAssesment';
import { showToast } from '../../../utils/toast';

import { useAddAssesmentMutation } from '../../../redux/services/main/AssesmentService';
import {
  useGetAssesmentQuestionsQuery,
  useAddAssesmentQuestionsMutation,
  useDeleteAssesmentQuestionsMutation,
} from '../../../redux/services/main/AssesmentQuestionsService';
import { useGetAssesmentCategoryQuery } from '../../../redux/services/main/AssesmentCatagoriesservice';

const CreateAssessment = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { assessmentEditId } = useParams();
  const { data: assesmentCategoryData } = useGetAssesmentCategoryQuery();
  const { data: assesmentQuestionsData, refetch } = useGetAssesmentQuestionsQuery(assessmentEditId);
  const [addAssesmentQuestions, addAssesmentQuestionsInfo] = useAddAssesmentQuestionsMutation();
  const [deleteAssesmentQuestions] = useDeleteAssesmentQuestionsMutation();
  // const [textAssesmentQuestions, textAssesmentQuestionsInfo] = useTextAssesmentQuestionsMutation();
  // const [selectAssesmentQuestions, selectAssesmentQuestionsInfo] = useSelectAssesmentQuestionsMutation();
  // const [checkAssesmentQuestions, checkAssesmentQuestionsInfo] = useCheckAssesmentQuestionsMutation();
  const [addAssesment, addAssesmentInfo] = useAddAssesmentMutation();
  const [currentSelectedType, setCurrentSelectedType] = useState('');
  const [assesmentName, setAssesmentName] = useState(
    assessmentEditId && assesmentQuestionsData ? assesmentQuestionsData.assesment.name : ''
  );
  const [selectedAssesmentCategory, setSelectedAssesmentCategory] = useState(
    assessmentEditId && assesmentQuestionsData ? assesmentQuestionsData.assesment.categpry_id : ''
  );
  const [assesmentId, setAssesmentId] = useState(assessmentEditId);

  const [questions, setQuestions] = useState(
    assessmentEditId && assesmentQuestionsData ? assesmentQuestionsData.questions : []
  );
  const onPreviewModalOpen = () => {
    setModalOpen(true);
  };
  const onPreviewModalClose = () => {
    setModalOpen(false);
  };
  const onAssesmentNameInputChangeHandler = (e) => {
    e.preventDefault();
    setAssesmentName(e.target.value);
  };
  const onAssesmentCategoryChangeHandler = (e) => {
    e.preventDefault();
    setSelectedAssesmentCategory(e.target.value);
  };
  const onAssesmentQuestionNameInputChangeHandler = (e, questionIndex) => {
    e.preventDefault();
    questions[questionIndex].question = e.target.value;
    setQuestions([...questions]);
  };
  const onAssesmentOptionInputChangeHandler = (e, optIndex, questionIndex) => {
    e.preventDefault();
    questions[questionIndex].options[optIndex] = e.target.value;
    setQuestions([...questions]);
  };
  const onAssesmentMarksInputChangeHandler = (e, questionIndex) => {
    e.preventDefault();
    questions[questionIndex].marks = parseInt(e.target.value, 10);
    setQuestions([...questions]);
  };
  const onAssesmentAnswerInputChangeHandler = (e, questionIndex) => {
    e.preventDefault();
    questions[questionIndex].answer = parseInt(e.target.value, 10);
    setQuestions([...questions]);
  };
  // const isValidateAddQuestion = (questionObj) => {
  //   let status = true;
  //   if (questionObj.type === 'T') {
  //     if (questionObj.question === '' && questionObj.marks === null) {
  //       status = false;
  //       showToast('error', 'Question Name and Marks are required fields.');
  //     } else if (questionObj.question === '') {
  //       showToast('error', 'Enter Question');
  //       status = false;
  //     } else if (questionObj.marks === null) {
  //       showToast('error', 'Enter Marks');
  //       status = false;
  //     }
  //   } else if (questionObj.type === 'S' || questionObj.type === 'C' || questionObj.type === 'R') {
  //     if (questionObj.question === '' && questionObj.marks === null) {
  //       status = false;
  //       showToast('error', 'Question Name and Marks are required fields.');
  //     } else if (questionObj.question === '') {
  //       showToast('error', 'Enter Question');
  //       status = false;
  //     } else if (questionObj.marks === null) {
  //       showToast('error', 'Enter Marks');
  //       status = false;
  //     } else if (questionObj.type === 'S' || questionObj.type === 'R' && questionObj.answer === null) {
  //       showToast('error', 'Enter Answer');
  //       status = false;
  //     }
  //   }
  //   return status;
  // };
  const onQuestionDoneClicked = async (questionIndex) => {
    // if (isValidateAddQuestion(questions[questionIndex])) {
    //   // if (!assesmentId) {
    //   //   // await addAssesment({
    //   //   //   category: selectedAssesmentCategory,
    //   //   //   name: assesmentName,
    //   //   // });
    //   // }
      await addAssesmentQuestions(questions[questionIndex]);
    
  };
  const addOptionsSelection = (questionIndex, optIndex) => {
    questions[questionIndex].options = [...questions[questionIndex].options, `Option ${optIndex + 2}`];
    setQuestions([...questions]);
  };
  const onCloseQuestionDeleteHandler = async (questionIndex) => {
    if (questions[questionIndex].id) {
      await deleteAssesmentQuestions(questions[questionIndex].id);
    }
    const newSelected = questions.filter((item) => item !== questions[questionIndex]);
    setQuestions(newSelected);
  };

  const onSelectedQuestionTypeClicked = (type) => {
    setCurrentSelectedType(type);
    switch (type) {
      case 'S':
        setQuestions([
          ...questions,
          {
            assesment: assesmentId,
            type: 'S',
            question: '',
            options: ['Option 1', 'Option 2'],
            marks: null,
            answer: null,
          },
        ]);
        break;
      case 'T':
        setQuestions([
          ...questions,
          {
            assesment: assesmentId,
            type: 'T',
            question: '',

            marks: null,
          },
        ]);
        break;
      case 'C':
        setQuestions([
          ...questions,
          {
            assesment: assesmentId,
            type: 'C',
            question: '',
            options: ['Option 1', 'Option 2'],
            marks: null,
          },
        ]);
        break;
      case 'R':
        setQuestions([
          ...questions,
          {
            assesment: assesmentId,
            type: 'R',
            question: '',
            options: ['Option 1', 'Option 2'],
            marks: null,
            answer: null,
          },
        ]);
        break;

      default:
        break;
    }
  };

  const isValidateSaveAssesment = () => {
    let status = true;
    if (selectedAssesmentCategory === undefined || selectedAssesmentCategory === '') {
      status = false;
      showToast('error', 'Select Catgegory');
    } else if (assesmentName === undefined || assesmentName === '') {
      status = false;
      showToast('error', 'Enter Assestment Name');
    }
    return status;
  };

  const onAssesmentSaveClick = async () => {
    if (isValidateSaveAssesment()) {
      await addAssesment({
        category: selectedAssesmentCategory,
        name: assesmentName,
      });
    }
  };
  useEffect(() => {
    if (assesmentQuestionsData) {
      setQuestions(assesmentQuestionsData.questions);
      setSelectedAssesmentCategory(assesmentQuestionsData.assesment.categpry_id);
      setAssesmentName(assesmentQuestionsData.assesment.name);
    }
  }, [assesmentQuestionsData]);
  useEffect(() => {
    if (assessmentEditId) {
      refetch();
    }
  }, [assessmentEditId, refetch]);
  useEffect(() => {
    if (addAssesmentInfo.isSuccess) {
      showToast('success', 'Assesment Saved Sucessfully');
      const savedAssesmentRecord = addAssesmentInfo.data.data.find((item) => item.name === assesmentName);
      setAssesmentId(savedAssesmentRecord.id);
      addAssesmentInfo.reset();
    } 
    if (addAssesmentInfo.isError) {
      showToast('error', addAssesmentInfo.error.data.msg);
      addAssesmentInfo.reset();
    }
    if (addAssesmentQuestionsInfo.isSuccess) {
      showToast('success', 'Assesment Question Saved Sucessfully');
      console.log('added assesments question', addAssesmentQuestionsInfo.data);
      setQuestions(addAssesmentQuestionsInfo.data.questions);
      addAssesmentQuestionsInfo.reset();
    }
    if (addAssesmentQuestionsInfo.isError) {
      showToast('error', addAssesmentQuestionsInfo.error.data.msg);
      addAssesmentQuestionsInfo.reset();
    }
  }, [addAssesmentInfo, addAssesmentQuestionsInfo, assesmentName]);

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
            <Typography variant="h4" gutterBottom />
            {assessmentEditId ? 'Edit' : 'Create'} an Assessment
          </Grid>
        </Grid>
        <Grid item xs={6} display="flex" justifyContent="right">
          <Grid style={{ marginRight: 5 }}>
            <Button variant="contained" onClick={onAssesmentSaveClick}>
              Save
            </Button>
          </Grid>
          <Grid style={{ marginRight: 5 }}>
            <Button variant="contained" onClick={onPreviewModalOpen}>
              Preview
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Container>
        <Grid container spacing={2} component="form">
          <Grid item xs={6}>
            <Card variant="outlined" style={{ padding: 20 }}>
              <Grid item xs={12} style={{ marginBottom: 20 }}>
                <FormControl variant="standard" sx={{ mt: 1, minWidth: '100%' }}>
                  <InputLabel id="demo-simple-select-standard-label">Assesment Category</InputLabel>
                  <Select
                    required
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={selectedAssesmentCategory}
                    onChange={onAssesmentCategoryChangeHandler}
                    label="Assesment"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {assesmentCategoryData &&
                      assesmentCategoryData?.data?.map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                          {item?.name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} display="flex" style={{ margin: 20 }}>
                <Grid item xs={12} style={{ justifyContent: 'right' }}>
                  <Typography variant="h5" gutterBottom>
                    Select Questions Types
                  </Typography>
                </Grid>
              </Grid>
              <Grid item display={'flex'} xs={12} alignItems="center">
                <Grid item xs={8} style={{ margin: '10px' }}>
                  <Typography>Multiple Choices Questions</Typography>
                </Grid>
                <Grid item xs={4} style={{ margin: '10px' }}>
                  <Button variant="contained" value="R" onClick={() => onSelectedQuestionTypeClicked('R')}>
                    {' '}
                    Add
                  </Button>
                </Grid>
              </Grid>
              <Grid item display={'flex'} xs={12} alignItems="center">
                <Grid item xs={8} style={{ margin: '10px' }}>
                  <Typography>Multiple CheckBoxes</Typography>
                </Grid>

                <Grid item xs={4} style={{ margin: '10px' }}>
                  <Button variant="contained" value="C" onClick={() => onSelectedQuestionTypeClicked('C')}>
                    {' '}
                    Add
                  </Button>
                </Grid>
              </Grid>

              <Grid item display={'flex'} xs={12} alignItems="center">
                <Grid item xs={8} style={{ margin: '10px' }}>
                  <Typography>Dropdown</Typography>
                </Grid>

                <Grid item xs={4} style={{ margin: '10px' }}>
                  <Button variant="contained" value="S" onClick={() => onSelectedQuestionTypeClicked('S')}>
                    {' '}
                    Add
                  </Button>
                </Grid>
              </Grid>

              <Grid item display={'flex'} xs={12} alignItems="center">
                <Grid item xs={8} style={{ margin: '10px' }}>
                  <Typography>Text Paragraph</Typography>
                </Grid>
                <Grid item xs={4} style={{ margin: '10px' }}>
                  <Button variant="contained" value="T" onClick={() => onSelectedQuestionTypeClicked('T')}>
                    Add
                  </Button>
                </Grid>
              </Grid>
            </Card>
          </Grid>

          <Grid item xs={6}>
            <Card variant="outlined" style={{ padding: 20 }}>
              <Grid item xs={12} style={{ marginBottom: 20 }}>
                <TextField
                  required
                  autoFocus
                  margin="dense"
                  variant="standard"
                  placeholder="Enter Assesment Name"
                  fullWidth
                  name="aasesmentName"
                  value={assesmentName}
                  label="Give Name to Your Assessment"
                  onChange={onAssesmentNameInputChangeHandler}
                />
              </Grid>
              {questions.map((item, index) =>
                currentSelectedType === 'T' && item.type === 'T' ? (
                  <Grid key={`text-${index}`} item xs={12} style={{ margin: 15 }}>
                    <Grid display="flex" item xs={12}>
                      <Grid item xs={11}>
                        <Typography variant="h5" gutterBottom>
                          Question {index + 1} : Text Question
                        </Typography>
                      </Grid>
                      <Grid item xs={1}>
                        <Button style={{ color: 'red' }} onClick={() => onCloseQuestionDeleteHandler(index)}>
                          &#10005;
                        </Button>
                      </Grid>
                    </Grid>
                    <Grid item xs={11}>
                      <TextField
                        required
                        autoFocus
                        margin="dense"
                        variant="standard"
                        placeholder="Enter Your Question"
                        fullWidth
                        name="question"
                        value={item.question}
                        onChange={(e) => onAssesmentQuestionNameInputChangeHandler(e, index)}
                        label="Enter Your Question"
                      />
                    </Grid>

                    <Grid item xs={5}>
                      <TextField
                        required="true"
                        autoFocus
                        margin="dense"
                        variant="standard"
                        placeholder="Enter Marks"
                        fullWidth
                        name="Marks"
                        value={item.marks}
                        onChange={(e) => onAssesmentMarksInputChangeHandler(e, index)}
                        label="Marks"
                        type="number"
                      />
                    </Grid>
                    <Grid display="flex" alignItems="center" justifyContent="right" style={{ marginRight: 5 }}>
                      <Button
                        variant="contained"
                        component={RouterLink}
                        to="#"
                        onClick={() => onQuestionDoneClicked(index)}
                      >
                        DONE
                      </Button>
                    </Grid>
                  </Grid>
                ) : (
                  <div>
                    {(currentSelectedType === 'S' && item.type === 'S') ||
                    (currentSelectedType === 'C' && item.type === 'C') ||
                    (currentSelectedType === 'R' && item.type === 'R') ? (
                      <div key={`multiple-${index}`}>
                        <Grid item xs={12} style={{ margin: 15 }}>
                          <Grid display="flex" item xs={12}>
                            <Grid item xs={11}>
                              <Typography variant="h6" gutterBottom>
                                Question {index + 1} : Multiple Choice Question
                              </Typography>
                            </Grid>
                            <Grid item xs={1}>
                              <Button style={{ color: 'red' }} onClick={() => onCloseQuestionDeleteHandler(index)}>
                                &#10005;
                              </Button>
                            </Grid>
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              required
                              autoFocus
                              margin="dense"
                              variant="standard"
                              placeholder="Enter Your Question"
                              fullWidth
                              name="question"
                              value={item.question}
                              onChange={(e) => onAssesmentQuestionNameInputChangeHandler(e, index)}
                              label="Enter Your Question"
                            />
                          </Grid>

                          {item.options.map((opt, optIndex) => (
                            <Grid key={`options-${optIndex}`} display="flex" alignItems="end" item xs={12}>
                              <Grid item xs={11}>
                                <TextField
                                  required
                                  autoFocus
                                  margin="dense"
                                  variant="standard"
                                  placeholder={`Enter Option ${optIndex + 1}`}
                                  fullWidth
                                  name={opt}
                                  value={opt}
                                  onChange={(e) => onAssesmentOptionInputChangeHandler(e, optIndex, index)}
                                  label={`Option ${optIndex + 1}`}
                                />
                              </Grid>
                              {item.options.length === optIndex + 1 && (
                                <Grid item xs={1}>
                                  <Button onClick={() => addOptionsSelection(index, optIndex)}>&#10010;</Button>
                                </Grid>
                              )}
                            </Grid>
                          ))}
                        </Grid>

                        <Grid item xs={12} style={{ margin: 15 }}>
                          <Grid item display={'flex'} xs={12}>
                            <Grid item xs={5} style={{ margin: '10px' }}>
                              <TextField
                                required
                                autoFocus
                                margin="dense"
                                variant="standard"
                                placeholder="Enter Marks"
                                fullWidth
                                name="Marks"
                                value={item.marks}
                                onChange={(e) => onAssesmentMarksInputChangeHandler(e, index)}
                                label="Marks"
                                type="number"
                              />
                            </Grid>

                            {currentSelectedType === 'S' || currentSelectedType === 'R' ? (
                              <>
                                <Grid item xs={5} style={{ margin: '10px' }}>
                                  <TextField
                                    required
                                    autoFocus
                                    margin="dense"
                                    variant="standard"
                                    placeholder="Enter Answer"
                                    fullWidth
                                    name="Answer"
                                    type='number'
                                    value={item.answer}
                                    onChange={(e) => onAssesmentAnswerInputChangeHandler(e, index)}
                                    label="Answer"
                                  />
                                </Grid>
                              </>
                            ) : (
                              ''
                            )}
                          </Grid>
                        </Grid>
                        <Grid display="flex" alignItems="center" justifyContent="right" style={{ marginRight: 5 }}>
                          <Button
                            variant="contained"
                            component={RouterLink}
                            to="#"
                            onClick={() => onQuestionDoneClicked(index)}
                          >
                            DONE
                          </Button>
                        </Grid>
                      </div>
                    ) : (
                      ''
                    )}
                  </div>
                )
              )}
            </Card>
          </Grid>
        </Grid>
      </Container>
      {modalOpen && (
        <PreviewAssesment
          open={modalOpen}
          selectedAssesmentCategory={selectedAssesmentCategory}
          assesmentName={assesmentName}
          questions={questions}
          handleclose={onPreviewModalClose}
          label="Email Category Name"
          type="Add"
          textboxlabel="Add category"
          id="categoryName"
          name="name"
          // onChange={addChangeHandler}
          buttonlabel="Add Email category"
          // addclickhandler={addClickHandler}
          // loadingbtn={btnLoader}
        />
      )}
    </>
  );
};

export default CreateAssessment;
