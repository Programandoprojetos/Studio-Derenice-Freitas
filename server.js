const http = require('http');
const fs = require('fs');
const fsp = require('fs/promises');
const os = require('os');
const path = require('path');
const crypto = require('crypto');

function loadEnvFile() {
  const envPath = path.join(__dirname, '.env');
  if (!fs.existsSync(envPath)) return;

  const lines = fs.readFileSync(envPath, 'utf8').split(/\r?\n/);
  lines.forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return;

    const separatorIndex = trimmed.indexOf('=');
    if (separatorIndex === -1) return;

    const key = trimmed.slice(0, separatorIndex).trim();
    const value = trimmed.slice(separatorIndex + 1).trim().replace(/^['"]|['"]$/g, '');

    if (key && process.env[key] === undefined) {
      process.env[key] = value;
    }
  });
}

loadEnvFile();

const PORT = Number(process.env.PORT || 3000);
const HOST = process.env.HOST || '127.0.0.1';
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'studioadmin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'derenice2025';
const ADMIN_PASSWORD_2 = process.env.ADMIN_PASSWORD_2 || '';

const ROOT_DIR = __dirname;
const DATA_DIR = path.join(ROOT_DIR, 'data');
const DATA_FILE = path.join(DATA_DIR, 'appointments.json');
const SERVICES_FILE = path.join(DATA_DIR, 'services.json');
const EXPENSES_FILE = path.join(DATA_DIR, 'expenses.json');
const CASH_REGISTERS_FILE = path.join(DATA_DIR, 'cash-registers.json');
const CASH_SETTINGS_FILE = path.join(DATA_DIR, 'cash-settings.json');
const CLIENT_PACKAGES_FILE = path.join(DATA_DIR, 'client-packages.json');
const PACKAGE_USAGE_FILE = path.join(DATA_DIR, 'package-usage.json');
const USERS_FILE = path.join(DATA_DIR, 'users.json');
const BACKUP_DIR = path.join(DATA_DIR, 'backups');
const INDEX_FILE = path.join(ROOT_DIR, 'index.html');
const STATIC_DIR = path.join(ROOT_DIR, 'static');

const sessions = new Map();
let writeQueue = Promise.resolve();

const mimeTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8'
};

function createPasswordHash(password, salt = crypto.randomBytes(16).toString('hex')) {
  const iterations = 100000;
  const digest = 'sha512';
  const hash = crypto.pbkdf2Sync(String(password || ''), salt, iterations, 64, digest).toString('hex');
  return `pbkdf2$${iterations}$${digest}$${salt}$${hash}`;
}

function isPasswordHash(value) {
  return String(value || '').startsWith('pbkdf2$');
}

function verifyPassword(password, storedValue) {
  if (!storedValue) return false;
  if (!isPasswordHash(storedValue)) {
    return String(password || '') === String(storedValue || '');
  }

  const [, iterationsValue, digest, salt, expectedHash] = String(storedValue).split('$');
  const iterations = Number(iterationsValue);
  if (!iterations || !digest || !salt || !expectedHash) return false;

  const hash = crypto.pbkdf2Sync(String(password || ''), salt, iterations, 64, digest).toString('hex');
  const expectedBuffer = Buffer.from(expectedHash, 'hex');
  const actualBuffer = Buffer.from(hash, 'hex');
  if (expectedBuffer.length !== actualBuffer.length) return false;
  return crypto.timingSafeEqual(expectedBuffer, actualBuffer);
}

function getUserPasswordValues(user) {
  const values = [];

  if (user?.password) {
    values.push(String(user.password).trim());
  }

  if (Array.isArray(user?.passwords)) {
    user.passwords.forEach((value) => {
      const normalized = String(value || '').trim();
      if (normalized) {
        values.push(normalized);
      }
    });
  }

  return [...new Set(values.filter(Boolean))];
}

function verifyUserPassword(password, user) {
  return getUserPasswordValues(user).some((storedValue) => verifyPassword(password, storedValue));
}

function createBackupFilename(targetPath) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  return `${path.basename(targetPath, path.extname(targetPath))}-${timestamp}${path.extname(targetPath)}`;
}

async function backupFileIfExists(targetPath) {
  if (!fs.existsSync(targetPath)) return;
  await fsp.mkdir(BACKUP_DIR, { recursive: true });
  const backupPath = path.join(BACKUP_DIR, createBackupFilename(targetPath));
  await fsp.copyFile(targetPath, backupPath);
}

async function writeJsonFileWithBackup(targetPath, payload) {
  await backupFileIfExists(targetPath);
  await fsp.writeFile(targetPath, payload, 'utf8');
}

function sendJson(res, statusCode, payload, extraHeaders = {}) {
  const body = JSON.stringify(payload);
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(body),
    ...extraHeaders
  });
  res.end(body);
}

function sendNoContent(res, extraHeaders = {}) {
  res.writeHead(204, extraHeaders);
  res.end();
}

function stripBom(content) {
  return String(content || '').replace(/^\uFEFF/, '');
}

function parseCookies(req) {
  const cookieHeader = req.headers.cookie;
  if (!cookieHeader) return {};

  return cookieHeader.split(';').reduce((acc, entry) => {
    const [name, ...rest] = entry.trim().split('=');
    if (!name) return acc;
    acc[name] = decodeURIComponent(rest.join('='));
    return acc;
  }, {});
}

async function ensureDataFile() {
  await fsp.mkdir(DATA_DIR, { recursive: true });
  await fsp.mkdir(BACKUP_DIR, { recursive: true });
  if (!fs.existsSync(DATA_FILE)) {
    await fsp.writeFile(DATA_FILE, '[]\n', 'utf8');
  }
  if (!fs.existsSync(SERVICES_FILE)) {
    const defaultServices = [
      { id: 'manicure-pedicure', name: 'Manicure / Pedicure', price: 0 },
      { id: 'manicure', name: 'Manicure', price: 0 },
      { id: 'pedicure', name: 'Pedicure', price: 0 },
      { id: 'esmaltacao-gel', name: 'Esmaltação em Gel', price: 0 },
      { id: 'esmaltacao-tradicional', name: 'Esmaltação Tradicional', price: 0 },
      { id: 'alongamento-unhas', name: 'Alongamento de Unhas', price: 0 },
      { id: 'blindagem', name: 'Blindagem', price: 0 },
      { id: 'manutencao-alongamento', name: 'Manutenção de Alongamento', price: 0 },
      { id: 'spa-pes', name: 'Spa de Pés', price: 0 },
      { id: 'fibra', name: 'Fibra', price: 0 },
      { id: 'molde-f1', name: 'Molde F1', price: 0 },
      { id: 'soft-gel', name: 'Soft Gel', price: 0 },
      { id: 'faceta-gel', name: 'Faceta em Gel', price: 0 },
      { id: 'postica-realista', name: 'Postiça Realista', price: 0 },
      { id: 'banho-gel', name: 'Banho em Gel', price: 0 },
      { id: 'cronograma-capilar', name: 'Cronograma Capilar', price: 0 },
      { id: 'cortes', name: 'Cortes', price: 0 },
      { id: 'mechas', name: 'Mechas', price: 0 },
      { id: 'escova-prancha', name: 'Escova e Prancha', price: 0 },
      { id: 'botox-capilar', name: 'Botox Capilar', price: 0 },
      { id: 'selagem', name: 'Selagem', price: 0 },
      { id: 'progressiva', name: 'Progressiva', price: 0 },
      { id: 'sobrancelha', name: 'Sobrancelha', price: 0 },
      { id: 'coloracao', name: 'Coloração', price: 0 },
      { id: 'cachos-permanentes', name: 'Cachos Permanentes', price: 0 }
    ];
    await fsp.writeFile(SERVICES_FILE, `${JSON.stringify(defaultServices, null, 2)}\n`, 'utf8');
  }
  if (!fs.existsSync(EXPENSES_FILE)) {
    await fsp.writeFile(EXPENSES_FILE, '[]\n', 'utf8');
  }
  if (!fs.existsSync(CASH_REGISTERS_FILE)) {
    await fsp.writeFile(CASH_REGISTERS_FILE, '[]\n', 'utf8');
  }
  if (!fs.existsSync(CASH_SETTINGS_FILE)) {
    await fsp.writeFile(CASH_SETTINGS_FILE, `${JSON.stringify({
      auto_enabled: true,
      opening_time: '08:00',
      closing_time: '18:00'
    }, null, 2)}\n`, 'utf8');
  }
  if (!fs.existsSync(CLIENT_PACKAGES_FILE)) {
    await fsp.writeFile(CLIENT_PACKAGES_FILE, '[]\n', 'utf8');
  }
  if (!fs.existsSync(PACKAGE_USAGE_FILE)) {
    await fsp.writeFile(PACKAGE_USAGE_FILE, '[]\n', 'utf8');
  }
  if (!fs.existsSync(USERS_FILE)) {
    const adminPasswords = [ADMIN_PASSWORD, ADMIN_PASSWORD_2]
      .map((value) => String(value || '').trim())
      .filter(Boolean)
      .map((value) => createPasswordHash(value));
    const defaultUsers = [
      { username: ADMIN_USERNAME, password: adminPasswords[0], passwords: adminPasswords, role: 'admin', name: 'Administrador' },
      { username: 'recepcao', password: createPasswordHash('recepcao123'), role: 'recepcao', name: 'Recepção' },
      { username: 'auxiliar', password: createPasswordHash('auxiliar123'), role: 'auxiliar', name: 'Auxiliar' }
    ];
    await fsp.writeFile(USERS_FILE, `${JSON.stringify(defaultUsers, null, 2)}\n`, 'utf8');
  }
}

