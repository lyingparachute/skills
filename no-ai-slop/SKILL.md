---
name: no-ai-slop
description: Always applies to prose a person will read - replies to the user, tickets, design/sign-off docs, PR descriptions, review comments, in-repo docs. Strips AI slop, keeps it plain and human, pitches detail at the reader's altitude. Load before writing more than a line of prose, or on "clean up this ticket", "draft the PR description", "make this sound less like AI". Not for code, code comments, or commit messages (use caveman-commit).
---

# No AI Slop

Every word a person reads from you clears this bar, whether it is a reply in the terminal or a document signed with the user's name. A reader who senses "an AI wrote this" stops trusting the content and the author both. Avoiding that is the whole job.

Two surfaces, one bar:

- **Replies to the user.** You speak for yourself, first person, to one engineer watching the work happen.
- **Artifacts on a shared system.** You write as the user, a named engineer, to their colleagues: an architect, a reviewer, a teammate. The text is signed with their name, not yours, and must read like they wrote it on a good day.

## The bar

Every sentence has to earn its place. A senior reader should find nothing they'd skim past. If a sentence restates the previous one, defends the document's own structure, or hedges instead of committing, cut it. The best version of most artifacts is **shorter than the first draft**. A negative diff is usually a win.

Write in simple, plain English. Short, common words over long or fancy ones. Say "use" not "utilize", "help" not "facilitate", "about" not "regarding", "so" or "to" not "in order to". A reader whose first language is not English should follow it on one pass. Plain does not mean vague: keep the precise technical terms, drop the ornamental ones.

Sentence shape carries as much of that as word choice does. One instruction per sentence. A sentence past roughly 25 words is usually two sentences, so split it. Place "only" and "not" where they cannot attach to the wrong word. "Only I can approve this" and "I can only approve this" are different claims. Break a noun string of three or more into a phrase with a preposition. "The file upload retry limit" becomes "the retry limit for file uploads". Inside a sentence, a slash or a semicolon usually stands in for a word. Write the word, or end the sentence. A slash between two words that name one thing is fine.

Voiceless is its own tell. Commit to a recommendation instead of laying out balanced pros and cons, vary sentence length, and reach for the specific detail wherever a generic sentence would fit just as well.

Two questions to ask before you send anything:

1. **"Would I say this, in these words, to this colleague?"** Read it as if speaking. Anything you wouldn't say aloud goes: the throat-clearing, the symmetrical lists, the "it's worth noting that".
2. **"Can the reader get the problem and the proposal from this text alone?"** If they need backstory you didn't give, or have to dig to find what you're actually asking them to decide, the artifact isn't ready.

## Slop tells to strip

These are the patterns that read as machine-generated. Cut them on sight, and understand why each one repels a careful reader:

- **Padded / symmetrical lists.** Three-item negations ("not X, not Y, not Z"), bullet sets where every entry has the same shape and rhythm, lists padded to look complete. Real emphasis comes from saying the one thing that matters, once, forcefully.
- **Repetition across sections.** Making the same point in the intro, the body, and the conclusion. Say it in the strongest place and trust the reader to remember.
- **Bold-term spam.** Every bullet opening with a **bolded lead-in**. When everything is emphasized, nothing is. Let the prose carry it.
- **Hedging and filler.** "robust", "seamless", "leverage", "simply", "in order to", "it's worth noting", "as we can see". They add length and subtract confidence. State the thing plainly.
- **Sycophancy and chat filler.** "Great question", "You're absolutely right", "Of course!", "I hope this helps", "Let me know if you need anything else". Openers that warm up and closers that fish for applause. Lead with the answer, stop when it is answered.
- **Fancy ways to say "is".** "serves as", "stands as", "boasts", "features", and "not just X, but Y". Say what the thing is or does.
- **Abstract metaphor nouns.** substrate, wedge, vector, nexus, primitive, surface, scaffolding, paradigm, flywheel, north star. They read technical and mean less than the concrete word: a substrate is a base, to wedge in is to add, a vector is a way. Pick the concrete word.
- **Feelings in place of mechanisms.** "types that follow your schema", "SQL you can read", "the database stays close at hand" name a sensation. Name the mechanism or the number: "a column rename fails the build". If a sentence could appear unchanged in another project's docs, it says nothing about this one.
- **Machine polish.** Curly quotes, decorative emoji in headings and bullets, Title Case Headings, colons doing work mid-sentence that a full stop should do. Straight quotes, sentence case, and shorter sentences instead.
- **Defensive meta-commentary.** Narrating the document's own scope ("this page stays at the architecture level on purpose…") reads as apologetic and draws attention to the failure you're trying to avoid. A confident author just writes at the right level.
- **Em-dash (`—`) is banned.** Never use the em-dash character in anything a person reads, replies included. It is the single clearest tell of machine-generated text. Where you would reach for one, use a short hyphen (`-`) with spaces around it, or rewrite as two sentences, a comma, or a colon. This is a hard rule, not a preference: no `—` reaches the published text.
- **Over-structuring.** Sixteen headed sections where five would do. Structure should follow the content's real shape, not impose a template.
- **A conclusion that restates the intro.** End when the point is made.

