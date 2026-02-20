const fs = require('fs');
const path = require('path');

const metadataPath = path.join(__dirname, '..', 'src', 'entry', 'metadata.user.js');
const packagePath = path.join(__dirname, '..', 'package.json');

/**
 * Loads and versions metadata at build time.
 *
 * Why:
 * Userscript managers rely on metadata comments as install/update contract.
 * Version drift between package and metadata is a common release failure mode.
 *
 * @returns {string}
 */
function loadBanner() {
  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  const metadata = fs.readFileSync(metadataPath, 'utf8');
  return (
    metadata.replace(/\/\/ @version\s+.*/, `// @version      ${packageJson.version}`).trim() + '\n'
  );
}

module.exports = {
  loadBanner,
};
