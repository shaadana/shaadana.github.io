'use strict';

// Portfolio applications. Visitor reading notes stay in this browser.
Object.assign(iconPaths, {
  community: '<path fill="#594735" d="M12 3h8v8h-8zM2 8h7v7H2zm21 0h7v7h-7zM9 14h14v16H9zM1 18h7v10H1zm23 0h7v10h-7z"/><path fill="#d6ac77" d="M13 4h6v6h-6zM3 9h5v5H3zm21 0h5v5h-5z"/><path fill="#9aab84" d="M10 15h12v14H10z"/><path fill="#c78055" d="M2 19h5v8H2zm23 0h5v8h-5z"/>',
  governance: '<path fill="#5b4934" d="M4 3h24v16h-3v5h-5v4h-8v-4H7v-5H4z"/><path fill="#d6d0ae" d="M5 4h22v14h-3v5h-5v4h-6v-4H8v-5H5z"/><path fill="#718663" d="M9 13h4v4h3v-4h3V9h4v5h-3v4h-3v4h-5v-4H9z"/><path fill="#f1e6c7" d="M7 6h18v2H7z"/>',
  book: '<path fill="#5c4934" d="M2 4h12v2h4V4h12v24H18v2h-4v-2H2z"/><path fill="#e9d8ae" d="M3 5h10v2h3v20h-3v-1H3zm16 0h10v21H19v1h-2V7h2z"/><path fill="#b29a71" d="M5 10h7v1H5zm0 5h7v1H5zm0 5h7v1H5zm15-10h7v1h-7zm0 5h7v1h-7zm0 5h7v1h-7z"/>'
});

Object.assign(APPS, {
  python: {name:'Python Lab', title:'Python For Kids — lesson lab', icon:'code', path:'shaadana / teaching / python', status:'Co-founder & lead instructor · 2023–present'},
  community: {name:'Community', title:'Community projects', icon:'community', path:'shaadana / community', status:'Mentoring, leadership & student projects'},
  governance: {name:'AI Governance', title:'IAIMS — research & experience', icon:'governance', path:'shaadana / ai-governance', status:'Summer research intern · June–August 2026'},
  reading: {name:'Reading Room', title:'Research & reading', icon:'book', path:'shaadana / reading-room', status:'Reports, influences & your reading notes'}
});

