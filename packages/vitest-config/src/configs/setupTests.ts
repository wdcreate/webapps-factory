export async function setup() {
  const { afterEach } = await import("vitest");
  const { cleanup } = await import("@testing-library/react");
  
  afterEach(() => {
    cleanup();
  });
}

import "@testing-library/jest-dom";