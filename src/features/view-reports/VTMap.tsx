import { DataLevel } from '@/components/AccessData/DataAggregator';
import { LGA, PollingUnit, SearchResults, State, Ward } from '@/types';
import { Box } from '@chakra-ui/react';
import dynamic from 'next/dynamic';

const DynamicMap = dynamic(() => import(`./VisualizedMapReport`), {
  ssr: false,
});

export interface MapProps {
  data?: State | LGA | Ward | PollingUnit;
  regionKey: DataLevel;
}

export default function VTMap(props: MapProps) {
  return (
    <Box width={`full`}>
      <DynamicMap {...props} />
    </Box>
  );
}