function readLocal(key, fallback) {
  try { return localStorage.getItem(key) ?? fallback; } catch { return fallback; }
}
function writeLocal(key, value) {
  try { localStorage.setItem(key, value); return true; } catch { return false; }
}
function downloadFile(name, content, type) {
  const url = URL.createObjectURL(new Blob([content], {type}));
  const link = document.createElement('a'); link.href = url; link.download = name; link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

// Browser: navigation history belongs to the shell, never to a cross-origin frame.
const browserState = {history:[null], index:0};
const satOverviewURL = new URL('index.html#leaponsat',location.href).href;
function isLeapOnSAT(url) {
  return ['leaponsat.com','www.leaponsat.com'].includes(new URL(url).hostname);
}
function leapOnSATOverview() {
  return `<article class="page sat-overview"><div class="page-heading"><div><p class="eyebrow">PROJECT OVERVIEW · CO-FOUNDER</p><h1>LeapOnSAT</h1><p>SAT practice informed by engagement science and behavior design.</p></div>${icon('folder')}</div><div class="button-row">${external('https://leaponsat.com','Visit leaponsat.com ↗','primary-button')}</div><div class="study-facts"><div><strong>120</strong><span>ACTIVE USERS</span></div><div><strong>205+</strong><span>HOURS OF PRACTICE</span></div></div><p class="research-small">Activity figures from my supplied resume, including students and instructors.</p><div class="sat-overview-sections"><section><h2>About the platform</h2><p>LeapOnSAT is a platform for SAT preparation. Engagement science and behavior design inform its interface and how instructors communicate with students.</p></section><section><h2>My role</h2><p>I co-founded LeapOnSAT in October 2025 and helped develop the platform. Concepts from David Yeager’s Mentor Mindset informed our approach to math and English learning.</p></section><section><h2>In development</h2><p>We’re developing an affective extension of DRAKT, an adaptive knowledge-tracing model, to explore how estimated emotional states and cognitive load could inform student support. This work is in progress.</p></section></div></article>`;
}
function browserBookmarks() {
  return `<div class="browser-home"><h1>Bookmarks</h1><div class="bookmark-grid">${projects.filter(p=>p.url).map(p=>`<button class="bookmark" data-browse="${p.url}" data-label="${p.name}">${icon(p.icon)}<strong>${p.name}</strong><span>${new URL(p.url).hostname}</span></button>`).join('')}<button class="bookmark" data-browse="${new URL('archive/index.html',location.href).href}" data-label="Previous portfolio">${icon('computer')}<strong>Previous portfolio</strong><span>Archived version</span></button><button class="bookmark" data-browse="https://netflix-portfolio-shaadana.vercel.app/" data-label="Netflix portfolio">${icon('media')}<strong>Netflix portfolio</strong><span>Previous design</span></button></div></div>`;
}
function browserContent() {
  return `<div class="browser-navigation"><div class="browser-controls"><button data-browser-action="back" aria-label="Back" disabled>←</button><button data-browser-action="forward" aria-label="Forward" disabled>→</button><button data-browser-action="reload" aria-label="Reload page">↻</button><button data-browser-action="home" aria-label="Browser home">⌂</button></div><form id="browser-address-form"><label for="browser-address" class="sr-only">Website address</label><input id="browser-address" type="text" placeholder="Enter a website address" autocomplete="off" autocapitalize="none" spellcheck="false"><button type="submit">Go</button></form><a id="browser-external" href="#" target="_blank" rel="noopener noreferrer" aria-label="Open website in new tab" hidden>↗</a></div><div class="browser-bookmarks-bar" aria-label="Bookmarks">${projects.filter(p=>p.url).map(p=>`<button data-browse="${p.url}" data-label="${p.name}">${p.name}</button>`).join('')}</div><p id="browser-error" role="alert" hidden></p><div id="browser-viewport">${browserBookmarks()}</div><div class="browser-notice" id="browser-notice" hidden>Some websites block embeds. <a id="browser-fallback-link" target="_blank" rel="noopener noreferrer">Open in a new tab ↗</a></div>`;
}
function normalizeBrowserURL(value) {
  let address = value.trim();
  if (!address) throw new Error('Enter a website address.');
  if (address.startsWith('//')) address = 'https:' + address;
  if (!/^[a-z][a-z\d+.-]*:/i.test(address)) address = 'https://' + address;
  const url = new URL(address);
  if (!['https:','http:'].includes(url.protocol) || url.username || url.password) throw new Error('Use an http:// or https:// website address.');
  if (location.protocol === 'https:' && url.protocol === 'http:') url.protocol = 'https:';
  if (url.href === satOverviewURL) return 'https://leaponsat.com/';
  if (url.origin === location.origin && !url.pathname.includes('/archive/')) throw new Error('This desktop is already open. Choose a project or another website.');
  return url.href;
}
function navigateBrowser(value, label, addHistory = true) {
  try {
    const url = value === null ? null : normalizeBrowserURL(value);
    const entry = url ? {url, label:label || new URL(url).hostname} : null;
    if (addHistory) {
      browserState.history = browserState.history.slice(0,browserState.index+1);
      browserState.history.push(entry);
      if (browserState.history.length>50) browserState.history.shift();
      browserState.index = browserState.history.length-1;
    }
    renderBrowser(entry);
  } catch (error) {
    const box = $('#browser-error'); box.textContent = error.message; box.hidden = false;
    $('#browser-address').setAttribute('aria-invalid','true');
  }
}
function renderBrowser(entry) {
  const el = windows.get('browser')?.el; if (!el) return;
  const satOverview = entry && isLeapOnSAT(entry.url);
  $('#browser-error').hidden = true; $('#browser-address').removeAttribute('aria-invalid');
  $('#browser-address').value = satOverview ? satOverviewURL : entry?.url || '';
  $('[data-browser-action="back"]').disabled = browserState.index===0;
  $('[data-browser-action="forward"]').disabled = browserState.index===browserState.history.length-1;
  $('[data-browser-action="reload"]').disabled = !entry;
  $('#browser-external').hidden = !entry; $('#browser-notice').hidden = !entry || satOverview;
  $('.window-title',el).textContent = satOverview ? 'LeapOnSAT — Project overview' : entry ? entry.label+' — Browser' : 'Browser';
  $('.window-status span',el).textContent = satOverview ? 'Project overview' : entry ? new URL(entry.url).hostname : 'Bookmarks';
  if (!entry) { $('#browser-viewport').innerHTML = browserBookmarks(); return; }
  $('#browser-external').href = entry.url; $('#browser-fallback-link').href = entry.url;
  if (satOverview) { $('#browser-viewport').innerHTML = leapOnSATOverview(); return; }
  const frame = document.createElement('iframe'); frame.className = 'browser-embed';
  frame.title = entry.label+' website'; frame.referrerPolicy = 'strict-origin-when-cross-origin';
  frame.setAttribute('sandbox','allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-downloads');
  frame.src = entry.url; $('#browser-viewport').replaceChildren(frame);
}

// Fixed examples introduce topics from Python For Kids; no arbitrary code is run.
const pythonLessons = [
  {id:'lists',name:'Lists',file:'01_class_roster.py',topic:'Store a group of names in a list.',code:'students = ["Maya", "Alex", "Riya"]\nstudents.append("Sam")\nprint(len(students))',question:'How many students are in the list?',choices:['3','4','Sam'],correct:1,explanation:'append() adds one item to the end. len() counts all four items.'},
  {id:'functions',name:'Functions',file:'02_small_steps.py',topic:'Reuse a calculation with a function.',code:'def practice_minutes(days, minutes):\n    return days * minutes\n\nprint(practice_minutes(4, 15))',question:'What does this function print?',choices:['19','15','60'],correct:2,explanation:'The function receives 4 and 15, then returns their product: 60.'},
  {id:'loops',name:'Loops',file:'03_progress_log.py',topic:'Repeat an action for each item.',code:'completed = [2, 3, 1]\ntotal = 0\n\nfor exercises in completed:\n    total += exercises\n\nprint(total)',question:'What is the total after the loop?',choices:['6','3','1'],correct:0,explanation:'The loop adds 2, then 3, then 1 to total. The final value is 6.'}
];
const pythonState = {lesson:'lists',answers:{}};
function pythonExercise() {
  const lesson = pythonLessons.find(item=>item.id===pythonState.lesson);
  const answer = pythonState.answers[lesson.id];
  return `<div class="lesson-file"><span>${lesson.file}</span><span>Python 3</span></div><pre class="lesson-code"><code>${escapeHTML(lesson.code)}</code></pre><div class="lesson-question"><p class="lesson-topic">${lesson.topic}</p><h2>${lesson.question}</h2><div class="answer-choices" role="group" aria-label="Predict the output">${lesson.choices.map((choice,i)=>`<button data-python-answer="${i}" aria-pressed="${answer===i}"><span>${String.fromCharCode(65+i)}</span><code>${choice}</code></button>`).join('')}</div><p class="lesson-feedback" role="status">${answer===undefined?'Choose an output to check your answer.':answer===lesson.correct?'Correct. '+lesson.explanation:'Try again. '+(lesson.id==='lists'?'Start with three names, then add one.':lesson.id==='functions'?'The * operator multiplies the two arguments.':'Follow total through each of the three additions.')}</p></div>`;
}
function pythonContent() {
  return `<article class="page portfolio-app-page"><div class="page-heading"><div><p class="eyebrow">Teaching · November 2023–present</p><h1>Python For Kids</h1><p>I co-founded the program, co-created its beginner curriculum, and coached student instructors.</p></div>${icon('code')}</div><div class="teaching-stats"><div><strong>140</strong><span>students in the USA & India</span></div><div><strong>8</strong><span>co-instructors trained</span></div><div><strong>90%</strong><span>assignment completion</span></div></div><p class="app-caption">Four six-week camps across 2023–2025.</p><div class="app-section-heading"><h2>Try a lesson</h2><span>Portfolio examples</span></div><p class="app-description">Three short exercises illustrating topics from the beginner curriculum.</p><div class="lesson-tabs" role="group" aria-label="Lesson topic">${pythonLessons.map((lesson,i)=>`<button data-lesson="${lesson.id}" aria-pressed="${pythonState.lesson===lesson.id}"><span>0${i+1}</span> ${lesson.name}</button>`).join('')}</div><section id="python-exercise" class="lesson-editor" aria-label="Python exercise">${pythonExercise()}</section><div class="app-source-row"><span>Program details from the supplied resume.</span><button class="text-button" data-app="resume">View experience ↗</button></div></article>`;
}

const communityProjects = [
  {id:'nova',name:'NOVA',category:'Education',role:'Mentor through LeapOnward',title:'A student-led Java bootcamp',description:'I coached students at Navigators of the Virtual Age as they developed a summer Java coding bootcamp, helping them turn an interest in coding into a community project.',metric:'$2,000',metricLabel:'helped raise for NOVA',details:'The students led the project; my role was coaching and fundraising support.',link:true},
  {id:'link',name:'LINK',category:'Community',role:'Mentor through LeapOnward',title:'Two paths to public awareness',description:'I coached Linking Joints, Linking Lives on a 5K run raising awareness of osteoarthritis and a citizen science project raising awareness of radon levels.',metric:'$3,200',metricLabel:'helped raise for LINK',details:'Mentoring centered on developing students’ interests into projects that could benefit their community.',link:true},
  {id:'resolve',name:'ReSolve',category:'Education',role:'Mentor through LeapOnward',title:'An introduction to research',description:'I coached students developing a summer camp to teach research methodology through ReSolve.',metric:'Research',metricLabel:'methodology summer camp',details:'Part of LeapOnward’s work helping students discover their interests and develop community projects.',link:true},
  {id:'rec',name:'CHS REC Room',category:'Wellbeing',role:'Project creator · school partnership',title:'A place to pause at school',description:'I partnered with school administration and counseling staff to establish a physical room in the counselors’ office for de-stressing and emotional regulation.',metric:'$1,500',metricLabel:'2024 Change Bowl award',details:'The award supported designing and implementing the REC Room at Carroll High School.',link:true},
  {id:'shine',name:'House of Shine',category:'Community',role:'Intern team lead · 2024–2025; student judge · 2026',title:'Helping student ideas get funded',description:'I led a team organizing workshops, auctions, change drives, and gala fundraising to support student community improvement projects.',metric:'Nearly $12,000',metricLabel:'raised by the team',details:'I mentored 13 changemakers in 2025, helped select five finalist teams, served as an MC, and became the sole student judge for the 2026 Changebowl.'},
  {id:'cares',name:'Carroll Cares',category:'Education',role:'Strategy & operations manager · May 2024–present',title:'Opening doors to student research',description:'I developed an Austin chapter and organized research methodology workshops and national webinars connecting high school students with medical professionals and researchers.',metric:'Austin + national',metricLabel:'chapter development & webinars',details:'I also represented Carroll Cares at statewide healthcare conferences to present student research and build relationships for research opportunities.'}
];
const communityState = {filter:'All',selected:'nova'};
function communityList() {
  return communityProjects.filter(p=>communityState.filter==='All'||p.category===communityState.filter).map(p=>`<button class="file-item" data-community="${p.id}" aria-pressed="${communityState.selected===p.id}">${icon(p.category==='Wellbeing'?'heart':p.category==='Education'?'book':'community')}<span><strong>${p.name}</strong><small>${p.category}</small></span><span class="file-arrow" aria-hidden="true">›</span></button>`).join('');
}
function communityDetail() {
  const p = communityProjects.find(item=>item.id===communityState.selected);
  return `<p class="dossier-meta">${p.role}</p><h2>${p.title}</h2><p>${p.description}</p><div class="community-metric"><strong>${p.metric}</strong><span>${p.metricLabel}</span></div><p>${p.details}</p><div class="button-row">${p.link?external('https://leapon.org','LeapOnward ↗','text-button'):''}<button class="text-button" data-app="resume">View resume ↗</button></div>`;
}
function communityContent() {
  return `<article class="page portfolio-app-page"><div class="page-heading"><div><p class="eyebrow">Mentoring & student leadership</p><h1>Community projects</h1><p>Projects I helped create, and student ideas I helped develop.</p></div>${icon('community')}</div><div class="filter-row" role="group" aria-label="Community project category">${['All','Education','Community','Wellbeing'].map(category=>`<button class="filter-chip" data-community-filter="${category}" aria-pressed="${communityState.filter===category}">${category}</button>`).join('')}</div><div class="file-explorer"><nav class="file-list" id="community-list" aria-label="Community projects">${communityList()}</nav><section class="dossier" id="community-detail" aria-label="Selected community project">${communityDetail()}</section></div></article>`;
}

const governanceFiles = [
  {id:'frameworks',label:'Framework review',number:'01',subtitle:'Policy & measurement',title:'Reading policy for evidence',body:'I researched 50+ AI governance frameworks, including the NIST AI Risk Management Framework, federal and state AI policies, and EdTech standards.',detail:'The review examined implications for AI measurement, evidence generation, and governance in K–12 and higher education.',items:['AI governance frameworks','Federal & state policies','Education-specific standards'],caption:'Research scope'},
  {id:'workflows',label:'Workflow testing',number:'02',subtitle:'NLP & agentic workflows',title:'Designing and testing workflows',body:'I designed and tested an NLP-based founder onboarding workflow, and supported the development and testing of Model Context Protocol (MCP) agentic workflows.',detail:'The work used AWS and AI tools as part of the institute’s research and development.',items:['Founder onboarding','Natural language processing','MCP workflow testing'],caption:'Areas of contribution'},
  {id:'presentation',label:'IEEE presentation',number:'03',subtitle:'IEEE TEMSCON Global 2026',title:'Presenting the work',body:'I helped develop the presentation for “Turning Policy Documents into Evidence: Building Measurement Infrastructure for Operational AI Governance.”',detail:'I co-presented on behalf of IAIMS at IEEE TEMSCON Global 2026.',items:['Presentation development','Conference co-presentation'],caption:'My role'}
];
let governanceSelected = 'frameworks';
function governanceDetail() {
  const file = governanceFiles.find(item=>item.id===governanceSelected);
  return `<p class="dossier-meta">${file.subtitle}</p><h2>${file.title}</h2><p>${file.body}</p><p>${file.detail}</p><h3 class="dossier-label">${file.caption}</h3><ul class="evidence-list">${file.items.map(item=>`<li>${item}</li>`).join('')}</ul>`;
}
function governanceContent() {
  return `<article class="page portfolio-app-page"><div class="page-heading"><div><p class="eyebrow">Summer research internship · June–August 2026</p><h1>AI governance</h1><p>The Institute for AI Measurement Science (IAIMS)</p></div>${icon('governance')}</div><nav class="dossier-steps" aria-label="Internship contributions">${governanceFiles.map(file=>`<button data-governance="${file.id}" aria-pressed="${file.id===governanceSelected}"><span>${file.number}</span>${file.label}</button>`).join('')}</nav><section class="governance-dossier dossier" id="governance-detail" aria-label="Selected internship contribution">${governanceDetail()}</section><div class="app-source-row"><span>Experience documented in the supplied resume.</span><button class="text-button" data-app="resume">View resume ↗</button></div></article>`;
}

const readingSources = [
  {id:'overview',name:'Start here',type:'Research overview',title:'Emotion, learning, and prediction',author:'Independent research with Sanah Rajesh',summary:'We compared knowledge-tracing models with and without estimated affect scores. The outcome was prediction of a student’s next answer, an indirect signal of knowledge.',takeaway:'The studies test a particular modeling approach. They do not establish causation or measure mastery directly.',url:'assets/research-overview.md',linkLabel:'Read overview ↓',download:true,related:'research'},
  {id:'bkt',name:'Bayesian model',type:'BKT report',title:'Affect-aware Bayesian Knowledge Tracing',author:'Independent research with Sanah Rajesh',summary:'Across five ASSISTments 2012 runs, the affect model’s average RMSE was 0.561892, compared with 0.562044 for the baseline. All five runs improved slightly.',takeaway:'The average relative improvement was 0.0270%, below the study’s chosen 1% threshold for practical improvement.',url:'https://docs.google.com/document/d/1_D0FpDlmloKEWEc5UA-5sR3ZJr8Cz7HYX_xLOMC_QRo',local:'assets/research-bkt.md',related:'research'},
  {id:'dkt',name:'Deep model',type:'DKT report',title:'Affect-aware Deep Knowledge Tracing',author:'Independent research with Sanah Rajesh',summary:'Across 15 ASSISTments 2012 runs, the affect model’s average RMSE was 0.531231, compared with 0.531145 for the baseline. Three runs improved; none reached the 1% criterion.',takeaway:'Average prediction accuracy did not improve in this setup. That finding does not imply that emotions are irrelevant to learning.',url:'https://docs.google.com/document/d/1_Rb2VhF3EPkhXp4S-fbPOjkiuMVX2OxEw6DpGN78IF8',local:'assets/research-dkt.md',related:'research'},
  {id:'synthesis',name:'Study synthesis',type:'Combined findings',title:'What these experiments can tell us',author:'Independent research with Sanah Rajesh',summary:'The analysis retained 2,172,029 responses from 28,998 students in ASSISTments 2012 and incorporated estimates of frustration, confusion, concentration, and boredom.',takeaway:'Adding these estimates produced no meaningful accuracy gain under the tested conditions. Repeated data splits are not independent replications.',url:'https://docs.google.com/document/d/1yfoUv8K9mfVkCtiyel5VBhEsRWfVKpuLM5RXYquWNuc',local:'assets/research-synthesis.md',related:'research'},
  {id:'yeager',name:'10 to 25',type:'Influence',title:'10 to 25',author:'David Yeager',summary:'Mentor Mindset informed my approach to student engagement and instructor communication in LeapOnSAT and LeapOnward.',takeaway:'A connection to my work: how we communicate with students is part of designing a learning experience.',url:'https://www.google.com/search?kgmid=%2Fg%2F11vk1zq0r1&q=10+to+25%3A+The+Science+of+Motivating+Young+People%3A+A+Groundbreaking+Approach+to+Leading+the+Next+Generation%E2%80%94And+Making+Your+Own+Life+Easier',linkLabel:'Find the book ↗',related:'sat'}
];
const readingState = {selected:'overview',notes:{},undo:{}};
try {
  const saved = JSON.parse(readLocal('sr-reading-notes','{}'));
  readingSources.forEach(source=>{if(typeof saved?.[source.id]==='string')readingState.notes[source.id]=saved[source.id];});
} catch { /* A damaged or unavailable store starts with an empty notebook. */ }
function readingDetail() {
  const source = readingSources.find(item=>item.id===readingState.selected);
  return `<p class="dossier-meta">${source.type}</p><h2>${source.title}</h2><p class="reading-author">${source.author}</p><p>${source.summary}</p><div class="reading-takeaway"><p>${source.takeaway}</p></div><div class="reading-links">${source.download?`<a class="text-button" href="${source.url}" download>${source.linkLabel}</a>`:external(source.url,source.linkLabel||'Original report ↗','text-button')}${source.local?`<a class="text-button" href="${source.local}" download>Download .md ↓</a>`:''}<button class="text-button" ${source.related==='sat'?'data-project="sat"':'data-app="research"'}>${source.related==='sat'?'LeapOnSAT overview':'Explore the results'} ↗</button></div><section class="reading-notebook"><div class="app-section-heading"><h3><label for="reading-notes">Your reading notes</label></h3><span>Saved on this device</span></div><textarea id="reading-notes" placeholder="A question, a connection, something to revisit…" spellcheck="true" aria-describedby="reading-save-status">${escapeHTML(readingState.notes[source.id]||'')}</textarea><div class="notebook-actions"><button data-reading-action="download">Save .txt ↓</button><button data-reading-action="clear">Clear</button><button data-reading-action="undo" ${Object.hasOwn(readingState.undo,source.id)?'':'disabled'}>Undo clear</button></div><p class="app-caption" id="reading-save-status" role="status">Your notes stay in this browser.</p></section>`;
}
function readingContent() {
  return `<article class="page portfolio-app-page"><div class="page-heading"><div><p class="eyebrow">Research reports & influences</p><h1>Reading room</h1><p>A closer look at the research, with a notebook for your own questions.</p></div>${icon('book')}</div><div class="file-explorer reading-explorer"><nav class="file-list" aria-label="Reading selections">${readingSources.map(source=>`<button class="file-item" data-reading="${source.id}" aria-pressed="${readingState.selected===source.id}">${icon(source.id==='yeager'?'book':'research')}<span><strong>${source.name}</strong><small>${source.type}</small></span></button>`).join('')}</nav><section class="dossier reading-detail" id="reading-detail" aria-label="Selected reading and notes">${readingDetail()}</section></div></article>`;
}
function saveReadingNote() {
  readingState.notes[readingState.selected] = $('#reading-notes').value;
  const saved = writeLocal('sr-reading-notes',JSON.stringify(readingState.notes));
  $('#reading-save-status').textContent = saved?'Saved in this browser.':'Browser storage is unavailable. Save a .txt copy to keep your notes.';
}
function exportReadingNote() {
  const source = readingSources.find(item=>item.id===readingState.selected);
  downloadFile(`reading-${source.id}.txt`,`${source.title}\n${new URL(source.url,location.href).href}\n\n${readingState.notes[source.id]||''}`,'text/plain;charset=utf-8');
}

Object.assign(templates,{browser:browserContent,python:pythonContent,community:communityContent,governance:governanceContent,reading:readingContent});
function initializeDesktopApp(id) {
  if(id==='browser')renderBrowser(browserState.history[browserState.index]);
}

document.addEventListener('submit',event=>{
  if(event.target.id==='browser-address-form'){event.preventDefault();navigateBrowser($('#browser-address').value);}
});
document.addEventListener('input',event=>{if(event.target.id==='reading-notes')saveReadingNote();});
document.addEventListener('click',event=>{
  const bookmark=event.target.closest('[data-browse]');
  if(bookmark){navigateBrowser(bookmark.dataset.browse,bookmark.dataset.label);return;}
  const action=event.target.closest('[data-browser-action]')?.dataset.browserAction;
  if(action){
    if(action==='home')navigateBrowser(null);
    if(action==='back'&&browserState.index>0)renderBrowser(browserState.history[--browserState.index]);
    if(action==='forward'&&browserState.index<browserState.history.length-1)renderBrowser(browserState.history[++browserState.index]);
    if(action==='reload')renderBrowser(browserState.history[browserState.index]);
    return;
  }
  const lesson=event.target.closest('[data-lesson]');
  if(lesson){
    pythonState.lesson=lesson.dataset.lesson;
    $$('[data-lesson]').forEach(button=>button.setAttribute('aria-pressed',String(button===lesson)));
    $('#python-exercise').innerHTML=pythonExercise();
  }
  const answer=event.target.closest('[data-python-answer]');
  if(answer){
    pythonState.answers[pythonState.lesson]=Number(answer.dataset.pythonAnswer);
    const holder=document.createElement('div');holder.innerHTML=pythonExercise();
    $('.lesson-feedback').textContent=$('.lesson-feedback',holder).textContent;
    $$('[data-python-answer]').forEach(button=>button.setAttribute('aria-pressed',String(button===answer)));
  }
  const communityFilter=event.target.closest('[data-community-filter]');
  if(communityFilter){
    communityState.filter=communityFilter.dataset.communityFilter;
    const visible=communityProjects.filter(p=>communityState.filter==='All'||p.category===communityState.filter);
    if(!visible.some(p=>p.id===communityState.selected))communityState.selected=visible[0].id;
    $$('[data-community-filter]').forEach(button=>button.setAttribute('aria-pressed',String(button===communityFilter)));
    $('#community-list').innerHTML=communityList();$('#community-detail').innerHTML=communityDetail();
  }
  const community=event.target.closest('[data-community]');
  if(community){
    communityState.selected=community.dataset.community;
    $$('[data-community]').forEach(button=>button.setAttribute('aria-pressed',String(button===community)));
    $('#community-detail').innerHTML=communityDetail();
  }
  const governance=event.target.closest('[data-governance]');
  if(governance){
    governanceSelected=governance.dataset.governance;
    $$('[data-governance]').forEach(button=>button.setAttribute('aria-pressed',String(button===governance)));
    $('#governance-detail').innerHTML=governanceDetail();
  }
  const reading=event.target.closest('[data-reading]');
  if(reading){
    readingState.selected=reading.dataset.reading;
    $$('[data-reading]').forEach(button=>button.setAttribute('aria-pressed',String(button===reading)));
    $('#reading-detail').innerHTML=readingDetail();
  }
  const noteAction=event.target.closest('[data-reading-action]')?.dataset.readingAction;
  if(noteAction==='download')exportReadingNote();
  if(noteAction==='clear'){
    readingState.undo[readingState.selected]=$('#reading-notes').value;
    $('#reading-notes').value='';saveReadingNote();$('[data-reading-action="undo"]').disabled=false;
  }
  if(noteAction==='undo'&&Object.hasOwn(readingState.undo,readingState.selected)){
    $('#reading-notes').value=readingState.undo[readingState.selected];
    delete readingState.undo[readingState.selected];saveReadingNote();$('[data-reading-action="undo"]').disabled=true;
  }
});
document.addEventListener('keydown',event=>{
  if(activeId==='reading'&&(event.ctrlKey||event.metaKey)&&event.key.toLowerCase()==='s'){
    event.preventDefault();exportReadingNote();
  }
});

const desktopAppIds=['welcome','work','browser','research','about','media','resume','messages','python','community','governance','reading'];
const shortcuts=[{project:'sat',name:'LeapOnSAT',icon:'folder'},{project:'calculus',name:'Calculus Clinic',icon:'code'},{project:'journal',name:'Journalling',icon:'note'}];
$('#desktop-icons').innerHTML=desktopAppIds.map(id=>`<button class="desktop-icon" data-app="${id}" aria-label="Open ${APPS[id].name}">${icon(APPS[id].icon)}<span>${APPS[id].name}</span></button>`).join('')+shortcuts.map(p=>`<button class="desktop-icon shortcut-icon" data-project="${p.project}" aria-label="Open ${p.name}">${icon(p.icon)}<span>${p.name}</span></button>`).join('');
$('#start-apps').innerHTML=desktopAppIds.map(id=>`<button data-app="${id}">${icon(APPS[id].icon)}${APPS[id].name}</button>`).join('')+'<div class="start-section">WEBSITES</div>'+shortcuts.map(p=>`<button data-project="${p.project}">${icon(p.icon)}${p.name}</button>`).join('');
if(readLocal('sr-wallpaper','warm')==='dusk'){document.body.classList.add('dusk');$('#toggle-wallpaper').textContent='Switch to warm wallpaper';$('#toggle-wallpaper').setAttribute('aria-pressed','true');}
openApp('welcome',{focus:false});
if(location.hash==='#leaponsat')openApp('browser',{project:'sat',focus:false});
