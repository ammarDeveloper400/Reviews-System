/* eslint-disable react/prop-types */
import { toast } from 'react-toastify';
import React, { useState } from 'react';

import { LoadingButton } from '@mui/lab';
import {
  Box,
  Grid,
  Stack,
  Dialog,
  Button,
  styled,
  TextField,
  Typography,
  DialogContent,
} from '@mui/material';

import { useAddStoreMutation, useUpdateStoreMutation } from 'src/services/manage-stores';

const StoreModal = ({ open, setOpen, title, acceptBtnText, selectedStore }) => {
  const [storeName, setStoreName] = useState(selectedStore?.name || '');
  const [storeAddress, setStoreAddress] = useState(selectedStore?.address || '');
  const [selectedImage, setSelectedImage] = useState(
    selectedStore?.image || '/assets/icons/upload-img-icon.svg'
  );
  const [selectedFile, setSelectedFile] = useState(null);

  const [addStore, { isLoading: addStoreLoading }] = useAddStoreMutation();
  const [updateStore, { isLoading: updateStoreLoading }] = useUpdateStoreMutation();

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file); // Store the file object

      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleClose = () => {
    setOpen(false);
  };

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

  const onSubmit = async () => {
    const formData = new FormData();
    formData.append('name', storeName);
    formData.append('address', storeAddress);

    if (selectedFile) {
      // Append the file if it's available
      formData.append('image', selectedFile);
    }

    try {
      if (selectedStore?._id) {
        await updateStore({ payload: formData, id: selectedStore?._id }).unwrap();
        toast.success('Store updated successfully');
      } else {
        await addStore(formData).unwrap();
        toast.success('Store created successfully');
      }
      handleClose();
    } catch (err) {
      toast.error(err?.data?.message || 'An error occurred');
    }
  };

  return (
    <Dialog
      fullWidth
      maxWidth="md"
      open={open}
      PaperProps={{ sx: { bgcolor: '#EFF7F9', borderRadius: '15px', p: { md: 2, xs: 0 } } }}
    >
      <DialogContent>
        <Typography variant="h4" fontWeight={500} mb={2}>
          {title}
        </Typography>
        <Box display="flex" alignItems="center" flexWrap="wrap" gap={4} width={1}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={3.5}>
              <Box sx={{ bgcolor: '#fff', borderRadius: '15px', pt: 2 }}>
                <Stack alignItems="center">
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    width={140}
                    height={140}
                    borderRadius="100px"
                    overflow="hidden"
                    mb={1}
                  >
                    <img
                      width="100%"
                      style={{ objectFit: 'contain' }}
                      height="auto"
                      src={selectedImage}
                      alt=""
                    />
                  </Box>
                  <Button
                    component="label"
                    role={undefined}
                    tabIndex={-1}
                    disableRipple
                    sx={{
                      fontSize: '20px',
                      fontWeight: 400,
                      color: '#000',
                      ':hover': { background: 'transparent' },
                    }}
                  >
                    Upload image
                    <VisuallyHiddenInput
                      onChange={(e) => {
                        handleImageChange(e);
                        if (e.target.files && e.target.files[0]) {
                          setSelectedImage(e.target.files[0]);
                        }
                      }}
                      type="file"
                      accept="image/*"
                    />
                  </Button>
                </Stack>
              </Box>
            </Grid>
            <Grid item xs={12} md={8.5}>
              <Stack>
                <TextField
                  size="medium"
                  label="Name"
                  variant="outlined"
                  fullWidth
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  sx={{ background: '#fff', borderRadius: '10px', marginBottom: '16px' }}
                />
                <TextField
                  size="medium"
                  label="Address"
                  variant="outlined"
                  fullWidth
                  value={storeAddress}
                  onChange={(e) => setStoreAddress(e.target.value)}
                  sx={{ background: '#fff', borderRadius: '10px', marginBottom: '16px' }}
                />
              </Stack>
            </Grid>
          </Grid>
        </Box>
        <Box display="flex" gap={2} justifyContent="end" mt={4}>
          <LoadingButton
            onClick={onSubmit}
            sx={{
              fontSize: 14,
              p: { md: '8px 40px', xs: '8px 16px' },
              borderRadius: '15px',
              fontWeight: 400,
            }}
            variant="contained"
            loading={addStoreLoading || updateStoreLoading}
            disabled={!storeName || !storeAddress || (!selectedStore && !selectedFile)}
          >
            {acceptBtnText}
          </LoadingButton>
          <Button
            onClick={handleClose}
            sx={{ fontSize: 14, p: '8px 40px', borderRadius: '15px', fontWeight: 400 }}
            variant="outlined"
          >
            Exit
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default StoreModal;
