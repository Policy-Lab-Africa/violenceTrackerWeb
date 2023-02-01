import { Box, Center, Flex, Heading } from '@chakra-ui/react';
import { PlayVideoIcon } from '../Icons';
import { NextChakraImage } from '../Images/NextChakraImage';

export default function Video() {
  return (
    <Flex
      direction={`column`}
      position={`relative`}
      width={`350px`}
      minWidth={`350px`}
      bgColor={`blackAlpha.600`}
      scrollSnapAlign={`start`}
    >
      <NextChakraImage
        height={`400`}
        width={`400`}
        objectFit={`cover`}
        src={`/assets/images/protest.jpeg`}
        alt={`Chaos as Touts Harass Female Voter`}
      />
      {/* Title Overlay */}
      <Box
        py={`3rem`}
        position={`absolute`}
        bottom={`0`}
        bgColor={`#00000094`}
        px={`16px`}
        backdropFilter={`blur(8px)`}
      >
        <Heading size={`lg`} color={`white`}>
          Chaos as Touts Harass Female Voter
        </Heading>
      </Box>
      {/* Play Button */}
      <Center>
        <PlayVideoIcon
          onClick={() => alert(`I play a video`)}
          boxSize={36}
          color={`white`}
          position={`absolute`}
          top={`48px`}
        />
      </Center>
    </Flex>
  );
}