async function readAppointments() {
  await ensureDataFile();
  const content = stripBom(await fsp.readFile(DATA_FILE, 'utf8'));

  try {
    const parsed = JSON.parse(content);
    if (!Array.isArray(parsed)) return [];
    return parsed.map((appointment) => ({
      id: Number(appointment.id),
      date: String(appointment.date || '').trim(),
      time: String(appointment.time || '').trim(),
      service: String(appointment.service || '').trim(),
      client_name: String(appointment.client_name || appointment.name || '').trim(),
      client_phone: normalizePhone(appointment.client_phone || appointment.phone),
      status: String(appointment.status || 'confirmado').trim().toLowerCase(),
      notes: String(appointment.notes || '').trim(),
      payment_status: String(appointment.payment_status || 'pendente').trim().toLowerCase(),
      payment_method: String(appointment.payment_method || '').trim(),
      discount: Number.isFinite(Number(appointment.discount)) ? Number(appointment.discount) : 0,
      amount_paid: Number.isFinite(Number(appointment.amount_paid)) ? Number(appointment.amount_paid) : 0,
      package_id: String(appointment.package_id || '').trim(),
      package_purchase_id: Number.isFinite(Number(appointment.package_purchase_id)) ? Number(appointment.package_purchase_id) : null,
      package_covered: Boolean(appointment.package_covered),
      created_at: appointment.created_at || null
    })).filter((appointment) => appointment.id && appointment.date && appointment.time && appointment.service && appointment.client_name);
  } catch {
    return [];
  }
}

async function writeAppointments(appointments) {
  await ensureDataFile();
  writeQueue = writeQueue.then(() =>
    writeJsonFileWithBackup(DATA_FILE, `${JSON.stringify(appointments, null, 2)}\n`)
  );
  return writeQueue;
}

async function readServices() {
  await ensureDataFile();
  const content = stripBom(await fsp.readFile(SERVICES_FILE, 'utf8'));

  try {
    const parsed = JSON.parse(content);
    if (!Array.isArray(parsed)) return [];
    return parsed.map((service) => {
      const rawId = String(service.id || '');
      const rawName = String(service.name || '').trim();
      const rawType = String(service.type || '').trim().toLowerCase();
      const inferredPackage = rawType === 'package' ||
        (/^pacote-/.test(rawId) || rawName.toLowerCase().includes('pacote'));

      return {
        id: rawId,
        name: rawName,
        price: Number.isFinite(Number(service.price)) ? Number(service.price) : 0,
        type: inferredPackage ? 'package' : 'standard',
        package_sessions_limit: Number.isFinite(Number(service.package_sessions_limit))
          ? Number(service.package_sessions_limit)
          : (inferredPackage ? 4 : 0),
        package_validity_days: Number.isFinite(Number(service.package_validity_days))
          ? Number(service.package_validity_days)
          : (inferredPackage ? 30 : 0)
      };
    }).filter((service) => service.id && service.name);
  } catch {
    return [];
  }
}

async function writeServices(services) {
  await ensureDataFile();
  writeQueue = writeQueue.then(() =>
    writeJsonFileWithBackup(SERVICES_FILE, `${JSON.stringify(services.map((service) => ({
      id: String(service.id || ''),
      name: String(service.name || '').trim(),
      price: Number.isFinite(Number(service.price)) ? Number(service.price) : 0,
      type: String(service.type || 'standard').trim() === 'package' ? 'package' : 'standard',
      package_sessions_limit: Number.isFinite(Number(service.package_sessions_limit)) ? Number(service.package_sessions_limit) : 0,
      package_validity_days: Number.isFinite(Number(service.package_validity_days)) ? Number(service.package_validity_days) : 0
    })), null, 2)}\n`)
  );
  return writeQueue;
}

async function readExpenses() {
  await ensureDataFile();
  const content = stripBom(await fsp.readFile(EXPENSES_FILE, 'utf8'));

  try {
    const parsed = JSON.parse(content);
    if (!Array.isArray(parsed)) return [];
    return parsed.map((expense) => ({
      id: Number(expense.id),
      date: String(expense.date || '').trim(),
      description: String(expense.description || '').trim(),
      category: String(expense.category || '').trim(),
      amount: Number.isFinite(Number(expense.amount)) ? Number(expense.amount) : 0,
      created_at: expense.created_at || null
    })).filter((expense) => expense.id && expense.date && expense.description);
  } catch {
    return [];
  }
}

async function writeExpenses(expenses) {
  await ensureDataFile();
  writeQueue = writeQueue.then(() =>
    writeJsonFileWithBackup(EXPENSES_FILE, `${JSON.stringify(expenses, null, 2)}\n`)
  );
  return writeQueue;
}

async function readCashRegisters() {
  await ensureDataFile();
  const content = stripBom(await fsp.readFile(CASH_REGISTERS_FILE, 'utf8'));

  try {
    const parsed = JSON.parse(content);
    if (!Array.isArray(parsed)) return [];
    return parsed.map((item) => ({
      id: Number(item.id),
      business_date: String(item.business_date || '').trim(),
      status: String(item.status || 'open').trim().toLowerCase(),
      opening_amount: Number.isFinite(Number(item.opening_amount)) ? Number(item.opening_amount) : 0,
      opening_notes: String(item.opening_notes || '').trim(),
      opened_at: item.opened_at || null,
      opened_by: item.opened_by && typeof item.opened_by === 'object' ? {
        username: String(item.opened_by.username || '').trim(),
        name: String(item.opened_by.name || '').trim()
      } : null,
      closing_counted_amount: Number.isFinite(Number(item.closing_counted_amount)) ? Number(item.closing_counted_amount) : null,
      closing_notes: String(item.closing_notes || '').trim(),
      closed_at: item.closed_at || null,
      closed_by: item.closed_by && typeof item.closed_by === 'object' ? {
        username: String(item.closed_by.username || '').trim(),
        name: String(item.closed_by.name || '').trim()
      } : null,
      summary: item.summary && typeof item.summary === 'object' ? {
        service_income: Number.isFinite(Number(item.summary.service_income)) ? Number(item.summary.service_income) : 0,
        package_income: Number.isFinite(Number(item.summary.package_income)) ? Number(item.summary.package_income) : 0,
        expenses: Number.isFinite(Number(item.summary.expenses)) ? Number(item.summary.expenses) : 0,
        expected_balance: Number.isFinite(Number(item.summary.expected_balance)) ? Number(item.summary.expected_balance) : 0,
        difference: Number.isFinite(Number(item.summary.difference)) ? Number(item.summary.difference) : 0
      } : null,
      auto_managed: Boolean(item.auto_managed),
      created_at: item.created_at || null,
      updated_at: item.updated_at || null
    })).filter((item) => item.id && item.business_date);
  } catch {
    return [];
  }
}

async function writeCashRegisters(cashRegisters) {
  await ensureDataFile();
  writeQueue = writeQueue.then(() =>
    writeJsonFileWithBackup(CASH_REGISTERS_FILE, `${JSON.stringify(cashRegisters, null, 2)}\n`)
  );
  return writeQueue;
}

async function readCashSettings() {
  await ensureDataFile();
  const content = stripBom(await fsp.readFile(CASH_SETTINGS_FILE, 'utf8'));

  try {
    const parsed = JSON.parse(content);
    return {
      auto_enabled: parsed.auto_enabled !== false,
      opening_time: isValidTime(parsed.opening_time) ? String(parsed.opening_time) : '08:00',
      closing_time: isValidTime(parsed.closing_time) ? String(parsed.closing_time) : '18:00'
    };
  } catch {
    return {
      auto_enabled: true,
      opening_time: '08:00',
      closing_time: '18:00'
    };
  }
}

async function writeCashSettings(cashSettings) {
  await ensureDataFile();
  writeQueue = writeQueue.then(() =>
    writeJsonFileWithBackup(CASH_SETTINGS_FILE, `${JSON.stringify(cashSettings, null, 2)}\n`)
  );
  return writeQueue;
}