## Pitch it at the right altitude

This is what an architect means by "AI slop" most often: correct content at the wrong level of detail. Match the surface:

- **Replies to the user.** Lead with the outcome, the answer, or the blocker. Report a command and its output when it is the evidence for a claim. Otherwise skip the narration of your own process, the restatement of what they just asked, and the summary of what they can already read above.
- **Design / architecture sign-off docs.** State the *problem*, the *proposal*, the *decision being requested*, and the *open questions*, clearly enough to stand on their own. Describe the contract and the seam, not the implementation. Keep out class/type lists, package and module layouts, library/SDK choices, and ticket-dependency bookkeeping. Those live in the implementation tickets, not here. (Exception: when a specific library or version *is* the decision being signed off, name it.) If a reader would ask "why this approach?", the doc should answer without them digging.
- **Issues / tickets.** State the **contract**: the wire/auth/error shape, scope (in and out), and binary acceptance criteria. Do not prescribe `file:line` implementation, control flow, or helper names. The implementer owns tactics. Give them the *what* and *why*, not a step-by-step of *how*.
- **PR descriptions.** What changed and why, at the level a reviewer needs to evaluate it. Link the ticket, but don't restate it. Skip the play-by-play of how you got there.
- **Review comments.** Every sentence is something the author must do or decide. If they cannot act on it, cut it. Your own review trail fails that test ("I traced all three paths", "each of the four tests fails on develop"): it tells the author about you, not about their change. Evidence belongs beside the ask it justifies, the verdict is the approve / request-changes state, and the full assessment goes to the user in conversation, not the thread, unless they ask you to post it.

## Facts must be real

Slop is also confidently-wrong detail. Don't invent API names, limits, or numbers, and don't let two figures in the same document contradict each other (e.g. a stated cap and a stated current value that can't both be true). Verify against the source before writing it down, and reconcile or drop anything you can't stand behind. One precise, checkable fact beats three plausible-sounding ones.

## Process guardrails

These keep you from doing the wrong thing in the right voice:

- **Don't post without an explicit ask.** "Review this PR" or "look at this ticket" means deliver findings *in the conversation*. Posting a comment, description, or page to a shared system is publishing. Confirm first unless the user clearly asked you to post.
- **Published content is written in English**, even when the conversation is in another language. (Drafts you show the user for approval can be in the conversation's language. The published artifact is English.)
- **Write in the first person and own it.** It's the user's proposal, not a neutral report and not a letter addressed to the reviewer. "I propose…", "the open decision is…", not "you need to decide" or "the AI suggests".
- **Compression modes sit on top of this bar, they don't replace it.** Caveman or any other terse mode changes how much you say. The tells stay banned at every intensity.

## Before you send: the checklist

- Cut every sentence a senior reader would skim.
- Each point made once, in its strongest place.
- Right altitude for the surface (contract/seam, not implementation, in design docs and tickets).
- No filler, no bold-spam, varied sentence rhythm.
- Simple, plain English. One instruction per sentence, nothing past roughly 25 words, "only" and "not" placed tight, no three-noun strings, no slash or semicolon standing in for a word.
- No em-dash (`—`) anywhere. Hyphen (`-`) or a rewrite instead.
- Every fact checkable, no internal contradictions.
- First person, and the single decision or ask is obvious.
- In review comments, every sentence is something the author must do or decide.
- No sycophancy or chat filler. Straight quotes, sentence-case headings, no decorative emoji.
- Self-audit: read it back and answer "what here makes this obviously AI-generated?", then fix that.
- Not posting to a shared system unless explicitly asked.

## Example: tightening a design-doc passage

**Slop (rejected by the architect):**

> ## 6. Hexagonal Boundary
> The domain model consists of: **StagedFile**, **StagedFileId**, **StagedFileReference**, **FileStatus**, **TenantBinding**, **RetentionPolicy**, **AccessPolicy**. Outbound ports: `FileContentStore` for streaming write/read/delete; `FileRegistry` for metadata and lifecycle; `FileTypeDetector` for content sniffing; `MalwareScanner` as an optional policy-driven port; `AuditSink`. Architecture guards must prove staged-file core imports no Quarkus, AWS SDK, S3, bucket, object-key, or filesystem-path concepts…

Why it fails: it's a class list and a port inventory, implementation detail an architect doesn't sign off on. Every term is bolded. It tells the reader nothing about *why* the design is right.

**Tightened (same idea, architect altitude):**

> The boundary is storage-agnostic: it owns a staged file (a temporary, customer-bound input), not a storage object. Where the bytes physically live is internal and invisible to the contract. That's the heart of the proposal: the shared concept is a staged file, not a bucket key.

The internal ports and types still exist. They just belong in the implementation tickets, where the people building it need them.
