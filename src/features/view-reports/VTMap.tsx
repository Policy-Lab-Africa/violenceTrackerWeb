import { SearchResults } from '@/types';
import { Box, Text } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import {
  MapContainer,
  MapContainerProps,
  Marker,
  Popup,
  TileLayer,
  useMap,
} from 'react-leaflet';

const DynamicMap = dynamic(() => import(`./VisualizedMapReport`), {
  ssr: false,
});

export interface MapProps {
  data?: SearchResults;
}

export default function VTMap(props: MapProps) {
  return (
    <Box width={`full`}>
      <DynamicMap {...props} />
    </Box>
  );
}
