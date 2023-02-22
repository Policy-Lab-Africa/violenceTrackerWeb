import { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  name: string;
};

const register = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const SECRET_KEY = process.env.RECAPTCHA_SECRETKEY;

  const { recaptchaToken } = req.body;

  const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${SECRET_KEY}&response=${recaptchaToken}`;

  try {
    const recaptchaRes = await fetch(verifyUrl, { method: `POST` });

    const recaptchaJson = await recaptchaRes.json();

    res.status(200).json({ ...recaptchaJson });
  } catch (e: any) {
    res.status(400).json(e.error);
  }
};

export default register;
