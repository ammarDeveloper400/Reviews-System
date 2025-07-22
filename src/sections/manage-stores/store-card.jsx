/* eslint-disable react/prop-types */
import { useState } from 'react';
import { toast } from 'react-toastify';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { IconButton } from '@mui/material';
// import { fShortenNumber } from 'src/utils/format-number';
import Typography from '@mui/material/Typography';

import { useDeleteStoreMutation } from 'src/services/manage-stores';

import StaffModal from './store-modal';

export default function StoreCard({ store }) {
  const [open, setOpen] = useState(false);
  const [selectedStore, setSelectedStore] = useState(null);

  const [deleteStore] = useDeleteStoreMutation();

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this store?')) {
      try {
        await deleteStore(id).unwrap();
        toast.success('Store deleted successfully.');
      } catch (err) {
        toast.error(err?.data?.message || 'An error occurred');
      }
    }
  };

  return (
    <>
      <Card
        sx={{
          p: 2,
          pb: 3,
          bgcolor: '#fff',
          borderRadius: '15px',
          color: '#000',
          height: 1,
        }}
      >
        <Stack gap={2} alignItems="center" textAlign="center">
          <Box width={1} display="flex" alignItems="start" justifyContent="space-between">
            <IconButton onClick={() => handleDelete(store?._id)}>
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
            <Box width={100} height={100}>
              <img
                width="100%"
                height="100%"
                style={{ borderRadius: '100px', objectFit: 'cover' }}
                src={store?.image}
                alt=""
              />
            </Box>
            <IconButton
              onClick={() => {
                setOpen(true);
                setSelectedStore(store);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9.43333 5.14697H4.16667C3.24583 5.14697 2.5 5.93781 2.5 6.91197V15.7353C2.5 16.7103 3.24583 17.5003 4.16667 17.5003H13.3333C14.2542 17.5003 15 16.7103 15 15.7353V9.27697L11.7383 12.7303C11.4535 13.0349 11.0826 13.2454 10.675 13.3336L8.44083 13.807C6.9825 14.1153 5.6975 12.7545 5.98917 11.2111L6.43583 8.84531C6.51667 8.41864 6.715 8.02614 7.00583 7.71864L9.43333 5.14697Z"
                  fill="black"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M16.5384 3.59851C16.4542 3.3852 16.3306 3.1896 16.1742 3.02184C16.0205 2.85779 15.8351 2.72654 15.6292 2.63601C15.4265 2.54696 15.2074 2.50098 14.9859 2.50098C14.7644 2.50098 14.5454 2.54696 14.3426 2.63601C14.1367 2.72654 13.9514 2.85779 13.7976 3.02184L13.3426 3.50351L15.7192 6.02018L16.1742 5.53768C16.3323 5.3712 16.456 5.17526 16.5384 4.96101C16.7101 4.52307 16.7101 4.03646 16.5384 3.59851ZM14.5417 7.26768L12.1642 4.75018L8.18341 8.96685C8.12468 9.02942 8.08506 9.10749 8.06924 9.19184L7.62258 11.5585C7.56424 11.8668 7.82174 12.1385 8.11258 12.0768L10.3476 11.6043C10.4289 11.5862 10.5029 11.5441 10.5601 11.4835L14.5417 7.26768Z"
                  fill="black"
                />
              </svg>
            </IconButton>
          </Box>
          <Typography fontSize={16}>{store?.name}</Typography>
          <Box display="flex" alignItems="center" gap={1}>
            <Box>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="16"
                viewBox="0 0 15 16"
                fill="none"
              >
                <path
                  d="M7.5 1.4375C4.91221 1.4375 2.8125 3.32744 2.8125 5.65625C2.8125 9.40625 7.5 14.5625 7.5 14.5625C7.5 14.5625 12.1875 9.40625 12.1875 5.65625C12.1875 3.32744 10.0878 1.4375 7.5 1.4375ZM7.5 8C7.12916 8 6.76665 7.89003 6.45831 7.68401C6.14996 7.47798 5.90964 7.18514 5.76773 6.84253C5.62581 6.49992 5.58868 6.12292 5.66103 5.75921C5.73337 5.39549 5.91195 5.0614 6.17417 4.79917C6.4364 4.53695 6.77049 4.35837 7.13421 4.28603C7.49792 4.21368 7.87492 4.25081 8.21753 4.39273C8.56014 4.53464 8.85298 4.77496 9.05901 5.08331C9.26503 5.39165 9.375 5.75416 9.375 6.125C9.37446 6.62211 9.17674 7.09871 8.82523 7.45023C8.47371 7.80174 7.99711 7.99946 7.5 8Z"
                  fill="black"
                />
              </svg>
            </Box>
            <Typography fontSize={12}>{store?.address}</Typography>
          </Box>
        </Stack>
      </Card>
      {open && (
        <StaffModal
          title="Edit Store"
          acceptBtnText="Save Changes"
          open={open}
          setOpen={setOpen}
          selectedStore={selectedStore}
        />
      )}
    </>
  );
}
