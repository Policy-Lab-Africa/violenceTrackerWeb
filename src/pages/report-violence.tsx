import {
  Button,
  Container,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import { CheckIcon, TriangleDownIcon, AttachmentIcon } from '@chakra-ui/icons';

export default function ReportViolence() {
  return (
    <VStack
      px={[`1rem`, `6rem`]}
      py={`5rem`}
      background={`black`}
      alignItems={`start`}
      backgroundImage={`/assets/images/report-violence.png`}
      backgroundRepeat="no-repeat"
      backgroundSize={`cover`}
    >
      <Heading fontSize={`2xl`} fontWeight={`bold`} color={`primary.500`}>
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
        maxWidth={[`sm`, `md`]}
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

        <InputGroup my={`8px`}>
          <Input
            type={`text`}
            bgColor={`white`}
            color={`secondary.700`}
            fontSize={`sm`}
            fontWeight={`semibold`}
            placeholder={`Upload Evidence`}
          />
          <InputRightElement>
            <AttachmentIcon color="green.500" />
          </InputRightElement>
        </InputGroup>

        <Textarea
          bgColor={`white`}
          color={`secondary.700`}
          fontSize={`sm`}
          fontWeight={`semibold`}
          my={`8px`}
          placeholder={`Description of Incidence`}
        />

        <Button
          bgColor={`primary.500`}
          color={`white`}
          width={`80%`}
          _hover={{
            bgColor: `surface`,
            color: `primary.500`,
            border: `1px`,
          }}
        >
          Submit Report
        </Button>
      </Container>
    </VStack>
  );
}
