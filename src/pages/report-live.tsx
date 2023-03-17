import Recorder from '@/components/Twitter/Recorder';
import Video from '@/components/Twitter/Video';
import { Box, Flex, Heading, HStack, Text, VStack } from '@chakra-ui/react';

type ValidState = `idle` | `loading` | `failed` | `completed` | `download`;

interface UnitReport {
  count: number;
  description: string;
  icon: string;
}

export default function ReportLive() {
  return (
    <VStack width={`full`} px={[`1rem`, `5rem`]}>
      {/* Header */}
      <Box width={`full`} py={[`2rem`]}>
        <HStack>
          <Heading color={`secondary.700`}>Report</Heading>
          <Heading color={`accent`}>Live</Heading>
        </HStack>
        <Text color={`secondary.8700`}>
          Record live footages of the incidence as they occur
        </Text>
      </Box>
      {/* Record */}
      <Recorder />
      {/* Watch Videos */}
      <Box width={`full`} color={`secondary.700`} height={`max-content`}>
        <Heading size={`md`} py={`1.5rem`}>
          Watch Videos
        </Heading>
        <Flex
          gap={`32px`}
          overflowX={`scroll`}
          direction="row"
          height={`max-content`}
          scrollSnapType={`x proximity`}
          // scrollPaddingRight={`100px`}
        >
          <Video />
          <Video />
          <Video />
          <Video />
          <Video />
          <Video />
          <Video />
          <Video />
          <Video />
        </Flex>
      </Box>

      <Box height={[`0`, `300px`]} />
    </VStack>
  );
}
