import { vi, afterEach, afterAll } from "vitest";

afterEach(() => {
  vi.clearAllMocks();
});

afterAll(() => {
  vi.resetAllMocks();
});
