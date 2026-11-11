---
trigger: always_on
---

# Quote Forms & Lead Intake Guidelines

@[Quote Forms Skill](file:///C:/Users/eliza/.gemini/config/plugins/claude-memory/skills/quote-forms/SKILL.md)

## Overview
This project workspace focuses on the Quote Intake system for R. Martin Creative:
- **Interactive Web Quote Modal:** `app/components/QuoteModal.tsx` & `app/lib/quote-services.ts`
- **Quote API Route:** `app/api/quote/route.ts`
- **Proposal & PDF Pipeline:** `Local/scripts/proposal/` (`render.mjs`, `template.html`, `audit.mjs`, `shots.mjs`)
- **Active Client Leads & Quotes:** `Local/Leads/`

## Core Workflow Rules
1. Any changes to the 4-step quote intake wizard (Service -> Questions -> Files -> Contact) must maintain tracking parity with GA4 and Clarity events (`quote_open`, `quote_step`, `quote_abandon`, `generate_lead`).
2. Client proposals generated via `Local/scripts/proposal/` must reflect current pricing from `app/lib/data/pricing.ts`.
