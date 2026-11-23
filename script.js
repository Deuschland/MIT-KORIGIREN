// TARIF20-OFF: редактор вмісту з локальним збереженням
const DEFAULT_FIELDS = [
  "Name", "Kostenträger-Nr.", "Kostenträger - Name / Ort", "Von Objekt / Ort",
  "Nach Objekt / Ort", "Zusatzfeld", "Tarif", "Statistik", "Zusatztext für Rechnung"
];
const DEFAULT_CATEGORIES = {
  "SCHMIEDER KLINIK": {icon:"fa-hospital",data:{"Name":"","Kostenträger-Nr.":"3491","Kostenträger - Name / Ort":"SCHMIEDER KLINIK","Von Objekt / Ort":"SCHM. GAILINGEN","Nach Objekt / Ort":"SCHM. ALLENSBACH / MRT","Zusatzfeld":"","Tarif":"","Statistik":"","Zusatztext für Rechnung":""},subOptions:[
    {label:"3 - Tragestuhl", "Tarif":"9211",icon:""},{label:"4 - gehfähig","Tarif":"9111",icon:"fa-person-walking"},{label:"5 - Rollstuhl","Tarif":"9711",icon:"fa-wheelchair-move"}]},
  "PRIVAT": {icon:"fa-user",data:{"Name":"","Kostenträger-Nr.":"1","Kostenträger - Name / Ort":"PRIVAT","Von Objekt / Ort":"WHG","Nach Objekt / Ort":"","Zusatzfeld":"","Tarif":"6600","Statistik":"","Zusatztext für Rechnung":""}},
  "Hilfeleistung bzw. Tragehilfen/privat": {icon:"fa-hands-helping",data:{"Name":"","Kostenträger-Nr.":"1","Kostenträger - Name / Ort":"Hilfeleistung bzw. Tragehilfen/privat","Von Objekt / Ort":"4204","Nach Objekt / Ort":"WHG","Zusatzfeld":"","Tarif":"2800","Statistik":"93","Zusatztext für Rechnung":"HOCH HELFEN"}},
  "HAUSNOTRUF": {icon:"fa-phone-volume",data:{"Name":"","Kostenträger-Nr.":"8","Kostenträger - Name / Ort":"HAUSNOTRUF","Von Objekt / Ort":"4204","Nach Objekt / Ort":"WHG","Zusatzfeld":"8","Tarif":"8609","Statistik":"89","Zusatztext für Rechnung":"HNR NR._ _ _ _ _"}},
  "ZFP Reichenau": {icon:"fa-clinic-medical",data:{"Name":"","Kostenträger-Nr.":"2775","Kostenträger - Name / Ort":"ZFP Reichenau","Von Objekt / Ort":"ZFP ST. 92","Nach Objekt / Ort":"","Zusatzfeld":"","Tarif":"9203","Statistik":"","Zusatztext für Rechnung":""}},
  "LEERFAHRT": {icon:"fa-car-side",data:{"Name":"DIENSTFAHRT","Kostenträger-Nr.":"9","Kostenträger - Name / Ort":"LEERFAHRT","Von Objekt / Ort":"4204","Nach Objekt / Ort":"4202 / 4203 / 4205 / 4206","Zusatzfeld":"7","Tarif":"Kein","Statistik":"91","Zusatztext für Rechnung":""}},
  "FEHLFAHRT": {icon:"fa-exclamation-triangle",data:{"Name":"FEHLFAHRT","Kostenträger-Nr.":"9","Kostenträger - Name / Ort":"LEERFAHRT","Von Objekt / Ort":"4204","Nach Objekt / Ort":"","Zusatzfeld":"6","Tarif":"Kein","Statistik":"81","Zusatztext für Rechnung":""}},
  "KRANKENHAUS": {icon:"fa-hospital-user",data:{},subOptions:[
    {label:"KH - KONSTANZ","Kostenträger - Name / Ort":"KH - KONSTANZ","Von Objekt / Ort":"ZNA MED KONSTANZ","Nach Objekt / Ort":"ZNA MED SINGEN","Statistik":"21","Kostenträger-Nr.":"1203","Tarif":"9101",icon:"fa-hospital"},
    {label:"DR. ZWICKER","Kostenträger - Name / Ort":"KH - KN","Von Objekt / Ort":"PO3","Nach Objekt / Ort":"ZWICKER","Statistik":"23 / 24","Kostenträger-Nr.":"1203","Tarif":"9101",icon:"fa-user-doctor"},
    {label:"KH - SINGEN","Kostenträger - Name / Ort":"KH - SINGEN","Von Objekt / Ort":"ZNA MED SINGEN","Nach Objekt / Ort":"ZNA MED KONSTANZ","Statistik":"21","Kostenträger-Nr.":"3214","Tarif":"9201",icon:"fa-hospital"},
    {label:"KH - STOCKACH","Kostenträger - Name / Ort":"KH - STOCKACH","Von Objekt / Ort":"ZNA MED STOCKACH","Nach Objekt / Ort":"ZNA MED KONSTANZ","Statistik":"21","Kostenträger-Nr.":"3151","Tarif":"9203",icon:"fa-hospital"}]},
  "HEGAU JUGENDWERK": {icon:"fa-user-md",data:{"Name":"","Kostenträger-Nr.":"3472","Kostenträger - Name / Ort":"","Von Objekt / Ort":"","Nach Objekt / Ort":"","Zusatzfeld":"","Tarif":"9201","Statistik":"","Zusatztext für Rechnung":""}},
  "Tarife für Rollstuhlfahrten": {icon:"fa-notes-medical",data:{},subOptions:[
    {label:"DAK","Kostenträger - Name / Ort":"DAK","Kostenträger-Nr.":"600","Tarif":"7611",icon:"fa-wheelchair"},{label:"TK","Kostenträger - Name / Ort":"TK","Kostenträger-Nr.":"163","Tarif":"7611",icon:"fa-wheelchair"},{label:"BEK","Kostenträger - Name / Ort":"BEK","Kostenträger-Nr.":"748","Tarif":"7611",icon:"fa-wheelchair"},{label:"KKH","Kostenträger - Name / Ort":"KKH","Kostenträger-Nr.":"590","Tarif":"7611",icon:"fa-wheelchair"},{label:"hkk","Kostenträger - Name / Ort":"hkk","Kostenträger-Nr.":"1602","Tarif":"7611",icon:"fa-wheelchair"},{label:"HEK","Kostenträger - Name / Ort":"HEK","Kostenträger-Nr.":"175","Tarif":"7611",icon:"fa-wheelchair"},{label:"IKK","Kostenträger - Name / Ort":"IKK","Kostenträger-Nr.":"1770","Tarif":"7621",icon:"fa-wheelchair"}]}
};
const STORAGE_KEY = 'tarif20-off-editor-v2';
const clone = value => JSON.parse(JSON.stringify(value));
function makeDefaultConfig(){
  const categories=clone(DEFAULT_CATEGORIES);
  Object.values(categories).forEach(c=>{c.data ||= {}; DEFAULT_FIELDS.forEach(f=>{if(!(f in c.data)) c.data[f]="";}); (c.subOptions||[]).forEach(o=>DEFAULT_FIELDS.forEach(f=>{if(!(f in o)) o[f]="";}));});
  return {title:'Tarif Auswahl',resetLabel:'Zurück',editLabel:'Редагувати',fields:[...DEFAULT_FIELDS],categories};
}
function loadConfig(){
  try { const saved=JSON.parse(localStorage.getItem(STORAGE_KEY)); if(saved && Array.isArray(saved.fields) && saved.categories){
    saved.fields=saved.fields.filter(f=>typeof f==='string'); Object.values(saved.categories).forEach(c=>{c.data ||= {}; (c.subOptions||[]).forEach(o=>{});}); return saved;
  }} catch(e){console.warn('Не вдалося прочитати збережені налаштування',e);}
  return makeDefaultConfig();
}
let config=loadConfig(), currentCategory=null, editorCategory=null;
const resetBtn=document.getElementById('reset-button'), menuContainer=document.getElementById('menu-buttons'), subOptions=document.getElementById('sub-options'), output=document.getElementById('output'), resetContainer=document.getElementById('reset-container');
const editBtn=document.getElementById('edit-button'), editor=document.getElementById('editor-panel'), appTitle=document.getElementById('app-title');
function save(){try{localStorage.setItem(STORAGE_KEY,JSON.stringify(config));}catch(e){alert('Не вдалося зберегти зміни. Можливо, зображення завелике — спробуйте менше.');}}
function esc(s){return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function createButton(text,iconClass,onClick,extraClass='',image){const btn=document.createElement('button');btn.className=`icon-button ${extraClass}`.trim();if(image){const img=document.createElement('img');img.src=image;img.alt='';img.className='button-image';btn.appendChild(img);}if(iconClass){const i=document.createElement('i');i.className=`fas ${iconClass}`;btn.appendChild(i);}const span=document.createElement('span');span.textContent=text;btn.appendChild(span);if(onClick)btn.addEventListener('click',onClick);return btn;}
function clearContainers(){menuContainer.textContent='';subOptions.textContent='';output.textContent='';}
function renderTable(entry){
  output.replaceChildren(); if(entry.image){const img=document.createElement('img');img.src=entry.image;img.alt='Зображення';img.className='detail-image';output.appendChild(img);}
  const table=document.createElement('div');table.className='vertical-table';
  config.fields.forEach((field,index)=>{const value=entry[field];if(value===undefined||String(value).trim()==='')return;const row=document.createElement('div');row.className='row';const label=document.createElement('div');label.className='label';label.textContent=field;const val=document.createElement('div');val.className='value';if(field===config.fields[1]||field.toLowerCase().includes('tarif'))val.classList.add('highlight');if(field===config.fields[5]||field.toLowerCase().includes('statistik'))val.classList.add('gros');val.textContent=value;row.append(label,val);table.appendChild(row);});output.appendChild(table);
}
function renderView(name){clearContainers();const category=config.categories[name];if(!category)return;currentCategory=name;menuContainer.appendChild(createButton(name,category.icon, null,'selected',category.image));resetContainer.style.display='block';if(category.subOptions?.length){category.subOptions.forEach(opt=>subOptions.appendChild(createButton(opt.label,opt.icon,()=>renderSubSelection(opt,category.data), '',opt.image)));}else renderTable(category.data||{});}
function renderSubSelection(option,baseData){subOptions.textContent='';subOptions.appendChild(createButton(option.label,option.icon,null,'sub-selected',option.image));renderTable({...baseData,...option});}
function resetView(){clearContainers();currentCategory=null;resetContainer.style.display='none';Object.entries(config.categories).forEach(([name,cat])=>menuContainer.appendChild(createButton(name,cat.icon,()=>renderView(name),'',cat.image)));}
function refreshCurrent(){if(currentCategory && config.categories[currentCategory])renderView(currentCategory);else resetView();}
resetBtn.addEventListener('click',resetView);
function updateTitle(){document.title=config.title;appTitle.textContent=config.title;resetBtn.textContent=config.resetLabel;editBtn.textContent=editor.classList.contains('open')?'Закрити редактор':'Редагувати';}
function inputRow(label,value,attrs=''){return `<label class="editor-field"><span>${esc(label)}</span><input ${attrs} value="${esc(value)}"></label>`;}
function renderEditor(){
  const names=Object.keys(config.categories);if(!editorCategory||!config.categories[editorCategory])editorCategory=names[0]||'';
  const cat=config.categories[editorCategory];
  let html=`<div class="editor-heading"><div><h2>Редактор додатка</h2><p>Зміни зберігаються автоматично на цьому пристрої.</p></div><button type="button" class="editor-close" data-action="close">✕</button></div>
  <section class="editor-section"><h3>Загальні написи</h3><div class="editor-grid">${inputRow('Назва додатка',config.title,'data-global="title"')}${inputRow('Текст кнопки «Назад»',config.resetLabel,'data-global="resetLabel"')}${inputRow('Текст кнопки редагування',config.editLabel,'data-global="editLabel"')}</div></section>
  <section class="editor-section"><div class="editor-section-title"><h3>Основні кнопки</h3><button type="button" data-action="add-category">＋ Додати кнопку</button></div>
  <div class="editor-grid"><label class="editor-field"><span>Виберіть кнопку для редагування</span><select id="editor-category">${names.map(n=>`<option ${n===editorCategory?'selected':''} value="${esc(n)}">${esc(n)}</option>`).join('')}</select></label></div></section>`;
  if(cat){html+=`<section class="editor-section"><div class="editor-section-title"><h3>Налаштування кнопки</h3><button type="button" class="danger" data-action="delete-category">Видалити кнопку</button></div><div class="editor-grid">${inputRow('Назва кнопки',editorCategory,'data-category-name')}${inputRow('Клас значка (необов’язково)',cat.icon||'','data-category-icon')}</div>
  <div class="editor-grid image-tools"><label class="editor-field"><span>Додати / замінити зображення</span><input type="file" accept="image/*" data-image="category"></label><button type="button" data-action="remove-category-image" ${cat.image?'':'disabled'}>Видалити зображення</button></div>
  <h4>Поля таблиці цієї кнопки</h4><div class="editor-grid">${config.fields.map(f=>inputRow(f,cat.data?.[f]??'',`data-category-field="${esc(f)}"`)).join('')}</div></section>`;
    html+=`<section class="editor-section"><div class="editor-section-title"><h3>Підкнопки</h3><button type="button" data-action="add-option">＋ Додати підкнопку</button></div>`;
    if(cat.subOptions?.length){html+=cat.subOptions.map((opt,i)=>`<details class="option-editor" ${i===0?'open':''}><summary>${esc(opt.label||`Підкнопка ${i+1}`)}</summary><div class="editor-grid">${inputRow('Назва підкнопки',opt.label||'',`data-option-label="${i}"`)}${inputRow('Клас значка',opt.icon||'',`data-option-icon="${i}"`)}${config.fields.map(f=>inputRow(f,opt[f]??'',`data-option-field="${i}" data-field="${esc(f)}"`)).join('')}</div><div class="editor-grid image-tools"><label class="editor-field"><span>Зображення</span><input type="file" accept="image/*" data-image="option" data-index="${i}"></label><button type="button" data-action="remove-option-image" data-index="${i}" ${opt.image?'':'disabled'}>Видалити зображення</button><button type="button" class="danger" data-action="delete-option" data-index="${i}">Видалити підкнопку</button></div></details>`).join('');}else html+='<p class="muted">У цієї кнопки ще немає підкнопок.</p>';
    html+='</section>';
  }
  html+=`<section class="editor-section"><div class="editor-section-title"><h3>Поля таблиць (рядки)</h3><button type="button" data-action="add-field">＋ Додати поле</button></div><p class="muted">Назва поля відображається зліва, його значення — справа. Зміна назви оновлює всі таблиці.</p><div class="field-list">${config.fields.map((f,i)=>`<div class="field-edit"><input value="${esc(f)}" data-field-name="${i}"><button type="button" class="danger small" data-action="delete-field" data-index="${i}">Видалити</button></div>`).join('')}</div></section>
  <div class="editor-footer"><button type="button" data-action="close" class="primary-action">Готово — повернутися до додатка</button><button type="button" data-action="export">Експортувати налаштування</button><label class="import-button">Імпортувати налаштування<input type="file" accept="application/json" id="import-config"></label></div>`;
  editor.innerHTML=html;updateTitle();
}
function openEditor(){editor.classList.add('open');editor.setAttribute('aria-hidden','false');editBtn.textContent='Закрити редактор';renderEditor();}
function closeEditor(){editor.classList.remove('open');editor.setAttribute('aria-hidden','true');editBtn.textContent=config.editLabel;save();refreshCurrent();}
editBtn.addEventListener('click',()=>editor.classList.contains('open')?closeEditor():openEditor());
function renameField(oldName,newName){newName=newName.trim();if(!newName||oldName===newName)return;if(config.fields.includes(newName)){alert('Поле з такою назвою вже існує.');return;}config.fields=config.fields.map(f=>f===oldName?newName:f);Object.values(config.categories).forEach(c=>{if(c.data&&oldName in c.data){c.data[newName]=c.data[oldName];delete c.data[oldName];}(c.subOptions||[]).forEach(o=>{if(oldName in o){o[newName]=o[oldName];delete o[oldName];}});});}
function compressImage(file){return new Promise((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>{const img=new Image();img.onload=()=>{const scale=Math.min(1,1400/Math.max(img.width,img.height));const canvas=document.createElement('canvas');canvas.width=Math.round(img.width*scale);canvas.height=Math.round(img.height*scale);canvas.getContext('2d').drawImage(img,0,0,canvas.width,canvas.height);resolve(canvas.toDataURL('image/jpeg',0.82));};img.onerror=reject;img.src=reader.result;};reader.onerror=reject;reader.readAsDataURL(file);});}
editor.addEventListener('change',async e=>{
  const t=e.target;
  if(t.id==='editor-category'){editorCategory=t.value;renderEditor();return;}
  if(t.dataset.global){config[t.dataset.global]=t.value;save();updateTitle();return;}
  if(t.dataset.categoryName!==undefined){const old=editorCategory,newName=t.value.trim();if(!newName)return;if(newName!==old&&config.categories[newName]){alert('Кнопка з такою назвою вже існує.');t.value=old;return;}const entries=Object.entries(config.categories).map(([k,v])=>[k===old?newName:k,v]);config.categories=Object.fromEntries(entries);editorCategory=newName;save();renderEditor();refreshCurrent();return;}
  if(t.dataset.categoryIcon!==undefined){config.categories[editorCategory].icon=t.value.trim();save();return;}
  if(t.dataset.categoryField!==undefined){config.categories[editorCategory].data[t.dataset.categoryField]=t.value;save();return;}
  if(t.dataset.optionLabel!==undefined){config.categories[editorCategory].subOptions[Number(t.dataset.optionLabel)].label=t.value;save();return;}
  if(t.dataset.optionIcon!==undefined){config.categories[editorCategory].subOptions[Number(t.dataset.optionIcon)].icon=t.value;save();return;}
  if(t.dataset.optionField!==undefined){config.categories[editorCategory].subOptions[Number(t.dataset.optionField)][t.dataset.field]=t.value;save();return;}
  if(t.dataset.fieldName!==undefined){const i=Number(t.dataset.fieldName),old=config.fields[i];renameField(old,t.value);save();renderEditor();return;}
  if(t.dataset.image){const file=t.files?.[0];if(!file)return;try{const data=await compressImage(file);if(t.dataset.image==='category')config.categories[editorCategory].image=data;else config.categories[editorCategory].subOptions[Number(t.dataset.index)].image=data;save();renderEditor();}catch(err){alert('Не вдалося завантажити це зображення.');}}
  if(t.id==='import-config'&&t.files?.[0]){try{const imported=JSON.parse(await t.files[0].text());if(!Array.isArray(imported.fields)||!imported.categories)throw new Error('bad format');config=imported;editorCategory=Object.keys(config.categories)[0]||'';save();renderEditor();refreshCurrent();alert('Налаштування імпортовано.');}catch(err){alert('Файл налаштувань має неправильний формат.');}}
});
editor.addEventListener('click',e=>{const b=e.target.closest('[data-action]');if(!b)return;const action=b.dataset.action,cat=config.categories[editorCategory];
  if(action==='close'){closeEditor();return;}
  if(action==='add-category'){let name='Нова кнопка';let n=2;while(config.categories[name])name=`Нова кнопка ${n++}`;config.categories[name]={icon:'',data:Object.fromEntries(config.fields.map(f=>[f,'']))};editorCategory=name;save();renderEditor();return;}
  if(action==='delete-category'){if(!confirm(`Видалити кнопку «${editorCategory}» та її дані?`))return;delete config.categories[editorCategory];editorCategory=Object.keys(config.categories)[0]||'';save();renderEditor();refreshCurrent();return;}
  if(action==='add-option'){cat.subOptions||=[];cat.subOptions.push({label:'Нова підкнопка',...Object.fromEntries(config.fields.map(f=>[f,'']))});save();renderEditor();return;}
  if(action==='delete-option'){const i=Number(b.dataset.index);if(confirm('Видалити цю підкнопку?')){cat.subOptions.splice(i,1);save();renderEditor();}return;}
  if(action==='remove-category-image'){delete cat.image;save();renderEditor();return;}
  if(action==='remove-option-image'){delete cat.subOptions[Number(b.dataset.index)].image;save();renderEditor();return;}
  if(action==='add-field'){let name='Нове поле',n=2;while(config.fields.includes(name))name=`Нове поле ${n++}`;config.fields.push(name);Object.values(config.categories).forEach(c=>{c.data ||= {};c.data[name]='';(c.subOptions||[]).forEach(o=>o[name]='');});save();renderEditor();return;}
  if(action==='delete-field'){const i=Number(b.dataset.index),field=config.fields[i];if(config.fields.length===1){alert('Має залишитися хоча б одне поле.');return;}if(!confirm(`Видалити поле «${field}» з усіх таблиць?`))return;config.fields.splice(i,1);Object.values(config.categories).forEach(c=>{delete c.data?.[field];(c.subOptions||[]).forEach(o=>delete o[field]);});save();renderEditor();return;}
  if(action==='export'){const blob=new Blob([JSON.stringify(config,null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='tarif20-off-settings.json';a.click();URL.revokeObjectURL(url);return;}
});
updateTitle();resetView();
if('serviceWorker'in navigator){navigator.serviceWorker.register('./service-worker.js').catch(err=>console.warn('Service worker:',err));navigator.serviceWorker.addEventListener('message',event=>{if(event.data?.type==='NEW_VERSION_AVAILABLE'&&confirm('Доступна нова версія — оновити?'))location.reload();});}
