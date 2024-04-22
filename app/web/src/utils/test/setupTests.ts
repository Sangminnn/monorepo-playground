import { vi, afterEach, afterAll } from "vitest";

import "@testing-library/jest-dom";

afterEach(() => {
  vi.clearAllMocks();
});

afterAll(() => {
  vi.resetAllMocks();
});
