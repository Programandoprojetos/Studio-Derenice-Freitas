window.__USE_NODE_APP__ = true;

document.addEventListener('DOMContentLoaded', function () {
  const adminPanel = document.getElementById('admin-panel');
  const loginButton = document.getElementById('login-button');
  const loginModal = document.getElementById('login-modal');
  const closeModalBtn = document.getElementById('close-modal');
  const loginForm = document.getElementById('login-form');
  const bookingForm = document.getElementById('booking-form');
  const dateInput = document.getElementById('date');
  const serviceSelect = document.getElementById('service');
  const serviceAdminPanel = document.getElementById('service-admin-panel');
  const serviceForm = document.getElementById('service-form');
  const serviceNameInput = document.getElementById('service-name');
  const servicePriceInput = document.getElementById('service-price');
  const serviceIsPackageInput = document.getElementById('service-is-package');
  const servicePackageSessionsInput = document.getElementById('service-package-sessions');
  const servicePackageValidityInput = document.getElementById('service-package-validity');
  const serviceList = document.getElementById('service-list');
  const serviceAdminToggle = document.getElementById('service-admin-toggle');
  const serviceAdminContent = document.getElementById('service-admin-content');
  const timeInput = document.getElementById('time');
  const appointmentsTable = document.getElementById('appointments-table');
  const appointmentsBody = document.getElementById('appointments-body');
  const appointmentFilters = document.getElementById('appointment-filters');
  const filterSearch = document.getElementById('filter-search');
  const filterDate = document.getElementById('filter-date');
  const filterService = document.getElementById('filter-service');
  const filterStatus = document.getElementById('filter-status');
  const clearFiltersButton = document.getElementById('clear-filters');
  const financePanel = document.getElementById('finance-panel');
  const dashboardPanel = document.getElementById('dashboard-panel');
  const financeReportPanel = document.getElementById('finance-report-panel');
  const financeReportForm = document.getElementById('finance-report-form');
  const reportStartDate = document.getElementById('report-start-date');
  const reportEndDate = document.getElementById('report-end-date');
  const reportIncome = document.getElementById('report-income');
  const reportDiscounts = document.getElementById('report-discounts');
  const reportExpenses = document.getElementById('report-expenses');
  const reportBalance = document.getElementById('report-balance');
  const reportPending = document.getElementById('report-pending');
  const expenseForm = document.getElementById('expense-form');
  const expenseDateInput = document.getElementById('expense-date');
  const expenseDescriptionInput = document.getElementById('expense-description');
  const expenseCategoryInput = document.getElementById('expense-category');
  const expenseAmountInput = document.getElementById('expense-amount');
  const expensesBody = document.getElementById('expenses-body');
  const expenseEditModal = document.getElementById('expense-edit-modal');
  const closeExpenseEditModalBtn = document.getElementById('close-expense-edit-modal');
  const expenseEditForm = document.getElementById('expense-edit-form');
  const expenseEditId = document.getElementById('expense-edit-id');
  const expenseEditDate = document.getElementById('expense-edit-date');
  const expenseEditDescription = document.getElementById('expense-edit-description');
  const expenseEditCategory = document.getElementById('expense-edit-category');
  const expenseEditAmount = document.getElementById('expense-edit-amount');
  const packageForm = document.getElementById('package-form');
  const packageServiceSelect = document.getElementById('package-service');
  const packageClientNameInput = document.getElementById('package-client-name');
  const packageClientPhoneInput = document.getElementById('package-client-phone');
  const packagePurchaseDateInput = document.getElementById('package-purchase-date');
  const packagePaymentMethodInput = document.getElementById('package-payment-method');
  const packageAmountPaidInput = document.getElementById('package-amount-paid');
  const packageNotesInput = document.getElementById('package-notes');
  const packagesBody = document.getElementById('packages-body');
  const packageEditModal = document.getElementById('package-edit-modal');
  const closePackageEditModalBtn = document.getElementById('close-package-edit-modal');
  const packageEditForm = document.getElementById('package-edit-form');
  const packageEditId = document.getElementById('package-edit-id');
  const packageEditClient = document.getElementById('package-edit-client');
  const packageEditService = document.getElementById('package-edit-service');
  const packageEditPurchaseDate = document.getElementById('package-edit-purchase-date');
  const packageEditExpiresOn = document.getElementById('package-edit-expires-on');
  const packageEditSessionsLimit = document.getElementById('package-edit-sessions-limit');
  const packageEditPaymentStatus = document.getElementById('package-edit-payment-status');
  const packageEditPaymentMethod = document.getElementById('package-edit-payment-method');
  const packageEditAmountPaid = document.getElementById('package-edit-amount-paid');
  const packageEditNotes = document.getElementById('package-edit-notes');
  const cashRegisterStatus = document.getElementById('cash-register-status');
  const cashRegisterDate = document.getElementById('cash-register-date');
  const cashRegisterOpening = document.getElementById('cash-register-opening');
  const cashRegisterExpected = document.getElementById('cash-register-expected');
  const cashRegisterDifference = document.getElementById('cash-register-difference');
  const cashSettingsForm = document.getElementById('cash-settings-form');
  const cashOpeningTimeInput = document.getElementById('cash-opening-time');
  const cashClosingTimeInput = document.getElementById('cash-closing-time');
  const cashRegisterSchedule = document.getElementById('cash-register-schedule');
  const cashRegistersBody = document.getElementById('cash-registers-body');
  const financeDayIncome = document.getElementById('finance-day-income');
  const financeDayDiscounts = document.getElementById('finance-day-discounts');
  const financeDayPending = document.getElementById('finance-day-pending');
  const financeDayExpenses = document.getElementById('finance-day-expenses');
  const financeDayBalance = document.getElementById('finance-day-balance');
  const financeMonthIncome = document.getElementById('finance-month-income');
  const financeMonthDiscounts = document.getElementById('finance-month-discounts');
  const financeMonthPending = document.getElementById('finance-month-pending');
  const financeMonthExpenses = document.getElementById('finance-month-expenses');
  const financeMonthBalance = document.getElementById('finance-month-balance');
  const dashboardTodayCount = document.getElementById('dashboard-today-count');
  const dashboardTodayRevenue = document.getElementById('dashboard-today-revenue');
  const dashboardUpcoming = document.getElementById('dashboard-upcoming');
  const dashboardIssues = document.getElementById('dashboard-issues');
  const clientsPanel = document.getElementById('clients-panel');
  const clientSearch = document.getElementById('client-search');
  const clientsBody = document.getElementById('clients-body');
  const notifications = document.getElementById('notifications');
  const notificationList = document.getElementById('notification-list');
  const nextAppointmentSummary = document.getElementById('next-appointment-summary');
  const bookedTimesSummary = document.getElementById('booked-times-summary');
  const workspaceTabs = document.getElementById('workspace-tabs');
  const formDate = document.getElementById('form-date');
  const formService = document.getElementById('form-service');
  const formTime = document.getElementById('form-time');
  const remarkModal = document.getElementById('remark-modal');
  const closeRemarkModalBtn = document.getElementById('close-remark-modal');
  const remarkForm = document.getElementById('remark-form');
  const remarkDate = document.getElementById('remark-date');
  const remarkTime = document.getElementById('remark-time');
  const remarkId = document.getElementById('remark-id');
  const flashMessage = document.getElementById('flash-message');
  const phoneInput = document.getElementById('phone');
  const discountInput = document.getElementById('discount');
  const notesInput = document.getElementById('notes');
  const packageBalanceSummary = document.getElementById('package-balance-summary');
  const editModal = document.getElementById('edit-modal');
  const closeEditModalBtn = document.getElementById('close-edit-modal');
  const editForm = document.getElementById('edit-form');
  const editId = document.getElementById('edit-id');
  const editDate = document.getElementById('edit-date');
  const editTime = document.getElementById('edit-time');
  const editService = document.getElementById('edit-service');
  const editName = document.getElementById('edit-name');
  const editPhone = document.getElementById('edit-phone');
  const editStatus = document.getElementById('edit-status');
  const editPaymentStatus = document.getElementById('edit-payment-status');
  const editPaymentMethod = document.getElementById('edit-payment-method');
  const editDiscount = document.getElementById('edit-discount');
  const editAmountPaid = document.getElementById('edit-amount-paid');
  const editNotes = document.getElementById('edit-notes');
  const floatingSupport = document.querySelector('.floating-support');
  const floatingSupportToggle = document.getElementById('floating-support-toggle');
  const floatingSupportLinks = document.getElementById('floating-support-links');

  let isAdminLoggedIn = false;
  let currentUser = null;
  let appointmentsCache = [];
  let servicesCache = [];
  let expensesCache = [];
  let clientPackagesCache = [];
  let cashRegistersCache = [];
  let openCashRegister = null;
  let cashSettingsCache = {
    auto_enabled: true,
    opening_time: '08:00',
    closing_time: '18:00'
  };
  let flashTimeoutId = null;
  let currentWorkspaceView = 'atendimento';
  let appointmentDateViewMode = 'today';
  let isServiceAdminExpanded = false;

  function can(permission) {
    const permissionsByRole = {
      admin: new Set(['manage_services', 'manage_finance', 'manage_appointments', 'manage_status', 'delete_appointments', 'print_receipt']),
      recepcao: new Set(['manage_finance', 'manage_appointments', 'manage_status', 'print_receipt']),
      auxiliar: new Set(['manage_status', 'print_receipt'])
    };

    if (!currentUser) return false;
    return permissionsByRole[currentUser.role]?.has(permission) || false;
  }

  function showFlash(message, type = 'success') {
    if (!flashMessage) return;

    if (flashTimeoutId) {
      clearTimeout(flashTimeoutId);
    }

    flashMessage.textContent = message;
    flashMessage.className = `flash-message ${type} is-visible`;

    flashTimeoutId = setTimeout(() => {
      flashMessage.className = 'flash-message';
      flashMessage.textContent = '';
    }, 3500);
  }

  async function apiRequest(url, options = {}) {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {})
      },
      ...options
    });

    const contentType = response.headers.get('content-type') || '';
    const payload = contentType.includes('application/json') ? await response.json() : null;

    if (!response.ok) {
      throw new Error(payload && payload.error ? payload.error : 'Falha ao processar a requisição.');
    }

    return payload;
  }

  async function safeApiRequest(url, options = {}, errorMessage = 'Não foi possível concluir a operação.') {

    try {
      return await apiRequest(url, options);
    } catch (error) {
      showFlash(error.message || errorMessage, 'error');
      throw error;
    }
  }

  function setMinDate(dateElement) {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const formattedDate = `${yyyy}-${mm}-${dd}`;
    dateElement.setAttribute('min', formattedDate);
    dateElement.value = formattedDate;
  }

  function generateTimeSlots(selectElement) {
    selectElement.innerHTML = '';

    for (let hour = 7; hour < 20; hour += 1) {
      for (let minutes = 0; minutes < 60; minutes += 15) {
        const hourStr = hour.toString().padStart(2, '0');
        const minutesStr = minutes.toString().padStart(2, '0');
        const timeStr = `${hourStr}:${minutesStr}`;
        const option = document.createElement('option');
        option.value = timeStr;
        if ('textContent' in option) {
          option.textContent = timeStr;
        }
        selectElement.appendChild(option);
      }
    }
  }

  function syncBookingFields() {
    formDate.value = dateInput.value;
    formService.value = serviceSelect.value;
    formTime.value = timeInput.value;
  }

  function formatPhoneNumber(phone) {
    const digits = String(phone || '').replace(/\D/g, '');
    if (!digits) return 'Não informado';
    if (digits.length === 11) {
      return digits.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
    }
    if (digits.length === 10) {
      return digits.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3');
    }
    return phone;
  }

  function applyPhoneMask(value) {
    const digits = String(value || '').replace(/\D/g, '').slice(0, 11);
    if (digits.length <= 2) return digits;
    if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  }

  function formatDisplayDate(date) {
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
  }

  function formatCurrency(value) {
    return Number(value || 0).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  }

  function normalizeAmountInputValue(value) {
    return String(value || '').trim().replace(',', '.');
  }

  function setupSmartAmountInput(input) {
    if (!input) return;

    input.addEventListener('focus', function () {
      const normalizedValue = normalizeAmountInputValue(this.value);
      const numericValue = Number(normalizedValue || 0);

      if (!normalizedValue || numericValue === 0) {
        this.value = '';
        return;
      }

      this.select();
    });

    input.addEventListener('blur', function () {
      const normalizedValue = normalizeAmountInputValue(this.value);
      if (!normalizedValue) {
        this.value = '';
      }
    });
  }

  function getTodayLocalDateString() {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }

  function syncAppointmentDateFocus() {
    if (!filterDate) return;

    if (appointmentDateViewMode === 'today') {
      filterDate.value = getTodayLocalDateString();
    }
  }

  function getCurrentMonthKey() {
    return getTodayLocalDateString().slice(0, 7);
  }

  function getPackageRemainingSessions(clientPackage, monthKey = getCurrentMonthKey()) {
    if (!clientPackage) return 0;
    if (clientPackage.usage_summary && clientPackage.usage_summary[monthKey]) {
      return Number(clientPackage.usage_summary[monthKey].remaining || 0);
    }
    if (monthKey === getCurrentMonthKey()) {
      return Number(clientPackage.sessions_remaining_current_month || 0);
    }
    return Number(clientPackage.sessions_limit || 0);
  }

  function getPackageUsedSessions(clientPackage, monthKey = getCurrentMonthKey()) {
    if (!clientPackage) return 0;
    if (clientPackage.usage_summary && clientPackage.usage_summary[monthKey]) {
      return Number(clientPackage.usage_summary[monthKey].used || 0);
    }
    if (monthKey === getCurrentMonthKey()) {
      return Number(clientPackage.sessions_used_current_month || 0);
    }
    return 0;
  }

  function getServiceLabel(serviceId) {
    const service = servicesCache.find((item) => item.id === serviceId);
    return service ? service.name : serviceId;
  }

  function getServicePrice(serviceId) {
    const service = servicesCache.find((item) => item.id === serviceId);
    return service ? Number(service.price || 0) : 0;
  }

  function getServiceMeta(serviceId) {
    return servicesCache.find((item) => item.id === serviceId) || null;
  }

  function isPackageService(serviceId) {
    const service = getServiceMeta(serviceId);
    return Boolean(service && service.type === 'package');
  }

  function getAmountPaid(appointment) {
    return Number(appointment && appointment.amount_paid ? appointment.amount_paid : 0);
  }

  function getDiscountAmount(appointment) {
    return Number(appointment && appointment.discount ? appointment.discount : 0);
  }

  function isNonBillableAppointment(appointment) {
    const status = String(appointment && appointment.status ? appointment.status : '').toLowerCase();
    return status === 'faltou' || status === 'cancelado';
  }

  function isPackagePaidAppointment(appointment) {
    const paymentMethod = String(appointment && appointment.payment_method ? appointment.payment_method : '').toLowerCase();
    return paymentMethod === 'pacote';
  }

  function getNetServicePrice(appointment) {
    if (isNonBillableAppointment(appointment)) {
      return 0;
    }
    if (appointment && appointment.package_covered) {
      return 0;
    }
    const servicePrice = getServicePrice(appointment.service);
    const discount = getDiscountAmount(appointment);
    return Math.max(0, servicePrice - discount);
  }

  function getPendingAmount(appointment) {
    if (isNonBillableAppointment(appointment)) {
      return 0;
    }
    if (isPackagePaidAppointment(appointment)) {
      return 0;
    }
    if (appointment && appointment.package_covered) {
      return 0;
    }
    if (getDiscountAmount(appointment) > 0) {
      return 0;
    }
    const servicePrice = getNetServicePrice(appointment);
    const amountPaid = getAmountPaid(appointment);
    return Math.max(0, servicePrice - amountPaid);
  }

  function getPendingLabel(appointment) {
    if (isNonBillableAppointment(appointment)) {
      return '-';
    }
    if (isPackagePaidAppointment(appointment)) {
      return '-';
    }
    if (appointment && appointment.package_covered) {
      return 'Coberto pelo pacote';
    }
    if (getDiscountAmount(appointment) > 0) {
      return 'Desconto aplicado';
    }
    return formatCurrency(getPendingAmount(appointment));
  }

  function isDateWithinRange(date, startDate, endDate) {
    if (!date) return false;
    if (startDate && date < startDate) return false;
    if (endDate && date > endDate) return false;
    return true;
  }

  function formatAppointmentLabel(appointment) {
    const serviceLabel = getServiceLabel(appointment.service);
    if (appointment.client_name) {
      return `${formatDisplayDate(appointment.date)} às ${appointment.time} - ${appointment.client_name} (${serviceLabel})`;
    }
    return `${formatDisplayDate(appointment.date)} às ${appointment.time} - ${serviceLabel}`;
  }

  function getStatusClass(status) {
    switch (String(status || '').toLowerCase()) {
      case 'confirmado': return 'status-confirmed';
      case 'compareceu': return 'status-confirmed';
      case 'faltou': return 'status-cancelled';
      case 'cancelado': return 'status-cancelled';
      case 'remarcado': return 'status-rescheduled';
      default: return '';
    }
  }

  function getStatusLabel(status) {
    const labels = {
      confirmado: 'Confirmado',
      compareceu: 'Compareceu',
      faltou: 'Faltou',
      cancelado: 'Cancelado',
      remarcado: 'Remarcado'
    };
    return labels[String(status || '').toLowerCase()] || status;
  }

  function getPaymentStatusLabel(status) {
    const labels = {
      pendente: 'Pendente',
      parcial: 'Parcial',
      pago: 'Pago'
    };
    return labels[String(status || '').toLowerCase()] || 'Pendente';
  }

  function getAppointmentPaymentDisplay(appointment) {
    if (isNonBillableAppointment(appointment)) {
      return '-';
    }

    const paymentLabel = getPaymentStatusLabel(appointment.payment_status);
    return `${paymentLabel}${appointment.payment_method ? ` / ${appointment.payment_method}` : ''}`;
  }

  function syncAppointmentPaymentFields() {
    if (!editPaymentMethod || !editPaymentStatus || !editAmountPaid) return;

    const isPackagePayment = String(editPaymentMethod.value || '').trim().toLowerCase() === 'pacote';
    if (isPackagePayment) {
      editPaymentStatus.value = 'pago';
      editAmountPaid.value = '0.00';
      editAmountPaid.setAttribute('readonly', 'readonly');
    } else {
      editAmountPaid.removeAttribute('readonly');
    }
  }

  function getCashTotalsForDate(date) {
    const serviceIncome = appointmentsCache
      .filter((appointment) => appointment.date === date && !isNonBillableAppointment(appointment))
      .reduce((total, appointment) => total + getAmountPaid(appointment), 0);
    const packageIncome = clientPackagesCache
      .filter((clientPackage) => clientPackage.purchase_date === date)
      .reduce((total, clientPackage) => total + Number(clientPackage.amount_paid || 0), 0);
    const expenses = expensesCache
      .filter((expense) => expense.date === date)
      .reduce((total, expense) => total + Number(expense.amount || 0), 0);

    return {
      serviceIncome,
      packageIncome,
      expenses,
      totalIncome: serviceIncome + packageIncome
    };
  }

  function getCashRegisterExpectedBalance(cashRegister) {
    if (!cashRegister) return 0;
    const totals = getCashTotalsForDate(cashRegister.business_date);
    return Number(cashRegister.opening_amount || 0) + totals.totalIncome - totals.expenses;
  }

  function getCashRegisterDifference(cashRegister) {
    if (!cashRegister || cashRegister.closing_counted_amount === null || cashRegister.closing_counted_amount === undefined) {
      return 0;
    }

    if (cashRegister.summary && Number.isFinite(Number(cashRegister.summary.difference))) {
      return Number(cashRegister.summary.difference);
    }

    return Number(cashRegister.closing_counted_amount || 0) - getCashRegisterExpectedBalance(cashRegister);
  }

  function getCashRegisterStatusLabel(status) {
    return String(status || '').toLowerCase() === 'open' ? 'Aberto' : 'Fechado';
  }

  function getFilteredAppointments() {
    const searchValue = String(filterSearch.value || '').trim().toLowerCase();
    const dateValue = filterDate.value;
    const serviceValue = filterService.value;
    const statusValue = filterStatus.value;
    const today = getTodayLocalDateString();

    return appointmentsCache.filter((appointment) => {
      const phoneValue = String(appointment.client_phone || '');
      const matchesSearch = !searchValue ||
        String(appointment.client_name || '').toLowerCase().includes(searchValue) ||
        phoneValue.includes(searchValue.replace(/\D/g, ''));
      const matchesDate = !dateValue || appointment.date === dateValue;
      const matchesService = !serviceValue || appointment.service === serviceValue;
      const matchesStatus = !statusValue || appointment.status === statusValue;
      const shouldHideCompletedToday = appointmentDateViewMode === 'today' &&
        !searchValue &&
        !serviceValue &&
        !statusValue &&
        appointment.date === today &&
        ['compareceu', 'faltou', 'cancelado'].includes(appointment.status);

      return !shouldHideCompletedToday && matchesSearch && matchesDate && matchesService && matchesStatus;
    });
  }

  function updateFilterServiceOptions() {
    if (!filterService) return;
    const currentValue = filterService.value;
    filterService.innerHTML = '<option value="">Todos os serviços</option>';

    servicesCache.forEach((service) => {
      const option = document.createElement('option');
      option.value = service.id;
      option.textContent = service.name;
      filterService.appendChild(option);
    });

    filterService.value = currentValue;
  }

  function renderServices() {
    serviceSelect.innerHTML = '';
    editService.innerHTML = '';
    if (packageServiceSelect) {
      packageServiceSelect.innerHTML = '<option value="">Selecione um pacote</option>';
    }

    servicesCache.forEach((service) => {
      const option = document.createElement('option');
      option.value = service.id;
      option.textContent = `${service.name}${service.type === 'package' ? ` (${service.package_sessions_limit} sessões)` : ''} - ${formatCurrency(service.price)}`;
      serviceSelect.appendChild(option);

      const editOption = document.createElement('option');
      editOption.value = service.id;
      editOption.textContent = service.name;
      editService.appendChild(editOption);

      if (packageServiceSelect && service.type === 'package') {
        const packageOption = document.createElement('option');
        packageOption.value = service.id;
        packageOption.textContent = `${service.name} - ${service.package_sessions_limit} sessões / ${service.package_validity_days} dias`;
        packageServiceSelect.appendChild(packageOption);
      }
    });

    updateFilterServiceOptions();

    serviceList.innerHTML = '';

    if (servicesCache.length === 0) {
      const emptyItem = document.createElement('li');
      emptyItem.textContent = 'Nenhum serviço cadastrado.';
      serviceList.appendChild(emptyItem);
    } else {
      servicesCache.forEach((service) => {
        const item = document.createElement('li');
        item.innerHTML = `
          <div class="service-item-details">
            <strong>${service.name}</strong>
            <span>${service.type === 'package'
              ? `${formatCurrency(service.price)} | Pacote: ${service.package_sessions_limit} sessões em ${service.package_validity_days} dias`
              : formatCurrency(service.price)}</span>
          </div>
          <div class="service-price-editor">
            <input type="number" data-price-id="${service.id}" min="0" step="0.01" value="${Number(service.price || 0).toFixed(2)}" aria-label="Preço do serviço ${service.name}">
            <button type="button" class="save-price" data-save-id="${service.id}" aria-label="Salvar preço do serviço ${service.name}">Salvar preço</button>
            <button type="button" data-id="${service.id}" aria-label="Remover serviço ${service.name}">Remover</button>
          </div>
        `;
        serviceList.appendChild(item);
      });

      serviceList.querySelectorAll('button[data-save-id]').forEach((button) => {
        button.addEventListener('click', async function () {
          const serviceId = this.getAttribute('data-save-id');
          const input = serviceList.querySelector(`input[data-price-id="${serviceId}"]`);

          try {
            const data = await safeApiRequest(`/api/services/${encodeURIComponent(serviceId)}`, {
              method: 'PATCH',
              body: JSON.stringify({ price: input.value })
            }, 'Não foi possível atualizar o preço do serviço.');
            servicesCache = Array.isArray(data.services) ? data.services.slice() : [];
            renderServices();
            renderAppointmentsTable();
            renderFinanceSummary();
            showFlash('Preço do serviço atualizado com sucesso!');
          } catch {}
        });
      });

      serviceList.querySelectorAll('button[data-id]').forEach((button) => {
        button.addEventListener('click', async function () {
          const serviceId = this.getAttribute('data-id');

          try {
            const data = await safeApiRequest(`/api/services/${encodeURIComponent(serviceId)}`, { method: 'DELETE' }, 'Não foi possível remover o serviço.');
            servicesCache = Array.isArray(data.services) ? data.services.slice() : [];
            renderServices();
            renderAppointmentsTable();
            renderFinanceSummary();
            syncBookingFields();
            showFlash('Serviço removido com sucesso!');
          } catch {}
        });
      });
    }

    syncBookingFields();
    refreshPackageBalanceSummary();
  }

  function getActiveAppointments() {
    return appointmentsCache.filter((appointment) => appointment.status !== 'cancelado');
  }

  function getClientPackagePendingAmount(clientPackage) {
    return Math.max(0, Number(clientPackage.total_price || 0) - Number(clientPackage.amount_paid || 0));
  }

  async function refreshPackageBalanceSummary() {
    if (!packageBalanceSummary) return;

    const serviceId = serviceSelect.value;
    const clientName = document.getElementById('name').value.trim();
    const clientPhone = document.getElementById('phone').value.trim();
    const date = dateInput.value;

    if (!isPackageService(serviceId)) {
      packageBalanceSummary.textContent = '';
      return;
    }

    if (!clientName || !date) {
      packageBalanceSummary.textContent = 'Informe o nome do cliente para validar o saldo do pacote.';
      return;
    }

    try {
      const data = await apiRequest(`/api/package-availability?service_id=${encodeURIComponent(serviceId)}&client_name=${encodeURIComponent(clientName)}&client_phone=${encodeURIComponent(clientPhone)}&date=${encodeURIComponent(date)}`);
      packageBalanceSummary.textContent = data.message || '';
      packageBalanceSummary.className = `booked-times-summary${data.available ? '' : ' status-cancelled'}`;
    } catch (error) {
      packageBalanceSummary.textContent = error.message || 'Não foi possível validar o pacote.';
      packageBalanceSummary.className = 'booked-times-summary status-cancelled';
    }
  }

  function renderClientPackagesTable() {
    if (!packagesBody) return;

    packagesBody.innerHTML = '';

    if (!isAdminLoggedIn) {
      return;
    }

    if (clientPackagesCache.length === 0) {
      const emptyRow = document.createElement('tr');
      emptyRow.innerHTML = '<td colspan="8">Nenhum pacote vendido.</td>';
      packagesBody.appendChild(emptyRow);
      return;
    }

    clientPackagesCache
      .slice()
      .sort((a, b) => new Date(b.purchase_date) - new Date(a.purchase_date))
      .forEach((clientPackage) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${formatDisplayDate(clientPackage.purchase_date)}</td>
          <td>${clientPackage.client_name}<br><small>${formatPhoneNumber(clientPackage.client_phone)}</small></td>
          <td>${getServiceLabel(clientPackage.package_id)}</td>
          <td>${getPackageUsedSessions(clientPackage)}</td>
          <td>${getPackageRemainingSessions(clientPackage)}</td>
          <td>${formatDisplayDate(clientPackage.expires_on)}</td>
          <td>${getPaymentStatusLabel(clientPackage.payment_status)}${clientPackage.payment_method ? ` / ${clientPackage.payment_method}` : ''}<br><small>Pendente: ${formatCurrency(getClientPackagePendingAmount(clientPackage))}</small></td>
          <td class="action-buttons">
            <button type="button" class="edit" data-package-id="${clientPackage.id}" aria-label="Editar pacote de ${clientPackage.client_name}">Editar</button>
            <button type="button" class="delete" data-package-id="${clientPackage.id}" aria-label="Excluir pacote de ${clientPackage.client_name}">Excluir</button>
          </td>
        `;
        packagesBody.appendChild(row);
      });

    packagesBody.querySelectorAll('button[data-package-id].edit').forEach((button) => {
      button.addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();
        const id = Number(this.getAttribute('data-package-id'));
        if (id) {
          openPackageEditModal(id);
        }
      });
    });

    packagesBody.querySelectorAll('button[data-package-id].delete').forEach((button) => {
      button.addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();
        const id = Number(this.getAttribute('data-package-id'));
        if (id) {
          deleteClientPackage(id);
        }
      });
    });
  }

  function updateServiceAdminVisibility() {
    if (!serviceAdminToggle || !serviceAdminContent) return;

    serviceAdminToggle.textContent = isServiceAdminExpanded ? 'Ocultar serviços' : 'Mostrar serviços';
    serviceAdminToggle.setAttribute('aria-expanded', String(isServiceAdminExpanded));
    serviceAdminContent.hidden = !isServiceAdminExpanded;
  }

  function openPackageEditModal(id) {
    const clientPackage = clientPackagesCache.find((item) => item.id === id);
    if (!clientPackage || !packageEditModal) {
      showFlash('Pacote não encontrado.', 'error');
      return;
    }

    packageEditId.value = String(clientPackage.id);
    packageEditClient.value = clientPackage.client_name;
    packageEditService.value = getServiceLabel(clientPackage.package_id);
    packageEditPurchaseDate.value = clientPackage.purchase_date;
    packageEditExpiresOn.value = clientPackage.expires_on;
    packageEditSessionsLimit.value = String(clientPackage.sessions_limit || 1);
    packageEditPaymentStatus.value = clientPackage.payment_status || 'pendente';
    packageEditPaymentMethod.value = clientPackage.payment_method || '';
    packageEditAmountPaid.value = Number(clientPackage.amount_paid || 0).toFixed(2);
    packageEditNotes.value = clientPackage.notes || '';
    packageEditModal.style.display = 'flex';
  }

  async function deleteClientPackage(id) {
    if (!confirm('Tem certeza que deseja excluir este pacote vendido?')) return;

    try {
      await safeApiRequest(`/api/client-packages/${id}/delete`, { method: 'POST', body: JSON.stringify({}) }, 'Não foi possível excluir o pacote.');
      await loadClientPackages();
      await refreshPackageBalanceSummary();
      showFlash('Pacote excluído com sucesso!');
    } catch {}
  }

  function getBookedAppointmentsForDate(date) {
    return getActiveAppointments()
      .filter((appointment) => appointment.date === date)
      .sort((a, b) => a.time.localeCompare(b.time));
  }

  function getNextAppointment() {
    const now = new Date();

    return getActiveAppointments()
      .filter((appointment) => new Date(`${appointment.date}T${appointment.time}:00`) >= now)
      .sort((a, b) => new Date(`${a.date}T${a.time}:00`) - new Date(`${b.date}T${b.time}:00`))[0] || null;
  }

  function isUpcomingAppointment(appointment) {
    if (appointment.status === 'cancelado') return false;
    return new Date(`${appointment.date}T${appointment.time}:00`) >= new Date();
  }

  function updateTimeAvailability() {
    const selectedDate = dateInput.value;
    const bookedAppointments = getBookedAppointmentsForDate(selectedDate);
    const bookedTimes = bookedAppointments.map((appointment) => appointment.time);

    if (bookedTimesSummary) {
      bookedTimesSummary.textContent = bookedTimes.length > 0
        ? `Horários já marcados neste dia: ${bookedTimes.join(', ')}.`
        : 'Nenhum horário marcado para este dia.';
    }

    syncBookingFields();
  }

  function applyWorkspaceView() {
    if (!workspaceTabs) return;

    if (!isAdminLoggedIn) {
      workspaceTabs.style.display = 'none';
      ['notifications', 'dashboard-panel', 'booking-panel', 'appointments-panel', 'finance-panel', 'finance-report-panel', 'clients-panel']
        .forEach((panelId) => {
          const panel = document.getElementById(panelId);
          if (!panel) return;
          if (panelId === 'notifications' || panelId === 'booking-panel') {
            panel.style.display = '';
          }
        });
      return;
    }

    workspaceTabs.style.display = 'flex';
    workspaceTabs.querySelectorAll('[data-workspace-view]').forEach((button) => {
      button.classList.toggle('is-active', button.getAttribute('data-workspace-view') === currentWorkspaceView);
    });

    const panelsByView = {
      atendimento: {
        'notifications': 'block',
        'dashboard-panel': 'block',
        'booking-panel': 'block',
        'appointments-panel': 'block'
      },
      financeiro: {
        'finance-panel': can('manage_finance') ? 'block' : 'none',
        'finance-report-panel': can('manage_finance') ? 'block' : 'none'
      },
      clientes: {
        'clients-panel': 'block'
      }
    };

    ['notifications', 'dashboard-panel', 'booking-panel', 'appointments-panel', 'finance-panel', 'finance-report-panel', 'clients-panel']
      .forEach((panelId) => {
        const panel = document.getElementById(panelId);
        if (!panel) return;
        panel.style.display = panelsByView[currentWorkspaceView]?.[panelId] || 'none';
      });
  }

  function updateUIForAdminStatus() {
    document.querySelectorAll('.admin-only').forEach((element) => {
      if (isAdminLoggedIn) {
        element.classList.remove('disabled');
        element.removeAttribute('disabled');
      } else {
        element.classList.add('disabled');
        element.setAttribute('disabled', 'disabled');
      }
    });

    if (appointmentsTable) appointmentsTable.style.display = isAdminLoggedIn && can('manage_appointments') ? 'table' : 'none';
    if (appointmentFilters) appointmentFilters.style.display = isAdminLoggedIn && can('manage_appointments') ? 'grid' : 'none';
    const appointmentsPanel = document.getElementById('appointments-panel');
    if (appointmentsPanel) appointmentsPanel.style.display = isAdminLoggedIn && can('manage_appointments') ? 'block' : 'none';
    if (adminPanel) {
      adminPanel.style.display = isAdminLoggedIn ? 'block' : 'none';
      const adminInfo = document.getElementById('admin-info');
      if (adminInfo && currentUser) {
        adminInfo.textContent = `Usuário: ${currentUser.name} (${currentUser.role}).`;
      }
    }
    if (serviceAdminPanel) serviceAdminPanel.style.display = isAdminLoggedIn && can('manage_services') ? 'block' : 'none';
    if ((!isAdminLoggedIn || !can('manage_services')) && serviceAdminContent) {
      isServiceAdminExpanded = false;
      updateServiceAdminVisibility();
    }
    if (financePanel) financePanel.style.display = isAdminLoggedIn && can('manage_finance') ? 'block' : 'none';
    if (dashboardPanel) dashboardPanel.style.display = isAdminLoggedIn ? 'block' : 'none';
    if (financeReportPanel) financeReportPanel.style.display = isAdminLoggedIn && can('manage_finance') ? 'block' : 'none';
    if (clientsPanel) clientsPanel.style.display = isAdminLoggedIn ? 'block' : 'none';
    loginButton.textContent = isAdminLoggedIn ? 'Logout' : 'Login';
    loginButton.setAttribute('aria-label', isAdminLoggedIn ? 'Encerrar sessão do usuário' : 'Abrir login do sistema');

    if (!isAdminLoggedIn) {
      if (appointmentsBody) appointmentsBody.innerHTML = '';
      if (expensesBody) expensesBody.innerHTML = '';
      if (packagesBody) packagesBody.innerHTML = '';
      if (cashRegistersBody) cashRegistersBody.innerHTML = '';
      if (bookedTimesSummary) {
        bookedTimesSummary.textContent = '';
      }
    }

    applyWorkspaceView();
    renderCashRegisterSummary();
  }

  function renderNotifications(appointments) {
    notificationList.innerHTML = '';

    const nextAppointment = getNextAppointment();
    if (nextAppointmentSummary) {
      nextAppointmentSummary.textContent = nextAppointment
        ? `Próximo atendimento: ${formatAppointmentLabel(nextAppointment)}`
        : 'Nenhum próximo atendimento agendado.';
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const upcomingAppointments = appointments.filter((appointment) => {
      const appointmentDate = new Date(`${appointment.date}T00:00:00`);
      const isTodayOrTomorrow = appointmentDate.getTime() === today.getTime() || appointmentDate.getTime() === tomorrow.getTime();
      return isTodayOrTomorrow && isUpcomingAppointment(appointment);
    });

    if (upcomingAppointments.length === 0) {
      notifications.style.display = nextAppointment ? 'block' : 'none';
      return;
    }

    upcomingAppointments
      .sort((a, b) => {
        if (a.date === b.date) return a.time.localeCompare(b.time);
        return new Date(a.date) - new Date(b.date);
      })
      .forEach((appointment) => {
        const item = document.createElement('li');
        item.textContent = formatAppointmentLabel(appointment);
        notificationList.appendChild(item);
      });

    notifications.style.display = 'block';
  }

  function renderFinanceSummary() {
    if (!isAdminLoggedIn) return;

    const today = getTodayLocalDateString();
    const currentMonth = today.slice(0, 7);
    const financialAppointments = appointmentsCache.filter((appointment) => !isNonBillableAppointment(appointment));

    const dayIncome = financialAppointments
      .filter((appointment) => appointment.date === today)
      .reduce((total, appointment) => total + getAmountPaid(appointment), 0);
    const dayDiscounts = financialAppointments
      .filter((appointment) => appointment.date === today)
      .reduce((total, appointment) => total + getDiscountAmount(appointment), 0);
    const dayPending = financialAppointments
      .filter((appointment) => appointment.date === today)
      .reduce((total, appointment) => total + getPendingAmount(appointment), 0);
    const dayPackageIncome = clientPackagesCache
      .filter((clientPackage) => clientPackage.purchase_date === today)
      .reduce((total, clientPackage) => total + Number(clientPackage.amount_paid || 0), 0);
    const dayPackagePending = clientPackagesCache
      .filter((clientPackage) => clientPackage.purchase_date === today)
      .reduce((total, clientPackage) => total + getClientPackagePendingAmount(clientPackage), 0);

    const monthIncome = financialAppointments
      .filter((appointment) => appointment.date.startsWith(currentMonth))
      .reduce((total, appointment) => total + getAmountPaid(appointment), 0);
    const monthDiscounts = financialAppointments
      .filter((appointment) => appointment.date.startsWith(currentMonth))
      .reduce((total, appointment) => total + getDiscountAmount(appointment), 0);
    const monthPending = financialAppointments
      .filter((appointment) => appointment.date.startsWith(currentMonth))
      .reduce((total, appointment) => total + getPendingAmount(appointment), 0);
    const monthPackageIncome = clientPackagesCache
      .filter((clientPackage) => clientPackage.purchase_date.startsWith(currentMonth))
      .reduce((total, clientPackage) => total + Number(clientPackage.amount_paid || 0), 0);
    const monthPackagePending = clientPackagesCache
      .filter((clientPackage) => clientPackage.purchase_date.startsWith(currentMonth))
      .reduce((total, clientPackage) => total + getClientPackagePendingAmount(clientPackage), 0);

    const dayExpenses = expensesCache
      .filter((expense) => expense.date === today)
      .reduce((total, expense) => total + Number(expense.amount || 0), 0);

    const monthExpenses = expensesCache
      .filter((expense) => expense.date.startsWith(currentMonth))
      .reduce((total, expense) => total + Number(expense.amount || 0), 0);

    financeDayIncome.textContent = `Ganhos: ${formatCurrency(dayIncome + dayPackageIncome)}`;
    if (financeDayDiscounts) financeDayDiscounts.textContent = `Descontos: ${formatCurrency(dayDiscounts)}`;
    if (financeDayPending) financeDayPending.textContent = `A receber: ${formatCurrency(dayPending + dayPackagePending)}`;
    financeDayExpenses.textContent = `Gastos: ${formatCurrency(dayExpenses)}`;
    financeDayBalance.textContent = `Saldo: ${formatCurrency(dayIncome + dayPackageIncome - dayExpenses)}`;

    financeMonthIncome.textContent = `Ganhos: ${formatCurrency(monthIncome + monthPackageIncome)}`;
    if (financeMonthDiscounts) financeMonthDiscounts.textContent = `Descontos: ${formatCurrency(monthDiscounts)}`;
    if (financeMonthPending) financeMonthPending.textContent = `A receber: ${formatCurrency(monthPending + monthPackagePending)}`;
    financeMonthExpenses.textContent = `Gastos: ${formatCurrency(monthExpenses)}`;
    financeMonthBalance.textContent = `Saldo: ${formatCurrency(monthIncome + monthPackageIncome - monthExpenses)}`;

    renderCashRegisterSummary();
  }

  function renderCashRegisterSummary() {
    if (!cashRegisterStatus || !cashRegisterDate || !cashRegisterOpening || !cashRegisterExpected || !cashRegisterDifference) return;

    if (!isAdminLoggedIn || !can('manage_finance')) {
      cashRegisterStatus.textContent = 'Status: Fechado';
      cashRegisterDate.textContent = 'Data: -';
      cashRegisterOpening.textContent = 'Abertura: R$ 0,00';
      cashRegisterExpected.textContent = 'Esperado: R$ 0,00';
      cashRegisterDifference.textContent = 'Diferença: R$ 0,00';
      if (cashRegisterSchedule) cashRegisterSchedule.textContent = 'Funcionamento automático por horário.';
      return;
    }

    if (!openCashRegister) {
      cashRegisterStatus.textContent = 'Status: Fechado';
      cashRegisterDate.textContent = 'Data: -';
      cashRegisterOpening.textContent = 'Abertura: R$ 0,00';
      cashRegisterExpected.textContent = 'Esperado: R$ 0,00';
      cashRegisterDifference.textContent = 'Diferença: R$ 0,00';
    } else {
      cashRegisterStatus.textContent = `Status: ${getCashRegisterStatusLabel(openCashRegister.status)}`;
      cashRegisterDate.textContent = `Data: ${formatDisplayDate(openCashRegister.business_date)}`;
      cashRegisterOpening.textContent = `Abertura: ${formatCurrency(openCashRegister.opening_amount)}`;
      cashRegisterExpected.textContent = `Esperado: ${formatCurrency(getCashRegisterExpectedBalance(openCashRegister))}`;
      cashRegisterDifference.textContent = 'Diferença: R$ 0,00';
    }

    if (cashOpeningTimeInput) {
      cashOpeningTimeInput.value = cashSettingsCache.opening_time || '08:00';
    }
    if (cashClosingTimeInput) {
      cashClosingTimeInput.value = cashSettingsCache.closing_time || '18:00';
    }
    if (cashRegisterSchedule) {
      cashRegisterSchedule.textContent = `Caixa automático: abre às ${cashSettingsCache.opening_time || '08:00'} e fecha às ${cashSettingsCache.closing_time || '18:00'}.`;
    }
  }

  function renderCashRegistersTable() {
    if (!cashRegistersBody) return;

    if (!isAdminLoggedIn || !can('manage_finance')) {
      cashRegistersBody.innerHTML = '';
      return;
    }

    cashRegistersBody.innerHTML = '';

    if (cashRegistersCache.length === 0) {
      const emptyRow = document.createElement('tr');
      emptyRow.innerHTML = '<td colspan="8">Nenhum caixa registrado.</td>';
      cashRegistersBody.appendChild(emptyRow);
      return;
    }

    cashRegistersCache
      .slice()
      .sort((a, b) => {
        if (a.business_date === b.business_date) return Number(b.id) - Number(a.id);
        return new Date(b.business_date) - new Date(a.business_date);
      })
      .forEach((cashRegister) => {
        const totals = cashRegister.summary || {
          service_income: getCashTotalsForDate(cashRegister.business_date).serviceIncome,
          package_income: getCashTotalsForDate(cashRegister.business_date).packageIncome,
          expenses: getCashTotalsForDate(cashRegister.business_date).expenses
        };
        const expectedBalance = cashRegister.summary && Number.isFinite(Number(cashRegister.summary.expected_balance))
          ? Number(cashRegister.summary.expected_balance)
          : getCashRegisterExpectedBalance(cashRegister);
        const countedAmount = cashRegister.closing_counted_amount === null || cashRegister.closing_counted_amount === undefined
          ? '-'
          : formatCurrency(cashRegister.closing_counted_amount);

        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${formatDisplayDate(cashRegister.business_date)}</td>
          <td>${getCashRegisterStatusLabel(cashRegister.status)}</td>
          <td>${formatCurrency(cashRegister.opening_amount)}</td>
          <td>${formatCurrency(Number(totals.service_income || 0) + Number(totals.package_income || 0))}</td>
          <td>${formatCurrency(totals.expenses)}</td>
          <td>${formatCurrency(expectedBalance)}</td>
          <td>${countedAmount}</td>
          <td>${formatCurrency(getCashRegisterDifference(cashRegister))}</td>
        `;
        cashRegistersBody.appendChild(row);
      });
  }

  function renderDashboard() {
    if (!isAdminLoggedIn) return;

    const today = getTodayLocalDateString();
    const now = new Date();
    const todayAppointments = appointmentsCache.filter((appointment) => appointment.date === today && !isNonBillableAppointment(appointment));
    const predictedRevenue = todayAppointments.reduce((total, appointment) => total + getNetServicePrice(appointment), 0);
    const upcoming = appointmentsCache
      .filter((appointment) => appointment.status !== 'cancelado' && new Date(`${appointment.date}T${appointment.time}:00`) >= now)
      .sort((a, b) => new Date(`${a.date}T${a.time}:00`) - new Date(`${b.date}T${b.time}:00`))
      .slice(0, 3);
    const issues = appointmentsCache.filter((appointment) =>
      appointment.date === today && (appointment.status === 'faltou' || appointment.status === 'cancelado')
    );

    dashboardTodayCount.textContent = String(todayAppointments.length);
    dashboardTodayRevenue.textContent = formatCurrency(predictedRevenue);
    dashboardUpcoming.textContent = upcoming.length > 0
      ? upcoming.map((appointment) => `${appointment.time} - ${appointment.client_name}`).join(' | ')
      : 'Nenhum próximo horário.';
    dashboardIssues.textContent = issues.length > 0
      ? issues.map((appointment) => `${appointment.client_name}: ${getStatusLabel(appointment.status)}`).join(' | ')
      : 'Nenhuma ocorrência hoje.';
  }

  function renderFinanceReport(startDate = reportStartDate.value, endDate = reportEndDate.value) {
    if (!isAdminLoggedIn || !reportIncome || !reportExpenses || !reportBalance || !reportPending) return;

    const appointmentsInRange = appointmentsCache.filter((appointment) =>
      !isNonBillableAppointment(appointment) && isDateWithinRange(appointment.date, startDate, endDate)
    );
    const expensesInRange = expensesCache.filter((expense) =>
      isDateWithinRange(expense.date, startDate, endDate)
    );

    const packageSalesInRange = clientPackagesCache.filter((clientPackage) =>
      isDateWithinRange(clientPackage.purchase_date, startDate, endDate)
    );
    const income = appointmentsInRange.reduce((total, appointment) => total + getAmountPaid(appointment), 0) +
      packageSalesInRange.reduce((total, clientPackage) => total + Number(clientPackage.amount_paid || 0), 0);
    const discounts = appointmentsInRange.reduce((total, appointment) => total + getDiscountAmount(appointment), 0);
    const expenses = expensesInRange.reduce((total, expense) => total + Number(expense.amount || 0), 0);
    const pending = appointmentsInRange.reduce((total, appointment) => total + getPendingAmount(appointment), 0) +
      packageSalesInRange.reduce((total, clientPackage) => total + getClientPackagePendingAmount(clientPackage), 0);

    reportIncome.textContent = formatCurrency(income);
    if (reportDiscounts) reportDiscounts.textContent = formatCurrency(discounts);
    reportExpenses.textContent = formatCurrency(expenses);
    reportBalance.textContent = formatCurrency(income - expenses);
    reportPending.textContent = formatCurrency(pending);
  }

  function renderClientsTable() {
    if (!isAdminLoggedIn || !clientsBody) return;

    const groupedClients = new Map();
    const searchValue = String(clientSearch.value || '').trim().toLowerCase();

    appointmentsCache.forEach((appointment) => {
      const key = `${appointment.client_name}::${appointment.client_phone || ''}`;
      if (!groupedClients.has(key)) {
        groupedClients.set(key, {
          client_name: appointment.client_name,
          client_phone: appointment.client_phone || '',
          count: 0,
          last_date: appointment.date,
          last_service: appointment.service
        });
      }

      const client = groupedClients.get(key);
      client.count += 1;

      if (appointment.date >= client.last_date) {
        client.last_date = appointment.date;
        client.last_service = appointment.service;
      }
    });

    const clients = Array.from(groupedClients.values())
      .filter((client) => {
        if (!searchValue) return true;
        return client.client_name.toLowerCase().includes(searchValue) ||
          String(client.client_phone || '').includes(searchValue.replace(/\D/g, ''));
      })
      .sort((a, b) => a.client_name.localeCompare(b.client_name));

    clientsBody.innerHTML = '';

    if (clients.length === 0) {
      const emptyRow = document.createElement('tr');
      emptyRow.innerHTML = '<td colspan="5">Nenhum cliente encontrado.</td>';
      clientsBody.appendChild(emptyRow);
      return;
    }

    clients.forEach((client) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${client.client_name}</td>
        <td>${formatPhoneNumber(client.client_phone)}</td>
        <td>${getServiceLabel(client.last_service)}</td>
        <td>${formatDisplayDate(client.last_date)}</td>
        <td>${client.count} atendimento(s)</td>
      `;
      clientsBody.appendChild(row);
    });
  }

  function renderExpensesTable() {
    if (!isAdminLoggedIn) {
      expensesBody.innerHTML = '';
      return;
    }

    expensesBody.innerHTML = '';

    if (expensesCache.length === 0) {
      const emptyRow = document.createElement('tr');
      emptyRow.innerHTML = '<td colspan="5">Nenhum gasto lançado.</td>';
      expensesBody.appendChild(emptyRow);
      renderFinanceSummary();
      renderCashRegistersTable();
      return;
    }

    expensesCache
      .slice()
      .sort((a, b) => {
        if (a.date === b.date) return Number(b.id) - Number(a.id);
        return new Date(b.date) - new Date(a.date);
      })
      .forEach((expense) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${formatDisplayDate(expense.date)}</td>
          <td>${expense.description}</td>
          <td>${expense.category || '-'}</td>
          <td>${formatCurrency(expense.amount)}</td>
          <td class="action-buttons">
            <button class="edit" data-expense-id="${expense.id}" aria-label="Editar gasto ${expense.description}">Editar</button>
            <button class="delete" data-expense-id="${expense.id}" aria-label="Excluir gasto ${expense.description}">Excluir</button>
          </td>
        `;
        expensesBody.appendChild(row);
      });

    expensesBody.querySelectorAll('button[data-expense-id].edit').forEach((button) => {
      button.addEventListener('click', function () {
        const expenseId = Number(this.getAttribute('data-expense-id'));
        openExpenseEditModal(expenseId);
      });
    });

    expensesBody.querySelectorAll('button[data-expense-id].delete').forEach((button) => {
      button.addEventListener('click', async function () {
        const expenseId = Number(this.getAttribute('data-expense-id'));

        if (!confirm('Tem certeza que deseja excluir este gasto?')) return;

        try {
          const data = await safeApiRequest(`/api/expenses/${expenseId}`, { method: 'DELETE' }, 'Não foi possível excluir o gasto.');
          expensesCache = Array.isArray(data.expenses) ? data.expenses.slice() : [];
          renderExpensesTable();
          showFlash('Gasto excluído com sucesso!');
        } catch {}
      });
    });

    renderFinanceSummary();
    renderCashRegistersTable();
  }

  function openExpenseEditModal(id) {
    const expense = expensesCache.find((item) => item.id === id);
    if (!expense || !expenseEditModal) {
      showFlash('Gasto não encontrado.', 'error');
      return;
    }

    expenseEditId.value = String(expense.id);
    expenseEditDate.value = expense.date;
    expenseEditDescription.value = expense.description || '';
    expenseEditCategory.value = expense.category || '';
    expenseEditAmount.value = Number(expense.amount || 0).toFixed(2);
    expenseEditModal.style.display = 'flex';
  }

  function renderAppointmentsTable() {
    appointmentsBody.innerHTML = '';

    if (!isAdminLoggedIn) {
      renderNotifications(appointmentsCache);
      updateTimeAvailability();
      return;
    }

    const filteredAppointments = getFilteredAppointments();

    if (filteredAppointments.length === 0) {
      const emptyRow = document.createElement('tr');
      emptyRow.innerHTML = '<td colspan="11">Nenhum agendamento encontrado.</td>';
      appointmentsBody.appendChild(emptyRow);
      renderNotifications(appointmentsCache);
      updateTimeAvailability();
      renderDashboard();
      renderFinanceSummary();
      renderFinanceReport();
      renderCashRegistersTable();
      renderClientsTable();
      return;
    }

    filteredAppointments.forEach((appointment) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td data-label="Data">${formatDisplayDate(appointment.date)}</td>
        <td data-label="Horário">${appointment.time}</td>
        <td data-label="Serviço">${getServiceLabel(appointment.service)}</td>
        <td data-label="Cliente">${appointment.client_name}</td>
        <td data-label="Telefone">${formatPhoneNumber(appointment.client_phone)}</td>
        <td data-label="Pagamento">${getAppointmentPaymentDisplay(appointment)}</td>
        <td data-label="Valor do serviço">${formatCurrency(getNetServicePrice(appointment))}</td>
        <td data-label="Valor pago">${formatCurrency(getAmountPaid(appointment))}</td>
        <td data-label="Saldo pendente">${getPendingLabel(appointment)}</td>
        <td data-label="Status" class="${getStatusClass(appointment.status)}">${getStatusLabel(appointment.status)}</td>
        <td data-label="Ações" class="action-buttons">
          ${can('manage_appointments') ? `<button class="edit" data-id="${appointment.id}" aria-label="Editar agendamento de ${appointment.client_name}">Editar</button>` : ''}
          ${can('manage_status') ? `<button class="present" data-status="compareceu" data-id="${appointment.id}" aria-label="Marcar comparecimento de ${appointment.client_name}">Compareceu</button>` : ''}
          ${can('manage_status') ? `<button class="missing" data-status="faltou" data-id="${appointment.id}" aria-label="Marcar falta de ${appointment.client_name}">Faltou</button>` : ''}
          ${can('manage_appointments') ? `<button class="remark" data-id="${appointment.id}" aria-label="Remarcar agendamento de ${appointment.client_name}">Remarcar</button>` : ''}
          ${can('manage_status') ? `<button class="cancel" data-id="${appointment.id}" aria-label="Cancelar agendamento de ${appointment.client_name}">Cancelar</button>` : ''}
          ${can('delete_appointments') ? `<button class="delete" data-id="${appointment.id}" aria-label="Excluir agendamento de ${appointment.client_name}">Excluir</button>` : ''}
          ${can('print_receipt') ? `<button class="receipt" data-id="${appointment.id}" aria-label="Gerar recibo de ${appointment.client_name}">Recibo</button>` : ''}
        </td>
      `;
      appointmentsBody.appendChild(row);
    });

    renderNotifications(appointmentsCache);
    updateTimeAvailability();
    renderDashboard();
    renderFinanceSummary();
    renderFinanceReport();
    renderCashRegistersTable();
    renderClientsTable();
  }

  async function loadAppointments() {
    const endpoint = isAdminLoggedIn ? '/api/appointments' : '/api/public-appointments';
    const data = await safeApiRequest(endpoint, {}, 'Não foi possível carregar os agendamentos.');
    appointmentsCache = Array.isArray(data.appointments) ? data.appointments.slice() : [];

    appointmentsCache.sort((a, b) => {
      if (a.date === b.date) return a.time.localeCompare(b.time);
      return new Date(a.date) - new Date(b.date);
    });

    if (isAdminLoggedIn && can('manage_appointments')) {
      syncAppointmentDateFocus();
    }

    renderAppointmentsTable();
  }

  async function loadServices() {
    try {
      const data = await safeApiRequest('/api/services', {}, 'Não foi possível carregar os serviços.');
      servicesCache = Array.isArray(data.services) ? data.services.slice() : [];
    } catch {
      servicesCache = [];
    }

    renderServices();
  }

  async function loadExpenses() {
    if (!isAdminLoggedIn) {
      expensesCache = [];
      renderExpensesTable();
      return;
    }

    try {
      const data = await safeApiRequest('/api/expenses', {}, 'Não foi possível carregar os gastos.');
      expensesCache = Array.isArray(data.expenses) ? data.expenses.slice() : [];
    } catch {
      expensesCache = [];
    }

    renderExpensesTable();
  }

  async function loadCashRegisters() {
    if (!isAdminLoggedIn || !can('manage_finance')) {
      cashRegistersCache = [];
      openCashRegister = null;
      cashSettingsCache = {
        auto_enabled: true,
        opening_time: '08:00',
        closing_time: '18:00'
      };
      renderCashRegisterSummary();
      renderCashRegistersTable();
      return;
    }

    try {
      const data = await safeApiRequest('/api/cash-registers', {}, 'Não foi possível carregar o caixa.');
      cashRegistersCache = Array.isArray(data.cash_registers) ? data.cash_registers.slice() : [];
      openCashRegister = data.open_register || null;
      cashSettingsCache = data.cash_settings || cashSettingsCache;
    } catch {
      cashRegistersCache = [];
      openCashRegister = null;
    }

    renderCashRegisterSummary();
    renderCashRegistersTable();
  }

  async function loadClientPackages() {
    if (!isAdminLoggedIn) {
      clientPackagesCache = [];
      renderClientPackagesTable();
      return;
    }

    try {
      const data = await safeApiRequest('/api/client-packages', {}, 'Não foi possível carregar os pacotes vendidos.');
      clientPackagesCache = Array.isArray(data.client_packages) ? data.client_packages.slice() : [];
    } catch {
      clientPackagesCache = [];
    }

    renderClientPackagesTable();
    renderFinanceSummary();
    renderFinanceReport();
    renderCashRegistersTable();
  }

  function openRemarkModal(id) {
    const appointment = appointmentsCache.find((item) => item.id === id);
    if (!appointment) {
      showFlash('Agendamento não encontrado.', 'error');
      return;
    }

    remarkId.value = String(id);
    remarkDate.value = appointment.date;
    remarkModal.style.display = 'flex';
  }

  function openEditModal(id) {
    const appointment = appointmentsCache.find((item) => item.id === id);
    if (!appointment || !editModal || !editForm) {
      showFlash('Agendamento não encontrado.', 'error');
      return;
    }

    editId.value = String(appointment.id);
    editDate.value = appointment.date;
    editTime.value = appointment.time;
    editService.value = appointment.service;
    editName.value = appointment.client_name;
    editPhone.value = applyPhoneMask(appointment.client_phone || '');
    editStatus.value = appointment.status || 'confirmado';
    if (editPaymentStatus) editPaymentStatus.value = appointment.payment_status || 'pendente';
    if (editPaymentMethod) editPaymentMethod.value = appointment.payment_method || '';
    if (editDiscount) editDiscount.value = Number(appointment.discount || 0).toFixed(2);
    if (editAmountPaid) editAmountPaid.value = Number(appointment.amount_paid || 0).toFixed(2);
    if (editNotes) editNotes.value = appointment.notes || '';
    syncAppointmentPaymentFields();
    editModal.style.display = 'flex';
  }

  function printReceipt(id) {
    const appointment = appointmentsCache.find((item) => item.id === id);
    if (!appointment) {
      showFlash('Agendamento não encontrado.', 'error');
      return;
    }

    const receiptWindow = window.open('', '_blank', 'width=720,height=760');
    if (!receiptWindow) {
      showFlash('Não foi possível abrir a janela do recibo.', 'error');
      return;
    }

    const servicePrice = getServicePrice(appointment.service);
    const discountAmount = getDiscountAmount(appointment);
    const netServicePrice = getNetServicePrice(appointment);
    const amountPaid = getAmountPaid(appointment);
    const pendingAmount = getPendingAmount(appointment);

    receiptWindow.document.write(`
      <html lang="pt-BR">
      <head>
        <title>Recibo - ${appointment.client_name}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 28px; color: #222; }
          h1 { margin-bottom: 8px; }
          .card { border: 1px solid #ddd; border-radius: 8px; padding: 20px; }
          .row { margin: 10px 0; }
          .label { font-weight: 700; }
        </style>
      </head>
      <body>
        <div class="card">
          <h1>Recibo</h1>
          <div class="row"><span class="label">Cliente:</span> ${appointment.client_name}</div>
          <div class="row"><span class="label">Data:</span> ${formatDisplayDate(appointment.date)}</div>
          <div class="row"><span class="label">Horário:</span> ${appointment.time}</div>
          <div class="row"><span class="label">Serviço:</span> ${getServiceLabel(appointment.service)}</div>
          <div class="row"><span class="label">Pagamento:</span> ${getAppointmentPaymentDisplay(appointment)}</div>
          <div class="row"><span class="label">Valor do serviço:</span> ${formatCurrency(servicePrice)}</div>
          <div class="row"><span class="label">Desconto:</span> ${formatCurrency(discountAmount)}</div>
          <div class="row"><span class="label">Valor com desconto:</span> ${formatCurrency(netServicePrice)}</div>
          <div class="row"><span class="label">Valor pago:</span> ${formatCurrency(amountPaid)}</div>
          <div class="row"><span class="label">Saldo pendente:</span> ${getPendingLabel(appointment)}</div>
          <div class="row"><span class="label">Observações:</span> ${appointment.notes || '-'}</div>
        </div>
        <script>window.onload = () => window.print();<\/script>
      </body>
      </html>
    `);
    receiptWindow.document.close();
  }

  async function updateAppointmentStatus(id, status) {
    try {
      await safeApiRequest(`/api/appointments/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ status })
      }, 'Não foi possível atualizar o status do agendamento.');
      await loadAppointments();
      showFlash(`Status atualizado para ${getStatusLabel(status)}.`);
    } catch {}
  }

  async function cancelAppointment(id) {
    if (!confirm('Tem certeza que deseja cancelar este agendamento?')) return;

    try {
      await safeApiRequest(`/api/appointments/${id}/cancel`, { method: 'PATCH' }, 'Não foi possível cancelar o agendamento.');
      await loadAppointments();
      showFlash('Agendamento cancelado com sucesso!');
    } catch {}
  }

  async function deleteAppointment(id) {
    if (!confirm('Tem certeza que deseja EXCLUIR este agendamento? Esta ação não pode ser desfeita.')) return;

    try {
      await safeApiRequest(`/api/appointments/${id}`, { method: 'DELETE' }, 'Não foi possível excluir o agendamento.');
      await loadAppointments();
      showFlash('Agendamento excluído com sucesso!');
    } catch {}
  }

  async function logout() {
    try {
      await safeApiRequest('/api/logout', { method: 'POST' }, 'Não foi possível encerrar a sessão.');
    } catch {
      return;
    }

    isAdminLoggedIn = false;
    currentUser = null;
    updateUIForAdminStatus();
    await loadAppointments();
    await loadExpenses();
    await loadCashRegisters();
    await loadClientPackages();
    showFlash('Logout realizado com sucesso!');
  }

  async function syncSession() {
    try {
      const data = await safeApiRequest('/api/session', {}, 'Não foi possível validar a sessão.');
      isAdminLoggedIn = Boolean(data.authenticated);
      currentUser = data.user || null;
      updateUIForAdminStatus();
      await loadAppointments();
      await loadExpenses();
      await loadCashRegisters();
      await loadClientPackages();
    } catch {}
  }

  async function bootstrap() {
    setMinDate(dateInput);
    setMinDate(remarkDate);
    setMinDate(expenseDateInput);
    if (packagePurchaseDateInput) setMinDate(packagePurchaseDateInput);
    if (filterDate) filterDate.value = getTodayLocalDateString();
    updateServiceAdminVisibility();
    const today = getTodayLocalDateString();
    reportStartDate.value = `${today.slice(0, 7)}-01`;
    reportEndDate.value = today;
    generateTimeSlots(remarkTime);
    await loadServices();
    syncBookingFields();
    updateTimeAvailability();
    updateUIForAdminStatus();
    await syncSession();
    await refreshPackageBalanceSummary();
  }

  dateInput.addEventListener('change', function () {
    syncBookingFields();
    updateTimeAvailability();
    refreshPackageBalanceSummary();
  });

  serviceSelect.addEventListener('change', function () {
    syncBookingFields();
    refreshPackageBalanceSummary();
  });
  timeInput.addEventListener('input', syncBookingFields);
  phoneInput.addEventListener('input', function () {
    this.value = applyPhoneMask(this.value);
    refreshPackageBalanceSummary();
  });
  document.getElementById('name').addEventListener('input', refreshPackageBalanceSummary);
  editPhone.addEventListener('input', function () {
    this.value = applyPhoneMask(this.value);
  });
  setupSmartAmountInput(packageAmountPaidInput);
  setupSmartAmountInput(editAmountPaid);
  setupSmartAmountInput(packageEditAmountPaid);
  setupSmartAmountInput(expenseAmountInput);
  setupSmartAmountInput(expenseEditAmount);
  if (editPaymentMethod) {
    editPaymentMethod.addEventListener('change', syncAppointmentPaymentFields);
  }
  if (packageClientPhoneInput) {
    packageClientPhoneInput.addEventListener('input', function () {
      this.value = applyPhoneMask(this.value);
    });
  }

  [filterSearch, filterDate, filterService, filterStatus].forEach((element) => {
    element.addEventListener('input', function () {
      if (element === filterDate) {
        appointmentDateViewMode = filterDate.value ? 'custom' : 'all';
      }
      renderAppointmentsTable();
    });
    element.addEventListener('change', function () {
      if (element === filterDate) {
        appointmentDateViewMode = filterDate.value ? 'custom' : 'all';
      }
      renderAppointmentsTable();
    });
  });

  if (workspaceTabs) {
    workspaceTabs.addEventListener('click', function (event) {
      const button = event.target.closest('[data-workspace-view]');
      if (!button) return;
      currentWorkspaceView = button.getAttribute('data-workspace-view') || 'atendimento';
      applyWorkspaceView();
    });
  }

  if (serviceAdminToggle) {
    serviceAdminToggle.addEventListener('click', function () {
      isServiceAdminExpanded = !isServiceAdminExpanded;
      updateServiceAdminVisibility();
    });
  }

  clearFiltersButton.addEventListener('click', function () {
    appointmentDateViewMode = 'all';
    filterSearch.value = '';
    filterDate.value = '';
    filterService.value = '';
    filterStatus.value = '';
    renderAppointmentsTable();
  });

  if (floatingSupportToggle && floatingSupportLinks) {
    floatingSupportToggle.addEventListener('click', function () {
      const isExpanded = floatingSupportToggle.getAttribute('aria-expanded') === 'true';
      floatingSupportToggle.setAttribute('aria-expanded', String(!isExpanded));
      floatingSupportLinks.hidden = isExpanded;
    });
  }

  clientSearch.addEventListener('input', renderClientsTable);

  financeReportForm.addEventListener('submit', function (e) {
    e.preventDefault();
    renderFinanceReport();
  });

  appointmentsBody.addEventListener('click', function (event) {
    const button = event.target.closest('button');
    if (!button) return;

    const id = Number(button.getAttribute('data-id'));
    if (!id) return;

    if (button.classList.contains('edit')) {
      openEditModal(id);
      return;
    }

    if (button.classList.contains('remark')) {
      openRemarkModal(id);
      return;
    }

    if (button.classList.contains('cancel')) {
      cancelAppointment(id);
      return;
    }

    if (button.classList.contains('delete')) {
      deleteAppointment(id);
      return;
    }

    if (button.classList.contains('receipt')) {
      printReceipt(id);
      return;
    }

    const status = button.getAttribute('data-status');
    if (status) {
      updateAppointmentStatus(id, status);
    }
  });

  loginButton.addEventListener('click', function () {
    if (isAdminLoggedIn) {
      logout();
    } else {
      loginModal.style.display = 'flex';
    }
  });

  closeModalBtn.addEventListener('click', function () {
    loginModal.style.display = 'none';
  });

  closeRemarkModalBtn.addEventListener('click', function () {
    remarkModal.style.display = 'none';
  });

  closeEditModalBtn.addEventListener('click', function () {
    editModal.style.display = 'none';
  });

  if (closePackageEditModalBtn) {
    closePackageEditModalBtn.addEventListener('click', function () {
      packageEditModal.style.display = 'none';
    });
  }

  if (closeExpenseEditModalBtn) {
    closeExpenseEditModalBtn.addEventListener('click', function () {
      expenseEditModal.style.display = 'none';
    });
  }

  window.addEventListener('click', function (event) {
    if (event.target === loginModal) {
      loginModal.style.display = 'none';
    }

    if (event.target === remarkModal) {
      remarkModal.style.display = 'none';
    }

    if (event.target === editModal) {
      editModal.style.display = 'none';
    }

    if (event.target === packageEditModal) {
      packageEditModal.style.display = 'none';
    }

    if (event.target === expenseEditModal) {
      expenseEditModal.style.display = 'none';
    }

    if (floatingSupport && floatingSupportLinks && floatingSupportToggle && !floatingSupport.contains(event.target)) {
      floatingSupportToggle.setAttribute('aria-expanded', 'false');
      floatingSupportLinks.hidden = true;
    }
  });

  loginForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const username = this.elements.username.value;
    const password = this.elements.password.value;

    try {
      const data = await safeApiRequest('/api/login', {
        method: 'POST',
        body: JSON.stringify({ username, password })
      }, 'Não foi possível realizar o login.');

      isAdminLoggedIn = true;
      currentUser = data.user || null;
      updateUIForAdminStatus();
      loginModal.style.display = 'none';
      this.reset();
      await loadAppointments();
      await loadExpenses();
      await loadCashRegisters();
      await loadClientPackages();
      showFlash('Login realizado com sucesso!');
    } catch {}
  });

  serviceForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    if (!isAdminLoggedIn || !can('manage_services')) {
      showFlash('Seu perfil não pode gerenciar serviços.', 'error');
      return;
    }

    const name = serviceNameInput.value.trim();
    const price = servicePriceInput.value.trim();
    const isPackage = serviceIsPackageInput && serviceIsPackageInput.checked;
    const packageSessions = servicePackageSessionsInput ? servicePackageSessionsInput.value.trim() : '';
    const packageValidity = servicePackageValidityInput ? servicePackageValidityInput.value.trim() : '';
    if (!name) {
      showFlash('Informe o nome do serviço.', 'error');
      return;
    }

    if (price === '') {
      showFlash('Informe o preço do serviço.', 'error');
      return;
    }

    if (isPackage && (!packageSessions || !packageValidity)) {
      showFlash('Informe sessões por mês e validade do pacote.', 'error');
      return;
    }

    try {
      const data = await safeApiRequest('/api/services', {
        method: 'POST',
        body: JSON.stringify({
          name,
          price,
          type: isPackage ? 'package' : 'standard',
          package_sessions_limit: packageSessions,
          package_validity_days: packageValidity
        })
      }, 'Não foi possível adicionar o serviço.');

      servicesCache = Array.isArray(data.services) ? data.services.slice() : servicesCache;
      serviceNameInput.value = '';
      servicePriceInput.value = '';
      if (serviceIsPackageInput) serviceIsPackageInput.checked = false;
      if (servicePackageSessionsInput) servicePackageSessionsInput.value = '';
      if (servicePackageValidityInput) servicePackageValidityInput.value = '';
      renderServices();
      renderFinanceSummary();
      showFlash('Serviço adicionado com sucesso!');
    } catch {}
  });

  bookingForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const payload = {
      date: formDate.value,
      service: formService.value,
      time: formTime.value,
      name: document.getElementById('name').value.trim(),
      phone: document.getElementById('phone').value.trim(),
      discount: discountInput.value.trim(),
      notes: notesInput.value.trim()
    };

    if (!payload.date || !payload.service || !payload.time || !payload.name) {
      showFlash('Data, serviço, horário e nome são obrigatórios.', 'error');
      return;
    }

    const phoneDigits = String(payload.phone || '').replace(/\D/g, '');
    if (phoneDigits && !/^\d{10,11}$/.test(phoneDigits)) {
      showFlash('Se informar o telefone, use um número válido com DDD.', 'error');
      return;
    }

    if (!/^\d{2}:\d{2}$/.test(payload.time)) {
      showFlash('Informe um horário válido no formato HH:MM.', 'error');
      return;
    }

    if (getBookedAppointmentsForDate(payload.date).some((appointment) => appointment.time === payload.time)) {
      showFlash('Esse horário já está ocupado. Escolha outro horário.', 'error');
      return;
    }

    try {
      await safeApiRequest('/api/appointments', {
        method: 'POST',
        body: JSON.stringify(payload)
      }, 'Não foi possível criar o agendamento.');

      document.getElementById('name').value = '';
      document.getElementById('phone').value = '';
      discountInput.value = '';
      notesInput.value = '';
      await loadAppointments();
      await refreshPackageBalanceSummary();
      showFlash('Agendamento realizado com sucesso!');
    } catch {}
  });

  expenseForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    if (!isAdminLoggedIn || !can('manage_finance')) {
      showFlash('Seu perfil não pode lançar gastos.', 'error');
      return;
    }

    const payload = {
      date: expenseDateInput.value,
      description: expenseDescriptionInput.value.trim(),
      category: expenseCategoryInput.value.trim(),
      amount: expenseAmountInput.value.trim()
    };

    if (!payload.date || !payload.description || !payload.amount) {
      showFlash('Preencha data, descrição e valor do gasto.', 'error');
      return;
    }

    try {
      const data = await safeApiRequest('/api/expenses', {
        method: 'POST',
        body: JSON.stringify(payload)
      }, 'Não foi possível lançar o gasto.');

      expensesCache = Array.isArray(data.expenses) ? data.expenses.slice() : expensesCache;
      expenseDescriptionInput.value = '';
      expenseCategoryInput.value = '';
      expenseAmountInput.value = '';
      renderExpensesTable();
      showFlash('Gasto lançado com sucesso!');
    } catch {}
  });

  if (expenseEditForm) {
    expenseEditForm.addEventListener('submit', async function (e) {
      e.preventDefault();

      const id = Number(expenseEditId.value);
      const payload = {
        date: expenseEditDate.value,
        description: expenseEditDescription.value.trim(),
        category: expenseEditCategory.value.trim(),
        amount: String(expenseEditAmount.value || '').trim()
      };

      if (!id || !payload.date || !payload.description || !payload.amount) {
        showFlash('Preencha data, descrição e valor do gasto.', 'error');
        return;
      }

      try {
        const data = await safeApiRequest(`/api/expenses/${id}`, {
          method: 'PATCH',
          body: JSON.stringify(payload)
        }, 'Não foi possível salvar o gasto.');

        expensesCache = Array.isArray(data.expenses) ? data.expenses.slice() : expensesCache;
        expenseEditModal.style.display = 'none';
        renderExpensesTable();
        renderFinanceReport();
        renderCashRegistersTable();
        showFlash('Gasto atualizado com sucesso!');
      } catch {}
    });
  }

  if (cashSettingsForm) {
    cashSettingsForm.addEventListener('submit', async function (e) {
      e.preventDefault();

      if (!isAdminLoggedIn || !can('manage_finance')) {
        showFlash('Seu perfil não pode configurar o caixa.', 'error');
        return;
      }

      const openingTime = String(cashOpeningTimeInput ? cashOpeningTimeInput.value : '').trim();
      const closingTime = String(cashClosingTimeInput ? cashClosingTimeInput.value : '').trim();
      if (!openingTime || !closingTime) {
        showFlash('Informe os horários de abertura e fechamento.', 'error');
        return;
      }

      try {
        const data = await safeApiRequest('/api/cash-settings', {
          method: 'POST',
          body: JSON.stringify({
            auto_enabled: true,
            opening_time: openingTime,
            closing_time: closingTime
          })
        }, 'Não foi possível salvar os horários do caixa.');

        cashRegistersCache = Array.isArray(data.cash_registers) ? data.cash_registers.slice() : cashRegistersCache;
        openCashRegister = data.open_register || null;
        cashSettingsCache = data.cash_settings || cashSettingsCache;
        renderCashRegisterSummary();
        renderCashRegistersTable();
        showFlash('Horários automáticos do caixa salvos com sucesso!');
      } catch {}
    });
  }

  if (packageForm) {
    packageForm.addEventListener('submit', async function (e) {
      e.preventDefault();

      if (!isAdminLoggedIn || !can('manage_finance')) {
        showFlash('Seu perfil não pode registrar pacotes.', 'error');
        return;
      }

      const phoneDigits = String(packageClientPhoneInput.value || '').replace(/\D/g, '');
      const payload = {
        package_id: packageServiceSelect.value,
        client_name: packageClientNameInput.value.trim(),
        client_phone: packageClientPhoneInput.value.trim(),
        purchase_date: packagePurchaseDateInput.value,
        payment_method: packagePaymentMethodInput.value,
        amount_paid: packageAmountPaidInput.value.trim(),
        notes: packageNotesInput.value.trim()
      };

      if (!payload.package_id || !payload.client_name || !payload.purchase_date) {
        showFlash('Preencha pacote, cliente e data da compra.', 'error');
        return;
      }

      if (phoneDigits && !/^\d{10,11}$/.test(phoneDigits)) {
        showFlash('Se informar o telefone, use um número válido com DDD.', 'error');
        return;
      }

      try {
        const data = await safeApiRequest('/api/client-packages', {
          method: 'POST',
          body: JSON.stringify(payload)
        }, 'Não foi possível registrar o pacote.');

        clientPackagesCache = Array.isArray(data.client_packages) ? data.client_packages.slice() : clientPackagesCache;
        packageForm.reset();
        if (packagePurchaseDateInput) setMinDate(packagePurchaseDateInput);
        renderClientPackagesTable();
        renderFinanceSummary();
        renderFinanceReport();
        await refreshPackageBalanceSummary();
        showFlash('Pacote registrado com sucesso!');
      } catch {}
    });
  }

  if (packageEditForm) {
    packageEditForm.addEventListener('submit', async function (e) {
      e.preventDefault();

      const id = Number(packageEditId.value);
      const sessionsLimit = String(packageEditSessionsLimit.value || '').trim();
      const amountPaid = String(packageEditAmountPaid.value || '').trim();

      if (!id || !packageEditPurchaseDate.value || !packageEditExpiresOn.value || !sessionsLimit) {
        showFlash('Preencha os campos obrigatórios do pacote.', 'error');
        return;
      }

      if (Number.isNaN(Number(sessionsLimit)) || Number(sessionsLimit) < 1) {
        showFlash('Informe uma quantidade de sessões válida.', 'error');
        return;
      }

      if (amountPaid && Number.isNaN(Number(amountPaid))) {
        showFlash('Informe um valor pago válido.', 'error');
        return;
      }

      try {
        const data = await safeApiRequest(`/api/client-packages/${id}/update`, {
          method: 'POST',
          body: JSON.stringify({
            purchase_date: packageEditPurchaseDate.value,
            expires_on: packageEditExpiresOn.value,
            sessions_limit: sessionsLimit,
            payment_status: packageEditPaymentStatus.value,
            payment_method: packageEditPaymentMethod.value,
            amount_paid: amountPaid,
            notes: packageEditNotes.value.trim()
          })
        }, 'Não foi possível salvar o pacote.');

        clientPackagesCache = Array.isArray(data.client_packages) ? data.client_packages.slice() : clientPackagesCache;
        packageEditModal.style.display = 'none';
        renderClientPackagesTable();
        renderFinanceSummary();
        renderFinanceReport();
        await refreshPackageBalanceSummary();
        showFlash('Pacote atualizado com sucesso!');
      } catch {}
    });
  }

  if (editForm) {
    editForm.addEventListener('submit', async function (e) {
      e.preventDefault();

      const id = Number(editId.value);
      const phoneDigits = String(editPhone.value || '').replace(/\D/g, '');
      const discountValue = editDiscount ? String(editDiscount.value || '').trim() : '';
      const amountPaidValue = editAmountPaid ? String(editAmountPaid.value || '').trim() : '';

      if (!id || !editDate.value || !editTime.value || !editService.value || !editName.value.trim()) {
        showFlash('Preencha os campos obrigatórios da edição.', 'error');
        return;
      }

      if (phoneDigits && !/^\d{10,11}$/.test(phoneDigits)) {
        showFlash('Se informar o telefone, use um número válido com DDD.', 'error');
        return;
      }

      if (discountValue && Number.isNaN(Number(discountValue))) {
        showFlash('Informe um desconto válido.', 'error');
        return;
      }

      if (amountPaidValue && Number.isNaN(Number(amountPaidValue))) {
        showFlash('Informe um valor pago válido.', 'error');
        return;
      }

      try {
        await safeApiRequest(`/api/appointments/${id}`, {
          method: 'PATCH',
          body: JSON.stringify({
            date: editDate.value,
            time: editTime.value,
            service: editService.value,
            name: editName.value.trim(),
            phone: editPhone.value.trim(),
            status: editStatus.value,
            payment_status: editPaymentStatus ? editPaymentStatus.value : 'pendente',
            payment_method: editPaymentMethod ? editPaymentMethod.value.trim() : '',
            discount: discountValue,
            amount_paid: amountPaidValue,
            notes: editNotes ? editNotes.value.trim() : ''
          })
        }, 'Não foi possível salvar as alterações do agendamento.');

        editForm.reset();
        if (editModal) editModal.style.display = 'none';
        await loadAppointments();
        showFlash('Agendamento atualizado com sucesso!');
      } catch {}
    });
  }

  remarkForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const id = Number(remarkId.value);
    const date = remarkDate.value;
    const time = remarkTime.value;

    if (!id || !date || !time) {
      showFlash('Todos os campos são obrigatórios para remarcar.', 'error');
      return;
    }

    try {
      await safeApiRequest(`/api/appointments/${id}/reschedule`, {
        method: 'PATCH',
        body: JSON.stringify({ date, time })
      }, 'Não foi possível remarcar o agendamento.');

      remarkModal.style.display = 'none';
      await loadAppointments();
      showFlash('Agendamento remarcado com sucesso!');
    } catch {}
  });

  bootstrap();
});
