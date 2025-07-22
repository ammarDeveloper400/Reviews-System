import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { Skeleton } from '@mui/material';
// import { fShortenNumber } from 'src/utils/format-number';
import Typography from '@mui/material/Typography';

export default function SubmittedRatingsCard({ title, subTitle, icon, isLoading, sx, ...other }) {
  return (
    <Card
      sx={{
        p: '10px 20px',
        borderRadius: '10px',
        color: '#000',
        minHeight: '85px',
        height: 1,
        ...sx,
      }}
      {...other}
    >
      {isLoading ? (
        <Stack spacing={1}>
          <Skeleton variant="rectangular" width="100%" height={30} />
          <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
        </Stack>
      ) : (
        <>
          <Box
            display="flex"
            alignItems="center"
            gap={1.4}
            flexWrap="wrap"
            justifyContent="space-between"
          >
            <Box display="flex" alignItems="center" gap={1.4} flexWrap="wrap">
              {icon && <Box sx={{ width: 'auto', height: 28 }}>{icon}</Box>}
              <Typography fontWeight={500} fontSize={20}>
                {title}
              </Typography>
            </Box>
          </Box>

          <Stack mt={1.4}>
            <Typography fontSize={12}>{subTitle}</Typography>
          </Stack>
        </>
      )}
    </Card>
  );
}

SubmittedRatingsCard.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  isLoading: PropTypes.bool,
  sx: PropTypes.object,
  title: PropTypes.any,
  subTitle: PropTypes.string,
};
