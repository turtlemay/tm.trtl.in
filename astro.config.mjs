// @ts-check

import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import relativeLinks from 'astro-relative-links';

// https://astro.build/config
export default defineConfig({
    site: 'https://tm.trtl.in',
    integrations: [mdx(), relativeLinks()],
    markdown: {
        syntaxHighlight: false,
    },
});
