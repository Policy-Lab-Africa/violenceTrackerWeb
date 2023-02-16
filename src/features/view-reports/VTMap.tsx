import { SearchResults } from '@/types';
import { Box } from '@chakra-ui/react';
import dynamic from 'next/dynamic';

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
