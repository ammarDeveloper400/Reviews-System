import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { Skeleton } from '@mui/material';
// import { fShortenNumber } from 'src/utils/format-number';
import Typography from '@mui/material/Typography';

export default function AverageScoresCard({
  title,
  rating,
  subTitle,
  icon,
  isLoading,
  sx,
  ...other
}) {
  return (
    <Card
      sx={{
        p: '10px 20px',
        borderRadius: '10px',
        color: '#000',
        height: 1,
        ...sx,
      }}
      {...other}
    >
      {isLoading ? (
        <Stack spacing={1}>
          <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
          <Skeleton variant="rectangular" width="100%" height={30} />
        </Stack>
      ) : (
        <>
          <Stack>
            <Typography fontWeight={400} fontSize={12}>
              {title}
            </Typography>
          </Stack>
          <Box display="flex" alignItems="center" gap={0.5} flexWrap="wrap" mt={1}>
            <Typography fontWeight={600} fontSize={16}>
              {rating}
            </Typography>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
            >
              <path
                d="M7.86726 12.6887C7.64109 12.5452 7.3575 12.5453 7.13134 12.6888L3.66276 14.8898C3.12514 15.231 2.46052 14.7262 2.60338 14.0852L3.52296 9.95938C3.5827 9.69134 3.49608 9.41069 3.29782 9.22993L0.244697 6.44628C-0.228228 6.0151 0.0260092 5.20066 0.650878 5.14511L4.67445 4.78739C4.93646 4.7641 5.16471 4.59109 5.26766 4.33777L6.84671 0.452286C7.09179 -0.150763 7.90821 -0.150762 8.15329 0.452287L9.73234 4.33777C9.83529 4.59109 10.0635 4.7641 10.3256 4.78739L14.3491 5.14511C14.974 5.20066 15.2282 6.0151 14.7553 6.44628L11.7022 9.22993C11.5039 9.41069 11.4173 9.69134 11.477 9.95938L12.3967 14.0855C12.5395 14.7265 11.875 15.2312 11.3374 14.8901L7.86726 12.6887Z"
                fill="#FFC500"
              />
            </svg>
          </Box>

          <Stack>
            <Typography fontSize={10}>{subTitle}</Typography>
          </Stack>
        </>
      )}
    </Card>
  );
}

AverageScoresCard.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  isLoading: PropTypes.bool,
  sx: PropTypes.object,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  rating: PropTypes.any,
};
