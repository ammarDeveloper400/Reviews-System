/* eslint-disable react/prop-types */
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { Button, Rating } from '@mui/material';
// import { fShortenNumber } from 'src/utils/format-number';
import Typography from '@mui/material/Typography';

import { useUpdateStaffOnShiftMutation } from 'src/services/staff-on-shift';

import Iconify from 'src/components/iconify';
import CustomToggleButton from 'src/components/custom-toggle/toggle';

export default function StaffCard({ member, setStaffListUpdated }) {
  const [updateStatus] = useUpdateStaffOnShiftMutation();

  const handleUpdateStatus = async () => {
    const payload = {
      status: member?.inactiveDate ? 'active' : 'inactive',
    };
    if (window.confirm('Are you sure you want to change the status of this member?')) {
      try {
        await updateStatus({ id: member?.id, payload }).unwrap();
        toast.success('Status updated successfully.');
        setStaffListUpdated(true);
      } catch (err) {
        toast.error(err?.data?.message || 'An error occurred');
      }
    }
  };

  return (
    <Card
      sx={{
        p: '10px 16px',
        bgcolor: '#fff',
        borderRadius: '15px',
        color: '#000',
        width: 1,
        minHeight: '80px',
        minWidth: '920px',
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        flexWrap="nowrap"
        justifyContent="space-between"
        gap={{ xs: 2, lg: 3 }}
      >
        <Box width={60} height={60}>
          <img
            width="100%"
            height="100%"
            style={{ borderRadius: '100%', objectFit: 'cover' }}
            src={member?.image}
            alt=""
          />
        </Box>
        <Typography fontSize={14}>{member?.name}</Typography>

        <Stack>
          <Box display="flex" alignItems="center" gap={1} mb={0}>
            <Typography fontSize={14}>Life time score</Typography>

            <Rating
              sx={{ fontSize: 16 }}
              readOnly
              size="small"
              name="half-rating"
              value={member?.lifetimeAverageRating}
              precision={0.25}
              emptyIcon={
                <Iconify
                  sx={{ color: '#C5C5C5', width: 'inherit', height: 'inherit' }}
                  icon="material-symbols:star"
                />
              }
            />
            <Typography fontSize={14}>{member?.lifetimeAverageRating?.toFixed(1)}</Typography>
          </Box>
          <Typography fontSize={10} color="rgba(0, 0, 0, 0.5)">
            Employment start Date: {dayjs(member?.joiningDate)?.format('DD MMMM YYYY')}
          </Typography>
        </Stack>
        <Typography fontSize={14}>Email: {member?.email}</Typography>
        <CustomToggleButton
          initialStatus={!member?.inactiveDate}
          handleUpdate={handleUpdateStatus}
        />
        <Button
          LinkComponent={Link}
          to="/rota"
          sx={{
            fontSize: 14,
            fontWeight: 400,
            width: '120px',
            height: '36px',
            borderRadius: '10px',
            ':hover': { background: '#01565A', color: '#fff' },
          }}
          variant="outlined"
        >
          Manage
        </Button>
      </Box>
    </Card>
  );
}
