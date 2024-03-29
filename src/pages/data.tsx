import { AnimatedHeading, AnimatedText } from '@/components/Animated';
import { NextChakraImage } from '@/components/Images/NextChakraImage';
import { Box, Container, Stack, VStack } from '@chakra-ui/react';

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
          <AnimatedHeading
            initial={{ opacity: 0, translateY: 50 }}
            whileInView={{ translateY: 0, opacity: 1 }}
            // transition={{ duration: 0.5 }}
            fontSize={`2xl`}
            fontWeight={`semibold`}
            color={`primary.500`}
          >
            What is the Election Violence Tracker (EVT)
          </AnimatedHeading>
          <AnimatedText
            initial={{ opacity: 0, translateY: 100 }}
            whileInView={{ translateY: 0, opacity: 1 }}
            // transition={{ duration: 0.5 }}
            fontSize={`sm`}
            fontWeight={`medium`}
            color={`secondary.500`}
            lineHeight={`1.7`}
          >
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
          </AnimatedText>
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

      <Stack
        direction={[`column-reverse`, `row-reverse`]}
        pt={[`12px`, `12px`]}
      >
        <Container
          width={`container.xl`}
          display={`flex`}
          flexDirection={`column`}
          justifyContent={`center`}
          py={[`16px`, `0`]}
        >
          <AnimatedHeading
            initial={{ opacity: 0, translateY: 50 }}
            whileInView={{ translateY: 0, opacity: 1 }}
            // transition={{ duration: 0.5 }}
            fontSize={`2xl`}
            fontWeight={`semibold`}
            color={`primary.500`}
          >
            How does it work?
          </AnimatedHeading>
          <AnimatedText
            initial={{ opacity: 0, translateY: 50 }}
            whileInView={{ translateY: 0, opacity: 1 }}
            // transition={{ duration: 0.5 }}
            fontSize={`sm`}
            fontWeight={`medium`}
            color={`secondary.500`}
            lineHeight={`1.7`}
          >
            Using the Independent Electoral Commission of Nigeria’s (INEC)
            polling unit data and deploying OpenStreet Map to geolocate each
            polling unit address and enable user identification to verify the
            locations. Users can report incidents with Texts and Multimedia.
            Reports are visualized on a map using Leaflet and infographics. The
            data collected is open source and available for download and export.
          </AnimatedText>
        </Container>
        <Container>
          <NextChakraImage
            src={`/assets/images/how-it-works.png`}
            alt="How does it work?"
            width={`400`}
            height={`400`}
            objectFit={`contain`}
          />
        </Container>
      </Stack>

      <Stack direction={[`column`, `row`]} pt={[`12px`, `12px`]}>
        <Container
          width={`container.xl`}
          display={`flex`}
          flexDirection={`column`}
          justifyContent={`center`}
          py={[`16px`, `0`]}
        >
          <AnimatedHeading
            initial={{ opacity: 0, translateY: 50 }}
            whileInView={{ translateY: 0, opacity: 1 }}
            // transition={{ duration: 0.5 }}
            fontSize={`2xl`}
            fontWeight={`semibold`}
            color={`primary.500`}
          >
            About us: www.policylabAfrica.org
          </AnimatedHeading>
          <AnimatedText
            initial={{ opacity: 0, translateY: 50 }}
            whileInView={{ translateY: 0, opacity: 1 }}
            // transition={{ duration: 0.5 }}
            fontSize={`sm`}
            fontWeight={`medium`}
            color={`secondary.500`}
            lineHeight={`1.7`}
          >
            PolicyLab Africa is a policy and advocacy think tank working to
            build a sustainable digital future for all. Our focus is on
            supporting breakthrough advocacy and research at the nexus of policy
            and humanity and leading high-impact change projects in Africa. We
            have a sound field and knowledge of policy, digital rights, and
            human rights and a good grasp of policy issues including
            intersectional areas of ethics, gender, and civic space.
          </AnimatedText>
        </Container>
        <Container>
          <NextChakraImage
            src={`/assets/images/policy-labs.png`}
            alt="About us: www.policylabAfrica.org"
            width={`400`}
            height={`400`}
            objectFit={`contain`}
          />
        </Container>
      </Stack>

      <Box height={[`0`, `300px`]} />
    </VStack>
  );
}
