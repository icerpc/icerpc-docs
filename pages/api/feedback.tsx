import { sendFeedbackMail } from 'lib/send-mail';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { FeedbackData } from 'components/Shell/Feedback/FeedbackForm';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    const feedback = req.body as FeedbackData;
    const response = await sendFeedbackMail(req, feedback);
    return response?.ok
      ? res.status(200).json({ message: 'Feedback sent successfully' })
      : res.status(500).json({ message: 'Failed to send feedback' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Failed to send feedback' });
  }
}
