(() => {
'use strict';

const STORAGE_KEY = 'tarif-auswahl-config-v2';
const DB_NAME = 'tarif-auswahl-media';
const DB_VERSION = 1;
const IMAGE_STORE = 'images';

const DEFAULT_FIELDS = [
  'Name',
  'Kostenträger-Nr.',
  'Kostenträger - Name / Ort',
  'Von Objekt / Ort',
  'Nach Objekt / Ort',
  'Zusatzfeld',
  'Tarif',
  'Statistik',
  'Zusatztext für Rechnung'
];

const DEFAULT_CATEGORIES = {
  'SCHMIEDER KLINIK': {
    icon: 'fa-hospital',
    data: {
      'Name': '', 'Kostenträger-Nr.': '3491', 'Kostenträger - Name / Ort': 'SCHMIEDER KLINIK',
      'Von Objekt / Ort': 'SCHM. GAILINGEN', 'Nach Objekt / Ort': 'SCHM. ALLENSBACH / MRT',
      'Zusatzfeld': '', 'Tarif': '', 'Statistik': '', 'Zusatztext für Rechnung': ''
    },
    subOptions: [
      { label: '3 - Tragestuhl', 'Tarif': '9211', icon: '' },
      { label: '4 - gehfähig', 'Tarif': '9111', icon: 'fa-person-walking' },
      { label: '5 - Rollstuhl', 'Tarif': '9711', icon: 'fa-wheelchair-move' }
    ]
  },
  'PRIVAT': {
    icon: 'fa-user',
    data: {
      'Name': '', 'Kostenträger-Nr.': '1', 'Kostenträger - Name / Ort': 'PRIVAT',
      'Von Objekt / Ort': 'WHG', 'Nach Objekt / Ort': '', 'Zusatzfeld': '',
      'Tarif': '6600', 'Statistik': '', 'Zusatztext für Rechnung': ''
    }
  },
  'Hilfeleistung bzw. Tragehilfen/privat': {
    icon: 'fa-hands-helping',
    data: {
      'Name': '', 'Kostenträger-Nr.': '1', 'Kostenträger - Name / Ort': 'Hilfeleistung bzw. Tragehilfen/privat',
      'Von Objekt / Ort': '4204', 'Nach Objekt / Ort': 'WHG', 'Zusatzfeld': '',
      'Tarif': '2800', 'Statistik': '93', 'Zusatztext für Rechnung': 'HOCH HELFEN'
    }
  },
  'HAUSNOTRUF': {
    icon: 'fa-phone-volume',
    data: {
      'Name': '', 'Kostenträger-Nr.': '8', 'Kostenträger - Name / Ort': 'HAUSNOTRUF',
      'Von Objekt / Ort': '4204', 'Nach Objekt / Ort': 'WHG', 'Zusatzfeld': '8',
      'Tarif': '8609', 'Statistik': '89', 'Zusatztext für Rechnung': 'HNR NR._ _ _ _ _'
    }
  },
  'ZFP Reichenau': {
    icon: 'fa-clinic-medical',
    data: {
      'Name': '', 'Kostenträger-Nr.': '2775', 'Kostenträger - Name / Ort': 'ZFP Reichenau',
      'Von Objekt / Ort': 'ZFP ST. 92', 'Nach Objekt / Ort': '', 'Zusatzfeld': '',
      'Tarif': '9203', 'Statistik': '', 'Zusatztext für Rechnung': ''
    }
  },
  'LEERFAHRT': {
    icon: 'fa-car-side',
    data: {
      'Name': 'DIENSTFAHRT', 'Kostenträger-Nr.': '9', 'Kostenträger - Name / Ort': 'LEERFAHRT',
      'Von Objekt / Ort': '4204', 'Nach Objekt / Ort': '4202 / 4203 / 4205 / 4206',
      'Zusatzfeld': '7', 'Tarif': 'Kein', 'Statistik': '91', 'Zusatztext für Rechnung': ''
    }
  },
  'FEHLFAHRT': {
    icon: 'fa-exclamation-triangle',
    data: {
      'Name': 'FEHLFAHRT', 'Kostenträger-Nr.': '9', 'Kostenträger - Name / Ort': 'LEERFAHRT',
      'Von Objekt / Ort': '4204', 'Nach Objekt / Ort': '', 'Zusatzfeld': '6',
      'Tarif': 'Kein', 'Statistik': '81', 'Zusatztext für Rechnung': ''
    }
  },
  'KRANKENHAUS': {
    icon: 'fa-hospital-user',
    data: Object.fromEntries(DEFAULT_FIELDS.map(field => [field, ''])),
    subOptions: [
      { label: 'KH - KONSTANZ', 'Kostenträger - Name / Ort': 'KH - KONSTANZ', 'Von Objekt / Ort': 'ZNA MED KONSTANZ', 'Nach Objekt / Ort': 'ZNA MED SINGEN', 'Statistik': '21', 'Kostenträger-Nr.': '1203', 'Tarif': '9101', icon: 'fa-hospital' },
      { label: 'DR. ZWICKER', 'Kostenträger - Name / Ort': 'KH - KN', 'Von Objekt / Ort': 'PO3', 'Nach Objekt / Ort': 'ZWICKER', 'Statistik': '23 / 24', 'Kostenträger-Nr.': '1203', 'Tarif': '9101', icon: 'fa-user-doctor' },
      { label: 'KH - SINGEN', 'Kostenträger - Name / Ort': 'KH - SINGEN', 'Von Objekt / Ort': 'ZNA MED SINGEN', 'Nach Objekt / Ort': 'ZNA MED KONSTANZ', 'Statistik': '21', 'Kostenträger-Nr.': '3214', 'Tarif': '9201', icon: 'fa-hospital' },
      { label: 'KH - STOCKACH', 'Kostenträger - Name / Ort': 'KH - STOCKACH', 'Von Objekt / Ort': 'ZNA MED STOCKACH', 'Nach Objekt / Ort': 'ZNA MED KONSTANZ', 'Statistik': '21', 'Kostenträger-Nr.': '3151', 'Tarif': '9203', icon: 'fa-hospital' }
    ]
  },
  'HEGAU JUGENDWERK': {
    icon: 'fa-user-md',
    data: {
      'Name': '', 'Kostenträger-Nr.': '3472', 'Kostenträger - Name / Ort': '',
      'Von Objekt / Ort': '', 'Nach Objekt / Ort': '', 'Zusatzfeld': '',
      'Tarif': '9201', 'Statistik': '', 'Zusatztext für Rechnung': ''
    }
  },
  'Tarife für Rollstuhlfahrten': {
    icon: 'fa-notes-medical',
    data: Object.fromEntries(DEFAULT_FIELDS.map(field => [field, ''])),
    subOptions: [
      { label: 'DAK', 'Kostenträger - Name / Ort': 'DAK', 'Kostenträger-Nr.': '600', 'Tarif': '7611', icon: 'fa-wheelchair' },
      { label: 'TK', 'Kostenträger - Name / Ort': 'TK', 'Kostenträger-Nr.': '163', 'Tarif': '7611', icon: 'fa-wheelchair' },
      { label: 'BEK', 'Kostenträger - Name / Ort': 'BEK', 'Kostenträger-Nr.': '748', 'Tarif': '7611', icon: 'fa-wheelchair' },
      { label: 'KKH', 'Kostenträger - Name / Ort': 'KKH', 'Kostenträger-Nr.': '590', 'Tarif': '7611', icon: 'fa-wheelchair' },
      { label: 'hkk', 'Kostenträger - Name / Ort': 'hkk', 'Kostenträger-Nr.': '1602', 'Tarif': '7611', icon: 'fa-wheelchair' },
      { label: 'HEK', 'Kostenträger - Name / Ort': 'HEK', 'Kostenträger-Nr.': '175', 'Tarif': '7611', icon: 'fa-wheelchair' },
      { label: 'IKK', 'Kostenträger - Name / Ort': 'IKK', 'Kostenträger-Nr.': '1770', 'Tarif': '7621', icon: 'fa-wheelchair' }
    ]
  }
};

const $ = id => document.getElementById(id);
const resetBtn = $('reset-button');
const menuContainer = $('menu-buttons');
const subOptionsContainer = $('sub-options');
const output = $('output');
const resetContainer = $('reset-container');
const editModeButton = $('edit-mode-button');
const saveButton = $('save-button');
const editBanner = $('edit-banner');
const editorDialog = $('editor-dialog');
const imageFileInput = $('image-file-input');
const toastElement = $('toast');

let config;
let editing = false;
let selectedCategory = null;
let selectedSubIndex = null;
let editorCategory = null;
let currentImageTarget = null;
let toastTimer = null;

const FIELD_LABELS_UK = {
  'Name': "Ім'я",
  'Kostenträger-Nr.': 'Номер платника',
  'Kostenträger - Name / Ort': 'Платник — назва / місце',
  'Von Objekt / Ort': 'Звідки — об’єкт / місце',
  'Nach Objekt / Ort': 'Куди — об’єкт / місце',
  'Zusatzfeld': 'Додаткове поле',
  'Tarif': 'Тариф',
  'Statistik': 'Статистика',
  'Zusatztext für Rechnung': 'Додатковий текст для рахунку'
};
function fieldDisplayName(field) { return FIELD_LABELS_UK[field] || field; }

function deepClone(value) { return JSON.parse(JSON.stringify(value)); }
function defaultConfig() {
  return { title: 'Вибір тарифу', fields: [...DEFAULT_FIELDS], categories: deepClone(DEFAULT_CATEGORIES), primaryColor: '#005fa3' };
}
function normaliseConfig(input) {
  const result = input && typeof input === 'object' ? input : defaultConfig();
  result.title = typeof result.title === 'string' ? result.title : 'Вибір тарифу';
  if (result.title === 'Tarif Auswahl') result.title = 'Вибір тарифу';
  result.fields = Array.isArray(result.fields) && result.fields.length ? result.fields.map(String) : [...DEFAULT_FIELDS];
  result.categories = result.categories && typeof result.categories === 'object' ? result.categories : deepClone(DEFAULT_CATEGORIES);
  result.primaryColor = /^#[0-9a-f]{6}$/i.test(result.primaryColor || '') ? result.primaryColor : '#005fa3';
  for (const [name, category] of Object.entries(result.categories)) {
    if (!category || typeof category !== 'object') result.categories[name] = { icon: '', data: {} };
    const c = result.categories[name];
    c.icon = typeof c.icon === 'string' ? c.icon : '';
    c.data = c.data && typeof c.data === 'object' ? c.data : {};
    for (const field of result.fields) if (!(field in c.data)) c.data[field] = '';
    if (Array.isArray(c.subOptions)) c.subOptions = c.subOptions.map(option => {
      const opt = option && typeof option === 'object' ? option : {};
      opt.label = String(opt.label || 'Нова підопція');
      opt.icon = typeof opt.icon === 'string' ? opt.icon : '';
      return opt;
    });
  }
  return result;
}
function loadConfig() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return normaliseConfig(saved ? JSON.parse(saved) : defaultConfig());
  } catch (error) {
    console.error('Не вдалося завантажити налаштування:', error);
    return defaultConfig();
  }
}
function saveConfig(showMessage = true) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    if (showMessage) showToast('Зміни збережено на пристрої.');
    $('save-status').textContent = 'Останнє збереження: ' + new Date().toLocaleTimeString('de-DE');
    return true;
  } catch (error) {
    console.error(error);
    showToast('Недостатньо місця. Зменште розмір великих зображень або експортуйте дані.');
    return false;
  }
}
function showToast(message) {
  toastElement.textContent = message;
  toastElement.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { toastElement.hidden = true; }, 2600);
}

