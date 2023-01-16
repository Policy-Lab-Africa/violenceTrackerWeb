import {
  Box,
  Button,
  chakra,
  Flex,
  shouldForwardProp,
  Stack,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { isValidMotionProp, motion, useMotionValue } from 'framer-motion';
import { useState } from 'react';
import { NextChakraImage } from '../Images/NextChakraImage';

interface NavItemData {
  label: string;
  subLabel?: string;
  children?: Array<NavItemData>;
  href?: string;
}

const NAV_ITEM: NavItemData[] = [
  {
    label: `About`,
  },
  {
    label: `Data`,
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
        {item.label}
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

  return (
    <Box bgColor={`surface`} width={`full`} fontSize={`1rem`}>
      {/* Main Nav Container */}
      <Flex
        width={`full`}
        justifyContent="space-between"
        alignItems="center"
        pl={[`0rem`, `5rem`]}
        pr={[`1rem`, `5rem`]}
        height={`124px`}
      >
        {/* Logo */}
        <Flex>
          <NextChakraImage
            src={`/assets/Logo/voilence-tracker.svg`}
            alt="Voilence Tracker Logo"
            width={`126`}
            height={`66`}
          />
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
              color={`white`}
              bgColor={`primary.500`}
            >
              Report Violence
            </Button>
          </Stack>
        </Flex>

        {/* Hamburger */}
        <Flex
          position={`relative`}
          width={`48px`}
          height={`48px`}
          justifyContent={`center`}
          onClick={onToggle}
        >
          <AnimatedBox
            variants={barAVariant}
            animate={isOpen ? barAVariant.open : barAVariant.closed}
            position={`absolute`}
            top={`25%`}
            height={`2px`}
            width={`80%`}
            bgColor={`primary.500`}
          />
          <AnimatedBox
            variants={barBVariant}
            animate={isOpen ? barBVariant.open : barBVariant.closed}
            position={`absolute`}
            top={`50%`}
            height={`2px`}
            width={`50%`}
            bgColor={`primary.500`}
          />
          <AnimatedBox
            variants={barCVariant}
            animate={isOpen ? barCVariant.open : barCVariant.closed}
            position={`absolute`}
            top={`75%`}
            height={`2px`}
            width={`80%`}
            bgColor={`primary.500`}
          />
        </Flex>
      </Flex>
    </Box>
  );
}
