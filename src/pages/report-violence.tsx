import {
  Button,
  Center,
  Container,
  Heading,
  Input,
  Select,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import { TriangleDownIcon } from '@chakra-ui/icons';

export default function ReportViolence() {
  return (
    <VStack px={`6rem`} py={`5rem`} background={`black`} alignItems={`start`}>
      <Heading fontSize={`xl`} fontWeight={`bold`} color={`primary.500`}>
        Report Violence
      </Heading>
      <Text fontSize={`sm`} fontWeight={`semibold`} color={`white`}>
        No Registration or Personal Data is Required
      </Text>

      <Container
        display={`flex`}
        flexDirection={`column`}
        alignItems={`center`}
        alignSelf={`center`}
        width={`md`}
      >
        <Select
          icon={<TriangleDownIcon color={`primary.500`} />}
          bgColor={`white`}
          color={`secondary.700`}
          fontSize={`sm`}
          fontWeight={`semibold`}
          my={`8px`}
          placeholder={`Select State`}
        >
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </Select>

        <Select
          icon={<TriangleDownIcon color={`primary.500`} />}
          bgColor={`white`}
          color={`secondary.700`}
          fontSize={`sm`}
          fontWeight={`semibold`}
          my={`8px`}
          placeholder={`Select LGA  `}
        >
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </Select>

        <Select
          icon={<TriangleDownIcon color={`primary.500`} />}
          bgColor={`white`}
          color={`secondary.700`}
          fontSize={`sm`}
          fontWeight={`semibold`}
          my={`8px`}
          placeholder={`Select Polling Unit`}
        >
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </Select>

        <Select
          icon={<TriangleDownIcon color={`primary.500`} />}
          bgColor={`white`}
          color={`secondary.700`}
          fontSize={`sm`}
          fontWeight={`semibold`}
          my={`8px`}
          placeholder={`Select Violence Type`}
        >
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </Select>

        <Input
          type={`text`}
          bgColor={`white`}
          color={`secondary.700`}
          fontSize={`sm`}
          fontWeight={`semibold`}
          my={`8px`}
          placeholder={`Upload Evidence`}
        />

        <Textarea
          bgColor={`white`}
          color={`secondary.700`}
          fontSize={`sm`}
          fontWeight={`semibold`}
          my={`8px`}
          placeholder={`Description of Incidence`}
        />

        <Button bgColor={`primary.500`} color={`white`} width={`80%`}>
          Submit Report
        </Button>
      </Container>
    </VStack>
  );
}
