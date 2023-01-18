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

import {
  useGetEmailTamplateQuery,
  useGetEmailVariableTamplateQuery,
  useDeleteEmailTemplateMutation,
  useUpdateEmailTemplateMutation,
} from '../../../redux/services/settings/EmailTamplateService';
import { useGetEmailCategoryQuery } from '../../../redux/services/settings/EmailCategoryService';
import { sortedDataFn } from '../../../utils/getSortedData';
import { showToast } from '../../../utils/toast';

// components
import EmailModalTemplates from '../../../components/email-templates/EmailModalTemplates';
import Page from '../../../components/Page';
import Label from '../../../components/Label';
import Iconify from '../../../components/Iconify';
// mock

const Templates = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editmodalOpen, setEditModalOpen] = useState(false);
  const { data = [], isLoading, refetch } = useGetEmailTamplateQuery();
  const { data: categoryData, isLoading: isCategoryLoading } = useGetEmailCategoryQuery();
  const { data: variableData, isLoading: isVariableLoading } = useGetEmailVariableTamplateQuery();
  const [DeleteEmailTemplate, DeleteEmailTemplateInfo] = useDeleteEmailTemplateMutation();
  const [currentIndex, setCurrentIndex] = useState(null);
  const [modalName, setModalName] = useState('add');

  const [editValue, setEditValue] = useState();

  const modalHandleClose = (value) => {
    setModalOpen(value);
    setEditModalOpen(value);
    refetch();
  };

  // Show Data In Table

  const sortData = useMemo(() => {
    const sortresult = sortedDataFn(data.data);
    return sortresult;
  });

  const addNewTemplatesHandler = () => {
    setModalOpen(true);
  };

  const onEditModalHandler = (dataIndex) => {
    setEditModalOpen(true);
    const dataArr = sortData;
    const currentDataObj = dataArr[dataIndex];
    setEditValue(currentDataObj);
    setModalName('Edit');
  };

  /// delete email template
  const onEmailTemplateDeleteHandler = async (dataIndex) => {
    setCurrentIndex(dataIndex);
    const dataArr = sortData;
    const currentDataObj = dataArr[dataIndex];
    await DeleteEmailTemplate(currentDataObj.id);
  };
  useEffect(() => {
    if (DeleteEmailTemplateInfo.isSuccess) {
      showToast('success', DeleteEmailTemplateInfo.data.msg);
      DeleteEmailTemplateInfo.reset();
      refetch();
    }
    if (DeleteEmailTemplateInfo.isError) {
      showToast('error', DeleteEmailTemplateInfo.error.data.msg);
      DeleteEmailTemplateInfo.reset();
      refetch();
    }
  }, [DeleteEmailTemplateInfo, refetch]);

  const columns = [
    {
      name: 'id',
      label: 'id',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'category_name',
      label: 'Category Name',
      options: {
        filter: true,
        sort: true,
        setCellProps: () => ({ style: { maxWidth: '250px' } }),
      },
    },
    {
      name: 'subject',
      label: 'Subject',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'type',
      label: 'Type',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'message',
      label: 'Message',
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
              onClick={() => onEmailTemplateDeleteHandler(dataIndex)}
              loading={dataIndex === currentIndex ? useDeleteEmailTemplateMutation.isLoading : false}
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

  const getInputValue = (value) => {
    console.log('value', value);
  };

  return (
    <Page title="User">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Templates
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="#"
            onClick={addNewTemplatesHandler}
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            Create Template
          </Button>
        </Stack>

        <Card>
          <MUIDataTable title={'Template List'} data={sortData} columns={columns} options={options} />
        </Card>
      </Container>
      <EmailModalTemplates
        open={modalOpen}
        handleClose={modalHandleClose}
        label="Add List"
        type="text"
        textBoxLabel="List Name"
        id="listName"
        name="list"
        autocomplete="off"
        getInputValue={getInputValue}
        buttonLabel="Add List"
        categoryData={categoryData?.data}
        variableData={variableData?.data}
      />
      <EmailModalTemplates
        open={editmodalOpen}
        handleClose={modalHandleClose}
        label="Edit List"
        type="text"
        textBoxLabel="List Name"
        id="editListName"
        name="list"
        getInputValue={getInputValue}
        buttonLabel="Update List"
        categoryData={categoryData?.data}
        variableData={variableData?.data}
        emailTemplateData={editValue}
      />
    </Page>
  );
};

export default Templates;
