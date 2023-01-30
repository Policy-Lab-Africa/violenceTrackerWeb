import { AspectRatio, Box, Button, Center, Text } from '@chakra-ui/react';
import React from 'react';
import { RecordIcon, StopRecordIcon } from '../Icons';

export default function Recorder() {
  return (
    <Box width={`full`}>
      <AspectRatio width={`full`} ratio={16 / 9} bgColor={`black`}>
        <Center onClick={() => alert(`I record videos`)}>
          <RecordIcon cursor={`pointer`} color={`accent`} boxSize={24} />
          <Text
            color={`white`}
            fontWeight={`bold`}
            position={`absolute`}
            ms={`-32px`}
          >
            Record
          </Text>
          {/* Record Border */}
          <Box
            width={`50px`}
            height={`50px`}
            position={`absolute`}
            borderColor={`surface`}
            borderWidth={`2px`}
            top={`20px`}
            left={`20px`}
            borderRightWidth={`0`}
            borderBottomWidth={`0`}
          />
          <Box
            width={`50px`}
            height={`50px`}
            position={`absolute`}
            borderColor={`surface`}
            borderWidth={`2px`}
            top={`20px`}
            right={`20px`}
            borderLeftWidth={`0`}
            borderBottomWidth={`0`}
          />
          <Box
            width={`50px`}
            height={`50px`}
            position={`absolute`}
            borderColor={`surface`}
            borderWidth={`2px`}
            bottom={`20px`}
            left={`20px`}
            borderRightWidth={`0`}
            borderTopWidth={`0`}
          />
          <Box
            width={`50px`}
            height={`50px`}
            position={`absolute`}
            borderColor={`surface`}
            borderWidth={`2px`}
            bottom={`20px`}
            right={`20px`}
            borderLeftWidth={`0`}
            borderTopWidth={`0`}
          />
        </Center>
      </AspectRatio>

      <Center py={`8px`}>
        <Button
          bgColor={`accent`}
          color={`surface`}
          size={`sm`}
          _hover={{
            bgColor: `accent`,
            borderWidth: `2px`,
            borderColor: `accent`,
          }}
        >
          Stop Recording <StopRecordIcon ms={`8px`} />
        </Button>
      </Center>
    </Box>
  );
}
