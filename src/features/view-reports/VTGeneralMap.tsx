import { ViolenceReport } from '@/types';
import { Box } from '@chakra-ui/react';
import dynamic from 'next/dynamic';

const DynamicMap = dynamic(() => import(`./GeneralMapReport`), {
  ssr: false,
});

export interface MapProps {
  data?: ViolenceReport[];
}

export default function VTGeneralMap(props: MapProps) {
  return (
    <Box width={`full`}>
      <DynamicMap {...props} />
    </Box>
  );
}
