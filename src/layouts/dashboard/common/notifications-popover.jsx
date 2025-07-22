/* eslint-disable react/no-danger */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// import { sub } from 'date-fns';
/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import { io } from 'socket.io-client';
import { toast } from 'react-toastify';
// import { faker } from '@faker-js/faker';
import { useRef, useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Badge from '@mui/material/Badge';
// import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import Popover from '@mui/material/Popover';
import { CircularProgress } from '@mui/material';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
// import ListSubheader from '@mui/material/ListSubheader';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';

import { getUser } from 'src/utils/functions';
import { fToNow } from 'src/utils/format-time';

import {
  useLazyGetNotificationsQuery,
  useMarkAsReadNotificationsMutation,
} from 'src/services/notifications';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

// ----------------------------------------------------------------------

export default function NotificationsPopover() {
  const BaseURL = import.meta.env.VITE_SOCKET_URL || 'https://api.reviewmyservice.co.uk';
  const socket = useRef();

  const [getNotificationsList, { isLoading: getNotificationsListLoading }] =
    useLazyGetNotificationsQuery();
  const [markAsReadNotifications, { isLoading }] = useMarkAsReadNotificationsMutation();

  const [notifications, setNotifications] = useState([]);

  const totalUnRead =
    notifications && notifications?.filter((item) => item.isUnRead === true).length;

  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  useEffect(() => {
    // Initialize the socket connection
    socket.current = io(BaseURL);

    socket.current.on('connect', () => {
      const userId = getUser()?.id;
      socket.current.emit('register', userId);
    });

    socket.current.on('notification', (notification) => {
      setNotifications((prevNotifications) => [notification, ...prevNotifications]);
    });

    // Cleanup function to disconnect the socket
    return () => {
      if (socket.current) {
        socket.current.disconnect();
        socket.current.off('connect'); // Optionally remove listeners
        socket.current.off('notification'); // Optionally remove listeners
      }
    };
  }, []);

  const handleMarkAllAsRead = async () => {
    try {
      await markAsReadNotifications()
        .unwrap()
        .then((res) => {
          if (res) {
            setNotifications(
              notifications?.map((notification) => ({
                ...notification,
                isUnRead: false,
              }))
            );
          }
        });
    } catch (err) {
      toast.error(err?.data?.message || 'An error occurred');
    }
  };

  useEffect(() => {
    getNotificationsList()
      .unwrap()
      .then((res) => {
        if (res?.data) {
          setNotifications(res?.data);
        }
      });
  }, []);

  return (
    <>
      <IconButton
        disableRipple
        sx={{
          width: { md: '54px', xs: '45px', sm: '54px' },
          height: { md: '54px', xs: '45px', sm: '54px' },
          bgcolor: '#fff',
        }}
        onClick={handleOpen}
      >
        <Badge
          sx={{ '& .MuiBadge-badge': { top: 5, right: 6 } }}
          variant="dot"
          badgeContent={totalUnRead}
          color="error"
        >
          <Iconify width={{ md: 24, xs: 20, sm: 24 }} icon="bi:bell" sx={{ color: '#000' }} />
        </Badge>
      </IconButton>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{ maxHeight: `calc(100vh - 60px)` }}
        slotProps={{
          paper: {
            sx: {
              ml: 0.75,
              width: 360,
              pb: 2,
              top: { md: '70px !important', xs: 'auto' },
            },
          },
        }}
      >
        <Box position="sticky" top={0} bgcolor="#fff" zIndex={1}>
          <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="subtitle1">Notifications</Typography>
              <Typography fontSize={12} sx={{ color: 'text.secondary' }}>
                You have {totalUnRead} unread messages.
              </Typography>
            </Box>

            {totalUnRead > 0 && (
              <Tooltip title=" Mark all as read">
                <IconButton color="primary" onClick={handleMarkAllAsRead} disabled={isLoading}>
                  {isLoading ? (
                    <CircularProgress size={18} />
                  ) : (
                    <Iconify icon="eva:done-all-fill" />
                  )}
                </IconButton>
              </Tooltip>
            )}
          </Box>

          <Divider sx={{ borderStyle: 'dashed' }} />
        </Box>

        <Scrollbar sx={{ height: { xs: 340, sm: 'auto' } }}>
          <List
            disablePadding
            // subheader={
            //   <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
            //     New
            //   </ListSubheader>
            // }
          >
            {getNotificationsListLoading ? (
              <Box py={3} textAlign="center" width="100%">
                <CircularProgress size={24} />
              </Box>
            ) : notifications?.length > 0 ? (
              notifications?.map((notification) => (
                <NotificationItem key={notification._id} notification={notification} />
              ))
            ) : (
              <Box py={3} textAlign="center" width="100%">
                <Typography fontSize={14}>No notification found!</Typography>
              </Box>
            )}
          </List>

          {/* <List
            disablePadding
            subheader={
              <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                Before that
              </ListSubheader>
            }
          >
            {notifications.slice(2, 5).map((notification) => (
              <NotificationItem key={notification.id} notification={notification} />
            ))}
          </List> */}
        </Scrollbar>

        {/* <Divider sx={{ borderStyle: 'dashed' }} />

        <Box sx={{ p: 1 }}>
          <Button fullWidth disableRipple>
            View All
          </Button>
        </Box> */}
      </Popover>
    </>
  );
}

