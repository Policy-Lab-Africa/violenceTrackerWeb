import {
  fetchLGAs,
  fetchPollingUnits,
  fetchStates,
  fetchWards,
} from '@/app/services/inec-meta-data';
import {
  fetchViolenceTypes,
  submitViolentReport,
} from '@/app/services/violence-report';
import ChakraReactSelect from '@/components/Inputs/Select';
import { AttachmentIcon } from '@chakra-ui/icons';
import {
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  Textarea,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { AxiosError } from 'axios';
import { Formik, FormikHelpers } from 'formik';
import { useRef, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import * as Yup from 'yup';
import ReCAPTCHA from 'react-google-recaptcha';
import { verify } from 'crypto';

const RECAPTCHA_SITEKEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITEKEY;
const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface ReportViolenceForm {
  ng_state_id: OptionValue | null;
  ng_local_government_id: OptionValue | null;
  ng_polling_unit_id: OptionValue | null;
  ng_ward_id: OptionValue | null;
  type_id: OptionValue | null;
  title: string;
  description: string;
  file: File | null;
  hashtags: string;
}

type OptionValue = { value: number; label: string };

const initialValues: ReportViolenceForm = {
  title: ``,
  description: ``,
  hashtags: ``,
  ng_state_id: null,
  ng_local_government_id: null,
  ng_polling_unit_id: null,
  ng_ward_id: null,
  type_id: null,
  file: null,
};

const ReportViolenceValidation = Yup.object().shape({
  description: Yup.string()
    .optional()
    .min(10, `Too Short!`)
    .max(1000, `Too Long!`)
    .label(`Description`),
  hashtags: Yup.string()
    .optional()
    .min(2, `Too Short!`)
    .max(60, `Too Long!`)
    .label(`Hash Tags`),
  ng_state_id: Yup.mixed().required(`Please select your state`).label(`State`),
  ng_local_government_id: Yup.mixed()
    .required(`Please select your LGA`)
    .label(`LGA`),
  ng_polling_unit_id: Yup.mixed()
    .required(`Please select your Polling Unit`)
    .label(`Polling Unit`),
  ng_ward_id: Yup.mixed().required(`Please select your Ward`).label(`Ward`),
  type_id: Yup.mixed()
    .required(`Select the type of violence`)
    .label(`Violence Type`),
  file: Yup.mixed().optional().label(`Evidence`),
});

export default function ReportViolence() {
  const [selectedState, setSelectedState] = useState<OptionValue>();
  const [selectedLGA, setSelectedLGA] = useState<OptionValue>();
  const [selectedWard, setSelectedWard] = useState<OptionValue>();
  // const [selectedPU, setSelectedPU] = useState<OptionValue>();
  const violenceEvidence = useRef<HTMLInputElement>(null);
  const toast = useToast();
  const [recaptchaTk, setRecaptchaTk] = useState<string>(``);
  const [recaptchaVerified, setRecaptchaVerified] = useState<boolean>(false);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const verifyToken = async (token: string) => {
    try {
      const response = await fetch(`${API_URL}/verify`, {
        method: `POST`,
        body: JSON.stringify({ recaptchaToken: token }),
        headers: {
          'Content-Type': `application/json`,
        },
      });

      if (response.ok) {
        const verObj = await response.json();
        if (verObj.data.success) {
          setRecaptchaVerified(true);
        }
      } else {
        // Else throw an error with the message returned
        // from the API
        const error = await response.json();
        throw new Error(error.message);
      }
    } catch (error: any) {
      console.log(error?.message || `Something went wrong`);
    }
  };

  const handleRecaptcha = (token: string | null): void => {
    if (!token) {
      toast({
        title: `Oops! `,
        description: `Invalid recaptcha`,
        status: `error`,
        duration: 9000,
        isClosable: true,
      });

      return;
    }
    setRecaptchaTk(token);
    verifyToken(token);
  };

  const { status: statesStatus, data: states } = useQuery(
    `states`,
    fetchStates,
  );

  const { status: violenceTypesStatus, data: violenceTypes } = useQuery(
    `violence-types`,
    fetchViolenceTypes,
  );

  const { status: lgasStatus, data: lgas } = useQuery(
    [`lgas`, selectedState],
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    () => fetchLGAs(selectedState!.value),
    {
      enabled: !!selectedState,
    },
  );

  const { status: wardsStatus, data: wards } = useQuery(
    [`wards`, selectedLGA],
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    () => fetchWards(selectedLGA!.value),
    {
      enabled: !!selectedLGA,
    },
  );

  const { status: pusStatus, data: pus } = useQuery(
    [`pus`, selectedWard],
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    () => fetchPollingUnits(selectedWard!.value),
    {
      enabled: !!selectedWard,
    },
  );

  const reportViolenceSubmiter = useMutation(submitViolentReport);

  const handleSubmission = (
    values: ReportViolenceForm,
    { resetForm }: FormikHelpers<ReportViolenceForm>,
  ) => {
    // Create the formdata for uploading online
    const formData = new FormData();

    if (
      !values.ng_state_id ||
      !values.ng_local_government_id ||
      !values.ng_polling_unit_id ||
      !values.type_id ||
      !values.file
    ) {
      return;
    }

    // Add the recaptcha token
    formData.append(`recaptchaToken`, recaptchaTk);

    formData.append(`ng_state_id`, values.ng_state_id.value.toString());
    formData.append(
      `ng_local_government_id`,
      values.ng_local_government_id.value.toString(),
    );
    formData.append(
      `ng_polling_unit_id`,
      values.ng_polling_unit_id.value.toString(),
    );
    formData.append(`type_id`, values.type_id.value.toString());
    // formData.append(`title`, values.title.value.toString());
    formData.append(`description`, values.description);
    formData.append(`hashtags`, values.hashtags);

    // Add the uploaded File
    formData.append(`file`, values.file);

    setRecaptchaVerified(false);
    reportViolenceSubmiter.mutate(formData, {
      onError: (error) => {
        const e = error as AxiosError<{ message: string }>;

        toast({
          title: `Oops! `,
          description: `${e.response?.data.message}`,
          status: `error`,
          duration: 9000,
          isClosable: true,
        });

        recaptchaRef.current?.reset();
      },
      onSuccess: () => {
        if (violenceEvidence.current) {
          violenceEvidence.current.value = ``;
        }
        resetForm();

        toast({
          title: `Great one 👍🏾! `,
          description: `Your report has been recorded successfully.`,
          status: `success`,
          duration: 9000,
          isClosable: true,
        });
        recaptchaRef.current?.reset();
      },
    });
  };

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
        onSubmit={handleSubmission}
        validationSchema={ReportViolenceValidation}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          setFieldValue,
          handleBlur,
          handleSubmit,
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
                  options={states?.map((state) => ({
                    value: state.data_id,
                    label: state.name,
                  }))}
                  onChange={(selectedOption: any) => {
                    setSelectedState(selectedOption);
                    setFieldValue(`ng_state_id`, selectedOption);
                  }}
                  isLoading={statesStatus == `loading`}
                  name="ng_state_id"
                  onBlur={handleBlur}
                  value={values.ng_state_id}
                />
                <FormErrorMessage>{errors.ng_state_id}</FormErrorMessage>
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
                  options={lgas?.map((lga) => ({
                    value: lga.data_id,
                    label: lga.name,
                  }))}
                  onChange={(selectedOption: any) => {
                    setSelectedLGA(selectedOption);
                    setFieldValue(`ng_local_government_id`, selectedOption);
                  }}
                  isLoading={lgasStatus == `loading`}
                  name="ng_local_government_id"
                  onBlur={handleBlur}
                  value={values.ng_local_government_id}
                />
                <FormErrorMessage>
                  {errors.ng_local_government_id}
                </FormErrorMessage>
              </FormControl>

              <FormControl
                my={`8px`}
                isInvalid={!!errors[`ng_ward_id`] && touched[`ng_ward_id`]}
              >
                <ChakraReactSelect
                  size={`lg`}
                  placeholder={`Select Ward`}
                  options={wards?.map((ward) => ({
                    value: ward.data_id,
                    label: ward.name,
                  }))}
                  onChange={(selectedOption: any) => {
                    setSelectedWard(selectedOption);
                    setFieldValue(`ng_ward_id`, selectedOption);
                  }}
                  isLoading={wardsStatus == `loading`}
                  onBlur={handleBlur}
                  value={values.ng_ward_id}
                />
                <FormErrorMessage>{errors.ng_ward_id}</FormErrorMessage>
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
                  options={pus?.map((lga) => ({
                    value: lga.data_id,
                    label: lga.name,
                  }))}
                  onChange={(selectedOption: any) => {
                    setFieldValue(`ng_polling_unit_id`, selectedOption);
                  }}
                  isLoading={pusStatus == `loading`}
                  name="ng_polling_unit_id"
                  onBlur={handleBlur}
                  value={values.ng_polling_unit_id}
                />
                <FormErrorMessage>{errors.ng_polling_unit_id}</FormErrorMessage>
              </FormControl>

              <FormControl
                my={`8px`}
                isInvalid={!!errors[`type_id`] && touched[`type_id`]}
              >
                <ChakraReactSelect
                  size={`lg`}
                  placeholder={`Select Violence Type`}
                  options={violenceTypes?.map((type) => ({
                    value: type.id,
                    label: type.name,
                  }))}
                  isLoading={violenceTypesStatus == `loading`}
                  name="type_id"
                  onChange={(selectedOption: any) =>
                    setFieldValue(`type_id`, selectedOption)
                  }
                  onBlur={handleBlur}
                  value={values.type_id}
                />
                <FormErrorMessage>{errors.type_id}</FormErrorMessage>
              </FormControl>

              <FormControl
                my={`8px`}
                isInvalid={!!errors[`file`] && touched[`file`]}
              >
                <InputGroup>
                  <Input
                    ref={violenceEvidence}
                    type={`file`}
                    accept={`jpeg,jpg, png, gif`}
                    size={`lg`}
                    bgColor={`white`}
                    color={`secondary.700`}
                    fontSize={`sm`}
                    fontWeight={`semibold`}
                    placeholder={`Upload Evidence`}
                    name="file"
                    onChange={(event) => {
                      setFieldValue(`file`, event.currentTarget.files?.item(0));
                    }}
                  />
                  <InputRightElement>
                    <AttachmentIcon color="green.500" />
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>{errors.file}</FormErrorMessage>
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
                <FormErrorMessage>{errors.description}</FormErrorMessage>
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
                <FormErrorMessage>{errors.hashtags}</FormErrorMessage>
              </FormControl>

              <ReCAPTCHA
                ref={recaptchaRef}
                // size="invisible"
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                sitekey={RECAPTCHA_SITEKEY!}
                onChange={handleRecaptcha}
              />

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
                isLoading={reportViolenceSubmiter.isLoading}
                isDisabled={
                  reportViolenceSubmiter.isLoading || !recaptchaVerified
                }
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
