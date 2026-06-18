"use client";

import { motion } from "framer-motion";
import { Users, Activity, Target, Zap, ArrowRight, TrendingUp } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const metrics = [
  { label: "Total Customers", value: "1,542", change: "+12%", icon: Users, color: "text-blue-400" },
  { label: "Predicted Revenue", value: "$2.4M", change: "+8.4%", icon: Activity, color: "text-green-400" },
  { label: "Retention Rate", value: "94%", change: "+2.1%", icon: Target, color: "text-purple-400" },
  { label: "Future Confidence Index", value: "91%", change: "+5%", icon: Zap, color: "text-indigo-400", highlight: true },
];

export default function DashboardPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">Global Overview</h1>
          <p className="text-zinc-400 mt-2">Monitor the predicted futures across your entire customer base.</p>
        </div>
        <Link href="/reality-twin">
          <Button className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-full shadow-[0_0_20px_rgba(79,70,229,0.3)]">
            Analyze New Customer <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </Link>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((m, i) => {
          const Icon = m.icon;
          return (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className={`p-6 rounded-2xl border backdrop-blur-md relative overflow-hidden transition-all ${
                m.highlight ? "bg-indigo-900/20 border-indigo-500/50 shadow-[0_0_30px_rgba(79,70,229,0.15)]" : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
              }`}
            >
              {m.highlight && <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 blur-3xl rounded-full" />}
              
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl ${m.highlight ? 'bg-indigo-500/20' : 'bg-black/40'} border border-white/5`}>
                  <Icon className={`w-5 h-5 ${m.color}`} />
                </div>
                <span className="text-xs font-bold text-green-400 flex items-center bg-green-400/10 px-2 py-1 rounded-full">
                  <TrendingUp className="w-3 h-3 mr-1" /> {m.change}
                </span>
              </div>
              <h3 className="text-zinc-400 text-sm font-medium uppercase tracking-wider">{m.label}</h3>
              <p className="text-4xl font-bold text-white mt-2 tracking-tight">{m.value}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Area Mock */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 p-6 rounded-2xl bg-white/5 border border-white/10 h-96 flex flex-col relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 blur-[100px] rounded-full" />
          <h3 className="text-lg font-semibold text-white mb-6">Predicted Revenue Trend (30 Days)</h3>
          {/* Mocking a chart for pure UI aesthetics without heavy dependencies */}
          <div className="flex-1 relative w-full flex items-end justify-between px-2 pb-6 border-b border-white/10">
            {Array.from({ length: 14 }).map((_, i) => (
              <motion.div 
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${30 + Math.random() * 60}%` }}
                transition={{ delay: 0.5 + i * 0.05, duration: 1, type: "spring" }}
                className="w-[4%] md:w-[5%] bg-gradient-to-t from-indigo-600/80 to-purple-400/80 rounded-t-md opacity-80 hover:opacity-100 transition-opacity cursor-pointer"
              />
            ))}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-1 p-6 rounded-2xl bg-white/5 border border-white/10 h-96 flex flex-col"
        >
          <h3 className="text-lg font-semibold text-white mb-6">Recent Simulations</h3>
          <div className="flex-1 space-y-3 overflow-y-auto pr-2 no-scrollbar">
            {[
              { name: "Elena Rossi", result: "Scenario B (Email)", status: "Executing" },
              { name: "Marcus Chen", result: "Scenario A (WhatsApp)", status: "Completed" },
              { name: "Sarah Jenkins", result: "Scenario C (Discount)", status: "Completed" },
              { name: "David Kim", result: "Scenario B (Email)", status: "Pending" },
              { name: "Aria Patel", result: "Scenario D (No Action)", status: "Completed" },
            ].map((sim, i) => (
              <div key={i} className="p-4 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between hover:bg-white/5 transition-colors cursor-pointer">
                <div>
                  <p className="text-sm font-medium text-white">{sim.name}</p>
                  <p className="text-xs text-indigo-400 mt-1">{sim.result}</p>
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full ${
                  sim.status === 'Completed' ? 'bg-green-500/20 text-green-400' :
                  sim.status === 'Executing' ? 'bg-blue-500/20 text-blue-400 animate-pulse' : 'bg-zinc-500/20 text-zinc-400'
                }`}>
                  {sim.status}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
