import { beforeEach, describe, expect, it, vi } from "vitest";

import { useAdminConsole } from "../useAdminConsole";

const api = {
  login: vi.fn(),
  logout: vi.fn(),
  me: vi.fn(),
  overview: vi.fn(),
  users: vi.fn(),
  user: vi.fn(),
  updateUser: vi.fn(),
  deleteUser: vi.fn(),
  admins: vi.fn(),
  createAdmin: vi.fn(),
  updateAdmin: vi.fn(),
  deleteAdmin: vi.fn(),
  auditLog: vi.fn(),
};

const storage = new Map<string, string>();

vi.mock("../api", () => ({
  createAdminApi: () => api,
}));

describe("useAdminConsole", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    storage.clear();
    Object.defineProperty(window, "localStorage", {
      configurable: true,
      value: {
        getItem: (key: string) => storage.get(key) ?? null,
        setItem: (key: string, value: string) => {
          storage.set(key, value);
        },
        removeItem: (key: string) => {
          storage.delete(key);
        },
        clear: () => {
          storage.clear();
        },
      },
    });
    Object.defineProperty(window, "location", {
      configurable: true,
      value: { pathname: "/production/", origin: "https://admin.wobbly.site" },
    });
  });

  it("loads full user detail before opening edit modal", async () => {
    const consoleState = useAdminConsole();
    consoleState.session = {
      token: "adm-token",
      role: "owner",
      login: "owner",
    };

    api.user.mockResolvedValue({
      id: 7,
      username: "detail_user",
      score: 321,
      participateInRating: true,
      createdAt: "2026-04-05T08:00:00Z",
      updatedAt: "2026-04-05T09:00:00Z",
      lastSeenAt: "2026-04-05T09:30:00Z",
    });

    await consoleState.openUserDetails({
      id: 7,
      username: "row_user",
      score: 0,
      participateInRating: false,
      createdAt: "2026-04-05T01:00:00Z",
      updatedAt: "2026-04-05T01:00:00Z",
      lastSeenAt: "2026-04-05T01:00:00Z",
    });

    expect(api.user).toHaveBeenCalledWith("adm-token", 7);
    expect(consoleState.isUserModalOpen).toBe(true);
    expect(consoleState.selectedUser?.username).toBe("detail_user");
    expect(consoleState.userForm.score).toBe(321);
    expect(consoleState.userForm.participateInRating).toBe(true);
  });
});
