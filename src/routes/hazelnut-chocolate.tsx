import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Leaf, Beaker, Sparkles, ShieldCheck, Download, MapPin,
  CheckCircle2, FlaskConical, Brain, Sprout, Droplets, Wheat, Milk,
  Heart, Zap, Activity, Award, ChevronRight, X, Globe2, Recycle,
  Instagram, Twitter, Facebook, Mail, Star, TrendingUp,
} from "lucide-react";
import {
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  ResponsiveContainer, RadialBarChart, RadialBar, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
} from "recharts";
import productImg from "@/assets/product-front.png";
import labReportPdf from "@/assets/Trustable_Test_Report.pdf";

export const Route = createFileRoute("/hazelnut-chocolate")({
  component: HazelnutChocolate,
  head: () => ({
    meta: [
      { title: "Trustable — Hazelnut Chocolate | Daily Nutrition Blend" },
      { name: "description", content: "Comfort-first plant-based daily nutrition with full lab, ingredient, and traceability transparency." },
      { property: "og:title", content: "Trustable — Hazelnut Chocolate Daily Nutrition Blend" },
      { property: "og:description", content: "15g plant protein, 23 vitamins & minerals, 0 added sugar — fully traceable." },
    ],
  }),
});

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "lab", label: "Lab Report" },
  { id: "inside", label: "What's Inside" },
  { id: "clean", label: "Clean Label" },
  { id: "ai", label: "AI Report" },
  { id: "trace", label: "Traceability" },
];

const INGREDIENTS = [
  { name: "Pea Protein Isolate", icon: Sprout, benefit: "Complete amino acid profile, easy on digestion", origin: "Canada", details: "Cold-processed pea protein isolate providing 80%+ protein content with all 9 essential amino acids." },
  { name: "Brown Rice Protein", icon: Wheat, benefit: "Hypoallergenic, complements pea for a full PDCAAS", origin: "India", details: "Sprouted brown rice protein, gentle and easily absorbed. Pairs with pea protein for optimal amino balance." },
  { name: "Lotus Seed (Makhana)", icon: Leaf, benefit: "Traditional comfort food, supports gentle digestion", origin: "Bihar, India", details: "Hand-harvested foxnuts roasted and milled. Low glycemic, naturally alkaline." },
  { name: "Coconut Milk Powder", icon: Droplets, benefit: "Creamy texture, healthy MCT fats", origin: "Sri Lanka", details: "Spray-dried virgin coconut milk for body and a subtle natural sweetness." },
  { name: "Cocoa Powder", icon: Heart, benefit: "Polyphenols, mood and circulation support", origin: "Ghana", details: "Fair-trade Dutch-processed cocoa with deep hazelnut-chocolate notes." },
  { name: "Moringa Leaf", icon: Leaf, benefit: "Dense in vitamins A, C, iron and calcium", origin: "Tamil Nadu, India", details: "Shade-dried moringa leaves preserving chlorophyll and micronutrients." },
  { name: "Spirulina", icon: Sprout, benefit: "Plant-based B12 support and antioxidants", origin: "Sustainable Farms", details: "Tank-grown spirulina with verified heavy-metal screening." },
  { name: "Ashwagandha Root", icon: Sparkles, benefit: "Adaptogen for stress and recovery", origin: "Madhya Pradesh, India", details: "KSM-style root extract standardized to withanolides." },
  { name: "Inulin Prebiotic", icon: Activity, benefit: "Feeds beneficial gut bacteria", origin: "Belgium", details: "Chicory root inulin — soluble fiber that supports microbiome diversity." },
  { name: "Probiotic Blend", icon: Beaker, benefit: "1 Billion CFU, 5 strains for gut balance", origin: "Multi-source", details: "L. acidophilus, B. infantis, B. bifidum, B. coagulans, L. rhamnosus." },
  { name: "DigeZyme®", icon: FlaskConical, benefit: "Multi-enzyme complex for easy digestion", origin: "Sabinsa, India", details: "Amylase, Protease, Lactase, Lipase, Cellulase — breaks down macros gently." },
];

