import { Box, Button, chakra, Flex, Stack, Text } from '@chakra-ui/react';
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

export default function Header() {
  return (
    <Box bgColor={`surface`} width={`full`} fontSize={`1rem`}>
      {/* Main Nav Container */}
      <Flex
        width={`full`}
        justifyContent="space-between"
        alignItems="center"
        px={`5rem`}
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
        <Flex>
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
      </Flex>
    </Box>
  );
}
