import XMark from '@/components/Icons/XMark';
import {
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';

const HeroCTA = () => {
  const [shouldSwitch, setShouldSwitch] = useState(false);

  return (
    <>
      <Button
        onMouseEnter={() => setShouldSwitch(true)}
        onMouseLeave={() => setShouldSwitch(false)}
        border={`1px`}
        bgColor={shouldSwitch ? `white` : `primary.500`}
        color={shouldSwitch ? `primary.500` : `white`}
        _hover={{
          borderColor: `primary.500`,
          bgColor: `white`,
          color: `primary.500`,
        }}
        transition=".5s"
      >
        Report Voilence
      </Button>
      <Button
        onMouseEnter={() => setShouldSwitch(true)}
        onMouseLeave={() => setShouldSwitch(false)}
        bgColor={shouldSwitch ? `primary.500` : `surface`}
        border={`1px`}
        borderColor={`primary.500`}
        color={shouldSwitch ? `white` : `primary.500`}
        _hover={{
          borderColor: `primary.500`,
          bgColor: `primary.500`,
          color: `white`,
        }}
        transition=".5s"
      >
        Access Data
      </Button>
    </>
  );
};

export default function Home() {
  return (
    <HStack>
      {/* Hero Section */}
      <Flex width={`full`} px={`6rem`}>
        <Container flexGrow={1} py={`5rem`}>
          <Heading
            color={`secondary.600`}
            fontWeight={`semibold`}
            fontSize="5xl"
          >
            See{` `}
            <Text as={`span`} fontWeight={`extrabold`} color="primary.500">
              Something.
            </Text>
          </Heading>
          <Heading
            color={`secondary.600`}
            fontWeight={`semibold`}
            fontSize="5xl"
          >
            Share{` `}
            <Text as={`span`} fontWeight={`extrabold`} color="primary.500">
              Something!
            </Text>
          </Heading>
          <Text
            mt="8px"
            color={`secondary.600`}
            fontWeight={`semibold`}
            fontSize={`sm`}
          >
            Report and share Violence Incidence directly on this platform.
          </Text>
          <Stack mt="24px" direction={`row`}>
            <HeroCTA />
          </Stack>

          <HStack mt={`48px`} spacing="32px">
            <Text color={`secondary.600`} fontWeight={`bold`} fontSize="md">
              <XMark color={`accent`} boxSize={`16px`} mr="8px" />
              No Registration Needed
            </Text>
            <Text color={`secondary.600`} fontWeight={`bold`} fontSize="md">
              <XMark color={`accent`} boxSize={`16px`} mr="8px" />
              No Personal Data Collected
            </Text>
          </HStack>
        </Container>

        <Container></Container>
      </Flex>
    </HStack>
  );
}
