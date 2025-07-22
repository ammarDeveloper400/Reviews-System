/* eslint-disable react/prop-types */
import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { Rating } from '@mui/material';
import Stack from '@mui/material/Stack';
// import { fShortenNumber } from 'src/utils/format-number';
import Typography from '@mui/material/Typography';

import Iconify from 'src/components/iconify';

dayjs.extend(isToday);

export default function ReviewsCard({ review, reviewFor, imgSrc }) {
  return (
    <Card
      sx={{
        p: '10px 16px',
        bgcolor: '#EFF7F9',
        borderRadius: '15px',
        minWidth: '390px',
        maxWidth: '390px',
      }}
    >
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Stack textAlign="center">
          <Typography fontSize={14}>
            {dayjs(review?.time).isToday() ? 'Today' : dayjs(review?.time).format('ddd')}
          </Typography>
          <Typography fontSize={14}>{dayjs(review?.time)?.format('hh:mm A')}</Typography>
        </Stack>
        <img src="/assets/separator-line.svg" alt="" />
        <Stack textAlign="center">
          <Box display="flex" alignItems="center" gap={1} mb={1}>
            <Rating
              readOnly
              size="small"
              name="half-rating"
              value={review?.rating}
              precision={0.25}
              emptyIcon={
                <Iconify
                  sx={{ color: '#C5C5C5', width: 'inherit', height: 'inherit' }}
                  icon="material-symbols:star"
                />
              }
            />
            <Typography fontSize={14}>{review?.rating?.toFixed(1)}</Typography>
          </Box>
          <Typography fontSize={14}>{reviewFor}</Typography>
        </Stack>
        <img src="/assets/separator-line.svg" alt="" />
        <Box width={70} height={70} minWidth={70}>
          <img
            width="100%"
            height="100%"
            style={{ borderRadius: '100%', objectFit: 'cover' }}
            src={imgSrc}
            alt=""
          />
        </Box>
      </Box>
    </Card>
  );
}
