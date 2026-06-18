"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, RefreshCw, BarChart2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRealityStore } from "@/store/store";

import { generateSimulation } from "@/lib/api";

const mockScenarios = [
  { name: "Scenario A: Send WhatsApp", projected_revenue: 120, conversion_rate: 15, retention_impact: 5, confidence_score: 85 },
  { name: "Scenario B: Send Email", projected_revenue: 80, conversion_rate: 8, retention_impact: 2, confidence_score: 92, winner: true },
  { name: "Scenario C: Offer Discount", projected_revenue: 95, conversion_rate: 25, retention_impact: 10, confidence_score: 78 },
  { name: "Scenario D: Do Nothing", projected_revenue: 0, conversion_rate: 0, retention_impact: -5, confidence_score: 95 }
];

export default function SimulatorPage() {
  const { activeCustomer, setActiveSimulation } = useRealityStore();
  const [isSimulating, setIsSimulating] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [query, setQuery] = useState("");
  const [scenarios, setScenarios] = useState<any[]>(mockScenarios);

  const handleSimulate = async () => {
    if (!query) return;
    setIsSimulating(true);
    
    try {
      const simulation = await generateSimulation(activeCustomer?.id || "mock-id", query);
      setActiveSimulation(simulation);
      
      if (simulation.scenarios && simulation.scenarios.length > 0) {
         const sorted = [...simulation.scenarios].sort((a, b) => b.confidence_score - a.confidence_score);
         const processedScenarios = simulation.scenarios.map(s => ({
            ...s,
            winner: s.id === sorted[0].id
         }));
         setScenarios(processedScenarios);
      } else {
         setScenarios(mockScenarios);
      }
    } catch (e) {
      console.error(e);
      setScenarios(mockScenarios);
    } finally {
      setIsSimulating(false);
      setShowResults(true);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] p-8 max-w-7xl mx-auto">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">Future Simulator Engine</h1>
        <p className="text-zinc-400 mt-2">Generate and compare predictive futures for {activeCustomer?.name || "Alex Rivera"}</p>
      </div>

      {!showResults ? (
        <motion.div 
          className="max-w-2xl mx-auto mt-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="p-1 rounded-2xl bg-gradient-to-r from-indigo-500/30 to-purple-500/30 relative group">
            <div className="absolute inset-0 bg-indigo-500/20 blur-xl opacity-50 group-hover:opacity-100 transition-opacity" />
            <div className="bg-black/80 backdrop-blur-xl p-8 rounded-xl relative border border-white/10">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-400" />
                Prompt the Engine
              </h2>
              <div className="flex flex-col gap-4">
                <Input 
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="What should we do for this customer to maximize retention and brand value?" 
                  className="bg-white/5 border-white/10 h-14 text-lg focus-visible:ring-indigo-500 text-white placeholder:text-zinc-600"
                />
                <Button 
                  size="lg" 
                  onClick={handleSimulate}
                  disabled={isSimulating}
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white h-14 text-lg mt-2 transition-all shadow-[0_0_20px_-5px_rgba(79,70,229,0.5)]"
                >
                  {isSimulating ? (
                    <span className="flex items-center gap-2">
                      <RefreshCw className="w-5 h-5 animate-spin" /> Generating Futures...
                    </span>
                  ) : (
                    "Simulate Futures"
                  )}
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {scenarios.map((scenario, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`group relative p-6 rounded-2xl backdrop-blur-md transition-all cursor-default border ${
                  scenario.winner 
                    ? "border-indigo-500 bg-indigo-500/10 shadow-[0_0_30px_-5px_rgba(79,70,229,0.3)] scale-105 z-10" 
                    : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
                }`}
              >
                {scenario.winner && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Winning Scenario
                  </div>
                )}
                
                <h3 className="text-lg font-bold text-white mb-6 pr-6 pt-2">{scenario.name}</h3>
                
                <div className="space-y-5">
                  <div>
                    <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Projected Revenue</p>
                    <p className="text-3xl font-semibold text-green-400">${scenario.projected_revenue}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Conversion</p>
                      <p className="text-xl font-medium text-white">{scenario.conversion_rate}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Retention</p>
                      <p className={`text-xl font-medium ${scenario.retention_impact > 0 ? "text-green-400" : "text-red-400"}`}>
                        {scenario.retention_impact > 0 ? "+" : ""}{scenario.retention_impact}%
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500 uppercase tracking-wider mb-2 flex justify-between">
                      <span>Confidence</span>
                      <span className="text-indigo-400 font-medium">{scenario.confidence_score}%</span>
                    </p>
                    <div className="w-full bg-black/50 rounded-full h-2 overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${scenario.confidence_score}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="bg-indigo-500 h-2 rounded-full" 
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex justify-center"
          >
            <Link href="/council">
              <Button size="lg" className="bg-white text-black hover:bg-zinc-200 rounded-full px-8 h-14 text-lg font-medium shadow-xl hover:scale-105 transition-transform">
                Send to Agent Council <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
