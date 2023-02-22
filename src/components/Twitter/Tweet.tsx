import { ViolenceReport } from '@/types';
import { Text, VStack } from '@chakra-ui/react';

const formatDate = (date: string) => {
  // const dateObj = new Date(date);

  // if (isToday(dateObj)) {
  //   return formatDistance(dateObj, new Date(), { addSuffix: true });
  // }

  // return format(dateObj, `d MMM, YYY`);
  return `5hrs ago`;
};

export default function Tweet({ report }: { report: ViolenceReport }) {
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
      <Text
        alignSelf={`flex-end`}
        fontWeight={`bold`}
        fontSize={`sm`}
        color={`secondary.700`}
      >
        {formatDate(report.created_at)}
      </Text>
      <Text>
        {report.description}
        {` `}
        {/* Hash tags */}
        {/* <Text>
          <Text display={`inline`} color={`primary.500`}>
            #Edostate{` `}
          </Text>
          <Text display={`inline`} color={`primary.500`}>
            #InewiLGA{` `}
          </Text>
          <Text display={`inline`} color={`primary.500`}>
            #Auchisouthpollingunit{` `}
          </Text>
        </Text> */}
      </Text>
      {/* <HStack gap={`2`}>
        <HStack>
          <LikeIcon color={`secondary.800`} boxSize={4} />
          <Text>31</Text>
        </HStack>

        <HStack>
          <DislikeIcon color={`accent`} boxSize={4} />
          <Text>3112</Text>
        </HStack>

        <HStack>
          <ShareIcon color={`#0183E5`} boxSize={4} />
          <Text>31126</Text>
        </HStack>
      </HStack> */}
    </VStack>
  );
}
