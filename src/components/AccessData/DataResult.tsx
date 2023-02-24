import {
  LGA,
  PollingUnit,
  SearchResults,
  State,
  StateSearchData,
  Ward,
} from '@/types';
import { Box, Flex, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { ReportIcon } from '../Icons';
import { DataLevel } from './DataAggregator';

interface DataResultProps {
  data: SearchResults;
  region: DataLevel;
  onChange?: (data: State | LGA | Ward | PollingUnit) => void;
}

const POSTFIX = {
  state_results: `States`,
  local_government_results: `LGA`,
  ward_results: `Ward`,
  polling_unit_results: `Polling Unit`,
};

export default function DataResult({
  data,
  region,
  onChange,
}: DataResultProps) {
  const [confirmedSelection, setConfirmedSelection] = useState<boolean>(false);

  const handleSelection = (data: State | LGA | Ward | PollingUnit) => {
    setConfirmedSelection(true);
    if (onChange) onChange(data);
  };

  useEffect(() => {
    if (data[region].data.length == 1 && onChange) {
      onChange(data[region].data[0]);
    }
  }, []);

  if (data[region].data.length > 1 && !confirmedSelection) {
    return (
      <Box width={`full`}>
        <Text color="black" fontSize={`md`} textAlign={`center`}>
          Do you mean: {` `}
          {/* Checking if state is more than 1 */}
          {data[region].data.map((preferredData, index) => (
            <Text
              key={index}
              color={`primary.500`}
              fontSize={`md`}
              display={`inline`}
              textTransform={`capitalize`}
              cursor={`pointer`}
              onClick={() => handleSelection(preferredData)}
            >
              {index + 1 == data[region].data.length && (
                <Text textTransform={`lowercase`} display={`inline`}>
                  {` `}
                  or{` `}
                </Text>
              )}
              {preferredData.name}
              {` `}
              {index + 1 == data[region].data.length
                ? `${POSTFIX[region]} `
                : `${POSTFIX[region]}, `}
            </Text>
          ))}
        </Text>
      </Box>
    );
  }
  return (
    <Box>
      <Flex direction={`column`} width={`25%`} alignItems={`center`}>
        <ReportIcon size={48} my={`12px`} />
        <Text fontSize={`sm`} textTransform={`capitalize`}>
          Violence in{` `}
          <Text color="primary.500" fontSize={`2xl`} display={`inline`}>
            {data[region].meta_data.local_governments.count_unique}
          </Text>
          {` `}
          LGA
        </Text>
      </Flex>
      {data[region].meta_data.types.count_by_reports.map((info, index) => (
        <Flex
          key={index}
          direction={`column`}
          width={`25%`}
          alignItems={`center`}
        >
          <ReportIcon size={48} my={`12px`} />
          <Text fontSize={`sm`} textTransform={`capitalize`}>
            <Text color="primary.500" fontSize={`2xl`} display={`inline`}>
              {info[Object.keys(info)[0]]}
              {` `}
            </Text>
            {Object.keys(info)[0]}
          </Text>
        </Flex>
      ))}
    </Box>
  );
}
