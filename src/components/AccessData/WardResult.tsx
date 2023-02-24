import { State, StateSearchData, Ward, WardSearchData } from '@/types';
import { Box, Flex, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { ReportIcon } from '../Icons';

interface WardResultProps {
  data: WardSearchData;
}

export default function WardResult({ data: ward }: WardResultProps) {
  const [selectedWard, setSelectedWard] = useState<Ward>();
  const [confirmedSelection, setConfirmedSelection] = useState<boolean>(false);

  const handleSelection = (ward: Ward) => {
    setConfirmedSelection(true);
    setSelectedWard(ward);
  };

  if (ward.data.length > 1 && !selectedWard && !confirmedSelection) {
    return (
      <Box width={`full`}>
        <Text color="black" fontSize={`md`} textAlign={`center`}>
          Do you mean: {` `}
          {/* Checking if ward is more than 1 */}
          {ward.data.map((wardData, index) => (
            <Text
              key={index}
              color={`primary.500`}
              fontSize={`md`}
              display={`inline`}
              textTransform={`capitalize`}
              cursor={`pointer`}
              onClick={() => handleSelection(wardData)}
            >
              {index + 1 == ward.data.length && (
                <Text textTransform={`lowercase`} display={`inline`}>
                  {` `}
                  or{` `}
                </Text>
              )}
              {wardData.name}
              {` `}
              {index + 1 == ward.data.length ? ` ` : `, `}
            </Text>
          ))}
        </Text>
      </Box>
    );
  }
  return (
    <Box>
      {/* Checking if state is more than 1 */}
      {ward.meta_data.types.count_by_reports.map((info, index) => (
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
