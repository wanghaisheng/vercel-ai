import { openai } from '@ai-sdk/openai';
import { generateObject } from 'ai';
import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

async function main() {
  const {
    object: { events },
  } = await generateObject({
    model: openai('gpt-4-turbo'),
    schema: z.object({
      events: z.array(
        z.object({
          date: z
            .string()
            .date()
            .transform(value => new Date(value)),
          event: z.string(),
        }),
      ),
    }),
    prompt: 'List 5 important events from the the year 2000.',
  });

  console.log(events);
}

main().catch(console.error);
