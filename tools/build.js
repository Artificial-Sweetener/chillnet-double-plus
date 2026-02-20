const path = require('path');

const esbuild = require('esbuild');

const { loadBanner } = require('./banner');

const entryPoint = path.join(__dirname, '..', 'src', 'entry', 'userscript.js');
const outFile = path.join(__dirname, '..', 'chillnet-double-plus.user.js');

/**
 * Builds the userscript artifact.
 *
 * Why:
 * A deterministic single-file output keeps installation simple and aligns
 * with userscript-manager expectations.
 *
 * @returns {Promise<void>}
 */
async function build() {
  await esbuild.build({
    entryPoints: [entryPoint],
    outfile: outFile,
    bundle: true,
    format: 'iife',
    platform: 'browser',
    target: ['es2018'],
    banner: {
      js: loadBanner(),
    },
    logLevel: 'info',
  });
}

build().catch(() => process.exit(1));
