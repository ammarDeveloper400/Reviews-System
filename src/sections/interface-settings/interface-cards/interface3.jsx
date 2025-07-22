/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-expressions */
/* eslint-disable array-callback-return */
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';

import { LoadingButton } from '@mui/lab';
import {
  Box,
  Card,
  Stack,
  Dialog,
  Button,
  //   Grid,
  Divider,
  Skeleton,
  TextField,
  Typography,
  IconButton,
  DialogContent,
  InputAdornment,
} from '@mui/material';

import {
  useUpdateInterfaceThreeMutation,
  useGetInterfaceThreeDetailsQuery,
} from 'src/services/interface-settings/interface-three';

import Iconify from 'src/components/iconify';
import CustomToggleButton from 'src/components/custom-toggle/toggle';

const socialIcons = {
  instagram: '/assets/icons/hugeicons_instagram.svg',
  facebook: '/assets/icons/basil_facebook-outline.svg',
  whatsapp: '/assets/icons/ic_sharp-whatsapp.svg',
  snapchat: '/assets/icons/iconoir_snapchat.svg',
  tiktok: '/assets/icons/ri_tiktok-line.svg',
  youtube: '/assets/icons/iconoir_youtube.svg',
  linkedin: '/assets/icons/basil_linkedin-outline.svg',
  telegram: '/assets/icons/hugeicons_telegram.svg',
  wechat: '/assets/icons/hugeicons_wechat.svg',
  pinterest: '/assets/icons/ant-design_pinterest-outlined.svg',
  twitter: '/assets/icons/ph_x-logo.svg',
  google: '/assets/icons/google.svg',
  trustpilot: '/assets/icons/trustpilot.svg',
};

