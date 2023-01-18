import MapDirection from '@/components/Icons/MapDirection';
import XMark from '@/components/Icons/XMark';
import { NextChakraImage } from '@/components/Images/NextChakraImage';
import {
  AspectRatio,
  Box,
  Button,
  chakra,
  Container,
  Flex,
  Heading,
  HStack,
  shouldForwardProp,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { isValidMotionProp, motion } from 'framer-motion';
import { ST } from 'next/dist/shared/lib/utils';
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

const Video = chakra(`video`, {
  shouldForwardProp: () => true,
});

const AnimatedBox = chakra(motion.div, {
  /**
   * Allow motion props and non-Chakra props to be forwarded.
   */
  shouldForwardProp: (prop) =>
    isValidMotionProp(prop) || shouldForwardProp(prop),
});

export default function Home() {
  return (
    <Box>
      {/* Hero Section */}
      <Flex
        direction={[`column`, `row`]}
        width={`full`}
        px={[`1rem`, `6rem`]}
        pt={[`4rem`, ``]}
        height={[`max-content`, `500px`]}
        alignItems={`center`}
      >
        <Container flexGrow={1}>
          <Heading
            color={`secondary.600`}
            fontWeight={`semibold`}
            fontSize={[`4xl`, `5xl`]}
          >
            See{` `}
            <Text as={`span`} fontWeight={`extrabold`} color="primary.500">
              Something.
            </Text>
          </Heading>
          <Heading
            color={`secondary.600`}
            fontWeight={`semibold`}
            fontSize={[`4xl`, `5xl`]}
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

          <Stack
            direction={[`column`, `row`]}
            mt={`48px`}
            spacing={[`16px`, `32px`]}
          >
            <Text
              whiteSpace={`nowrap`}
              color={`secondary.600`}
              fontWeight={`bold`}
              fontSize="md"
            >
              <XMark color={`accent`} boxSize={`16px`} mr="8px" />
              No Registration Needed
            </Text>
            <Text
              whiteSpace={`nowrap`}
              color={`secondary.600`}
              fontWeight={`bold`}
              fontSize="md"
            >
              <XMark color={`accent`} boxSize={`16px`} mr="8px" />
              No Personal Data Collected
            </Text>
          </Stack>
        </Container>

        <Flex
          mt={[`16px`, `0`]}
          alignItems={`end`}
          width={`full`}
          height={`full`}
        >
          {/* Desktop Image */}
          <NextChakraImage
            src={`/assets/images/see-omething-say-something.png`}
            alt="See something, Say something."
            width={`900`}
            height={`450`}
            objectFit="cover"
          />
        </Flex>
      </Flex>

      {/* Highlight section */}
      <Stack
        px={[`3rem`, `6rem`]}
        pt={[`4rem`, `0rem`]}
        width="full"
        height={[`350px`, `200px`]}
        bgColor={`primary.dark`}
        direction={[`column`, `row`]}
        justifyContent={[`center`]}
      >
        <VStack justifyContent={`center`} height={`100%`}>
          <Heading
            whiteSpace={`nowrap`}
            color={`white`}
            fontSize={`2xl`}
            px={`24px`}
            mb={`8px`}
          >
            Track Violence using the{` `}
            <Text display={`block`} color={`primary.500`}>
              Interactive Map Feature
            </Text>
          </Heading>
          <AnimatedBox
            animate={{
              // scale: [1, 2, 2, 1, 1],
              translateY: [`0%`, `5%`, `10%`, `20%`, `10%`, `5%`, `0%`],
            }}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore no problem in operation, although type error appears.
            transition={{
              duration: 2,
              ease: `easeInOut`,
              repeat: Infinity,
              repeatType: `loop`,
            }}
          >
            <NextChakraImage
              src={`/assets/icons/thin-direction-pointer-bottom-icon.svg`}
              alt="Direction pointer"
              width={`8`}
              height={`8`}
              objectFit="contain"
            />
          </AnimatedBox>
          {/* <MapDirection boxSize={`24px`} color="primary.500" /> */}
        </VStack>
        <VStack justifyContent={`flex-start`} height={[`full`]}>
          <Video
            outlineColor={`primary.dark`}
            borderColor={`primary.dark`}
            borderWidth="4px"
            autoPlay
            loop
            // width={`full`}
            height={`full`}
          >
            <source src="/assets/video/map-animation.mp4" type="video/mp4" />
          </Video>
        </VStack>
      </Stack>

      {/* Map */}
      <Box px={[`1rem`, `6rem`]} py={[`1rem`, `6rem`]}>
        <AspectRatio ratio={16 / 9}>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.952912260219!2d3.375295414770757!3d6.5276316452784755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b2ae68280c1%3A0xdc9e87a367c3d9cb!2sLagos!5e0!3m2!1sen!2sng!4v1567723392506!5m2!1sen!2sng" />
        </AspectRatio>
      </Box>
    </Box>
  );
}
