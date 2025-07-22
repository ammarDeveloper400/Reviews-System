/* eslint-disable react/prop-types */

import { useState } from 'react';
import { toast } from 'react-toastify';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { LoadingButton } from '@mui/lab';
// import { fShortenNumber } from 'src/utils/format-number';
import Typography from '@mui/material/Typography';
import { Button, Dialog, TextField, DialogContent } from '@mui/material';

import { convertTo12HourFormat } from 'src/utils/functions';

import { useAdjustStaffRotaMutation } from 'src/services/rota';

import DaysToggleButtons from 'src/components/custom-toggle/days-toggle';

export default function RotaCard({ member }) {
  const [adjustRota, { isLoading }] = useAdjustStaffRotaMutation();

  const [open, setOpen] = useState(false);

  const [checkInTime, setCheckInTime] = useState('');
  const [checkOutTime, setCheckOutTime] = useState('');
  const [shifts, setShifts] = useState({
    monday: { active: false },
    tuesday: { active: false },
    wednesday: { active: false },
    thursday: { active: false },
    friday: { active: false },
    saturday: { active: false },
    sunday: { active: false },
  });

  const handleAdjustRota = (item) => {
    setOpen(true);
    setCheckInTime(item?.checkIn);
    setCheckOutTime(item?.checkOut);
    setShifts(item?.shifts);
  };

  const handleSave = async () => {
    const payload = {
      checkIn: checkInTime,
      checkOut: checkOutTime,
      shifts,
    };
    try {
      await adjustRota({ payload, id: member?._id }).unwrap();
      toast.success('Rota adjusted successfully.');
      setOpen(false);
    } catch (err) {
      toast.error(err?.data?.message);
    }
  };

  const handleCheckInTimeChange = (event) => {
    setCheckInTime(event.target.value);
    setCheckOutTime(''); // Clear the checkout time whenever check-in time changes
  };

  const handleCheckOutTimeChange = (event) => {
    const selectedCheckoutTime = event.target.value;

    // Check if the selected checkout time is earlier than the check-in time
    if (checkInTime && selectedCheckoutTime <= checkInTime) {
      toast.error('Checkout time must be later than check-in time');
      setCheckOutTime(''); // Reset the checkout time if it's invalid
    } else {
      setCheckOutTime(selectedCheckoutTime);
    }
  };
  return (
    <>
      <Card
        sx={{
          p: '10px 16px',
          bgcolor: '#fff',
          borderRadius: '15px',
          color: '#000',
          width: 1,
          minHeight: '80px',
          minWidth: '1000px',
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          flexWrap="nowrap"
          justifyContent="space-between"
          gap={{ xs: 2, lg: 3 }}
        >
          <Box display="flex" alignItems="center" gap={1.2}>
            <Box width={60} height={60}>
              <img
                width="100%"
                height="100%"
                style={{ borderRadius: '100%', objectFit: 'cover' }}
                src={member?.image}
                alt=""
              />
            </Box>
            <Stack>
              <Typography fontSize={14}>{member?.name}</Typography>

              <Typography fontSize={10} color="rgba(0, 0, 0, 0.5)">
                {member?.email}
              </Typography>
            </Stack>
          </Box>
          <DaysToggleButtons shifts={member?.shifts} readOnly />
          <Box display="flex" alignItems="center" gap={0.5}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M12 6C12.2652 6 12.5196 6.10536 12.7071 6.29289C12.8946 6.48043 13 6.73478 13 7V11.422L15.098 12.634C15.3258 12.7676 15.4915 12.9858 15.559 13.2411C15.6265 13.4964 15.5903 13.768 15.4583 13.9967C15.3262 14.2254 15.1091 14.3926 14.8543 14.4617C14.5994 14.5309 14.3276 14.4965 14.098 14.366L11.5 12.866C11.3483 12.7778 11.2224 12.6515 11.1346 12.4996C11.0469 12.3477 11.0005 12.1754 11 12V7C11 6.73478 11.1054 6.48043 11.2929 6.29289C11.4804 6.10536 11.7348 6 12 6Z"
                fill="#01565A"
              />
              <path
                opacity="0.5"
                d="M2 12C2 13.9778 2.58649 15.9112 3.6853 17.5557C4.78412 19.2002 6.3459 20.4819 8.17317 21.2388C10.0004 21.9957 12.0111 22.1937 13.9509 21.8079C15.8907 21.422 17.6725 20.4696 19.0711 19.0711C20.4696 17.6725 21.422 15.8907 21.8079 13.9509C22.1937 12.0111 21.9957 10.0004 21.2388 8.17317C20.4819 6.3459 19.2002 4.78412 17.5557 3.6853C15.9112 2.58649 13.9778 2 12 2C10.6868 2 9.38642 2.25866 8.17317 2.7612C6.95991 3.26375 5.85752 4.00035 4.92893 4.92893C3.05357 6.8043 2 9.34784 2 12ZM11 7C11 6.73478 11.1054 6.48043 11.2929 6.29289C11.4804 6.10536 11.7348 6 12 6C12.2652 6 12.5196 6.10536 12.7071 6.29289C12.8946 6.48043 13 6.73478 13 7V11.422L15.098 12.634C15.3258 12.7676 15.4915 12.9858 15.559 13.2411C15.6265 13.4964 15.5903 13.768 15.4583 13.9967C15.3262 14.2254 15.1091 14.3926 14.8543 14.4617C14.5994 14.5309 14.3276 14.4965 14.098 14.366L11.5 12.866C11.3483 12.7778 11.2224 12.6515 11.1346 12.4996C11.0469 12.3477 11.0005 12.1754 11 12V7Z"
                fill="#01565A"
              />
            </svg>
            <Typography fontSize={14}>{convertTo12HourFormat(member?.checkIn)}</Typography>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="65"
              height="8"
              viewBox="0 0 65 8"
              fill="none"
            >
              <path
                d="M64.3536 4.35355C64.5488 4.15829 64.5488 3.84171 64.3536 3.64645L61.1716 0.464466C60.9763 0.269204 60.6597 0.269204 60.4645 0.464466C60.2692 0.659728 60.2692 0.976311 60.4645 1.17157L63.2929 4L60.4645 6.82843C60.2692 7.02369 60.2692 7.34027 60.4645 7.53553C60.6597 7.7308 60.9763 7.7308 61.1716 7.53553L64.3536 4.35355ZM0 4.5H64V3.5H0V4.5Z"
                fill="black"
              />
            </svg>
            <Typography fontSize={14}>{convertTo12HourFormat(member?.checkOut)}</Typography>
          </Box>
          {member?.isActive ? (
            <Button
              variant="contained"
              color="success"
              sx={{
                fontSize: 14,
                fontWeight: 400,
                p: '4px 10px',
                borderRadius: '50px',
                minWidth: '85px',
                ':hover': { background: '#00C820' },
              }}
            >
              Available
            </Button>
          ) : (
            <Button
              variant="contained"
              color="error"
              sx={{
                fontSize: 14,
                fontWeight: 400,
                p: '4px 10px',
                borderRadius: '50px',
                ':hover': { background: '#FE0000' },
              }}
            >
              Offline
            </Button>
          )}
          <Button
            onClick={() => handleAdjustRota(member)}
            sx={{
              fontSize: 14,
              fontWeight: 400,
              height: '36px',
              borderRadius: '10px',
              whiteSpace: 'nowrap',
              px: { lg: 4, xs: 2 },
              ':hover': { background: '#01565A', color: '#fff' },
              minWidth: '100px',
            }}
            variant="outlined"
          >
            Adjust Rota
          </Button>
        </Box>
      </Card>
      {open && (
        <Dialog
          fullWidth
          maxWidth="xs"
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="report-seller"
          aria-describedby="report-seller-description"
          // PaperProps={{ sx: { background: ThemeModeColor('#eeeaf8', '#0C0020')} }}
        >
          <DialogContent sx={{ px: '40px' }}>
            <Box>
              <Typography sx={{ fontSize: '30px', textAlign: 'center', fontWeight: 600, mb: 4 }}>
                Adjust Rota
              </Typography>
              <Typography sx={{ fontSize: '18px', mb: 1.5 }}>Select Days</Typography>
              <DaysToggleButtons setShifts={setShifts} shifts={shifts} />
              <Typography sx={{ fontSize: '18px', my: 1.5 }}>Select time</Typography>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <Typography color="#000" fontSize={13}>
                  Check-in time
                </Typography>
                <Box>
                  <TextField
                    name="checkInTime"
                    type="time"
                    value={checkInTime}
                    onChange={handleCheckInTimeChange}
                    fullWidth
                    size="small"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        height: 35,
                        minWidth: 150,
                      },
                    }}
                  />
                </Box>
              </Box>

              <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <Typography color="#000" fontSize={13}>
                  Check-out time
                </Typography>
                <Box>
                  <TextField
                    name="checkOutTime"
                    type="time"
                    value={checkOutTime}
                    onChange={handleCheckOutTimeChange}
                    fullWidth
                    size="small"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        height: 35,
                        minWidth: 150,
                      },
                    }}
                    inputProps={{
                      min: checkInTime || '00:00', // Set min time based on check-in time
                    }}
                  />
                </Box>
              </Box>
              <Box display="flex" mt="24px">
                <LoadingButton
                  variant="outlined"
                  sx={{ fontSize: '18px', fontWeight: 400, px: '35px' }}
                  disabled={!checkInTime || !checkOutTime}
                  loading={isLoading}
                  onClick={handleSave}
                >
                  Save
                </LoadingButton>
              </Box>
            </Box>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
