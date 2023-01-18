import React, { useState, useEffect, useMemo } from 'react';
import { toast } from 'react-toastify';
import MUIDataTable from 'mui-datatables';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { Link as RouterLink } from 'react-router-dom';
import Skeleton from '@mui/material/Skeleton';
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
  useDepartmentGetQuery,
  useAddDepartmentMutation,
  useUpdateDepartmentMutation,
  useDeleteDepartmentMutation,
} from '../../../redux/services/settings/DepartmentService';
import DataTableLazyLoading from '../../../components/lazyloading/DataTableLazyLoading';
import { showToast } from '../../../utils/toast';

// mock

const Departments = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editmodalOpen, setEditModalOpen] = useState(false);
  const { data = [], isLoading, refetch } = useDepartmentGetQuery();
  const [AddDepartment, AddDepartmentInfo] = useAddDepartmentMutation();
  const [UpdateDepartment, UpdateDepartmentInfo] = useUpdateDepartmentMutation();
  const [DeleteDepartment, DeleteDepartmentInfo] = useDeleteDepartmentMutation();
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
    if (AddDepartmentInfo.isSuccess) {
      setModalOpen(false);
      refetch();
      showToast('success', 'department successfully added.');
      setBtnLoader(false);
      AddDepartmentInfo.reset();
      setAddValue({ name: '' });
    }
    if (AddDepartmentInfo.isError) {
      showToast('error', AddDepartmentInfo.error.data.msg);
      setBtnLoader(false);
      AddDepartmentInfo.reset();
    }
    if (UpdateDepartmentInfo.isSuccess) {
      refetch();
      showToast('success', 'department successfully updated.');
      setEditModalOpen(false);
      setBtnLoader(false);
      UpdateDepartmentInfo.reset();
    }
    if (UpdateDepartmentInfo.isError) {
      showToast('error', UpdateDepartmentInfo.error.data.msg);
      setBtnLoader(false);
      UpdateDepartmentInfo.reset();
    }
  }, [
    modalOpen,
    AddDepartmentInfo,
    setModalOpen,
    refetch,
    setBtnLoader,
    setEditModalOpen,
    UpdateDepartmentInfo,
    addValue,
    setAddValue,
  ]);

  if (isLoading) {
    return <DataTableLazyLoading />;
  }
  if (DeleteDepartmentInfo.isSuccess) {
    showToast('success', 'department successfully deleted.');
    DeleteDepartmentInfo.reset();
  }
  if (DeleteDepartmentInfo.isError) {
    showToast('error', DeleteDepartmentInfo.error.data.msg);
    DeleteDepartmentInfo.reset();
  }

  const modalHandleClose = (value) => {
    setModalOpen(value);
    setEditModalOpen(value);
  };

  const addNewDepartmentHandler = () => {
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
    await DeleteDepartment(currentDataObj.id);
    refetch();
  };
  const columns = [
    {
      name: 'id',
      label: 'Department Id',
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
              loading={dataIndex === currentIndex ? DeleteDepartmentInfo.isLoading : false}
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
      await AddDepartment(addValue);
    }
  };

  const addChangeHandler = (e) => {
    setAddValue({ [e.target.name]: e.target.value });
  };
  const editChangeHandler = (e) => {
    setEditValue({ ...editValue, [e.target.name]: e.target.value });
  };
  return (
    <Page title="Department">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Departments
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="#"
            onClick={addNewDepartmentHandler}
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            New Department
          </Button>
        </Stack>

        <Card>
          <MUIDataTable title={'Department List'} data={sortedData} columns={columns} options={options} />
        </Card>
      </Container>
      <SettingsModal
        open={modalOpen}
        handleclose={modalHandleClose}
        label="Department Name"
        type="text"
        textboxlabel="Add Department"
        id="depratmentName"
        name="name"
        value={addValue.name}
        onChange={addChangeHandler}
        buttonlabel="Add Department"
        addclickhandler={addClickHandler}
        loadingbtn={btnLoader}
      />
      <SettingsModal
        open={editmodalOpen}
        handleclose={modalHandleClose}
        label="Edit Department"
        type="text"
        textboxlabel="Department Name"
        id="editDepratmentName"
        name="name"
        value={editValue.name}
        onChange={editChangeHandler}
        buttonlabel="Update Department"
        addclickhandler={addClickHandler}
        loadingbtn={btnLoader}
      />
    </Page>
  );
};

export default Departments;
