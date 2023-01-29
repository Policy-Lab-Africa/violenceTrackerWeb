import { FilterIcon, SearchIconOutline } from '@/components/Icons';
import SearchWithFilter from '@/components/Inputs/SearchWithFilter';
import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
  VStack,
} from '@chakra-ui/react';
import { DateRange } from 'react-date-range';

export default function AccessData() {
  return (
    <Box
      backgroundImage={`/assets/images/map-bg.svg`}
      backgroundRepeat={`no-repeat`}
      backgroundSize={`cover`}
      minHeight={`90vh`}
    >
      <VStack px={[`1rem`, `6rem`]} py={`5rem`} alignItems={`start`}>
        <Heading fontSize={`2xl`} fontWeight={`bold`} color={`primary.500`}>
          Access Data
        </Heading>
        <Text fontSize={`sm`} fontWeight={`semibold`} color={`black`}>
          Download and Export Violence Data
        </Text>

        <Container
          maxWidth={[`sm`, `lg`]}
          height={`full`}
          display={`flex`}
          alignSelf={`center`}
          flexDirection={`column`}
          justifyContent={`center`}
          alignItems={`center`}
        >
          <SearchWithFilter />

          <Button
            bgColor={`primary.500`}
            color={`white`}
            width={`80%`}
            mb="12px"
            _hover={{
              bgColor: `surface`,
              color: `primary.500`,
              border: `1px`,
            }}
          >
            Search
          </Button>

          <Text fontSize={`sm`} fontWeight={`semibold`} color={`primary.500`}>
            Access Election Violence Data of Nigeria
          </Text>
        </Container>
      </VStack>
    </Box>
  );
}
