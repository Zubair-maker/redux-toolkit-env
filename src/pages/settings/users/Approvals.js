import React, { useState } from 'react';
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
// components
import UsersModalApproval from '../../../components/users/UsersModalApproval';
import Page from '../../../components/Page';
import Label from '../../../components/Label';
import Iconify from '../../../components/Iconify';
// mock

const Approvals = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editmodalOpen, setEditModalOpen] = useState(false);

  const modalHandleClose = (value) => {
    console.log('value', value);
    setModalOpen(value);
    setEditModalOpen(value);
  };

  const addNewApprovalsHandler = () => {
    setModalOpen(true);
  };

  const onEditModalHandler = () => {
    setEditModalOpen(true);
  };
  const columns = [
    {
      name: 'name',
      label: 'Name',
      options: {
        filter: true,
        sort: true,
        setCellProps: () => ({ style: { maxWidth: '250px' } }),
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
      label: 'Phone',
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
      name: 'action',
      label: 'Action',
      options: {
        filter: false,
        sort: false,
        customBodyRenderLite: (dataIndex) => (
          <>
            <Button style={{ minWidth: 0, color: "#fff" }} variant="contained" color="success" onClick={() => onEditModalHandler(dataIndex)}>
              {/* <ListItemIcon style={{ color: "#fff", padding: "0px", minWidth: 0 }}>
                <Iconify icon="ep:edit" width={24} height={24} />
              </ListItemIcon> */}
              Approve
            </Button>
            <LoadingButton style={{ minWidth: 0, margin: "0px 5px" }} variant="contained" color="error"
            // onClick={() => onDeleteHandler(dataIndex)} loading={dataIndex === currentIndex ? DeleteAddressInfo.isLoading : false}
            >
              Reject
            </LoadingButton>
          </>
        )
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
  const data = [
    {
      name: 'Abid Gaush Mohd Ansari',
      email: 'abid.reactdeveloper@gmail.com',
      phone: '8856823440',
      department: 'computer',
      status: labelStatus,
      action: editAndDeleteButton,
    },
    { name: 'John Walsh', status: labelStatus, action: editAndDeleteButton },
    { name: 'Bob Herm', status: labelStatus, action: editAndDeleteButton },
    { name: 'James Houston', status: labelStatus, action: editAndDeleteButton },
  ];
  const options = {
    filterType: 'dropdown',
  };

  const getInputValue = (value) => {
    console.log('value', value);
  };

  return (
    <Page title="User">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Approvals
          </Typography>
          {/* <Button
            variant="contained"
            component={RouterLink}
            to="#"
            onClick={addNewApprovalsHandler}
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            New Approval
          </Button> */}
        </Stack>

        <Card>
          <MUIDataTable title={'Approval List'} data={data} columns={columns} options={options} />
        </Card>
      </Container>
      <UsersModalApproval
        open={modalOpen}
        handleClose={modalHandleClose}
        label="Add Approval"
        type="text"
        textBoxLabel="Approval Name"
        id="approvalName"
        name="approval"
        getInputValue={getInputValue}
        buttonLabel="Add Approval"
      />
      <UsersModalApproval
        open={editmodalOpen}
        handleClose={modalHandleClose}
        label="Edit Approval"
        type="text"
        textBoxLabel="Approval Name"
        id="editApprovalName"
        name="approval"
        getInputValue={getInputValue}
        buttonLabel="Update Approval"
      />
    </Page>
  );
};

export default Approvals;