const InterfaceThree = () => {
  const { data, isLoading, isFetching } = useGetInterfaceThreeDetailsQuery();

  const [time, setTime] = useState(data?.data?.timer ?? '');

  const [updateInterface, { isLoading: handleUpdateLoading }] = useUpdateInterfaceThreeMutation();

  //   const [isInputFocused, setIsInputFocused] = useState(false);
  const [isTimerInputFocused, setIsTimerInputFocused] = useState(false);
  const [open, setOpen] = useState(false);

  const [socialLinks, setSocialLinks] = useState(data?.data?.socialLinks || {});

  const handleInputChange = (item, value) => {
    setSocialLinks((prevLinks) => ({
      ...prevLinks,
      [item]: value,
    }));
  };

  const handleUpdate = async (newStatus) => {
    const filteredSocialLinks =
      socialLinks &&
      Object.keys(socialLinks).reduce((acc, key) => {
        if (socialLinks[key]?.trim()) {
          acc[key] = socialLinks[key];
        }
        return acc;
      }, {});

    const payload = {
      status: newStatus,
      timer: time,
      socialLinks: filteredSocialLinks,
    };

    try {
      await updateInterface(payload).unwrap();
      toast.success('Interface updated successfully.');
      setOpen(false);
    } catch (err) {
      toast.error(err?.data?.error?.message || 'An error occurred');
    }
  };

  useEffect(() => {
    if (data) {
      setTime(data.data?.timer);
      setSocialLinks(data.data?.socialLinks);
    }
  }, [data]);

  return (
    <>
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
                Interface 3: Show off your socials!
              </Typography>
              <CustomToggleButton
                handleUpdate={(newStatus) => handleUpdate(newStatus)}
                activeBtnText="Enable"
                inactiveBtnText="Disable"
                initialStatus={data?.data?.status} // Pass the correct status here
              />
            </Box>

            <Box
              display="flex"
              flexWrap="wrap"
              gap={{ md: '31px', xs: '0px', sm: '31px' }}
              alignItems="center"
              justifyContent="space-between"
              mt="20px"
            >
              <Button
                onClick={() => setOpen(true)}
                sx={{
                  py: '5px',
                  borderRadius: '5px',
                  fontWeight: 400,
                  pl: '15px',
                  pr: '6px',
                  color: '#000',
                  border: '1px solid #919EAB',
                  gap: { md: '6px', sm: '6px', xs: '0px' },
                  alignItems: 'center',
                  fontSize: { md: '15px', xs: '12px', sm: '15px' },
                  height: 34,
                }}
              >
                Update socials
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M18 13H13V18C13 18.55 12.55 19 12 19C11.45 19 11 18.55 11 18V13H6C5.45 13 5 12.55 5 12C5 11.45 5.45 11 6 11H11V6C11 5.45 11.45 5 12 5C12.55 5 13 5.45 13 6V11H18C18.55 11 19 11.45 19 12C19 12.55 18.55 13 18 13Z"
                    fill="#01565A"
                  />
                </svg>
              </Button>
              <Box display="flex" alignItems="center" gap="5px">
                <Typography
                  fontSize={{ md: 13, xs: 12, sm: 13 }}
                  mt={1.5}
                  fontWeight={500}
                  mb={1.5}
                >
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
                    setTime(
                      value === '' || (/^\d+$/.test(value) && Number(value) > 0) ? value : ''
                    );
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
                      height: '34px',
                      borderRadius: '5px',
                      width: '150px',
                    },
                  }}
                  placeholder="Time"
                />
              </Box>
            </Box>
            <Box mt="20px">
              {data?.data?.socialLinks && typeof data?.data?.socialLinks === 'object' ? (
                Object.keys(data?.data?.socialLinks)?.length === 0 ? (
                  <Box width={1} textAlign="center">
                    <Typography fontSize={12} mx="auto">
                      No social links available
                    </Typography>
                  </Box>
                ) : (
                  Object.keys(data?.data?.socialLinks)?.map((link) => (
                    <Box
                      key={link}
                      sx={{
                        px: '7px',
                        height: '36px',
                        border: '1px solid #919EAB',
                        borderRadius: '5px',
                        py: '2px',
                        display: 'flex',
                        alignItems: 'center',
                        mb: 1.5,
                      }}
                    >
                      <Box sx={{ pl: 0, pr: 0.6 }}>
                        <img src={socialIcons[link]} width={23} height={23} alt="" />
                      </Box>

                      <Divider
                        orientation="vertical"
                        flexItem
                        sx={{ borderColor: 'black', my: '5px' }}
                      />
                      <Typography sx={{ fontSize: '13px', ml: 1 }}>
                        {data?.data?.socialLinks[link]}
                      </Typography>
                    </Box>
                  ))
                )
              ) : (
                <Box width={1} textAlign="center">
                  <Typography fontSize={14} mx="auto">
                    Please add social links by clicking on update socials button.
                  </Typography>
                </Box>
              )}
            </Box>
          </>
        )}
      </Card>
      {open && (
        <Dialog
          fullWidth
          maxWidth="xs"
          open={open}
          aria-labelledby="report-seller"
          aria-describedby="report-seller-description"
        >
          <DialogContent>
            <Typography sx={{ fontSize: '15px', fontWeight: '600' }}>
              Add social media links
            </Typography>
            {Object.keys(socialIcons).map((item) => (
              <Box key={item} mt="15px">
                <TextField
                  variant="outlined"
                  fullWidth
                  placeholder="Link"
                  value={(socialLinks && socialLinks[item]) || ''}
                  onChange={(e) => handleInputChange(item, e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <>
                        <InputAdornment position="start" sx={{ flexShrink: 0 }}>
                          <img style={{ paddingLeft: '8px' }} src={socialIcons[item]} alt="" />
                        </InputAdornment>
                        <Divider
                          orientation="vertical"
                          flexItem
                          sx={{ borderColor: 'black', my: '10px', mr: '10px' }}
                        />
                      </>
                    ),
                    endAdornment: socialLinks && socialLinks[item] && (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() =>
                            setSocialLinks((prevLinks) => ({
                              ...prevLinks,
                              [item]: '',
                            }))
                          }
                        >
                          <Iconify icon="eva:close-fill" />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      fontSize: '13px',
                      height: '36px',
                      alignItems: 'center',
                      p: 0,
                    },
                    '& .MuiInputBase-input': {
                      padding: 0,
                    },
                  }}
                />
              </Box>
            ))}
            <Box mt="15px" display="flex" gap="10px">
              <LoadingButton
                variant="contained"
                onClick={() => handleUpdate()}
                loading={handleUpdateLoading}
                sx={{
                  px: '25px',
                  py: '7px',
                  fontSize: '15px',
                  fontWeight: 400,
                  borderRadius: '5px',
                }}
              >
                Update
              </LoadingButton>
              <Button
                variant="outlined"
                onClick={() => setOpen(false)}
                sx={{
                  px: '25px',
                  py: '7px',
                  fontSize: '15px',
                  fontWeight: 400,
                  borderRadius: '5px',
                }}
              >
                Cancel
              </Button>
            </Box>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default InterfaceThree;
