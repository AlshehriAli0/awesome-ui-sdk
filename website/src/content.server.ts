import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { parseResources } from './resources';

export const resources = parseResources(readFileSync(join(process.cwd(), 'README.md'), 'utf8'));
