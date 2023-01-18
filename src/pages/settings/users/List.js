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
  Tooltip,
} from '@mui/material';
// eslint-disable-next-line import/no-unresolved
import { sortedDataFn } from 'src/utils/getSortedData';
// components
import UserModalList from '../../../components/users/UsersModalList';
import userViewModel from '../../../components/users/userViewModel';
import Page from '../../../components/Page';
import Label from '../../../components/Label';
import Iconify from '../../../components/Iconify';
import {
  useGetUsersApiQuery,
  useAddUserApiMutation,
  useUpdateUserApiMutation,
  useDeleteUserApiMutation,
  useActivateDeactivateUserApiMutation,
} from '../../../redux/services/settings/UserService';
import DataTableLazyLoading from '../../../components/lazyloading/DataTableLazyLoading';
import { showToast } from '../../../utils/toast';
import SwitchButton from '../../../components/SwitchButton/SwitchButton';

// mock

const List = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [viewModelOpen, setViewModelOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const { data = [], isLoading, refetch } = useGetUsersApiQuery();
  const [AddUserApi, AddUserApiInfo] = useAddUserApiMutation();
  const [UpdateUserApi, UpdateUserApiInfo] = useUpdateUserApiMutation();
  const [DeleteUserApi, DeleteUserApiInfo] = useDeleteUserApiMutation();
  const [ActivateDeactivateApi, ActivateDeactivateApiInfo] = useActivateDeactivateUserApiMutation();
  const [modalType, setModalType] = useState('Add');

  const [apiData, setApiData] = useState({
    account_id: null,
    first_name: '',
    last_name: '',
    email: '',
    mobile: '',
    department: '',
    designation: '',
    role: '',
    email_desable: false,
    photo: null,
  });

  useEffect(() => {
    if (AddUserApiInfo.isSuccess) {
      setModalOpen(false);
      refetch();
      showToast('success', AddUserApiInfo.data.msg);
      AddUserApiInfo.reset();
    }
    if (UpdateUserApiInfo.isSuccess) {
      refetch();
      setModalOpen(false);
      showToast('success', UpdateUserApiInfo.data.msg);
      UpdateUserApiInfo.reset();
    }
    if (UpdateUserApiInfo.isError) {
      showToast('error', UpdateUserApiInfo.error.data.msg);
      UpdateUserApiInfo.reset();
    }
  }, [AddUserApiInfo, UpdateUserApiInfo]);

  const sortedData = useMemo(() => {
    const result = sortedDataFn(data.list);
    return result;
  }, [data]);

  if (isLoading) {
    return <DataTableLazyLoading />;
  }

  const modalHandleClose = (value) => {
    setModalOpen(value);
  };

  const addNewListHandler = () => {
    setModalType('Add');
    setApiData({
      account_id: null,
      first_name: '',
      last_name: '',
      email: '',
      mobile: '',
      department: '',
      designation: '',
      role: '',
      email_desable: false,
    });
    setModalOpen(true);
  };

  const onEditModalHandler = (index) => {
    const dataArr = sortedData;
    const currentObj = dataArr[index];
    setApiData({
      account_id: currentObj.account_id,
      first_name: currentObj.first_name,
      last_name: currentObj.last_name,
      email: currentObj.email,
      mobile: currentObj.mobile,
      department: currentObj.department,
      designation: currentObj.designation,
      role: currentObj.role,
      email_desable: true,
      photo: currentObj.photo,
    });
    setModalType('Update');
    setModalOpen(true);
  };

  console.log('model open', viewModelOpen);

  const onViewHandler = () => {
    setViewModelOpen(true);
  };

  const columns = [
    {
      name: 'first_name',
      label: 'Name',
      options: {
        filter: true,
        sort: true,
        setCellProps: () => ({ style: { maxWidth: '250px', cursor: 'pointer' } }),
      },
    },
    {
      name: 'email',
      label: 'Email',
      options: {
        filter: true,
        sort: true,
        setCellProps: () => ({ style: { maxWidth: '250px' } }),
      },
    },
    {
      name: 'phone',
      label: 'Contact Number',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'department',
      label: 'Department',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'is_active',
      label: 'Status',
      options: {
        filter: false,
        sort: false,
        customBodyRenderLite: (dataIndex) => {
          const isActive = sortedData[dataIndex];

          return (
            <SwitchButton
              checked={isActive.is_active ? 'true' : false}
              onChange={() => activateDeactivateHandler(dataIndex)}
            />
          );
        },
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
            <Button
              style={{ minWidth: 0, margin: '0px 5px' }}
              variant="contained"
              color="success"
              onClick={() => onViewHandler(dataIndex)}
            >
              <ListItemIcon style={{ color: '#fff', padding: '0px', minWidth: 0 }}>
                <Iconify icon="carbon:view-filled" width={24} height={24} />
              </ListItemIcon>
            </Button>
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
              loading={dataIndex === currentIndex ? DeleteUserApiInfo.isLoading : false}
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

  const activateDeactivateHandler = async (index) => {
    const currentData = await sortedData[index];
    ActivateDeactivateApi({
      account_id: currentData.account_id,
      status: currentData.is_active ? 'D' : 'A',
    });
  };

  // console.log("sortedData",sortedData);

  const onSubmitHandler = async (value, index) => {
    if (modalType === 'Add') {
      console.log('value', value);
      const formData = new FormData();
      formData.append('first_name', value.first_name);
      formData.append('last_name', value.last_name);
      formData.append('email', value.email);
      formData.append('mobile', value.mobile);
      formData.append('department', value.department);
      formData.append('designation', value.designation);
      formData.append('role', value.role);
      formData.append('photo', value.photo);

      await AddUserApi(formData);
    } else {
      const formData = new FormData();
      formData.append('first_name', value.first_name);
      formData.append('last_name', value.last_name);
      formData.append('email', value.email);
      formData.append('mobile', value.mobile);
      formData.append('department', value.department);
      formData.append('designation', value.designation);
      formData.append('role', value.role);
      formData.append('photo', value.photo);
      UpdateUserApi(formData);
    }
  };

  if (ActivateDeactivateApiInfo.isSuccess) {
    showToast('success', ActivateDeactivateApiInfo.data.msg);
    refetch();
    ActivateDeactivateApiInfo.reset();
  }

  const onDeleteHandler = async (dataIndex) => {
    setCurrentIndex(dataIndex);
    const dataArr = sortedData;
    const currentDataObj = dataArr[dataIndex];
    await DeleteUserApi(currentDataObj.account_id);
    refetch();
  };
  if (DeleteUserApiInfo.isSuccess) {
    showToast('success', DeleteUserApiInfo.data.msg);
    DeleteUserApiInfo.reset();
  }
  if (DeleteUserApiInfo.isError) {
    showToast('error', DeleteUserApiInfo.error.data.msg);
    DeleteUserApiInfo.reset();
  }

  return (
    <Page title="User">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            User List
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="#"
            onClick={addNewListHandler}
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            Add User
          </Button>
        </Stack>

        <Card>
          <MUIDataTable title={'Users List'} data={sortedData} columns={columns} options={options} />
        </Card>
      </Container>
      <UserModalList
        open={modalOpen}
        handleClose={modalHandleClose}
        onsubmit={onSubmitHandler}
        type={modalType}
        formData={apiData}
      />
      <userViewModel open={viewModelOpen} />
    </Page>
  );
};

export default List;
