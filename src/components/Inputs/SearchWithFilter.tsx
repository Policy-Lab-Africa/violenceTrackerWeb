import {
  Box,
  Container,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  useDisclosure,
} from '@chakra-ui/react';
import { useState } from 'react';
import { DateRange } from 'react-date-range';
import { FilterIcon, SearchIconOutline } from '../Icons';

export interface SearchInputData {
  q: string;
  start?: Date;
  end?: Date;
}

export interface SearchInputProps {
  onChange?: (value: SearchInputData) => void;
}

export default function SearchWithFilter({ onChange }: SearchInputProps) {
  const { isOpen, onToggle } = useDisclosure();

  const [q, setQ] = useState<string>(``);
  const [start, setStart] = useState<Date | undefined>(new Date(`02-01-2023`)); //M-d-Y
  const [end, setEnd] = useState<Date | undefined>(new Date());

  const sendDataOut = () => {
    if (onChange) onChange({ q, start, end });
  };

  return (
    <Container maxWidth={[`sm`, `md`]} width={`full`} position={`relative`}>
      <InputGroup mt={`16px`}>
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
          value={q}
          onChange={(e) => setQ(e.currentTarget.value)}
        />
        <InputRightElement
          cursor={`pointer`}
          onClick={sendDataOut}
          fontSize={`2xl`}
          top="3px"
        >
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
        {/* <DateRange
          ranges={[
            {
              startDate: start,
              endDate: end,
              key: `selection`,
            },
          ]}
          rangeColors={[`#228A78`]}
          onChange={(date) => {
            setStart(date.selection.startDate);
            setEnd(date.selection.endDate);
          }}
        /> */}
      </Box>
    </Container>
  );
}
