import SearchWithFilter from '@/components/Inputs/SearchWithFilter';
import Tweet from '@/components/Twitter/Tweet';
import { Box, Container, Flex, Heading, VStack } from '@chakra-ui/react';

export default function Reports() {
  return (
    <Box bgColor={`secondary.900`} minHeight={`90vh`}>
      <VStack px={[`1rem`, `6rem`]} pb={`5rem`} alignItems={`start`}>
        <Flex
          bgColor={`secondary.900`}
          alignItems={`center`}
          width={`full`}
          justifyContent={`space-between`}
          position={`fixed`}
          pt={`2rem`}
          pb={`0.5rem`}
        >
          <Heading fontSize={`2xl`} fontWeight={`bold`} color={`primary.500`}>
            Reports
          </Heading>

          <SearchWithFilter />
          <Box />
        </Flex>

        <Container
          pt={`10rem`}
          maxWidth={[`sm`, `container.md`]}
          height={`full`}
          display={`flex`}
          alignSelf={`center`}
          flexDirection={`column`}
          justifyContent={`center`}
          alignItems={`center`}
          px={`16px`}
        >
          {/* TwitterReport */}
          <Tweet />
          <Tweet />
          <Tweet />
          <Tweet />
          <Tweet />
          <Tweet />
        </Container>
      </VStack>
    </Box>
  );
}
