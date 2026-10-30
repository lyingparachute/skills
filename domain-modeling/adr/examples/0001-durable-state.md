---
status: accepted
date: 2026-10-30
---

# ADR 0001: Keep session state durable

## Status

Accepted.

## Context

Workers can stop between requests, but sessions must survive.

## Decision

**Store session state in durable storage.**

## Consequences

- Requests can resume on another worker.

## Alternatives rejected

| Alternative | Why not |
| --- | --- |
| Worker memory | Sessions disappear when workers stop. |
