const UNCOMMITTED = 'Leave every change uncommitted: the runner commits after its own gate.'

const RESUME_NOTE = 'An earlier implementer stopped partway; its uncommitted work is in the tree. Check it and finish the milestone from there.\n'

export const implementerPrompt = ({ plan, id, brief, resuming }) => `You implement milestone ${id} of the plan ${plan}.
${resuming ? RESUME_NOTE : ''}Read ${brief} first. It holds your requirements; copy exact values verbatim.
Check every file:line the brief cites against the current code before you act on it.
Earlier milestones are committed; read git log and the code for the interfaces they created.
Load the \`tdd\` skill and work red-green-refactor. Load \`diagnosing-bugs\` when something breaks.
Tick this milestone's Progress items in the plan as they land.
${UNCOMMITTED}
Return status "blocked", with the reason as the summary, when the brief cannot be done as written or needs work from another plan that has not landed. Build nothing from that other plan.
Return a summary, the focused test commands that prove this milestone (runnable from the repo root), your concerns, and a commit message written with the \`caveman-commit\` skill.`

export const criticPrompt = ({ brief, review, gate }) => `You are a fresh-context critic. Someone else wrote this change. Attack it: find what is wrong.
Load the \`judo-review\` skill and apply it to the diff in ${review}.
The requirements are in ${brief}. The gate ran ${gate.green ? 'green' : 'red'}; its output is in ${gate.file}. A command marked advisory there was already red before this change: report its failures in files this change touches, old ones included (Boy Scout rule), and ignore the rest.
Report a defect even when the plan mandates it. Report two separate lists. standards: clean-code and enterprise quality. spec: compliance with the requirements - scope, non-goals, locked decisions, definition of done.
Each finding gives the location as file:line, the issue, a severity, and a concrete code-judo move as the fix. Use empty lists when you find nothing.`

export const triagePrompt = ({ brief, review, findings }) => `Load the \`receiving-code-review\` skill. Every finding in ${findings} is a hypothesis from a critic.
Check each one against the working tree and the diff in ${review} before you judge it. The requirements are in ${brief}.
Give each finding, by its index, one verdict: fix-now (real and belongs in this change), followup (real but belongs to other work), reject (wrong), or owner-call (real, but fixing it breaks what the plan mandates; it is logged for the plan owner and not fixed). The reason names your evidence.`

export const fixerPrompt = ({ brief, review, fixes }) => `Fix every finding in ${fixes}. The change under review is the diff in ${review}; the requirements are in ${brief}.
Load the \`receiving-code-review\` skill and do its Boy Scout sweep over every file you touch. Put each behavior fix behind a test, with the \`tdd\` skill.
${UNCOMMITTED}
Return a summary, the focused test commands that prove the fixes (runnable from the repo root), your concerns, and a commit message written with the \`caveman-commit\` skill. Return status "blocked" with the reason as the summary if a finding cannot be fixed.`
