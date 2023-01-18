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
// components
import { showToast } from '../../../utils/toast';
import { sortedDataFn } from '../../../utils/getSortedData';
import {
  useGetWebformQuery,
  useAddWebformApiMutation,
  useUpdateWebformMutation,
  useDeleteWebformMutation,
} from '../../../redux/services/settings/WebformService';
import { useGetWebformFieldsQuery } from '../../../redux/services/settings/FieldServices';
import Page from '../../../components/Page';
import Label from '../../../components/Label';
import Iconify from '../../../components/Iconify';
import WebFormsModal from '../../../components/webform/WebFormModal';

const Webforms = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editmodalOpen, setEditModalOpen] = useState(false);
  const { data = [], isLoading, refetch } = useGetWebformQuery();
  const [DeleteWebform, DeleteWebformInfo] = useDeleteWebformMutation();

  const [btnLoader, setBtnLoader] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);

  const [modalName, setModalName] = useState('add');
  const { data: webFormFieldsData } = useGetWebformFieldsQuery();

  const [editValue, setEditValue] = useState()
 

  const modalHandleClose = (value) => {
    setModalOpen(value);
    setEditModalOpen(value);
    refetch();
  };
  const modaEditlHandleClose = (value) => {
    setModalOpen(value);
    setEditModalOpen(value);
    refetch();
  };
  const sortData = useMemo(() => {
    const sortresult = sortedDataFn(data.data);
    return sortresult;
  });
  const addNewWebformHandler = () => {
    setModalOpen(true);
  };

  const onEditModalHandler = (dataIndex) => {
    setEditModalOpen(true);
    setEditValue(data.data[dataIndex])
  };
  // delete Handler

  const onDeleteHandler = async (dataIndex) => {
    setCurrentIndex(dataIndex);
    const dataArr = sortData;
    const currentDataObj = dataArr[dataIndex];
    await DeleteWebform(currentDataObj.id);
  };
  useEffect(() => {
    if (DeleteWebformInfo.isSuccess) {
      showToast('success', DeleteWebformInfo.data.msg);
      DeleteWebformInfo.reset();
      refetch();
    }
    if (DeleteWebformInfo.isError) {
      showToast('error', DeleteWebformInfo.error.data.msg);
      DeleteWebformInfo.reset();
      refetch();
    }
  }, [DeleteWebformInfo, refetch]);

  const columns = [
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
              loading={dataIndex === currentIndex ? useDeleteWebformMutation.isLoading : false}
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
  // const data = [
  //   { name: 'Joe James', status: labelStatus, action: editAndDeleteButton },
  //   { name: 'John Walsh', status: labelStatus, action: editAndDeleteButton },
  //   { name: 'Bob Herm', status: labelStatus, action: editAndDeleteButton },
  //   { name: 'James Houston', status: labelStatus, action: editAndDeleteButton },
  // ];
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
            Webforms
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="#"
            onClick={addNewWebformHandler}
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            New Webform
          </Button>
        </Stack>

        <Card>
          <MUIDataTable title={'Webform List'} data={sortData} columns={columns} options={options} />
        </Card>
      </Container>
      {modalOpen && (
        <WebFormsModal
          open={modalOpen}
          handleClose={modalHandleClose}
          label="Add Webform"
          type="text"
          textboxlabel="Create an Web form "
          id="webformName"
          name="webform"
          buttonlabel="Add Webform"
          webFormFieldsData={webFormFieldsData?.data}
        />
      )}
      {editmodalOpen && (
        <WebFormsModal
          open={editmodalOpen}
          handleClose={modaEditlHandleClose}
          label="Edit Webform"
          type="text"
          textBoxLabel="Update an Web form "
          id="editWebformName"
          name="webform"
          webFormRowEdit={editValue}
          buttonLabel="Update Webform"
          webFormFieldsData={webFormFieldsData?.data}
        />
      )}
    </Page>
  );
};

export default Webforms;
