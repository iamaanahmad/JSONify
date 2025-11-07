'use server';

/**
 * @fileOverview An AI agent that detects and redacts sensitive data in JSON objects.
 *
 * - secureJson - A function that scans a JSON string for sensitive keys and returns a redacted version.
 * - SecureJsonInput - The input type for the secureJson function.
 * - SecureJsonOutput - The return type for the secureJson function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const SecureJsonInputSchema = z.object({
  jsonString: z.string().describe('The JSON string to scan for sensitive data.'),
});
export type SecureJsonInput = z.infer<typeof SecureJsonInputSchema>;

const SecureJsonOutputSchema = z.object({
  redactedJsonString: z.string().describe('The JSON string with sensitive values redacted.'),
  redactedKeys: z.array(z.string()).describe('A list of keys that have been redacted.'),
});
export type SecureJsonOutput = z.infer<typeof SecureJsonOutputSchema>;

export async function secureJson(input: SecureJsonInput): Promise<SecureJsonOutput> {
  return secureJsonFlow(input);
}

const prompt = ai.definePrompt({
  name: 'secureJsonPrompt',
  input: { schema: SecureJsonInputSchema },
  output: { schema: SecureJsonOutputSchema },
  prompt: `You are a security expert specializing in data protection. Your task is to analyze a JSON object and redact any values that appear to be sensitive.

Identify keys that commonly store sensitive information. This includes, but is not limited to, keys related to:
- Passwords, secrets, tokens, API keys (e.g., "password", "secret", "token", "apiKey", "access_key")
- Personal Identifiable Information (PII) (e.g., "email", "phone", "ssn", "address")
- Financial data (e.g., "creditCardNumber", "cvv")

For each sensitive key you identify, replace its value with the string 'REDACTED'.
Return the full, modified JSON string in the 'redactedJsonString' field.
Also, return a list of the keys you have redacted in the 'redactedKeys' field.

If no sensitive keys are found, return the original JSON string and an empty array for 'redactedKeys'.

JSON Input:
\`\`\`json
{{{jsonString}}}
\`\`\`
`,
});

const secureJsonFlow = ai.defineFlow(
  {
    name: 'secureJsonFlow',
    inputSchema: SecureJsonInputSchema,
    outputSchema: SecureJsonOutputSchema,
  },
  async input => {
    try {
        // First, validate if the input is valid JSON
        JSON.parse(input.jsonString);
    } catch (e) {
        // If not, return an empty response as we can't process it.
        return {
            redactedJsonString: input.jsonString,
            redactedKeys: [],
        };
    }
    const { output } = await prompt(input);
    return output!;
  }
);
