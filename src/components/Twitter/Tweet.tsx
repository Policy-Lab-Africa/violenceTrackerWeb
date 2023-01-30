import { HStack, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { DislikeIcon, LikeIcon, ShareIcon } from '../Icons';

export default function Tweet() {
  return (
    <VStack
      bgColor={`surface`}
      borderRadius={`16px`}
      px={`32px`}
      py={`16px`}
      width={`full`}
      alignItems={`start`}
      mb={`32px`}
    >
      <Text alignSelf={`flex-end`} fontWeight={`bold`} color={`secondary.700`}>
        5hrs
      </Text>
      <Text>
        A Catholic priest was burnt to ashes today in Niger state. Isn’t this
        enough to reject the Muslim-Muslim ticket and vote for Peter Obi? I
        repeat, any Christian that vote for the Mu-Mu ticket is a fooooooool!!!
        {` `}
        <Text display={`inline`} color={`primary.500`}>
          #Edostate{` `}
        </Text>
        <Text display={`inline`} color={`primary.500`}>
          #InewiLGA{` `}
        </Text>
        <Text display={`inline`} color={`primary.500`}>
          #Auchisouthpollingunit{` `}
        </Text>
      </Text>
      <HStack gap={`2`}>
        {/* Like */}
        <HStack>
          <LikeIcon color={`secondary.800`} boxSize={4} />
          <Text>31</Text>
        </HStack>

        {/* Dislike */}
        <HStack>
          <DislikeIcon color={`accent`} boxSize={4} />
          <Text>3112</Text>
        </HStack>

        {/* Share */}
        <HStack>
          <ShareIcon color={`#0183E5`} boxSize={4} />
          <Text>31126</Text>
        </HStack>
      </HStack>
    </VStack>
  );
}
