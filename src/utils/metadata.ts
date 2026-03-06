/**
 * Response metadata utilities for Belizean Law MCP.
 */

import type Database from '@ansvar/mcp-sqlite';

export interface ResponseMetadata {
  data_source: string;
  jurisdiction: string;
  disclaimer: string;
  freshness?: string;
  note?: string;
  query_strategy?: string;
}

export interface ToolResponse<T> {
  results: T;
  _metadata: ResponseMetadata;
}

export function generateResponseMetadata(
  db: InstanceType<typeof Database>,
): ResponseMetadata {
  let freshness: string | undefined;
  try {
    const row = db.prepare(
      "SELECT value FROM db_metadata WHERE key = 'built_at'"
    ).get() as { value: string } | undefined;
    if (row) freshness = row.value;
  } catch {
    // Ignore
  }

  return {
    data_source: 'Belize Laws (belizelaw.org) — Belize Attorney General\'s Ministry',
    jurisdiction: 'BZ',
    disclaimer:
      'This data is sourced from the Laws of Belize under Government Open Data principles. ' +
      'The authoritative versions are maintained by the Attorney General\'s Ministry of Belize. ' +
      'Always verify with the official Belize Laws portal (belizelaw.org).',
    freshness,
  };
}
