import fs from 'fs';
import path from 'path';

const files = fs.readdirSync('src/components/views').filter(f => f.endsWith('.tsx')).map(f => path.join('src/components/views', f));

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  // replace iconBgColor and iconColor
  content = content.replace(/iconBgColor="bg-([a-z]+)-50"[\s\n]*iconColor="text-\1-[0-9]+"/g, 'color="$1"');
  // also fix trendData -> classTrendDataNew as classTrendData
  content = content.replace(/import \{([^}]*)\btrendData\b([^}]*)\} from '@\/mock-data';/g, "import {$1classTrendDataNew$2} from '@/mock-data';");
  fs.writeFileSync(file, content);
});
