import React, { useState, useMemo, useEffect } from 'react';
import MUIDataTable from 'mui-datatables';
import { Link as RouterLink } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';

// material
import { Card, Stack, Button, Container, Typography, ListItemIcon } from '@mui/material';

// components
import { sortedDataFn } from '../../../utils/getSortedData';
import { showToast } from '../../../utils/toast';

import MainModuleFilter from '../../../components/main/MainModuleFilter';
import Page from '../../../components/Page';

import Iconify from '../../../components/Iconify';
import { useGetAssesmentQuery, useDeleteAssesmentMutation } from '../../../redux/services/main/AssesmentService';
// mock

const Assessments = () => {
  const { data = [],  refetch } = useGetAssesmentQuery();
  const [deleteAssesment, deleteAssesmentInfo] = useDeleteAssesmentMutation();
  const [currentIndex, setCurrentIndex] = useState(null);

  

  console.log('data is fetching form assesment', data);
  const sortData = useMemo(() => {
    const sortresult = sortedDataFn(data.data);
    return sortresult;
  }, [data]);

  // Delete Assesment handler
  const onDeletAssesmenteHandler = async (dataIndex) => {
    setCurrentIndex(dataIndex);
    const dataArr = sortData;
    const currentDataObj = dataArr[dataIndex];
    await deleteAssesment(currentDataObj.id);
  };
  useEffect(() => {
    refetch();
  }, [refetch]);
  useEffect(() => {
    if (deleteAssesmentInfo.isSuccess) {
      showToast('success', deleteAssesmentInfo.data.msg);
      deleteAssesmentInfo.reset();
      refetch();
    }
    if (deleteAssesmentInfo.isError) {
      showToast('error', deleteAssesmentInfo.error.data.msg);
      deleteAssesmentInfo.reset();
      refetch();
    }
  }, [deleteAssesmentInfo, refetch]);
  

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
            <Button style={{ minWidth: 0 }} variant="contained" component={RouterLink} to={`/dashboard/assessments/edit-assessment/${data.data[dataIndex].id}`}>
            <ListItemIcon style={{ color: '#fff', padding: '0px', minWidth: 0 }}>
                <Iconify icon="ep:edit" width={24} height={24} />
              </ListItemIcon>
            </Button>
            <LoadingButton
              style={{ minWidth: 0, margin: '0px 5px' }}
              variant="contained"
              color="error"
              onClick={() => onDeletAssesmenteHandler(dataIndex)}
              loading={dataIndex === currentIndex ? useDeleteAssesmentMutation.isLoading : false}
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
    responsive: 'stacked',
    filter: false,
    download: false,
    print: false,
  };

  return (
    <Page title="User">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Assessment
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="/dashboard/assessments/create-assessment"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            New Assessment
          </Button>
        </Stack>
        <Card>
          <MainModuleFilter />
        </Card>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5} />
        <Card>
          <MUIDataTable title={'Assessment List'} data={data?.data} columns={columns} options={options} />
        </Card>
      </Container>
    </Page>
  );
};

export default Assessments;
