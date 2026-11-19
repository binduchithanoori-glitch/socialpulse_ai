import { request, USE_MOCK } from "./apiClient.js";
import { getMockAnalysis, getMockComparison } from "../mock/mockData.js";

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

/**
 * NOTE: docs/API_CONTRACT.md was not found, so these endpoints are assumptions.
 * Adjust paths / payload mapping here only; UI components stay untouched.
 */
export async function analyzePost({ platform, url }) {
  if (USE_MOCK) {
    await delay(900);
    return getMockAnalysis(platform, url);
  }
  return request("/analyze", { method: "POST", body: JSON.stringify({ platform, url }) });
}

export async function getPlatformComparison() {
  if (USE_MOCK) {
    await delay(300);
    return getMockComparison();
  }
  return request("/platforms/comparison");
}