function openImageDB() {
  return new Promise((resolve, reject) => {
    if (!('indexedDB' in window)) return reject(new Error('Цей браузер не підтримує IndexedDB.'));
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(IMAGE_STORE)) db.createObjectStore(IMAGE_STORE);
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}
async function putImage(id, blob) {
  const db = await openImageDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(IMAGE_STORE, 'readwrite');
    tx.objectStore(IMAGE_STORE).put(blob, id);
    tx.oncomplete = () => { db.close(); resolve(); };
    tx.onerror = () => { db.close(); reject(tx.error); };
  });
}
async function getImage(id) {
  if (!id) return null;
  try {
    const db = await openImageDB();
    return await new Promise((resolve, reject) => {
      const tx = db.transaction(IMAGE_STORE, 'readonly');
      const req = tx.objectStore(IMAGE_STORE).get(id);
      req.onsuccess = () => { db.close(); resolve(req.result || null); };
      req.onerror = () => { db.close(); reject(req.error); };
    });
  } catch (error) {
    console.warn('Не вдалося завантажити зображення', error);
    return null;
  }
}
async function deleteImage(id) {
  if (!id) return;
  try {
    const db = await openImageDB();
    await new Promise((resolve, reject) => {
      const tx = db.transaction(IMAGE_STORE, 'readwrite');
      tx.objectStore(IMAGE_STORE).delete(id);
      tx.oncomplete = () => { db.close(); resolve(); };
      tx.onerror = () => { db.close(); reject(tx.error); };
    });
  } catch (error) { console.warn(error); }
}
async function imageDataUrl(id) {
  const blob = await getImage(id);
  if (!blob) return null;
  return await new Promise(resolve => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => resolve(null);
    reader.readAsDataURL(blob);
  });
}
function makeImageId() {
  return 'img-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 10);
}

