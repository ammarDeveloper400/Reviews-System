/* eslint-disable react/prop-types */
import { toast } from 'react-toastify';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { LoadingButton } from '@mui/lab';
import { Button, Rating } from '@mui/material';
// import { fShortenNumber } from 'src/utils/format-number';
import Typography from '@mui/material/Typography';

import { useDeleteEmailTemplateMutation } from 'src/services/settings-and-notifications';

import Iconify from 'src/components/iconify';

export default function EmailTemplateCard({
  item,
  index,
  setOpenEmailModal,
  setSelectedEmailTemplate,
}) {
  const [deleteEmailTemplate, { isLoading }] = useDeleteEmailTemplateMutation();

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this template?')) {
      try {
        await deleteEmailTemplate(id).unwrap();
        toast.success('Email template deleted successfully.');
      } catch (err) {
        toast.error(err?.data?.message || 'An error occurred');
      }
    }
  };
  return (
    <Card
      sx={{
        p: 2,
        borderRadius: '15px',
        color: '#000',
        height: 1,
      }}
    >
      <Stack gap={2}>
        <Typography fontSize={18}>Template Email {index}</Typography>
        <Box display="flex" alignItems="center" gap={1}>
          <Typography fontSize={12} color="#5C5C5C">
            {item?.fromRating?.toFixed(1)}
          </Typography>

          <Rating
            sx={{ fontSize: 14 }}
            readOnly
            size="small"
            name="half-rating"
            value={item?.fromRating}
            precision={0.25}
            emptyIcon={
              <Iconify
                sx={{ color: '#C5C5C5', width: 'inherit', height: 'inherit' }}
                icon="material-symbols:star"
              />
            }
          />
          <Typography fontSize={12} fontWeight={500}>
            to
          </Typography>
          <Typography fontSize={12} color="#5C5C5C">
            {item?.toRating?.toFixed(1)}
          </Typography>

          <Rating
            sx={{ fontSize: 14 }}
            readOnly
            size="small"
            name="half-rating"
            value={item?.toRating}
            precision={0.25}
            emptyIcon={
              <Iconify
                sx={{ color: '#C5C5C5', width: 'inherit', height: 'inherit' }}
                icon="material-symbols:star"
              />
            }
          />
        </Box>
        <Typography fontSize={12} color="#5C5C5C">
          {item?.message}
        </Typography>

        <Box display="flex" alignItems="center" gap={1}>
          <Button
            sx={{ fontSize: 14, fontWeight: 400, borderRadius: '10px' }}
            fullWidth
            variant="contained"
            onClick={() => {
              setSelectedEmailTemplate(item);
              setOpenEmailModal(true);
            }}
            endIcon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="16"
                viewBox="0 0 17 16"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8.04667 4.11719H3.83333C3.09667 4.11719 2.5 4.74985 2.5 5.52919V12.5879C2.5 13.3679 3.09667 13.9999 3.83333 13.9999H11.1667C11.9033 13.9999 12.5 13.3679 12.5 12.5879V7.42119L9.89067 10.1839C9.6628 10.4275 9.36605 10.5959 9.04 10.6665L7.25267 11.0452C6.086 11.2919 5.058 10.2032 5.29133 8.96852L5.64867 7.07585C5.71333 6.73452 5.872 6.42052 6.10467 6.17452L8.04667 4.11719Z"
                  fill="white"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M13.7311 2.879C13.6637 2.70836 13.5649 2.55187 13.4398 2.41767C13.3168 2.28642 13.1685 2.18143 13.0038 2.109C12.8416 2.03776 12.6663 2.00098 12.4891 2.00098C12.3119 2.00098 12.1367 2.03776 11.9745 2.109C11.8098 2.18143 11.6615 2.28642 11.5385 2.41767L11.1745 2.803L13.0758 4.81634L13.4398 4.43034C13.5662 4.29716 13.6652 4.1404 13.7311 3.969C13.8685 3.61865 13.8685 3.22936 13.7311 2.879ZM12.1338 5.81434L10.2318 3.80034L7.04712 7.17367C7.00013 7.22373 6.96844 7.28619 6.95578 7.35367L6.59845 9.247C6.55178 9.49367 6.75778 9.711 6.99045 9.66167L8.77845 9.28367C8.84351 9.26917 8.90272 9.2355 8.94845 9.187L12.1338 5.81434Z"
                  fill="white"
                />
              </svg>
            }
          >
            Edit
          </Button>
          <LoadingButton
            loading={isLoading}
            sx={{ fontSize: 14, fontWeight: 400, borderRadius: '10px' }}
            fullWidth
            variant="outlined"
            onClick={() => handleDelete(item?._id)}
          >
            Delete
          </LoadingButton>
        </Box>
      </Stack>
    </Card>
  );
}
