import { mount } from "@vue/test-utils";
import { describe, expect, it, vi } from "vitest";

import AdminPage from "../AdminPage.vue";

const mockedConsole = {
  isAuthenticated: true,
  displayInitials: "OW",
  activeScreen: "users",
  isOwner: true,
  logout: vi.fn(),
  environment: "production",
  environmentLabel: "Production",
  submitLogin: vi.fn(),
  login: "",
  password: "",
  showPassword: false,
  loginStatus: { kind: "idle", text: "" },
  overviewStatus: { kind: "idle", text: "" },
  usersStatus: { kind: "success", text: "Пользователи обновлены" },
  adminsStatus: { kind: "idle", text: "" },
  auditStatus: { kind: "idle", text: "" },
  editorStatus: { kind: "idle", text: "" },
  adminEditorStatus: { kind: "idle", text: "" },
  session: { role: "owner", login: "owner", token: "adm" },
  overview: null,
  search: "",
  users: [
    {
      id: 14,
      username: "detail_user",
      score: 321,
      participateInRating: true,
      accountStatus: "active",
      identityProviders: ["google"],
      createdAt: "2026-04-05T08:00:00Z",
      updatedAt: "2026-04-05T09:00:00Z",
      lastSeenAt: "2026-04-05T09:30:00Z",
    },
  ],
  sortedUsers: [
    {
      id: 14,
      username: "detail_user",
      score: 321,
      participateInRating: true,
      accountStatus: "active",
      identityProviders: ["google"],
      createdAt: "2026-04-05T08:00:00Z",
      updatedAt: "2026-04-05T09:00:00Z",
      lastSeenAt: "2026-04-05T09:30:00Z",
    },
  ],
  userSortField: "createdAt",
  userSortDirection: "desc",
  admins: [],
  audit: [],
  selectedUser: {
    id: 14,
    username: "detail_user",
    score: 321,
    participateInRating: true,
    accountStatus: "active",
    identityProviders: ["google", "yandex"],
    createdAt: "2026-04-05T08:00:00Z",
    updatedAt: "2026-04-05T09:00:00Z",
    lastSeenAt: "2026-04-05T09:30:00Z",
  },
  selectedAdmin: null,
  isUserModalOpen: true,
  isAdminModalOpen: false,
  isAdminCreateModalOpen: false,
  userForm: {
    username: "detail_user",
    score: 321,
    participateInRating: true,
  },
  adminCreateForm: { login: "", password: "" },
  adminEditForm: { role: "admin", isActive: true, password: "" },
  loadUsers: vi.fn(),
  loadAudit: vi.fn(),
  loadAdmins: vi.fn(),
  saveUser: vi.fn(),
  createAdmin: vi.fn(),
  saveAdmin: vi.fn(),
  confirmDeleteUser: vi.fn(),
  confirmDeleteAdmin: vi.fn(),
  openUserDetails: vi.fn(),
  formatDate: (value: string) => value,
  authStatusLabel: (user: {
    accountStatus: string;
    identityProviders: string[];
  }) =>
    user.accountStatus === "guest"
      ? "guest"
      : user.identityProviders.join(", "),
  toggleUserSort: vi.fn(),
  userSortMarker: () => "↕",
  initialize: vi.fn(),
  displayLogin: "owner",
};

vi.mock("@/features/admin/useAdminConsole", () => ({
  useAdminConsole: () => mockedConsole,
}));

describe("AdminPage", () => {
  it("renders created column and user detail metadata", () => {
    const wrapper = mount(AdminPage);

    expect(wrapper.text()).toContain("Created");
    expect(wrapper.text()).toContain("2026-04-05T08:00:00Z");
    expect(wrapper.text()).toContain("Last seen");
    expect(wrapper.text()).toContain("Auth");
    expect(wrapper.text()).toContain("google, yandex");
    expect(wrapper.text()).toContain("#14");
  });
});
