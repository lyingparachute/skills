# ADR format

Write an ADR only for a hard-to-reverse, surprising decision with a real trade-off. Search existing decisions first and apply the durable-doc contest in `SKILL.md`.

Use `adr/TEMPLATE.md` for the record and `adr/README-TEMPLATE.md` for the index. Group records by the part of the system they govern. Allocate the next unused four-digit number across all folders, including the archive and reserved numbers; never reuse a number.

Use domain concepts, apps, packages, modules and ADR numbers instead of implementation identifiers. Retain a function name only as a last resort when removing it obscures the decision; a critic reviews each retained name and its necessity. Exclude file paths, line numbers, test names, type names, field lists and command recipes.

Set status to `proposed` during review and `accepted` when merged. Accepted decisions are immutable. For a changed decision, write a new ADR linking the old one, move the old record to `archived/`, set its status to `archived`, and name the replacement after the first Status line.

Keep the five sections in template order. Begin Decision with a bold sentence. Put rejected alternatives in the table. When converting an older record, move reversal criteria to the last Consequences bullet: "Revisit if", then the old condition verbatim; a lead-in that names an action ("Create a successor ADR if") follows the condition as ": create a successor ADR.", and a bare "Reconsider when" becomes "Revisit if". Turn prose alternatives ("X was rejected because Y.") into rows with "Rejected because Y." as the reason. Move related ADRs to one closing Context line: "Related: ", then each old entry verbatim, link text and target kept, joined with ", ", ending with a period. Bold the existing first Decision sentence without changing its words. If it cannot stand alone, the lead writes a sentence and records the ADR number in the plan's Surprises & Discoveries. Preserve the decision's meaning.

Run `domain-modeling/scripts/check-adr-format <adr-directory>` to check the records. More than 50 lines is a warning, not a limit. Use `--since REF` to check accepted records for word loss against a git revision, including renames.
