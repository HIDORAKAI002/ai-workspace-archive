import { BigQuery } from '@google-cloud/bigquery';
import { promises as fs } from 'fs';

export interface SensitiveColumn {
  table_schema: string;
  table_name: string;
  column_name: string;
}

export const DEFAULT_SENSITIVE_PATTERNS: string[] = [
  // Names
  '%first_name%', '%last_name%', '%full_name%', '%fullname%',
  '%patient_name%', '%member_name%',
  // Contact
  '%email%', '%phone%', '%address%',
  '%zip_code%', '%zipcode%', '%postal_code%',
  // Identity
  '%ssn%', '%social_security%',
  '%date_of_birth%', '%dob%', '%birth_date%',
  '%mrn%', '%medical_record%',
  // Insurance
  '%insurance_id%', '%member_id%', '%subscriber_id%', '%npi%',
  // Secrets
  '%password%', '%token%', '%secret%',
  '%access_key%', '%api_key%', '%credential%',
];

// Validate that a LIKE pattern contains only safe characters (alphanumeric, %, _, .)
const SAFE_PATTERN = /^[a-zA-Z0-9_%.\-]+$/;

function validatePatterns(patterns: string[]): void {
  for (const p of patterns) {
    if (!SAFE_PATTERN.test(p)) {
      throw new Error(
        `Invalid sensitiveFieldPattern: "${p}". Patterns may only contain letters, digits, %, _, ., and -.`,
      );
    }
  }
}

export async function scanSensitiveFields(
  bigquery: BigQuery,
  patterns: string[],
  location: string = 'US'
): Promise<SensitiveColumn[]> {
  validatePatterns(patterns);

  const likeConditions = patterns
    .map(p => `LOWER(column_name) LIKE '${p}'`)
    .join('\n   OR ');

  const sql = `
    FROM \`region-${location.toLowerCase()}\`.INFORMATION_SCHEMA.COLUMNS
    |> WHERE ${likeConditions}
    |> AGGREGATE ARRAY_AGG(column_name ORDER BY column_name) AS columns
       GROUP BY table_schema, table_name
    |> ORDER BY table_schema, table_name
  `;

  console.error('Scanning all datasets for sensitive fields...');
  const [rows] = await bigquery.query({ query: sql, location });

  const results: SensitiveColumn[] = [];
  for (const row of rows) {
    for (const col of row.columns) {
      results.push({
        table_schema: row.table_schema,
        table_name: row.table_name,
        column_name: col,
      });
    }
  }

  console.error(`Found ${results.length} sensitive column(s) across ${rows.length} table(s)`);
  return results;
}

export function mergeFields(
  existing: Record<string, string[]>,
  discovered: SensitiveColumn[]
): Record<string, string[]> {
  const merged: Record<string, string[]> = {};
  for (const [key, value] of Object.entries(existing)) {
    merged[key] = [...value];
  }

  for (const { table_schema, table_name, column_name } of discovered) {
    const tableKey = `${table_schema}.${table_name}`;

    if (!merged[tableKey]) {
      merged[tableKey] = [];
    }

    const alreadyExists = merged[tableKey].some(
      (c) => c.toLowerCase() === column_name.toLowerCase()
    );

    if (!alreadyExists) {
      merged[tableKey].push(column_name);
    }
  }

  const sorted: Record<string, string[]> = {};
  for (const key of Object.keys(merged).sort((a, b) =>
    a.toLowerCase().localeCompare(b.toLowerCase())
  )) {
    sorted[key] = merged[key].sort((a, b) =>
      a.toLowerCase().localeCompare(b.toLowerCase())
    );
  }

  return sorted;
}

function isStale(lastScannedAt: string | undefined, frequencyDays: number): boolean {
  if (frequencyDays <= 0) return false;
  if (!lastScannedAt) return true; // Never scanned — always run
  const elapsedMs = Date.now() - new Date(lastScannedAt).getTime();
  const frequencyMs = frequencyDays * 24 * 60 * 60 * 1000;
  return elapsedMs >= frequencyMs;
}

export async function runDailyScanIfNeeded(
  bigquery: BigQuery,
  configPath: string,
  location: string = 'US'
): Promise<boolean> {
  // Read config to get frequency and patterns
  let existingConfig: Record<string, unknown> = {
    maximumBytesBilled: '10000000000',
    preventedFields: {},
  };

  try {
    const raw = await fs.readFile(configPath, 'utf-8');
    existingConfig = JSON.parse(raw);
  } catch {
    // Use defaults
  }

  const frequencyDays = typeof existingConfig.sensitiveFieldScanFrequencyDays === 'number'
    ? existingConfig.sensitiveFieldScanFrequencyDays
    : 1;

  const patterns = Array.isArray(existingConfig.sensitiveFieldPatterns)
    ? existingConfig.sensitiveFieldPatterns as string[]
    : DEFAULT_SENSITIVE_PATTERNS;

  const existingPreventedFields = (existingConfig.preventedFields ?? {}) as Record<string, string[]>;
  const lastScannedAt = typeof existingConfig.lastScannedAt === 'string' ? existingConfig.lastScannedAt : undefined;

  if (!isStale(lastScannedAt, frequencyDays)) {
    console.error(`Config is fresh (last scanned: ${lastScannedAt}, frequency: ${frequencyDays} day(s)), skipping sensitive field scan.`);
    return false;
  }

  console.error(lastScannedAt
    ? `Config is stale (last scanned: ${lastScannedAt}, frequency: ${frequencyDays} day(s)), running sensitive field scan...`
    : 'First startup — running sensitive field scan...'
  );

  const discovered = await scanSensitiveFields(bigquery, patterns, location);
  const merged = mergeFields(existingPreventedFields, discovered);

  const updatedConfig = { ...existingConfig, preventedFields: merged, lastScannedAt: new Date().toISOString() };
  await fs.writeFile(configPath, JSON.stringify(updatedConfig, null, 2) + '\n', 'utf-8');
  console.error(`Scan complete: config updated with ${Object.keys(merged).length} tables.`);

  return true;
}
