import { beforeEach, describe, expect, it, vi } from "vitest";

import { createAdminApi } from "../api";

const requestJson = vi.fn();

vi.mock("@/shared/api/http", () => ({
  requestJson: (...args: unknown[]) => requestJson(...args),
}));

describe("createAdminApi", () => {
  beforeEach(() => {
    requestJson.mockReset();
    Object.defineProperty(window, "location", {
      configurable: true,
      value: { origin: "https://admin.wobbly.site" },
    });
  });

  it("builds production user detail url", () => {
    const api = createAdminApi("production");

    api.user("token", 42);

    expect(requestJson).toHaveBeenCalledWith(
      "https://admin.wobbly.site/production/api/users/42",
      {
        headers: {
          Authorization: "Bearer token",
        },
      },
    );
  });

  it("builds staging users search url", () => {
    const api = createAdminApi("staging");

    api.users("token", "gil", 50, 0);

    expect(requestJson).toHaveBeenCalledWith(
      "https://admin.wobbly.site/staging/api/users?search=gil&limit=50&offset=0",
      {
        headers: {
          Authorization: "Bearer token",
        },
      },
    );
  });
});
