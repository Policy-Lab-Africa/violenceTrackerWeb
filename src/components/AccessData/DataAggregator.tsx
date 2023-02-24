import VTMap from '@/features/view-reports/VTMap';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { ChevronRightIcon } from '../Icons';
import StateResult from './StateResult';
import {
  Document,
  Image as PDFImage,
  Page,
  PDFDownloadLink,
  PDFViewer,
  Text as PDFText,
  View,
} from '@react-pdf/renderer';
import { LGA, PollingUnit, SearchResults, State, Ward } from '@/types';
import LGAResult from './LGAResult';
import WardResult from './WardResult';
import PUResult from './PUResult';
import DataResult from './DataResult';

interface ReportPDFProps {
  data: SearchResults;
}

interface DataAggregatorProps {
  report: SearchResults;
  showReport: boolean;
}

const dataKeys = [
  `state_results`,
  `local_government_results`,
  `ward_results`,
  `polling_unit_results`,
] as const;
export type DataLevel = typeof dataKeys[number];
const POSTFIX = {
  state_results: `States`,
  local_government_results: `LGA`,
  ward_results: `Ward`,
  polling_unit_results: `Polling Unit`,
};

const ReportPDF = ({ data }: ReportPDFProps) => (
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

export default function DataAggregator({
  report,
  showReport,
}: DataAggregatorProps) {
  const [resultKey, setResultKey] = useState<DataLevel>(`state_results`);
  const [othersHaveData, setOthersHaveData] = useState<boolean>(false);
  const [confirmedSelection, setConfirmedSelection] = useState<boolean>(false);
  const [regionShowing, setRegionShowing] = useState<
    State | LGA | Ward | PollingUnit
  >();

  // Change the key if data is elsewhere but not in "state_results"
  useEffect(() => {
    if (!report.state_results.data.length) {
      if (report.local_government_results.data.length) {
        setResultKey(`local_government_results`);
      } else if (report.ward_results.data.length) {
        setResultKey(`ward_results`);
      } else if (report.polling_unit_results.data.length) {
        setResultKey(`polling_unit_results`);
      }
    }
  }, [report]);

  // Checks if other result objects have data
  useEffect(() => {
    for (let index = 0; index < dataKeys.length; index++) {
      if (dataKeys[index] == resultKey) continue;
      if (report[dataKeys[index]].data.length > 0) {
        setOthersHaveData(true);
        continue;
      }
    }
  }, [report, resultKey]);

  return (
    <VStack
      px={[`1rem`, `6rem`]}
      py={`5rem`}
      alignItems={`center`}
      width={`full`}
    >
      {/* Heading */}
      <Flex direction={`row`} justifyContent={`space-between`} width={`full`}>
        <Heading
          textTransform={`uppercase`}
          fontSize={`2xl`}
          fontWeight={`bold`}
          color={`primary.500`}
        >
          {regionShowing?.name} {POSTFIX[resultKey]} ELECTION VIOLENCE DATA
        </Heading>

        <Flex direction={`row`} alignItems={`center`}>
          <Text fontSize={`md`} fontWeight={`semibold`} color={`primary.500`}>
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
      {false && (
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
      )}
      {` `}
      {/* 1 of 2 */}
      {showReport && (
        <VStack width={`full`}>
          <Box width={`full`} px={[`1rem`, `1rem`]} py={`5rem`}>
            <VTMap data={report} />
          </Box>

          {othersHaveData && !confirmedSelection && (
            <Box width={`full`}>
              <Text color="black" fontSize={`md`} textAlign={`center`}>
                Show me data for: {` `}
                {/* Checking if state is more than 1 */}
                {dataKeys.map((key, index) => (
                  <Text
                    key={index}
                    color={`primary.500`}
                    fontSize={`md`}
                    fontWeight={`bold`}
                    textTransform={`capitalize`}
                    cursor={`pointer`}
                    onClick={() => {
                      setConfirmedSelection(true);
                      setResultKey(key);
                    }}
                  >
                    {key !== resultKey &&
                      report[key].data.length > 0 &&
                      `${key.replace(`_results`, ``).replace(`_`, ` `)}s `}
                  </Text>
                ))}
              </Text>
            </Box>
          )}

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
            {report && (
              <DataResult
                data={report}
                region={resultKey}
                onChange={setRegionShowing}
              />
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
                document={<ReportPDF data={report} />}
              >
                {({ loading }) =>
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
  );
}
