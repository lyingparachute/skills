import re
from pathlib import Path

DATA = Path(__file__).resolve().parent
TABLES = ["001-139", "140-340", "341-575", "576-818"]
STATUSES = {"COVERED", "PARTIAL", "MISSING", "CONFLICT", "OUT-OF-SCOPE"}
EXPECTED_PARSED = 894
EXPECTED_NON_COVERED = 781
OUTCOMES = {"pending", "landed", "merged", "rejected", "out-of-scope"}
LEDGER = DATA / "ledger.md"
LEDGER_HEADER = "| id | status | rule | outcome | destination | anchor |"


class ParseError(Exception):
    pass


def _cells(line):
    return [c.strip() for c in line.strip().strip("|").split("|")]


def _is_data_row(line):
    if not line.startswith("|"):
        return False
    first = _cells(line)[0]
    return first not in ("src line", "") and not set(first) <= set("-: ")


def gap_rows():
    rows = []
    for table in TABLES:
        seen = {}
        for line in (DATA / f"gap-{table}.md").read_text().splitlines():
            if not _is_data_row(line):
                continue
            cells = _cells(line)
            status_at = next((i for i, c in enumerate(cells) if i > 0 and c in STATUSES), None)
            if status_at is None or status_at == len(cells) - 1:
                raise ParseError(f"gap-{table}.md: no status in row: {line[:80]}")
            src = re.sub(r"^L", "", cells[0])
            seen[src] = seen.get(src, 0) + 1
            rows.append({
                "key": (table, src),
                "src": src,
                "table": table,
                "status": cells[status_at],
                "rule": " | ".join(cells[1:status_at]),
                "note": cells[-1],
            })
    totals = {}
    for row in rows:
        totals[row["key"]] = totals.get(row["key"], 0) + 1
    counters = {}
    for row in rows:
        counters[row["key"]] = counters.get(row["key"], 0) + 1
        suffix = f"#{counters[row['key']]}" if totals[row["key"]] > 1 else ""
        row["id"] = f"{row['table']}:{row['src']}{suffix}"
    return rows


def non_covered(rows):
    return [r for r in rows if r["status"] != "COVERED"]


def read_ledger():
    entries = []
    for line in LEDGER.read_text().splitlines():
        if not line.startswith("| ") or line.startswith(LEDGER_HEADER) or line.startswith("|---"):
            continue
        cells = _cells(line)
        if len(cells) != 6:
            raise ParseError(f"ledger.md: row needs 6 cells: {line[:80]}")
        entries.append(dict(zip(["id", "status", "rule", "outcome", "destination", "anchor"], cells)))
    return entries
