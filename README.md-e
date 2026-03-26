# Belizean Law MCP Server

**The Belize Laws alternative for the AI age.**

[![npm version](https://badge.fury.io/js/@ansvar%2Fbelizean-law-mcp.svg)](https://www.npmjs.com/package/@ansvar/belizean-law-mcp)
[![MCP Registry](https://img.shields.io/badge/MCP-Registry-blue)](https://registry.modelcontextprotocol.io)
[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![GitHub stars](https://img.shields.io/github/stars/Ansvar-Systems/Belizean-law-mcp?style=social)](https://github.com/Ansvar-Systems/Belizean-law-mcp)
[![CI](https://github.com/Ansvar-Systems/Belizean-law-mcp/actions/workflows/ci.yml/badge.svg)](https://github.com/Ansvar-Systems/Belizean-law-mcp/actions/workflows/ci.yml)
[![Daily Data Check](https://github.com/Ansvar-Systems/Belizean-law-mcp/actions/workflows/check-updates.yml/badge.svg)](https://github.com/Ansvar-Systems/Belizean-law-mcp/actions/workflows/check-updates.yml)
[![Database](https://img.shields.io/badge/database-pre--built-green)](docs/INTERNATIONAL_INTEGRATION_GUIDE.md)
[![Provisions](https://img.shields.io/badge/provisions-31%2C480-blue)](docs/INTERNATIONAL_INTEGRATION_GUIDE.md)

Query **1,531 Belizean laws** -- from the Data Protection Act and Criminal Code to the Companies Act, Belize Constitution, and more -- directly from Claude, Cursor, or any MCP-compatible client.

If you're building legal tech, compliance tools, or doing Belizean legal research, this is your verified reference database.

Built by [Ansvar Systems](https://ansvar.eu) -- Stockholm, Sweden

---

## Why This Exists

Belizean legal research means navigating the Attorney General's Ministry law portal, locating revised editions and subsidiary legislation, and manually cross-referencing between Acts and statutory instruments. Whether you're:
- A **lawyer** validating citations in a brief or contract
- A **compliance officer** checking obligations under the Data Protection Act or Companies Act
- A **legal tech developer** building tools on Caribbean or Commonwealth law
- A **researcher** tracing legislative provisions across 1,531 Belizean Acts

...you shouldn't need dozens of browser tabs and manual PDF cross-referencing. Ask Claude. Get the exact provision. With context.

This MCP server makes Belizean law **searchable, cross-referenceable, and AI-readable**.

---

## Quick Start

### Use Remotely (No Install Needed)

> Connect directly to the hosted version -- zero dependencies, nothing to install.

**Endpoint:** `https://belizean-law-mcp.vercel.app/mcp`

| Client | How to Connect |
|--------|---------------|
| **Claude.ai** | Settings > Connectors > Add Integration > paste URL |
| **Claude Code** | `claude mcp add belizean-law --transport http https://belizean-law-mcp.vercel.app/mcp` |
| **Claude Desktop** | Add to config (see below) |
| **GitHub Copilot** | Add to VS Code settings (see below) |

**Claude Desktop** -- add to `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "belizean-law": {
      "type": "url",
      "url": "https://belizean-law-mcp.vercel.app/mcp"
    }
  }
}
```

**GitHub Copilot** -- add to VS Code `settings.json`:

```json
{
  "github.copilot.chat.mcp.servers": {
    "belizean-law": {
      "type": "http",
      "url": "https://belizean-law-mcp.vercel.app/mcp"
    }
  }
}
```

### Use Locally (npm)

```bash
npx @ansvar/belizean-law-mcp
```

**Claude Desktop** -- add to `claude_desktop_config.json`:

**macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
**Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "belizean-law": {
      "command": "npx",
      "args": ["-y", "@ansvar/belizean-law-mcp"]
    }
  }
}
```

**Cursor / VS Code:**

```json
{
  "mcp.servers": {
    "belizean-law": {
      "command": "npx",
      "args": ["-y", "@ansvar/belizean-law-mcp"]
    }
  }
}
```

## Example Queries

Once connected, just ask naturally:

- *"What does the Data Protection Act say about consent for processing personal data?"*
- *"Is the Companies Act still in force?"*
- *"Find provisions about money laundering in Belizean law"*
- *"What does the Criminal Code say about cybercrime offences?"*
- *"Search for data breach notification requirements across Belizean statutes"*
- *"What are the requirements for company incorporation under the Companies Act?"*
- *"Validate the citation 'Section 12 Data Protection Act'"*
- *"Build a legal stance on contractual liability under Belizean law"*

---

## What's Included

| Category | Count | Details |
|----------|-------|---------|
| **Laws** | 1,531 laws | Belizean legislation from agm.gov.bz |
| **Provisions** | 31,480 sections | Full-text searchable with FTS5 |
| **Database Size** | ~77 MB | Optimized SQLite, portable |
| **Freshness Checks** | Automated | Drift detection against official sources |

**Verified data only** -- every citation is validated against official sources (Attorney General's Ministry, Belize). Zero LLM-generated content.

---

## See It In Action

### Why This Works

**Verbatim Source Text (No LLM Processing):**
- All statute text is ingested from the Attorney General's Ministry law portal (agm.gov.bz)
- Provisions are returned **unchanged** from SQLite FTS5 database rows
- Zero LLM summarization or paraphrasing -- the database contains statute text, not AI interpretations

**Smart Context Management:**
- Search returns ranked provisions with BM25 scoring (safe for context)
- Provision retrieval gives exact text by Act identifier + section number
- Cross-references help navigate without loading everything at once

**Technical Architecture:**
```
AGM Law Portal --> Parse --> SQLite --> FTS5 snippet() --> MCP response
                    ^                        ^
             Provision parser         Verbatim database query
```

### Traditional Research vs. This MCP

| Traditional Approach | This MCP Server |
|---------------------|-----------------|
| Search AGM portal by Act name | Search by plain English: *"data protection consent"* |
| Navigate multi-chapter Acts manually | Get the exact provision with context |
| Manual cross-referencing between Acts | `build_legal_stance` aggregates across sources |
| "Is this Act still in force?" -> check manually | `check_currency` tool -> answer in seconds |
| Find CARICOM or international alignment -> dig manually | `get_eu_basis` -> linked frameworks instantly |
| No API, no integration | MCP protocol -> AI-native |

**Traditional:** Search AGM portal -> Download PDF -> Ctrl+F -> Cross-reference between Acts -> Check CCJ for rulings -> Repeat

**This MCP:** *"What are the consent requirements under the Data Protection Act and how do they compare to GDPR?"* -> Done.

---

## Available Tools (13)

### Core Legal Research Tools (8)

| Tool | Description |
|------|-------------|
| `search_legislation` | FTS5 full-text search across 31,480 provisions with BM25 ranking |
| `get_provision` | Retrieve specific provision by Act identifier + section number |
| `check_currency` | Check if an Act is in force, amended, or repealed |
| `validate_citation` | Validate citation against database -- zero-hallucination check |
| `build_legal_stance` | Aggregate citations from multiple Acts for a legal topic |
| `format_citation` | Format citations per Belizean legal conventions |
| `list_sources` | List all available Acts with metadata, coverage scope, and data provenance |
| `about` | Server info, capabilities, dataset statistics, and coverage summary |

### International Law Integration Tools (5)

| Tool | Description |
|------|-------------|
| `get_eu_basis` | Get international frameworks (CARICOM, Commonwealth, CCJ) that a Belizean Act aligns with |
| `get_belizean_implementations` | Find Belizean laws aligning with a specific international framework |
| `search_eu_implementations` | Search international documents with Belizean alignment counts |
| `get_provision_eu_basis` | Get international law references for a specific provision |
| `validate_eu_compliance` | Check alignment status of Belizean Acts against international frameworks |

---

## International Law Alignment

Belize is not an EU member state. International alignment for Belizean law is anchored in:

- **Commonwealth legal system** -- Belize follows the common law tradition, sharing legal heritage with the UK, Canada, and other Commonwealth jurisdictions. Persuasive authority from English courts remains relevant
- **Caribbean Court of Justice (CCJ)** -- Belize acceded to the CCJ's appellate jurisdiction in 2010, replacing the Privy Council. CCJ decisions are binding on Belizean courts
- **CARICOM** -- Belize is a full member of the Caribbean Community, and CARICOM model legislation influences domestic Acts including the Data Protection Act
- **CAFTA-DR** -- Belize is not a party to CAFTA-DR, but regional trade developments affect commercial law alignment
- **UN conventions** -- Belize has ratified key UN conventions including UNCAC, UNTOC, and the Convention on the Rights of the Child

The international bridge tools allow you to explore these alignment relationships -- identifying where Belizean provisions correspond to international frameworks.

> **Note:** International cross-references reflect alignment and treaty relationships, not direct transposition. Belize adopts its own legislative approach under the common law tradition.

---

## Data Sources & Freshness

All content is sourced from authoritative Belizean legal databases:

- **[Attorney General's Ministry](https://agm.gov.bz/)** -- Official Belize laws and legislative database

### Data Provenance

| Field | Value |
|-------|-------|
| **Authority** | Attorney General's Ministry, Belize |
| **Retrieval method** | Official legislative portal ingestion |
| **Language** | English |
| **Coverage** | 1,531 laws across all legal domains |
| **Last ingested** | 2026-02-25 |

### Automated Freshness Checks

A GitHub Actions workflow monitors official sources for changes:

| Check | Method |
|-------|--------|
| **Act amendments** | Drift detection against known provision anchors |
| **New Acts** | Comparison against official index |
| **Repealed Acts** | Status change detection |

**Verified data only** -- every citation is validated against official sources. Zero LLM-generated content.

---

## Security

This project uses multiple layers of automated security scanning:

| Scanner | What It Does | Schedule |
|---------|-------------|----------|
| **CodeQL** | Static analysis for security vulnerabilities | Weekly + PRs |
| **Semgrep** | SAST scanning (OWASP top 10, secrets, TypeScript) | Every push |
| **Gitleaks** | Secret detection across git history | Every push |
| **Trivy** | CVE scanning on filesystem and npm dependencies | Daily |
| **Socket.dev** | Supply chain attack detection | PRs |
| **Dependabot** | Automated dependency updates | Weekly |

See [SECURITY.md](SECURITY.md) for the full policy and vulnerability reporting.

---

## Important Disclaimers

### Legal Advice

> **THIS TOOL IS NOT LEGAL ADVICE**
>
> Statute text is sourced from the Attorney General's Ministry of Belize. However:
> - This is a **research tool**, not a substitute for professional legal counsel
> - **Court case coverage is not included** -- do not rely solely on this for case law research
> - **Verify critical citations** against primary sources for court filings
> - **International cross-references** reflect alignment relationships, not direct transposition
> - **Subsidiary legislation** (statutory instruments, regulations) may have partial coverage

**Before using professionally, read:** [DISCLAIMER.md](DISCLAIMER.md) | [SECURITY.md](SECURITY.md)

### Client Confidentiality

Queries go through the Claude API. For privileged or confidential matters, use on-premise deployment. See [PRIVACY.md](PRIVACY.md) for guidance on professional use in accordance with Bar Association of Belize standards.

---

## Development

### Setup

```bash
git clone https://github.com/Ansvar-Systems/Belizean-law-mcp
cd Belizean-law-mcp
npm install
npm run build
npm test
```

### Running Locally

```bash
npm run dev                                       # Start MCP server
npx @anthropic/mcp-inspector node dist/index.js   # Test with MCP Inspector
```

### Data Management

```bash
npm run ingest                    # Ingest Acts from AGM portal
npm run build:db                  # Rebuild SQLite database
npm run check-updates             # Check for amendments and new Acts
```

### Performance

- **Search Speed:** <100ms for most FTS5 queries
- **Database Size:** ~77 MB (efficient, portable)
- **Reliability:** 100% ingestion success rate

---

## Related Projects: Complete Compliance Suite

This server is part of **Ansvar's Compliance Suite** -- MCP servers that work together for end-to-end compliance coverage:

### [@ansvar/eu-regulations-mcp](https://github.com/Ansvar-Systems/EU_compliance_MCP)
**Query 49 EU regulations directly from Claude** -- GDPR, AI Act, DORA, NIS2, MiFID II, eIDAS, and more. Full regulatory text with article-level search. `npx @ansvar/eu-regulations-mcp`

### [@ansvar/us-regulations-mcp](https://github.com/Ansvar-Systems/US_Compliance_MCP)
**Query US federal and state compliance laws** -- HIPAA, CCPA, SOX, GLBA, FERPA, and more. `npx @ansvar/us-regulations-mcp`

### [@ansvar/security-controls-mcp](https://github.com/Ansvar-Systems/security-controls-mcp)
**Query 261 security frameworks** -- ISO 27001, NIST CSF, SOC 2, CIS Controls, SCF, and more. `npx @ansvar/security-controls-mcp`

**70+ national law MCPs** covering Australia, Brazil, Canada, Colombia, Denmark, Finland, France, Germany, Guatemala, Ireland, Italy, Japan, Netherlands, Norway, Panama, Serbia, Slovenia, South Korea, Sweden, Taiwan, UK, and more.

---

## Contributing

Contributions welcome! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

Priority areas:
- CCJ case law coverage
- Subsidiary legislation and statutory instruments
- Historical statute versions and amendment tracking
- Comparative CARICOM law analysis tools

---

## Roadmap

- [x] Core statute database with FTS5 search
- [x] Full corpus ingestion (1,531 laws, 31,480 provisions)
- [x] International law alignment tools
- [x] Vercel Streamable HTTP deployment
- [x] npm package publication
- [ ] CCJ case law expansion
- [ ] Subsidiary legislation and statutory instruments
- [ ] Historical statute versions (amendment tracking)
- [ ] CARICOM model law cross-references

---

## Citation

If you use this MCP server in academic research:

```bibtex
@software{belizean_law_mcp_2026,
  author = {Ansvar Systems AB},
  title = {Belizean Law MCP Server: AI-Powered Legal Research Tool},
  year = {2026},
  url = {https://github.com/Ansvar-Systems/Belizean-law-mcp},
  note = {1,531 Belizean laws with 31,480 provisions}
}
```

---

## License

Apache License 2.0. See [LICENSE](./LICENSE) for details.

### Data Licenses

- **Statutes & Legislation:** Attorney General's Ministry, Belize (public domain)
- **International Framework Metadata:** CARICOM, UN, Commonwealth (public domain)

---

## About Ansvar Systems

We build AI-accelerated compliance and legal research tools for the global market. This MCP server started as our internal reference tool -- turns out everyone building compliance tools has the same research frustrations.

So we're open-sourcing it. Navigating 1,531 Belizean Acts shouldn't require a law degree.

**[ansvar.eu](https://ansvar.eu)** -- Stockholm, Sweden

---

<p align="center">
  <sub>Built with care in Stockholm, Sweden</sub>
</p>
