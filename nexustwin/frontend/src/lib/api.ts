import { Customer, Simulation } from "./types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function fetchCustomers(): Promise<Customer[]> {
  try {
    const res = await fetch(`${API_BASE}/api/customers`);
    if (!res.ok) throw new Error("Failed to fetch");
    return await res.json();
  } catch (error) {
    console.error("API error, returning mock", error);
    // Mock fallback for hackathon UI development
    return [
      {
        id: "1",
        name: "Alex Rivera",
        email: "alex@example.com",
        persona: "High-Value Frequent Buyer",
        behavior_pattern: "Browses evenings, buys via mobile",
        intent_analysis: "Looking for premium upgrades",
        preferred_channel: "WhatsApp",
        buying_probability: 0.85,
        created_at: new Date().toISOString(),
        events: [],
        score: {
          revenue_score: 90,
          retention_score: 85,
          engagement_score: 88,
          response_score: 92,
          satisfaction_score: 80,
          unified_score: 87
        }
      }
    ];
  }
}

export async function generateSimulation(customerId: string, query: string): Promise<Simulation> {
  const res = await fetch(`${API_BASE}/api/simulations/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ customer_id: customerId, query }),
  });
  if (!res.ok) throw new Error("Failed to generate simulation");
  return res.json();
}

export async function runCouncil(simulationId: string): Promise<Simulation> {
  const res = await fetch(`${API_BASE}/api/council/run`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ simulation_id: simulationId }),
  });
  if (!res.ok) throw new Error("Failed to run council");
  return res.json();
}
