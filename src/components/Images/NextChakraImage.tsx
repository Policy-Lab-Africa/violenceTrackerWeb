import { chakra } from '@chakra-ui/react';
import NextImage from 'next/image';

export const NextChakraImage = chakra(NextImage, {
  shouldForwardProp: (prop) =>
    [
      `width`,
      `height`,
      `src`,
      `alt`,
      `quality`,
      `placeholder`,
      `blurDataURL`,
      `loader`,
    ].includes(prop),
});
