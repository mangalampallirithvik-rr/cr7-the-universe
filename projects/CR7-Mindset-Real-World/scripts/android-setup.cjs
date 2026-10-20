const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const root = path.resolve(__dirname, '..');
const androidDir = path.join(root, 'android');
const isWin = process.platform === 'win32';
const npx = isWin ? 'npx.cmd' : 'npx';
function run(cmd, args) {
  const result = spawnSync(cmd, args, { cwd: root, stdio: 'inherit', shell: isWin });
  if (result.status !== 0) process.exit(result.status || 1);
}
if (!fs.existsSync(path.join(root, 'node_modules'))) run(isWin ? 'npm.cmd' : 'npm', ['install']);
const webDir = path.join(root, 'web');
fs.mkdirSync(webDir, { recursive: true });
fs.copyFileSync(path.join(root, 'index.html'), path.join(webDir, 'index.html'));
fs.rmSync(path.join(webDir, 'assets'), { recursive: true, force: true });
fs.cpSync(path.join(root, 'assets'), path.join(webDir, 'assets'), { recursive: true });
if (!fs.existsSync(androidDir)) {
  console.log('\nAdding Capacitor Android platform...');
  run(npx, ['cap', 'add', 'android']);
}
console.log('\nSyncing web app into Android project...');
run(npx, ['cap', 'sync', 'android']);
const res = path.join(androidDir, 'app', 'src', 'main', 'res');
const icon = path.join(root, 'assets', 'icon.png');
if (fs.existsSync(res) && fs.existsSync(icon)) {
  const sizes = { 'mipmap-mdpi': 48, 'mipmap-hdpi': 72, 'mipmap-xhdpi': 96, 'mipmap-xxhdpi': 144, 'mipmap-xxxhdpi': 192 };
  // Create launcher-sized PNGs using the bundled Python/Pillow only if available; otherwise use the supplied logo variants.
  const variants = { 'mipmap-mdpi': 'logo-64.png', 'mipmap-hdpi': 'logo-128.png', 'mipmap-xhdpi': 'logo-128.png', 'mipmap-xxhdpi': 'logo-256.png', 'mipmap-xxxhdpi': 'logo-512.png' };
  for (const [folder, file] of Object.entries(variants)) {
    const targetDir = path.join(res, folder); fs.mkdirSync(targetDir, { recursive: true });
    const src = path.join(root, 'assets', file);
    fs.copyFileSync(src, path.join(targetDir, 'ic_launcher.png'));
    fs.copyFileSync(src, path.join(targetDir, 'ic_launcher_round.png'));
  }
  console.log('Applied CR7 Mindset launcher icon PNGs.');
}
console.log('\nAndroid project prepared. Opening Android Studio...');
run(npx, ['cap', 'open', 'android']);
