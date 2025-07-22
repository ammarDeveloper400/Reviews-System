/* eslint-disable react/prop-types */
import React from 'react';

import { Box, Dialog, Button, Typography, DialogContent } from '@mui/material';

// import { PhotoCamera, CalendarToday } from '@mui/icons-material';

const AccountVerificationModal = ({ open, onClose }) => (
  <Dialog
    onClose={onClose}
    fullWidth
    maxWidth="sm"
    open={open}
    PaperProps={{ sx: { borderRadius: '15px', p: 3 } }}
  >
    <DialogContent>
      <Typography textAlign="center" fontSize={30} fontWeight={600} mb={2}>
        Your account was verified successfully.
      </Typography>

      <Box display="flex" gap={2} justifyContent="center" mt={4}>
        <Button
          onClick={onClose}
          sx={{ fontSize: 20, p: '8px 40px', borderRadius: '5px', fontWeight: 400 }}
          variant="contained"
        >
          Close
        </Button>
      </Box>
    </DialogContent>
  </Dialog>
);

export default AccountVerificationModal;
