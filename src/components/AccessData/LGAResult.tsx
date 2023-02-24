import { LGASearchData, State } from '@/types';
import { Box, Flex, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { ReportIcon } from '../Icons';

interface LGAResultProps {
  data: LGASearchData;
}

export default function LGAResult({ data: lga }: LGAResultProps) {
  const [selectedLGA, setSelectedLGA] = useState<State>();
  const [confirmedSelection, setConfirmedSelection] = useState<boolean>(false);

  const handleSelection = (state: State) => {
    setConfirmedSelection(true);
    setSelectedLGA(state);
  };

  if (lga.data.length > 1 && !selectedLGA && !confirmedSelection) {
    return (
      <Box width={`full`}>
        <Text color="black" fontSize={`md`} textAlign={`center`}>
          Do you mean: {` `}
          {/* Checking if LGA is more than 1 */}
          {lga.data.map((lgaData, index) => (
            <Text
              key={index}
              color={`primary.500`}
              fontSize={`md`}
              display={`inline`}
              textTransform={`capitalize`}
              cursor={`pointer`}
              onClick={() => handleSelection(lgaData)}
            >
              {index + 1 == lga.data.length && (
                <Text textTransform={`lowercase`} display={`inline`}>
                  {` `}
                  or{` `}
                </Text>
              )}
              {lgaData.name}
              {` `}
              {index + 1 == lga.data.length ? `LGA ` : `LGA, `}
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
            {lga.meta_data.local_governments.count_unique}
          </Text>
          {` `}
          LGA
        </Text>
      </Flex>

      {lga.meta_data.types.count_by_reports.map((info, index) => (
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
