export interface CustomerEvent {
  id: string;
  customer_id: string;
  event_type: string;
  channel?: string;
  event_timestamp: string;
  metadata_json?: Record<string, any>;
}

export interface Score {
  revenue_score: number;
  retention_score: number;
  engagement_score: number;
  response_score: number;
  satisfaction_score: number;
  unified_score: number;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  persona: string;
  behavior_pattern: string;
  intent_analysis: string;
  preferred_channel: string;
  buying_probability: number;
  created_at: string;
  events: CustomerEvent[];
  score?: Score;
}

export interface Scenario {
  id: string;
  name: string;
  projected_revenue: number;
  conversion_rate: number;
  retention_impact: number;
  confidence_score: number;
}

export interface AgentDecision {
  agent_role: string;
  message: string;
  timestamp: string;
}

export interface Simulation {
  id: string;
  customer_id: string;
  query: string;
  status: string;
  recommended_action?: string;
  future_confidence_index?: number;
  created_at: string;
  scenarios: Scenario[];
  agent_decisions: AgentDecision[];
}