function addButtonContent(button, text, icon, imageId) {
  if (imageId) {
    const img = document.createElement('img');
    img.className = 'button-image';
    img.alt = '';
    img.dataset.imageId = imageId;
    button.appendChild(img);
    getImage(imageId).then(blob => {
      if (blob && img.isConnected) img.src = URL.createObjectURL(blob);
    });
  } else if (icon) {
    const iconEl = document.createElement('i');
    iconEl.className = `fa-solid ${icon}`;
    iconEl.setAttribute('aria-hidden', 'true');
    button.appendChild(iconEl);
  }
  const label = document.createElement('span');
  label.textContent = text;
  button.appendChild(label);
  if (editing) button.title = 'У режимі редагування натисніть, щоб змінити назву';
}
function createMenuButton(text, icon, imageId, callback, extraClass = '', directTarget = null) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = `icon-button ${extraClass}`.trim();
  addButtonContent(button, text, icon, imageId);
  button.addEventListener('click', () => {
    if (editing && directTarget) {
      const next = prompt('Змінити підпис:', directTarget.getLabel());
      if (next !== null && next.trim()) {
        directTarget.setLabel(next.trim());
        saveConfig(false);
        renderAll();
        renderEditorIfOpen();
      }
      return;
    }
    if (callback) callback();
  });
  return button;
}
function clearContainers() {
  menuContainer.replaceChildren();
  subOptionsContainer.replaceChildren();
  output.replaceChildren();
}
function renderAll() {
  document.documentElement.style.setProperty('--color-primary', config.primaryColor || '#005fa3');
  $('app-title').textContent = config.title;
  $('app-title').title = editing ? 'Натисніть, щоб змінити назву програми' : '';
  document.title = config.title || 'Вибір тарифу';
  document.body.classList.toggle('editing', editing);
  editModeButton.innerHTML = editing
    ? '<i class="fa-solid fa-eye" aria-hidden="true"></i><span>Перегляд</span>'
    : '<i class="fa-solid fa-pen-to-square" aria-hidden="true"></i><span>Редагувати</span>';
  saveButton.hidden = !editing;
  editBanner.hidden = !editing;
  clearContainers();

  const names = Object.keys(config.categories);
  names.forEach(name => {
    const category = config.categories[name];
    const btn = createMenuButton(
      name, category.icon, category.imageId,
      () => renderView(name),
      selectedCategory === name ? 'selected' : '',
      {
        getLabel: () => name,
        setLabel: newName => renameCategory(name, newName)
      }
    );
    menuContainer.appendChild(btn);
  });

  if (selectedCategory && config.categories[selectedCategory]) {
    const category = config.categories[selectedCategory];
    resetContainer.style.display = 'block';
    if (Array.isArray(category.subOptions)) {
      category.subOptions.forEach((option, index) => {
        const btn = createMenuButton(
          option.label, option.icon, option.imageId,
          () => renderSubSelection(selectedCategory, index),
          selectedSubIndex === index ? 'sub-selected' : '',
          {
            getLabel: () => option.label,
            setLabel: newLabel => { option.label = newLabel; }
          }
        );
        subOptionsContainer.appendChild(btn);
      });
    }
    if (selectedSubIndex !== null && category.subOptions?.[selectedSubIndex]) {
      renderTable(mergeEntry(category, category.subOptions[selectedSubIndex]));
    } else if (!category.subOptions) {
      renderTable(category.data);
    } else {
      output.replaceChildren();
    }
  } else {
    resetContainer.style.display = 'none';
  }
}
function mergeEntry(category, option) {
  return { ...(category.data || {}), ...option };
}
function renderView(name) {
  if (!config.categories[name]) return;
  selectedCategory = name;
  selectedSubIndex = null;
  renderAll();
  if (!Array.isArray(config.categories[name].subOptions)) renderTable(config.categories[name].data);
}
function renderSubSelection(categoryName, index) {
  selectedCategory = categoryName;
  selectedSubIndex = index;
  renderAll();
  const category = config.categories[categoryName];
  const option = category?.subOptions?.[index];
  if (option) renderTable(mergeEntry(category, option));
}
function renderTable(entry) {
  output.replaceChildren();
  const table = document.createElement('div');
  table.className = 'vertical-table';
  config.fields.forEach(field => {
    const value = entry?.[field];
    if (value === undefined || value === null || String(value).trim() === '') return;
    const row = document.createElement('div');
    row.className = 'row';
    const label = document.createElement('div');
    label.className = 'label';
    label.textContent = fieldDisplayName(field);
    const valueEl = document.createElement('div');
    valueEl.className = 'value';
    valueEl.textContent = String(value);
    if (field === config.fields[1] || field === config.fields[6]) valueEl.classList.add('highlight');
    if (field === config.fields[5] || field === config.fields[7]) valueEl.classList.add('gros');
    if (editing) {
      label.title = 'Натисніть, щоб змінити назву поля';
      valueEl.title = 'Натисніть, щоб змінити значення';
      label.addEventListener('click', () => editFieldName(field));
      valueEl.addEventListener('click', () => editEntryValue(field, String(value)));
    }
    row.append(label, valueEl);
    table.appendChild(row);
  });
  const imageId = selectedSubIndex !== null
    ? entry?.imageId
    : config.categories[selectedCategory]?.imageId;
  if (imageId) {
    const img = document.createElement('img');
    img.className = 'row-image';
    img.alt = 'Додаткове зображення';
    getImage(imageId).then(blob => { if (blob && img.isConnected) img.src = URL.createObjectURL(blob); });
    if (editing) img.addEventListener('click', () => chooseImage(selectedSubIndex !== null ? { type: 'option', category: selectedCategory, index: selectedSubIndex } : { type: 'category', category: selectedCategory }));
    table.appendChild(img);
  }
  output.appendChild(table);
}
function resetView() {
  selectedCategory = null;
  selectedSubIndex = null;
  renderAll();
}
function renameCategory(oldName, newName) {
  if (oldName === newName) return;
  if (config.categories[newName]) {
    showToast('Категорія з такою назвою вже існує.');
    return;
  }
  const ordered = {};
  for (const [key, value] of Object.entries(config.categories)) ordered[key === oldName ? newName : key] = value;
  config.categories = ordered;
  if (selectedCategory === oldName) selectedCategory = newName;
}
function editFieldName(oldName) {
  const next = prompt('Змінити назву поля:', fieldDisplayName(oldName));
  if (next === null || !next.trim() || next.trim() === fieldDisplayName(oldName) || next.trim() === oldName) return;
  const newName = next.trim();
  if (config.fields.includes(newName)) return showToast('Поле з такою назвою вже існує.');
  const index = config.fields.indexOf(oldName);
  if (index >= 0) config.fields[index] = newName;
  for (const category of Object.values(config.categories)) {
    if (Object.prototype.hasOwnProperty.call(category.data || {}, oldName)) {
      category.data[newName] = category.data[oldName];
      delete category.data[oldName];
    }
    (category.subOptions || []).forEach(option => {
      if (Object.prototype.hasOwnProperty.call(option, oldName)) {
        option[newName] = option[oldName];
        delete option[oldName];
      }
    });
  }
  saveConfig(false);
  renderAll();
  renderEditorIfOpen();
}
function editEntryValue(field, oldValue) {
  const next = prompt(`Змінити значення поля «${fieldDisplayName(field)}»:`, oldValue);
  if (next === null) return;
  const category = config.categories[selectedCategory];
  const target = selectedSubIndex !== null && category?.subOptions?.[selectedSubIndex]
    ? category.subOptions[selectedSubIndex] : category?.data;
  if (!target) return;
  target[field] = next;
  saveConfig(false);
  renderAll();
  if (selectedSubIndex !== null) renderTable(mergeEntry(category, target));
  else renderTable(target);
  renderEditorIfOpen();
}

