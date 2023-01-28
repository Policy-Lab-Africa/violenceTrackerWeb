import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Select,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import { FaFilter } from 'react-icons/fa';
import { MdFileUpload, MdSearch } from 'react-icons/md';

export default function AccessData() {
  return (
    <Box
      backgroundImage={`/assets/images/map-bg.svg`}
      backgroundRepeat={`no-repeat`}
      backgroundSize={`cover`}
    >
      <VStack px={[`1rem`, `6rem`]} py={`5rem`} alignItems={`start`}>
        <Heading fontSize={`2xl`} fontWeight={`bold`} color={`primary.500`}>
          Access Data
        </Heading>
        <Text fontSize={`sm`} fontWeight={`semibold`} color={`black`}>
          Download and Export Violence Data
        </Text>

        <Container
          maxWidth={[`sm`, `md`]}
          display={`flex`}
          alignSelf={`center`}
          flexDirection={`column`}
          justifyContent={`center`}
        >
          <InputGroup my={`8px`}>
            <InputLeftElement>
              <MdFileUpload color="green.500" />
            </InputLeftElement>
            <Input
              type={`text`}
              bgColor={`white`}
              color={`secondary.700`}
              fontSize={`sm`}
              fontWeight={`semibold`}
              placeholder={`Search with State or LGA or Polling Unit`}
              size="lg"
            />
            <InputRightElement>
              <MdSearch color="green.500" />
            </InputRightElement>
          </InputGroup>

          <Button bgColor={`primary.500`} color={`white`} width={`80%`}>
            Submit Report
          </Button>

          <Text fontSize={`sm`} fontWeight={`semibold`} color={`primary.500`}>
            Access Election Violence Data of Nigeria
          </Text>
        </Container>
      </VStack>
    </Box>
  );
}
