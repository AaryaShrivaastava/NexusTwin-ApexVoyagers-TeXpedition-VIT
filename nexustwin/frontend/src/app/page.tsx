"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Orbit, Cpu, Zap, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] text-center px-4 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-black to-black">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl space-y-8"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-zinc-300">
          <Orbit className="w-4 h-4 text-indigo-400" />
          <span>RealityOS v1.0 is live</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-br from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
          One Customer. Infinite Futures.<br />
          <span className="text-indigo-400">AI Chooses The Best One.</span>
        </h1>
        
        <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          The AI Operating System That Tests Customer Futures Before They Happen.
          Build customer twins. Simulate outcomes. Let AI choose the best journey.
        </p>

        <div className="flex items-center justify-center gap-4 pt-4">
          <Link href="/dashboard">
            <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-8 h-12">
              Launch Simulation <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
          <Link href="/architecture">
            <Button size="lg" variant="outline" className="rounded-full px-8 h-12 bg-white/5 border-white/10 hover:bg-white/10 text-white">
              View Architecture
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-16 text-left">
          {[
            { icon: Users, title: "Customer Twins", desc: "Instantly generate highly accurate behavioral twins from your customer data." },
            { icon: Zap, title: "Future Simulation", desc: "Test infinite marketing scenarios and predict revenue, retention, and conversion." },
            { icon: Cpu, title: "Agent Council", desc: "Watch autonomous agents debate scenarios to find the perfect balance." },
          ].map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
              >
                <div className="w-12 h-12 rounded-lg bg-indigo-500/20 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-indigo-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-zinc-400">{feature.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </div>
  );
}
