import * as Yup from 'yup';
import { prepareDataForValidation } from 'formik';

// Extracted from src/pages/report-violence.tsx
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
  file: Yup.mixed<File>()
    .test(
      `Evidence`,
      `File size should not be more than 20MB.`,
      (file) => !file || (file as File).size <= 20_000_000,
    )
    .test(
      `Evidence`,
      `We only support the following file types: jpeg,png,jpg,mp4,mov,ogg,qt,m3u8,3gp,avi,wmv.`,
      (file) =>
        !file ||
        [
          `jpeg`,
          `png`,
          `jpg`,
          `mp4`,
          `mov`,
          `ogg`,
          `qt`,
          `m3u8`,
          `3gp`,
          `avi`,
          `wmv`,
        ].includes((file as File).name.split(`.`).pop()!),
    )
    .notRequired()
    .label(`Evidence`),
});

const makeFile = (name: string, sizeBytes: number): File => {
  const file = new File([``], name);
  Object.defineProperty(file, `size`, { value: sizeBytes });
  return file;
};

const validBase = {
  ng_state_id: { value: 1, label: `Lagos` },
  ng_local_government_id: { value: 1, label: `Ikeja` },
  ng_ward_id: { value: 1, label: `Ward A` },
  ng_polling_unit_id: { value: 1, label: `PU 001` },
  type_id: { value: 1, label: `Ballot Box Snatching` },
  title: ``,
  description: ``,
  hashtags: ``,
  file: null,
};

describe(`ReportViolenceValidation — required fields`, () => {
  it.each([
    [`ng_state_id`, `Please select your state`],
    [`ng_local_government_id`, `Please select your LGA`],
    [`ng_ward_id`, `Please select your Ward`],
    [`ng_polling_unit_id`, `Please select your Polling Unit`],
    [`type_id`, `Select the type of violence`],
  ])(`%s is required — error: "%s"`, async (field, expectedMessage) => {
    await expect(
      ReportViolenceValidation.validateAt(field, { [field]: null }),
    ).rejects.toThrow(expectedMessage);
  });

  it.each([
    [`ng_state_id`, `Please select your state`],
    [`ng_local_government_id`, `Please select your LGA`],
    [`ng_ward_id`, `Please select your Ward`],
    [`ng_polling_unit_id`, `Please select your Polling Unit`],
    [`type_id`, `Select the type of violence`],
  ])(`%s is required — rejects undefined`, async (field, expectedMessage) => {
    await expect(
      ReportViolenceValidation.validateAt(field, { [field]: undefined }),
    ).rejects.toThrow(expectedMessage);
  });

  it(`passes when all required fields are provided`, async () => {
    await expect(
      ReportViolenceValidation.validate(prepareDataForValidation(validBase), {
        abortEarly: false,
      }),
    ).resolves.toBeTruthy();
  });
});

describe(`ReportViolenceValidation — description`, () => {
  it(`passes when omitted (optional)`, async () => {
    const { description: _d, ...rest } = validBase;
    await expect(
      ReportViolenceValidation.validate(prepareDataForValidation(rest), {
        abortEarly: false,
      }),
    ).resolves.toBeTruthy();
  });

  it(`passes at exactly 10 characters (boundary)`, async () => {
    await expect(
      ReportViolenceValidation.validateAt(`description`, {
        description: `a`.repeat(10),
      }),
    ).resolves.toBeTruthy();
  });

  it(`fails at 9 characters with "Too Short!"`, async () => {
    await expect(
      ReportViolenceValidation.validateAt(`description`, {
        description: `a`.repeat(9),
      }),
    ).rejects.toThrow(`Too Short!`);
  });

  it(`passes at exactly 1000 characters (boundary)`, async () => {
    await expect(
      ReportViolenceValidation.validateAt(`description`, {
        description: `a`.repeat(1000),
      }),
    ).resolves.toBeTruthy();
  });

  it(`fails at 1001 characters with "Too Long!"`, async () => {
    await expect(
      ReportViolenceValidation.validateAt(`description`, {
        description: `a`.repeat(1001),
      }),
    ).rejects.toThrow(`Too Long!`);
  });

  // Yup 1.x runs min() on '' despite optional(); the form still accepts an
  // empty description because Formik converts '' to undefined before validating.
  it(`empty string fails min() when validated raw`, async () => {
    await expect(
      ReportViolenceValidation.validateAt(`description`, { description: `` }),
    ).rejects.toThrow(`Too Short!`);
  });

  it(`empty string passes after Formik's '' -> undefined conversion`, async () => {
    await expect(
      ReportViolenceValidation.validateAt(
        `description`,
        prepareDataForValidation({ description: `` }),
      ),
    ).resolves.toBeUndefined();
  });
});

