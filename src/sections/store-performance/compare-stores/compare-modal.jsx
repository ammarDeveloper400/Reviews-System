/* eslint-disable react/prop-types */
import React from 'react';

import { Box, Dialog, Button, Typography, DialogContent } from '@mui/material';

import { useGetStoresListQuery } from 'src/services/manage-stores';

import CustomSelect from 'src/components/custom-select/select';

const CompareModal = ({ open, setOpen, handleConfirm, selectedStores, setSelectedStores }) => {
  const { data: storesList } = useGetStoresListQuery();

  const storesListOptions = storesList?.stores?.map((store) => ({
    value: store?._id,
    label: store?.name,
  }));
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{
        sx: { p: '30px' },
      }}
    >
      <Typography textAlign="center" fontSize={18} fontWeight={600}>
        Compare Store
      </Typography>
      <DialogContent sx={{ p: 0 }}>
        <Box display="flex" gap={1.5} flexWrap="wrap" alignItems="center" my={4}>
          <CustomSelect
            width={160}
            name="store1"
            label="Choose a Store"
            options={storesListOptions}
            value={selectedStores.store1}
            handleChange={(e) => setSelectedStores({ ...selectedStores, store1: e.target.value })}
          />
          <Typography fontSize={15} fontWeight={400}>
            Compare
          </Typography>
          <CustomSelect
            width={160}
            name="store2"
            label="Compare with"
            options={storesListOptions}
            value={selectedStores.store2}
            handleChange={(e) => setSelectedStores({ ...selectedStores, store2: e.target.value })}
          />
        </Box>
      </DialogContent>
      <Button
        onClick={handleConfirm}
        variant="contained"
        disabled={selectedStores.store1 === ' ' || selectedStores.store2 === ' '}
        sx={{
          mx: 'auto',
          fontSize: 14,
          fontWeight: 400,
          // width: '130px',
          height: 36,
          borderRadius: '10px',
        }}
      >
      Start Comparison
      </Button>
    </Dialog>
  );
};

export default CompareModal;
