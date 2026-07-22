# Graph Report - .  (2026-07-21)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 116 nodes · 179 edges · 12 communities (11 shown, 1 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `981ea9b5`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- compilerOptions
- dashboard.ts
- devDependencies
- App.tsx
- dependencies
- package.json
- ExecutiveCockpit.tsx
- Sidebar.tsx
- scoringEngine.ts

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 16 edges
2. `PortfolioKPIs` - 12 edges
3. `Initiative` - 7 edges
4. `ProjectExecution` - 7 edges
5. `ClosedProject` - 7 edges
6. `ViewMode` - 6 edges
7. `FilterState` - 6 edges
8. `ExecutiveCockpitProps` - 5 edges
9. `scripts` - 4 edges
10. `PortfolioAlert` - 4 edges

## Surprising Connections (you probably didn't know these)
- `ExcelUploaderModal()` --references--> `xlsx`  [EXTRACTED]
  src/components/modals/ExcelUploaderModal.tsx → package.json
- `HeaderProps` --references--> `FilterState`  [EXTRACTED]
  src/components/layout/Header.tsx → src/types/dashboard.ts
- `SidebarProps` --references--> `ViewMode`  [EXTRACTED]
  src/components/layout/Sidebar.tsx → src/types/dashboard.ts
- `ExecutiveCockpitProps` --references--> `PortfolioKPIs`  [EXTRACTED]
  src/components/modules/ExecutiveCockpit.tsx → src/types/dashboard.ts
- `ExecutiveCockpitProps` --references--> `ViewMode`  [EXTRACTED]
  src/components/modules/ExecutiveCockpit.tsx → src/types/dashboard.ts

## Import Cycles
- None detected.

## Communities (12 total, 1 thin omitted)

### Community 0 - "compilerOptions"
Cohesion: 0.09
Nodes (21): DOM, DOM.Iterable, ES2020, src, compilerOptions, allowImportingTsExtensions, isolatedModules, jsx (+13 more)

### Community 1 - "dashboard.ts"
Cohesion: 0.18
Nodes (16): Module1Prioritization(), Module1Props, Module2Execution(), Module2Props, Module3Benefits(), Module3Props, Module4NpsAdoption(), Module4Props (+8 more)

### Community 2 - "devDependencies"
Cohesion: 0.12
Nodes (17): autoprefixer, devDependencies, autoprefixer, postcss, tailwindcss, @types/react, @types/react-dom, typescript (+9 more)

### Community 3 - "App.tsx"
Cohesion: 0.24
Nodes (8): DrillDownItem, DrillDownModal(), DrillDownModalProps, mockAlerts, mockClosedProjects, mockInitiatives, mockKPIs, mockProjects

### Community 4 - "dependencies"
Cohesion: 0.17
Nodes (11): lucide-react, dependencies, lucide-react, react, react-dom, xlsx, react, react-dom (+3 more)

### Community 5 - "package.json"
Cohesion: 0.22
Nodes (8): name, private, scripts, build, dev, preview, type, version

### Community 6 - "ExecutiveCockpit.tsx"
Cohesion: 0.36
Nodes (6): Header(), HeaderProps, ExecutiveCockpit(), ExecutiveCockpitProps, FilterState, PortfolioAlert

### Community 7 - "Sidebar.tsx"
Cohesion: 0.38
Nodes (5): EasLogo(), EasLogoProps, Sidebar(), SidebarProps, ViewMode

## Knowledge Gaps
- **43 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+38 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `dependencies` to `package.json`?**
  _High betweenness centrality (0.294) - this node is a cross-community bridge._
- **Why does `ExcelUploaderModal()` connect `dependencies` to `App.tsx`?**
  _High betweenness centrality (0.278) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _43 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.09090909090909091 - nodes in this community are weakly interconnected._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.11764705882352941 - nodes in this community are weakly interconnected._