/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
import { toast } from 'react-toastify';
import { useRef, useState, useEffect } from 'react';

import { LoadingButton } from '@mui/lab';
import {
  Box,
  Card,
  Grid,
  Stack,
  Button,
  Dialog,
  Tooltip,
  Skeleton,
  TextField,
  Typography,
  IconButton,
  DialogContent,
  InputAdornment,
  CircularProgress,
} from '@mui/material';

import {
  useUpdateInterfaceTwoMutation,
  useGetInterfaceTwoDetailsQuery,
  useAddCustomerExperienceMutation,
  useUpdateCustomerExperienceMutation,
  useDeleteCustomerExperienceMutation,
} from 'src/services/interface-settings/interface-two';

import CustomToggleButton from 'src/components/custom-toggle/toggle';

const InterfaceTwo = () => {
  const { data, isLoading, isFetching } = useGetInterfaceTwoDetailsQuery();

  const [popupText, setPopupText] = useState('');
  const [time, setTime] = useState('');

  const [updateInterface] = useUpdateInterfaceTwoMutation();
  const [addExperience, { isLoading: isAddingExperienceLoading }] =
    useAddCustomerExperienceMutation();
  const [updateExperience, { isLoading: isUpdateExperienceLoading }] =
    useUpdateCustomerExperienceMutation();
  const [deleteExperience, { isLoading: isDeleteExperienceLoading }] =
    useDeleteCustomerExperienceMutation();

  const fileInputRef = useRef(null);

  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isTimerInputFocused, setIsTimerInputFocused] = useState(false);
  const [open, setOpen] = useState(false);
  const [experienceName, setExperienceName] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [image, setImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState(null); // For editing

  // Handle file upload
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle add click
  const handleAddClick = () => {
    setOpen(true);
    setIsEditing(false);
    setExperienceName('');
    setSelectedFile(null);
    setImage(null);
  };

  // Handle edit click
  const handleEditClick = (experience) => {
    setSelectedExperience(experience);
    setOpen(true);
    setIsEditing(true);
    setExperienceName(experience?.name);
    setImage(experience?.image);
  };

  // Handle form submit
  const onSubmit = async () => {
    const formData = new FormData();
    formData.append('name', experienceName);

    if (selectedFile) {
      formData.append('image', selectedFile);
    }

    try {
      if (isEditing) {
        // Update scenario
        await updateExperience({ id: selectedExperience?._id, payload: formData }).unwrap();
        toast.success('Experience updated successfully');
      } else {
        // Add scenario
        await addExperience(formData).unwrap();
        toast.success('Experience added successfully');
      }

      setOpen(false);
      setImage(null);
      setSelectedFile(null);
      setExperienceName('');
    } catch (err) {
      toast.error(err?.data?.message || 'An error occurred');
    }
  };

  const handleDeleteExperience = async () => {
    if (window.confirm('Are you sure you want to delete this experience?')) {
      try {
        await deleteExperience(selectedExperience?._id).unwrap();
        toast.success('Experience deleted successfully');
        setOpen(false);
      } catch (err) {
        toast.error(err?.data?.message);
      }
    }
  };

  const handleUpdate = async (newStatus) => {
    const payload = {
      status: newStatus,
      timerPopupText: popupText,
      timerInSec: time,
    };
    try {
      await updateInterface(payload).unwrap();
      toast.success('Interface updated successfully.');
    } catch (err) {
      toast.error(err?.data?.message);
    }
  };

  useEffect(() => {
    if (data) {
      setPopupText(data.data?.timerPopupText);
      setTime(data.data?.timerInSec);
    }
  }, [data]);

  return (
    <Card sx={{ p: '20px', borderRadius: '15px', color: '#000', minHeight: '300px' }}>
      {isLoading || isFetching ? (
        <Stack spacing={2}>
          <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
          <Skeleton variant="rectangular" width="100%" height={60} />
          <Skeleton variant="rounded" width="100%" height={60} />
          <Skeleton variant="rounded" width="100%" height={60} />
        </Stack>
      ) : (
        <>
          <Box display="flex" justifyContent="space-between" gap={1} flexWrap="wrap">
            <Typography fontSize={20} fontWeight={600}>
              Interface 2: Get Experiences Rated!
            </Typography>
            <CustomToggleButton
              handleUpdate={(newStatus) => handleUpdate(newStatus)}
              activeBtnText="Enable"
              inactiveBtnText="Disable"
              initialStatus={data?.data?.status} // Pass the correct status here
            />
          </Box>
          <Typography fontSize={14} mb={2}>
          Display an Experience for customers to rate or comment on
          </Typography>

          <Grid container spacing={{ xs: 1, md: 3 }}>
            <Grid item xs={12} md={9}>
              <Typography fontSize={14} fontWeight={500} mb={1.5}>
              Edit text that’s displayed next to the countdown timer
              </Typography>
              <TextField
                type="text"
                size="small"
                name="text_after_popup"
                variant="outlined"
                fullWidth
                disabled={!isInputFocused}
                value={popupText}
                onChange={(e) => setPopupText(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment
                      onClick={() => {
                        setIsInputFocused(!isInputFocused);
                        isInputFocused && handleUpdate();
                      }}
                      position="end"
                    >
                      <IconButton sx={{ p: 0.3 }}>
                        {!isInputFocused ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M11.32 4.17578H5C3.895 4.17578 3 5.12478 3 6.29378V16.8818C3 18.0518 3.895 18.9998 5 18.9998H16C17.105 18.9998 18 18.0518 18 16.8818V9.13178L14.086 13.2758C13.7442 13.6413 13.2991 13.8938 12.81 13.9998L10.129 14.5678C8.379 14.9378 6.837 13.3048 7.187 11.4528L7.723 8.61378C7.82 8.10178 8.058 7.63078 8.407 7.26178L11.32 4.17578Z"
                              fill="#01565A"
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M19.8457 2.31802C19.7446 2.06205 19.5964 1.82732 19.4087 1.62602C19.2242 1.42915 19.0017 1.27165 18.7547 1.16302C18.5114 1.05615 18.2485 1.00098 17.9827 1.00098C17.7169 1.00098 17.454 1.05615 17.2107 1.16302C16.9637 1.27165 16.7412 1.42915 16.5567 1.62602L16.0107 2.20402L18.8627 5.22402L19.4087 4.64502C19.5983 4.44524 19.7468 4.21011 19.8457 3.95302C20.0517 3.42749 20.0517 2.84355 19.8457 2.31802ZM17.4497 6.72102L14.5967 3.70002L9.8197 8.76002C9.74922 8.83511 9.70169 8.92879 9.6827 9.03002L9.1467 11.87C9.0767 12.24 9.3857 12.566 9.7347 12.492L12.4167 11.925C12.5143 11.9033 12.6031 11.8528 12.6717 11.78L17.4497 6.72102Z"
                              fill="#01565A"
                            />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M0 12C0 8.8174 1.26428 5.76516 3.51472 3.51472C5.76516 1.26428 8.8174 0 12 0C15.1826 0 18.2348 1.26428 20.4853 3.51472C22.7357 5.76516 24 8.8174 24 12C24 15.1826 22.7357 18.2348 20.4853 20.4853C18.2348 22.7357 15.1826 24 12 24C8.8174 24 5.76516 22.7357 3.51472 20.4853C1.26428 18.2348 0 15.1826 0 12ZM11.3152 17.136L18.224 8.4992L16.976 7.5008L11.0848 14.8624L6.912 11.3856L5.888 12.6144L11.3152 17.136Z"
                              fill="#00C820"
                            />
                          </svg>
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: '#000',
                    fontSize: '14px',
                    height: '42px',
                    borderRadius: '5px',
                  },
                }}
                placeholder="Rate More Experiences?"
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography fontSize={14} fontWeight={500} mb={1.5}>
                Set Timer
              </Typography>
              <TextField
                type="number"
                size="small"
                name="text_after_popup"
                variant="outlined"
                disabled={!isTimerInputFocused}
                value={time}
                onChange={(e) => {
                  const { value } = e.target;
                  // Update only if value is a positive integer, or clear if invalid
                  setTime(value === '' || (/^\d+$/.test(value) && Number(value) > 0) ? value : '');
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment
                      onClick={() => {
                        setIsTimerInputFocused(!isTimerInputFocused);
                        isTimerInputFocused && handleUpdate();
                      }}
                      position="end"
                    >
                      <Typography fontSize={14} color="rgba(0, 0, 0, 0.4)">
                        sec
                      </Typography>
                      <IconButton sx={{ p: 0.3, ml: 0.8 }}>
                        {!isTimerInputFocused ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M11.32 4.17578H5C3.895 4.17578 3 5.12478 3 6.29378V16.8818C3 18.0518 3.895 18.9998 5 18.9998H16C17.105 18.9998 18 18.0518 18 16.8818V9.13178L14.086 13.2758C13.7442 13.6413 13.2991 13.8938 12.81 13.9998L10.129 14.5678C8.379 14.9378 6.837 13.3048 7.187 11.4528L7.723 8.61378C7.82 8.10178 8.058 7.63078 8.407 7.26178L11.32 4.17578Z"
                              fill="#01565A"
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M19.8457 2.31802C19.7446 2.06205 19.5964 1.82732 19.4087 1.62602C19.2242 1.42915 19.0017 1.27165 18.7547 1.16302C18.5114 1.05615 18.2485 1.00098 17.9827 1.00098C17.7169 1.00098 17.454 1.05615 17.2107 1.16302C16.9637 1.27165 16.7412 1.42915 16.5567 1.62602L16.0107 2.20402L18.8627 5.22402L19.4087 4.64502C19.5983 4.44524 19.7468 4.21011 19.8457 3.95302C20.0517 3.42749 20.0517 2.84355 19.8457 2.31802ZM17.4497 6.72102L14.5967 3.70002L9.8197 8.76002C9.74922 8.83511 9.70169 8.92879 9.6827 9.03002L9.1467 11.87C9.0767 12.24 9.3857 12.566 9.7347 12.492L12.4167 11.925C12.5143 11.9033 12.6031 11.8528 12.6717 11.78L17.4497 6.72102Z"
                              fill="#01565A"
                            />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M0 12C0 8.8174 1.26428 5.76516 3.51472 3.51472C5.76516 1.26428 8.8174 0 12 0C15.1826 0 18.2348 1.26428 20.4853 3.51472C22.7357 5.76516 24 8.8174 24 12C24 15.1826 22.7357 18.2348 20.4853 20.4853C18.2348 22.7357 15.1826 24 12 24C8.8174 24 5.76516 22.7357 3.51472 20.4853C1.26428 18.2348 0 15.1826 0 12ZM11.3152 17.136L18.224 8.4992L16.976 7.5008L11.0848 14.8624L6.912 11.3856L5.888 12.6144L11.3152 17.136Z"
                              fill="#00C820"
                            />
                          </svg>
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: '#000',
                    fontSize: '14px',
                    height: '42px',
                    borderRadius: '5px',
                    width: '150px',
                  },
                }}
                placeholder="Time"
              />
            </Grid>
          </Grid>
          <Typography sx={{ fontSize: '14px', fontWeight: 500, mt: 2, mb: 1 }}>
            Customer Experiences
          </Typography>

          <Box>
            <Box display="flex" flexWrap="wrap" gap="10px">
              {data?.data?.customerExperiences?.length > 0 ? (
                data?.data?.customerExperiences?.map((experience) => (
                  <Box
                    key={experience?._id}
                    display="flex"
                    gap={1}
                    py="5px"
                    pl="5px"
                    pr="10px"
                    bgcolor="#EFF7F9"
                    alignItems="center"
                    border="1px solid #0000004D"
                    borderRadius="5px"
                    onClick={() => handleEditClick(experience)} // Set the selected experience to edit
                    sx={{ cursor: 'pointer' }}
                  >
                    <img
                      src={experience?.image}
                      alt="Experience"
                      style={{
                        width: '50px',
                        height: '50px',
                        objectFit: 'cover',
                        borderRadius: '5px',
                      }}
                    />
                    <Typography sx={{ fontSize: '15px' }}>{experience?.name}</Typography>
                  </Box>
                ))
              ) : (
                <Box sx={{ width: '100%', textAlign: 'center', fontSize: 12, mb: 1 }}>
                  No Experience found. Please add an experience by clicking on the button below.
                </Box>
              )}

              <Box
                borderRadius="48px"
                border="1px solid #0000004D"
                onClick={() => handleAddClick()}
              >
                <IconButton sx={{ bgcolor: '#EFF7F9' }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="43"
                    height="43"
                    viewBox="0 0 43 43"
                    fill="none"
                  >
                    <path
                      d="M34 24H24V34C24 35.1 23.1 36 22 36C20.9 36 20 35.1 20 34V24H10C8.9 24 8 23.1 8 22C8 20.9 8.9 20 10 20H20V10C20 8.9 20.9 8 22 8C23.1 8 24 8.9 24 10V20H34C35.1 20 36 20.9 36 22C36 23.1 35.1 24 34 24Z"
                      fill="#01565A"
                    />
                  </svg>
                </IconButton>
              </Box>
            </Box>

            {open && (
              <Dialog
                fullWidth
                maxWidth="xs"
                open={open}
                // onClose={() => setOpen(false)}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
              >
                <DialogContent sx={{ p: 3 }}>
                  <Stack gap="20px">
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                      <Box fontSize="15px" fontWeight={600} color="#000">
                        {isEditing ? 'Update Experience' : 'Add an Experience'}
                      </Box>

                      {isEditing && (
                        <Tooltip title="Delete Experience" arrow>
                          <IconButton onClick={handleDeleteExperience}>
                            {isDeleteExperienceLoading ? (
                              <CircularProgress size={18} />
                            ) : (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                              >
                                <path
                                  d="M8.33366 4.16667H11.667C11.667 3.72464 11.4914 3.30072 11.1788 2.98816C10.8663 2.67559 10.4424 2.5 10.0003 2.5C9.5583 2.5 9.13438 2.67559 8.82181 2.98816C8.50925 3.30072 8.33366 3.72464 8.33366 4.16667ZM7.08366 4.16667C7.08366 3.78364 7.1591 3.40437 7.30568 3.05051C7.45225 2.69664 7.66709 2.37511 7.93793 2.10427C8.20877 1.83343 8.5303 1.61859 8.88417 1.47202C9.23803 1.32544 9.6173 1.25 10.0003 1.25C10.3833 1.25 10.7626 1.32544 11.1165 1.47202C11.4704 1.61859 11.7919 1.83343 12.0627 2.10427C12.3336 2.37511 12.5484 2.69664 12.695 3.05051C12.8416 3.40437 12.917 3.78364 12.917 4.16667H17.7087C17.8744 4.16667 18.0334 4.23251 18.1506 4.34973C18.2678 4.46694 18.3337 4.62591 18.3337 4.79167C18.3337 4.95743 18.2678 5.1164 18.1506 5.23361C18.0334 5.35082 17.8744 5.41667 17.7087 5.41667H16.6087L15.6337 15.5092C15.5589 16.2825 15.1987 17.0002 14.6234 17.5224C14.0481 18.0445 13.2989 18.3336 12.522 18.3333H7.47866C6.70188 18.3334 5.95291 18.0442 5.37778 17.5221C4.80266 16.9999 4.4426 16.2823 4.36783 15.5092L3.39199 5.41667H2.29199C2.12623 5.41667 1.96726 5.35082 1.85005 5.23361C1.73284 5.1164 1.66699 4.95743 1.66699 4.79167C1.66699 4.62591 1.73284 4.46694 1.85005 4.34973C1.96726 4.23251 2.12623 4.16667 2.29199 4.16667H7.08366ZM8.75033 8.125C8.75033 7.95924 8.68448 7.80027 8.56727 7.68306C8.45006 7.56585 8.29109 7.5 8.12533 7.5C7.95957 7.5 7.80059 7.56585 7.68338 7.68306C7.56617 7.80027 7.50033 7.95924 7.50033 8.125V14.375C7.50033 14.5408 7.56617 14.6997 7.68338 14.8169C7.80059 14.9342 7.95957 15 8.12533 15C8.29109 15 8.45006 14.9342 8.56727 14.8169C8.68448 14.6997 8.75033 14.5408 8.75033 14.375V8.125ZM11.8753 7.5C11.7096 7.5 11.5506 7.56585 11.4334 7.68306C11.3162 7.80027 11.2503 7.95924 11.2503 8.125V14.375C11.2503 14.5408 11.3162 14.6997 11.4334 14.8169C11.5506 14.9342 11.7096 15 11.8753 15C12.0411 15 12.2001 14.9342 12.3173 14.8169C12.4345 14.6997 12.5003 14.5408 12.5003 14.375V8.125C12.5003 7.95924 12.4345 7.80027 12.3173 7.68306C12.2001 7.56585 12.0411 7.5 11.8753 7.5Z"
                                  fill="#FF5555"
                                />
                              </svg>
                            )}
                          </IconButton>
                        </Tooltip>
                      )}
                    </Box>
                    {data?.data?.customerExperiences?.length >= 7 && !isEditing ? (
                      <Box textAlign="center" py={3}>
                        <Typography>You can add maximum of 7 experiences.</Typography>
                        <Button
                          sx={{ borderRadius: '5px', fontWeight: 400, fontSize: '14px', mt: 1.5 }}
                          variant="outlined"
                          onClick={() => setOpen(false)}
                        >
                          Got it
                        </Button>
                      </Box>
                    ) : (
                      <>
                        <Box
                          display="flex"
                          gap="14px"
                          alignItems="center"
                          boxShadow="0px 96px 27px 0px rgba(0, 0, 0, 0.00)"
                        >
                          {image ? (
                            <img
                              src={image}
                              alt="Uploaded"
                              style={{ width: '100px', height: '100px', borderRadius: '50%' }}
                            />
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="100"
                              height="100"
                              viewBox="0 0 140 140"
                              fill="none"
                            >
                              <circle cx="70" cy="70" r="70" fill="#D9D9D9" />
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M62.8896 99H77.1104C87.0976 99 92.0928 99 95.68 96.6317C97.2278 95.6102 98.5609 94.2919 99.6032 92.7521C102 89.2077 102 84.268 102 74.3952C102 64.5191 102 59.5827 99.6032 56.0382C98.5609 54.4984 97.2279 53.1801 95.68 52.1587C93.376 50.6346 90.4896 50.09 86.0704 49.8967C83.9616 49.8967 82.1472 48.3178 81.7344 46.2717C81.4189 44.7729 80.5993 43.4298 79.4139 42.4693C78.2286 41.5088 76.7503 40.9899 75.2288 41.0001H64.7712C61.6096 41.0001 58.8864 43.2074 58.2656 46.2717C57.8528 48.3178 56.0384 49.8967 53.9296 49.8967C49.5136 50.09 46.6272 50.6378 44.32 52.1587C42.7732 53.1803 41.4412 54.4986 40.4 56.0382C38 59.5827 38 64.5191 38 74.3952C38 84.268 38 89.2045 40.3968 92.7521C41.4336 94.2859 42.7648 95.6038 44.32 96.6317C47.9072 99 52.9024 99 62.8896 99ZM70 61.2131C62.6368 61.2131 56.6656 67.113 56.6656 74.392C56.6656 81.6742 62.6368 87.5773 70 87.5773C77.3632 87.5773 83.3344 81.6742 83.3344 74.3952C83.3344 67.113 77.3632 61.2131 70 61.2131ZM70 66.4846C65.584 66.4846 62 70.0259 62 74.3952C62 78.7613 65.584 82.3025 70 82.3025C74.416 82.3025 78 78.7613 78 74.3952C78 70.0259 74.416 66.4846 70 66.4846ZM85.1104 63.8489C85.1104 62.3924 86.304 61.2131 87.7792 61.2131H91.3312C92.8032 61.2131 94 62.3924 94 63.8489C93.9932 64.5542 93.7087 65.228 93.2089 65.7222C92.7091 66.2164 92.0349 66.4907 91.3344 66.4846H87.7792C87.4321 66.488 87.0877 66.4226 86.7657 66.2919C86.4437 66.1613 86.1505 65.9681 85.9026 65.7234C85.6548 65.4786 85.4573 65.1871 85.3214 64.8655C85.1854 64.5438 85.1137 64.1984 85.1104 63.8489Z"
                                fill="black"
                              />
                            </svg>
                          )}
                          <Button
                            variant="outlined"
                            onClick={handleUploadClick}
                            sx={{
                              color: 'black',
                              border: '1px solid #0000004D',
                              borderRadius: '15px',
                              textTransform: 'none',
                              py: '7px',
                              px: '20px',
                              ':hover': {
                                bgcolor: 'white',
                                color: 'black',
                                border: '1px solid #0000004D',
                                borderRadius: '15px',
                                textTransform: 'none',
                              },
                            }}
                          >
                            Upload image
                          </Button>
                          <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            onChange={handleImageChange}
                          />
                        </Box>

                        <Box>
                          <Typography fontSize="15px" color="#000" mt="40px" mb="10px">
                            Name of Experience
                          </Typography>
                          <TextField
                            size="small"
                            fullWidth
                            value={experienceName}
                            onChange={(e) => setExperienceName(e.target.value)}
                          />
                        </Box>

                        <Box display="flex" gap="14px">
                          <LoadingButton
                            sx={{
                              borderRadius: '5px',
                              fontWeight: 400,
                              px: '25px',
                              fontSize: '15px',
                            }}
                            variant="contained"
                            onClick={onSubmit}
                            loading={isAddingExperienceLoading || isUpdateExperienceLoading}
                            disabled={
                              // !isEditing ? !experienceName || !selectedFile : !experienceName
                              !experienceName
                            }
                          >
                            {isEditing ? 'Update' : 'Add'}
                          </LoadingButton>
                          <Button
                            sx={{ borderRadius: '5px', fontWeight: 400, fontSize: '15px' }}
                            variant="outlined"
                            onClick={() => setOpen(false)}
                          >
                            Cancel
                          </Button>
                        </Box>
                      </>
                    )}
                  </Stack>
                </DialogContent>
              </Dialog>
            )}
          </Box>
        </>
      )}
    </Card>
  );
};

export default InterfaceTwo;
