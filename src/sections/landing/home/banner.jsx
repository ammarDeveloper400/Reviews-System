// import { useSearchParams } from 'react-router-dom';
// import React, { useRef, useState, useEffect } from 'react';

// import { Box, Button, Container, IconButton, Typography } from '@mui/material';

// import CustomModal from 'src/components/custom-model';

// import AccountVerificationModal from './verification-modal';

// export default function BannerSection() {
//   const [searchParams, setSearchParams] = useSearchParams();
//   const [openVerificationModal, setOpenVerificationModal] = useState(false);

//   const videoRef = useRef(null);
//   const [isPlaying, setIsPlaying] = useState(true);
//   const [modalOpen, setModalOpen] = useState(false);

//   const togglePlayPause = () => {
//     if (videoRef.current) {
//       if (isPlaying) {
//         videoRef.current.pause();
//       } else {
//         videoRef.current.play();
//       }
//       setIsPlaying(!isPlaying);
//     }
//   };
//   const handleOpen = () => setModalOpen(true);
//   const handleClose = () => setModalOpen(false);

//   const handleCloseVerificationModal = () => {
//     setOpenVerificationModal(false);
//     setSearchParams({});
//   };
//   useEffect(() => {
//     if (searchParams?.get('verified') === 'true') {
//       setOpenVerificationModal(true);
//     } else {
//       setOpenVerificationModal(false);
//     }
//   }, [searchParams]);

//   return (
//     <>
//       <Box
//         sx={{
//           position: 'relative',
//           backgroundImage: { md: 'url(/assets/images/home-banner.svg)', xs: 'none' },
//           backgroundRepeat: 'no-repeat',
//           backgroundSize: { md: 'cover', xs: 'contain' },
//           minHeight: { md: '700px' },
//           backgroundPosition: 'center',
//           px: '20px',
//           py: '20px',
//           pt: '0px',
//           // '::before': {
//           //   content: '""',
//           //   position: 'absolute',
//           //   top: 0,
//           //   left: 0,
//           //   right: 0,
//           //   bottom: 0,
//           //   backgroundColor: { xs: 'rgba(0, 0, 0, 0.7)', md: 'transparent', sm:'transparent' },
//           //   zIndex: 4,
//           // },
//         }}
//       >
//         <Typography
//           sx={{
//             textAlign: 'center',
//             fontSize: { md: '45px', xs: '26px', sm: '40px' },
//             fontWeight: 600,
//             mt: { md: '60px', xs: '30px' },
//             display: { md: 'block', xs: 'none' },
//             color: '#000',
//           }}
//         >
//           Effortless Restaurant Management <br />
//           at Your Fingertips
//         </Typography>
//         <Typography
//           sx={{
//             textAlign: 'center',
//             fontSize: { md: '45px', xs: '26px', sm: '40px' },
//             fontWeight: 600,
//             mt: { md: '60px', xs: '30px' },
//             display: { md: 'none', xs: 'block' },
//           }}
//         >
//           Lörem ipsum beligen ner som garar bevis.
//         </Typography>
//         <Box display="flex" flexWrap="wrap" justifyContent="center" gap="20px" mt="22px">
//           <Button
//             onClick={handleOpen}
//             variant="outlined"
//             sx={{
//               fontSize: { md: '25px', xs: '16px' },
//               fontWeight: 500,
//               px: '42px',
//               py: '9px',
//               borderRadius: '10px',
//             }}
//           >
//             Start a free trial
//           </Button>
//           <Button
//             onClick={handleOpen}
//             variant="outlined"
//             sx={{
//               fontSize: { md: '25px', xs: '16px' },
//               fontWeight: 500,
//               px: '42px',
//               py: '9px',
//               borderRadius: '10px',
//             }}
//           >
//             Sign up
//           </Button>
//         </Box>
//       </Box>
//       <Container maxWidth="lg">
//         <Box sx={{ mt: '70px' }}>
//           <Typography
//             sx={{ textAlign: 'center', fontSize: { md: '40px', xs: '26px' }, fontWeight: 600 }}
//           >
//             How to signup
//           </Typography>

//           <Box position="relative" width="100%" mt="29px">
//             <video
//               ref={videoRef}
//               src="/assets/video1.mp4"
//               autoPlay
//               loop
//               muted
//               controls={false}
//               style={{ width: '100%', borderRadius: '15px' }}
//             />
//             <Box
//               position="absolute"
//               top="50%"
//               left="50%"
//               style={{ transform: 'translate(-50%, -50%)' }}
//             >
//               <IconButton onClick={togglePlayPause}>
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="134"
//                   height="134"
//                   viewBox="0 0 134 134"
//                   fill="none"
//                 >
//                   <g opacity="0.5">
//                     <path
//                       d="M119.534 52.2209C122.216 53.6469 124.459 55.7757 126.023 58.3792C127.587 60.9827 128.414 63.9627 128.414 67C128.414 70.0372 127.587 73.0172 126.023 75.6207C124.459 78.2242 122.216 80.353 119.534 81.7791L48.0006 120.678C36.4822 126.948 22.334 118.797 22.334 105.905V28.1009C22.334 15.2034 36.4822 7.0573 48.0006 13.3162L119.534 52.2209Z"
//                       fill="black"
//                     />
//                   </g>
//                 </svg>
//               </IconButton>
//             </Box>
//           </Box>
//         </Box>
//         {modalOpen && <CustomModal open={modalOpen} onClose={handleClose} />}
//         {openVerificationModal && (
//           <AccountVerificationModal
//             open={openVerificationModal}
//             onClose={handleCloseVerificationModal}
//           />
//         )}
//       </Container>
//     </>
//   );
// }

import { useSearchParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import { Box, Button, Typography } from '@mui/material';

import CustomModal from 'src/components/custom-model';

import AccountVerificationModal from './verification-modal';

export default function BannerSection() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [openVerificationModal, setOpenVerificationModal] = useState(false);

  // const videoRef = useRef(null);
  // const [isPlaying, setIsPlaying] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  // const togglePlayPause = () => {
  //   if (videoRef.current) {
  //     if (isPlaying) {
  //       videoRef.current.pause();
  //     } else {
  //       videoRef.current.play();
  //     }
  //     setIsPlaying(!isPlaying);
  //   }
  // };
  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  const handleCloseVerificationModal = () => {
    setOpenVerificationModal(false);
    setSearchParams({});
  };
  useEffect(() => {
    if (searchParams?.get('verified') === 'true') {
      setOpenVerificationModal(true);
    } else {
      setOpenVerificationModal(false);
    }
  }, [searchParams]);

  return (
    <>
      <Box
        sx={{
          position: 'relative',
          backgroundImage: { md: 'url(/assets/images/home-banner.svg)', xs: 'none' },
          backgroundRepeat: 'no-repeat',
          backgroundSize: { md: 'cover', xs: 'contain' },
          minHeight: { md: '700px' },
          backgroundPosition: 'center',
          px: '20px',
          py: '20px',
          pt: '0px',
          // '::before': {
          //   content: '""',
          //   position: 'absolute',
          //   top: 0,
          //   left: 0,
          //   right: 0,
          //   bottom: 0,
          //   backgroundColor: { xs: 'rgba(0, 0, 0, 0.7)', md: 'transparent', sm:'transparent' },
          //   zIndex: 4,
          // },
        }}
      >
        <Typography
          sx={{
            textAlign: 'center',
            fontSize: { md: '45px', xs: '26px', sm: '40px' },
            fontWeight: 600,
            mt: { md: '60px', xs: '30px' },
            // display: { md: 'block', xs: 'none' },
            color: '#000',
          }}
        >
          Real time CX feedback
          <br />… instantly
        </Typography>
        {/* <Typography
          sx={{
            textAlign: 'center',
            fontSize: { md: '45px', xs: '26px', sm: '40px' },
            fontWeight: 600,
            mt: { md: '60px', xs: '30px' },
            display: { md: 'none', xs: 'block' },
          }}
        >
          Lörem ipsum beligen ner som garar bevis.
        </Typography> */}
        <Box display="flex" flexWrap="wrap" justifyContent="center" gap="20px" mt="22px">
          <Button
            onClick={handleOpen}
            variant="outlined"
            sx={{
              fontSize: { md: '25px', xs: '16px' },
              fontWeight: 500,
              px: '42px',
              py: '9px',
              borderRadius: '10px',
            }}
          >
            Start a free trial
          </Button>
          <Button
            onClick={handleOpen}
            variant="outlined"
            sx={{
              fontSize: { md: '25px', xs: '16px' },
              fontWeight: 500,
              px: '42px',
              py: '9px',
              borderRadius: '10px',
            }}
          >
            Sign up
          </Button>
        </Box>
      </Box>
      {/* <Container maxWidth="lg">
        <Box sx={{ mt: '70px' }}>
          <Typography
            sx={{ textAlign: 'center', fontSize: { md: '40px', xs: '26px' }, fontWeight: 600 }}
          >
            How to signup
          </Typography>

          <Box position="relative" width="100%" mt="29px">
            <video
              ref={videoRef}
              src="/assets/video1.mp4"
              autoPlay
              loop
              muted
              controls={false}
              style={{ width: '100%', borderRadius: '15px' }}
            />
            <Box
              position="absolute"
              top="50%"
              left="50%"
              style={{ transform: 'translate(-50%, -50%)' }}
            >
              <IconButton onClick={togglePlayPause}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="134"
                  height="134"
                  viewBox="0 0 134 134"
                  fill="none"
                >
                  <g opacity="0.5">
                    <path
                      d="M119.534 52.2209C122.216 53.6469 124.459 55.7757 126.023 58.3792C127.587 60.9827 128.414 63.9627 128.414 67C128.414 70.0372 127.587 73.0172 126.023 75.6207C124.459 78.2242 122.216 80.353 119.534 81.7791L48.0006 120.678C36.4822 126.948 22.334 118.797 22.334 105.905V28.1009C22.334 15.2034 36.4822 7.0573 48.0006 13.3162L119.534 52.2209Z"
                      fill="black"
                    />
                  </g>
                </svg>
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Container> */}
      {modalOpen && <CustomModal open={modalOpen} onClose={handleClose} />}
      {openVerificationModal && (
        <AccountVerificationModal
          open={openVerificationModal}
          onClose={handleCloseVerificationModal}
        />
      )}
    </>
  );
}
