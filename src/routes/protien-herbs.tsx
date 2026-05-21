import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Leaf, Beaker, Sparkles, ShieldCheck, MapPin,
  CheckCircle2, FlaskConical, Sprout, Wheat,
  Heart, Zap, Activity, X, Globe2, Download,
  Instagram, Twitter, Facebook, Mail,
} from "lucide-react";
import labReportPdf from "@/assets/Trustable_Test_Report_Vanilla_Almond.pdf";
import { IngredientTraceabilityJourney } from "@/components/ingredient-traceability-journey";
import { IngredientJourneyDiagram } from "@/components/ingredient-journey-diagram";
import { Navbar } from "@/components/navbar";

export const Route = createFileRoute("/protien-herbs")({
  component: ProtienHerbs,
  head: () => ({
    meta: [
      { title: "Trustable — Protein & Herbs | For Women" },
      { name: "description", content: "One scoop (33g) provides 23g clean protein with herbs blend — supports better metabolism, energy, skin & hair. Vanilla Almond flavour." },
      { property: "og:title", content: "Trustable — Protein & Herbs For Women" },
      { property: "og:description", content: "33g serving = 23g clean protein, 5.5g BCAA, 0g added sugar — with Shatavari, Green Tea, Curcumin & more." },
    ],
  }),
});

const TABS = [
  { id: "lab", label: "Lab Report" },
  { id: "label", label: "Label" },
  { id: "trace", label: "Traceability" },
];

const INGREDIENTS = [
  { name: "Whey Protein Concentrate", icon: Activity, benefit: "Cold processed & ultrafiltered for high-quality protein delivery", origin: "India", details: "Ultrafiltered Whey Protein Concentrate providing a clean, easily absorbed protein source with complete amino acid profile." },
  { name: "Whey Protein Isolate", icon: Zap, benefit: "Cross flow filtered for maximum purity and absorption", origin: "India", details: "Cross Flow Filtered Whey Isolate with higher protein content and minimal lactose for better digestibility." },
  { name: "Shatavari Root Extract", icon: Sparkles, benefit: "Adaptogen supporting hormonal balance and vitality", origin: "India", details: "Shatavari Root Extract (0.94%) — a traditional Ayurvedic herb known for supporting women's hormonal health and overall wellness." },
  { name: "Flax Seed Extract", icon: Sprout, benefit: "Rich in omega-3 and supports energy production", origin: "India", details: "Flax Seed Extract (0.31%) providing plant-based omega-3 fatty acids and lignans for metabolic and energy support." },
  { name: "Green Tea Powder", icon: Leaf, benefit: "Boosts metabolism and provides natural antioxidants", origin: "India", details: "Green Tea Powder (0.22%) rich in catechins and EGCG for enhanced metabolism and cellular protection." },
  { name: "Tulsi Leaf Extract", icon: Leaf, benefit: "Adaptogenic herb supporting immunity and stress relief", origin: "India", details: "Tulsi (Holy Basil) Leaf Extract (0.16%) — revered in Ayurveda for its adaptogenic and immune-supporting properties." },
  { name: "Cinnamon Bark Extract", icon: Heart, benefit: "Supports healthy blood sugar and metabolism", origin: "India", details: "Cinnamon Bark Extract (0.09%) supporting metabolic health and providing warming, antioxidant-rich compounds." },
  { name: "Curcumin Extract", icon: Sparkles, benefit: "Powerful anti-inflammatory for hormonal balance", origin: "India", details: "Curcumin Extract (0.06%) — the active compound in turmeric, supporting hormonal balance and reducing inflammation." },
  { name: "Carica Papaya (Papain)", icon: Beaker, benefit: "Natural digestive enzyme for protein breakdown", origin: "India", details: "Carica Papaya standardised for Papain (0.30%) — a proteolytic enzyme that aids protein digestion and nutrient absorption." },
  { name: "Pineapple Stem (Bromelain)", icon: FlaskConical, benefit: "Enzyme complex supporting digestion and recovery", origin: "India", details: "Pineapple Stem standardised for Bromelain (0.30%) — supports protein digestion, reduces bloating, and aids recovery." },
  { name: "Stevia (Natural Sweetener)", icon: Leaf, benefit: "Zero-calorie natural sweetener with no blood sugar impact", origin: "India", details: "Natural Sweetener Stevia (INS 960) — a plant-based sweetener providing sweetness without calories or glycemic impact." },
];

const QUICK_STATS = [
  { label: "Calories", value: "124", icon: Zap },
  { label: "Protein", value: "23g", icon: Activity },
  { label: "BCAA", value: "5.5g", icon: Beaker },
  { label: "Added Sugar", value: "0g", icon: Leaf },
  { label: "Soy Free", value: "✓", icon: Sprout },
  { label: "Gluten Free", value: "✓", icon: Wheat },
  { label: "Non GMO", value: "✓", icon: Leaf },
];

