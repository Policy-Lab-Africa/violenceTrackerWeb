import { chakra, shouldForwardProp } from '@chakra-ui/react';
import { DateRange } from 'react-date-range';

export const VTDateRanger = chakra(DateRange, {
  shouldForwardProp: (prop) => shouldForwardProp(prop),
});