function createField(label, value, onChange, type = 'text', eventName = 'input') {
  const wrapper = document.createElement('label');
  wrapper.className = 'form-field';
  wrapper.textContent = label;
  const input = document.createElement('input');
  input.type = type;
  input.value = value ?? '';
  input.addEventListener(eventName, () => onChange(input.value));
  wrapper.appendChild(input);
  return wrapper;
}
function createTextAreaField(label, value, onChange) {
  const wrapper = document.createElement('label');
  wrapper.className = 'form-field';
  wrapper.textContent = label;
  const input = document.createElement('textarea');
  input.value = value ?? '';
  input.addEventListener('input', () => onChange(input.value));
  wrapper.appendChild(input);
  return wrapper;
}
function createActionButton(label, className, callback) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = className || 'small-button';
  button.textContent = label;
  button.addEventListener('click', callback);
  return button;
}
function renderEditorIfOpen() {
  if (!editorDialog.open) return;
  renderCategoryList();
  renderItemEditor();
  renderFieldEditor();
  $('app-title-input').value = config.title;
  $('primary-color-input').value = config.primaryColor;
}
function renderCategoryList() {
  const list = $('category-editor-list');
  list.replaceChildren();
  Object.keys(config.categories).forEach((name, index, names) => {
    const row = document.createElement('div');
    row.className = 'category-list-item';
    const select = createActionButton(name, 'category-select-button' + (editorCategory === name ? ' active' : ''), () => {
      editorCategory = name;
      renderEditorIfOpen();
    });
    select.title = 'Вибрати категорію';
    const up = createActionButton('↑', 'small-button', () => moveCategory(name, -1));
    up.disabled = index === 0;
    up.setAttribute('aria-label', 'Перемістити категорію вгору');
    const down = createActionButton('↓', 'small-button', () => moveCategory(name, 1));
    down.disabled = index === names.length - 1;
    down.setAttribute('aria-label', 'Перемістити категорію вниз');
    row.append(select, up, down);
    list.appendChild(row);
  });
}
function moveCategory(name, delta) {
  const names = Object.keys(config.categories);
  const index = names.indexOf(name);
  const target = index + delta;
  if (target < 0 || target >= names.length) return;
  [names[index], names[target]] = [names[target], names[index]];
  const reordered = {};
  names.forEach(key => reordered[key] = config.categories[key]);
  config.categories = reordered;
  saveConfig(false);
  renderAll();
  renderEditorIfOpen();
}
function renderItemEditor() {
  const host = $('item-editor');
  host.replaceChildren();
  if (!editorCategory || !config.categories[editorCategory]) {
    host.append('Спочатку виберіть категорію.');
    return;
  }
  const category = config.categories[editorCategory];
  const categoryCard = document.createElement('div');
  categoryCard.className = 'item-card';
  const title = document.createElement('h4');
  title.textContent = 'Категорія: ' + editorCategory;
  categoryCard.appendChild(title);
  const grid = document.createElement('div');
  grid.className = 'form-grid';
  grid.appendChild(createField('Назва / підпис', editorCategory, value => {
    const clean = value.trim();
    if (!clean || clean === editorCategory) return;
    if (config.categories[clean]) {
      showToast('Категорія з такою назвою вже існує.');
      renderEditorIfOpen();
      return;
    }
    renameCategory(editorCategory, clean);
    editorCategory = clean;
    saveConfig(false);
    renderAll();
    renderEditorIfOpen();
  }, 'text', 'change'));
  grid.appendChild(createField('Клас іконки Font Awesome (наприклад, fa-hospital)', category.icon || '', value => {
    category.icon = value.trim();
    saveConfig(false);
    renderAll();
  }, 'text', 'change'));
  categoryCard.appendChild(grid);
  categoryCard.appendChild(createImageControls(category, { type: 'category', category: editorCategory }, 'Зображення категорії'));
  const dataHeading = document.createElement('h4');
  dataHeading.textContent = 'Дані категорії';
  categoryCard.appendChild(dataHeading);
  const dataGrid = document.createElement('div');
  dataGrid.className = 'form-grid';
  config.fields.forEach(field => {
    dataGrid.appendChild(createField(fieldDisplayName(field), category.data[field] ?? '', value => {
      category.data[field] = value;
      saveConfig(false);
      if (selectedCategory === editorCategory && selectedSubIndex === null) renderTable(category.data);
    }));
  });
  categoryCard.appendChild(dataGrid);
  host.appendChild(categoryCard);

  const subHeading = document.createElement('div');
  subHeading.className = 'editor-section-heading';
  const h = document.createElement('h4');
  h.textContent = 'Підопції';
  subHeading.appendChild(h);
  subHeading.appendChild(createActionButton('+ Додати підопцію', 'action-button', () => {
    if (!Array.isArray(category.subOptions)) category.subOptions = [];
    const option = { label: 'Нова підопція', icon: '' };
    config.fields.forEach(field => option[field] = '');
    category.subOptions.push(option);
    saveConfig(false);
    renderAll();
    renderEditorIfOpen();
  }));
  host.appendChild(subHeading);

  if (!Array.isArray(category.subOptions) || category.subOptions.length === 0) {
    const note = document.createElement('p');
    note.className = 'helper-text';
    note.textContent = 'У цій категорії ще немає підопцій.';
    host.appendChild(note);
  } else {
    category.subOptions.forEach((option, index) => {
      const card = document.createElement('div');
      card.className = 'item-card';
      const optionTitle = document.createElement('h4');
      optionTitle.textContent = `Підопція ${index + 1}`;
      card.appendChild(optionTitle);
      const grid = document.createElement('div');
      grid.className = 'form-grid';
      grid.appendChild(createField('Підпис', option.label, value => {
        option.label = value;
        saveConfig(false);
        if (selectedCategory === editorCategory) renderAll();
      }, 'text', 'change'));
      grid.appendChild(createField('Клас іконки Font Awesome', option.icon || '', value => {
        option.icon = value.trim();
        saveConfig(false);
        renderAll();
      }, 'text', 'change'));
      card.appendChild(grid);
      card.appendChild(createImageControls(option, { type: 'option', category: editorCategory, index }, 'Зображення підопції'));
      const optionData = document.createElement('div');
      optionData.className = 'form-grid';
      config.fields.forEach(field => {
        optionData.appendChild(createField(field, option[field] ?? '', value => {
          option[field] = value;
          saveConfig(false);
          if (selectedCategory === editorCategory && selectedSubIndex === index) renderTable(mergeEntry(category, option));
        }));
      });
      card.appendChild(optionData);
      const actions = document.createElement('div');
      actions.className = 'item-card-actions';
      actions.appendChild(createActionButton('↑', 'small-button', () => moveOption(editorCategory, index, -1)));
      actions.appendChild(createActionButton('↓', 'small-button', () => moveOption(editorCategory, index, 1)));
      actions.appendChild(createActionButton('Показати як вибір', 'small-button', () => {
        selectedCategory = editorCategory;
        selectedSubIndex = index;
        renderAll();
        renderTable(mergeEntry(category, option));
      }));
      actions.appendChild(createActionButton('Видалити підопцію', 'small-button danger', () => {
        if (!confirm(`Видалити підопцію «${option.label}»?`)) return;
        category.subOptions.splice(index, 1);
        if (selectedCategory === editorCategory) selectedSubIndex = null;
        saveConfig(false);
        renderAll();
        renderEditorIfOpen();
      }));
      card.appendChild(actions);
      host.appendChild(card);
    });
  }
  const deleteCategory = createActionButton('Видалити категорію', 'danger-button', () => {
    if (Object.keys(config.categories).length <= 1) return showToast('Має залишитися щонайменше одна категорія.');
    if (!confirm(`Справді видалити категорію «${editorCategory}»?`)) return;
    const old = editorCategory;
    delete config.categories[old];
    if (selectedCategory === old) { selectedCategory = null; selectedSubIndex = null; }
    editorCategory = Object.keys(config.categories)[0] || null;
    saveConfig(false);
    renderAll();
    renderEditorIfOpen();
  });
  host.appendChild(deleteCategory);
}
function createImageControls(object, target, labelText) {
  const wrap = document.createElement('div');
  wrap.className = 'item-card-actions';
  const label = document.createElement('span');
  label.textContent = labelText + ': ';
  wrap.appendChild(label);
  if (object.imageId) {
    const img = document.createElement('img');
    img.className = 'image-preview';
    img.alt = 'Попередній перегляд зображення';
    getImage(object.imageId).then(blob => { if (blob && img.isConnected) img.src = URL.createObjectURL(blob); });
    wrap.appendChild(img);
    wrap.appendChild(createActionButton('Замінити зображення', 'small-button', () => chooseImage(target)));
    wrap.appendChild(createActionButton('Видалити зображення', 'small-button danger', async () => {
      await deleteImage(object.imageId);
      delete object.imageId;
      saveConfig(false);
      renderAll();
      renderEditorIfOpen();
      showToast('Зображення видалено.');
    }));
  } else {
    wrap.appendChild(createActionButton('Додати зображення', 'small-button', () => chooseImage(target)));
  }
  return wrap;
}
function moveOption(categoryName, index, delta) {
  const options = config.categories[categoryName]?.subOptions;
  if (!options) return;
  const target = index + delta;
  if (target < 0 || target >= options.length) return;
  [options[index], options[target]] = [options[target], options[index]];
  if (selectedCategory === categoryName) {
    if (selectedSubIndex === index) selectedSubIndex = target;
    else if (selectedSubIndex === target) selectedSubIndex = index;
  }
  saveConfig(false);
  renderAll();
  renderEditorIfOpen();
}
function renderFieldEditor() {
  const host = $('field-editor-list');
  host.replaceChildren();
  config.fields.forEach((field, index) => {
    const row = document.createElement('div');
    row.className = 'category-list-item';
    const input = document.createElement('input');
    input.className = 'inline-edit-input';
    input.value = fieldDisplayName(field);
    input.setAttribute('aria-label', `Назва поля ${index + 1}`);
    input.addEventListener('change', () => {
      const next = input.value.trim();
      if (next === fieldDisplayName(field)) return;
      if (!next || (config.fields.includes(next) && next !== field)) {
        input.value = fieldDisplayName(field);
        return showToast('Назва поля порожня або вже використовується.');
      }
      if (next !== field) renameField(field, next);
    });
    const up = createActionButton('↑', 'small-button', () => moveField(index, -1));
    up.disabled = index === 0;
    const down = createActionButton('↓', 'small-button', () => moveField(index, 1));
    down.disabled = index === config.fields.length - 1;
    row.append(input, up, down);
    host.appendChild(row);
  });
  host.appendChild(createActionButton('+ Додати поле', 'action-button', () => {
    let name = 'Нове поле';
    let n = 2;
    while (config.fields.includes(name)) name = `Нове поле ${n++}`;
    config.fields.push(name);
    Object.values(config.categories).forEach(category => {
      category.data[name] = '';
      (category.subOptions || []).forEach(option => option[name] = '');
    });
    saveConfig(false);
    renderAll();
    renderEditorIfOpen();
  }));
}
function renameField(oldName, newName) {
  const index = config.fields.indexOf(oldName);
  if (index < 0) return;
  config.fields[index] = newName;
  Object.values(config.categories).forEach(category => {
    if (Object.prototype.hasOwnProperty.call(category.data, oldName)) {
      category.data[newName] = category.data[oldName];
      delete category.data[oldName];
    }
    (category.subOptions || []).forEach(option => {
      if (Object.prototype.hasOwnProperty.call(option, oldName)) {
        option[newName] = option[oldName];
        delete option[oldName];
      }
    });
  });
  saveConfig(false);
  renderAll();
  renderEditorIfOpen();
}
function moveField(index, delta) {
  const target = index + delta;
  if (target < 0 || target >= config.fields.length) return;
  [config.fields[index], config.fields[target]] = [config.fields[target], config.fields[index]];
  saveConfig(false);
  renderAll();
  renderEditorIfOpen();
}

