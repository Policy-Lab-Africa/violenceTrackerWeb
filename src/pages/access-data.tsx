import { AnimatedBox } from '@/components/Animated';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  FilterIcon,
  ReportIcon,
  SearchIconOutline,
} from '@/components/Icons';
import ArrowRight from '@/components/Icons/ArrowRight';
import BallotBoxIcon from '@/components/Icons/BallotBoxIcon';
import { NextChakraImage } from '@/components/Images/NextChakraImage';
import SearchWithFilter from '@/components/Inputs/SearchWithFilter';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react';
import { count } from 'console';
import { useState } from 'react';

type ValidState = `idle` | `loading` | `failed` | `completed` | `download`;

interface UnitReport {
  count: number;
  description: string;
  icon: string;
}
interface Report {
  title: string;
  summary: string;
  data: UnitReport[];
}

const currentReport: Report = {
  title: `Edo State`,
  summary: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Id animi placeat repudiandae libero nisi, hic perspiciatis. Veritatis eos architecto dignissimos atque nulla vel eligendi repellat, reprehenderit deleniti quos ducimus. Magni.`,
  data: [
    { count: 7, description: `Voilence in :x: LGA`, icon: `violence` },
    { count: 30, description: `:x: Ballot Boxes Snatched`, icon: `violence` },
    { count: 5000, description: `Approx. :x: Injured`, icon: `violence` },
    { count: 3, description: `:x: Group Clash Incidence`, icon: `violence` },
    { count: 200, description: `Approx. :x: Killed`, icon: `violence` },
    { count: 7, description: `:x: Sexual Violence Cases`, icon: `violence` },
  ],
};

export default function AccessData() {
  const [pageState, setPageState] = useState<ValidState>(`download`);
  const [report, setReport] = useState<Report>(currentReport);

  return (
    <Box
      backgroundImage={`/assets/images/map-bg.svg`}
      backgroundRepeat={`no-repeat`}
      backgroundSize={`cover`}
      minHeight={`90vh`}
    >
      {false && (
        <VStack px={[`1rem`, `6rem`]} py={`5rem`} alignItems={`start`}>
          <Heading fontSize={`2xl`} fontWeight={`bold`} color={`primary.500`}>
            Access Data
          </Heading>
          <Text fontSize={`sm`} fontWeight={`semibold`} color={`black`}>
            Download and Export Violence Data
          </Text>

          {pageState == `idle` && (
            <Container
              maxWidth={[`sm`, `lg`]}
              height={`full`}
              display={`flex`}
              alignSelf={`center`}
              flexDirection={`column`}
              justifyContent={`center`}
              alignItems={`center`}
            >
              <SearchWithFilter />

              <Button
                bgColor={`primary.500`}
                color={`white`}
                width={`80%`}
                mb="12px"
                _hover={{
                  bgColor: `surface`,
                  color: `primary.500`,
                  border: `1px`,
                }}
              >
                Search
              </Button>

              <Text
                fontSize={`sm`}
                fontWeight={`semibold`}
                color={`primary.500`}
              >
                Access Election Violence Data of Nigeria
              </Text>
            </Container>
          )}

          {pageState == `loading` && (
            <Container
              maxWidth={[`sm`, `lg`]}
              height={`full`}
              display={`flex`}
              alignSelf={`center`}
              flexDirection={`column`}
              justifyContent={`center`}
              alignItems={`center`}
            >
              <Text
                fontSize={`xl`}
                fontWeight={`semibold`}
                color={`primary.500`}
              >
                Searching...
              </Text>
              <AnimatedBox
                animate={{ rotateZ: [0, 5, 10, 15] }}
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore no problem in operation, although type error appears.
                transition={{
                  duration: 0.5,
                  repeatType: `reverse`,
                  repeat: Infinity,
                }}
              >
                <SearchIconOutline size={100} color="primary.500" />
              </AnimatedBox>
              {/* <NextChakraImage src={"/assets/images/"} /> */}
            </Container>
          )}
        </VStack>
      )}

      {report && (
        <VStack
          px={[`1rem`, `6rem`]}
          py={`5rem`}
          alignItems={`center`}
          width={`full`}
        >
          {/* Heading */}
          <Flex
            direction={`row`}
            justifyContent={`space-between`}
            width={`full`}
          >
            <Heading fontSize={`2xl`} fontWeight={`bold`} color={`primary.500`}>
              EDO STATE ELECTION VIOLENCE DATA
            </Heading>
            <Flex direction={`row`} alignItems={`center`}>
              <Text
                fontSize={`md`}
                fontWeight={`semibold`}
                color={`primary.500`}
              >
                View Reports{` `}
              </Text>
              <ChevronRightIcon
                display={`inline`}
                color={`primary.500`}
                size={`24`}
              />
            </Flex>
          </Flex>

          {pageState == `download` ? (
            <Container
              maxWidth={[`sm`, `lg`]}
              height={`full`}
              display={`flex`}
              alignSelf={`center`}
              flexDirection={`column`}
              justifyContent={`center`}
              alignItems={`center`}
              py="48px"
            >
              <Input
                type={`email`}
                placeholder="Please input your email address"
                size="lg"
                focusBorderColor="primary.500"
                mb={`24px`}
              />

              <Button
                bgColor={`primary.500`}
                color={`white`}
                width={`80%`}
                mb="12px"
                _hover={{
                  bgColor: `surface`,
                  color: `primary.500`,
                  border: `1px`,
                }}
              >
                Download Report
              </Button>
            </Container>
          ) : (
            <VStack>
              <Container
                display={`flex`}
                maxWidth={`container.md`}
                flexDirection={`row`}
                flexWrap={`wrap`}
                justifyContent="center"
                rowGap={`48px`}
                width="100%"
                pt="56px"
              >
                {report.data.map((info, index) => (
                  <Flex
                    key={index}
                    direction={`column`}
                    width={`25%`}
                    alignItems={`center`}
                  >
                    <ReportIcon size={48} my={`12px`} />
                    <Text fontSize={`sm`}>
                      {info.description.split(`:x:`)[0]}
                      {` `}
                      <Text
                        color="primary.500"
                        fontSize={`2xl`}
                        display={`inline`}
                      >
                        {info.count}
                      </Text>
                      {` `}
                      {info.description.split(`:x:`)[1]}
                    </Text>
                  </Flex>
                ))}
              </Container>

              <Container maxWidth={`container.md`} py={`56px`}>
                <Text>
                  <Text
                    display={`inline`}
                    color={`primary.500`}
                    fontWeight={`bold`}
                  >
                    Data Summary:
                  </Text>
                  {` `}
                  {report.summary}
                </Text>
              </Container>

              <Flex
                gap={`28px`}
                justifyContent={`center`}
                width={`full`}
                py={`24px`}
              >
                <Button
                  bgColor={`primary.500`}
                  color={`white`}
                  _hover={{
                    bgColor: `surface`,
                    color: `primary.500`,
                    border: `1px`,
                  }}
                >
                  Download Report
                </Button>

                <Button
                  variant={`outline`}
                  bgColor={`surface`}
                  borderColor={`primary.500`}
                  color={`primary.500`}
                  _hover={{
                    bgColor: `primary.600`,
                    color: `white`,
                    border: `1px`,
                  }}
                >
                  Share Data
                </Button>
              </Flex>
            </VStack>
          )}
        </VStack>
      )}
    </Box>
  );
}
