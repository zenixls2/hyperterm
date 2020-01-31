import {clipboard} from 'electron';

const getPath = platform => {
  switch (platform) {
    case 'darwin': {
      return null;
    }
    case 'win32': {
      const filepath = clipboard.read('FileNameW');
      return filepath.replace(new RegExp(String.fromCharCode(0), 'g'), '');
    }
    // Linux already pastes full path
    default:
      return null;
  }
};

export default function processClipboard() {
  return getPath(process.platform);
}
