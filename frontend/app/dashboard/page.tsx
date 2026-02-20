"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap,
  ShieldCheck,
  History,
  Plus,
  ArrowRight,
  CheckCircle2,
  Copy,
} from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useAccount } from "wagmi";
import ConnectButton from "@/components/ConnectButton";
import Link from "next/link";
import { clsx } from "clsx";

interface Note {
  id: string;
  date: string;
  amount: string;
  asset: string;
  status: "active" | "cashed";
  secret: string;
}

export default function Dashboard() {
  const { isConnected } = useAccount();
  const [asset, setAsset] = useState("MATE");
  const [amount, setAmount] = useState("100.00");
  const [isCreating, setIsCreating] = useState(false);
  const [notes, setNotes] = useState<Note[]>([
    {
      id: "1",
      date: "Oct 12",
      amount: "500",
      asset: "USDC",
      status: "cashed",
      secret: "zkvvm-note-...",
    },
    {
      id: "2",
      date: "Oct 14",
      amount: "100",
      asset: "USDC",
      status: "active",
      secret: "zkvvm-note-...",
    },
  ]);

  const handleMint = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const newNote: Note = {
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      amount: amount,
      asset: asset,
      status: "active",
      secret: `zkvvm-note-${Math.random().toString(16).slice(2)}-${Math.random().toString(16).slice(2)}`,
    };
    setNotes([newNote, ...notes]);
    setIsCreating(false);
    setAmount("");
  };

  if (!isConnected) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <ShieldCheck size={64} className="text-zinc-700" />
        <h2 className="text-2xl font-display font-semibold">
          Connect your wallet
        </h2>
        <p className="text-zinc-500 max-w-sm text-center">
          Please connect your wallet to access the secure payment dashboard.
        </p>
        <ConnectButton />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 pt-32 pb-12">
      {/* centered Deposit Section */}
      <div className="max-w-2xl mx-auto mb-16 w-full">
        <Card className="p-10 border-brand/20 bg-zinc-950/50 backdrop-blur-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 text-brand/5 pointer-events-none">
            <Plus size={100} strokeWidth={1} />
          </div>

          <h2 className="text-2xl font-display font-bold text-white mb-2 uppercase tracking-tight">
            Deposit
          </h2>
          <p className="text-sm text-zinc-500 mb-10 font-medium">
            Mint a new anonymous bearer note.
          </p>

          <form onSubmit={handleMint} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest ml-1">
                  Asset
                </label>
                <select
                  value={asset}
                  onChange={(e) => setAsset(e.target.value)}
                  className="w-full bg-zinc-900 border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand/50 transition-colors cursor-pointer font-medium appearance-none"
                >
                  <option value="MATE">MATE</option>
                  <option value="USDC">USDC</option>
                  <option value="ETH">ETH</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest ml-1">
                  Amount
                </label>
                <Input
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="border-white/5 bg-zinc-900 h-12 text-base"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full py-6 text-sm font-bold gap-3 shadow-[0_10px_40px_rgba(0,255,163,0.1)] uppercase tracking-[0.2em]"
              disabled={isCreating}
            >
              {isCreating ? "MINTING NOTE..." : "MINT BEARER NOTE"}
              <Zap size={18} />
            </Button>
          </form>
        </Card>
      </div>

      {/* Notes Table */}
      <div className="space-y-6">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em]">
            Your Local Vault
          </h3>
          <div className="flex items-center gap-2 text-[10px] text-zinc-700 font-bold italic uppercase tracking-tighter">
            <ShieldCheck size={10} />
            Keys stored in browser session
          </div>
        </div>

        <Card className="p-0 overflow-hidden border-white/5 bg-zinc-950/20">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 text-[10px] uppercase font-black tracking-widest text-zinc-700">
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Value</th>
                  <th className="px-6 py-4 text-right">Secret Code</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {notes.map((note) => (
                  <tr
                    key={note.id}
                    className="border-b border-white/5 hover:bg-white/[0.01] transition-colors group"
                  >
                    <td className="px-6 py-4 font-medium text-zinc-500">
                      {note.date}
                    </td>
                    <td className="px-6 py-4 font-mono font-bold text-zinc-300">
                      {note.amount}{" "}
                      <span className="text-zinc-600 font-medium">
                        {note.asset}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() =>
                          navigator.clipboard.writeText(note.secret)
                        }
                        className="inline-flex items-center gap-2 px-3 py-1.5 hover:bg-brand/10 rounded-lg text-zinc-600 hover:text-brand transition-colors text-[9px] uppercase font-black tracking-widest border border-transparent hover:border-brand/20"
                      >
                        <Copy size={12} />
                        Copy Key
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
