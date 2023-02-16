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
import VTMap from '@/features/view-reports/VTMap';
import { SearchResults } from '@/types';
import {
  Box,
  Button,
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
import ReactPDF, {
  Document,
  Page,
  PDFDownloadLink,
  PDFViewer,
  View,
  Text as PDFText,
  Image as PDFImage,
} from '@react-pdf/renderer';
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

const ReportPDF = () => (
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

      <View style={{ margin: 10, padding: 10, flexGrow: 1 }}></View>

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

  const downloadReport = () => {
    // setShowPDF(true);
    // setPageState(`download`);
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
      {/* Stage 1 */}
      {pageState == `idle` && !accessData && (
        <Stack direction={[`column`, `row`]} px={[`1rem`, `3rem`, `6rem`]}>
          <Box py={`5rem`} alignItems={`start`} width={[`100%`, `80%`]}>
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
                  onClick={() => setAccessData(true)}
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
          <Box width={`full`} px={[`1rem`, `1rem`]} py={`5rem`}>
            <VTMap data={report} />
          </Box>
        </Stack>
      )}

      {/* Stage 2 */}
      {accessData && (
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
            <Heading
              textTransform={`uppercase`}
              fontSize={`2xl`}
              fontWeight={`bold`}
              color={`primary.500`}
            >
              {report?.state_results.data[0].name} STATE ELECTION VIOLENCE DATA
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

          {/* 2 of 2 */}
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
              {/* 1 of 2 */}

              <Box width={`full`} px={[`1rem`, `1rem`]} py={`5rem`}>
                <VTMap data={report} />
              </Box>

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
                {report?.state_results.meta_data.types.count_by_reports.map(
                  (info, index) => (
                    <Flex
                      key={index}
                      direction={`column`}
                      width={`25%`}
                      alignItems={`center`}
                    >
                      <ReportIcon size={48} my={`12px`} />
                      <Text fontSize={`sm`} textTransform={`capitalize`}>
                        <Text
                          color="primary.500"
                          fontSize={`2xl`}
                          display={`inline`}
                        >
                          {info[Object.keys(info)[0]]}
                          {` `}
                        </Text>
                        {Object.keys(info)[0]}
                      </Text>
                    </Flex>
                  ),
                )}
              </Container>

              <Container maxWidth={`container.md`} py={`56px`}>
                {/* <Text>
                  <Text
                    display={`inline`}
                    color={`primary.500`}
                    fontWeight={`bold`}
                  >
                    Data Summary:
                  </Text>
                  {` `}
                  {report.summary}
                </Text> */}
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
                  <PDFDownloadLink
                    fileName="violence_reports.pdf"
                    document={<ReportPDF />}
                  >
                    {({ blob, url, loading, error }) =>
                      loading ? `Loading document...` : `Download Pdf`
                    }
                  </PDFDownloadLink>
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
