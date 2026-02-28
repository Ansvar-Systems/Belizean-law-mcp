#!/usr/bin/env tsx
/**
 * Belize Law MCP -- Census Script
 *
 * Fetches the full law catalog from agm.gov.bz using their
 * DataTables AJAX API endpoint.
 *
 * Portal structure:
 *   POST /api-portalLaws/ with { action: 1000 }
 *   Returns JSON array of [date, title, category, volume, html_link]
 *   PDF links embedded in last column: /uploads/laws/{hash}_{name}.pdf
 *
 * Source: https://www.agm.gov.bz
 *
 * Usage:
 *   npx tsx scripts/census.ts
 *   npx tsx scripts/census.ts --limit 100
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.resolve(__dirname, '../data');
const CENSUS_PATH = path.join(DATA_DIR, 'census.json');

const API_URL = 'https://www.agm.gov.bz/api-portalLaws/';
const USER_AGENT = 'belizean-law-mcp/1.0 (https://github.com/Ansvar-Systems/Belizean-law-mcp; hello@ansvar.ai)';

/* ---------- Types ---------- */

interface RawLawEntry {
  title: string;
  category: string;
  pdfUrl: string;
  date: string;
  volume: string;
}

/* ---------- HTTP ---------- */

async function fetchCatalog(): Promise<any[]> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'User-Agent': USER_AGENT,
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json',
    },
    body: 'action=1000',
  });

  if (response.status !== 200) {
    throw new Error(`HTTP ${response.status} from AGM API`);
  }

  const data = await response.json() as { data: string[][] };

  if (!data.data || !Array.isArray(data.data)) {
    throw new Error('Unexpected API response: missing data array');
  }

  return data.data;
}

/* ---------- Parsing ---------- */

function extractPdfUrl(htmlCell: string): string {
  const match = htmlCell.match(/href=["']([^"']+\.pdf)["']/i);
  if (match) {
    const url = match[1];
    return url.startsWith('http') ? url : `https://www.agm.gov.bz${url.startsWith('/') ? '' : '/'}${url}`;
  }
  return '';
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim();
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 60);
}

function parseEntries(rows: any[]): RawLawEntry[] {
  const entries: RawLawEntry[] = [];

  for (const row of rows) {
    if (!Array.isArray(row) || row.length < 5) continue;

    const date = stripHtml(String(row[0] ?? ''));
    const title = stripHtml(String(row[1] ?? ''));
    const category = stripHtml(String(row[2] ?? ''));
    const volume = stripHtml(String(row[3] ?? ''));
    const pdfUrl = extractPdfUrl(String(row[4] ?? ''));

    if (title.length > 2 && pdfUrl) {
      entries.push({ title, category, pdfUrl, date, volume });
    }
  }

  return entries;
}

function parseArgs(): { limit: number | null } {
  const args = process.argv.slice(2);
  let limit: number | null = null;
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--limit' && args[i + 1]) {
      limit = parseInt(args[i + 1], 10);
      i++;
    }
  }
  return { limit };
}

/* ---------- Main ---------- */

async function main(): Promise<void> {
  const { limit } = parseArgs();

  console.log('Belize Law MCP -- Census');
  console.log('========================\n');
  console.log('  Source: agm.gov.bz (Attorney General\'s Ministry)');
  console.log('  Method: DataTables API (POST /api-portalLaws/)');
  if (limit) console.log(`  --limit ${limit}`);
  console.log('');

  fs.mkdirSync(DATA_DIR, { recursive: true });

  console.log('  Fetching catalog from AGM API...');
  const rawRows = await fetchCatalog();
  console.log(`  API returned ${rawRows.length} rows`);

  const entries = parseEntries(rawRows);
  console.log(`  Parsed ${entries.length} laws with PDF links`);

  // Deduplicate by title (some entries appear in multiple categories)
  const seenTitles = new Map<string, RawLawEntry>();
  for (const entry of entries) {
    const key = entry.title.toLowerCase();
    if (!seenTitles.has(key)) {
      seenTitles.set(key, entry);
    }
  }

  const unique = Array.from(seenTitles.values());
  console.log(`  Unique laws: ${unique.length}`);

  const laws = unique
    .slice(0, limit ?? unique.length)
    .map((entry) => {
      const id = `bz-${slugify(entry.title)}`;
      const yearMatch = entry.date.match(/(\d{4})/);
      const year = yearMatch ? yearMatch[1] : '';

      // Classify: Substantive Laws and Acts are primary, SIs are secondary
      const isSubstantive = entry.category.toLowerCase().includes('substantive')
        || entry.category.toLowerCase().includes('act');
      const classification = isSubstantive ? 'ingestable' as const : 'ingestable' as const;

      return {
        id,
        title: entry.title,
        identifier: entry.title,
        url: entry.pdfUrl,
        status: 'in_force' as const,
        category: 'act' as const,
        classification,
        ingested: false,
        provision_count: 0,
        ingestion_date: null as string | null,
        issued_date: year ? `${year}-01-01` : '',
        source_category: entry.category,
      };
    });

  const census = {
    schema_version: '2.0',
    jurisdiction: 'BZ',
    jurisdiction_name: 'Belize',
    portal: 'agm.gov.bz',
    census_date: new Date().toISOString().split('T')[0],
    agent: 'belizean-law-mcp/census.ts',
    summary: {
      total_laws: laws.length,
      ingestable: laws.filter(l => l.classification === 'ingestable').length,
      ocr_needed: 0,
      inaccessible: 0,
      excluded: 0,
    },
    laws,
  };

  fs.writeFileSync(CENSUS_PATH, JSON.stringify(census, null, 2));

  console.log('\n==================================================');
  console.log('CENSUS COMPLETE');
  console.log('==================================================');
  console.log(`  Total laws discovered:  ${laws.length}`);
  console.log(`  Ingestable:             ${census.summary.ingestable}`);
  console.log(`\n  Output: ${CENSUS_PATH}`);
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
