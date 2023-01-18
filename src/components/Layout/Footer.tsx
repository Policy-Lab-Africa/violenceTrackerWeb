import { Box, chakra, Flex, Text, VStack } from '@chakra-ui/react';
import { NextChakraImage } from '../Images/NextChakraImage';

const SVG = chakra(`svg`, {
  shouldForwardProp: () => true,
});

export default function Footer() {
  return (
    <Box>
      <Box
        bottom={0}
        width={`full`}
        height={`max-content`}
        position={`absolute`}
      >
        <SVG
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -3.28571 55 3.286"
          color={`primary.50`}
        >
          <path
            d="M 0 0 L 55 0 V -2 Q 50 -5 36 -1 Q 30 1 18.005 -1.007 Q 4.291 -3.944 0.03 -1.616 V 0"
            fill="currentColor"
          />
        </SVG>
        <Box bgColor={`primary.50`} height={[`180px`, `36px`]} />
      </Box>
      <Flex
        direction={[`column`, `row`]}
        fontSize={`xs`}
        justifyContent={`space-between`}
        px={[`1rem`, `5rem`]}
        pt={`3rem`}
        pb={`1rem`}
        position={`relative`}
      >
        <Flex
          justifyContent={[`space-between`]}
          alignItems={[`start`]}
          mb={[`32px`, `0px`]}
        >
          <NextChakraImage
            src={`/assets/Logo/voilence-tracker.svg`}
            alt="Voilence Tracker Logo"
            width={`126`}
            height={`66`}
          />

          <Box display={[`block`, `none`]}>
            <Text textAlign={`end`}>info@ElectionViolenceTracker.org</Text>

            <Text textAlign={`end`}>+234 800 000 6000</Text>
          </Box>
        </Flex>
        <VStack
          justifyContent={`space-between`}
          fontWeight={`semibold`}
          color={`secondary.600`}
          px={[`1rem`, `0`]}
          textAlign={`center`}
        >
          <Text fontWeight={`bold`} maxWidth={`md`}>
            A PolicyLab Initiative supported by mySociety subgrant from the
            National Endowment for Democracy (NED)
          </Text>

          <Text>Copyright &copy; 2023</Text>
        </VStack>

        <Box display={[`none`, `block`]}>
          <Text textAlign={`end`}>info@ElectionViolenceTracker.org</Text>

          <Text textAlign={`end`}>+234 800 000 6000</Text>
        </Box>
      </Flex>
    </Box>
  );
}
