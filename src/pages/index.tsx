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
            <Button bgColor={`primary.500`} color={`white`}>
              Report Voilence
            </Button>
            <Button
              bgColor={`surface`}
              border={`1px`}
              borderColor={`primary.500`}
              color={`primary.500`}
            >
              Access Data
            </Button>
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
