"use client";

import { motion } from "framer-motion";
import { Database, Cpu, BrainCircuit, Activity, BarChart3, LineChart, ArrowRight } from "lucide-react";

export default function ArchitecturePage() {
  const nodes = [
    { id: 1, label: "Customer Data", icon: Database, color: "text-zinc-400", border: "border-zinc-500/50" },
    { id: 2, label: "Reality Twin", icon: BrainCircuit, color: "text-blue-400", border: "border-blue-500/50" },
    { id: 3, label: "Future Simulator", icon: Activity, color: "text-purple-400", border: "border-purple-500/50" },
    { id: 4, label: "Agent Council", icon: Cpu, color: "text-indigo-400", border: "border-indigo-500/50", highlight: true },
    { id: 5, label: "Outcome Predictor", icon: LineChart, color: "text-green-400", border: "border-green-500/50" },
    { id: 6, label: "Experience Score", icon: BarChart3, color: "text-amber-400", border: "border-amber-500/50" },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-8 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/10 via-black to-black">
      <div className="text-center mb-20">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent mb-4">System Architecture</h1>
        <p className="text-zinc-400 text-lg">The AI workflow powering RealityOS</p>
      </div>

      <div className="relative flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 max-w-7xl w-full flex-wrap">
        {nodes.map((node, i) => {
          const Icon = node.icon;
          return (
            <div key={node.id} className="flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.2, type: "spring" }}
                whileHover={{ scale: 1.05 }}
                className={`flex flex-col items-center justify-center p-6 rounded-2xl backdrop-blur-md w-40 h-40 md:w-48 md:h-48 border transition-colors cursor-pointer ${
                  node.border
                } ${
                  node.highlight 
                    ? "bg-indigo-900/40 shadow-[0_0_40px_rgba(79,70,229,0.4)]" 
                    : "bg-black/60 hover:bg-white/5"
                }`}
              >
                <Icon className={`w-12 h-12 md:w-16 md:h-16 mb-4 ${node.color}`} />
                <span className="text-white font-medium text-center text-sm md:text-base">{node.label}</span>
              </motion.div>
              
              {i < nodes.length - 1 && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  transition={{ delay: (i * 0.2) + 0.1 }}
                  className="hidden md:flex items-center justify-center text-zinc-600 px-2"
                >
                  <ArrowRight className="w-8 h-8 animate-pulse" />
                </motion.div>
              )}
            </div>
          );
        })}
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
        className="mt-24 max-w-3xl text-center p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5" />
        <h3 className="text-2xl font-semibold text-white mb-4 relative z-10">LangGraph Multi-Agent Workflow</h3>
        <p className="text-zinc-400 leading-relaxed text-lg relative z-10">
          The core differentiator is the <strong className="text-indigo-400">Agent Council</strong>. Instead of a single LLM call, RealityOS spawns 4 distinct personas (Growth, Finance, Customer, Brand) which independently evaluate the simulated futures. A Consensus node then synthesizes their feedback to maximize both revenue and retention.
        </p>
      </motion.div>
    </div>
  );
}
