import React, { useState, useEffect, useMemo } from 'react';
import MUIDataTable from 'mui-datatables';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Card, Stack, Button, Container, Typography, ListItemIcon } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
// eslint-disable-next-line import/no-unresolved
import { sortedDataFn } from 'src/utils/getSortedData';
import SettingsModal from '../../../components/settings/SettingsModal';
import Page from '../../../components/Page';
import Label from '../../../components/Label';
import Iconify from '../../../components/Iconify';
// eslint-disable-next-line import/named
import {
  useDesignationGetQuery,
  useAddDesignationMutation,
  useUpdateDesignationMutation,
  useDeleteDesignationMutation,
} from '../../../redux/services/settings/DesignationService';
import DataTableLazyLoading from '../../../components/lazyloading/DataTableLazyLoading';
import { showToast } from '../../../utils/toast';
// mock

const Designations = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editmodalOpen, setEditModalOpen] = useState(false);
  const { data = [], isLoading, refetch } = useDesignationGetQuery();
  const [AddDesignation, AddDesignationInfo] = useAddDesignationMutation();
  const [UpdateDesignation, UpdateDesignationInfo] = useUpdateDesignationMutation();
  const [DeleteDesignation, DeleteDesignationInfo] = useDeleteDesignationMutation();
  const [currentIndex, setCurrentIndex] = useState(null);
  const [btnLoader, setBtnLoader] = useState(false);

  const [addValue, setAddValue] = useState({
    name: '',
  });

  const [editValue, setEditValue] = useState({
    id: undefined,
    name: '',
  });
  const [modalName, setModalName] = useState('add');

  const sortedData = useMemo(() => {
    const result = sortedDataFn(data.data);
    return result;
  }, [data]);

  useEffect(() => {
    if (AddDesignationInfo.isSuccess) {
      setModalOpen(false);
      refetch();
      showToast('success', 'designation successfully added.');
      setBtnLoader(false);
      setAddValue({ name: '' });
      AddDesignationInfo.reset();
    }
    if (AddDesignationInfo.isError) {
      showToast('error', AddDesignationInfo.error.data.msg);
      AddDesignationInfo.reset();
    }
    if (UpdateDesignationInfo.isSuccess) {
      refetch();
      showToast('success', 'designation successfully updated.');
      setEditModalOpen(false);
      setBtnLoader(false);
      UpdateDesignationInfo.reset();
    }
    if (UpdateDesignationInfo.isError) {
      showToast('error', UpdateDesignationInfo.error.data.msg);
      setBtnLoader(false);
      UpdateDesignationInfo.reset();
    }
  }, [setBtnLoader, AddDesignationInfo, UpdateDesignationInfo]);

  if (isLoading) {
    return <DataTableLazyLoading />;
  }
  if (DeleteDesignationInfo.isSuccess) {
    showToast('success', 'department successfully deleted.');
    DeleteDesignationInfo.reset();
  }
  if (DeleteDesignationInfo.isError) {
    showToast('error', DeleteDesignationInfo.error.data.msg);
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks

  const modalHandleClose = (value) => {
    setModalOpen(value);
    setEditModalOpen(value);
  };

  const addNewDesignationHandler = () => {
    setModalOpen(true);
    setModalName('Add');
  };

  const onEditModalHandler = (dataIndex) => {
    const dataArr = sortedData;
    const currentDataObj = dataArr[dataIndex];
    setEditValue(currentDataObj);
    setEditModalOpen(true);
    setModalName('Edit');
  };

  const onDeleteHandler = async (dataIndex) => {
    setCurrentIndex(dataIndex);
    const dataArr = sortedData;
    const currentDataObj = dataArr[dataIndex];
    await DeleteDesignation(currentDataObj.id);
    refetch();
  };
  const columns = [
    {
      name: 'id',
      label: 'Designation Id',
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
              loading={dataIndex === currentIndex ? DeleteDesignationInfo.isLoading : false}
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

  const options = {
    filterType: 'dropdown',
  };

  const addClickHandler = async () => {
    setBtnLoader(true);
    if (modalName === 'Add') {
      await AddDesignation(addValue);
    } else {
      await UpdateDesignation(editValue);
    }
  };

  const addChangeHandler = (e) => {
    setAddValue({ [e.target.name]: e.target.value });
  };

  const editChangeHandler = (e) => {
    setEditValue({ ...editValue, [e.target.name]: e.target.value });
  };

  return (
    <Page title="User">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Designations
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="#"
            onClick={addNewDesignationHandler}
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            New Designation
          </Button>
        </Stack>

        <Card>
          <MUIDataTable title={'Designation List'} data={sortedData} columns={columns} options={options} />
        </Card>
      </Container>
      <SettingsModal
        open={modalOpen}
        handleclose={modalHandleClose}
        label="Designation Name"
        type="text"
        textboxlabel="Add Designation"
        id="designationName"
        name="name"
        value={addValue.name}
        onChange={addChangeHandler}
        buttonlabel="Add Designation"
        addclickhandler={addClickHandler}
        loadingbtn={btnLoader}
      />
      <SettingsModal
        open={editmodalOpen}
        handleclose={modalHandleClose}
        label="Edit Designation"
        type="text"
        textboxlabel="Designation Name"
        id="editDesignationName"
        name="name"
        value={editValue.name}
        onChange={editChangeHandler}
        buttonlabel="Update Designation"
        addclickhandler={addClickHandler}
        loadingbtn={btnLoader}
      />
    </Page>
  );
};

export default Designations;
