import { describe, expect, it } from "vitest";
import { prioritizeRevenueOpportunities, scoreRevenueOpportunity } from "./revenue-engine";

describe("revenue opportunity engine", () => {
  it("calculates a bounded deterministic score", () => {
    const result = scoreRevenueOpportunity({
      id: "r-1",
      estimatedRevenue: 1000000,
      conversionProbability: 0.8,
      urgency: 0.9,
      recoverability: 0.7,
      evidence: ["consultation", "last contact", "service value"],
      reason: "follow-up overdue",
      recommendedAction: "contact today",
    });

    expect(result.score).toBe(504000);
    expect(result.confidence).toBe(0.92);
  });

  it("prioritizes higher economic opportunity first", () => {
    const results = prioritizeRevenueOpportunities([
      {
        id: "low",
        estimatedRevenue: 200000,
        conversionProbability: 0.5,
        urgency: 0.5,
        recoverability: 0.5,
        evidence: ["appointment"],
        reason: "no-show",
        recommendedAction: "follow up",
      },
      {
        id: "high",
        estimatedRevenue: 1000000,
        conversionProbability: 0.8,
        urgency: 0.9,
        recoverability: 0.7,
        evidence: ["consultation", "last contact", "service value"],
        reason: "follow-up overdue",
        recommendedAction: "contact today",
      },
    ]);

    expect(results[0].id).toBe("high");
  });
});
