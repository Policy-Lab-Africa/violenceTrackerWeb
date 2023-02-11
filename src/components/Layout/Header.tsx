import {
  Box,
  Button,
  chakra,
  Flex,
  Heading,
  shouldForwardProp,
  Stack,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { isValidMotionProp, motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { NextChakraImage } from '../Images/NextChakraImage';
import MarqueeHeader from './MarqueeHeader';

interface NavItemData {
  label: string;
  subLabel?: string;
  children?: Array<NavItemData>;
  href?: string;
}

const NAV_ITEM: NavItemData[] = [
  {
    label: `About`,
    href: `/about`,
  },
  {
    label: `Reports`,
    href: `/reports`,
  },
  {
    label: `Data`,
    href: `/access-data`,
  },
];

const NavItem = ({ item }: { item: NavItemData }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <Box
      cursor={`pointer`}
      px={`4`}
      key={item.label}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Text
        position={`relative`}
        fontWeight={`semibold`}
        _after={{
          content: `""`,
          position: `absolute`,
          bottom: 0,
          right: hovered ? `0%` : `100%`,
          left: 0,
          top: `100%`,
          height: `4px`,
          bgColor: `primary.600`,
          borderRadius: 4,
          transition: `0.2s`,
        }}
      >
        <Link href={item.href ?? `#`}>{item.label}</Link>
      </Text>
    </Box>
  );
};

const AnimatedBox = chakra(motion.div, {
  /**
   * Allow motion props and non-Chakra props to be forwarded.
   */
  shouldForwardProp: (prop) =>
    isValidMotionProp(prop) || shouldForwardProp(prop),
});

export default function Header() {
  const { isOpen, onToggle } = useDisclosure();
  const barAVariant = {
    open: { top: `50%`, rotate: `45deg` },
    closed: { top: `25%`, rotate: `0deg` },
  };

  const barBVariant = {
    open: { width: `0%` },
    closed: { width: `50%` },
  };

  const barCVariant = {
    open: { top: `50%`, rotate: `-45deg` },
    closed: { top: `75%`, rotate: `0deg` },
  };

  const headerVariant = {
    open: {
      backgroundColor: `red`,
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
    },
    closed: { top: 0, bottom: 0, right: 0, left: 0, backgroundColor: `blue` },
  };

  return (
    <AnimatedBox
      bgColor={`surface`}
      zIndex="10"
      width={`full`}
      fontSize={`1rem`}
      position={`fixed`}
      height={[`max-content`]}
      // overflow={`hidden`}
      animate={isOpen ? { height: `100vh` } : { height: `max-content` }}
    >
      <VStack width={`full`}>
        {/* Main Nav Container */}
        <Flex
          width={`full`}
          justifyContent="space-between"
          alignItems="center"
          pl={[`0rem`, `5rem`]}
          pr={[`1rem`, `5rem`]}
          height={`84px`}
        >
          {/* Logo */}
          <Flex>
            <Link href={`/`}>
              <NextChakraImage
                src={`/assets/Logo/voilence-tracker.svg`}
                alt="Voilence Tracker Logo"
                width={`126`}
                height={`66`}
              />
            </Link>
          </Flex>

          {/* Desktop Nav */}
          <Flex display={[`none`, `flex`]}>
            <Stack direction={`row`} alignItems="center">
              {NAV_ITEM.map((item) => (
                <NavItem item={item} key={item.label} />
              ))}

              <Button
                _hover={{
                  bgColor: `surface`,
                  color: `primary.500`,
                  border: `1px`,
                }}
                borderWidth="1px"
                color={`white`}
                bgColor={`primary.500`}
              >
                <Link href={`report-violence`}>Report Violence</Link>
              </Button>
            </Stack>
          </Flex>

          {/* Hamburger */}
          <Flex
            display={[`flex`, `none`]}
            position={`relative`}
            width={`48px`}
            height={`48px`}
            justifyContent={`center`}
            onClick={onToggle}
          >
            <AnimatedBox
              variants={barAVariant}
              animate={isOpen ? `open` : `closed`}
              position={`absolute`}
              top={`25%`}
              height={`2px`}
              width={`80%`}
              bgColor={`primary.500`}
            />
            <AnimatedBox
              variants={barBVariant}
              animate={isOpen ? `open` : `closed`}
              position={`absolute`}
              top={`50%`}
              height={`2px`}
              width={`50%`}
              bgColor={`primary.500`}
            />
            <AnimatedBox
              variants={barCVariant}
              animate={isOpen ? `open` : `closed`}
              position={`absolute`}
              top={`75%`}
              height={`2px`}
              width={`80%`}
              bgColor={`primary.500`}
            />
          </Flex>
        </Flex>

        <MarqueeHeader />

        {/* Mobile Nav Container */}
        <Box
          display={[`flex`, `none`]}
          position={`relative`}
          height={`full`}
          width={`full`}
        >
          <AnimatedBox
            position={`absolute`}
            bgColor="primary.500"
            width={`full`}
            height={`full`}
          >
            <Heading>Our Mobile Navigation</Heading>
          </AnimatedBox>
        </Box>
      </VStack>
      <Box
        height={`0px`}
        bgColor={`transparent`}
        width={`full`}
        boxShadow={`0px 7px 8px 8px #ffffffd7`}
      />
    </AnimatedBox>
  );
}