async function readClientPackages() {
  await ensureDataFile();
  const content = stripBom(await fsp.readFile(CLIENT_PACKAGES_FILE, 'utf8'));

  try {
    const parsed = JSON.parse(content);
    if (!Array.isArray(parsed)) return [];
    return parsed.map((item) => ({
      id: Number(item.id),
      package_id: String(item.package_id || '').trim(),
      client_name: String(item.client_name || item.name || '').trim(),
      client_phone: normalizePhone(item.client_phone || item.phone),
      purchase_date: String(item.purchase_date || '').trim(),
      expires_on: String(item.expires_on || '').trim(),
      sessions_limit: Number.isFinite(Number(item.sessions_limit)) ? Number(item.sessions_limit) : 0,
      validity_days: Number.isFinite(Number(item.validity_days)) ? Number(item.validity_days) : 0,
      total_price: Number.isFinite(Number(item.total_price)) ? Number(item.total_price) : 0,
      amount_paid: Number.isFinite(Number(item.amount_paid)) ? Number(item.amount_paid) : 0,
      payment_status: String(item.payment_status || 'pendente').trim().toLowerCase(),
      payment_method: String(item.payment_method || '').trim(),
      usage_summary: item.usage_summary && typeof item.usage_summary === 'object' ? item.usage_summary : {},
      sessions_used_current_month: Number.isFinite(Number(item.sessions_used_current_month)) ? Number(item.sessions_used_current_month) : 0,
      sessions_remaining_current_month: Number.isFinite(Number(item.sessions_remaining_current_month))
        ? Number(item.sessions_remaining_current_month)
        : (Number.isFinite(Number(item.sessions_limit)) ? Number(item.sessions_limit) : 0),
      notes: String(item.notes || '').trim(),
      created_at: item.created_at || null
    })).filter((item) => item.id && item.package_id && item.client_name && item.purchase_date);
  } catch {
    return [];
  }
}

async function writeClientPackages(clientPackages) {
  await ensureDataFile();
  writeQueue = writeQueue.then(() =>
    writeJsonFileWithBackup(CLIENT_PACKAGES_FILE, `${JSON.stringify(clientPackages, null, 2)}\n`)
  );
  return writeQueue;
}

async function readPackageUsage() {
  await ensureDataFile();
  const content = stripBom(await fsp.readFile(PACKAGE_USAGE_FILE, 'utf8'));

  try {
    const parsed = JSON.parse(content);
    if (!Array.isArray(parsed)) return [];
    return parsed.map((item) => ({
      id: Number(item.id),
      package_purchase_id: Number(item.package_purchase_id),
      appointment_id: Number(item.appointment_id),
      package_id: String(item.package_id || '').trim(),
      client_name: String(item.client_name || '').trim(),
      client_phone: normalizePhone(item.client_phone),
      date: String(item.date || '').trim(),
      time: String(item.time || '').trim(),
      month_key: String(item.month_key || '').trim(),
      status: String(item.status || '').trim().toLowerCase(),
      consumed: Boolean(item.consumed),
      created_at: item.created_at || null,
      updated_at: item.updated_at || null
    })).filter((item) => item.id && item.package_purchase_id && item.appointment_id);
  } catch {
    return [];
  }
}

async function writePackageUsage(packageUsage) {
  await ensureDataFile();
  writeQueue = writeQueue.then(() =>
    writeJsonFileWithBackup(PACKAGE_USAGE_FILE, `${JSON.stringify(packageUsage, null, 2)}\n`)
  );
  return writeQueue;
}

async function readUsers() {
  await ensureDataFile();
  const content = stripBom(await fsp.readFile(USERS_FILE, 'utf8'));

  try {
    const parsed = JSON.parse(content);
    if (!Array.isArray(parsed)) return [];
    let shouldRewriteUsers = false;
    const users = parsed.map((user) => {
      const password = String(user.password || '').trim();
      const passwords = Array.isArray(user.passwords)
        ? user.passwords.map((value) => String(value || '').trim()).filter(Boolean)
        : [];

      if (password && !isPasswordHash(password)) {
        shouldRewriteUsers = true;
      }

      if (passwords.some((value) => !isPasswordHash(value))) {
        shouldRewriteUsers = true;
      }

      const normalizedPasswords = passwords.map((value) => (
        isPasswordHash(value) ? value : createPasswordHash(value)
      ));

      const normalizedPrimaryPassword = password && !isPasswordHash(password) ? createPasswordHash(password) : password;

      if (normalizedPrimaryPassword && !normalizedPasswords.includes(normalizedPrimaryPassword)) {
        normalizedPasswords.unshift(normalizedPrimaryPassword);
      }

      const envAdminPasswords = String(user.username || '').trim() === ADMIN_USERNAME
        ? [ADMIN_PASSWORD, ADMIN_PASSWORD_2].map((value) => String(value || '').trim()).filter(Boolean)
        : [];

      envAdminPasswords.forEach((plainPassword) => {
        if (!normalizedPasswords.some((storedValue) => verifyPassword(plainPassword, storedValue))) {
          normalizedPasswords.push(createPasswordHash(plainPassword));
          shouldRewriteUsers = true;
        }
      });

      const finalPasswords = [...new Set(normalizedPasswords.filter(Boolean))];

      return {
        username: String(user.username || '').trim(),
        password: finalPasswords[0] || '',
        passwords: finalPasswords,
        role: String(user.role || 'auxiliar').trim().toLowerCase(),
        name: String(user.name || user.username || '').trim()
      };
    }).filter((user) => user.username && user.password);

    if (shouldRewriteUsers) {
      writeQueue = writeQueue.then(() =>
        writeJsonFileWithBackup(USERS_FILE, `${JSON.stringify(users, null, 2)}\n`)
      );
      await writeQueue;
    }

    return users;
  } catch {
    return [];
  }
}

function slugifyServiceName(name) {
  return String(name || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function getSessionToken(req) {
  const cookies = parseCookies(req);
  return cookies.admin_session || null;
}

function isAuthenticated(req) {
  const token = getSessionToken(req);
  return Boolean(token && sessions.has(token));
}

function getSession(req) {
  const token = getSessionToken(req);
  return token ? sessions.get(token) || null : null;
}

function createSessionCookie(user) {
  const token = crypto.randomBytes(24).toString('hex');
  sessions.set(token, {
    createdAt: Date.now(),
    username: user.username,
    role: user.role,
    name: user.name
  });
  return `admin_session=${token}; HttpOnly; Path=/; SameSite=Strict`;
}

function clearSession(req) {
  const token = getSessionToken(req);
  if (token) {
    sessions.delete(token);
  }
}

const permissionMatrix = {
  admin: new Set(['manage_services', 'manage_finance', 'manage_appointments', 'manage_status', 'delete_appointments']),
  recepcao: new Set(['manage_finance', 'manage_appointments', 'manage_status']),
  auxiliar: new Set(['manage_status'])
};

function hasPermission(req, permission) {
  const session = getSession(req);
  if (!session) return false;
  return permissionMatrix[session.role]?.has(permission) || false;
}

function requirePermission(req, res, permission, message = 'Você não tem permissão para esta ação.') {
  if (!isAuthenticated(req)) {
    sendJson(res, 401, { error: 'Faça login para continuar.' });
    return false;
  }

  if (!hasPermission(req, permission)) {
    sendJson(res, 403, { error: message });
    return false;
  }

  return true;
}

async function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk;
      if (body.length > 1_000_000) {
        reject(new Error('Corpo da requisição excede o limite permitido.'));
        req.destroy();
      }
    });

    req.on('end', () => {
      if (!body) {
        resolve({});
        return;
      }

      try {
        resolve(JSON.parse(body));
      } catch {
        reject(new Error('JSON inválido.'));
      }
    });

    req.on('error', reject);
  });
}

function isValidDate(value) {
  return /^\d{4}-\d{2}-\d{2}$/.test(String(value || ''));
}

function isValidTime(value) {
  return /^\d{2}:\d{2}$/.test(String(value || ''));
}

function parseAmount(value) {
  const numericValue = Number(value);
  if (!Number.isFinite(numericValue) || numericValue < 0) {
    throw new Error('Valor inválido.');
  }

  return Math.round(numericValue * 100) / 100;
}

function normalizePhone(phone) {
  return String(phone || '').replace(/\D/g, '');
}

function getSaoPauloDateParts(date = new Date()) {
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Sao_Paulo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
  const parts = Object.fromEntries(
    formatter.formatToParts(date)
      .filter((part) => part.type !== 'literal')
      .map((part) => [part.type, part.value])
  );

  return {
    date: `${parts.year}-${parts.month}-${parts.day}`,
    time: `${parts.hour}:${parts.minute}`
  };
}

function timeStringToMinutes(value) {
  const [hours, minutes] = String(value || '').split(':').map(Number);
  return (hours * 60) + minutes;
}

function getDateParts(value) {
  const [year, month, day] = String(value || '').split('-').map(Number);
  return { year, month, day };
}

function addDaysToDateString(dateString, daysToAdd) {
  const { year, month, day } = getDateParts(dateString);
  const date = new Date(Date.UTC(year, (month || 1) - 1, day || 1));
  date.setUTCDate(date.getUTCDate() + daysToAdd);
  return date.toISOString().slice(0, 10);
}

function normalizeClientKey(name, phone) {
  return `${String(name || '').trim().toLowerCase()}::${normalizePhone(phone)}`;
}

function getServiceById(services, serviceId) {
  return services.find((service) => service.id === serviceId) || null;
}

function isPackageService(service) {
  return Boolean(service && service.type === 'package' && service.package_sessions_limit > 0 && service.package_validity_days > 0);
}

function isPackageActiveOnDate(clientPackage, appointmentDate) {
  return appointmentDate >= clientPackage.purchase_date && appointmentDate <= clientPackage.expires_on;
}

function countPackageSessionsUsed(packageUsage, purchaseId, monthKey, ignoredAppointmentId = null) {
  return packageUsage.filter((entry) =>
    entry.package_purchase_id === purchaseId &&
    entry.month_key === monthKey &&
    entry.consumed &&
    entry.appointment_id !== ignoredAppointmentId
  ).length;
}

