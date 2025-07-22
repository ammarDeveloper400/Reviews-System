/* eslint-disable react/prop-types */
import dayjs from 'dayjs';
import { useState } from 'react';
import { toast } from 'react-toastify';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { IconButton } from '@mui/material';
// import { fShortenNumber } from 'src/utils/format-number';
import Typography from '@mui/material/Typography';

import { useDeleteStaffMemberMutation } from 'src/services/manage-staff';

import StaffModal from './staff-member-modal';

export default function StaffCard({ staffMember }) {
  const [open, setOpen] = useState(false);

  const [selectedStaffMember, setSelectedStaffMember] = useState(null);

  const [deleteStaffMember] = useDeleteStaffMemberMutation();

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this member?')) {
      try {
        await deleteStaffMember(id).unwrap();
        toast.success('Staff member deleted successfully.');
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
          bgcolor: '#fff',
          borderRadius: '15px',
          color: '#000',
          height: 1,
        }}
      >
        <Stack gap={2} alignItems="center" textAlign="center">
          <Box width={1} display="flex" alignItems="start" justifyContent="space-between">
            <IconButton onClick={() => handleDelete(staffMember?._id)}>
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
                src={staffMember?.image}
                alt=""
              />
            </Box>
            <IconButton
              onClick={() => {
                setSelectedStaffMember(staffMember);
                setOpen(true);
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
          <Typography fontSize={16}>{staffMember?.name}</Typography>
          <Box display="flex" alignItems="center" gap={1}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="16"
              viewBox="0 0 15 16"
              fill="none"
            >
              <path
                d="M2.535 3.5H12.4725C13.41 3.5 13.8825 3.9425 13.8825 4.8425V11.1575C13.8825 12.05 13.41 12.5 12.4725 12.5H2.535C1.5975 12.5 1.125 12.05 1.125 11.1575V4.8425C1.125 3.9425 1.5975 3.5 2.535 3.5ZM7.5 9.95L12.555 5.8025C12.735 5.6525 12.8775 5.3075 12.6525 5C12.435 4.6925 12.0375 4.685 11.775 4.8725L7.5 7.7675L3.2325 4.8725C2.97 4.685 2.5725 4.6925 2.355 5C2.13 5.3075 2.2725 5.6525 2.4525 5.8025L7.5 9.95Z"
                fill="black"
              />
            </svg>
            <Typography fontSize={12}>{staffMember?.email}</Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="16"
              viewBox="0 0 15 16"
              fill="none"
            >
              <path
                d="M1.25 6.125C1.25 4.94625 1.25 4.3575 1.61625 3.99125C1.9825 3.625 2.57125 3.625 3.75 3.625H11.25C12.4288 3.625 13.0175 3.625 13.3837 3.99125C13.75 4.3575 13.75 4.94625 13.75 6.125C13.75 6.41937 13.75 6.56687 13.6588 6.65875C13.5669 6.75 13.4187 6.75 13.125 6.75H1.875C1.58062 6.75 1.43312 6.75 1.34125 6.65875C1.25 6.56687 1.25 6.41875 1.25 6.125ZM1.25 11.75C1.25 12.9288 1.25 13.5175 1.61625 13.8837C1.9825 14.25 2.57125 14.25 3.75 14.25H11.25C12.4288 14.25 13.0175 14.25 13.3837 13.8837C13.75 13.5175 13.75 12.9288 13.75 11.75V8.625C13.75 8.33063 13.75 8.18313 13.6588 8.09125C13.5669 8 13.4187 8 13.125 8H1.875C1.58062 8 1.43312 8 1.34125 8.09125C1.25 8.18313 1.25 8.33125 1.25 8.625V11.75Z"
                fill="black"
              />
              <path
                d="M4.375 2.375V4.25M10.625 2.375V4.25"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <Typography fontSize={12}>
              {dayjs(staffMember?.joiningDate)?.format('DD MMM YYYY')}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <g clipPath="url(#clip0_1551_35)">
                <path
                  d="M1.25 8C1.5575 8.2175 1.97 8.3225 2.375 8.3225C2.7875 8.3225 3.1925 8.2175 3.5 8C3.965 7.655 4.25 7.1225 4.25 6.5C4.25 7.1225 4.5275 7.655 5 8C5.3075 8.2175 5.72 8.3225 6.125 8.3225C6.5375 8.3225 6.9425 8.2175 7.25 8C7.715 7.655 8 7.1225 8 6.5C8 7.1225 8.2775 7.655 8.75 8C9.0575 8.2175 9.47 8.3225 9.8825 8.3225C10.2875 8.3225 10.6925 8.2175 11 8C11.465 7.655 11.75 7.1225 11.75 6.5C11.75 7.1225 12.0275 7.655 12.5 8C12.8075 8.2175 13.22 8.3225 13.625 8.3225C14.0375 8.3225 14.4425 8.2175 14.75 8C15.2225 7.655 15.5 7.1225 15.5 6.5V5.75L13.25 0.5H3.5L0.5 5.75V6.5C0.5 7.1225 0.7775 7.655 1.25 8ZM2.75 14.7425H6.5V10.9925H9.5V14.7425H13.25V9.4925C12.9725 9.455 12.71 9.3275 12.5 9.17C12.0275 8.8325 11.75 8.6225 11.75 8C11.75 8.6225 11.465 8.8325 11 9.17C10.6925 9.395 10.2875 9.4925 9.8825 9.5C9.47 9.5 9.0575 9.395 8.75 9.17C8.2775 8.8325 8 8.6225 8 8C8 8.6225 7.715 8.8325 7.25 9.17C6.9425 9.395 6.5375 9.4925 6.125 9.5C5.72 9.5 5.3075 9.395 5 9.17C4.5275 8.8325 4.25 8.6225 4.25 7.9925C4.25 8.6225 3.965 8.8325 3.5 9.17C3.2825 9.3275 3.0275 9.455 2.75 9.5V14.7425Z"
                  fill="black"
                />
              </g>
              <defs>
                <clipPath id="clip0_1551_35">
                  <rect width="15" height="15" fill="white" transform="translate(0.5 0.5)" />
                </clipPath>
              </defs>
            </svg>
            <Typography fontSize={12}>{staffMember?.store?.name}</Typography>
          </Box>
        </Stack>
      </Card>
      {open && (
        <StaffModal
          title="Edit Staff Member"
          acceptBtnText="Save Changes"
          open={open}
          setOpen={setOpen}
          selectedStaffMember={selectedStaffMember}
        />
      )}
    </>
  );
}
