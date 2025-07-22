/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import React from 'react';
import { toast } from 'react-toastify';
// import { useSearchParams } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// import { LoadingButton } from '@mui/lab';
import {
  Box,
  Stack,
  Dialog,
  // Select,
  // Checkbox,
  // MenuItem,
  TextField,
  Typography,
  DialogContent,
  InputAdornment,
  // FormControlLabel,
  CircularProgress,
} from '@mui/material';

import { baseAPI } from 'src/services/base-api';
// import { useGetStaffMembersListQuery } from 'src/services/manage-staff';
import { useGetStoresListQuery } from 'src/services/manage-stores';
import { useLazyGetInterfacesDetailsQuery } from 'src/services/get-reviews/interfacesDetails';

// import { PhotoCamera, CalendarToday } from '@mui/icons-material';

// const MenuProps = {
//   PaperProps: {
//     style: {
//       background: '#E1F296',
//       color: '#000',
//       boxShadow: 'none',
//       borderRadius: '10px',
//     },
//   },
// };

const SelectStoreModal = ({ open, setOpen }) => {
  const navigate = useNavigate();
  // const [searchParams] = useSearchParams();
  // const [checkedItems, setCheckedItems] = React.useState([]);
  // const [selectAll, setSelectAll] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [filteredStores, setFilteredStores] = React.useState([]);

  const { data, isLoading } = useGetStoresListQuery();

  React.useEffect(() => {
    if (data?.stores) {
      const filtered = data?.stores.filter((store) =>
        store?.name?.toLowerCase().includes(searchQuery)
      );
      setFilteredStores(filtered);
    }
  }, [data, searchQuery]);

  // const handleCheckboxChange = (id) => {
  //   setCheckedItems((prev) => {
  //     if (prev.includes(id)) {
  //       return prev.filter((itemId) => itemId !== id);
  //     }
  //     return [...prev, id];
  //   });
  // };

  // const handleSelectAllChange = () => {
  //   if (selectAll) {
  //     setCheckedItems([]);
  //   } else {
  //     setCheckedItems(filteredStores?.map((staff) => staff?._id));
  //   }
  //   setSelectAll(!selectAll);
  // };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const [getInterfaceDetails, { isLoading: isLoadingInterface }] =
    useLazyGetInterfacesDetailsQuery();

  const fetchInterfaceDetails = async (store) => {
    try {
      const res = await getInterfaceDetails(store?._id).unwrap();
      const allDisabled =
        !res?.interfaces?.interface1?.status &&
        !res?.interfaces?.interface2?.status &&
        !res?.interfaces?.interface3?.status;
      return allDisabled;
    } catch (error) {
      toast.error('An error occurred while fetching interface details.');
      return true; // Assume all disabled if there’s an error
    }
  };

  const dispatch = useDispatch();

  const handleStoreClick = async (e, store) => {
    e.preventDefault(); // Prevent navigation until we decide
    const allDisabled = await fetchInterfaceDetails(store);

    if (allDisabled) {
      toast.warn('All interfaces are disabled. Please enable at least one interface first.', {
        autoClose: 7000,
      });
    } else {
      localStorage.clear();
      dispatch(baseAPI.util.resetApiState());
      navigate(`/rate-staff?store=${store?._id}`);
    }
  };

  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={open}
      onClose={() => setOpen(false)}
      PaperProps={{ sx: { borderRadius: '15px', p: 2.5, color: '#000' } }}
    >
      <DialogContent sx={{ p: 0 }}>
        <Typography fontSize={18} fontWeight={600} mb={2}>
          Select Store
        </Typography>

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
          <Typography fontSize={14}>Click on specific Store to Proceed</Typography>
        </Box>

        {isLoadingInterface ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', width: 1, py: 5 }}>
            <Stack spacing={2} textAlign="center" alignItems="center">
              <Typography fontSize={14}>
                Please wait, you are redirecting to the selected store.
              </Typography>
              <CircularProgress sx={{ width: '30px !important', height: '30px !important' }} />
            </Stack>
          </Box>
        ) : (
          <Stack gap={1.5} sx={{ maxHeight: 380, overflowY: 'auto', pr: 1 }}>
            {isLoading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', width: 1, py: 5 }}>
                <CircularProgress sx={{ width: '30px !important', height: '30px !important' }} />
              </Box>
            ) : filteredStores?.length > 0 ? (
              filteredStores?.map((store) => (
                // <FormControlLabel
                //   key={store?._id}
                //   sx={{
                //     mx: 0,
                //     p: '7px',
                //     bgcolor: '#EFF7F9',
                //     borderRadius: '5px',
                //     border: checkedItems.includes(store?._id)
                //       ? '1px solid #01565A'
                //       : '1px solid transparent',
                //   }}
                //   control={
                //     <Checkbox
                //       sx={{ p: '5px', '& .MuiSvgIcon-root': { width: '20px', height: '20px' } }}
                //       checked={checkedItems.includes(store?._id)}
                //       onChange={() => handleCheckboxChange(store?._id)}
                //     />
                //   }
                //   label={
                //   }
                // />
                <Box
                  key={store?._id}
                  display="flex"
                  alignItems="center"
                  gap={1.5}
                  onClick={(e) => handleStoreClick(e, store)}
                  sx={{
                    bgcolor: '#EFF7F9',
                    borderRadius: '5px',
                    p: 1,
                    textDecoration: 'none',
                    color: '#000',
                    cursor: 'pointer',
                  }}
                >
                  <img
                    width={42}
                    height={42}
                    style={{ borderRadius: '100%', objectFit: 'cover' }}
                    src={store?.image}
                    alt=""
                  />
                  <Typography fontSize={14}>{store?.name}</Typography>
                </Box>
              ))
            ) : (
              <Box sx={{ display: 'flex', justifyContent: 'center', width: 1, py: 5 }}>
                <Typography fontSize={14} fontWeight={500}>
                  No store found
                </Typography>
              </Box>
            )}
          </Stack>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SelectStoreModal;
