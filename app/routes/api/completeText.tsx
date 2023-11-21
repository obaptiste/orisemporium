// app/routes/completeText.tsx

import { json } from '@remix-run/node';
import { createTextCompletion } from '../../utils/openAIHelpers';

export const action = async ({ request }) => {
  const formData = await request.formData();
  const text = formData.get('text');

  try {
    const completion = await createTextCompletion(text);
    return json({ completion });
  } catch (error) {
    return json({ error: error }, { status: 500 });
  }
};
