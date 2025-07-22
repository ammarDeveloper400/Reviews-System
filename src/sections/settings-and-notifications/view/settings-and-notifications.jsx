/* eslint-disable no-unused-vars */
import { toast } from 'react-toastify';
/* eslint-disable no-nested-ternary */
import { useState, useEffect } from 'react';

import { LoadingButton } from '@mui/lab';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import {
  Box,
  Grid,
  Card,
  Stack,
  Radio,
  Button,
  Checkbox,
  RadioGroup,
  IconButton,
  FormControlLabel,
  CircularProgress,
} from '@mui/material';

import {
  useGetEmailPreferencesQuery,
  useGetEmailTemplatesListQuery,
  useGetBossEmailPreferencesQuery,
  useDeleteEmailPreferenceMutation,
  useUpdateBossEmailPreferenceMutation,
  useSetEmailPreferenceForStaffMutation,
  useSetEmailPreferenceForManagementMutation,
} from 'src/services/settings-and-notifications';

import Iconify from 'src/components/iconify';
import GlobalTable from 'src/components/custom-table';

import EmailModal from '../email-modal';
import EmailTemplateCard from '../email-template-card';
import SelectStaffModal from '../../../components/select-staff-modal';

// ----------------------------------------------------------------------

export default function SettingsAndNotifications() {
  const { data, isLoading } = useGetEmailTemplatesListQuery();

  const [setEmailPreferenceForManagement, { isLoading: setEmailPreferenceForManagementIsLoading }] =
    useSetEmailPreferenceForManagementMutation();
  const [setEmailPreferenceForStaff, { isLoading: setEmailPreferenceForStaffIsLoading }] =
    useSetEmailPreferenceForStaffMutation();

  const { data: emailPreferencesList, isLoading: emailPreferencesLoading } =
    useGetEmailPreferencesQuery();
  const { data: bossEmailPreferences, isLoading: bossEmailPreferencesLoading } =
    useGetBossEmailPreferencesQuery();

  const [deleteEmailPreference] = useDeleteEmailPreferenceMutation();

  const [updateBossEmailPreference, { isLoading: updateBossEmailPreferenceIsLoading }] =
    useUpdateBossEmailPreferenceMutation();

  const [openEmailModal, setOpenEmailModal] = useState(false);
  const [openStaffModal, setOpenStaffModal] = useState(false);

  const [staffQRCodeCommentsValue, setStaffQRCodeCommentsValue] = useState('');
  const [staffStoreRatingsValue, setStaffStoreRatingsValue] = useState('');

  const [managementQRCodeCommentsValue, setManagementQRCodeCommentsValue] = useState('');
  const [managementStoreRatingsValue, setManagementStoreRatingsValue] = useState('');

  const [selectedEmailTemplate, setSelectedEmailTemplate] = useState(null);

  const [preferences, setPreferences] = useState({
    QR: {
      instant: false,
      daily: false,
      weekly: false,
      monthly: false,
      yearly: false,
    },
    Manual: {
      instant: false,
      daily: false,
      weekly: false,
      monthly: false,
      yearly: false,
    },
  });

  const handleStaffEmailPreferences = async (users) => {
    const emailPreferences = [];
    if (staffQRCodeCommentsValue)
      emailPreferences.push({ type: 'QR', choice: staffQRCodeCommentsValue });
    if (staffStoreRatingsValue)
      emailPreferences.push({ type: 'Manual', choice: staffStoreRatingsValue });

    const payload = {
      users,
      emailPreferences,
    };
    try {
      await setEmailPreferenceForStaff(payload).unwrap();
      toast.success('Email preferences updated successfully');
      setOpenStaffModal(false);
    } catch (err) {
      toast.error(err?.data?.message || 'An error occurred');
    }
  };
  const handleManagementEmailPreferences = async () => {
    const emailPreferences = [];
    if (managementQRCodeCommentsValue)
      emailPreferences.push({ type: 'QR', choice: managementQRCodeCommentsValue });
    if (managementStoreRatingsValue)
      emailPreferences.push({ type: 'Manual', choice: managementStoreRatingsValue });

    const payload = {
      emailPreferences,
    };
    try {
      await setEmailPreferenceForManagement(payload).unwrap();
      toast.success('Email preferences updated successfully');
    } catch (err) {
      toast.error(err?.data?.message || 'An error occurred');
    }
  };

  const handleDeletePreference = async (type, preference) => {
    if (window.confirm('Are you sure you want to remove this preference?')) {
      try {
        await deleteEmailPreference({ type, preference }).unwrap();
        toast.success('Preference deleted successfully.');
      } catch (err) {
        toast.error(err?.data?.message || 'An error occurred');
      }
    }
  };

  const staffQrPreferenceColumns = [
    {
      id: 'frequency',
      header: 'Frequency',
      render: ({ name }) => (
        <Typography fontSize={14} textTransform="capitalize">
          {name}
        </Typography>
      ),
    },
    {
      id: 'staff',
      header: 'Staff',
      render: ({ staff }) => (
        <Box display="flex" alignItems="center">
          {staff?.length > 0
            ? staff?.map((item) => (
                <Typography key={item?._id} fontSize={14}>
                  {`${item?.name}, `}
                </Typography>
              ))
            : '--'}
        </Box>
      ),
    },
    {
      id: 'action',
      header: 'Action',
      render: ({ name }) => (
        <Box>
          <IconButton onClick={() => handleDeletePreference('QR', name)}>
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
          </IconButton>
        </Box>
      ),
    },
  ];
  const staffManualPreferenceColumns = [
    {
      id: 'frequency',
      header: 'Frequency',
      render: ({ name }) => (
        <Typography fontSize={14} textTransform="capitalize">
          {name}
        </Typography>
      ),
    },
    {
      id: 'staff',
      header: 'Staff',
      render: ({ staff }) => (
        <Box display="flex" alignItems="center">
          {staff?.length > 0
            ? staff?.map((item) => (
                <Typography key={item?._id} fontSize={14}>
                  {`${item?.name}, `}
                </Typography>
              ))
            : '--'}
        </Box>
      ),
    },
    {
      id: 'action',
      header: 'Action',
      render: ({ name }) => (
        <Box>
          <IconButton onClick={() => handleDeletePreference('Manual', name)}>
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
          </IconButton>
        </Box>
      ),
    },
  ];

  // Initialize the state from the data when it becomes available
  useEffect(() => {
    if (bossEmailPreferences?.data) {
      setPreferences({
        QR: { ...bossEmailPreferences?.data?.QR },
        Manual: { ...bossEmailPreferences?.data?.Manual },
      });
    }
  }, [bossEmailPreferences?.data]);

  // Handle checkbox changes dynamically based on section (QR or Manual)
  const handleCheckboxChange = (section, item) => {
    setPreferences((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [item]: !prev[section][item],
      },
    }));
  };

  // Submit preferences by building payload from the current state
  const handleUpdateBossEmailPreferences = async () => {
    const payload = { preferences };

    try {
      await updateBossEmailPreference(payload).unwrap();
      toast.success('Preferences updated successfully!');
    } catch (error) {
      toast.error(error?.data?.message || 'An error occurred');
    }
  };

  const renderCheckboxGroup = (sectionLabel, sectionKey) => (
    <>
      <Typography fontSize={12} color="rgb(0,0,0,0.5)">
        {sectionLabel}
      </Typography>
      {['instant', 'daily', 'weekly', 'monthly', 'yearly'].map((item) => (
        <FormControlLabel
          sx={{ pl: 1 }}
          key={item}
          control={
            <Checkbox
              checked={preferences[sectionKey][item]}
              onChange={() => handleCheckboxChange(sectionKey, item)}
              sx={{ p: '5px', '& .MuiSvgIcon-root': { fontSize: '18px' } }}
            />
          }
          label={
            <Typography fontSize={15} textTransform="capitalize" fontWeight={600}>
              {item}
            </Typography>
          }
        />
      ))}
    </>
  );

  return (
    <>
      <Container maxWidth="xl">
        <Typography variant="h4" fontWeight={600}>
        Automate Performance Notifications
        </Typography>
        <Box display="flex" justifyContent="end" mb={3} mt={{ md: 1, xs: 3 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setSelectedEmailTemplate(null);
              setOpenEmailModal(true);
            }}
            sx={{
              fontSize: { md: '16px', xs: '14px' },
              fontWeight: 400,
              px: 4,
              borderRadius: '10px',
              height: '42px',
            }}
            endIcon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 25 25"
                fill="none"
              >
                <path
                  d="M10.5652 21.5652C10.5652 21.9457 10.7164 22.3107 10.9855 22.5798C11.2545 22.8488 11.6195 23 12 23C12.3805 23 12.7455 22.8488 13.0145 22.5798C13.2836 22.3107 13.4348 21.9457 13.4348 21.5652L13.4348 13.4348L21.5652 13.4348C21.9457 13.4348 22.3107 13.2836 22.5798 13.0145C22.8488 12.7455 23 12.3805 23 12C23 11.6195 22.8488 11.2545 22.5798 10.9855C22.3107 10.7164 21.9457 10.5652 21.5652 10.5652L13.4348 10.5652L13.4348 2.43478C13.4348 2.05425 13.2836 1.68931 13.0145 1.42024C12.7455 1.15116 12.3805 0.999999 12 0.999999C11.6195 0.999999 11.2545 1.15116 10.9855 1.42024C10.7164 1.68931 10.5652 2.05425 10.5652 2.43478L10.5652 10.5652L2.43478 10.5652C2.05426 10.5652 1.68931 10.7164 1.42024 10.9855C1.15117 11.2545 1 11.6195 1 12C1 12.3805 1.15117 12.7455 1.42024 13.0145C1.68931 13.2836 2.05426 13.4348 2.43478 13.4348L10.5652 13.4348L10.5652 21.5652Z"
                  fill="white"
                />
              </svg>
            }
          >
           Trigger Performance-Based Emails
          </Button>
        </Box>
        <Grid container spacing={2}>
          {isLoading ? (
            <Box width={1} py={5} textAlign="center">
              <CircularProgress />
            </Box>
          ) : data?.emailTemplates?.length > 0 ? (
            data?.emailTemplates?.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={item?._id}>
                <EmailTemplateCard
                  index={index + 1}
                  item={item}
                  setSelectedEmailTemplate={setSelectedEmailTemplate}
                  setOpenEmailModal={setOpenEmailModal}
                />
              </Grid>
            ))
          ) : (
            <Box width={1} py={5} textAlign="center">
              <Typography fontWeight={500}>No performance-based emails are automated, let’s add some!</Typography>
            </Box>
          )}
        </Grid>

        <Grid container spacing={2} mt={2}>
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                p: 2,
                borderRadius: '15px',
                color: '#000',
              }}
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                gap={1}
                flexWrap="wrap"
                mb={1}
              >
                <Typography fontSize={18}>
                Send Performance Results to  <span style={{ fontWeight: 700 }}>Staff</span>
                </Typography>
                <LoadingButton
                  disabled={!staffQRCodeCommentsValue && !staffStoreRatingsValue}
                  onClick={() => {
                    setOpenStaffModal(true);
                  }}
                  sx={{ fontSize: 14, fontWeight: 400, borderRadius: '10px', px: 4, ml: 'auto' }}
                  variant="contained"
                >
                  Apply
                </LoadingButton>
              </Box>
              <Stack gap={0.8}>
                <Typography fontSize={12} color="rgb(0,0,0,0.5)">
                  (Ratings & Comments received from QR code)
                </Typography>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={staffQRCodeCommentsValue}
                  onChange={({ target }) => setStaffQRCodeCommentsValue(target.value)}
                  sx={{ ml: 1, gap: 1 }}
                >
                  {['instant', 'daily', 'weekly', 'monthly', 'yearly'].map((item) => (
                    <FormControlLabel
                      key={item}
                      value={item}
                      control={
                        <Radio
                          sx={{ p: '5px', '& .MuiSvgIcon-root': { fontSize: '16px' } }}
                          checkedIcon={
                            <Iconify
                              icon="material-symbols:check-circle"
                              width="inherit"
                              height="inherit"
                            />
                          }
                        />
                      }
                      label={
                        <Typography fontSize={15} textTransform="capitalize" fontWeight={600}>
                          {item}
                        </Typography>
                      }
                    />
                  ))}
                </RadioGroup>
                <Box height={1.5} />
                <Typography fontSize={12} color="rgb(0,0,0,0.5)">
                  (Ratings received from in-store)
                </Typography>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={staffStoreRatingsValue}
                  onChange={({ target }) => setStaffStoreRatingsValue(target.value)}
                  sx={{ ml: 1, gap: 1 }}
                >
                  {['instant', 'daily', 'weekly', 'monthly', 'yearly'].map((item) => (
                    <FormControlLabel
                      key={item}
                      value={item}
                      control={
                        <Radio
                          sx={{ p: '5px', '& .MuiSvgIcon-root': { fontSize: '16px' } }}
                          checkedIcon={
                            <Iconify
                              icon="material-symbols:check-circle"
                              width="inherit"
                              height="inherit"
                            />
                          }
                        />
                      }
                      label={
                        <Typography fontSize={15} textTransform="capitalize" fontWeight={600}>
                          {item}
                        </Typography>
                      }
                    />
                  ))}
                </RadioGroup>
              </Stack>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                p: 2,
                borderRadius: '15px',
                color: '#000',
              }}
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                gap={1}
                flexWrap="wrap"
                mb={1}
              >
                <Typography fontSize={18}>
                Send Performance Results to <span style={{ fontWeight: 700 }}>Management</span>
                </Typography>
                <LoadingButton
                  loading={updateBossEmailPreferenceIsLoading}
                  onClick={handleUpdateBossEmailPreferences}
                  sx={{ fontSize: 14, fontWeight: 400, borderRadius: '10px', px: 4, ml: 'auto' }}
                  variant="contained"
                  // disabled={!managementQRCodeCommentsValue && !managementStoreRatingsValue}
                >
                  Apply
                </LoadingButton>
              </Box>
              <Stack gap={0.8}>
                {/* Render QR Code preferences */}
                {renderCheckboxGroup('(Ratings & Comments received from QR code)', 'QR')}

                {/* Render Manual preferences */}
                {renderCheckboxGroup('(Ratings received from in-store)', 'Manual')}
              </Stack>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Typography fontSize={18} fontWeight={600}>
              Manage Email Preferences for Staff (QR Code)
            </Typography>
            <GlobalTable
              data={emailPreferencesList?.data?.QR && emailPreferencesList?.data?.QR}
              isLoading={emailPreferencesLoading}
              columns={staffQrPreferenceColumns}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography fontSize={18} fontWeight={600}>
              Manage Email Preferences for Staff (In-store)
            </Typography>
            <GlobalTable
              data={emailPreferencesList?.data?.Manual && emailPreferencesList?.data?.Manual}
              isLoading={emailPreferencesLoading}
              columns={staffManualPreferenceColumns}
            />
          </Grid>
        </Grid>
      </Container>
      {openEmailModal && (
        <EmailModal
          open={openEmailModal}
          setOpen={setOpenEmailModal}
          emailTemplate={selectedEmailTemplate}
        />
      )}
      {openStaffModal && (
        <SelectStaffModal
          open={openStaffModal}
          setOpen={setOpenStaffModal}
          handleSendEmail={handleStaffEmailPreferences}
          loading={setEmailPreferenceForStaffIsLoading}
        />
      )}
    </>
  );
}
