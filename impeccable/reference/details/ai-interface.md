# AI interfaces

Prompt entry, suggestions, attachments, streaming, sources, confidence, inline refine, memory, history, and cost for products with an AI feature. Load it when building or reviewing a chat, assistant, or generation UI. These rules are Operate.

## Entry

- Make the prompt box the entry point: the first thing on screen, with no marketing page before it (shapeof.ai).

## Suggestions and modes

- Show 3 to 6 relevant suggestions, ordered by context. Each one fills the prompt, so the user can edit it before it runs (shapeof.ai).
- Make mode chips selectable. Show the active one, and give costly modes a visible guardrail (shapeof.ai).
- Add @ context pills only where the user must point at a source or object.

## Attachments and pastes

- Show each attachment as a compact preview block with its name and a remove action.
- Collapse long pasted code into a collapsible block. Start at 10,000 characters, the threshold OpenAI uses for pastes, then tune.
- Keep a Show in text field action to restore a collapsed paste (OpenAI).

## Cost

- Show a live low-high cost estimate beside the send button or above the input. Update it when options change.
- Base the range on max tokens or typical lengths, and list the drivers: prompt, context, and output (shapeof.ai).

## Waiting

- Stream text as it generates. Show a status label until the first token arrives (Cloudscape).
- Track time to first token as the latency target (CHI 2026).
- Start with three bouncing dots, as Notion AI does, then tune.
- Streamed AI text shows a status label, not a placeholder layout (Cloudscape).
- Loaders for buttons and single modules follow [product-patterns.md](product-patterns.md).

## Sources and reasoning

- Show the steps the AI took and the sources it used, inline and as a list (shapeof.ai).
- Flag a missing source. Never fill it in (shapeof.ai).
- Reveal each step as it finishes, in order. The fade follows the stagger rules in [motion.md](motion.md).
- Collapse reasoning by default, with an expand control. Keep it live during long tasks (shapeof.ai).

## Confidence

- Show confidence only after a user test shows it helps. Pick the format by test: categorical (High, Medium, Low) or numeric (80%) (Google PAIR).
- State what the value means, next to the value (Google PAIR).
- A candidate format: a pill labelled High confidence or Unverified, below the response.
- Reveal the exact percentage on click, not in the default view.

## Inline refine

- Let the user select a sentence or paragraph and type a revision instruction.
- Place quick actions such as Improve writing and Fix spelling beneath the block.
- Show the keyboard shortcut next to each quick action.
- Revise only the selected part. Do not regenerate the full response (shapeof.ai).
- Show the result as a preview with accept and reject. Never overwrite the original before accept (shapeof.ai).

## Memory

- Keep the memory panel one step from the chat, not inside deep settings. It lists every saved entry (shapeof.ai).
- Each entry can be viewed, edited, and deleted (shapeof.ai).
- Show a storage meter for memory, so the user sees how full it is.
- Let the user delete many entries at once, as well as one at a time.
- Let the user add a key fact by hand, as an explicit save (shapeof.ai).
- Show an inline notice when a memory is saved, with a link to the panel. Offer a memory-off or incognito mode (shapeof.ai).

## History

- Show past sessions as a vertical list, or anchor each one to the block that made it.
- Show the first line or snippet of each generation under its title.
- Let users delete any chat. Offer archive as the softer option (OpenAI).
- Put a search field over the history. It matches conversation titles (OpenAI).
- Generate a title for each chat, and let the user rename it (OpenAI).
