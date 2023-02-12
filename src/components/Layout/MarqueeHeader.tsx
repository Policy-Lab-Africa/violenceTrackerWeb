import { fetchViolenceReports } from '@/app/services/violence-report';
import { chakra, Skeleton, Stack, Text } from '@chakra-ui/react';
import { report } from 'process';
import Marquee from 'react-fast-marquee';
import { useQuery } from 'react-query';
import DangerIcon from '../Icons/DangerIcon';

const CMarquee = chakra(Marquee);

export default function MarqueeHeader() {
  const { data: reports, isLoading } = useQuery(`headlines`, () =>
    fetchViolenceReports(10),
  );

  return (
    <Stack
      direction={`row`}
      height={`36px`}
      width={`full`}
      bgColor={`accent`}
      alignItems="center"
    >
      <Stack
        direction={`row`}
        ml={[`1rem`, `6rem`]}
        px={[`8px`]}
        height={`100%`}
        bgColor="surface"
        alignItems={`center`}
      >
        <DangerIcon />
        <Text
          color={`accent`}
          fontSize={`md`}
          fontWeight={`bold`}
          whiteSpace="nowrap"
        >
          Voilence Alert
        </Text>
      </Stack>
      <CMarquee color={`white`} gradient={false}>
        {reports &&
          reports.map((report, index) => (
            <Text fontSize={`md`} key={`headline-${index}`} pr="8px">
              {report.description.substring(0, 30)}...
            </Text>
          ))}
      </CMarquee>
    </Stack>
  );
}
