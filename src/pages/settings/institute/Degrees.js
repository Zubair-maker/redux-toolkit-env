import React, { useState, useEffect, useMemo } from 'react';
import MUIDataTable from 'mui-datatables';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { Link as RouterLink } from 'react-router-dom';
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
import { useDegreeGetQuery, useAddDegreeMutation, useUpdateDegreeMutation, useDeleteDegreeMutation } from "../../../redux/services/settings/DegreeService";
import DataTableLazyLoading from '../../../components/lazyloading/DataTableLazyLoading';
import { showToast } from "../../../utils/toast";
// mock

const Degrees = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editmodalOpen, setEditModalOpen] = useState(false);
  const { data = [], isLoading, refetch } = useDegreeGetQuery();
  const [AddDegree, AddDegreeInfo] = useAddDegreeMutation();
  const [UpdateDegree, UpdateDegreeInfo] = useUpdateDegreeMutation();
  const [DeleteDegree, DeleteDegreeInfo] = useDeleteDegreeMutation();
  const [currentIndex, setCurrentIndex] = useState(null);
  const [btnLoader, setBtnLoader] = useState(false)


  const [addValue, setAddValue] = useState({
    name: ""
  });

  const [editValue, setEditValue] = useState({
    id: undefined,
    name: ""
  });
  const [modalName, setModalName] = useState("add");

  const sortedData = useMemo(() => {
    const result = sortedDataFn(data.data);
    return result;
  }, [data])

  useEffect(() => {
    if (AddDegreeInfo.isSuccess) {
      setModalOpen(false);
      refetch();
      showToast("success", "degree successfully added.");
      setBtnLoader(false);
      AddDegreeInfo.reset();
    }
    if (AddDegreeInfo.isError) {
      showToast("error", AddDegreeInfo.error.data.msg);
      setBtnLoader(false);
      AddDegreeInfo.reset();
    }
    if (UpdateDegreeInfo.isSuccess) {
      refetch();
      showToast("success", "degree successfully updated.");
      setEditModalOpen(false);
      setBtnLoader(false);
      UpdateDegreeInfo.reset();
    }
    if (UpdateDegreeInfo.isError) {
      showToast("error", UpdateDegreeInfo.error.data.msg);
      setBtnLoader(false);
      UpdateDegreeInfo.reset();
    }
  }, [modalOpen, AddDegreeInfo, setModalOpen, refetch, setBtnLoader, setEditModalOpen, UpdateDegreeInfo])



  if (isLoading) {
    return <DataTableLazyLoading />
  }
  if (DeleteDegreeInfo.isSuccess) {
    showToast("success", "degree successfully deleted.");
    DeleteDegreeInfo.reset();
  }
  if (DeleteDegreeInfo.isError) {
    showToast("error", DeleteDegreeInfo.error.data.msg);
    DeleteDegreeInfo.reset();
  }




  const modalHandleClose = (value) => {
    setModalOpen(value);
    setEditModalOpen(value);
  };

  const addNewDegreeHandler = () => {
    setModalOpen(true);
    setModalName("Add");
  };

  const onEditModalHandler = (dataIndex) => {
    const dataArr = sortedData;
    const currentDataObj = dataArr[dataIndex];
    setEditValue(currentDataObj)
    setEditModalOpen(true);
    setModalName("Edit");
  };

  const onDeleteHandler = async (dataIndex) => {
    setCurrentIndex(dataIndex)
    const dataArr = sortedData;
    const currentDataObj = dataArr[dataIndex];
    await DeleteDegree(currentDataObj.id);
    refetch();
  }

  const columns = [
    {
      name: "id",
      label: "Degree Id",
      options: {
        filter: true,
        sort: true,
      }
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
              <ListItemIcon style={{ color: "#fff", padding: "0px", minWidth: 0 }}>
                <Iconify icon="ep:edit" width={24} height={24} />
              </ListItemIcon>
            </Button>
            <LoadingButton style={{ minWidth: 0, margin: "0px 5px" }} variant="contained" color="error" onClick={() => onDeleteHandler(dataIndex)} loading={dataIndex === currentIndex ? DeleteDegreeInfo.isLoading : false}>
              <ListItemIcon style={{ color: "#fff", padding: "0px", minWidth: 0 }}>
                <Iconify icon="eva:trash-2-outline" width={24} height={24} />
              </ListItemIcon>
            </LoadingButton>
          </>
        )
      },
    },
  ];

  const options = {
    filterType: 'dropdown',
  };
  const addClickHandler = async () => {
    setBtnLoader(true);
    if (modalName === "Add") {
      await AddDegree(addValue);
      setAddValue({ name: "" })
    } else {
      await UpdateDegree(editValue);
    }

  }

  const addChangeHandler = (e) => {
    setAddValue({ [e.target.name]: e.target.value });
  }

  const editChangeHandler = (e) => {
    setEditValue({ ...editValue, [e.target.name]: e.target.value })
  }

  return (
    <Page title="Degree">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Degrees
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="#"
            onClick={addNewDegreeHandler}
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            New Degree
          </Button>
        </Stack>

        <Card>
          <MUIDataTable title={' Degree List'} data={sortedData} columns={columns} options={options} />
        </Card>
      </Container>
      <SettingsModal
        open={modalOpen}
        handleclose={modalHandleClose}
        label="Degree Name"
        type="text"
        textboxlabel="Add Degree"
        id="degreeName"
        name="name"
        value={addValue.name}
        onChange={addChangeHandler}
        buttonlabel="Add Degree"
        addclickhandler={addClickHandler}
        loadingbtn={btnLoader}
      />
      <SettingsModal
        open={editmodalOpen}
        handleclose={modalHandleClose}
        label="Edit Degree"
        type="text"
        textboxlabel="Degree Name"
        id="editDegreeName"
        name="name"
        value={editValue.name}
        onChange={editChangeHandler}
        buttonlabel="Update Degree"
        addclickhandler={addClickHandler}
        loadingbtn={btnLoader}
      />
    </Page>
  );
};

export default Degrees;