const QUICK_STATS = [
  { label: "Calories", value: "110", icon: Zap },
  { label: "Protein", value: "15g", icon: Activity },
  { label: "Fiber", value: "3g", icon: Sprout },
  { label: "Probiotics", value: "1B CFU", icon: Beaker },
  { label: "Dairy Free", value: "✓", icon: Milk },
  { label: "Gluten Free", value: "✓", icon: Wheat },
  { label: "Soy Free", value: "✓", icon: Leaf },
];

const CLEAN = [
  "No Artificial Sweeteners", "No Preservatives", "No Added Sugar",
  "Dairy Free", "Gluten Free", "Soy Free", "Plant-Based",
];

const TRACE = [
  { ingredient: "Pea Protein", origin: "Saskatchewan, Canada", note: "Cold-pressed, non-GMO farms" },
  { ingredient: "Makhana", origin: "Bihar, India", note: "Hand-harvested wetlands" },
  { ingredient: "Cocoa", origin: "Ashanti, Ghana", note: "Fair-trade cooperatives" },
  { ingredient: "Spirulina", origin: "Sustainable Farms", note: "Closed-loop tank cultivation" },
];

function FloatingBlobs() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <motion.div
        className="absolute -top-32 -left-32 h-[28rem] w-[28rem] rounded-full bg-secondary/30 blur-3xl"
        animate={{ x: [0, 80, 0], y: [0, 60, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/3 -right-32 h-[32rem] w-[32rem] rounded-full bg-accent/35 blur-3xl"
        animate={{ x: [0, -70, 0], y: [0, 80, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 left-1/4 h-96 w-96 rounded-full bg-primary/15 blur-3xl"
        animate={{ x: [0, 60, 0], y: [0, -50, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[36rem] w-[36rem] rounded-full bg-gradient-to-br from-secondary/20 to-primary/20 blur-3xl"
        animate={{ rotate: [0, 360], scale: [1, 1.1, 1] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

function Particles() {
  const items = Array.from({ length: 14 });
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-1.5 w-1.5 rounded-full bg-primary/30"
          style={{ left: `${(i * 73) % 100}%`, top: `${(i * 37) % 100}%` }}
          animate={{ y: [0, -30, 0], opacity: [0.2, 0.7, 0.2] }}
          transition={{ duration: 6 + (i % 5), repeat: Infinity, delay: i * 0.3 }}
        />
      ))}
    </div>
  );
}

function GlassCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-3xl border border-border/50 bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-2xl shadow-[0_8px_32px_-12px_rgba(80,60,30,0.12)] hover:shadow-[0_20px_60px_-15px_rgba(80,60,30,0.2)] transition-shadow duration-300 ${className}`}
    >
      {children}
    </div>
  );
}

function Hero() {
  return (
    <section className="relative pt-16 pb-24 sm:pt-20 sm:pb-32">
      <Particles />
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative order-2 lg:order-1"
          >
            <div className="absolute inset-0 -z-10 rounded-[3rem] bg-gradient-to-br from-secondary/50 via-accent/40 to-primary/20 blur-3xl opacity-70" />
            <div className="relative mx-auto max-w-md overflow-hidden rounded-[2.5rem] border border-border/50 bg-card/70 p-8 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] backdrop-blur-xl">
              <img src={productImg} alt="Trustable Daily Nutrition Blend" className="h-auto w-full rounded-[1.8rem] object-cover shadow-lg" />
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-4 top-10 rounded-full bg-card/95 px-4 py-2.5 text-xs font-semibold shadow-xl backdrop-blur-md border border-border/50"
              >
                <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5 text-secondary-foreground" /> Third-party tested</span>
              </motion.div>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -left-4 bottom-16 rounded-full bg-secondary/90 px-4 py-2.5 text-xs font-semibold shadow-xl backdrop-blur-md border border-secondary/50"
              >
                <span className="inline-flex items-center gap-1.5"><Leaf className="h-3.5 w-3.5 text-secondary-foreground" /> 100% Plant-Based</span>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="order-1 lg:order-2"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-border/60 bg-gradient-to-r from-card/80 to-card/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground backdrop-blur-xl shadow-sm"
            >
              <Leaf className="h-3.5 w-3.5 text-secondary-foreground" /> Hazelnut Chocolate · 480g
            </motion.div>
            <h1 className="font-serif text-5xl leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-7xl xl:text-8xl">
              All-in-One <br />
              <span className="bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text italic text-transparent">Daily Nutrition</span> <br />
              <span className="text-foreground/90">Blend</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
              Comfort-First, Plant-Based Nutrition — designed for adults who want daily nourishment that's gentle, balanced, and beautifully transparent.
            </p>

            <div className="mt-8 flex flex-wrap gap-2.5">
              {["15g Plant Protein", "23 Vitamins & Minerals", "0 Added Sugar", "Gentle Digestion"].map((b, i) => (
                <motion.span
                  key={b}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + i * 0.05 }}
                  className="rounded-full border border-border/60 bg-gradient-to-br from-card/90 to-card/70 px-4 py-2 text-sm font-medium text-foreground backdrop-blur-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  {b}
                </motion.span>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <a
                href="#lab"
                className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-primary to-primary/90 px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition-all hover:scale-[1.03] hover:shadow-xl hover:shadow-primary/40"
              >
                <FlaskConical className="h-4 w-4 transition-transform group-hover:rotate-12" /> View Lab Report
              </a>
              <a
                href="#trace"
                className="group inline-flex items-center gap-2.5 rounded-full border border-border bg-card/70 px-7 py-3.5 text-sm font-semibold text-foreground backdrop-blur-xl transition-all hover:bg-card hover:shadow-lg"
              >
                <MapPin className="h-4 w-4 transition-transform group-hover:scale-110" /> Trace Ingredients
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function QuickStats() {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-8">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
        {QUICK_STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06, duration: 0.5 }}
          >
            <GlassCard className="group p-5 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <s.icon className="mx-auto mb-2.5 h-6 w-6 text-primary transition-colors group-hover:text-secondary-foreground" />
              </motion.div>
              <div className="text-2xl font-bold text-foreground">{s.value}</div>
              <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{s.label}</div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Tabs({ active, setActive }: { active: string; setActive: (s: string) => void }) {
  return (
    <div className="sticky top-0 z-40 -mx-6 mt-20 border-y border-border/60 bg-background/80 px-6 backdrop-blur-2xl shadow-sm">
      <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto py-4 scrollbar-hide">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => {
              setActive(t.id);
              document.getElementById(t.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            className={`relative whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
              active === t.id
                ? "bg-gradient-to-r from-primary to-primary/90 text-primary-foreground shadow-lg shadow-primary/25 scale-105"
                : "text-muted-foreground hover:bg-muted/80 hover:text-foreground hover:scale-105"
            }`}
          >
            {t.label}
            {active === t.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 -z-10 rounded-full bg-primary"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

function Overview() {
  return (
    <section id="overview" className="scroll-mt-24 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-3 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-primary font-semibold">Our Story</p>
            <h2 className="font-serif text-4xl leading-tight text-foreground sm:text-5xl lg:text-6xl">
              Designed for everyday use — <br />
              <span className="bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text italic text-transparent">not performance pressure.</span>
            </h2>
            <div className="mt-8 space-y-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              <p className="first-letter:text-4xl first-letter:font-serif first-letter:font-bold first-letter:text-primary first-letter:mr-1 first-letter:float-left">Trustable was created for adults who find traditional protein products heavy, overly sweet, or difficult to tolerate. We deliver balanced nourishment that fits naturally into everyday routines — warm, cold, or blended.</p>
              <p>Plant proteins from pea and brown rice are balanced with lotus seed (makhana) for comfort, paired with 23 vitamins and minerals, prebiotics and probiotics, and DigeZyme® for gentle digestion.</p>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="rounded-2xl border border-secondary/30 bg-gradient-to-br from-secondary/10 to-accent/10 p-5 text-foreground font-medium"
              >
                Each plant-based meal saves up to <span className="font-bold text-secondary-foreground">50 liters of water</span>. Nutrition that's better for you, and for the planet. 🌱
              </motion.p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-5"
          >
            {[
              { icon: Heart, title: "Comfort-First", body: "Gentle on stomachs that struggle with whey.", color: "from-red-500/20 to-pink-500/20" },
              { icon: Recycle, title: "Sustainable", body: "Plant-based, lower water and carbon footprint.", color: "from-green-500/20 to-emerald-500/20" },
              { icon: ShieldCheck, title: "Transparent", body: "Every batch tested. Every source traced.", color: "from-blue-500/20 to-cyan-500/20" },
            ].map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i }}
              >
                <GlassCard className="group p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                  <div className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${c.color} mb-3`}>
                    <c.icon className="h-6 w-6 text-primary transition-transform group-hover:scale-110" />
                  </div>
                  <div className="text-lg font-bold text-foreground">{c.title}</div>
                  <div className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.body}</div>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function LabReport() {
  const score = 94;
  const data = [{ name: "score", value: score, fill: "var(--primary)" }];
  
  const handleDownloadPDF = () => {
    const link = document.createElement('a');
    link.href = labReportPdf;
    link.download = 'Trustable_Test_Report.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="lab" className="scroll-mt-24 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10 flex items-end justify-between flex-wrap gap-4">
          <div>
            <p className="mb-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">Verification</p>
            <h2 className="font-serif text-4xl text-foreground sm:text-5xl">Lab Report</h2>
          </div>
          <button 
            onClick={handleDownloadPDF}
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background hover:opacity-90 transition-all hover:scale-105"
          >
            <Download className="h-4 w-4" /> Download PDF
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <GlassCard className="lg:col-span-1 p-8 text-center">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Overall Quality</p>
            <div className="relative mx-auto mt-3 h-56 w-56">
              <ResponsiveContainer>
                <RadialBarChart innerRadius="78%" outerRadius="100%" data={data} startAngle={90} endAngle={-270}>
                  <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                  <RadialBar dataKey="value" cornerRadius={20} background={{ fill: "var(--muted)" }} />
                </RadialBarChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="font-serif text-6xl font-bold text-foreground">{score}</div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">/ 100</div>
              </div>
            </div>
            <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-secondary/40 px-3 py-1 text-xs font-medium text-secondary-foreground">
              <ShieldCheck className="h-3.5 w-3.5" /> Third-party Tested
            </div>
          </GlassCard>

          <GlassCard className="lg:col-span-2 p-8">
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { label: "Heavy Metals", status: "Passed" },
                { label: "Microbiology", status: "Passed" },
                { label: "Protein Verification", status: "Verified" },
                { label: "No Added Sugar", status: "Verified" },
              ].map((t) => (
                <div key={t.label} className="flex items-center justify-between rounded-2xl border border-border/60 bg-background/40 p-4">
                  <span className="text-sm font-medium">{t.label}</span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary/50 px-2.5 py-1 text-xs font-semibold text-secondary-foreground">
                    <CheckCircle2 className="h-3.5 w-3.5" /> {t.status}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <p className="mb-4 text-xs uppercase tracking-widest text-muted-foreground">Testing Timeline</p>
              <ol className="relative space-y-5 border-l-2 border-border/70 pl-6">
                {[
                  { d: "", t: "Sample collected — Batch SLACH003" },
                  { d: "", t: "Heavy metals & microbiology assays" },
                  { d: "", t: "Protein content & macro verification" },
                  { d: "", t: "Final report — third-party signed off" },
                ].map((s, i) => (
                  <li key={i} className="relative">
                    <span className="absolute -left-[31px] top-1 h-3 w-3 rounded-full bg-primary ring-4 ring-background" />
                    <div className="text-xs uppercase tracking-widest text-muted-foreground">{s.d}</div>
                    <div className="text-sm font-medium text-foreground">{s.t}</div>
                  </li>
                ))}
              </ol>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}

function Inside() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section id="inside" className="scroll-mt-24 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-primary font-semibold">Formulation</p>
          <h2 className="font-serif text-4xl text-foreground sm:text-5xl lg:text-6xl">What's Inside</h2>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">Eleven thoughtful ingredients. No fillers. Tap any card to learn more.</p>
        </motion.div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {INGREDIENTS.map((ing, i) => (
            <motion.button
              key={ing.name}
              onClick={() => setOpen(i)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 6) * 0.07, duration: 0.5 }}
              whileHover={{ y: -8 }}
              className="group text-left"
            >
              <GlassCard className="h-full p-7 transition-all duration-300 hover:shadow-2xl hover:border-primary/30">
                <div className="flex items-start justify-between mb-5">
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-secondary/50 to-accent/40 shadow-lg"
                  >
                    <ing.icon className="h-7 w-7 text-secondary-foreground" />
                  </motion.div>
                  <span className="rounded-full border border-border/60 bg-card/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground backdrop-blur-sm">
                    {ing.origin}
                  </span>
                </div>
                <div className="mb-2 text-lg font-bold text-foreground group-hover:text-primary transition-colors">{ing.name}</div>
                <div className="text-sm leading-relaxed text-muted-foreground">{ing.benefit}</div>
                <div className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-primary opacity-60 transition-all group-hover:opacity-100 group-hover:gap-2">
                  Learn more <ChevronRight className="h-3.5 w-3.5" />
                </div>
              </GlassCard>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 p-4 backdrop-blur-md"
            onClick={() => setOpen(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 30, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg rounded-3xl border border-border/50 bg-card/95 p-10 shadow-2xl backdrop-blur-xl"
            >
              <button
                onClick={() => setOpen(null)}
                className="absolute right-6 top-6 rounded-full bg-muted/80 p-2 text-muted-foreground transition-all hover:bg-muted hover:text-foreground hover:rotate-90"
              >
                <X className="h-5 w-5" />
              </button>
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1 }}
                className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-secondary/50 to-accent/40 shadow-lg"
              >
                {(() => { const Icon = INGREDIENTS[open].icon; return <Icon className="h-8 w-8 text-secondary-foreground" />; })()}
              </motion.div>
              <h3 className="font-serif text-3xl font-bold text-foreground">{INGREDIENTS[open].name}</h3>
              <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-muted/80 px-3 py-1 text-xs uppercase tracking-widest text-muted-foreground">
                <MapPin className="h-3 w-3" /> Origin · {INGREDIENTS[open].origin}
              </div>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground">{INGREDIENTS[open].details}</p>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-6 rounded-2xl bg-gradient-to-br from-secondary/20 to-accent/20 p-6 border border-secondary/30"
              >
                <span className="text-xs uppercase tracking-widest text-primary font-semibold">Why it's in here</span>
                <p className="mt-2 text-sm font-medium text-foreground leading-relaxed">{INGREDIENTS[open].benefit}</p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function CleanLabel() {
  const compare = [
    { metric: "Added Sugar", trustable: 0, typical: 8 },
    { metric: "Artificial Sweeteners", trustable: 0, typical: 3 },
    { metric: "Fillers", trustable: 0, typical: 5 },
    { metric: "Plant Diversity", trustable: 11, typical: 3 },
    { metric: "Probiotics (B CFU)", trustable: 1, typical: 0 },
  ];
  return (
    <section id="clean" className="scroll-mt-24 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <p className="mb-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">Clean Label</p>
        <h2 className="font-serif text-4xl text-foreground sm:text-5xl">Pure, by design.</h2>

        <div className="mt-10 grid gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {CLEAN.map((c) => (
            <GlassCard key={c} className="flex items-center gap-3 p-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary/50">
                <CheckCircle2 className="h-4 w-4 text-secondary-foreground" />
              </div>
              <span className="text-sm font-medium">{c}</span>
            </GlassCard>
          ))}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <GlassCard className="p-8">
            <Award className="h-6 w-6 text-primary" />
            <h3 className="mt-3 font-serif text-2xl text-foreground">Our Clean Pledge</h3>
            <p className="mt-3 text-sm text-muted-foreground">
              We will never use artificial sweeteners, hidden fillers, or marketing-fluff ingredients. If it's on the label, it's there for a reason — and we can tell you exactly why.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {["FDA Registered", "HACCP", "GMP Certified"].map((b) => (
                <span key={b} className="rounded-full border border-border bg-background/50 px-3 py-1 text-xs font-medium">{b}</span>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-serif text-xl text-foreground">Trustable vs Typical</h3>
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Lower / higher is better varies</span>
            </div>
            <div className="h-64">
              <ResponsiveContainer>
                <BarChart data={compare} layout="vertical" margin={{ left: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis type="number" stroke="var(--muted-foreground)" fontSize={11} />
                  <YAxis dataKey="metric" type="category" stroke="var(--muted-foreground)" fontSize={11} width={120} />
                  <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12 }} />
                  <Bar dataKey="typical" fill="var(--muted-foreground)" radius={[0, 6, 6, 0]} />
                  <Bar dataKey="trustable" fill="var(--primary)" radius={[0, 6, 6, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}

function AIReport() {
  const radar = [
    { k: "Digestibility", v: 96 },
    { k: "Nutrient Density", v: 92 },
    { k: "Gut Friendly", v: 95 },
    { k: "Energy Support", v: 88 },
    { k: "Synergy", v: 93 },
  ];
  return (
    <section id="ai" className="scroll-mt-24 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
          <Brain className="h-3.5 w-3.5" /> AI Insights
        </div>
        <h2 className="mt-2 font-serif text-4xl text-foreground sm:text-5xl">AI Nutrition Report</h2>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <div className="space-y-3 lg:col-span-1">
            {radar.map((r) => (
              <GlassCard key={r.k} className="p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{r.k}</span>
                  <span className="font-mono text-primary">{r.v}</span>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${r.v}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                  />
                </div>
              </GlassCard>
            ))}
          </div>

          <GlassCard className="p-6 lg:col-span-2">
            <div className="h-72">
              <ResponsiveContainer>
                <RadarChart data={radar}>
                  <PolarGrid stroke="var(--border)" />
                  <PolarAngleAxis dataKey="k" tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} />
                  <PolarRadiusAxis domain={[0, 100]} tick={{ fill: "var(--muted-foreground)", fontSize: 10 }} />
                  <Radar dataKey="v" stroke="var(--primary)" fill="var(--primary)" fillOpacity={0.35} />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-border/60 bg-background/40 p-5">
                <div className="mb-2 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
                  <Sparkles className="h-3.5 w-3.5" /> AI Summary
                </div>
                <p className="text-sm text-muted-foreground">A balanced, low-glycemic plant blend with strong digestibility and gut support. Modest caloric load makes it suitable for daily use without bloat or sugar crashes.</p>
              </div>
              <div className="rounded-2xl bg-gradient-to-br from-primary/15 to-secondary/30 p-5">
                <div className="mb-2 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-foreground">
                  <Star className="h-3.5 w-3.5" /> AI Recommendation
                </div>
                <p className="text-sm text-foreground">Ideal for professionals, daily wellness, and light meal replacement.</p>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}

function Traceability() {
  return (
    <section id="trace" className="scroll-mt-24 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <p className="mb-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">Supply Chain</p>
        <h2 className="font-serif text-4xl text-foreground sm:text-5xl">Traceability</h2>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <GlassCard className="p-6 lg:col-span-2">
            <div className="mb-4 flex items-center gap-2">
              <Globe2 className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Origin Journey</h3>
            </div>
            <ol className="space-y-5">
              {TRACE.map((t, i) => (
                <motion.li
                  key={t.ingredient}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex gap-4 rounded-2xl border border-border/60 bg-background/40 p-4"
                >
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-secondary/40">
                    <MapPin className="h-5 w-5 text-secondary-foreground" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-semibold">{t.ingredient}</span>
                      <span className="text-xs uppercase tracking-widest text-muted-foreground">{t.origin}</span>
                    </div>
                    <div className="mt-1 text-sm text-muted-foreground">{t.note}</div>
                  </div>
                </motion.li>
              ))}
            </ol>

          
          </GlassCard>

          <div className="space-y-4">
            <GlassCard className="p-6">
              <div className="mb-3 text-xs uppercase tracking-widest text-muted-foreground">Sustainability</div>
              <div className="space-y-3">
                {[
                  { icon: Droplets, k: "Water saved / serving", v: "50 L" },
                  { icon: Recycle, k: "Recyclable packaging", v: "98%" },
                  { icon: TrendingUp, k: "Carbon vs whey", v: "−68%" },
                ].map((m) => (
                  <div key={m.k} className="flex items-center justify-between text-sm">
                    <span className="inline-flex items-center gap-2 text-muted-foreground"><m.icon className="h-4 w-4" /> {m.k}</span>
                    <span className="font-bold text-foreground">{m.v}</span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative mt-32 border-t border-border bg-gradient-to-b from-card/60 to-card/80 backdrop-blur-xl">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="font-serif text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Trustable</div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">Comfort-first daily nutrition. Transparent by design.</p>
            <div className="mt-6 flex gap-3">
              {[Instagram, Twitter, Facebook, Mail].map((I, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="grid h-10 w-10 place-items-center rounded-full border border-border bg-background/80 transition-colors hover:border-primary hover:bg-primary/10"
                >
                  <I className="h-4 w-4 text-muted-foreground hover:text-primary" />
                </motion.a>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <div className="mb-4 text-xs font-bold uppercase tracking-widest text-primary">Certifications</div>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li className="flex items-center gap-2 transition-colors hover:text-foreground">
                <CheckCircle2 className="h-3.5 w-3.5 text-secondary-foreground" /> FDA Registered Facility
              </li>
              <li className="flex items-center gap-2 transition-colors hover:text-foreground">
                <CheckCircle2 className="h-3.5 w-3.5 text-secondary-foreground" /> HACCP Certified
              </li>
              <li className="flex items-center gap-2 transition-colors hover:text-foreground">
                <CheckCircle2 className="h-3.5 w-3.5 text-secondary-foreground" /> GMP Certified
              </li>
              <li className="flex items-center gap-2 transition-colors hover:text-foreground">
                <CheckCircle2 className="h-3.5 w-3.5 text-secondary-foreground" /> Third-party Lab Tested
              </li>
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            
          </motion.div>
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-8 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} Trustable. All rights reserved.</span>
          <span className="inline-flex items-center gap-2 rounded-full bg-secondary/20 px-3 py-1.5 text-xs font-medium text-secondary-foreground">
            <Leaf className="h-3.5 w-3.5" /> Each meal saves up to 50 L of water
          </span>
        </div>
      </div>
    </footer>
  );
}

function StickyCTA() {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="fixed inset-x-4 bottom-4 z-40 lg:hidden"
    >
      <div className="flex gap-3 rounded-2xl border border-border/60 bg-card/95 p-3 shadow-2xl backdrop-blur-xl">
        <a
          href="#lab"
          className="group flex-1 rounded-xl bg-gradient-to-r from-primary to-primary/90 px-5 py-3 text-center text-sm font-bold text-primary-foreground shadow-lg shadow-primary/30 transition-all hover:scale-105"
        >
          <span className="inline-flex items-center gap-2">
            <FlaskConical className="h-4 w-4 transition-transform group-hover:rotate-12" /> Lab Report
          </span>
        </a>
        <a
          href="#trace"
          className="group flex-1 rounded-xl bg-foreground px-5 py-3 text-center text-sm font-bold text-background transition-all hover:scale-105"
        >
          <span className="inline-flex items-center gap-2">
            <MapPin className="h-4 w-4 transition-transform group-hover:scale-110" /> Trace
          </span>
        </a>
      </div>
    </motion.div>
  );
}

function HazelnutChocolate() {
  const [active, setActive] = useState("overview");

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    TABS.forEach((t) => {
      const el = document.getElementById(t.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen bg-background font-sans text-foreground antialiased">
      <FloatingBlobs />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@400;500;600;700;800&display=swap');
        .font-serif { font-family: 'Fraunces', Georgia, serif; }
        .font-sans { font-family: 'Inter', system-ui, sans-serif; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { scrollbar-width: none; }
        html { scroll-behavior: smooth; scroll-padding-top: 80px; }
        @media (prefers-reduced-motion: reduce) {
          html { scroll-behavior: auto; }
          * { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; }
        }
      `}</style>

      <Hero />
      <QuickStats />
      <Tabs active={active} setActive={setActive} />
      <Overview />
      <LabReport />
      <Inside />
      <CleanLabel />
      <AIReport />
      <Traceability />
      <Footer />
      <StickyCTA />
    </div>
  );
}
