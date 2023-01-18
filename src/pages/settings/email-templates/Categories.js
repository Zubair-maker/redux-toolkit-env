import React, { useMemo, useState, useEffect } from 'react';
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
  useGetEmailCategoryQuery,
  useDeleteEmailCategoryMutation,
  useAddEmailCategoryMutation,
  useUpdateEmailCategoryMutation,
} from '../../../redux/services/settings/EmailCategoryService';
// components
import SettingsModal from '../../../components/settings/SettingsModal';
import Page from '../../../components/Page';
import Label from '../../../components/Label';
import Iconify from '../../../components/Iconify';
// mock

const Categories = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editmodalOpen, setEditModalOpen] = useState(false);
  const { data = [], isLoading, refetch } = useGetEmailCategoryQuery();
  const [DeleteEmailCategory, DeleteEmailCategoryInfo] = useDeleteEmailCategoryMutation();
  const [AddEmailCategory, AddEmailcategoryInfo] = useAddEmailCategoryMutation();
  const [UpdateEMailCategory, UpdateEMailCategoryInfo] = useUpdateEmailCategoryMutation();

  const [currentIndex, setCurrentIndex] = useState(null);
  const [btnLoader, setBtnLoader] = useState(false);
  const [modalName, setModalName] = useState('add');
  const [addValue, setAddvalue] = useState({
    name: '',
  });
  const [editValue, setEditValue] = useState({
    id: undefined,
    name: '',
  });

  const modalHandleClose = (value) => {
    console.log('value', value);
    setModalOpen(value);
    setEditModalOpen(value);
  };

  const addNewCategoryHandler = () => {
    setModalOpen(true);
    setModalName('Add');
  };

  const sortData = useMemo(() => {
    const sortresult = sortedDataFn(data.data);
    return sortresult;
  }, [data]);

  // add handle

  const addChangeHandler = (e) => {
    setAddvalue({ [e.target.name]: e.target.value });
  };
  const addClickHandler = async () => {
    setBtnLoader(true);
    if (modalName === 'Add') {
      await AddEmailCategory(addValue);
    } else {
      await UpdateEMailCategory(editValue);
    }
  };
  // Edit Handler
  const editChangeHandler = (e) => {
    setEditValue({ ...editValue, [e.target.name]: e.target.value });
  };

  const onEditModalHandler = (dataIndex) => {
    setEditModalOpen(true);
    const dataArr = sortData;
    const currentDataObj = dataArr[dataIndex];
    setEditValue(currentDataObj);
    setModalName('Edit');
  };
  // show Email Category Listing

  useEffect(() => {
    if (AddEmailcategoryInfo.isSuccess) {
      setModalOpen(false);
      refetch();
      showToast('success', 'Email Category successfully added.');
      setBtnLoader(false);
      AddEmailcategoryInfo.reset();
      setAddvalue({ name: '' });
    }
    if (AddEmailcategoryInfo.isError) {
      showToast('error', AddEmailcategoryInfo.error.data.msg);
      setBtnLoader(false);
      AddEmailcategoryInfo.reset();
    }
    if (UpdateEMailCategoryInfo.isSuccess) {
      refetch();
      showToast('success', 'Category successfully updated.');
      setEditModalOpen(false);
      setBtnLoader(false);
      UpdateEMailCategoryInfo.reset();
    }
    if (UpdateEMailCategoryInfo.isError) {
      showToast('error', UpdateEMailCategoryInfo.error.data.msg);
      setBtnLoader(false);
      UpdateEMailCategoryInfo.reset();
    }
  }, [
    modalOpen,
    AddEmailcategoryInfo,
    setModalOpen,
    refetch,
    setBtnLoader,
    addValue,
    setAddvalue,
    UpdateEMailCategoryInfo,
  ]);

  // delete Handler

  const onDeleteHandler = async (dataIndex) => {
    setCurrentIndex(dataIndex);
    const dataArr = sortData;
    const currentDataObj = dataArr[dataIndex];
    await DeleteEmailCategory(currentDataObj.id);
  };
  useEffect(() => {
    if (DeleteEmailCategoryInfo.isSuccess) {
      showToast('success', DeleteEmailCategoryInfo.data.msg);
      DeleteEmailCategoryInfo.reset();
      refetch();
    }
    if (DeleteEmailCategoryInfo.isError) {
      showToast('error', DeleteEmailCategoryInfo.error.data.msg);
      DeleteEmailCategoryInfo.reset();
      refetch();
    }
  }, [DeleteEmailCategoryInfo, refetch]);
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
              loading={dataIndex === currentIndex ? useDeleteEmailCategoryMutation.isLoading : false}
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

  const getInputValue = (value) => {
    console.log('value', value);
  };

  return (
    <Page title="User">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Categories
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="#"
            onClick={addNewCategoryHandler}
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            Add Category
          </Button>
        </Stack>

        <Card>
          <MUIDataTable title={'Category List'} data={sortData} columns={columns} options={options} />
        </Card>
      </Container>
      <SettingsModal
        open={modalOpen}
        handleclose={modalHandleClose}
        label="Email Category Name"
        type="Add"
        textboxlabel="Add category"
        id="categoryName"
        name="name"
        onChange={addChangeHandler}
        buttonlabel="Add Email category"
        addclickhandler={addClickHandler}
        loadingbtn={btnLoader}
      />
      <SettingsModal
        open={editmodalOpen}
        label="Edit Category Name"
        type="edit"
        textboxlabel="Edit Category"
        id="editCategoryName"
        value={editValue.name}
        name="name"
        onChange={editChangeHandler}
        addclickhandler={addClickHandler}
        loadingbtn={btnLoader}
      />
    </Page>
  );
};

export default Categories;
