import { searchReports } from '@/app/services/violence-report';
import DataAggregator from '@/components/AccessData/DataAggregator';
import StateResult from '@/components/AccessData/StateResult';
import { AnimatedBox } from '@/components/Animated';
import {
  ChevronRightIcon,
  ReportIcon,
  SearchIconOutline,
} from '@/components/Icons';
import SearchWithFilter, {
  SearchInputData,
} from '@/components/Inputs/SearchWithFilter';
import VTMap from '@/features/view-reports/VTMap';
import { sampleResult, SearchResults } from '@/types';
import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import {
  Document,
  Image as PDFImage,
  Page,
  PDFDownloadLink,
  PDFViewer,
  Text as PDFText,
  View,
} from '@react-pdf/renderer';
import Head from 'next/head';
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

const ReportPDF = ({ data }: { data?: SearchResults }) => (
  <Document>
    <Page
      size={`A4`}
      style={{
        flexDirection: `column`,
        backgroundColor: `#F2F9F9`,
        width: `100%`,
      }}
    >
      <View
        style={{
          padding: 10,
          backgroundColor: `#228A78`,
        }}
      >
        <PDFText
          style={{
            fontSize: `24px`,
            fontWeight: `bold`,
            paddingVertical: `32px`,
            textAlign: `center`,
            color: `#ffffff`,
          }}
        >
          EDO STATE ELECTION VIOLENCE DATA
        </PDFText>
      </View>

      <View
        style={{
          margin: 10,
          padding: 10,
          flexGrow: 1,
          flexDirection: `row`,
          flexWrap: `wrap`,
          rowGap: 48,
          marginTop: 48,
        }}
      >
        {data?.state_results.meta_data.types.count_by_reports.map(
          (info, index) => (
            <View
              key={index}
              style={{
                width: `25%`,
                display: `flex`,
                flexDirection: `column`,
                alignItems: `center`,
              }}
            >
              {/* <ReportIcon size={48} my={`12px`} /> */}
              <PDFImage
                src="/assets/icons/Injured.svg"
                style={{ width: 36, height: 36 }}
              />
              <PDFText style={{ fontSize: 12, textTransform: `capitalize` }}>
                <PDFText
                  style={{
                    fontSize: 14,
                    textTransform: `capitalize`,
                    color: `#228A78`,
                  }}
                >
                  {info[Object.keys(info)[0]]}
                  {` `}
                </PDFText>
                {Object.keys(info)[0]}
              </PDFText>
            </View>
          ),
        )}
      </View>

      <View
        style={{
          padding: 10,
          backgroundColor: `#FFFFFF`,
          paddingVertical: `32px`,
          display: `flex`,
          flexDirection: `row`,
          justifyContent: `space-between`,
        }}
      >
        <PDFImage
          src="/assets/Logo/voilence-tracker.svg"
          style={{ width: `24px`, height: `24px` }}
        />
        <PDFText
          style={{
            fontSize: `12px`,
            fontWeight: `bold`,
            color: `#228A78`,
          }}
        >
          www.electionviolencetracker.ng
        </PDFText>
      </View>
    </Page>
  </Document>
);

export default function AccessData() {
  const [pageState, setPageState] = useState<ValidState>(`idle`);
  const [report, setReport] = useState<SearchResults>();
  const [search, setSearch] = useState<SearchInputData>();
  const [makeSearch, setMakeSearch] = useState<boolean>(false);
  const toast = useToast();
  const [accessData, setAccessData] = useState<boolean>(false);
  const [showPDF, setShowPDF] = useState<boolean>(false);

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

  useEffect(() => {
    if (report) {
      if (!report.state_results.data[0]) {
        setReport(undefined);
        toast({
          // title: `Hey! `,
          description: `No state, lga, or polling unit matches your search.`,
          status: `error`,
          duration: 9000,
          isClosable: true,
        });
      }
    }
  }, [report]);

  return (
    <Box
      backgroundImage={`/assets/images/map-bg.svg`}
      backgroundRepeat={`no-repeat`}
      backgroundSize={`cover`}
      minHeight={`90vh`}
    >
      {/* Stage 1 */}
      {pageState == `idle` && !accessData && (
        <Stack direction={[`column`, `row`]} px={[`1rem`, `3rem`, `6rem`]}>
          <Box py={[`2rem`, `5rem`]} alignItems={`start`} width={[`100%`]}>
            <Heading fontSize={`2xl`} fontWeight={`bold`} color={`primary.500`}>
              Access Data
            </Heading>
            <Text fontSize={`sm`} fontWeight={`semibold`} color={`black`}>
              Download and Export Violence Data
            </Text>

            {!isLoading && (
              <Container
                maxWidth={[`sm`, `lg`]}
                height={`full`}
                display={`flex`}
                alignSelf={`center`}
                flexDirection={`column`}
                justifyContent={`center`}
                alignItems={`center`}
                py={[`10`, `4`]}
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
                  onClick={() => {
                    setAccessData(true);
                  }}
                >
                  Access Data
                </Button>
              </Container>
            )}

            {/* Search Loader */}
            {isLoading && (
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
        </Stack>
      )}

      {report && <DataAggregator report={report} showReport={accessData} />}

      {report && (
        <Center>
          <Button
            as="a"
            onClick={() => {
              setPageState(`idle`);
              setAccessData(false);
              setReport(undefined);
            }}
          >
            Go Back
          </Button>
        </Center>
      )}

      <Modal onClose={() => setShowPDF(false)} size={`full`} isOpen={showPDF}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody width={`full`}>
            <PDFViewer>
              <ReportPDF />
            </PDFViewer>
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => setShowPDF(false)}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
