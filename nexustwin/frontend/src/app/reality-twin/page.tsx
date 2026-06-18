"use client";

import { motion } from "framer-motion";
import { ScanFace, Activity, ShoppingBag, Target, ArrowRight, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRealityStore } from "@/store/store";

export default function RealityTwinPage() {
  const { activeCustomer } = useRealityStore();

  const customer = activeCustomer || {
    name: "Alex Rivera",
    email: "alex@example.com",
    persona: "High-Value Frequent Buyer",
    behavior_pattern: "Browses evenings, buys via mobile app.",
    intent_analysis: "High intent for premium upgrades in Q3.",
    preferred_channel: "WhatsApp",
    buying_probability: 85,
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] p-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">Customer Reality Twin</h1>
          <p className="text-zinc-400 mt-2">Live AI-generated holographic profile based on behavioral streams</p>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10 text-white rounded-full hidden md:flex">
            <Upload className="w-4 h-4 mr-2" /> Upload CSV
          </Button>
          <Link href="/simulator">
            <Button className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-full shadow-[0_0_20px_rgba(79,70,229,0.3)]">
              Simulate Futures <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Holographic ID Card */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="col-span-1 rounded-3xl p-1 bg-gradient-to-b from-indigo-500/30 via-purple-500/10 to-transparent relative group"
        >
          <div className="absolute inset-0 bg-indigo-500/10 blur-2xl rounded-3xl -z-10 group-hover:bg-indigo-500/20 transition-all duration-500" />
          <div className="bg-black/80 backdrop-blur-2xl h-full rounded-[1.4rem] p-8 border border-white/5 flex flex-col items-center text-center relative overflow-hidden">
            {/* Hologram scanline effect */}
            <motion.div 
              animate={{ y: ['-100%', '1000%'] }}
              transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
              className="absolute left-0 right-0 h-1 bg-indigo-500/30 blur-sm"
            />

            <div className="relative w-40 h-40 mb-8">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                className="absolute inset-0 rounded-full border-2 border-indigo-500/30 border-dashed" 
              />
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
                className="absolute inset-3 rounded-full border border-purple-500/40" 
              />
              <div className="absolute inset-6 rounded-full bg-gradient-to-br from-indigo-900 to-black flex items-center justify-center shadow-[0_0_40px_rgba(79,70,229,0.4)] border border-indigo-500/30">
                <ScanFace className="w-16 h-16 text-indigo-300" />
              </div>
            </div>
            
            <h2 className="text-3xl font-bold text-white mb-1">{customer.name}</h2>
            <p className="text-zinc-400 mb-8 font-mono text-sm">{customer.email}</p>
            
            <div className="w-full p-5 rounded-2xl bg-white/5 border border-white/10 mb-4 backdrop-blur-sm">
              <p className="text-xs text-zinc-500 uppercase tracking-widest mb-2">Buying Probability</p>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">
                  {customer.buying_probability}
                </span>
                <span className="text-xl text-green-500/70">%</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: AI Analysis */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="col-span-1 lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {[
            { icon: Target, label: "Persona Mapping", value: customer.persona, color: "text-blue-400", bg: "bg-blue-400/10" },
            { icon: Activity, label: "Behavior Pattern", value: customer.behavior_pattern, color: "text-indigo-400", bg: "bg-indigo-400/10" },
            { icon: ShoppingBag, label: "Intent Analysis", value: customer.intent_analysis, color: "text-purple-400", bg: "bg-purple-400/10" },
            { icon: Target, label: "Preferred Channel", value: customer.preferred_channel, color: "text-pink-400", bg: "bg-pink-400/10" },
          ].map((stat, i) => (
            <motion.div 
              key={i} 
              whileHover={{ scale: 1.02 }}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 transition-all hover:bg-white/10 hover:border-white/20 relative overflow-hidden"
            >
              <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full blur-3xl ${stat.bg} opacity-50`} />
              <stat.icon className={`w-6 h-6 mb-4 ${stat.color}`} />
              <p className="text-sm text-zinc-500 mb-2 uppercase tracking-wider">{stat.label}</p>
              <p className="text-lg text-white font-medium leading-relaxed">{stat.value}</p>
            </motion.div>
          ))}

          {/* Event Stream Mock */}
          <div className="col-span-1 md:col-span-2 p-6 rounded-2xl bg-white/5 border border-white/10 mt-2 relative overflow-hidden">
            <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <Activity className="w-5 h-5 text-indigo-400" /> Live Event Stream
            </h3>
            <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
              {[
                { event: "Email Opened", time: "2 mins ago", detail: "Spring Sale Campaign" },
                { event: "Product Viewed", time: "1 hour ago", detail: "Premium Plan Upgrade" },
                { event: "Added to Cart", time: "3 hours ago", detail: "Abandoned checkout" },
              ].map((ev, i) => (
                <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-black shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                    <div className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(79,70,229,1)]" />
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-zinc-300 font-medium">{ev.event}</span>
                      <time className="text-xs text-zinc-500">{ev.time}</time>
                    </div>
                    <div className="text-sm text-zinc-400">{ev.detail}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
