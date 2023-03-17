import { fetchViolenceReports } from '@/app/services/violence-report';
import XMark from '@/components/Icons/XMark';
import { NextChakraImage } from '@/components/Images/NextChakraImage';
import VTGeneralMap from '@/features/view-reports/VTGeneralMap';
import {
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
  useMediaQuery,
  VStack,
} from '@chakra-ui/react';
import { isValidMotionProp, motion } from 'framer-motion';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { useQuery } from 'react-query';

const HeroCTA = () => {
  const [shouldSwitch, setShouldSwitch] = useState(false);

  return (
    <Flex gap={`6`}>
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
        size={`lg`}
      >
        <Link href={`report-violence`}>Report Violence</Link>
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
        size={`lg`}
        transition=".5s"
      >
        <Link href={`access-data`}>Access Data</Link>
      </Button>
    </Flex>
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
  const { data } = useQuery([`violence-report`, `summary`], () =>
    fetchViolenceReports(100),
  );
  const [isLargerThan800] = useMediaQuery(`(min-width: 800px)`);
  const [isLargerThan1100] = useMediaQuery(`(min-width: 1100px)`);

  return (
    <Box>
      {/* Hero Section */}
      <Flex
        direction={[`column`, `row`]}
        width={`full`}
        pl={[`1rem`, `6rem`]}
        pt={[`4rem`, ``]}
        height={[`max-content`, `500px`, `650px`]}
        alignItems={`center`}
      >
        <Container flexGrow={1} position={`relative`}>
          <Heading
            color={`secondary.600`}
            fontWeight={`semibold`}
            fontSize={[`4xl`, `6xl`]}
          >
            See{` `}
            <Text as={`span`} fontWeight={`extrabold`} color="primary.500">
              Something.
            </Text>
          </Heading>
          <Heading
            color={`secondary.600`}
            fontWeight={`semibold`}
            fontSize={[`4xl`, `6xl`]}
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
            fontSize={`xl`}
            whiteSpace={[`normal`, `nowrap`]}
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
              fontSize="xl"
            >
              <XMark color={`accent`} boxSize={`16px`} mr="8px" />
              No Registration Needed
            </Text>
            <Text
              whiteSpace={`nowrap`}
              color={`secondary.600`}
              fontWeight={`bold`}
              fontSize="xl"
            >
              <XMark color={`accent`} boxSize={`16px`} mr="8px" />
              No Personal Data Collected
            </Text>
          </Stack>
        </Container>

        <Flex
          // mt={[`16px`, `0`]}
          alignItems={`end`}
          alignSelf={`end`}
          overflowX={`visible`}
          // width={`full`}
          // height={`full`}
        >
          {/* Desktop Image */}
          {!isLargerThan800 && (
            <NextChakraImage
              src={`/assets/landing/see-omething-say-something.png`}
              alt="See something, Say something."
              width={`400`}
              height={`270`}
              overflowX={`visible`}
              objectFit={`cover`}
            />
          )}
          {isLargerThan800 && !isLargerThan1100 && (
            <NextChakraImage
              src={`/assets/landing/see-omething-say-something.png`}
              alt="See something, Say something."
              width={`739`}
              height={`500`}
              overflowX={`visible`}
              objectFit={`cover`}
            />
          )}

          {isLargerThan1100 && (
            <NextChakraImage
              src={`/assets/landing/see-omething-say-something.png`}
              alt="See something, Say something."
              width={`960`}
              height={`650`}
              overflowX={`visible`}
              objectFit={`cover`}
            />
          )}
        </Flex>
      </Flex>

      {/* Highlight section */}
      <Stack
        px={[`3rem`, `6rem`]}
        pt={[`4rem`, `0rem`]}
        width="full"
        height={[`400px`, `400px`]}
        bgColor={`#24352e`}
        direction={[`column`, `row`]}
        justifyContent={[`center`]}
      >
        <VStack
          justifyContent={`center`}
          height={`100%`}
          width={[`100%`, `50%`]}
        >
          <Heading
            whiteSpace={`nowrap`}
            color={`white`}
            fontSize={[`2xl`, `4xl`]}
            fontWeight={`medium`}
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
              src={`/assets/landing/thin-direction-pointer-bottom-icon.svg`}
              alt="Direction pointer"
              width={`8`}
              height={`8`}
              objectFit="contain"
            />
          </AnimatedBox>
          {/* <MapDirection boxSize={`24px`} color="primary.500" /> */}
        </VStack>

        <VStack
          justifyContent={`flex-start`}
          height={[`full`]}
          width={[`100%`, `50%`]}
        >
          <Video
            // outlineColor={`primary.dark`}
            borderColor={`#24352e`}
            borderWidth="4px"
            background={`#24352e`}
            autoPlay
            muted
            loop
            // width={`full`}
            height={`full`}
          >
            <source src="/assets/landing/map-animation.mp4" type="video/mp4" />
          </Video>
        </VStack>
      </Stack>

      {/* Map */}
      <Flex
        px={[`1rem`, `6rem`]}
        py={[`1rem`, `6rem`]}
        justifyContent={`center`}
        alignItems={`center`}
        flexDirection={`column`}
        gap={[`2`, `10`]}
      >
        <VTGeneralMap data={data} />
        <HStack width={[`300px`, `465px`, `600px`]}>
          <Box
            borderColor="black"
            backgroundColor={`black`}
            width={`4px`}
            height={`47px`}
          />
          <NextChakraImage
            src={`/assets/landing/hint-scroll.gif`}
            alt="Map hints."
            width={`465`}
            height={`47`}
            overflowX={`visible`}
            objectFit={`contain`}
          />
          <Box
            borderColor="black"
            backgroundColor={`black`}
            width={`4px`}
            height={`47px`}
          />
        </HStack>
      </Flex>

      {/* Know the numbers */}
      <Stack
        px={[`3rem`, `6rem`]}
        pt={[`4rem`, `0rem`]}
        width="full"
        bgColor={`surface`}
        direction={[`column`, `row`]}
        alignItems="center"
      >
        <VStack alignItems={`start`} height={`100%`} width={[`100%`, `50%`]}>
          <Heading
            whiteSpace={`nowrap`}
            color={`secondary.900`}
            fontSize={[`2xl`, `5xl`]}
            fontWeight={`medium`}
          >
            Know the{` `}
            <Text display={`inline`} color={`primary.500`} fontWeight="bold">
              Numbers
            </Text>
          </Heading>
          <Text
            color={`secondary.600`}
            fontWeight={`semibold`}
            fontSize={`md`}
            whiteSpace={[`normal`, `nowrap`]}
            style={{ marginBottom: `24px` }}
          >
            View, download and share real time data of your preferred location.
          </Text>
          <Button
            bgColor={`surface`}
            border={`1px`}
            borderColor={`primary.500`}
            color={`primary.500`}
            _hover={{
              borderColor: `primary.500`,
              bgColor: `primary.500`,
              color: `white`,
            }}
            size={`md`}
            transition=".5s"
          >
            <Link href={`access-data`}>Access Data</Link>
          </Button>
        </VStack>

        <Flex width={`full`} justifyContent={`center`}>
          <NextChakraImage
            src={`/assets/landing/access-data.png`}
            alt="See something, Say something."
            width={`500`}
            height={`500`}
            overflowX={`visible`}
            objectFit={`contain`}
          />
        </Flex>
      </Stack>
    </Box>
  );
}
