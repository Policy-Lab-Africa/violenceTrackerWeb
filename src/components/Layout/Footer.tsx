import { Box, chakra, Flex, Text, VStack } from '@chakra-ui/react';
import { NextChakraImage } from '../Images/NextChakraImage';
import FooterBG from './FooterBg';

const SVG = chakra(`svg`, {
  shouldForwardProp: () => true,
});

export default function Footer() {
  return (
    <Box
    // backgroundImage={`/assets/`}
    >
      <Box height={[`0`, `300px`]} />
      <Box
        bottom={0}
        width={`full`}
        height={`max-content`}
        position={[`static`, `absolute`]}
      >
        <FooterBG />
        {/* <Box bgColor={`primary.50`} height={[`180px`, `36px`]} /> */}
      </Box>
      <Flex
        direction={[`column`, `row`]}
        fontSize={`xs`}
        justifyContent={`space-between`}
        px={[`1rem`, `5rem`]}
        pt={`3rem`}
        pb={`1rem`}
        position={`relative`}
        backgroundColor="#c8e9e6"
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
