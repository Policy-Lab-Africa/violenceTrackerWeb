import { AnimatedHeading, AnimatedText } from '@/components/Animated';
import { NextChakraImage } from '@/components/Images/NextChakraImage';
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Heading,
  Link,
  Stack,
  VStack,
} from '@chakra-ui/react';
import Image from 'next/image';
import { MdDownload } from 'react-icons/md';

export default function About() {
  return (
    <VStack width={`full`} marginY={`20`}>
      <Stack
        direction={[`column`, `row`]}
        pt={[`12px`, `12px`]}
        px={[`8px`, `5rem`]}
      >
        <Container
          maxWidth={[`container.md`]}
          display={`flex`}
          flexDirection={`column`}
          justifyContent={`center`}
          py={[`16px`, `0`]}
        >
          <AnimatedHeading
            initial={{ opacity: 0, translateY: 50 }}
            whileInView={{ translateY: 0, opacity: 1 }}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore no problem in operation, although type error appears.
            transition={{ duration: 0.8 }}
            fontSize={`2xl`}
            fontWeight={`semibold`}
            color={`primary.500`}
          >
            What is the Election Violence Tracker (EVT)
          </AnimatedHeading>
          <AnimatedText
            initial={{ opacity: 0, translateY: 80 }}
            whileInView={{ translateY: 0, opacity: 1 }}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore no problem in operation, although type error appears.
            transition={{ duration: 0.6 }}
            fontSize={`md`}
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

        <Container display={`flex`} justifyContent={`center`}>
          <Image
            src={`/assets/about/what-is-evt.png`}
            alt="What is the Election Violence Tracker (EVT)"
            width={`400`}
            height={`400`}
            style={{ objectFit: `contain` }}
          />
        </Container>
      </Stack>

      <Stack
        direction={[`column`, `row-reverse`]}
        pt={[`12px`, `12px`]}
        px={[`8px`, `5rem`]}
      >
        <Container
          maxWidth={[`container.md`]}
          display={`flex`}
          flexDirection={`column`}
          justifyContent={`center`}
          py={[`16px`, `0`]}
        >
          <AnimatedHeading
            initial={{ opacity: 0, translateY: 50 }}
            whileInView={{ translateY: 0, opacity: 1 }}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore no problem in operation, although type error appears.
            transition={{ duration: 0.8 }}
            fontSize={`2xl`}
            fontWeight={`semibold`}
            color={`primary.500`}
          >
            How does it work?
          </AnimatedHeading>
          <AnimatedText
            initial={{ opacity: 0, translateY: 80 }}
            whileInView={{ translateY: 0, opacity: 1 }}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore no problem in operation, although type error appears.
            transition={{ duration: 0.6 }}
            fontSize={`md`}
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
          <Box>
            <Heading
              as={`h3`}
              fontSize={`md`}
              mt={`4`}
              color={`blackAlpha.600`}
            >
              Download User Manual
            </Heading>
            <ButtonGroup>
              <Button
                mt={`12px`}
                bgColor={`primary.500`}
                borderColor={`primary.500`}
                borderWidth="2px"
                color={`surface`}
                _hover={{
                  borderColor: `primary.500`,
                  bgColor: `surface`,
                  color: `primary.500`,
                }}
                size={`md`}
                transition=".5s"
                leftIcon={<MdDownload />}
                onClick={() => {
                  window.open(
                    `https://policylabafrica.org/wp-content/uploads/2023/03/EVT_-User_Guide.pdf`,
                  );
                }}
              >
                English
              </Button>
              <Button
                mt={`12px`}
                bgColor={`primary.500`}
                borderColor={`primary.500`}
                borderWidth="2px"
                color={`surface`}
                _hover={{
                  borderColor: `primary.500`,
                  bgColor: `surface`,
                  color: `primary.500`,
                }}
                size={`md`}
                transition=".5s"
                leftIcon={<MdDownload />}
                onClick={() => {
                  window.open(
                    `https://prod-api.violencetrack.ng/artifacts/EVT_%20User%20Manual%20Pidgin.pdf`,
                  );
                }}
              >
                Pidgin
              </Button>
              <Button
                mt={`12px`}
                bgColor={`primary.500`}
                borderColor={`primary.500`}
                borderWidth="2px"
                color={`surface`}
                _hover={{
                  borderColor: `primary.500`,
                  bgColor: `surface`,
                  color: `primary.500`,
                }}
                size={`md`}
                transition=".5s"
                leftIcon={<MdDownload />}
                onClick={() => {
                  window.open(
                    `https://prod-api.violencetrack.ng/artifacts/EVT_%20User%20Manual%20Hausa.pdf`,
                  );
                }}
              >
                Hausa
              </Button>
            </ButtonGroup>
          </Box>
        </Container>
        <Container display={`flex`} justifyContent={`center`}>
          <NextChakraImage
            src={`/assets/about/how-it-works.png`}
            alt="How does it work?"
            width={`400`}
            height={`400`}
            objectFit={`contain`}
          />
        </Container>
      </Stack>

      <Stack
        direction={[`column`, `row`]}
        pt={[`12px`, `12px`]}
        px={[`8px`, `5rem`]}
      >
        <Container
          maxWidth={[`container.md`]}
          display={`flex`}
          flexDirection={`column`}
          justifyContent={`center`}
          py={[`16px`, `0`]}
        >
          <AnimatedHeading
            initial={{ opacity: 0, translateY: 50 }}
            whileInView={{ translateY: 0, opacity: 1 }}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore no problem in operation, although type error appears.
            transition={{ duration: 0.8 }}
            fontSize={`2xl`}
            fontWeight={`semibold`}
            color={`primary.500`}
          >
            About us: www.policylabAfrica.org
          </AnimatedHeading>
          <AnimatedText
            initial={{ opacity: 0, translateY: 80 }}
            whileInView={{ translateY: 0, opacity: 1 }}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore no problem in operation, although type error appears.
            transition={{ duration: 0.6 }}
            fontSize={`md`}
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
        <Container display={`flex`} justifyContent={`center`}>
          <NextChakraImage
            src={`/assets/about/policy-labs.png`}
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
