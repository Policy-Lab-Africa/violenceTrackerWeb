import { chakra, Stack, Text } from '@chakra-ui/react';
import Marquee from 'react-fast-marquee';
import DangerIcon from '../Icons/DangerIcon';

const CMarquee = chakra(Marquee);

const HEADLINES = [
  `Ballot Boxes Snatched in 7 Places`,
  `Groups Clash in Edo Local Government Area`,
  `INEC Official Kiddnapped in Inewi LGA`,
  `Tension in Kogi as Election Official Bribed to Shut up`,
  `Ballot Boxes Snatched in 7 Places`,
];

export default function MarqueeHeader() {
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
        {HEADLINES.map((headline, index) => (
          <Text fontSize={`md`} key={`headline-${index}`} pr="8px">
            {headline}...
          </Text>
        ))}
      </CMarquee>
    </Stack>
  );
}
