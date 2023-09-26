import { sendFeedbackMail } from 'lib/send-mail';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { FeedbackData } from '@/components/shell/feedback/feedback-form';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  const feedback = req.body as FeedbackData;
  try {
    (await sendFeedbackMail(req, feedback)).messageId
      ? res.status(200).json({ success: true, message: 'Feedback sent' })
      : res
          .status(500)
          .json({ success: false, message: 'Failed to send feedback' });
  } catch (e: any) {
    res.status(500).json({ message: e });
  }
}