function chooseImage(target) {
  currentImageTarget = target;
  imageFileInput.value = '';
  imageFileInput.click();
}
imageFileInput.addEventListener('change', async () => {
  const file = imageFileInput.files?.[0];
  if (!file || !currentImageTarget) return;
  if (!file.type.startsWith('image/')) return showToast('Виберіть файл зображення.');
  if (file.size > 12 * 1024 * 1024) return showToast('Зображення завелике (максимум 12 МБ).');
  const object = getImageTarget(currentImageTarget);
  if (!object) return;
  const previousId = object.imageId;
  const id = makeImageId();
  try {
    await putImage(id, file);
    object.imageId = id;
    if (previousId) await deleteImage(previousId);
    saveConfig(false);
    renderAll();
    renderEditorIfOpen();
    showToast('Зображення збережено.');
  } catch (error) {
    console.error(error);
    showToast('Не вдалося зберегти зображення.');
  } finally {
    currentImageTarget = null;
  }
});
function getImageTarget(target) {
  const category = config.categories[target.category];
  if (!category) return null;
  if (target.type === 'option') return category.subOptions?.[target.index] || null;
  return category;
}

$('add-category-button').addEventListener('click', () => {
  let name = 'Нова категорія';
  let i = 2;
  while (config.categories[name]) name = `Нова категорія ${i++}`;
  config.categories[name] = { icon: 'fa-folder', data: Object.fromEntries(config.fields.map(field => [field, ''])) };
  editorCategory = name;
  selectedCategory = null;
  selectedSubIndex = null;
  saveConfig(false);
  renderAll();
  renderEditorIfOpen();
});
$('open-editor-button').addEventListener('click', openEditor);
editModeButton.addEventListener('click', () => {
  editing = !editing;
  if (editing) {
    if (!editorCategory) editorCategory = selectedCategory || Object.keys(config.categories)[0] || null;
    renderAll();
    openEditor();
  } else {
    renderAll();
    showToast('Режим перегляду увімкнено.');
  }
});
saveButton.addEventListener('click', () => saveConfig(true));
resetBtn.addEventListener('click', resetView);
$('close-editor-button').addEventListener('click', () => editorDialog.close());
$('done-editor-button').addEventListener('click', () => {
  saveConfig(false);
  editorDialog.close();
  renderAll();
  showToast('Зміни збережено.');
});
function openEditor() {
  if (!editorCategory) editorCategory = selectedCategory || Object.keys(config.categories)[0] || null;
  renderEditorIfOpen();
  if (!editorDialog.open) editorDialog.showModal();
}
editorDialog.addEventListener('click', event => {
  if (event.target === editorDialog) editorDialog.close();
});
document.querySelectorAll('[data-editor-tab]').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('[data-editor-tab]').forEach(item => item.classList.toggle('active', item === button));
    document.querySelectorAll('[data-editor-panel]').forEach(panel => panel.hidden = panel.dataset.editorPanel !== button.dataset.editorTab);
  });
});
$('app-title-input').addEventListener('input', event => {
  config.title = event.target.value;
  $('app-title').textContent = config.title;
  $('app-title').title = editing ? 'Натисніть, щоб змінити назву програми' : '';
  document.title = config.title || 'Вибір тарифу';
  saveConfig(false);
});
$('primary-color-input').addEventListener('input', event => {
  config.primaryColor = event.target.value;
  document.documentElement.style.setProperty('--color-primary', config.primaryColor);
  saveConfig(false);
});
$('export-button').addEventListener('click', async () => {
  try {
    const exported = deepClone(config);
    for (const category of Object.values(exported.categories)) {
      if (category.imageId) category.imageData = await imageDataUrl(category.imageId);
      for (const option of category.subOptions || []) {
        if (option.imageId) option.imageData = await imageDataUrl(option.imageId);
      }
    }
    const blob = new Blob([JSON.stringify(exported, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'tarif-auswahl-backup.json';
    anchor.click();
    URL.revokeObjectURL(url);
    showToast('Резервну копію експортовано.');
  } catch (error) {
    console.error(error);
    showToast('Не вдалося експортувати дані.');
  }
});
$('import-button').addEventListener('click', () => $('import-file-input').click());
$('import-file-input').addEventListener('change', async event => {
  const file = event.target.files?.[0];
  if (!file) return;
  try {
    const imported = normaliseConfig(JSON.parse(await file.text()));
    for (const category of Object.values(imported.categories)) {
      if (category.imageData) {
        const id = makeImageId();
        const blob = await (await fetch(category.imageData)).blob();
        await putImage(id, blob);
        category.imageId = id;
        delete category.imageData;
      }
      for (const option of category.subOptions || []) {
        if (option.imageData) {
          const id = makeImageId();
          const blob = await (await fetch(option.imageData)).blob();
          await putImage(id, blob);
          option.imageId = id;
          delete option.imageData;
        }
      }
    }
    config = imported;
    selectedCategory = null;
    selectedSubIndex = null;
    editorCategory = Object.keys(config.categories)[0] || null;
    saveConfig(false);
    renderAll();
    renderEditorIfOpen();
    showToast('Резервну копію імпортовано.');
  } catch (error) {
    console.error(error);
    showToast('Не вдалося імпортувати дані. Виберіть коректний файл резервної копії.');
  } finally {
    event.target.value = '';
  }
});
$('restore-defaults-button').addEventListener('click', async () => {
  if (!confirm('Справді скасувати всі локальні зміни та відновити початкові дані?')) return;
  config = defaultConfig();
  selectedCategory = null;
  selectedSubIndex = null;
  editorCategory = Object.keys(config.categories)[0] || null;
  saveConfig(false);
  renderAll();
  renderEditorIfOpen();
  showToast('Початкові налаштування відновлено.');
});

function init() {
  config = loadConfig();
  editorCategory = Object.keys(config.categories)[0] || null;
  renderAll();
  // Keep old deployments functional: if browser doesn't support dialog, provide a clear fallback.
  if (typeof editorDialog.showModal !== 'function') {
    editModeButton.addEventListener('click', () => showToast('Щоб відкрити редактор, скористайтеся актуальною версією браузера.'));
  }
}
init();
})();
