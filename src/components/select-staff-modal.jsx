/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import React from 'react';

import { LoadingButton } from '@mui/lab';
import {
  Box,
  Stack,
  Dialog,
  Select,
  Checkbox,
  MenuItem,
  TextField,
  Typography,
  DialogContent,
  InputAdornment,
  FormControlLabel,
  CircularProgress,
} from '@mui/material';

import { useGetStaffMembersListQuery } from 'src/services/manage-staff';

// import { PhotoCamera, CalendarToday } from '@mui/icons-material';

const MenuProps = {
  PaperProps: {
    style: {
      background: '#E1F296',
      color: '#000',
      boxShadow: 'none',
      borderRadius: '10px',
    },
  },
};

const SelectStaffModal = ({ open, setOpen, showAutomateSettings, handleSendEmail, loading }) => {
  const [checkedItems, setCheckedItems] = React.useState([]);
  const [selectAll, setSelectAll] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [filteredStaff, setFilteredStaff] = React.useState([]);

  const { data, isLoading } = useGetStaffMembersListQuery();

  React.useEffect(() => {
    if (data?.staff) {
      const filtered = data.staff.filter(
        (staff) =>
          staff?.name?.toLowerCase().includes(searchQuery) ||
          staff?.email?.toLowerCase().includes(searchQuery)
      );
      setFilteredStaff(filtered);
    }
  }, [data, searchQuery]);

  const handleCheckboxChange = (id) => {
    setCheckedItems((prev) => {
      if (prev.includes(id)) {
        return prev.filter((itemId) => itemId !== id);
      }
      return [...prev, id];
    });
  };

  const handleSelectAllChange = () => {
    if (selectAll) {
      setCheckedItems([]);
    } else {
      setCheckedItems(filteredStaff?.map((staff) => staff?._id));
    }
    setSelectAll(!selectAll);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={open}
      onClose={() => setOpen(false)}
      PaperProps={{ sx: { borderRadius: '15px', p: 2.5, color: '#000' } }}
    >
      <Box display="flex" gap={2} justifyContent="space-between">
        {showAutomateSettings && (
          <Box>
            <Typography fontWeight={500} fontSize={10} mb={0.5}>
              Automate these settings for
            </Typography>
            <Select
              id="sorting"
              type="text"
              value="every-day"
              name="sorting"
              // onChange={handleChange}
              MenuProps={MenuProps}
              IconComponent={(props) => (
                <svg
                  {...props}
                  xmlns="http://www.w3.org/2000/svg"
                  width="9"
                  height="9"
                  viewBox="0 0 16 9"
                  fill="none"
                >
                  <path
                    d="M15.6478 0.34416C15.4222 0.123795 15.1163 8.76423e-07 14.7974 8.48538e-07C14.4784 8.20654e-07 14.1725 0.123795 13.947 0.34416L7.99274 6.16269L2.03852 0.344159C1.81166 0.13004 1.50781 0.0115601 1.19242 0.014238C0.87703 0.0169159 0.575334 0.140538 0.352313 0.358478C0.12929 0.576417 0.00278639 0.871238 4.64601e-05 1.17944C-0.00269443 1.48764 0.118548 1.78457 0.33766 2.00626L7.14231 8.65584C7.36788 8.87621 7.67378 9 7.99274 9C8.3117 9 8.6176 8.87621 8.84317 8.65584L15.6478 2.00626C15.8733 1.78583 16 1.4869 16 1.17521C16 0.863521 15.8733 0.564591 15.6478 0.34416Z"
                    fill="black"
                  />
                </svg>
              )}
              sx={{
                color: '#000',
                height: '30px',
                borderWidth: '1px',
                fontSize: '10px',
                borderRadius: '30px',
                background: '#E1F296',
                minWidth: '90px',
                fontWeight: 500,
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: `#0000004D`,
                },
                '& fieldset': {
                  borderWidth: '1px',
                },
                '& .MuiSelect-icon': {
                  top: '12px',
                  right: '10px',
                },
              }}
            >
              {/* <MenuItem value=" " disabled>
            Every Day
          </MenuItem> */}
              <MenuItem sx={{ fontSize: 10 }} value="every-day">
                Every Day
              </MenuItem>
              <MenuItem sx={{ fontSize: 10 }} value="store-1">
                Store 1
              </MenuItem>
              <MenuItem sx={{ fontSize: 10 }} value="store-2">
                Store 2
              </MenuItem>
            </Select>
          </Box>
        )}
        <LoadingButton
          onClick={() => handleSendEmail(checkedItems)}
          loading={loading}
          disabled={checkedItems?.length === 0}
          sx={{
            fontSize: 14,
            p: '5px 20px',
            height: 30,
            borderRadius: '10px',
            fontWeight: 400,
            ml: 'auto',
          }}
          variant="contained"
          endIcon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 12 12"
              fill="none"
            >
              <path
                d="M10 6L7 3M10 6L7 9M10 6L4.75 6M2 6L3.25 6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
        >
          Send
        </LoadingButton>
      </Box>
      <DialogContent sx={{ p: 0 }}>
        <Box my={2}>
          <TextField
            type="text"
            size="small"
            name="search"
            variant="outlined"
            fullWidth
            value={searchQuery}
            onChange={handleSearchChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="26"
                    height="26"
                    viewBox="0 0 26 26"
                    fill="none"
                  >
                    <path
                      d="M15.6663 16.7257C14.4623 17.6604 12.9473 18.101 11.4298 17.958C9.91235 17.8149 8.50641 17.0989 7.49819 15.9557C6.48998 14.8125 5.95528 13.3281 6.00293 11.8045C6.05058 10.2809 6.67701 8.83277 7.75469 7.75482C8.83257 6.67706 10.2806 6.05059 11.8041 6.00293C13.3275 5.95528 14.8119 6.49002 15.955 7.4983C17.0981 8.50659 17.8141 9.91263 17.9571 11.4302C18.1002 12.9478 17.6595 14.4629 16.7249 15.667L19.761 18.7033C19.8596 18.7948 19.9316 18.9113 19.9696 19.0404C20.0076 19.1695 20.01 19.3064 19.9767 19.4368C19.9434 19.5671 19.8755 19.6861 19.7802 19.7811C19.685 19.8761 19.5658 19.9437 19.4354 19.9767C19.3052 20.01 19.1684 20.0076 19.0394 19.9698C18.9105 19.932 18.794 19.8602 18.7024 19.762L15.6663 16.7257ZM16.4853 11.9916C16.4941 11.3959 16.3845 10.8044 16.1627 10.2515C15.9409 9.69865 15.6114 9.19539 15.1934 8.77102C14.7753 8.34665 14.277 8.00965 13.7275 7.77963C13.1781 7.5496 12.5883 7.43115 11.9926 7.43115C11.397 7.43115 10.8072 7.5496 10.2577 7.77963C9.70826 8.00965 9.20999 8.34665 8.79193 8.77102C8.37388 9.19539 8.04437 9.69865 7.82258 10.2515C7.60079 10.8044 7.49115 11.3959 7.50003 11.9916C7.51762 13.1716 7.99869 14.2973 8.8393 15.1255C9.67992 15.9538 10.8126 16.418 11.9926 16.418C13.1727 16.418 14.3054 15.9538 15.146 15.1255C15.9866 14.2973 16.4677 13.1716 16.4853 11.9916Z"
                      fill="black"
                    />
                  </svg>
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                color: '#000',
                fontSize: '14px',
                height: '42px',
                borderRadius: '5px',
                bgcolor: '#EFF7F9',
              },
            }}
            placeholder="Search"
          />
        </Box>

        <Box
          display="flex"
          alignItems="center"
          flexWrap="wrap"
          justifyContent="space-between"
          mb={1.5}
        >
          <Typography fontSize={14}>Select Staff</Typography>
          <FormControlLabel
            sx={{ mr: 0 }}
            control={
              <Checkbox
                sx={{ p: '5px', '& .MuiSvgIcon-root': { width: '18px', height: '18px' } }}
                checked={
                  data?.staff?.length?.length && checkedItems?.length === data?.staff?.length
                }
                onChange={handleSelectAllChange}
              />
            }
            label={<Typography fontSize={10}>Select All</Typography>}
          />
        </Box>

        <Stack gap={1.5} sx={{ maxHeight: 380, overflowY: 'auto', pr: 1 }}>
          {isLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', width: 1, py: 5 }}>
              <CircularProgress sx={{ width: '30px !important', height: '30px !important' }} />
            </Box>
          ) : filteredStaff?.length > 0 ? (
            filteredStaff?.map((staff) => (
              <FormControlLabel
                key={staff?._id}
                sx={{
                  mx: 0,
                  p: '7px',
                  bgcolor: '#EFF7F9',
                  borderRadius: '5px',
                  border: checkedItems.includes(staff?._id)
                    ? '1px solid #01565A'
                    : '1px solid transparent',
                }}
                control={
                  <Checkbox
                    sx={{ p: '5px', '& .MuiSvgIcon-root': { width: '20px', height: '20px' } }}
                    checked={checkedItems.includes(staff?._id)}
                    onChange={() => handleCheckboxChange(staff?._id)}
                  />
                }
                label={
                  <Box display="flex" alignItems="center" gap={1.5} ml={0.8}>
                    <img
                      width={42}
                      height={42}
                      style={{ borderRadius: '100%', objectFit: 'cover' }}
                      src={staff?.image}
                      alt=""
                    />
                    <Typography fontSize={14}>{staff?.name}</Typography>
                  </Box>
                }
              />
            ))
          ) : (
            <Box sx={{ display: 'flex', justifyContent: 'center', width: 1, py: 5 }}>
              <Typography fontSize={14} fontWeight={500}>
                No staff found
              </Typography>
            </Box>
          )}
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default SelectStaffModal;
