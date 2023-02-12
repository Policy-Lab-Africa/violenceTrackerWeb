import {
  Box,
  Container,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  useDisclosure,
} from '@chakra-ui/react';
import { DateRange } from 'react-date-range';
import { FilterIcon, SearchIconOutline } from '../Icons';

export default function SearchWithFilter() {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Container maxWidth={[`sm`, `md`]} width={`full`} position={`relative`}>
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
        mt={`-16px`}
        height={`300px`}
        zIndex={`99999999999`}
        width="full"
      >
        <DateRange
          ranges={[
            {
              startDate: new Date(`002-09-2023`),
              endDate: new Date(),
              key: `selection`,
            },
          ]}
          rangeColors={[`#228A78`]}
          onChange={(date) => console.log(date)}
        />
      </Box>
    </Container>
  );
}
