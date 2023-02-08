import ChakraReactSelect from '@/components/Inputs/Select';
import { AttachmentIcon, TriangleDownIcon } from '@chakra-ui/icons';
import {
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';

interface ReportViolenceForm {
  ng_state_id?: OptionValue;
  ng_local_government_id?: OptionValue;
  ng_polling_unit_id?: OptionValue;
  type_id?: OptionValue;
  title: string;
  description: string;
  file: string;
  hashtags: string;
}

type OptionValue = { value: string; label: string };

const initialValues: ReportViolenceForm = {
  title: ``,
  description: ``,
  file: ``,
  hashtags: ``,
};

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

      <Formik
        initialValues={initialValues}
        onSubmit={(values) => console.log(`submitted values`, values)}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          setFieldValue,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit} style={{ width: `100%` }}>
            <Container
              display={`flex`}
              flexDirection={`column`}
              alignItems={`center`}
              alignSelf={`center`}
              maxWidth={[`sm`, `md`]}
            >
              <FormControl
                my={`8px`}
                isInvalid={!!errors[`ng_state_id`] && touched[`ng_state_id`]}
              >
                <ChakraReactSelect
                  size={`lg`}
                  placeholder={`Select State`}
                  options={[
                    { value: `1`, label: `Chocolate` },
                    { value: `2`, label: `Strawberry` },
                    { value: `3`, label: `Vanilla` },
                  ]}
                  name="ng_state_id"
                  onChange={(selectedOption: any) =>
                    setFieldValue(`ng_state_id`, selectedOption)
                  }
                  onBlur={handleBlur}
                  value={values.ng_state_id}
                />
              </FormControl>

              <FormControl
                my={`8px`}
                isInvalid={
                  !!errors[`ng_local_government_id`] &&
                  touched[`ng_local_government_id`]
                }
              >
                <ChakraReactSelect
                  size={`lg`}
                  placeholder={`Please Select LGA`}
                  options={[
                    { value: `1`, label: `Chocolate` },
                    { value: `2`, label: `Strawberry` },
                    { value: `3`, label: `Vanilla` },
                  ]}
                  name="ng_local_government_id"
                  onChange={(selectedOption: any) =>
                    setFieldValue(`ng_local_government_id`, selectedOption)
                  }
                  onBlur={handleBlur}
                  value={values.ng_local_government_id}
                />
              </FormControl>

              <FormControl
                my={`8px`}
                isInvalid={
                  !!errors[`ng_polling_unit_id`] &&
                  touched[`ng_polling_unit_id`]
                }
              >
                <ChakraReactSelect
                  size={`lg`}
                  placeholder={`Select Polling Unit`}
                  options={[
                    { value: `1`, label: `Chocolate` },
                    { value: `2`, label: `Strawberry` },
                    { value: `3`, label: `Vanilla` },
                  ]}
                  name="ng_polling_unit_id"
                  onChange={(selectedOption: any) =>
                    setFieldValue(`ng_polling_unit_id`, selectedOption)
                  }
                  onBlur={handleBlur}
                  value={values.ng_polling_unit_id}
                />
              </FormControl>

              <FormControl
                my={`8px`}
                isInvalid={!!errors[`type_id`] && touched[`type_id`]}
              >
                <ChakraReactSelect
                  size={`lg`}
                  placeholder={`Select Violence Type`}
                  options={[
                    { value: `1`, label: `Chocolate` },
                    { value: `2`, label: `Strawberry` },
                    { value: `3`, label: `Vanilla` },
                  ]}
                  name="type_id"
                  onChange={(selectedOption: any) =>
                    setFieldValue(`type_id`, selectedOption)
                  }
                  onBlur={handleBlur}
                  value={values.type_id}
                />
              </FormControl>

              <FormControl
                my={`8px`}
                isInvalid={!!errors[`file`] && touched[`file`]}
              >
                <InputGroup>
                  <Input
                    type={`file`}
                    size={`lg`}
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
              </FormControl>

              <FormControl
                my={`8px`}
                isInvalid={!!errors[`description`] && touched[`description`]}
              >
                <Textarea
                  bgColor={`white`}
                  color={`secondary.700`}
                  fontSize={`sm`}
                  fontWeight={`semibold`}
                  my={`8px`}
                  placeholder={`Description of Incidence`}
                  name="description"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.description}
                />
              </FormControl>

              <FormControl
                my={`8px`}
                isInvalid={!!errors[`hashtags`] && touched[`hashtags`]}
              >
                <Input
                  type={`text`}
                  size={`lg`}
                  bgColor={`white`}
                  color={`secondary.700`}
                  fontSize={`sm`}
                  fontWeight={`semibold`}
                  placeholder={`Include Tags (eg #edostate #ballotboxsnatching)`}
                  name="hashtags"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.hashtags}
                />
              </FormControl>

              <Button
                type="submit"
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
          </form>
        )}
      </Formik>
    </VStack>
  );
}