// ----------------------------------------------------------------------

NotificationItem.propTypes = {
  notification: PropTypes.shape({
    createdAt: PropTypes.any,
    id: PropTypes.string,
    isUnRead: PropTypes.bool,
    title: PropTypes.string,
    description: PropTypes.string,
    type: PropTypes.string,
    avatar: PropTypes.any,
  }),
};

function NotificationItem({ notification }) {
  const { image, message } = notification;

  return (
    <ListItemButton
      sx={{
        py: 1.5,
        px: 2.5,
        mt: '1px',
        cursor: 'default',
        ...(notification.isUnRead && {
          bgcolor: 'action.selected',
        }),
      }}
    >
      <ListItemAvatar>
        <Avatar src={image} sx={{ bgcolor: 'background.neutral' }}>
          {image}
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={
          <Typography
            component="span"
            sx={{
              color: 'text.secondary',
              fontSize: '12px',
              '& p': {
                margin: 0,
              },
            }}
            dangerouslySetInnerHTML={{ __html: message }}
          />
        }
        secondary={
          <Typography
            variant="caption"
            sx={{
              mt: 0.5,
              display: 'flex',
              alignItems: 'center',
              color: 'text.disabled',
              fontSize: '10px',
            }}
          >
            <Iconify icon="eva:clock-outline" sx={{ mr: 0.5, width: 16, height: 16 }} />
            {fToNow(notification.createdAt)}
          </Typography>
        }
      />
    </ListItemButton>
  );
}

// ----------------------------------------------------------------------

function renderContent(notification) {
  const title = (
    <Typography variant="subtitle2">
      {notification.message}
      <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
        &nbsp; {notification.message}
      </Typography>
    </Typography>
  );

  if (notification.type === 'order_placed') {
    return {
      avatar: <img alt={notification.title} src="/assets/icons/ic_notification_package.svg" />,
      title,
    };
  }
  if (notification.type === 'order_shipped') {
    return {
      avatar: <img alt={notification.title} src="/assets/icons/ic_notification_shipping.svg" />,
      title,
    };
  }
  if (notification.type === 'mail') {
    return {
      avatar: <img alt={notification.title} src="/assets/icons/ic_notification_mail.svg" />,
      title,
    };
  }
  if (notification.type === 'chat_message') {
    return {
      avatar: <img alt={notification.title} src="/assets/icons/ic_notification_chat.svg" />,
      title,
    };
  }
  return {
    avatar: notification.avatar ? <img alt={notification.title} src={notification.avatar} /> : null,
    title,
  };
}