const CLEAN = [
  "No Artificial Sweeteners", "No Preservatives", "No Added Sugar",
  "Soy Free", "Naturally Gluten Free", "Non GMO",
];

const TRACE = [
  { ingredient: "Whey Protein", origin: "Pune, Maharashtra", note: "Cold processed at GMP certified facility" },
  { ingredient: "Shatavari Root", origin: "Nasik, Maharashtra", note: "Traditional Ayurvedic sourcing from certified farms" },
  { ingredient: "Green Tea", origin: "Nilgiris, Tamil Nadu", note: "Natural powder with catechins preserved" },
  { ingredient: "Curcumin", origin: "Erode, Tamil Nadu", note: "Standardised extraction for potency" },
];

// Short intro for sidebar
const PRODUCT_INTRO = {
  name: "Protein & Herbs",
  tagline: "For Women",
  description: "Take one scoop (33g) and mix in 200ml water — provides 23g of clean protein with 6 Ayurvedic herbs for metabolism, energy, skin & hair.",
  highlights: ["33g Scoop → 23g Protein", "5.5g BCAA", "0g Added Sugar"],
};

// Label summary for sidebar
const LABEL_SUMMARY = [
  "No Artificial Sweeteners",
  "No Preservatives", 
  "Soy & Gluten Free",
  "Non GMO",
];

