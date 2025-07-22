/* eslint-disable react/prop-types */
import React from 'react';

import { LoadingButton } from '@mui/lab';
import { Box, Dialog, Button, Typography, DialogContent } from '@mui/material';

// import { PhotoCamera, CalendarToday } from '@mui/icons-material';

const CancelConfirmationModal = ({ open, setOpen, handleCancel, isLoading }) => (
  <Dialog fullWidth maxWidth="sm" open={open} PaperProps={{ sx: { borderRadius: '15px', p: 3 } }}>
    <DialogContent>
      <Typography fontSize={30} fontWeight={600} mb={2}>
        Are you sure you want to cancel?
      </Typography>

      <Box display="flex" gap={2} justifyContent="center" mt={4}>
        <LoadingButton
          loading={isLoading}
          onClick={handleCancel}
          sx={{ fontSize: 20, p: '8px 40px', borderRadius: '5px', fontWeight: 400 }}
          variant="contained"
        >
          Yes
        </LoadingButton>
        <Button
          onClick={() => setOpen(false)}
          sx={{ fontSize: 20, p: '8px 40px', borderRadius: '5px', fontWeight: 400 }}
          variant="outlined"
        >
          No
        </Button>
      </Box>
    </DialogContent>
  </Dialog>
);

export default CancelConfirmationModal;
