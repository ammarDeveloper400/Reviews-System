import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
// import { fShortenNumber } from 'src/utils/format-number';
import { Select, MenuItem, Skeleton, Typography } from '@mui/material';

import SelectCustomIcon from 'src/components/select-custom-icon/icon';

// ----------------------------------------------------------------------

const MenuProps = {
  PaperProps: {
    style: {
      background: '#E1F296',
      color: '#000',
      boxShadow: 'none',
      borderRadius: '10px',
      fontSize: '10px',
    },
  },
};

export default function AppWidgetSummary({
  title,
  subTitle,
  icon,
  headingFontSize,
  hasFilter,
  filterValue,
  setFilterValue,
  isLoading,
  sx,
  ...other
}) {
  return (
    <Card
      sx={{
        p: '20px',
        borderRadius: '10px',
        color: '#000',
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
              <Typography fontWeight={500} fontSize={headingFontSize}>
                {title}
              </Typography>
            </Box>
            {hasFilter && (
              <Select
                id="sorting"
                type="text"
                value={filterValue}
                name="sorting"
                onChange={(e) => setFilterValue(e.target.value)}
                MenuProps={MenuProps}
                IconComponent={SelectCustomIcon}
                sx={{
                  color: '#000',
                  height: '30px',
                  fontSize: '10px',
                  borderRadius: '30px',
                  background: '#E1F296',
                  '& .MuiSelect-icon': {
                    top: '8px',
                    right: '8px',
                  },
                  '& fieldset': {
                    borderWidth: 0,
                  },
                }}
              >
                <MenuItem sx={{ fontSize: '10px' }} value="daily">
                  Today
                </MenuItem>
                <MenuItem sx={{ fontSize: '10px' }} value="weekly">
                  This week
                </MenuItem>
                <MenuItem sx={{ fontSize: '10px' }} value="monthly">
                  This month
                </MenuItem>
                <MenuItem sx={{ fontSize: '10px' }} value="annual">
                  Annual
                </MenuItem>
              </Select>
            )}
          </Box>

          <Stack mt={1.4}>
            <Typography fontSize={12}>{subTitle}</Typography>
          </Stack>
        </>
      )}
    </Card>
  );
}

AppWidgetSummary.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  sx: PropTypes.object,
  title: PropTypes.any,
  subTitle: PropTypes.string,
  headingFontSize: PropTypes.any,
  hasFilter: PropTypes.bool,
  filterValue: PropTypes.string,
  setFilterValue: PropTypes.func,
  isLoading: PropTypes.bool,
};
