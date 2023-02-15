import { searchReports } from '@/app/services/violence-report';
import { AnimatedBox } from '@/components/Animated';
import {
  ChevronRightIcon,
  ReportIcon,
  SearchIconOutline,
} from '@/components/Icons';
import SearchWithFilter, {
  SearchInputData,
} from '@/components/Inputs/SearchWithFilter';
import VisualizedMapReport from '@/features/view-reports/VisualizedMapReport';
import VTMap from '@/features/view-reports/VTMap';
import { SearchResults } from '@/types';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { is } from 'date-fns/locale';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

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

// const currentReport: Report = {
//   title: `Edo State`,
//   summary: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Id animi placeat repudiandae libero nisi, hic perspiciatis. Veritatis eos architecto dignissimos atque nulla vel eligendi repellat, reprehenderit deleniti quos ducimus. Magni.`,
//   data: [
//     { count: 7, description: `Voilence in :x: LGA`, icon: `violence` },
//     { count: 30, description: `:x: Ballot Boxes Snatched`, icon: `violence` },
//     { count: 5000, description: `Approx. :x: Injured`, icon: `violence` },
//     { count: 3, description: `:x: Group Clash Incidence`, icon: `violence` },
//     { count: 200, description: `Approx. :x: Killed`, icon: `violence` },
//     { count: 7, description: `:x: Sexual Violence Cases`, icon: `violence` },
//   ],
// };

export default function AccessData() {
  const [pageState, setPageState] = useState<ValidState>(`idle`);
  const [report, setReport] = useState<SearchResults>();
  const [search, setSearch] = useState<SearchInputData>();
  const [makeSearch, setMakeSearch] = useState<boolean>(false);
  const toast = useToast();

  const { isLoading } = useQuery(
    [`search`, search],
    () => searchReports(search),
    {
      enabled: makeSearch,
      onSuccess: (data) => {
        setReport(data);
      },
    },
  );

  const downloadReport = () => {
    setPageState(`download`);
  };

  const sendToEmail = () => {
    setPageState(`completed`);
  };

  const handleSearchInput = (values: SearchInputData) => {
    if (!values.q) {
      toast({
        title: `Hey! `,
        description: `Your search input should not be empty`,
        status: `error`,
        duration: 9000,
        isClosable: true,
      });

      return;
    }
    setSearch(values);
  };

  const handleSearch = () => {
    setMakeSearch(true);
    console.log(`Perform search`);
  };

  useEffect(() => {
    if (!search?.q) return;
    handleSearch();
  }, [search]);

  return (
    <Box
      backgroundImage={`/assets/images/map-bg.svg`}
      backgroundRepeat={`no-repeat`}
      backgroundSize={`cover`}
      minHeight={`90vh`}
    >
      {true && (
        <Stack direction={[`column`, `row`]} px={[`1rem`, `3rem`, `6rem`]}>
          <Box py={`5rem`} alignItems={`start`} width={[`100%`, `80%`]}>
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
                <SearchWithFilter onChange={handleSearchInput} />
                <Text
                  fontSize={`sm`}
                  fontWeight={`semibold`}
                  color={`primary.500`}
                >
                  Access Election Violence Data of Nigeria
                </Text>

                <Button
                  bgColor={`primary.500`}
                  color={`white`}
                  width={`80%`}
                  my="16px"
                  _hover={{
                    bgColor: `surface`,
                    color: `primary.500`,
                    border: `1px`,
                  }}
                  disabled={!report}
                  isLoading={isLoading}
                >
                  Access Data
                </Button>
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
          </Box>
          <Box width={`full`} px={[`1rem`, `1rem`]} py={`5rem`}>
            <VTMap data={report} />
          </Box>
        </Stack>
      )}

      {false && (
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
                <Link href={`reports`}>View Reports{` `}</Link>
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
                onClick={sendToEmail}
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
                  onClick={downloadReport}
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
