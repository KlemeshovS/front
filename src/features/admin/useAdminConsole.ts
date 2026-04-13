import { computed, reactive, ref } from "vue";

import { HttpError } from "@/shared/api/http";

import { createAdminApi } from "./api";
import type {
  AdminSession,
  AdminUserResponse,
  ManagedUserResponse,
  StatusState,
} from "./types";

type ScreenName = "overview" | "users" | "admins" | "audit" | "profile";
type EnvironmentName = "production" | "staging";
type UserSortField =
  | "id"
  | "username"
  | "score"
  | "participateInRating"
  | "accountStatus"
  | "createdAt"
  | "updatedAt";
type SortDirection = "asc" | "desc";

function createStatus(): StatusState {
  return {
    kind: "idle",
    text: "",
  };
}

function errorMessage(error: unknown): string {
  if (error instanceof HttpError) {
    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Request failed";
}

export function useAdminConsole() {
  const environment = (
    window.location.pathname.toLowerCase().startsWith("/staging")
      ? "staging"
      : "production"
  ) as EnvironmentName;

  const api = createAdminApi(environment);
  const login = ref("");
  const password = ref("");
  const showPassword = ref(false);
  const session = ref<AdminSession | null>(null);
  const activeScreen = ref<ScreenName>("overview");
  const search = ref("");
  const usersPage = ref(0);
  const usersPageSize = ref(50);
  const usersTotalCount = ref(0);
  const overview = ref<Record<string, number> | null>(null);
  const users = ref<ManagedUserResponse[]>([]);
  const admins = ref<AdminUserResponse[]>([]);
  const userSortField = ref<UserSortField>("createdAt");
  const userSortDirection = ref<SortDirection>("desc");
  const audit = ref<
    {
      id: number;
      when: string;
      adminLogin: string;
      action: string;
      target: string;
      details: string;
    }[]
  >([]);
  const loginStatus = reactive(createStatus());
  const overviewStatus = reactive(createStatus());
  const usersStatus = reactive(createStatus());
  const adminsStatus = reactive(createStatus());
  const auditStatus = reactive(createStatus());
  const editorStatus = reactive(createStatus());
  const adminEditorStatus = reactive(createStatus());
  const selectedUser = ref<ManagedUserResponse | null>(null);
  const selectedAdmin = ref<AdminUserResponse | null>(null);
  const isUserModalOpen = ref(false);
  const isAdminModalOpen = ref(false);
  const isAdminCreateModalOpen = ref(false);
  const userForm = reactive({
    username: "",
    score: 0,
    participateInRating: false,
  });
  const adminCreateForm = reactive({
    login: "",
    password: "",
  });
  const adminEditForm = reactive({
    role: "admin" as "owner" | "admin",
    isActive: true,
    password: "",
  });

  const environmentLabel = computed(() =>
    environment === "staging" ? "Staging" : "Production",
  );

  const storageKey = computed(() => `wobbly-admin-session-${environment}`);
  const isAuthenticated = computed(() => session.value !== null);
  const isOwner = computed(() => session.value?.role === "owner");
  const displayLogin = computed(() => session.value?.login ?? "—");
  const displayInitials = computed(() => {
    const value = (session.value?.login ?? "WA").replace(
      /[^A-Za-z0-9А-Яа-я]/g,
      "",
    );
    return value.slice(0, 2).toUpperCase() || "WA";
  });
  const usersPageCount = computed(() =>
    Math.max(1, Math.ceil(usersTotalCount.value / usersPageSize.value)),
  );

  const sortedUsers = computed(() => {
    const items = [...users.value];
    const direction = userSortDirection.value === "asc" ? 1 : -1;

    return items.sort((left, right) => {
      const field = userSortField.value;

      if (field === "username") {
        return (
          (left.username ?? "").localeCompare(right.username ?? "", "ru", {
            sensitivity: "base",
          }) * direction
        );
      }

      if (field === "accountStatus") {
        const leftValue = authStatusLabel(left);
        const rightValue = authStatusLabel(right);
        return (
          leftValue.localeCompare(rightValue, "ru", { sensitivity: "base" }) *
          direction
        );
      }

      if (field === "participateInRating") {
        return (
          ((left.participateInRating ? 1 : 0) -
            (right.participateInRating ? 1 : 0)) *
          direction
        );
      }

      if (field === "createdAt" || field === "updatedAt") {
        return (
          (new Date(left[field]).getTime() - new Date(right[field]).getTime()) *
          direction
        );
      }

      return ((left[field] as number) - (right[field] as number)) * direction;
    });
  });

  function setStatus(
    target: StatusState,
    kind: StatusState["kind"],
    text: string,
  ) {
    target.kind = kind;
    target.text = text;
  }

  function clearStatus(target: StatusState) {
    target.kind = "idle";
    target.text = "";
  }

  async function withStatus<T>(
    target: StatusState,
    loadingText: string,
    successText: string,
    fn: () => Promise<T>,
  ): Promise<T | undefined> {
    setStatus(target, "info", loadingText);
    try {
      const result = await fn();
      setStatus(target, "success", successText);
      return result;
    } catch (error) {
      setStatus(target, "error", errorMessage(error));
      return undefined;
    }
  }

  function normalizeManagedUser(
    user: ManagedUserResponse,
  ): ManagedUserResponse {
    return {
      ...user,
      accountStatus: user.accountStatus ?? "guest",
      identityProviders: Array.isArray(user.identityProviders)
        ? user.identityProviders
        : [],
    };
  }

  function restoreSession() {
    const raw = window.localStorage.getItem(storageKey.value);
    if (!raw) {
      return;
    }

    try {
      session.value = JSON.parse(raw) as AdminSession;
    } catch {
      session.value = null;
      window.localStorage.removeItem(storageKey.value);
    }
  }

  function persistSession(next: AdminSession | null) {
    session.value = next;
    if (next) {
      window.localStorage.setItem(storageKey.value, JSON.stringify(next));
      return;
    }
    window.localStorage.removeItem(storageKey.value);
  }

  async function initialize() {
    restoreSession();
    if (!session.value) {
      return;
    }

    try {
      await loadDashboard();
    } catch (error) {
      persistSession(null);
      setStatus(loginStatus, "error", `Сессия истекла: ${errorMessage(error)}`);
    }
  }

  async function submitLogin() {
    await withStatus(loginStatus, "Входим...", "Вход выполнен", async () => {
      const response = await api.login(login.value.trim(), password.value);
      persistSession({
        token: response.accessToken,
        role: response.role,
        login: login.value.trim(),
      });
      usersPage.value = 0;
      await loadDashboard();
      password.value = "";
    });
  }

  async function logout() {
    if (session.value) {
      try {
        await api.logout(session.value.token);
      } catch {
        // Local session cleanup is still desirable.
      }
    }
    persistSession(null);
    activeScreen.value = "overview";
    setStatus(loginStatus, "success", "Сессия завершена");
  }

  async function loadDashboard() {
    if (!session.value) {
      return;
    }

    const me = await api.me(session.value.token);
    persistSession({
      ...session.value,
      login: me.login,
      role: me.role,
    });

    await Promise.all([loadOverview(), loadUsers(), loadAudit()]);
    if (me.role === "owner") {
      await loadAdmins();
    } else {
      admins.value = [];
      if (activeScreen.value === "admins") {
        activeScreen.value = "overview";
      }
      setStatus(
        adminsStatus,
        "info",
        "Управление admin-доступами доступно только owner",
      );
    }
  }

  async function loadOverview() {
    if (!session.value) {
      return;
    }
    await withStatus(
      overviewStatus,
      "Загружаем сводку...",
      "Сводка обновлена",
      async () => {
        const response = await api.overview(session.value!.token);
        overview.value = {
          totalUsers: response.totalUsers,
          ratingEnabledUsers: response.ratingEnabledUsers,
          totalAdmins: response.totalAdmins,
          activeAdmins: response.activeAdmins,
          auditLogEntries: response.auditLogEntries,
        };
      },
    );
  }

  async function searchUsers() {
    usersPage.value = 0;
    await loadUsers();
  }

  async function loadUsers() {
    if (!session.value) {
      return;
    }
    await withStatus(
      usersStatus,
      "Загружаем...",
      "Пользователи обновлены",
      async () => {
        const offset = usersPage.value * usersPageSize.value;
        const response = await api.users(
          session.value!.token,
          search.value.trim(),
          usersPageSize.value,
          offset,
        );
        users.value = response.items.map(normalizeManagedUser);
        usersTotalCount.value = response.total;
      },
    );
  }

  async function goToUsersPage(page: number) {
    usersPage.value = Math.max(0, Math.min(page, usersPageCount.value - 1));
    await loadUsers();
  }

  async function changeUsersPageSize(size: number) {
    usersPageSize.value = size;
    usersPage.value = 0;
    await loadUsers();
  }

  async function loadAdmins() {
    if (!session.value) {
      return;
    }
    await withStatus(
      adminsStatus,
      "Загружаем...",
      "Администраторы обновлены",
      async () => {
        const response = await api.admins(session.value!.token);
        admins.value = response.items;
      },
    );
  }

  async function loadAudit() {
    if (!session.value) {
      return;
    }
    await withStatus(
      auditStatus,
      "Загружаем...",
      "Audit log обновлен",
      async () => {
        const response = await api.auditLog(session.value!.token);
        audit.value = response.items.map((item) => ({
          id: item.id,
          when: formatDate(item.createdAt),
          adminLogin: item.adminLogin,
          action: item.action,
          target: item.targetId
            ? `${item.targetType} #${item.targetId}`
            : item.targetType,
          details: JSON.stringify(item.details),
        }));
      },
    );
  }

  async function openUserDetails(user: ManagedUserResponse) {
    if (!session.value) {
      return;
    }

    await withStatus(
      editorStatus,
      "Загружаем пользователя...",
      "",
      async () => {
        const detail = normalizeManagedUser(
          await api.user(session.value!.token, user.id),
        );
        selectedUser.value = detail;
        userForm.username = detail.username ?? "";
        userForm.score = detail.score;
        userForm.participateInRating = detail.participateInRating;
        isUserModalOpen.value = true;
        clearStatus(editorStatus);
      },
    );
  }

  function selectAdmin(admin: AdminUserResponse) {
    selectedAdmin.value = admin;
    adminEditForm.role = admin.role;
    adminEditForm.isActive = admin.isActive;
    adminEditForm.password = "";
    clearStatus(adminEditorStatus);
    isAdminModalOpen.value = true;
  }

  async function saveUser() {
    if (!session.value || !selectedUser.value) {
      return;
    }

    await withStatus(
      editorStatus,
      "Сохраняем...",
      "Пользователь сохранен",
      async () => {
        await api.updateUser(session.value!.token, selectedUser.value!.id, {
          username: userForm.username.trim() || null,
          score: userForm.score,
          participateInRating: userForm.participateInRating,
        });
        await loadUsers();
        await loadOverview();
        isUserModalOpen.value = false;
      },
    );
  }

  async function confirmDeleteUser(user: ManagedUserResponse) {
    if (
      !session.value ||
      !window.confirm(`Удалить пользователя #${user.id}?`)
    ) {
      return;
    }

    await withStatus(
      usersStatus,
      "Удаляем...",
      "Пользователь удален",
      async () => {
        await api.deleteUser(session.value!.token, user.id);
        await loadUsers();
        await loadOverview();
      },
    );
  }

  async function createAdmin() {
    if (!session.value) {
      return;
    }

    await withStatus(
      adminEditorStatus,
      "Создаем admin...",
      "Admin создан",
      async () => {
        await api.createAdmin(session.value!.token, {
          login: adminCreateForm.login.trim(),
          password: adminCreateForm.password,
        });
        adminCreateForm.login = "";
        adminCreateForm.password = "";
        isAdminCreateModalOpen.value = false;
        await loadAdmins();
        await loadOverview();
      },
    );
  }

  async function saveAdmin() {
    if (!session.value || !selectedAdmin.value) {
      return;
    }

    await withStatus(
      adminEditorStatus,
      "Сохраняем admin...",
      "Admin сохранен",
      async () => {
        await api.updateAdmin(session.value!.token, selectedAdmin.value!.id, {
          role: adminEditForm.role,
          isActive: adminEditForm.isActive,
          password: adminEditForm.password || undefined,
        });
        await loadAdmins();
        await loadOverview();
        isAdminModalOpen.value = false;
      },
    );
  }

  async function confirmDeleteAdmin(admin: AdminUserResponse) {
    if (!session.value || !window.confirm(`Удалить admin #${admin.id}?`)) {
      return;
    }

    await withStatus(adminsStatus, "Удаляем...", "Admin удален", async () => {
      await api.deleteAdmin(session.value!.token, admin.id);
      await loadAdmins();
      await loadOverview();
    });
  }

  function formatDate(value: string) {
    return new Date(value).toLocaleString();
  }

  function authStatusLabel(user: ManagedUserResponse) {
    if (user.accountStatus === "guest") {
      return "guest";
    }

    const providers = Array.isArray(user.identityProviders)
      ? user.identityProviders
      : [];

    return providers.length ? providers.join(", ") : "authenticated";
  }

  function toggleUserSort(field: UserSortField) {
    if (userSortField.value === field) {
      userSortDirection.value =
        userSortDirection.value === "asc" ? "desc" : "asc";
      return;
    }

    userSortField.value = field;
    userSortDirection.value =
      field === "username" || field === "accountStatus" ? "asc" : "desc";
  }

  function userSortMarker(field: UserSortField) {
    if (userSortField.value !== field) {
      return "↕";
    }

    return userSortDirection.value === "asc" ? "↑" : "↓";
  }

  return reactive({
    environment,
    environmentLabel,
    login,
    password,
    showPassword,
    session,
    activeScreen,
    search,
    usersPage,
    usersPageSize,
    usersTotalCount,
    usersPageCount,
    overview,
    users,
    sortedUsers,
    admins,
    audit,
    userSortField,
    userSortDirection,
    loginStatus,
    overviewStatus,
    usersStatus,
    adminsStatus,
    auditStatus,
    editorStatus,
    adminEditorStatus,
    selectedUser,
    selectedAdmin,
    isUserModalOpen,
    isAdminModalOpen,
    isAdminCreateModalOpen,
    userForm,
    adminCreateForm,
    adminEditForm,
    isAuthenticated,
    isOwner,
    displayLogin,
    displayInitials,
    initialize,
    submitLogin,
    logout,
    searchUsers,
    loadUsers,
    goToUsersPage,
    changeUsersPageSize,
    loadAdmins,
    loadAudit,
    openUserDetails,
    selectAdmin,
    saveUser,
    confirmDeleteUser,
    createAdmin,
    saveAdmin,
    confirmDeleteAdmin,
    formatDate,
    authStatusLabel,
    toggleUserSort,
    userSortMarker,
  });
}
