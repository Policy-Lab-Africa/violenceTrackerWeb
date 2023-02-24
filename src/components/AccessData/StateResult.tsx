import { State, StateSearchData } from '@/types';
import { Box, Flex, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { ReportIcon } from '../Icons';

interface StateResultProps {
  data: StateSearchData;
}

export default function StateResult({ data: state }: StateResultProps) {
  const [selectedState, setSelectedState] = useState<State>();
  const [confirmedSelection, setConfirmedSelection] = useState<boolean>(false);

  const handleSelection = (state: State) => {
    setConfirmedSelection(true);
    setSelectedState(state);
  };

  if (state.data.length > 1 && !selectedState && !confirmedSelection) {
    return (
      <Box width={`full`}>
        <Text color="black" fontSize={`md`} textAlign={`center`}>
          Do you mean: {` `}
          {/* Checking if state is more than 1 */}
          {state.data.map((stateData, index) => (
            <Text
              key={index}
              color={`primary.500`}
              fontSize={`md`}
              display={`inline`}
              textTransform={`capitalize`}
              cursor={`pointer`}
              onClick={() => handleSelection(stateData)}
            >
              {index + 1 == state.data.length && (
                <Text textTransform={`lowercase`} display={`inline`}>
                  {` `}
                  or{` `}
                </Text>
              )}
              {stateData.name}
              {` `}
              {index + 1 == state.data.length ? `State ` : `State, `}
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
            {state.meta_data.local_governments.count_unique}
          </Text>
          {` `}
          LGA
        </Text>
      </Flex>
      {state.meta_data.types.count_by_reports.map((info, index) => (
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
