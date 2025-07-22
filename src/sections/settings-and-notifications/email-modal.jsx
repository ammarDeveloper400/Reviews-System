/* eslint-disable react/prop-types */
import { toast } from 'react-toastify';
import React, { useState } from 'react';

import { LoadingButton } from '@mui/lab';
import {
  Box,
  Stack,
  Dialog,
  Rating,
  TextField,
  Typography,
  IconButton,
  DialogContent,
  InputAdornment,
} from '@mui/material';

import {
  useAddEmailTemplateMutation,
  useUpdateEmailTemplateMutation,
} from 'src/services/settings-and-notifications';

import Iconify from 'src/components/iconify';

// import { PhotoCamera, CalendarToday } from '@mui/icons-material';

const EmailModal = ({ open, setOpen, emailTemplate }) => {
  const [addEmailTemplate, { isLoading: addEmailTemplateIsLoading }] =
    useAddEmailTemplateMutation();
  const [updateEmailTemplate, { isLoading: updateEmailTemplateIsLoading }] =
    useUpdateEmailTemplateMutation();

  const [ratingFrom, setRatingFrom] = useState(emailTemplate?.fromRating || '');
  const [ratingTo, setRatingTo] = useState(emailTemplate?.toRating || '');
  const [message, setMessage] = useState(emailTemplate?.message || '');

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async () => {
    const payload = {
      fromRating: ratingFrom,
      toRating: ratingTo,
      message,
    };
    try {
      if (emailTemplate?._id) {
        await updateEmailTemplate({ payload, id: emailTemplate?._id }).unwrap();
        toast.success('Email template updated successfully');
      } else {
        await addEmailTemplate(payload).unwrap();
        toast.success('Email template added successfully');
      }
      handleClose();
    } catch (err) {
      toast.error(err?.data?.message || 'An error occurred');
    }
  };

  const min = 0;
  const max = 5;
  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={open}
      PaperProps={{ sx: { borderRadius: '15px', p: 3, color: '#000' } }}
    >
      <DialogContent sx={{ p: 0 }}>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
          <Typography fontSize={20} fontWeight={600}>
            Set up a performance-based email notification
          </Typography>
          <IconButton onClick={handleClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="16"
              viewBox="0 0 15 16"
              fill="none"
            >
              <path
                d="M3.64016 2.77L7.50016 6.63L11.3402 2.79C11.425 2.69972 11.5272 2.62749 11.6406 2.57766C11.754 2.52783 11.8763 2.50141 12.0002 2.5C12.2654 2.5 12.5197 2.60536 12.7073 2.79289C12.8948 2.98043 13.0002 3.23478 13.0002 3.5C13.0025 3.6226 12.9797 3.74439 12.9333 3.85788C12.8869 3.97138 12.8178 4.07419 12.7302 4.16L8.84016 8L12.7302 11.89C12.895 12.0512 12.9916 12.2696 13.0002 12.5C13.0002 12.7652 12.8948 13.0196 12.7073 13.2071C12.5197 13.3946 12.2654 13.5 12.0002 13.5C11.8727 13.5053 11.7456 13.484 11.6268 13.4375C11.508 13.3911 11.4002 13.3204 11.3102 13.23L7.50016 9.37L3.65016 13.22C3.56567 13.3073 3.46473 13.3769 3.35316 13.425C3.2416 13.4731 3.12163 13.4986 3.00016 13.5C2.73495 13.5 2.48059 13.3946 2.29306 13.2071C2.10552 13.0196 2.00016 12.7652 2.00016 12.5C1.99783 12.3774 2.02058 12.2556 2.06701 12.1421C2.11344 12.0286 2.18257 11.9258 2.27016 11.84L6.16016 8L2.27016 4.11C2.10535 3.94876 2.0087 3.73041 2.00016 3.5C2.00016 3.23478 2.10552 2.98043 2.29306 2.79289C2.48059 2.60536 2.73495 2.5 3.00016 2.5C3.24016 2.503 3.47016 2.6 3.64016 2.77Z"
                fill="black"
              />
            </svg>
          </IconButton>
        </Box>

        <Typography display="flex" alignItems="center" fontSize={18} fontWeight={400} mb={1.5}>
          Select threshold:&nbsp; <Typography fontSize={14}> (for a specific rating, i.e 3 star rating, type 3 To 3)</Typography>
        </Typography>

        <Stack gap={1.5} maxWidth={300}>
          <TextField
            type="number"
            size="small"
            name="from"
            variant="outlined"
            fullWidth
            value={ratingFrom}
            onChange={(e) => {
              let value = parseFloat(e.target.value);
              if (value > max) value = max;
              if (value < min) value = min;
              setRatingFrom(value);
            }}
            inputProps={{
              min: 0,
              max: 5,
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Box display="flex" alignItems="center" gap={0.6}>
                    <Typography sx={{ fontSize: '12px', fontWeight: 500 }}>
                      {ratingFrom || '0.0'}
                    </Typography>
                    <Rating
                      sx={{ fontSize: 12 }}
                      readOnly
                      size="small"
                      name="half-rating"
                      value={Number(ratingFrom)}
                      precision={0.25}
                      emptyIcon={
                        <Iconify
                          sx={{ color: '#C5C5C5', width: 'inherit', height: 'inherit' }}
                          icon="material-symbols:star"
                        />
                      }
                    />
                  </Box>
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                color: '#000',
                fontSize: '12px',
                height: '40px',
                borderRadius: '10px',
              },
            }}
            placeholder="Type 1-4"
          />

          <Typography fontSize={14} textAlign="center">
            To
          </Typography>
          <TextField
            type="number"
            size="small"
            name="from"
            variant="outlined"
            fullWidth
            value={ratingTo}
            onChange={(e) => {
              let value = parseFloat(e.target.value);
              if (value > max) value = max;
              if (value < min) value = min;
              setRatingTo(value);
            }}
            inputProps={{
              min: 0,
              max: 5,
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Box display="flex" alignItems="center" gap={0.6}>
                    <Typography sx={{ fontSize: '12px', fontWeight: 500 }}>
                      {ratingTo || '0.0'}
                    </Typography>
                    <Rating
                      sx={{ fontSize: 12 }}
                      readOnly
                      size="small"
                      name="half-rating"
                      value={Number(ratingTo)}
                      precision={0.25}
                      emptyIcon={
                        <Iconify
                          sx={{ color: '#C5C5C5', width: 'inherit', height: 'inherit' }}
                          icon="material-symbols:star"
                        />
                      }
                    />
                  </Box>
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                color: '#000',
                fontSize: '12px',
                height: '40px',
                borderRadius: '10px',
              },
            }}
            placeholder="Type 1-5"
          />
        </Stack>
        {ratingFrom > ratingTo && (
          <Typography fontSize={10} mt={1} color="error">
            From rating should be less than To rating
          </Typography>
        )}
        <TextField
          multiline
          minRows={4}
          maxRows={5}
          size="small"
          name="message"
          variant="outlined"
          fullWidth
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          sx={{
            '& .MuiOutlinedInput-root': { color: '#000', borderRadius: '10px' },
            borderRadius: '10px',
            mt: 3,
          }}
          placeholder="Type a message"
        />
        <Box display="flex" gap={2} justifyContent="end" mt={3}>
          <LoadingButton
            loading={addEmailTemplateIsLoading || updateEmailTemplateIsLoading}
            onClick={handleSave}
            sx={{ fontSize: 18, p: '8px 35px', borderRadius: '10px', fontWeight: 400 }}
            variant="contained"
            disabled={!message || !ratingFrom || !ratingTo || ratingFrom > ratingTo}
          >
            Save
          </LoadingButton>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default EmailModal;
