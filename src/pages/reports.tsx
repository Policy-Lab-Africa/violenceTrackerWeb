// import SearchWithFilter from '@/components/Inputs/SearchWithFilter';
import ShowReports from '@/features/view-reports/ShowReports';
import { Box, Flex, Heading, VStack } from '@chakra-ui/react';
import { url } from 'inspector';

export default function Reports() {
  return (
    <Box
      bgColor={`secondary.900`}
      minHeight={`90vh`}
      backgroundImage={`/assets/reports/report-violence.png`}
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
    >
      <VStack
        px={[`1rem`, `6rem`]}
        pb={`5rem`}
        alignItems={`start`}
        maxHeight="100vh"
        overflowY={`scroll`}
      >
        <Flex
          // bgColor={`secondary.900`}
          background={`transparent`}
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

      <Box height={[`0`, `300px`]} />
    </Box>
  );
}
