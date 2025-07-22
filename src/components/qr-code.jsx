/* eslint-disable react/prop-types */
import React from 'react';
import { QRCode } from 'react-qrcode-logo';
import { useSearchParams } from 'react-router-dom';

import { useGetStoreDetailsQuery } from 'src/services/get-reviews/interfacesDetails';

const QRCodeWithLogo = ({ value, size, logoWidth, logoHeight, bgColor = 'transparent' }) => {
  const [searchParams] = useSearchParams();
  const { data } = useGetStoreDetailsQuery(searchParams.get('store'));

  return (
    <QRCode
      value={value}
      size={size}
      bgColor={bgColor}
      logoImage={data?.store && data?.store?.image}
      logoWidth={logoWidth}
      logoHeight={logoHeight}
    />
  );
};

export default QRCodeWithLogo;
