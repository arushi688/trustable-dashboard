import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Leaf, Beaker, Sparkles, ShieldCheck, Download, MapPin, QrCode,
  CheckCircle2, FlaskConical, Brain, Sprout, Droplets, Wheat, Milk,
  Heart, Zap, Activity, Award, ChevronRight, X, Globe2, Recycle,
  Instagram, Twitter, Facebook, Mail, Star, TrendingUp,
} from "lucide-react";
import {
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  ResponsiveContainer, RadialBarChart, RadialBar, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
} from "recharts";
import productImg from "@/assets/product-front.png";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Trustable — Daily Nutrition Blend | Transparency Dashboard" },
      { name: "description", content: "Comfort-first plant-based daily nutrition with full lab, ingredient, and traceability transparency." },
      { property: "og:title", content: "Trustable — Daily Nutrition Blend" },
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
        className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-secondary/30 blur-3xl"
        animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/3 -right-32 h-[28rem] w-[28rem] rounded-full bg-accent/40 blur-3xl"
        animate={{ x: [0, -50, 0], y: [0, 60, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 left-1/4 h-80 w-80 rounded-full bg-primary/15 blur-3xl"
        animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
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
      className={`rounded-3xl border border-border/60 bg-card/70 backdrop-blur-xl shadow-[0_8px_30px_-12px_rgba(80,60,30,0.15)] ${className}`}
    >
      {children}
    </div>
  );
}

function Hero() {
  return (
    <section className="relative pt-10 pb-20 sm:pt-16">
      <Particles />
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute inset-0 -z-10 rounded-[3rem] bg-gradient-to-br from-secondary/40 via-accent/30 to-primary/10 blur-2xl" />
            <div className="relative mx-auto max-w-md overflow-hidden rounded-[2.5rem] border border-border/60 bg-card/60 p-6 shadow-2xl backdrop-blur">
              <img src={productImg} alt="Trustable Daily Nutrition Blend" className="h-auto w-full rounded-[1.5rem] object-cover" />
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-3 top-8 rounded-full bg-card/90 px-4 py-2 text-xs font-medium shadow-lg backdrop-blur"
              >
                <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5 text-secondary-foreground" /> Third-party tested</span>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/60 px-3 py-1 text-xs font-medium uppercase tracking-widest text-muted-foreground backdrop-blur">
              <Leaf className="h-3.5 w-3.5" /> Hazelnut Chocolate · 480g
            </div>
            <h1 className="font-serif text-5xl leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              All-in-One <br />
              <span className="italic text-primary">Daily Nutrition</span> <br />Blend
            </h1>
            <p className="mt-5 max-w-lg text-lg text-muted-foreground">
              Comfort-First, Plant-Based Nutrition — designed for adults who want daily nourishment that's gentle, balanced, and beautifully transparent.
            </p>

            <div className="mt-7 flex flex-wrap gap-2">
              {["15g Plant Protein", "23 Vitamins & Minerals", "0 Added Sugar", "Gentle Digestion"].map((b) => (
                <span key={b} className="rounded-full border border-border/70 bg-card/70 px-3.5 py-1.5 text-sm font-medium text-foreground backdrop-blur">
                  {b}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#lab" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition hover:scale-[1.02] hover:shadow-xl">
                <FlaskConical className="h-4 w-4" /> View Lab Report
              </a>
              <a href="#trace" className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-6 py-3 text-sm font-semibold text-foreground backdrop-blur transition hover:bg-card">
                <MapPin className="h-4 w-4" /> Trace Ingredients
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function QuickStats() {
  return (
    <section className="mx-auto max-w-7xl px-6">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
        {QUICK_STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
          >
            <GlassCard className="p-4 text-center transition hover:-translate-y-1">
              <s.icon className="mx-auto mb-2 h-5 w-5 text-primary" />
              <div className="text-xl font-bold text-foreground">{s.value}</div>
              <div className="text-xs uppercase tracking-wide text-muted-foreground">{s.label}</div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Tabs({ active, setActive }: { active: string; setActive: (s: string) => void }) {
  return (
    <div className="sticky top-0 z-40 -mx-6 mt-16 border-y border-border/60 bg-background/70 px-6 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl gap-1 overflow-x-auto py-3 scrollbar-hide">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => {
              setActive(t.id);
              document.getElementById(t.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            className={`relative whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition ${
              active === t.id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function Overview() {
  return (
    <section id="overview" className="scroll-mt-24 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">Our Story</p>
            <h2 className="font-serif text-4xl leading-tight text-foreground sm:text-5xl">
              Designed for everyday use — <span className="italic text-primary">not performance pressure.</span>
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground">
              <p>Trustable was created for adults who find traditional protein products heavy, overly sweet, or difficult to tolerate. We deliver balanced nourishment that fits naturally into everyday routines — warm, cold, or blended.</p>
              <p>Plant proteins from pea and brown rice are balanced with lotus seed (makhana) for comfort, paired with 23 vitamins and minerals, prebiotics and probiotics, and DigeZyme® for gentle digestion.</p>
              <p>Each plant-based meal saves up to <span className="font-semibold text-foreground">50 liters of water</span>. Nutrition that's better for you, and for the planet.</p>
            </div>
          </div>
          <div className="space-y-4">
            {[
              { icon: Heart, title: "Comfort-First", body: "Gentle on stomachs that struggle with whey." },
              { icon: Recycle, title: "Sustainable", body: "Plant-based, lower water and carbon footprint." },
              { icon: ShieldCheck, title: "Transparent", body: "Every batch tested. Every source traced." },
            ].map((c) => (
              <GlassCard key={c.title} className="p-5">
                <c.icon className="mb-2 h-5 w-5 text-primary" />
                <div className="font-semibold text-foreground">{c.title}</div>
                <div className="text-sm text-muted-foreground">{c.body}</div>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function LabReport() {
  const score = 94;
  const data = [{ name: "score", value: score, fill: "var(--primary)" }];
  return (
    <section id="lab" className="scroll-mt-24 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10 flex items-end justify-between flex-wrap gap-4">
          <div>
            <p className="mb-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">Verification</p>
            <h2 className="font-serif text-4xl text-foreground sm:text-5xl">Lab Report</h2>
          </div>
          <button className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background hover:opacity-90">
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
                  { d: "Aug 02", t: "Sample collected — Batch SLACH003" },
                  { d: "Aug 04", t: "Heavy metals & microbiology assays" },
                  { d: "Aug 06", t: "Protein content & macro verification" },
                  { d: "Aug 09", t: "Final report — third-party signed off" },
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
    <section id="inside" className="scroll-mt-24 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <p className="mb-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">Formulation</p>
        <h2 className="font-serif text-4xl text-foreground sm:text-5xl">What's Inside</h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">Eleven thoughtful ingredients. No fillers. Tap any card to learn more.</p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {INGREDIENTS.map((ing, i) => (
            <motion.button
              key={ing.name}
              onClick={() => setOpen(i)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 6) * 0.05 }}
              className="group text-left"
            >
              <GlassCard className="p-6 transition hover:-translate-y-1 hover:shadow-xl">
                <div className="flex items-start justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-secondary/40">
                    <ing.icon className="h-5 w-5 text-secondary-foreground" />
                  </div>
                  <span className="rounded-full border border-border/60 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                    {ing.origin}
                  </span>
                </div>
                <div className="mt-4 font-semibold text-foreground">{ing.name}</div>
                <div className="mt-1 text-sm text-muted-foreground">{ing.benefit}</div>
                <div className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-primary opacity-0 transition group-hover:opacity-100">
                  Learn more <ChevronRight className="h-3 w-3" />
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
            className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/30 p-4 backdrop-blur"
            onClick={() => setOpen(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg rounded-3xl border border-border bg-card p-8 shadow-2xl"
            >
              <button onClick={() => setOpen(null)} className="absolute right-5 top-5 text-muted-foreground hover:text-foreground">
                <X className="h-5 w-5" />
              </button>
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/40">
                {(() => { const Icon = INGREDIENTS[open].icon; return <Icon className="h-6 w-6 text-secondary-foreground" />; })()}
              </div>
              <h3 className="font-serif text-2xl text-foreground">{INGREDIENTS[open].name}</h3>
              <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">Origin · {INGREDIENTS[open].origin}</div>
              <p className="mt-4 text-sm text-muted-foreground">{INGREDIENTS[open].details}</p>
              <div className="mt-5 rounded-2xl bg-muted p-4 text-sm text-foreground">
                <span className="font-semibold">Why it's in here: </span>{INGREDIENTS[open].benefit}
              </div>
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

            <div className="mt-6 flex h-44 items-center justify-center overflow-hidden rounded-2xl border border-dashed border-border bg-gradient-to-br from-secondary/20 to-accent/20 text-sm text-muted-foreground">
              <div className="text-center">
                <Globe2 className="mx-auto mb-2 h-7 w-7" />
                Interactive sourcing map
              </div>
            </div>
          </GlassCard>

          <div className="space-y-4">
            <GlassCard className="p-6">
              <div className="mb-3 inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-muted-foreground">
                <QrCode className="h-3.5 w-3.5" /> Batch Verification
              </div>
              <div className="font-mono text-sm">Batch No. <span className="font-bold text-foreground">SLACH003</span></div>
              <div className="font-mono text-sm">Expiry <span className="font-bold text-foreground">AUG / 2027</span></div>
              <div className="mt-4 grid h-32 place-items-center rounded-xl bg-foreground text-background">
                <QrCode className="h-16 w-16" />
              </div>
              <button className="mt-4 w-full rounded-full bg-primary py-2.5 text-sm font-semibold text-primary-foreground">Verify on Blockchain</button>
            </GlassCard>

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
    <footer className="mt-20 border-t border-border bg-card/40 backdrop-blur">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="font-serif text-2xl text-foreground">Trustable</div>
            <p className="mt-2 text-sm text-muted-foreground">Comfort-first daily nutrition. Transparent by design.</p>
            <div className="mt-4 flex gap-3">
              {[Instagram, Twitter, Facebook, Mail].map((I, i) => (
                <a key={i} href="#" className="grid h-9 w-9 place-items-center rounded-full border border-border bg-background hover:bg-muted">
                  <I className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Certifications</div>
            <ul className="mt-3 space-y-1.5 text-sm">
              <li>FDA Registered Facility</li>
              <li>HACCP Certified</li>
              <li>GMP Certified</li>
              <li>Third-party Lab Tested</li>
            </ul>
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Contact</div>
            <ul className="mt-3 space-y-1.5 text-sm">
              <li>hello@trustable.com</li>
              <li>Mohali, Punjab — 160072</li>
              <li>trustable.com</li>
            </ul>
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Verify</div>
            <div className="mt-3 grid h-28 w-28 place-items-center rounded-2xl bg-foreground text-background">
              <QrCode className="h-14 w-14" />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">Scan to verify your batch.</p>
          </div>
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} Trustable. All rights reserved.</span>
          <span className="inline-flex items-center gap-1.5"><Leaf className="h-3 w-3" /> Each plant-based meal saves up to 50 L of water.</span>
        </div>
      </div>
    </footer>
  );
}

function StickyCTA() {
  return (
    <div className="fixed inset-x-4 bottom-4 z-40 lg:hidden">
      <div className="flex gap-2 rounded-full border border-border bg-card/90 p-2 shadow-2xl backdrop-blur-xl">
        <a href="#lab" className="flex-1 rounded-full bg-primary px-4 py-2.5 text-center text-sm font-semibold text-primary-foreground">Lab Report</a>
        <a href="#trace" className="flex-1 rounded-full bg-foreground px-4 py-2.5 text-center text-sm font-semibold text-background">Trace</a>
      </div>
    </div>
  );
}

function Index() {
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
    <div className="relative min-h-screen bg-background font-sans text-foreground">
      <FloatingBlobs />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@400;500;600;700&display=swap');
        .font-serif { font-family: 'Fraunces', Georgia, serif; }
        .font-sans { font-family: 'Inter', system-ui, sans-serif; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { scrollbar-width: none; }
        html { scroll-behavior: smooth; }
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
