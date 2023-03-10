// import SearchWithFilter from '@/components/Inputs/SearchWithFilter';
import ShowReports from '@/features/view-reports/ShowReports';
import { Box, Flex, Heading, VStack } from '@chakra-ui/react';

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
          zIndex={9}
        >
          <Heading fontSize={`2xl`} fontWeight={`bold`} color={`primary.500`}>
            Reports
          </Heading>

          {/* <SearchWithFilter /> */}
          <Box />
        </Flex>

        <ShowReports />
      </VStack>
    </Box>
  );
}
