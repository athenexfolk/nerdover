import { readFileSync, existsSync, readdirSync, writeFileSync } from 'fs';
import { join, basename } from 'path';

const subject = process.argv[2];

if (!subject) {
    console.error('No subject specified.');
    process.exit(1);
}

const CONTENT_ROOT = join(__dirname, `../contents/${subject}`);
const OUTPUT_PATH = join(__dirname, `../menus/${subject}.index.ts`);

function readMeta(filePath) {
    try {
        const data = readFileSync(filePath, 'utf8');
        const lines = data
            .split('\n')
            .map((l) => l.trim())
            .filter(Boolean);
        const title = lines[0] || '';
        const order = lines.slice(1);
        return { title, order };
    } catch {
        return { title: '', order: [] };
    }
}

function readFirstLine(filePath) {
    try {
        const data = readFileSync(filePath, 'utf8');
        return data.split('\n')[0].replace(/^#\s*/, '').trim();
    } catch {
        return '';
    }
}

function buildAnchor(dir, slug) {
    const metaPath = join(dir, '_meta_');
    let title = slug;
    let order = [];
    if (existsSync(metaPath)) {
        const meta = readMeta(metaPath);
        title = meta.title || slug;
        order = meta.order;
    }

    // Gather all children (folders and .mdx files)
    const entries = readdirSync(dir, { withFileTypes: true }).filter(
        (entry) => entry.name !== '_meta_',
    );
    const children = [];
    for (const entry of entries) {
        const entryPath = join(dir, entry.name);
        if (entry.isDirectory()) {
            children.push({
                ...buildAnchor(entryPath, entry.name),
                __slug: entry.name,
            });
        } else if (entry.isFile() && entry.name.endsWith('.mdx')) {
            const fileTitle = readFirstLine(entryPath);
            const fileSlug = basename(entry.name, '.mdx');
            children.push({
                title: fileTitle,
                slug: fileSlug,
                type: 'item',
                __slug: fileSlug,
            });
        }
    }

    // Sort children by order in meta, then append any not listed
    let orderedChildren = [];
    if (order.length > 0) {
        // Add those in order
        for (const o of order) {
            const idx = children.findIndex((c) => c.__slug === o);
            if (idx !== -1) {
                orderedChildren.push(children[idx]);
                children.splice(idx, 1);
            }
        }
        // Append the rest (not listed in meta)
        orderedChildren = orderedChildren.concat(children);
    } else {
        orderedChildren = children;
    }

    // Remove __slug helper property
    orderedChildren = orderedChildren.map(({ __slug, ...rest }) => rest);

    return {
        title,
        slug,
        type: 'group',
        ...(orderedChildren.length ? { children: orderedChildren } : {}),
    };
}

function toTs(anchor) {
    const varName = `${subject}Anchor`;
    return `import type { Anchor } from '@/core/interfaces/anchor';\n\nexport const ${varName}: Anchor = ${JSON.stringify(anchor, null, 4)};\n`;
}

const anchor = buildAnchor(CONTENT_ROOT, subject);
const tsCode = toTs(anchor);

writeFileSync(OUTPUT_PATH, tsCode, 'utf8');
console.log(`${subject}.index.ts generated.`);

import { execSync } from 'child_process';
try {
    execSync(`pnpm prettier --write "${OUTPUT_PATH}"`, { stdio: 'inherit' });
    console.log('Formatted with Prettier.');
} catch (e) {
    console.warn('Prettier formatting failed:', e.message);
}
