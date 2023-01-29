import {
  InputGroup,
  InputLeftElement,
  Input,
  InputRightElement,
  Box,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import { DateRange } from 'react-date-range';
import { FilterIcon, SearchIconOutline } from '../Icons';

export default function SearchWithFilter() {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box width={`full`} position={`relative`}>
      <InputGroup my={`16px`}>
        <InputLeftElement
          fontSize={`2xl`}
          top="3px"
          cursor={`pointer`}
          onClick={onToggle}
        >
          <FilterIcon color="black" />
        </InputLeftElement>
        <Input
          type={`text`}
          bgColor={`white`}
          color={`secondary.700`}
          fontSize={`sm`}
          fontWeight={`semibold`}
          placeholder={`Search with State or LGA or Polling Unit`}
          size="lg"
          focusBorderColor="primary.500"
        />
        <InputRightElement fontSize={`2xl`} top="3px">
          <SearchIconOutline color="primary.500" />
        </InputRightElement>
      </InputGroup>
      <Box
        display={isOpen ? `block` : `none`}
        position={`absolute`}
        zIndex={`2`}
        mt={`-16px`}
      >
        <DateRange
          showPreview={false}
          ranges={[
            {
              startDate: new Date(`01-01-2023`),
              endDate: new Date(),
              key: `selection`,
            },
          ]}
          rangeColors={[`#228A78`]}
          onChange={(date) => console.log(date)}
        />
      </Box>
    </Box>
  );
}
