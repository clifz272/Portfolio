import {writeFile, mkdir} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
const directory = new URL('../dist/assets/projects/', import.meta.url);
await mkdir(directory, {recursive:true});
const escape = value => value.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const box = (x,y,lines) => `<g><rect x="${x}" y="${y}" width="330" height="130" rx="16" fill="#192640" stroke="#899fde" stroke-width="2"/><text x="${x+165}" y="${y+(lines.length===1?78:57)}" text-anchor="middle" fill="#e7ecf5" font-size="38" font-weight="600">${lines.map((line,i)=>`<tspan x="${x+165}" dy="${i?47:0}">${escape(line)}</tspan>`).join('')}</text></g>`;
const arrow = path => `<path d="${path}" fill="none" stroke="#a9befa" stroke-width="3" marker-end="url(#arrow)"/>`;
const frame = (title,content) => `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="600" viewBox="0 0 900 600" role="img" aria-labelledby="title"><title id="title">${escape(title)}</title><defs><marker id="arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0 8 4 0 8" fill="#a9befa"/></marker></defs><rect width="900" height="600" fill="#0b1020"/><g font-family="Manrope,Arial,sans-serif"><text x="60" y="68" fill="#a9befa" font-size="32" font-weight="600">${escape(title)}</text>${content}</g></svg>`;
const serpentine = labels => box(60,140,labels[0])+box(510,140,labels[1])+box(510,390,labels[2])+box(60,390,labels[3])+arrow('M395 205H500')+arrow('M675 280V380')+arrow('M500 455H400');
const files = {
  'sandscape-workflow.svg':frame('From depth to projected terrain',serpentine([['Depth camera'],['Python','processing'],['Terrain layers'],['Projector']])),
  'shuttle-workflow.svg':frame('From passenger input to a schedule',serpentine([['Validate inputs'],['Scheduling','strategy'],['Assign shuttles'],['Save schedules']])),
  'clinic-workflow.svg':frame('From preferences to a walking route',serpentine([['Map + route','preferences'],['Build a graph'],["Dijkstra's",'algorithm'],['Route map']])),
  'live-bus-workflow.svg':frame('Planned bus-data workflow',box(60,135,['Transport APIs'])+box(510,135,['Python','application'])+box(60,395,['SQL storage'])+box(510,395,['NoSQL storage'])+arrow('M395 200H500')+arrow('M675 275V383')+arrow('M565 275V325H225V383'))
};
for(const [name,svg] of Object.entries(files)) await writeFile(new URL(name,directory),svg+'\n');
console.log(`Created ${Object.keys(files).length} workflow diagrams in ${fileURLToPath(directory)}`);
