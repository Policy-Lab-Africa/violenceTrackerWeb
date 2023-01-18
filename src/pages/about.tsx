import { NextChakraImage } from '@/components/Images/NextChakraImage';
import { Container, Heading, Stack, Text, VStack } from '@chakra-ui/react';

export default function About() {
  return (
    <VStack>
      <Stack direction={[`column`, `row`]} pt={[`12px`, `12px`]}>
        <Container
          width={`container.xl`}
          display={`flex`}
          flexDirection={`column`}
          justifyContent={`center`}
          py={[`16px`, `0`]}
        >
          <Heading
            fontSize={`2xl`}
            fontWeight={`semibold`}
            color={`primary.500`}
          >
            What is the Election Violence Tracker (EVT)
          </Heading>
          <Text fontSize={`sm`} fontWeight={`medium`}>
            The Election Violence Tracker is an open-source reporting tool that
            enables citizens to document and report violent incidents during
            Nigeria’s election.The idea is to empower people to independently
            create, confirm, and track violent incidents during the election
            season and more importantly, a data resource for journalists,
            election observers, activists, and civil society. The election
            violence tracker is an open-source project that will help in
            tracking violence at the elections in almost real-time and
            publishing reports to different platforms like Twitter and API
            endpoints.The Election Violence Tracker was developed by PolicyLab
            Africa and supported by mySociety subgrant from the National
            Endowment for Democracy (NED).
          </Text>
        </Container>
        <Container>
          <NextChakraImage
            src={`/assets/images/what-is-evt.png`}
            alt="What is the Election Violence Tracker (EVT)"
            width={`400`}
            height={`400`}
            objectFit={`contain`}
          />
        </Container>
      </Stack>
    </VStack>
  );
}
