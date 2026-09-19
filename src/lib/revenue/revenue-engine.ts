export type RevenueOpportunityInput = {
  id: string;
  estimatedRevenue: number;
  conversionProbability: number;
  urgency: number;
  recoverability: number;
  evidence: string[];
  reason: string;
  recommendedAction: string;
};

export type RevenueOpportunity = RevenueOpportunityInput & {
  score: number;
  confidence: number;
};

function clamp(value: number) {
  return Math.max(0, Math.min(1, value));
}

export function scoreRevenueOpportunity(input: RevenueOpportunityInput): RevenueOpportunity {
  const score = Math.round(
    input.estimatedRevenue *
      clamp(input.conversionProbability) *
      clamp(input.urgency) *
      clamp(input.recoverability),
  );

  const evidenceCompleteness = Math.min(input.evidence.length / 3, 1);
  const probabilityBounded = clamp(input.conversionProbability);
  const confidence = Math.round((0.6 * evidenceCompleteness + 0.4 * probabilityBounded) * 100) / 100;

  return {
    ...input,
    score,
    confidence,
  };
}

export function prioritizeRevenueOpportunities(inputs: RevenueOpportunityInput[]) {
  return inputs
    .map(scoreRevenueOpportunity)
    .sort((a, b) => b.score - a.score);
}
