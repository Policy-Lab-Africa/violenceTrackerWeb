import { PollingUnit, PUSearchData, State, StateSearchData } from '@/types';
import { Box, Flex, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { ReportIcon } from '../Icons';

interface WardResultProps {
  data: PUSearchData;
}

export default function PUResult({ data: pu }: WardResultProps) {
  const [selectedPU, setSelectedPU] = useState<PollingUnit>();
  const [confirmedSelection, setConfirmedSelection] = useState<boolean>(false);

  const handleSelection = (pu: PollingUnit) => {
    setConfirmedSelection(true);
    setSelectedPU(pu);
  };

  if (pu.data.length > 1 && !selectedPU && !confirmedSelection) {
    return (
      <Box width={`full`}>
        <Text color="black" fontSize={`md`} textAlign={`center`}>
          Do you mean: {` `}
          {/* Checking if pu is more than 1 */}
          {pu.data.map((puData, index) => (
            <Text
              key={index}
              color={`primary.500`}
              fontSize={`md`}
              display={`inline`}
              textTransform={`capitalize`}
              cursor={`pointer`}
              onClick={() => handleSelection(puData)}
            >
              {index + 1 == pu.data.length && (
                <Text textTransform={`lowercase`} display={`inline`}>
                  {` `}
                  or{` `}
                </Text>
              )}
              {puData.name}
              {` `}
              {index + 1 == pu.data.length ? `Unit ` : `Unit, `}
            </Text>
          ))}
        </Text>
      </Box>
    );
  }
  return (
    <Box>
      {/* Checking if state is more than 1 */}
      {pu.meta_data.types.count_by_reports.map((info, index) => (
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