// Traceability origins for sidebar
const ORIGIN_NODES = [
  { ingredient: "Whey Protein", location: "Pune, Maharashtra" },
  { ingredient: "Shatavari Root", location: "Nasik, Maharashtra" },
  { ingredient: "Green Tea", location: "Nilgiris, Tamil Nadu" },
  { ingredient: "Curcumin", location: "Erode, Tamil Nadu" },
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

function ProductSidebar() {
  return (
    <aside className="hidden lg:block lg:w-72 xl:w-80 flex-shrink-0">
      <div className="sticky top-20 space-y-6 py-8">
        {/* Product Intro */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <GlassCard className="p-5">
            <div className="flex items-center gap-2 mb-2">
              <Leaf className="h-4 w-4 text-primary" />
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Product</span>
            </div>
            <h3 className="font-serif text-xl font-bold text-foreground">{PRODUCT_INTRO.name}</h3>
            <p className="text-sm text-primary font-medium">{PRODUCT_INTRO.tagline}</p>
            <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{PRODUCT_INTRO.description}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {PRODUCT_INTRO.highlights.map((h) => (
                <span key={h} className="rounded-full bg-secondary/30 px-2 py-0.5 text-[10px] font-medium text-foreground">
                  {h}
                </span>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Label Summary */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <GlassCard className="p-5">
            <div className="flex items-center gap-2 mb-3">
              <ShieldCheck className="h-4 w-4 text-secondary-foreground" />
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Label Summary</span>
            </div>
            <ul className="space-y-2">
              {LABEL_SUMMARY.map((item) => (
                <li key={item} className="flex items-center gap-2 text-xs text-foreground">
                  <CheckCircle2 className="h-3.5 w-3.5 text-secondary-foreground flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </GlassCard>
        </motion.div>

        {/* Traceability Origins */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <GlassCard className="p-5">
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="h-4 w-4 text-primary" />
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Ingredient Origins</span>
            </div>
            <ul className="space-y-3">
              {ORIGIN_NODES.map((node) => (
                <li key={node.ingredient} className="flex items-start gap-2">
                  <div className="mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                  <div>
                    <div className="text-xs font-semibold text-foreground">{node.ingredient}</div>
                    <div className="text-[10px] text-muted-foreground">{node.location}</div>
                  </div>
                </li>
              ))}
            </ul>
          </GlassCard>
        </motion.div>
      </div>
    </aside>
  );
}

function Hero() {
  return (
    <section className="relative pt-16 pb-6 sm:pt-20 sm:pb-8">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="font-serif text-3xl leading-tight tracking-tight text-foreground sm:text-4xl">
            Protein & Herbs <span className="text-primary">For Women</span>
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            23g protein · 5.5g BCAA · 6 Ayurvedic Herbs · Vanilla Almond · 907g
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function QuickStats() {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-4">
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-7">
        {QUICK_STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06, duration: 0.5 }}
          >
            <GlassCard className="group p-3 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <s.icon className="mx-auto mb-1.5 h-5 w-5 text-primary transition-colors group-hover:text-secondary-foreground" />
              </motion.div>
              <div className="text-lg font-bold text-foreground">{s.value}</div>
              <div className="mt-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">{s.label}</div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Tabs({ active, setActive }: { active: string; setActive: (s: string) => void }) {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = labReportPdf;
    link.download = "Trustable_Lab_Report_Protein_Herbs.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Navbar
      variant="product"
      tabs={TABS}
      activeTab={active}
      onTabChange={setActive}
      onDownload={handleDownload}
      productName="Protein & Herbs"
    />
  );
}

function LabReport() {
  return (
    <section id="lab" className="scroll-mt-24 py-20">
      <div className="mx-auto max-w-4xl px-6">
        <div className="mb-8">
          <p className="mb-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">Verification</p>
          <h2 className="font-serif text-4xl text-foreground sm:text-5xl">Lab Report</h2>
        </div>

        {/* Official Lab Report Document */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8"
        >
          <div className="rounded-xl border border-border bg-white shadow-sm overflow-hidden">
            {/* Report Header */}
            <div className="border-b border-border px-6 py-5 bg-gradient-to-r from-stone-50 to-white">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-1">Test Report</p>
                  <h3 className="text-lg font-bold text-foreground">Certificate of Analysis</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">Protein & Herbs — Vanilla Almond (907g)</p>
                </div>
                <div className="text-right">
                  <div className="inline-flex items-center gap-1.5 rounded-md bg-green-50 border border-green-200 px-2.5 py-1 text-xs font-semibold text-green-700">
                    <CheckCircle2 className="h-3.5 w-3.5" /> ALL TESTS PASSED
                  </div>
                </div>
              </div>
            </div>

            {/* Report Meta */}
            <div className="grid grid-cols-2 sm:grid-cols-4 border-b border-border text-xs">
              {[
                { label: "Report No.", value: "TRB/2025/PH-091" },
                { label: "Date of Analysis", value: "12 Apr 2025" },
                { label: "Lab", value: "Eurofins (NABL)" },
                { label: "Sample ID", value: "PH-BATCH-25001" },
              ].map((m) => (
                <div key={m.label} className="px-4 py-3 border-r last:border-r-0 border-border">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-0.5">{m.label}</div>
                  <div className="font-semibold text-foreground">{m.value}</div>
                </div>
              ))}
            </div>

            {/* Test Results Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-stone-50/80">
                    <th className="px-4 py-3 text-left text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">Parameter</th>
                    <th className="px-4 py-3 text-left text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">Specification</th>
                    <th className="px-4 py-3 text-left text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">Result</th>
                    <th className="px-4 py-3 text-center text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { param: "Protein Content (per 33g serving)", spec: "≥ 23g", result: "23.4g", status: "pass" },
                    { param: "BCAA Content", spec: "≥ 5.5g", result: "5.6g", status: "pass" },
                    { param: "Added Sugar", spec: "0g", result: "Not Detected", status: "pass" },
                    { param: "Lead (Pb)", spec: "< 0.5 ppm", result: "< 0.05 ppm", status: "pass" },
                    { param: "Arsenic (As)", spec: "< 0.5 ppm", result: "< 0.05 ppm", status: "pass" },
                    { param: "Mercury (Hg)", spec: "< 0.1 ppm", result: "Not Detected", status: "pass" },
                    { param: "Cadmium (Cd)", spec: "< 0.3 ppm", result: "< 0.02 ppm", status: "pass" },
                    { param: "Total Plate Count", spec: "< 10,000 CFU/g", result: "< 100 CFU/g", status: "pass" },
                    { param: "Yeast & Mould", spec: "< 100 CFU/g", result: "< 10 CFU/g", status: "pass" },
                    { param: "E. coli", spec: "Absent/g", result: "Absent", status: "pass" },
                    { param: "Salmonella", spec: "Absent/25g", result: "Absent", status: "pass" },
                    { param: "Pesticide Residues (multi-residue)", spec: "Below MRL", result: "Not Detected", status: "pass" },
                  ].map((row, i) => (
                    <tr key={row.param} className={`border-b border-border/50 ${i % 2 === 0 ? "bg-white" : "bg-stone-50/40"}`}>
                      <td className="px-4 py-2.5 font-medium text-foreground">{row.param}</td>
                      <td className="px-4 py-2.5 text-muted-foreground">{row.spec}</td>
                      <td className="px-4 py-2.5 font-medium text-foreground">{row.result}</td>
                      <td className="px-4 py-2.5 text-center">
                        <span className="inline-flex items-center gap-1 rounded-full bg-green-50 border border-green-200 px-2 py-0.5 text-[10px] font-bold uppercase text-green-700">
                          <CheckCircle2 className="h-3 w-3" /> Pass
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Report Footer */}
            <div className="border-t border-border px-6 py-4 bg-stone-50/60">
              <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-muted-foreground">
                <div className="space-y-1">
                  <p><span className="font-semibold text-foreground">Testing Laboratory:</span> Eurofins Analytical Services India Pvt. Ltd.</p>
                  <p><span className="font-semibold text-foreground">Accreditation:</span> NABL Accredited (ISO/IEC 17025:2017)</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {["FSSAI", "GMP", "NABL", "ISO 22000"].map((cert) => (
                    <span key={cert} className="rounded border border-border bg-white px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider">{cert}</span>
                  ))}
                </div>
              </div>
              <p className="mt-3 text-[10px] text-muted-foreground/70 leading-relaxed">
                This report pertains only to the sample(s) tested. Results are within FSSAI permissible limits. Natural variation of ±20% from label values is acceptable per FSSAI guidelines. Report generated from verified laboratory data.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Label() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section id="label" className="scroll-mt-24 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-primary font-semibold">Formulation & Purity</p>
          <h2 className="font-serif text-4xl text-foreground sm:text-5xl">Label</h2>
        </motion.div>

        {/* Clean badges */}
        <div className="mt-8 grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {CLEAN.map((c) => (
            <GlassCard key={c} className="flex items-center gap-2 p-3">
              <CheckCircle2 className="h-4 w-4 text-secondary-foreground flex-shrink-0" />
              <span className="text-xs font-medium">{c}</span>
            </GlassCard>
          ))}
        </div>

        {/* Ingredients grid */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {INGREDIENTS.map((ing, i) => (
            <motion.button
              key={ing.name}
              onClick={() => setOpen(i)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 6) * 0.05, duration: 0.4 }}
              whileHover={{ y: -4 }}
              className="group text-left"
            >
              <GlassCard className="h-full p-5 transition-all duration-300 hover:shadow-xl hover:border-primary/30">
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-secondary/50 to-accent/40">
                    <ing.icon className="h-5 w-5 text-secondary-foreground" />
                  </div>
                  <div className="font-semibold text-foreground group-hover:text-primary transition-colors text-sm">{ing.name}</div>
                </div>
                <div className="text-xs leading-relaxed text-muted-foreground">{ing.benefit}</div>
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
              className="relative w-full max-w-lg rounded-3xl border border-border/50 bg-card/95 p-8 shadow-2xl backdrop-blur-xl"
            >
              <button
                onClick={() => setOpen(null)}
                className="absolute right-5 top-5 rounded-full bg-muted/80 p-2 text-muted-foreground transition-all hover:bg-muted hover:text-foreground hover:rotate-90"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-secondary/50 to-accent/40">
                {(() => { const Icon = INGREDIENTS[open].icon; return <Icon className="h-6 w-6 text-secondary-foreground" />; })()}
              </div>
              <h3 className="font-serif text-2xl font-bold text-foreground">{INGREDIENTS[open].name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{INGREDIENTS[open].details}</p>
              <div className="mt-4 rounded-xl bg-gradient-to-br from-secondary/20 to-accent/20 p-4 border border-secondary/30">
                <span className="text-xs uppercase tracking-widest text-primary font-semibold">Benefit</span>
                <p className="mt-1 text-sm font-medium text-foreground">{INGREDIENTS[open].benefit}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}



function Traceability() {
  return (
    <section id="trace" className="scroll-mt-24">
      <IngredientTraceabilityJourney />
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
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">Transparent nutrition. Verified by science.</p>
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
                <CheckCircle2 className="h-3.5 w-3.5 text-secondary-foreground" /> FSSAI Licensed
              </li>
              <li className="flex items-center gap-2 transition-colors hover:text-foreground">
                <CheckCircle2 className="h-3.5 w-3.5 text-secondary-foreground" /> GMP Certified Facility
              </li>
              <li className="flex items-center gap-2 transition-colors hover:text-foreground">
                <CheckCircle2 className="h-3.5 w-3.5 text-secondary-foreground" /> Clean Label Certified
              </li>
              <li className="flex items-center gap-2 transition-colors hover:text-foreground">
                <CheckCircle2 className="h-3.5 w-3.5 text-secondary-foreground" /> Certified Pesticide Free
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
            <Leaf className="h-3.5 w-3.5" /> Nutraceutical · Not for medicinal use
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

function ProtienHerbs() {
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

      <Tabs active={active} setActive={setActive} />
      
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="flex gap-6">
          <ProductSidebar />
          <main className="flex-1 min-w-0">
            <Hero />
            <QuickStats />
            <IngredientJourneyDiagram 
              ingredients={[
                { name: "Whey Protein", origin: "Pune, Maharashtra" },
                { name: "Shatavari Root", origin: "Nasik, Maharashtra" },
                { name: "Green Tea", origin: "Nilgiris, Tamil Nadu" },
                { name: "Curcumin", origin: "Erode, Tamil Nadu" },
              ]}
              manufacturingLocation="Delhi"
            />
            <LabReport />
            <Traceability />
            <Label />
          </main>
        </div>
      </div>
      
      <Footer />
      <StickyCTA />
    </div>
  );
}
