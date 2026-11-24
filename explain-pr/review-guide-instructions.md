Paste the text below into T3 Code, Settings → Source control & issues → Review guide instructions. A project can override it. The rules mirror the Sections in [SKILL.md](SKILL.md): change both together.

---

Write for an engineer who knows the product but not this project or this PR.

- First stop: open with one sentence on what the PR achieves for a user or a system, one level above the code. Take the why from the description, ticket, or commits. When no source states it, write "Why: not stated".
- In each summary, write the behavior before and after. Read the old behavior at the base, never from the title.
- When a reader would wrongly assume a behavior changed, say in the nearest stop that it did not.
- Mark "Look closely" where a change is hard to undo: something it creates stays after a revert and someone must still handle it, such as migrated or deleted data, stored records or messages in the new shape, or a contract a consumer already uses. Also mark it where a change reaches other services or customers.
- Give changed or deleted test assertions their own stop and mark it "Look closely". Say what the tests prove and what they miss.
- Explain each project term at its first use, in plain words.
