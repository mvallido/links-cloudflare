import { generateText } from 'ai';
import { createWorkersAI } from 'workers-ai-provider';
import { z } from 'zod';

const responseSchema = z.object({
	status: z.enum(['AVAILABLE_PRODUCT', 'NOT_AVAILABLE_PRODUCT', 'UNKNOWN_STATUS']),
	statusReason: z.string(),
});

export async function aiDestinationChecker(env: Env, bodyText: string) {
	const workersAi = createWorkersAI({ binding: env.AI });
	const result = await generateText({
		model: workersAi('@cf/meta/llama-3.1-8b-instruct-fp8'),
		prompt:
			`Analyze the following webpage content and determine if the product is available for purchase.

				IMPORTANT RULES:
				- If the page says "in stock", "add to cart", "X left in stock", or shows a quantity available, the product IS available. Classify as AVAILABLE_PRODUCT.
				- If the page says "out of stock", "sold out", "unavailable", or "discontinued", classify as NOT_AVAILABLE_PRODUCT.
				- The page may be in any language. Look for equivalent phrases in that language.
				- If the page is not a product page or you cannot determine availability, classify as UNKNOWN_STATUS.

				Respond with ONLY a JSON object in this exact format, no other text:
				{"status": "<STATUS>", "statusReason": "<REASON>"}

				Where <STATUS> is one of: AVAILABLE_PRODUCT, NOT_AVAILABLE_PRODUCT, UNKNOWN_STATUS

				And <REASON> is a descriptive explanation that quotes the specific words or phrases from the page content that led to your conclusion.

				---
				Webpage Content: ${bodyText}`.trim(), system:
			'You are an AI assistant that analyzes webpage content to determine product availability. You work with pages in any language. Respond with ONLY valid JSON, no markdown, no explanation outside the JSON object.',
	});

	const jsonMatch = result.text.match(/\{[\s\S]*\}/);
	if (!jsonMatch) {
		return {
			status: 'UNKNOWN_STATUS' as const,
			statusReason: 'Model did not return valid JSON',
		};
	}

	const parsed = responseSchema.safeParse(JSON.parse(jsonMatch[0]));
	if (!parsed.success) {
		return {
			status: 'UNKNOWN_STATUS' as const,
			statusReason: 'Model returned malformed response',
		};
	}

	return parsed.data;
}