function buildPackageUsageSummary(clientPackage, packageUsage) {
  const usageByMonth = {};
  const relatedUsage = packageUsage.filter((entry) => entry.package_purchase_id === clientPackage.id);

  relatedUsage.forEach((entry) => {
    const monthKey = entry.month_key;
    if (!usageByMonth[monthKey]) {
      usageByMonth[monthKey] = {
        used: 0,
        remaining: Number(clientPackage.sessions_limit || 0),
        appointment_ids: []
      };
    }

    if (entry.consumed) {
      usageByMonth[monthKey].used += 1;
      usageByMonth[monthKey].remaining = Math.max(0, Number(clientPackage.sessions_limit || 0) - usageByMonth[monthKey].used);
    }

    usageByMonth[monthKey].appointment_ids.push(entry.appointment_id);
  });

  return usageByMonth;
}

function syncPackageUsageEntries(appointments, clientPackages, packageUsage) {
  const usageByAppointmentId = new Map(packageUsage.map((entry) => [entry.appointment_id, entry]));
  const syncedEntries = [];
  const now = new Date().toISOString();

  appointments.forEach((appointment) => {
    if (!appointment.package_purchase_id || !appointment.package_id) return;

    const clientPackage = clientPackages.find((item) => item.id === appointment.package_purchase_id);
    if (!clientPackage) return;

    const existingEntry = usageByAppointmentId.get(appointment.id);
    syncedEntries.push({
      id: existingEntry ? existingEntry.id : Date.now() + syncedEntries.length,
      package_purchase_id: appointment.package_purchase_id,
      appointment_id: appointment.id,
      package_id: appointment.package_id,
      client_name: appointment.client_name,
      client_phone: appointment.client_phone,
      date: appointment.date,
      time: appointment.time,
      month_key: String(appointment.date || '').slice(0, 7),
      status: appointment.status,
      consumed: appointment.status !== 'cancelado',
      created_at: existingEntry?.created_at || appointment.created_at || now,
      updated_at: now
    });
  });

  return syncedEntries;
}

function syncClientPackageBalances(clientPackages, packageUsage) {
  return clientPackages.map((clientPackage) => {
    const usage_summary = buildPackageUsageSummary(clientPackage, packageUsage);
    const currentMonthKey = getTodayMonthKey();
    const currentMonthSummary = usage_summary[currentMonthKey] || {
      used: 0,
      remaining: Number(clientPackage.sessions_limit || 0),
      appointment_ids: []
    };

    return {
      ...clientPackage,
      usage_summary,
      sessions_used_current_month: currentMonthSummary.used,
      sessions_remaining_current_month: currentMonthSummary.remaining
    };
  });
}

async function syncPackageState(appointments, clientPackages) {
  const currentUsage = await readPackageUsage();
  const syncedUsage = syncPackageUsageEntries(appointments, clientPackages, currentUsage);
  const syncedPackages = syncClientPackageBalances(clientPackages, syncedUsage);
  await writePackageUsage(syncedUsage);
  await writeClientPackages(syncedPackages);
  return { packageUsage: syncedUsage, clientPackages: syncedPackages };
}

function getTodayMonthKey() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
}

function resolveClientPackageForAppointment({
  clientPackages,
  packageUsage,
  services,
  serviceId,
  clientName,
  clientPhone,
  appointmentDate,
  ignoredAppointmentId = null
}) {
  const service = getServiceById(services, serviceId);
  if (!isPackageService(service)) {
    return { service, purchase: null, remainingSessions: null };
  }

  const clientKey = normalizeClientKey(clientName, clientPhone);
  const monthKey = String(appointmentDate || '').slice(0, 7);

  const matchingPurchases = clientPackages
    .filter((item) =>
      item.package_id === serviceId &&
      normalizeClientKey(item.client_name, item.client_phone) === clientKey &&
      isPackageActiveOnDate(item, appointmentDate)
    )
    .sort((a, b) => new Date(b.purchase_date) - new Date(a.purchase_date));

  for (const purchase of matchingPurchases) {
    const usedSessions = countPackageSessionsUsed(packageUsage, purchase.id, monthKey, ignoredAppointmentId);
    if (usedSessions < purchase.sessions_limit) {
      return {
        service,
        purchase,
        remainingSessions: purchase.sessions_limit - usedSessions
      };
    }
  }

  return {
    service,
    purchase: null,
    remainingSessions: 0
  };
}

function buildAppointment(payload) {
  const date = String(payload.date || '').trim();
  const time = String(payload.time || '').trim();
  const service = String(payload.service || '').trim();
  const client_name = String(payload.client_name || payload.name || '').trim();
  const client_phone = normalizePhone(payload.client_phone || payload.phone);
  const notes = String(payload.notes || '').trim();
  const payment_status = normalizePaymentStatus(payload.payment_status || 'pendente');
  const payment_method = String(payload.payment_method || '').trim();
  const discount = payload.discount === undefined || payload.discount === ''
    ? 0
    : parseAmount(payload.discount);
  const amount_paid = payload.amount_paid === undefined || payload.amount_paid === ''
    ? 0
    : parseAmount(payload.amount_paid);

  if (!isValidDate(date)) throw new Error('Data inválida.');
  if (!isValidTime(time)) throw new Error('Horário inválido.');
  if (!service) throw new Error('Serviço é obrigatório.');
  if (!client_name) throw new Error('Nome do cliente é obrigatório.');
  if (client_phone && !/^\d{10,11}$/.test(client_phone)) throw new Error('Telefone deve conter DDD e número válido.');

  return {
    id: Date.now(),
    date,
    time,
    service,
    client_name,
    client_phone,
    status: 'confirmado',
    notes,
    payment_status,
    payment_method,
    discount,
    amount_paid,
    package_id: '',
    package_purchase_id: null,
    package_covered: false,
    created_at: new Date().toISOString()
  };
}

function buildClientPackage(payload, services) {
  const package_id = String(payload.package_id || payload.service || '').trim();
  const client_name = String(payload.client_name || payload.name || '').trim();
  const client_phone = normalizePhone(payload.client_phone || payload.phone);
  const purchase_date = String(payload.purchase_date || '').trim();
  const payment_method = String(payload.payment_method || '').trim();
  const notes = String(payload.notes || '').trim();
  const service = getServiceById(services, package_id);

  if (!service || !isPackageService(service)) {
    throw new Error('Pacote inv\u00e1lido.');
  }

  if (!client_name) {
    throw new Error('Nome do cliente \u00e9 obrigat\u00f3rio.');
  }

  if (client_phone && !/^\d{10,11}$/.test(client_phone)) {
    throw new Error('Telefone deve conter DDD e n\u00famero v\u00e1lido.');
  }

  if (!isValidDate(purchase_date)) {
    throw new Error('Data de compra inv\u00e1lida.');
  }

  const total_price = payload.total_price === undefined || payload.total_price === ''
    ? Number(service.price || 0)
    : parseAmount(payload.total_price);
  const amount_paid = payload.amount_paid === undefined || payload.amount_paid === ''
    ? total_price
    : parseAmount(payload.amount_paid);
  const payment_status = normalizePaymentStatus(
    payload.payment_status !== undefined
      ? payload.payment_status
      : (amount_paid >= total_price ? 'pago' : amount_paid > 0 ? 'parcial' : 'pendente')
  );
  const expires_on = addDaysToDateString(purchase_date, Math.max(0, Number(service.package_validity_days || 0) - 1));

  return {
    id: Date.now(),
    package_id,
    client_name,
    client_phone,
    purchase_date,
    expires_on,
    sessions_limit: Number(service.package_sessions_limit || 0),
    validity_days: Number(service.package_validity_days || 0),
    total_price,
    amount_paid,
    payment_status,
    payment_method,
    usage_summary: {},
    sessions_used_current_month: 0,
    sessions_remaining_current_month: Number(service.package_sessions_limit || 0),
    notes,
    created_at: new Date().toISOString()
  };
}

function normalizeAppointmentStatus(status) {
  const normalized = String(status || '').trim().toLowerCase();
  const allowedStatuses = new Set(['confirmado', 'compareceu', 'faltou', 'cancelado', 'remarcado']);
  if (!allowedStatuses.has(normalized)) {
    throw new Error('Status inválido.');
  }
  return normalized;
}

function normalizePaymentStatus(status) {
  const normalized = String(status || '').trim().toLowerCase();
  const allowedStatuses = new Set(['pendente', 'parcial', 'pago']);
  if (!allowedStatuses.has(normalized)) {
    throw new Error('Status de pagamento inválido.');
  }
  return normalized;
}

function buildExpense(payload) {
  const date = String(payload.date || '').trim();
  const description = String(payload.description || '').trim();
  const category = String(payload.category || '').trim();
  const amount = parseAmount(payload.amount);

  if (!isValidDate(date)) throw new Error('Data inválida.');
  if (!description) throw new Error('Descrição do gasto é obrigatória.');

  return {
    id: Date.now(),
    date,
    description,
    category,
    amount,
    created_at: new Date().toISOString()
  };
}

