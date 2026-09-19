export type AgentName =
  | "revenue-analyst"
  | "follow-up-strategist"
  | "operations-analyst"
  | "management-briefing";

export type AgentContract = {
  name: AgentName;
  purpose: string;
  input: string[];
  output: string[];
  permissions: "read-only" | "recommendation";
};

export const agentContracts: AgentContract[] = [
  {
    name: "revenue-analyst",
    purpose: "کشف و توضیح فرصت‌های درآمدی بر اساس داده ساختاریافته",
    input: ["funnel metrics", "follow-up events", "appointment outcomes", "payment aggregates"],
    output: ["opportunities", "evidence", "trend explanations"],
    permissions: "read-only",
  },
  {
    name: "follow-up-strategist",
    purpose: "تعیین اقدام بعدی برای فرصت‌های اولویت‌دار",
    input: ["prioritized opportunities", "interaction history", "clinic workflow"],
    output: ["timing recommendation", "channel recommendation", "draft action"],
    permissions: "recommendation",
  },
  {
    name: "operations-analyst",
    purpose: "کشف گلوگاه‌های اجرایی و الگوهای عدم مراجعه",
    input: ["appointment outcomes", "staff workload", "follow-up completion"],
    output: ["bottlenecks", "no-show patterns", "workflow recommendations"],
    permissions: "read-only",
  },
  {
    name: "management-briefing",
    purpose: "تبدیل نتایج معتبر به گزارش تصمیم‌گیری مالک",
    input: ["validated metrics", "approved opportunities", "action outcomes"],
    output: ["daily brief", "weekly brief", "decision summary"],
    permissions: "read-only",
  },
];
