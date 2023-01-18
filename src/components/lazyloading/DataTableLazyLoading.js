import React from 'react'
import Skeleton from '@mui/material/Skeleton';

const DataTableLazyLoading = () => (
    <Skeleton variant="rectangular" animation="wave" style={{ borderRadius: 10, height: 400 }} />
)

export default DataTableLazyLoading;