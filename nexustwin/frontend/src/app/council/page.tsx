"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRealityStore } from "@/store/store";
import { Shield, TrendingUp, Heart, Megaphone, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const AGENT_ICONS: Record<string, React.ReactNode> = {
  "Growth Agent": <TrendingUp className="w-5 h-5 text-green-400" />,
  "Finance Agent": <Shield className="w-5 h-5 text-red-400" />,
  "Customer Experience Agent": <Heart className="w-5 h-5 text-pink-400" />,
  "Brand Safety Agent": <Megaphone className="w-5 h-5 text-purple-400" />,
  "Consensus Builder": <CheckCircle2 className="w-5 h-5 text-blue-400" />,
};

const AGENT_COLORS: Record<string, string> = {
  "Growth Agent": "border-green-500/30 bg-green-500/10",
  "Finance Agent": "border-red-500/30 bg-red-500/10",
  "Customer Experience Agent": "border-pink-500/30 bg-pink-500/10",
  "Brand Safety Agent": "border-purple-500/30 bg-purple-500/10",
  "Consensus Builder": "border-blue-500/50 bg-blue-500/20 shadow-[0_0_30px_-5px_rgba(59,130,246,0.3)]",
};

const mockDebate = [
  { agent_role: "Growth Agent", message: "I recommend Scenario C (Offer Discount). It maximizes conversion rate to 25%, giving us the highest immediate upside.", timestamp: new Date().toISOString() },
  { agent_role: "Finance Agent", message: "Scenario C erodes our margins too much. Scenario A (WhatsApp) has better projected revenue ($120) with lower costs.", timestamp: new Date().toISOString() },
  { agent_role: "Customer Experience Agent", message: "WhatsApp can be intrusive. An email is less aggressive and still yields decent engagement without annoying the user.", timestamp: new Date().toISOString() },
  { agent_role: "Brand Safety Agent", message: "I agree with Customer Experience. Frequent discounting and WhatsApp spam dilute our premium brand positioning. Email is safer.", timestamp: new Date().toISOString() },
  { agent_role: "Consensus Builder", message: "After reviewing all inputs, the council recommends Scenario B (Send Email). It perfectly balances retention and brand safety while offering a predictable conversion rate.", timestamp: new Date().toISOString() }
];

export default function AgentCouncilPage() {
  const { activeSimulation } = useRealityStore();
  const debate = activeSimulation?.agent_decisions?.length ? activeSimulation.agent_decisions : mockDebate;
  
  const [visibleMessages, setVisibleMessages] = useState<number>(0);
  
  useEffect(() => {
    // Simulate real-time sequential rendering
    const timer = setInterval(() => {
      setVisibleMessages(prev => {
        if (prev < debate.length) return prev + 1;
        clearInterval(timer);
        return prev;
      });
    }, 2000); // 2 seconds per agent
    return () => clearInterval(timer);
  }, [debate.length]);

  return (
    <div className="min-h-[calc(100vh-4rem)] p-8 max-w-4xl mx-auto flex flex-col">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">Autonomous Marketing Council</h1>
        <p className="text-zinc-400 mt-2">Agents debating the optimal future for {activeSimulation?.customer_id ? "Customer" : "Alex Rivera"}</p>
      </div>

      <div className="flex-1 space-y-6">
        <AnimatePresence>
          {debate.slice(0, visibleMessages).map((msg, idx) => {
            const isConsensus = msg.agent_role === "Consensus Builder";
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.5, type: "spring" }}
                className={`flex gap-4 p-6 rounded-2xl border backdrop-blur-md relative overflow-hidden ${AGENT_COLORS[msg.agent_role] || "border-white/10 bg-white/5"}`}
              >
                {isConsensus && (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: [0, 0.5, 0] }} 
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 translate-x-[-100%]"
                  />
                )}
                <div className="flex-shrink-0 mt-1">
                  <div className="w-10 h-10 rounded-full bg-black/40 flex items-center justify-center border border-white/10 shadow-inner">
                    {AGENT_ICONS[msg.agent_role] || <Shield className="w-5 h-5 text-zinc-400" />}
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-white">{msg.agent_role}</h3>
                  </div>
                  <p className="text-zinc-300 leading-relaxed text-lg">{msg.message}</p>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
        
        {visibleMessages < debate.length && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
            className="flex items-center gap-3 text-zinc-500 pl-4 py-4"
          >
            <div className="flex gap-1">
              <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-2 h-2 rounded-full bg-indigo-500" />
              <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-2 h-2 rounded-full bg-indigo-500" />
              <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-2 h-2 rounded-full bg-indigo-500" />
            </div>
            <span>Agent typing...</span>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {visibleMessages === debate.length && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mt-12 flex justify-center pb-20"
          >
            <Link href="/timeline">
              <Button size="lg" className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-full px-12 h-14 text-lg shadow-[0_0_40px_-10px_rgba(79,70,229,0.5)] transition-all hover:scale-105">
                View Timeline Prediction
              </Button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