function isNonBillableAppointment(appointment) {
  const status = String(appointment?.status || '').trim().toLowerCase();
  return status === 'faltou' || status === 'cancelado';
}

function calculateFinancialTotalsForDate(date, appointments, clientPackages, expenses) {
  const serviceIncome = appointments
    .filter((appointment) => appointment.date === date && !isNonBillableAppointment(appointment))
    .reduce((total, appointment) => total + Number(appointment.amount_paid || 0), 0);

  const packageIncome = clientPackages
    .filter((item) => item.purchase_date === date)
    .reduce((total, item) => total + Number(item.amount_paid || 0), 0);

  const expenseTotal = expenses
    .filter((item) => item.date === date)
    .reduce((total, item) => total + Number(item.amount || 0), 0);

  return {
    service_income: Math.round(serviceIncome * 100) / 100,
    package_income: Math.round(packageIncome * 100) / 100,
    expenses: Math.round(expenseTotal * 100) / 100
  };
}

function buildCashRegister(payload, session) {
  const business_date = String(payload.business_date || '').trim();
  const opening_notes = String(payload.opening_notes || '').trim();
  const opening_amount = payload.opening_amount === undefined || payload.opening_amount === ''
    ? 0
    : parseAmount(payload.opening_amount);

  if (!isValidDate(business_date)) {
    throw new Error('Data do caixa inválida.');
  }

  return {
    id: Date.now(),
    business_date,
    status: 'open',
    opening_amount,
    opening_notes,
    opened_at: new Date().toISOString(),
    opened_by: session ? {
      username: session.username,
      name: session.name
    } : null,
    closing_counted_amount: null,
    closing_notes: '',
    closed_at: null,
    closed_by: null,
    summary: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
}

function buildAutomaticCashRegister(businessDate, session, cashSettings) {
  return {
    id: Date.now(),
    business_date: businessDate,
    status: 'open',
    opening_amount: 0,
    opening_notes: `Caixa aberto automaticamente as ${cashSettings.opening_time}.`,
    opened_at: new Date().toISOString(),
    opened_by: session ? {
      username: session.username,
      name: session.name
    } : null,
    closing_counted_amount: null,
    closing_notes: '',
    closed_at: null,
    closed_by: null,
    summary: null,
    auto_managed: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
}

function closeCashRegisterAutomatically(cashRegister, session, totals, closingTime) {
  const expectedBalance = Math.round((Number(cashRegister.opening_amount || 0) + totals.service_income + totals.package_income - totals.expenses) * 100) / 100;
  cashRegister.status = 'closed';
  cashRegister.closing_counted_amount = expectedBalance;
  cashRegister.closing_notes = `Caixa fechado automaticamente no horário programado (${closingTime}).`;
  cashRegister.closed_at = new Date().toISOString();
  cashRegister.closed_by = session ? {
    username: session.username,
    name: session.name
  } : null;
  cashRegister.summary = {
    service_income: totals.service_income,
    package_income: totals.package_income,
    expenses: totals.expenses,
    expected_balance: expectedBalance,
    difference: 0
  };
  cashRegister.updated_at = new Date().toISOString();
  cashRegister.auto_managed = true;
}

async function syncAutomaticCashRegisterState(session = null) {
  const cashSettings = await readCashSettings();
  const cashRegisters = await readCashRegisters();

  if (!cashSettings.auto_enabled) {
    return {
      cashSettings,
      cashRegisters,
      openRegister: cashRegisters.find((item) => item.status === 'open') || null
    };
  }

  const now = getSaoPauloDateParts();
  const nowMinutes = timeStringToMinutes(now.time);
  const openingMinutes = timeStringToMinutes(cashSettings.opening_time);
  const closingMinutes = timeStringToMinutes(cashSettings.closing_time);

  const appointments = await readAppointments();
  const clientPackages = await readClientPackages();
  const expenses = await readExpenses();

  let changed = false;
  let openRegister = cashRegisters.find((item) => item.status === 'open') || null;

  if (openRegister && (openRegister.business_date < now.date || nowMinutes >= closingMinutes || nowMinutes < openingMinutes)) {
    const totals = calculateFinancialTotalsForDate(openRegister.business_date, appointments, clientPackages, expenses);
    closeCashRegisterAutomatically(openRegister, session, totals, cashSettings.closing_time);
    openRegister = null;
    changed = true;
  }

  if (!openRegister && nowMinutes >= openingMinutes && nowMinutes < closingMinutes) {
    const todayRegister = cashRegisters.find((item) => item.business_date === now.date && item.status === 'closed');
    if (!todayRegister) {
      openRegister = buildAutomaticCashRegister(now.date, session, cashSettings);
      cashRegisters.push(openRegister);
      changed = true;
    }
  }

  if (changed) {
    await writeCashRegisters(cashRegisters);
  }

  return {
    cashSettings,
    cashRegisters,
    openRegister: cashRegisters.find((item) => item.status === 'open') || null
  };
}

function hasConflict(appointments, date, time, ignoredId = null) {
  return appointments.some((appointment) =>
    appointment.id !== ignoredId &&
    appointment.date === date &&
    appointment.time === time &&
    appointment.status !== 'cancelado'
  );
}

async function serveFile(res, filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const contentType = mimeTypes[ext] || 'application/octet-stream';

  try {
    const content = await fsp.readFile(filePath);
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content);
  } catch (error) {
    if (error.code === 'ENOENT') {
      sendJson(res, 404, { error: 'Arquivo não encontrado.' });
      return;
    }
    sendJson(res, 500, { error: 'Erro ao carregar arquivo.' });
  }
}

function resolvePublicPath(pathname) {
  if (pathname === '/') return INDEX_FILE;

  const normalizedPath = decodeURIComponent(pathname).replace(/^\/+/, '');
  const normalized = path.normalize(normalizedPath).replace(/^(\.\.[/\\])+/, '');
  const resolved = path.join(ROOT_DIR, normalized);
  const relative = path.relative(ROOT_DIR, resolved);

  if (relative.startsWith('..') || path.isAbsolute(relative)) {
    return null;
  }

  return resolved;
}

function getAccessUrls() {
  if (HOST !== '0.0.0.0' && HOST !== '::') {
    return [`http://${HOST}:${PORT}`];
  }

  const interfaces = os.networkInterfaces();
  const urls = new Set([`http://127.0.0.1:${PORT}`]);

  Object.values(interfaces).forEach((entries) => {
    (entries || []).forEach((entry) => {
      if (!entry || entry.internal) return;
      if (entry.family !== 'IPv4') return;
      urls.add(`http://${entry.address}:${PORT}`);
    });
  });

  return Array.from(urls);
}

async function handleApi(req, res, pathname) {
  if (req.method === 'GET' && pathname === '/api/health') {
    sendJson(res, 200, { ok: true });
    return true;
  }

  if (req.method === 'GET' && pathname === '/api/services') {
    sendJson(res, 200, { services: await readServices() });
    return true;
  }

  if (req.method === 'GET' && pathname === '/api/expenses') {
    if (!requirePermission(req, res, 'manage_finance')) return true;
    sendJson(res, 200, { expenses: await readExpenses() });
    return true;
  }

  if (req.method === 'GET' && pathname === '/api/cash-registers') {
    if (!requirePermission(req, res, 'manage_finance')) return true;
    const { cashRegisters, openRegister, cashSettings } = await syncAutomaticCashRegisterState(getSession(req));
    sendJson(res, 200, {
      cash_registers: cashRegisters,
      open_register: openRegister,
      cash_settings: cashSettings
    });
    return true;
  }

  if (req.method === 'POST' && pathname === '/api/cash-settings') {
    if (!requirePermission(req, res, 'manage_finance')) return true;

    const body = await readJsonBody(req);
    const opening_time = String(body.opening_time || '').trim();
    const closing_time = String(body.closing_time || '').trim();
    const auto_enabled = body.auto_enabled !== false;

    if (!isValidTime(opening_time) || !isValidTime(closing_time)) {
      sendJson(res, 400, { error: 'Horário de abertura ou fechamento inválido.' });
      return true;
    }

    if (timeStringToMinutes(opening_time) >= timeStringToMinutes(closing_time)) {
      sendJson(res, 400, { error: 'O horário de fechamento deve ser maior que o de abertura.' });
      return true;
    }

    const cashSettings = { auto_enabled, opening_time, closing_time };
    await writeCashSettings(cashSettings);
    const syncedState = await syncAutomaticCashRegisterState(getSession(req));
    sendJson(res, 200, {
      cash_settings: syncedState.cashSettings,
      cash_registers: syncedState.cashRegisters,
      open_register: syncedState.openRegister
    });
    return true;
  }

  if (req.method === 'GET' && pathname === '/api/client-packages') {
    if (!requirePermission(req, res, 'manage_finance')) return true;
    const clientPackages = syncClientPackageBalances(await readClientPackages(), await readPackageUsage());
    sendJson(res, 200, { client_packages: clientPackages });
    return true;
  }

  if (req.method === 'GET' && pathname === '/api/package-availability') {
    const requestUrl = new URL(req.url, `http://${req.headers.host}`);
    const serviceId = String(requestUrl.searchParams.get('service_id') || '').trim();
    const clientName = String(requestUrl.searchParams.get('client_name') || '').trim();
    const clientPhone = String(requestUrl.searchParams.get('client_phone') || '').trim();
    const appointmentDate = String(requestUrl.searchParams.get('date') || '').trim();

    if (!serviceId || !clientName || !isValidDate(appointmentDate)) {
      sendJson(res, 200, { available: false, remaining_sessions: 0, message: 'Informe cliente, pacote e data para validar o saldo.' });
      return true;
    }

    const services = await readServices();
    const clientPackages = await readClientPackages();
    const packageUsage = await readPackageUsage();
    const resolved = resolveClientPackageForAppointment({
      clientPackages,
      packageUsage,
      services,
      serviceId,
      clientName,
      clientPhone,
      appointmentDate
    });

    if (!isPackageService(resolved.service)) {
      sendJson(res, 200, { available: false, remaining_sessions: null, message: 'O servi\u00e7o selecionado n\u00e3o \u00e9 um pacote mensal.' });
      return true;
    }

    if (!resolved.purchase) {
      sendJson(res, 200, { available: false, remaining_sessions: 0, message: 'Nenhum pacote ativo encontrado para este cliente na data escolhida.' });
      return true;
    }

    sendJson(res, 200, {
      available: true,
      remaining_sessions: resolved.remainingSessions,
      purchase: resolved.purchase,
      message: `Pacote ativo at\u00e9 ${resolved.purchase.expires_on}. Sess\u00f5es restantes neste m\u00eas: ${resolved.remainingSessions}.`
    });
    return true;
  }

  if (req.method === 'GET' && pathname === '/api/public-appointments') {
    const appointments = await readAppointments();
    sendJson(res, 200, {
      appointments: appointments.map(toPublicAppointment)
    });
    return true;
  }

  if (req.method === 'GET' && pathname === '/api/session') {
    const session = getSession(req);
    sendJson(res, 200, {
      authenticated: Boolean(session),
      user: session ? { username: session.username, role: session.role, name: session.name } : null
    });
    return true;
  }

  if (req.method === 'POST' && pathname === '/api/login') {
    const body = await readJsonBody(req);
    const username = String(body.username || '').trim();
    const password = String(body.password || '').trim();
    const users = await readUsers();
    const user = users.find((item) => item.username === username && verifyUserPassword(password, item));

    if (!user) {
      sendJson(res, 401, { error: 'Credenciais inválidas.' });
      return true;
    }

    sendJson(res, 200, {
      authenticated: true,
      user: { username: user.username, role: user.role, name: user.name }
    }, { 'Set-Cookie': createSessionCookie(user) });
    return true;
  }

  if (req.method === 'POST' && pathname === '/api/logout') {
    clearSession(req);
    sendNoContent(res, {
      'Set-Cookie': 'admin_session=; HttpOnly; Path=/; SameSite=Strict; Max-Age=0'
    });
    return true;
  }

  if (req.method === 'GET' && pathname === '/api/appointments') {
    if (!requirePermission(req, res, 'manage_appointments')) return true;
    sendJson(res, 200, { appointments: await readAppointments() });
    return true;
  }

  if (req.method === 'POST' && pathname === '/api/appointments') {
    const appointments = await readAppointments();
    const services = await readServices();
    const clientPackages = await readClientPackages();
    const packageUsage = await readPackageUsage();
    const newAppointment = buildAppointment(await readJsonBody(req));
    const resolvedPackage = resolveClientPackageForAppointment({
      clientPackages,
      packageUsage,
      services,
      serviceId: newAppointment.service,
      clientName: newAppointment.client_name,
      clientPhone: newAppointment.client_phone,
      appointmentDate: newAppointment.date
    });

    if (!services.some((service) => service.id === newAppointment.service)) {
      sendJson(res, 400, { error: 'Serviço inválido.' });
      return true;
    }

    if (hasConflict(appointments, newAppointment.date, newAppointment.time)) {
      sendJson(res, 409, { error: 'Este horário já está reservado.' });
      return true;
    }

    if (isPackageService(resolvedPackage.service)) {
      if (!resolvedPackage.purchase) {
        sendJson(res, 400, { error: 'Este cliente n\u00e3o possui um pacote ativo com saldo para a data escolhida.' });
        return true;
      }

      newAppointment.package_id = resolvedPackage.purchase.package_id;
      newAppointment.package_purchase_id = resolvedPackage.purchase.id;
      newAppointment.package_covered = true;
      newAppointment.payment_status = 'pago';
      newAppointment.payment_method = 'Pacote';
      newAppointment.discount = 0;
      newAppointment.amount_paid = 0;
    }

    appointments.push(newAppointment);
    await writeAppointments(appointments);
    await syncPackageState(appointments, clientPackages);
    sendJson(res, 201, { appointment: newAppointment });
    return true;
  }

  const cancelMatch = pathname.match(/^\/api\/appointments\/(\d+)\/cancel$/);
  if (req.method === 'PATCH' && cancelMatch) {
    if (!requirePermission(req, res, 'manage_status')) return true;

    const id = Number(cancelMatch[1]);
    const appointments = await readAppointments();
    const appointment = appointments.find((item) => item.id === id);

    if (!appointment) {
      sendJson(res, 404, { error: 'Agendamento não encontrado.' });
      return true;
    }

    appointment.status = 'cancelado';
    await writeAppointments(appointments);
    await syncPackageState(appointments, await readClientPackages());
    sendJson(res, 200, { appointment });
    return true;
  }

  const rescheduleMatch = pathname.match(/^\/api\/appointments\/(\d+)\/reschedule$/);
  if (req.method === 'PATCH' && rescheduleMatch) {
    if (!requirePermission(req, res, 'manage_appointments')) return true;

    const id = Number(rescheduleMatch[1]);
    const body = await readJsonBody(req);
    const date = String(body.date || '').trim();
    const time = String(body.time || '').trim();

    if (!isValidDate(date) || !isValidTime(time)) {
      sendJson(res, 400, { error: 'Data ou horário inválido.' });
      return true;
    }

    const appointments = await readAppointments();
    const services = await readServices();
    const clientPackages = await readClientPackages();
    const packageUsage = await readPackageUsage();
    const appointment = appointments.find((item) => item.id === id);

    if (!appointment) {
      sendJson(res, 404, { error: 'Agendamento não encontrado.' });
      return true;
    }

    if (hasConflict(appointments, date, time, id)) {
      sendJson(res, 409, { error: 'Este horário já está reservado.' });
      return true;
    }

    if (appointment.package_id) {
      const resolvedPackage = resolveClientPackageForAppointment({
        clientPackages,
        packageUsage,
        services,
        serviceId: appointment.package_id,
        clientName: appointment.client_name,
        clientPhone: appointment.client_phone,
        appointmentDate: date,
        ignoredAppointmentId: id
      });

      if (!resolvedPackage.purchase) {
        sendJson(res, 400, { error: 'O pacote deste cliente n\u00e3o cobre a nova data informada.' });
        return true;
      }

      appointment.package_purchase_id = resolvedPackage.purchase.id;
    }

    appointment.date = date;
    appointment.time = time;
    appointment.status = 'remarcado';
    await writeAppointments(appointments);
    await syncPackageState(appointments, clientPackages);
    sendJson(res, 200, { appointment });
    return true;
  }

  const updateAppointmentMatch = pathname.match(/^\/api\/appointments\/(\d+)$/);
  if (req.method === 'PATCH' && updateAppointmentMatch) {
    if (!requirePermission(req, res, 'manage_appointments')) return true;

    const id = Number(updateAppointmentMatch[1]);
    const body = await readJsonBody(req);
    const appointments = await readAppointments();
    const services = await readServices();
    const clientPackages = await readClientPackages();
    const packageUsage = await readPackageUsage();
    const appointment = appointments.find((item) => item.id === id);

    if (!appointment) {
      sendJson(res, 404, { error: 'Agendamento não encontrado.' });
      return true;
    }

    const date = String(body.date ?? appointment.date).trim();
    const time = String(body.time ?? appointment.time).trim();
    const service = String(body.service ?? appointment.service).trim();
    const client_name = String(body.client_name ?? body.name ?? appointment.client_name).trim();
    const client_phone = normalizePhone(body.client_phone ?? body.phone ?? appointment.client_phone);
    const notes = String(body.notes ?? appointment.notes ?? '').trim();
    const status = body.status !== undefined
      ? normalizeAppointmentStatus(body.status)
      : appointment.status;
    let payment_status = body.payment_status !== undefined
      ? normalizePaymentStatus(body.payment_status)
      : appointment.payment_status;
    const payment_method = String(body.payment_method ?? appointment.payment_method ?? '').trim();
    const discount = body.discount !== undefined
      ? (body.discount === '' ? 0 : parseAmount(body.discount))
      : Number(appointment.discount || 0);
    let amount_paid = body.amount_paid !== undefined
      ? (body.amount_paid === '' ? 0 : parseAmount(body.amount_paid))
      : Number(appointment.amount_paid || 0);

    if (String(payment_method || '').trim().toLowerCase() === 'pacote') {
      payment_status = 'pago';
      amount_paid = 0;
    }

    if (!isValidDate(date)) {
      sendJson(res, 400, { error: 'Data inválida.' });
      return true;
    }

    if (!isValidTime(time)) {
      sendJson(res, 400, { error: 'Horário inválido.' });
      return true;
    }

    if (!service || !services.some((item) => item.id === service)) {
      sendJson(res, 400, { error: 'Serviço inválido.' });
      return true;
    }

    if (!client_name) {
      sendJson(res, 400, { error: 'Nome do cliente é obrigatório.' });
      return true;
    }

    if (client_phone && !/^\d{10,11}$/.test(client_phone)) {
      sendJson(res, 400, { error: 'Telefone deve conter DDD e número válido.' });
      return true;
    }

    if (hasConflict(appointments, date, time, id)) {
      sendJson(res, 409, { error: 'Este horário já está reservado.' });
      return true;
    }

    appointment.date = date;
    appointment.time = time;
    appointment.service = service;
    appointment.client_name = client_name;
    appointment.client_phone = client_phone;
    appointment.notes = notes;
    appointment.status = status;
    appointment.payment_status = payment_status;
    appointment.payment_method = payment_method;
    appointment.discount = discount;
    appointment.amount_paid = amount_paid;
    const resolvedPackage = resolveClientPackageForAppointment({
      clientPackages,
      packageUsage,
      services,
      serviceId: service,
      clientName: client_name,
      clientPhone: client_phone,
      appointmentDate: date,
      ignoredAppointmentId: id
    });

    if (isPackageService(resolvedPackage.service) && !resolvedPackage.purchase) {
      sendJson(res, 400, { error: 'Este cliente n\u00e3o possui um pacote ativo com saldo para a data escolhida.' });
      return true;
    }

    appointment.package_id = isPackageService(resolvedPackage.service) ? resolvedPackage.purchase.package_id : '';
    appointment.package_purchase_id = isPackageService(resolvedPackage.service) ? resolvedPackage.purchase.id : null;
    appointment.package_covered = isPackageService(resolvedPackage.service);

    if (appointment.package_covered) {
      appointment.payment_status = 'pago';
      appointment.payment_method = 'Pacote';
      appointment.discount = 0;
      appointment.amount_paid = 0;
    }

    await writeAppointments(appointments);
    await syncPackageState(appointments, clientPackages);
    sendJson(res, 200, { appointment });
    return true;
  }

  const deleteMatch = pathname.match(/^\/api\/appointments\/(\d+)$/);
  if (req.method === 'DELETE' && deleteMatch) {
    if (!requirePermission(req, res, 'delete_appointments')) return true;

    const id = Number(deleteMatch[1]);
    const appointments = await readAppointments();
    const remainingAppointments = appointments.filter((item) => item.id !== id);

    if (remainingAppointments.length === appointments.length) {
      sendJson(res, 404, { error: 'Agendamento não encontrado.' });
      return true;
    }

    await writeAppointments(remainingAppointments);
    await syncPackageState(remainingAppointments, await readClientPackages());
    sendNoContent(res);
    return true;
  }

  if (req.method === 'POST' && pathname === '/api/services') {
    if (!requirePermission(req, res, 'manage_services')) return true;

    const body = await readJsonBody(req);
    const name = String(body.name || '').trim();
    const price = parseAmount(body.price);
    const type = String(body.type || 'standard').trim() === 'package' ? 'package' : 'standard';
    const package_sessions_limit = type === 'package' ? Math.max(1, Math.trunc(Number(body.package_sessions_limit || 0))) : 0;
    const package_validity_days = type === 'package' ? Math.max(1, Math.trunc(Number(body.package_validity_days || 0))) : 0;
    const services = await readServices();
    const id = slugifyServiceName(name);

    if (!name) {
      sendJson(res, 400, { error: 'Nome do serviço é obrigatório.' });
      return true;
    }

    if (!id) {
      sendJson(res, 400, { error: 'Nome do serviço inválido.' });
      return true;
    }

    if (type === 'package' && (!package_sessions_limit || !package_validity_days)) {
      sendJson(res, 400, { error: 'Pacotes precisam informar limite de sess\u00f5es e validade em dias.' });
      return true;
    }

    if (services.some((service) => service.id === id || service.name.toLowerCase() === name.toLowerCase())) {
      sendJson(res, 409, { error: 'Esse serviço já existe.' });
      return true;
    }

    const newService = { id, name, price, type, package_sessions_limit, package_validity_days };
    services.push(newService);
    await writeServices(services);
    sendJson(res, 201, { service: newService, services });
    return true;
  }

  const updateServiceMatch = pathname.match(/^\/api\/services\/([^/]+)$/);
  if (req.method === 'PATCH' && updateServiceMatch) {
    if (!requirePermission(req, res, 'manage_services')) return true;

    const serviceId = decodeURIComponent(updateServiceMatch[1]);
    const body = await readJsonBody(req);
    const services = await readServices();
    const service = services.find((item) => item.id === serviceId);

    if (!service) {
      sendJson(res, 404, { error: 'Serviço não encontrado.' });
      return true;
    }

    if (body.name !== undefined) {
      const name = String(body.name || '').trim();
      if (!name) {
        sendJson(res, 400, { error: 'Nome do serviço é obrigatório.' });
        return true;
      }
      service.name = name;
    }

    if (body.price !== undefined) {
      service.price = parseAmount(body.price);
    }

    if (body.type !== undefined) {
      service.type = String(body.type || 'standard').trim() === 'package' ? 'package' : 'standard';
    }

    if (service.type === 'package') {
      if (body.package_sessions_limit !== undefined) {
        service.package_sessions_limit = Math.max(1, Math.trunc(Number(body.package_sessions_limit || 0)));
      }

      if (body.package_validity_days !== undefined) {
        service.package_validity_days = Math.max(1, Math.trunc(Number(body.package_validity_days || 0)));
      }
    } else {
      service.package_sessions_limit = 0;
      service.package_validity_days = 0;
    }

    await writeServices(services);
    sendJson(res, 200, { service, services });
    return true;
  }

  const deleteServiceMatch = pathname.match(/^\/api\/services\/([^/]+)$/);
  if (req.method === 'DELETE' && deleteServiceMatch) {
    if (!requirePermission(req, res, 'manage_services')) return true;

    const serviceId = decodeURIComponent(deleteServiceMatch[1]);
    const services = await readServices();
    const filteredServices = services.filter((service) => service.id !== serviceId);

    if (filteredServices.length === services.length) {
      sendJson(res, 404, { error: 'Serviço não encontrado.' });
      return true;
    }

    await writeServices(filteredServices);
    sendJson(res, 200, { services: filteredServices });
    return true;
  }

  if (req.method === 'POST' && pathname === '/api/client-packages') {
    if (!requirePermission(req, res, 'manage_finance')) return true;

    const services = await readServices();
    const clientPackages = await readClientPackages();
    const clientPackage = buildClientPackage(await readJsonBody(req), services);
    clientPackages.push(clientPackage);
    await writeClientPackages(clientPackages);
    const syncedState = await syncPackageState(await readAppointments(), clientPackages);
    const syncedPackage = syncedState.clientPackages.find((item) => item.id === clientPackage.id) || clientPackage;
    sendJson(res, 201, { client_package: syncedPackage, client_packages: syncedState.clientPackages });
    return true;
  }

  const updateClientPackageMatch = pathname.match(/^\/api\/client-packages\/(\d+)$/);
  const updateClientPackagePostMatch = pathname.match(/^\/api\/client-packages\/(\d+)\/update$/);
  if ((req.method === 'PATCH' && updateClientPackageMatch) || (req.method === 'POST' && updateClientPackagePostMatch)) {
    if (!requirePermission(req, res, 'manage_finance')) return true;

    const id = Number((updateClientPackageMatch || updateClientPackagePostMatch)[1]);
    const body = await readJsonBody(req);
    const clientPackages = await readClientPackages();
    const clientPackage = clientPackages.find((item) => item.id === id);

    if (!clientPackage) {
      sendJson(res, 404, { error: 'Pacote não encontrado.' });
      return true;
    }

    const purchase_date = String(body.purchase_date ?? clientPackage.purchase_date).trim();
    const expires_on = String(body.expires_on ?? clientPackage.expires_on).trim();
    const sessions_limit = body.sessions_limit !== undefined
      ? Math.max(1, Math.trunc(Number(body.sessions_limit || 0)))
      : Number(clientPackage.sessions_limit || 0);
    const amount_paid = body.amount_paid !== undefined
      ? (body.amount_paid === '' ? 0 : parseAmount(body.amount_paid))
      : Number(clientPackage.amount_paid || 0);
    const payment_status = body.payment_status !== undefined
      ? normalizePaymentStatus(body.payment_status)
      : clientPackage.payment_status;
    const payment_method = String(body.payment_method ?? clientPackage.payment_method ?? '').trim();
    const notes = String(body.notes ?? clientPackage.notes ?? '').trim();

    if (!isValidDate(purchase_date) || !isValidDate(expires_on)) {
      sendJson(res, 400, { error: 'Data de compra ou validade inválida.' });
      return true;
    }

    if (expires_on < purchase_date) {
      sendJson(res, 400, { error: 'A validade não pode ser anterior à data da compra.' });
      return true;
    }

    clientPackage.purchase_date = purchase_date;
    clientPackage.expires_on = expires_on;
    clientPackage.sessions_limit = sessions_limit;
    clientPackage.validity_days = Math.max(1, Math.floor((new Date(`${expires_on}T00:00:00`) - new Date(`${purchase_date}T00:00:00`)) / 86400000) + 1);
    clientPackage.amount_paid = amount_paid;
    clientPackage.payment_status = payment_status;
    clientPackage.payment_method = payment_method;
    clientPackage.notes = notes;

    await writeClientPackages(clientPackages);
    const syncedState = await syncPackageState(await readAppointments(), clientPackages);
    const syncedPackage = syncedState.clientPackages.find((item) => item.id === clientPackage.id) || clientPackage;
    sendJson(res, 200, { client_package: syncedPackage, client_packages: syncedState.clientPackages });
    return true;
  }

  const deleteClientPackageMatch = pathname.match(/^\/api\/client-packages\/(\d+)$/);
  const deleteClientPackagePostMatch = pathname.match(/^\/api\/client-packages\/(\d+)\/delete$/);
  if ((req.method === 'DELETE' && deleteClientPackageMatch) || (req.method === 'POST' && deleteClientPackagePostMatch)) {
    if (!requirePermission(req, res, 'manage_finance')) return true;

    const id = Number((deleteClientPackageMatch || deleteClientPackagePostMatch)[1]);
    const clientPackages = await readClientPackages();
    const remainingClientPackages = clientPackages.filter((item) => item.id !== id);

    if (remainingClientPackages.length === clientPackages.length) {
      sendJson(res, 404, { error: 'Pacote não encontrado.' });
      return true;
    }

    await writeClientPackages(remainingClientPackages);
    const syncedState = await syncPackageState(await readAppointments(), remainingClientPackages);
    sendJson(res, 200, { client_packages: syncedState.clientPackages });
    return true;
  }

  if (req.method === 'POST' && pathname === '/api/expenses') {
    if (!requirePermission(req, res, 'manage_finance')) return true;

    const expenses = await readExpenses();
    const expense = buildExpense(await readJsonBody(req));
    expenses.push(expense);
    await writeExpenses(expenses);
    sendJson(res, 201, { expense, expenses });
    return true;
  }

  const deleteExpenseMatch = pathname.match(/^\/api\/expenses\/(\d+)$/);
  const updateExpenseMatch = pathname.match(/^\/api\/expenses\/(\d+)$/);
  if (req.method === 'PATCH' && updateExpenseMatch) {
    if (!requirePermission(req, res, 'manage_finance')) return true;

    const id = Number(updateExpenseMatch[1]);
    const body = await readJsonBody(req);
    const expenses = await readExpenses();
    const expense = expenses.find((item) => item.id === id);

    if (!expense) {
      sendJson(res, 404, { error: 'Gasto não encontrado.' });
      return true;
    }

    const date = String(body.date ?? expense.date).trim();
    const description = String(body.description ?? expense.description).trim();
    const category = String(body.category ?? expense.category).trim();
    const amount = body.amount !== undefined
      ? parseAmount(body.amount)
      : Number(expense.amount || 0);

    if (!isValidDate(date)) {
      sendJson(res, 400, { error: 'Data inválida.' });
      return true;
    }

    if (!description) {
      sendJson(res, 400, { error: 'Descrição do gasto é obrigatória.' });
      return true;
    }

    expense.date = date;
    expense.description = description;
    expense.category = category;
    expense.amount = amount;

    await writeExpenses(expenses);
    sendJson(res, 200, { expense, expenses });
    return true;
  }

  if (req.method === 'DELETE' && deleteExpenseMatch) {
    if (!requirePermission(req, res, 'manage_finance')) return true;

    const id = Number(deleteExpenseMatch[1]);
    const expenses = await readExpenses();
    const remainingExpenses = expenses.filter((item) => item.id !== id);

    if (remainingExpenses.length === expenses.length) {
      sendJson(res, 404, { error: 'Gasto não encontrado.' });
      return true;
    }

    await writeExpenses(remainingExpenses);
    sendJson(res, 200, { expenses: remainingExpenses });
    return true;
  }

  if (req.method === 'POST' && pathname === '/api/cash-registers/open') {
    if (!requirePermission(req, res, 'manage_finance')) return true;
    const cashSettings = await readCashSettings();
    if (cashSettings.auto_enabled) {
      sendJson(res, 400, { error: 'O caixa está em modo automático por horário.' });
      return true;
    }

    const cashRegisters = await readCashRegisters();
    const existingOpenRegister = cashRegisters.find((item) => item.status === 'open');
    if (existingOpenRegister) {
      sendJson(res, 409, { error: 'Já existe um caixa aberto. Feche o caixa atual antes de abrir outro.' });
      return true;
    }

    const cashRegister = buildCashRegister(await readJsonBody(req), getSession(req));
    cashRegisters.push(cashRegister);
    await writeCashRegisters(cashRegisters);
    sendJson(res, 201, {
      cash_register: cashRegister,
      cash_registers: cashRegisters,
      open_register: cashRegister
    });
    return true;
  }

  const closeCashRegisterMatch = pathname.match(/^\/api\/cash-registers\/(\d+)\/close$/);
  if (req.method === 'POST' && closeCashRegisterMatch) {
    if (!requirePermission(req, res, 'manage_finance')) return true;
    const cashSettings = await readCashSettings();
    if (cashSettings.auto_enabled) {
      sendJson(res, 400, { error: 'O caixa está em modo automático por horário.' });
      return true;
    }

    const id = Number(closeCashRegisterMatch[1]);
    const body = await readJsonBody(req);
    const cashRegisters = await readCashRegisters();
    const cashRegister = cashRegisters.find((item) => item.id === id);

    if (!cashRegister) {
      sendJson(res, 404, { error: 'Caixa não encontrado.' });
      return true;
    }

    if (cashRegister.status !== 'open') {
      sendJson(res, 400, { error: 'Este caixa já foi fechado.' });
      return true;
    }

    const countedAmount = body.closing_counted_amount === undefined || body.closing_counted_amount === ''
      ? 0
      : parseAmount(body.closing_counted_amount);
    const closingNotes = String(body.closing_notes || '').trim();
    const appointments = await readAppointments();
    const clientPackages = await readClientPackages();
    const expenses = await readExpenses();
    const totals = calculateFinancialTotalsForDate(cashRegister.business_date, appointments, clientPackages, expenses);
    const expectedBalance = Math.round((Number(cashRegister.opening_amount || 0) + totals.service_income + totals.package_income - totals.expenses) * 100) / 100;
    const difference = Math.round((countedAmount - expectedBalance) * 100) / 100;

    cashRegister.status = 'closed';
    cashRegister.closing_counted_amount = countedAmount;
    cashRegister.closing_notes = closingNotes;
    cashRegister.closed_at = new Date().toISOString();
    cashRegister.closed_by = getSession(req) ? {
      username: getSession(req).username,
      name: getSession(req).name
    } : null;
    cashRegister.summary = {
      service_income: totals.service_income,
      package_income: totals.package_income,
      expenses: totals.expenses,
      expected_balance: expectedBalance,
      difference
    };
    cashRegister.updated_at = new Date().toISOString();

    await writeCashRegisters(cashRegisters);
    sendJson(res, 200, {
      cash_register: cashRegister,
      cash_registers: cashRegisters,
      open_register: null
    });
    return true;
  }

  return false;
}

function toPublicAppointment(appointment) {
  return {
    id: appointment.id,
    date: appointment.date,
    time: appointment.time,
    service: appointment.service,
    status: appointment.status
  };
}

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);

    if (url.pathname.startsWith('/api/')) {
      const handled = await handleApi(req, res, url.pathname);
      if (!handled) {
        sendJson(res, 404, { error: 'Rota não encontrada.' });
      }
      return;
    }

    const filePath = resolvePublicPath(url.pathname);
    if (!filePath) {
      sendJson(res, 400, { error: 'Caminho inválido.' });
      return;
    }

    if (filePath === INDEX_FILE || filePath.startsWith(STATIC_DIR)) {
      await serveFile(res, filePath);
      return;
    }

    sendJson(res, 404, { error: 'Arquivo não encontrado.' });
  } catch (error) {
    sendJson(res, 500, { error: error.message || 'Erro interno do servidor.' });
  }
});

ensureDataFile()
  .then(async () => {
    await readUsers();
    const appointments = await readAppointments();
    const clientPackages = await readClientPackages();
    if (clientPackages.length > 0 || appointments.some((appointment) => appointment.package_purchase_id)) {
      await syncPackageState(appointments, clientPackages);
    }

    server.listen(PORT, HOST, () => {
      console.log('Studio Derenice Freitas iniciado.');
      console.log('Acesse por um destes enderecos:');
      getAccessUrls().forEach((url) => {
        console.log(`- ${url}`);
      });
      console.log(`Logins padrão: ${ADMIN_USERNAME}/${ADMIN_PASSWORD}${ADMIN_PASSWORD_2 ? ` ou ${ADMIN_PASSWORD_2}` : ''}, recepcao/recepcao123, auxiliar/auxiliar123`);
    });
  })
  .catch((error) => {
    console.error('Falha ao iniciar o servidor:', error);
    process.exit(1);
  });
