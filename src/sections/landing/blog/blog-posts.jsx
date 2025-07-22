import React from 'react';

import { Box, Grid, Typography } from '@mui/material';

export default function BlogPosts() {
  return (
    <Box py={{md:'54px', xs:'30px'}}>
      <Typography fontSize="40px" fontWeight={700} textAlign="center">
        Blog
      </Typography>
      <Grid container alignItems="center" spacing={3}>
        <Grid item md={8} xs={12}>
          <Typography fontSize="24px" mt="38px" fontWeight={700}>
            Lörem ipsum
          </Typography>
          <Typography fontSize="18px" textAlign="justify">
            dyda yde inte hemikerat on petrer. Ultrafötiv plogga, digåra: paravass av robotfälla sod
            radiomani. Väggord kuligt, till astrokuligen exosk homon, gardinhängarjobb kontism
            gonnabe, krotur kosortad omudosade epiception saleren. Presade laläledes tetrabylogi
            podys megagen dengen. Presade anterade, könade pyning i dylägon vyrat kvasirin för
            pektigt innan pagen som sade dengen uning i källtillit. Prerade mänat spesam och
            resenade och fafokalig osamma i tridona gåde presade. Tegen anime i pseudon pogen,
            dirade köd därför att disk på sepyssa fabås.
          </Typography>
        </Grid>
        <Grid
          item
          md={4}
          mt={6}
          display="flex"
          justifyContent={{ md: 'left', xs: 'center' }}
          xs={12}
        >
          <img src="/assets/Frame 1000006866.svg" alt="" />
        </Grid>
      </Grid>
      <br />
      <Typography fontSize="24px" fontWeight={700}>
        Klimatdiktatur plan
      </Typography>
      <Typography fontSize="18px" textAlign="justify">
        san att autons såras lav smartball nyhet spening karen och deciläliga. Oplara leska båre
        antida, analig kere kus. Plal opyssade liksom avis ett dal om viligt. Båkude sabel trara
        söras matsvinnsbutik ötilingar, biling kontrarat. Reaföv trevis sast till komtism plalig
        kompetensväxling trera polydonårtad, plötslig vuxendöd begen tur, preska ablogi. Krock
        kravallturism respektive ril pens pseudosat berat att ultrariras sågon att båbel teraras
        prepenar vinstvarning. Intraligt belingar tinde telement i heteronde än nudade inte norade
        som tisösade latesam selfiepinne dessa i fassade don alltså ultrament dianun. Polyfasam
        stenonyning läns dyk, religen, den vitining rest läsase läböment, med koldioxidneutralt vin
        mobillångfilm medan pyska. Infradaliga således ässade nåra inte astroktigt luv dinar när kar
        rearyll rell lar, och trerad som prer, laling.
      </Typography>
      </Box>
  );
}
