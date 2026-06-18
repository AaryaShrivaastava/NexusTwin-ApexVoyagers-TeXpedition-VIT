"use client";

import { motion } from "framer-motion";
import { Clock, Zap, Target, Award, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRealityStore } from "@/store/store";

export default function TimelinePage() {
  const { activeSimulation } = useRealityStore();
  const recommendedAction = activeSimulation?.recommended_action || "Scenario B: Send Email";
  const confidence = activeSimulation?.future_confidence_index || 88;

  const timelineSteps = [
    { phase: "Past", title: "Historical Pattern", desc: "Frequent evening browsing, waiting for seasonal sales.", icon: Clock, color: "text-zinc-500", glow: "shadow-[0_0_20px_rgba(113,113,122,0.3)]" },
    { phase: "Present", title: "Intent Triggered", desc: "Viewed Premium Upgrade page 1 hour ago.", icon: Zap, color: "text-blue-500", glow: "shadow-[0_0_20px_rgba(59,130,246,0.3)]" },
    { phase: "Action", title: "Council Decision", desc: `Execute ${recommendedAction}`, icon: Target, color: "text-indigo-500", glow: "shadow-[0_0_30px_rgba(79,70,229,0.5)]" },
    { phase: "Future", title: "Predicted Outcome", desc: `Conversion within 24 hours. ${confidence}% Confidence.`, icon: Award, color: "text-green-500", glow: "shadow-[0_0_30px_rgba(34,197,94,0.5)]" },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] p-8 max-w-6xl mx-auto flex flex-col md:flex-row gap-12">
      {/* Left Column: Timeline */}
      <div className="flex-1">
        <div className="mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">Predicted Future Timeline</h1>
          <p className="text-zinc-400 mt-2">The projected path based on the Council's decision.</p>
        </div>

        <div className="relative border-l border-white/10 ml-6 space-y-12 pb-12">
          {timelineSteps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.3, duration: 0.5 }}
                className="relative pl-10 group"
              >
                <div className={`absolute -left-5 top-1 w-10 h-10 rounded-full bg-black border border-white/10 flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${step.glow} z-10`}>
                  <Icon className={`w-5 h-5 ${step.color}`} />
                </div>
                
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2 block">{step.phase}</span>
                  <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-zinc-400">{step.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Right Column: Success Score Engine */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="w-full md:w-[400px] flex flex-col items-center justify-center mt-10 md:mt-24"
      >
        <div className="w-full p-8 rounded-3xl bg-gradient-to-b from-indigo-900/20 to-black border border-white/10 backdrop-blur-xl relative overflow-hidden text-center shadow-2xl">
          <div className="absolute inset-0 bg-indigo-500/10 blur-3xl rounded-3xl -z-10" />
          
          <h2 className="text-2xl font-bold text-white mb-2">Success Score Engine</h2>
          <p className="text-sm text-zinc-400 mb-8">Unified Experience Prediction</p>

          <div className="relative w-48 h-48 mx-auto mb-10">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" className="text-white/5" strokeWidth="6" />
              <motion.circle 
                cx="50" cy="50" r="45" fill="none" stroke="currentColor" className="text-indigo-500" strokeWidth="6"
                strokeDasharray="283"
                initial={{ strokeDashoffset: 283 }}
                animate={{ strokeDashoffset: 283 - (283 * 87.6) / 100 }}
                transition={{ duration: 2, delay: 2, ease: "easeOut" }}
                strokeLinecap="round"
                filter="drop-shadow(0 0 8px rgba(79,70,229,0.8))"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3 }}
                className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-400"
              >
                88
              </motion.span>
              <span className="text-xs text-zinc-500 uppercase tracking-widest mt-1">/ 100</span>
            </div>
          </div>

          <div className="space-y-5 text-left">
            {[
              { label: "Revenue Potential", val: 85 },
              { label: "Retention Impact", val: 92 },
              { label: "Customer Satisfaction", val: 95 }
            ].map((metric, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-zinc-400 font-medium">{metric.label}</span>
                  <span className="text-white font-bold">{metric.val}%</span>
                </div>
                <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${metric.val}%` }}
                    transition={{ delay: 2.5 + (i * 0.2), duration: 1 }}
                    className="h-full bg-gradient-to-r from-indigo-600 to-purple-500 rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>

          <Link href="/dashboard" className="block mt-10">
            <Button className="w-full bg-white text-black hover:bg-zinc-200 rounded-full h-14 font-semibold text-lg transition-transform hover:scale-105">
              Return to Dashboard <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
