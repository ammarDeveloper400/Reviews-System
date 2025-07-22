/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import dayjs from 'dayjs';
// import Cropper from 'react-easy-crop';
import { toast } from 'react-toastify';
import React, { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { LoadingButton } from '@mui/lab';
import {
  Box,
  Grid,
  Stack,
  Dialog,
  Button,
  // styled,
  MenuItem,
  TextField,
  Typography,
  DialogContent,
} from '@mui/material';

import { useGetStoresListQuery } from 'src/services/manage-stores';
import { useGetUserProfileQuery } from 'src/services/profile/profile-api';
import { useAddStaffMemberMutation, useUpdateStaffMemberMutation } from 'src/services/manage-staff';

import CustomDatePicker from 'src/components/custom-datepicker';
// import { PhotoCamera, CalendarToday } from '@mui/icons-material';

// const stores = [
//   { label: 'Store 1', value: 'store1' },
//   { label: 'Store 2', value: 'store2' },
//   { label: 'Store 3', value: 'store3' },
// ];

const StaffModal = ({ open, setOpen, title, acceptBtnText, selectedStaffMember, staffList }) => {
  const { data: userDetails } = useGetUserProfileQuery();
  const navigate = useNavigate();
  const [name, setName] = useState(selectedStaffMember?.name || '');
  const [email, setEmail] = useState(selectedStaffMember?.email || '');
  const [joiningDate, setJoiningDate] = useState(
    selectedStaffMember?.joiningDate ? dayjs(selectedStaffMember.joiningDate) : null
  );
  const [selectedStore, setSelectedStore] = useState(selectedStaffMember?.store?._id || '');

  const [selectedImage, setSelectedImage] = useState(
    selectedStaffMember?.image || '/assets/icons/upload-img-icon.svg'
  );

  const [selectedFile, setSelectedFile] = useState(null);

  const { data: storesList } = useGetStoresListQuery();

  const storesListOptions =
    storesList && storesList?.stores?.map((store) => ({ value: store?._id, label: store?.name }));

  const [addStaffMember, { isLoading: addStaffMemberLoading }] = useAddStaffMemberMutation();
  const [updateStaffMember, { isLoading: updateStaffMemberLoading }] =
    useUpdateStaffMemberMutation();

  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [isCropping, setIsCropping] = useState(false);
  const [finalImage, setFinalImage] = useState(null);

  // Your provided handleImageChange function
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file); // Store the file object

      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target.result); // Set base64 string for cropping
        // setIsCropping(true); // Enable cropping mode
      };
      reader.readAsDataURL(file);
    }
  };

  const onCropComplete = useCallback((croppedArea, cAreaPixels) => {
    setCroppedAreaPixels(cAreaPixels);
  }, []);

  const handleCrop = async () => {
    try {
      const croppedImageUrl = await getCroppedImg(selectedImage, croppedAreaPixels);

      // Convert the cropped image (blob URL) to a File object
      const response = await fetch(croppedImageUrl);
      const blob = await response.blob();
      const croppedFile = new File([blob], 'croppedImage.jpg', { type: 'image/jpeg' });

      setSelectedFile(croppedFile); // Update selectedFile for form submission
      setFinalImage(croppedImageUrl); // Update UI preview with cropped image
      setIsCropping(false);
    } catch (error) {
      console.error('Failed to crop the image', error);
    }
  };

  const createImage = (url) =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener('load', () => resolve(image));
      image.addEventListener('error', (err) => reject(err));
      image.setAttribute('crossOrigin', 'anonymous'); // Avoid CORS issues
      image.src = url;
    });

  const getCroppedImg = async (imageSrc, cAreaPixels) => {
    const image = await createImage(imageSrc);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = cAreaPixels.width;
    canvas.height = cAreaPixels.height;

    ctx.drawImage(
      image,
      cAreaPixels.x,
      cAreaPixels.y,
      cAreaPixels.width,
      cAreaPixels.height,
      0,
      0,
      cAreaPixels.width,
      cAreaPixels.height
    );

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        resolve(URL.createObjectURL(blob));
      }, 'image/jpeg');
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  // const VisuallyHiddenInput = styled('input')({
  //   clip: 'rect(0 0 0 0)',
  //   clipPath: 'inset(50%)',
  //   height: 1,
  //   overflow: 'hidden',
  //   position: 'absolute',
  //   bottom: 0,
  //   left: 0,
  //   whiteSpace: 'nowrap',
  //   width: 1,
  // });

  const onSubmit = async () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('joiningDate', joiningDate);

    if (selectedStaffMember?._id) {
      formData.append('store', selectedStore);
    } else {
      formData.append('storeId', selectedStore);
    }

    if (selectedFile) {
      // Append the file if it's available
      formData.append('image', selectedFile);
    }

    try {
      if (selectedStaffMember?._id) {
        await updateStaffMember({ payload: formData, id: selectedStaffMember?._id }).unwrap();
        toast.success('Staff Member updated successfully');
      } else {
        await addStaffMember(formData).unwrap();
        toast.success('Staff Member added successfully');
        navigate('/rota?status=offline');
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
      PaperProps={{ sx: { bgcolor: '#EFF7F9', borderRadius: '15px', p: { md: 2 } } }}
    >
      <DialogContent>
        <Typography variant="h4" fontWeight={500} mb={2}>
          {title}
        </Typography>
        {staffList?.length > userDetails?.user?.currentPlan?.staffLimit ? (
          <Box py={4} textAlign="center">
            <Typography textAlign="center">
              You’ve reached the maximum number of staff for your current subscription. Elevate your
              customer experience by adding more staff to your subscription.
            </Typography>
            <Box display="flex" alignItems="center" justifyContent="center" gap={2} mt={4} mb={2}>
              <Button
                LinkComponent={Link}
                to="/my-subscription"
                variant="contained"
                sx={{ fontSize: 14, p: '8px 20px', fontWeight: 400 }}
              >
                Upgrade your plan
              </Button>
              <Button
                onClick={handleClose}
                sx={{ fontSize: 14, p: '8px 20px', fontWeight: 400 }}
                variant="outlined"
              >
                Got it
              </Button>
            </Box>
          </Box>
        ) : (
          <>
            <Box display="flex" alignItems="center" flexWrap="wrap" gap={4} width={1}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={3.5}>
                  {/* <Box sx={{ bgcolor: '#fff', borderRadius: '15px', pt: 2 }}>
                    <Stack alignItems="center">
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        // bgcolor="#EFF7F9"
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
                          onChange={handleImageChange}
                          type="file"
                          accept="image/*"
                        />
                      </Button>
                    </Stack>
                  </Box> */}

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
                        {finalImage ? (
                          <img
                            width="100%"
                            style={{ objectFit: 'contain' }}
                            height="auto"
                            src={finalImage}
                            alt="Cropped"
                          />
                        ) : (
                          <img
                            width="100%"
                            style={{ objectFit: 'contain' }}
                            height="auto"
                            src={selectedImage || 'placeholder.png'}
                            alt="Preview"
                          />
                        )}
                      </Box>
                      <Button
                        component="label"
                        sx={{
                          fontSize: '20px',
                          fontWeight: 400,
                          color: '#000',
                          ':hover': { background: 'transparent' },
                        }}
                      >
                        Upload image
                        <input hidden onChange={handleImageChange} type="file" accept="image/*" />
                      </Button>
                    </Stack>

                    {/* {isCropping && (
                      <Box sx={{ position: 'relative', width: '100%', height: '300px' }}>
                        <Cropper
                          image={selectedImage}
                          crop={crop}
                          zoom={zoom}
                          aspect={1} // Adjust the aspect ratio here
                          onCropChange={setCrop}
                          onZoomChange={setZoom}
                          onCropComplete={onCropComplete}
                        />
                        <Stack direction="row" justifyContent="space-between" mt={2}>
                          <Button variant="outlined" onClick={() => setIsCropping(false)}>
                            Cancel
                          </Button>
                          <Button variant="contained" onClick={handleCrop}>
                            Crop
                          </Button>
                        </Stack>
                      </Box>
                    )} */}
                  </Box>
                </Grid>
                <Grid item xs={12} md={8.5}>
                  <Stack>
                    <TextField
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      size="medium"
                      label="Name"
                      variant="outlined"
                      fullWidth
                      sx={{ background: '#fff', borderRadius: '10px', marginBottom: '16px' }}
                    />
                    <TextField
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      size="medium"
                      label="Email"
                      variant="outlined"
                      fullWidth
                      sx={{ background: '#fff', borderRadius: '10px', marginBottom: '16px' }}
                    />
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={5.5}>
                        <CustomDatePicker
                          value={joiningDate}
                          handleChange={(date) => setJoiningDate(date)}
                          label="Joining Date"
                          isFutureDateDisabled
                        />
                      </Grid>
                      <Grid item xs={12} md={6.5}>
                        <TextField
                          size="medium"
                          label="Select Store"
                          variant="outlined"
                          select
                          value={selectedStore}
                          onChange={(e) => setSelectedStore(e.target.value)}
                          sx={{ background: '#fff', borderRadius: '10px' }}
                          fullWidth
                        >
                          {storesListOptions?.length > 0 ? (
                            storesListOptions?.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))
                          ) : (
                            <MenuItem disabled>No store found.</MenuItem>
                          )}
                        </TextField>
                      </Grid>
                    </Grid>
                    {/* <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: { xs: 'wrap', md: 'nowrap' },
                    gap: '16px',
                  }}
                >
                  
                  
                </Box> */}
                  </Stack>
                </Grid>
              </Grid>
            </Box>
            <Box display="flex" gap={2} justifyContent="end" mt={{ md: 4, xs: 2 }}>
              <LoadingButton
                onClick={onSubmit}
                sx={{
                  fontSize: 14,
                  p: { md: '8px 40px', xs: '8px 16px' },
                  borderRadius: '15px',
                  fontWeight: 400,
                }}
                variant="contained"
                loading={addStaffMemberLoading || updateStaffMemberLoading}
                disabled={
                  !name || !selectedStore
                  // !email ||
                  // (!selectedStaffMember && !selectedFile) ||
                  // !joiningDate
                }
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
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default StaffModal;
