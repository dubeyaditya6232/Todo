import React from 'react';

import {CircularProgress,Box} from '@mui/material';

function Loading() {
  return <div>
    <Box display="flex" justifyContent="center" alignItems="center" m={1} p={1}>
        <CircularProgress />
    </Box>
  </div>;
}

export default Loading;