describe(`ReportViolenceValidation — hashtags`, () => {
  it(`passes when omitted (optional)`, async () => {
    await expect(
      ReportViolenceValidation.validateAt(`hashtags`, { hashtags: undefined }),
    ).resolves.toBeUndefined();
  });

  it(`fails at 1 character with "Too Short!"`, async () => {
    await expect(
      ReportViolenceValidation.validateAt(`hashtags`, { hashtags: `a` }),
    ).rejects.toThrow(`Too Short!`);
  });

  it(`passes at exactly 2 characters (boundary)`, async () => {
    await expect(
      ReportViolenceValidation.validateAt(`hashtags`, { hashtags: `ab` }),
    ).resolves.toBeTruthy();
  });

  it(`passes at exactly 60 characters (boundary)`, async () => {
    await expect(
      ReportViolenceValidation.validateAt(`hashtags`, {
        hashtags: `a`.repeat(60),
      }),
    ).resolves.toBeTruthy();
  });

  it(`fails at 61 characters with "Too Long!"`, async () => {
    await expect(
      ReportViolenceValidation.validateAt(`hashtags`, {
        hashtags: `a`.repeat(61),
      }),
    ).rejects.toThrow(`Too Long!`);
  });
});

describe(`ReportViolenceValidation — file size`, () => {
  it(`passes when no file is provided (notRequired)`, async () => {
    await expect(
      ReportViolenceValidation.validateAt(`file`, { file: undefined }),
    ).resolves.toBeUndefined();
  });

  it(`passes at exactly 20,000,000 bytes (boundary)`, async () => {
    await expect(
      ReportViolenceValidation.validateAt(`file`, {
        file: makeFile(`image.jpg`, 20_000_000),
      }),
    ).resolves.toBeTruthy();
  });

  it(`fails at 20,000,001 bytes`, async () => {
    await expect(
      ReportViolenceValidation.validateAt(`file`, {
        file: makeFile(`image.jpg`, 20_000_001),
      }),
    ).rejects.toThrow(`File size should not be more than 20MB.`);
  });
});

describe(`ReportViolenceValidation — file type`, () => {
  it.each([
    `jpeg`,
    `png`,
    `jpg`,
    `mp4`,
    `mov`,
    `ogg`,
    `qt`,
    `m3u8`,
    `3gp`,
    `avi`,
    `wmv`,
  ])(`passes for .%s extension`, async (ext) => {
    await expect(
      ReportViolenceValidation.validateAt(`file`, {
        file: makeFile(`evidence.${ext}`, 100),
      }),
    ).resolves.toBeTruthy();
  });

  it.each([`pdf`, `zip`, `docx`, `exe`, `gif`])(
    `fails for .%s extension`,
    async (ext) => {
      await expect(
        ReportViolenceValidation.validateAt(`file`, {
          file: makeFile(`evidence.${ext}`, 100),
        }),
      ).rejects.toThrow(
        `We only support the following file types: jpeg,png,jpg,mp4,mov,ogg,qt,m3u8,3gp,avi,wmv.`,
      );
    },
  );

  it(`fails for uppercase extension (.JPEG) — case-sensitive check`, async () => {
    await expect(
      ReportViolenceValidation.validateAt(`file`, {
        file: makeFile(`image.JPEG`, 100),
      }),
    ).rejects.toThrow(`We only support the following file types`);
  });

  it(`fails for double extension (.tar.gz) — pop() returns "gz"`, async () => {
    await expect(
      ReportViolenceValidation.validateAt(`file`, {
        file: makeFile(`archive.tar.gz`, 100),
      }),
    ).rejects.toThrow(`We only support the following file types`);
  });

  it(`fails for file with no extension — pop() returns filename`, async () => {
    await expect(
      ReportViolenceValidation.validateAt(`file`, {
        file: makeFile(`noextension`, 100),
      }),
    ).rejects.toThrow(`We only support the following file types`);
  });
});
