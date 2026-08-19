const fs = require('fs');
const path = require('path');
const src = path.join(__dirname, 'src');

<// 1. Module2Execution.tsx
const mod2Path = path.join(src, 'components', 'modules', 'Module2Execution.tsx');
let mod2Content = fs.readFileSync(mod2Path, 'utf8');

if (!mod2Content.includes('formatNumber')) {
  mod2Content = mod2Content.replace(
    "import { KanbanSquare as Kanban, CheckCircle, AlertTriangle, XCircle, Eye } from 'lucide-react';",
    "import { KanbanSquare as Kanban, CheckCircle, AlertTriangle, XCircle, Eye } from 'lucide-react';\nimport {
 formatNumber, formatMillions, normalizeDateStr, parseMonthDay } from '../../utils/formatters';"
  );
  fs.writeFileSync(mod2Path, mod2Content, 'utf8');
  console.log('Module2Execution.tsx inatial imports updated');
}
