import React, { useState, useMemo, useEffect } from 'react';
import MUIDataTable from 'mui-datatables';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { Link as RouterLink } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';

// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  ListItemIcon,
} from '@mui/material';

import { sortedDataFn } from '../../../utils/getSortedData';
import { showToast } from '../../../utils/toast';
import {
  useGetPipelineQuery,
  useDeletePipelineApiMutation,
  useAddPipelineApiMutation,
  useUpdatePipelineApiMutation,
} from '../../../redux/services/settings/PipelineService';
// components
import PipelineModel from '../../../components/settings/pipelineModel';
import Page from '../../../components/Page';
import Label from '../../../components/Label';
import Iconify from '../../../components/Iconify';
// mock
const Pipelines = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [editmodalOpen, setEditModalOpen] = useState(false);
  const { data = [], isLoading, refetch } = useGetPipelineQuery();
  const [AddPipelineApi, AddPipelineApiInfo] = useAddPipelineApiMutation();
  const [UpdatePipelineApi, UpdatePipelineApiInfo] = useUpdatePipelineApiMutation();
  const [DeletePipelineApi, DeletePipelineInfo] = useDeletePipelineApiMutation();
  const [modalType, setModalType] = useState('Add');
  const [stageApidata, setStageApidata] = useState({
    name: '',
    fileds: [],
  });
  const [editValue, setEditValue] = useState({
    id: undefined,
    name: '',
    fileds: [],
  });

  const modalHandleClose = (value) => {
    console.log('value', value);
    setModalOpen(value);
    setEditModalOpen(value);
  };

  const sortData = useMemo(() => {
    const sortresult = sortedDataFn(data.data);
    return sortresult;
  }, [data]);

  const addNewPipelineHandler = () => {
    setModalOpen(true);
    setModalType('Add');
    setStageApidata({
      id: null,
      name: '',
      fileds: [],
    });
  };
  const onEditModalHandler = (index) => {
    const dataArr = sortData;
    const curentObj = dataArr[index];
    setEditValue(curentObj);
    console.log('editValue', editValue);
    setStageApidata({
      name: curentObj.name,
      fileds: curentObj.fileds,
    });
    setModalType('Update');
    setModalOpen(true);
  };
  const onSubmitHandler = async (value) => {
    if (modalType === 'Add') {
      console.log('value', value);
      const data = {
        name: value.name,
        fields: value.fileds,
      };
      await AddPipelineApi(data);
    }
  };

  const onDeleteHandler = async (dataIndex) => {
    setCurrentIndex(dataIndex);
    const dataArr = sortData;
    const currentDataObj = dataArr[dataIndex];
    await DeletePipelineApi(currentDataObj.id);
  };
  if (DeletePipelineInfo.isSuccess) {
    showToast('success', DeletePipelineInfo.data.msg);
    DeletePipelineInfo.reset();
    refetch();
  }
  if (DeletePipelineInfo.isError) {
    showToast('error', DeletePipelineInfo.error.data.msg);
    DeletePipelineInfo.reset();
    refetch();
  }

  useEffect(() => {
    if (AddPipelineApiInfo.isSuccess) {
      showToast('success', AddPipelineApiInfo.data.msg);
      setModalOpen(false);
      refetch();
      AddPipelineApiInfo.reset();
    }
    if (AddPipelineApiInfo.isError) {
      showToast('error', AddPipelineApiInfo.error.data.msg);
      AddPipelineApi.reset();
    }
  }, [AddPipelineApiInfo]);

  const columns = [
    {
      name: 'id',
      label: 'Id',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'name',
      label: 'Name',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'action',
      label: 'Action',
      options: {
        filter: false,
        sort: false,
        customBodyRenderLite: (dataIndex) => (
          <>
            <Button style={{ minWidth: 0 }} variant="contained" onClick={() => onEditModalHandler(dataIndex)}>
              <ListItemIcon style={{ color: '#fff', padding: '0px', minWidth: 0 }}>
                <Iconify icon="ep:edit" width={24} height={24} />
              </ListItemIcon>
            </Button>
            <LoadingButton
              style={{ minWidth: 0, margin: '0px 5px' }}
              variant="contained"
              color="error"
              onClick={() => onDeleteHandler(dataIndex)}
            >
              <ListItemIcon style={{ color: '#fff', padding: '0px', minWidth: 0 }}>
                <Iconify icon="eva:trash-2-outline" width={24} height={24} />
              </ListItemIcon>
            </LoadingButton>
          </>
        ),
      },
    },
  ];
  const labelStatus = (
    <Label variant="ghost" color={'success'}>
      {sentenceCase('active')}
    </Label>
  );
  const editAndDeleteButton = (
    <>
      <Button onClick={onEditModalHandler}>
        <ListItemIcon style={{ justifyContent: 'center' }}>
          <Iconify icon="eva:edit-fill" width={24} height={24} />
        </ListItemIcon>
      </Button>
      <Button>
        <ListItemIcon style={{ justifyContent: 'center' }}>
          <Iconify icon="eva:trash-2-outline" width={24} height={24} />
        </ListItemIcon>
      </Button>
    </>
  );
  const options = {
    filterType: 'dropdown',
  };

  return (
    <Page title="User">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Pipelines
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="#"
            onClick={addNewPipelineHandler}
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            New Pipeline
          </Button>
        </Stack>

        <Card>
          <MUIDataTable title={'Pipeline List'} data={sortData} columns={columns} options={options} />
        </Card>
      </Container>
      <PipelineModel
        open={modalOpen}
        handleClose={modalHandleClose}
        textBoxLabel="Add Pipeline Name"
        id="pipelineName"
        name="pipeline"
        buttonLabel="Add Pipeline"
        onsubmit={onSubmitHandler}
        type={modalType}
        formstagedata={stageApidata}
      />
      <PipelineModel
        open={editmodalOpen}
        handleClose={modalHandleClose}
        textBoxLabel="Update Pipeline Name"
        value={editValue.name}
        id="pipelineName"
        name="pipeline"
        buttonLabel="Add Pipeline"
        onsubmit={onSubmitHandler}
        type={modalType}
        formstagedata={stageApidata}
      />
    </Page>
  );
};

export default Pipelines;
