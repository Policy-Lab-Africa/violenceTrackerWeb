import { Box, Flex, Text, VStack } from '@chakra-ui/react';
import { NextChakraImage } from '../Images/NextChakraImage';

export default function Footer() {
  return (
    <Flex
      fontSize={`xs`}
      justifyContent={`space-between`}
      px={`5rem`}
      pt={`3rem`}
      pb={`1rem`}
    >
      <Box>
        <NextChakraImage
          src={`/assets/Logo/voilence-tracker.svg`}
          alt="Voilence Tracker Logo"
          width={`126`}
          height={`66`}
        />
      </Box>
      <VStack
        justifyContent={`space-between`}
        fontWeight={`semibold`}
        color={`secondary.600`}
      >
        <Text fontWeight={`bold`}>
          A PolicyLab Initiative supported by mySociety subgrant from the
          National Endowment for Democracy (NED)
        </Text>

        <Text>Copyright &copy; 2023</Text>
      </VStack>

      <Box>
        <Text textAlign={`end`}>info@ElectionViolenceTracker.org</Text>

        <Text textAlign={`end`}>+234 800 000 6000</Text>
      </Box>
    </Flex>
  );
}
