import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Leaf, Beaker, Sparkles, ShieldCheck, MapPin,
  CheckCircle2, FlaskConical, Sprout, Wheat,
  Heart, Zap, Activity, X, Globe2, Download,
  Instagram, Twitter, Facebook, Mail,
} from "lucide-react";
import labReportPdf from "@/assets/Trustable_Test_Report.pdf";
import { IngredientTraceabilityJourney, CHOCO_HAZEL_WHEY_INGREDIENTS, CHOCO_HAZEL_HIGHLIGHT_STATES } from "@/components/ingredient-traceability-journey";
import { IngredientJourneyDiagram } from "@/components/ingredient-journey-diagram";
import { Navbar } from "@/components/navbar";

export const Route = createFileRoute("/hazelnut-chocolate")({
  component: AtomBeginnersWhey,
  head: () => ({
    meta: [
      { title: "Trustable — Choco-Hazel Whey Protein for Beginners" },
      { name: "description", content: "15g protein per serving, 3g BCAA, 6.9g EAA — 100% vegetarian whey protein for beginners." },
      { property: "og:title", content: "Trustable — Choco-Hazel Whey Protein for Beginners" },
      { property: "og:description", content: "15g protein, 3g BCAA, 0g added sugar — Heavy metal tested, dope free, GMP certified." },
    ],
  }),
});

const TABS = [
  { id: "lab", label: "Lab Report" },
  { id: "label", label: "Label" },
  { id: "trace", label: "Traceability" },
];

const INGREDIENTS = [
  { name: "Whey Protein Concentrate", icon: Activity, benefit: "Primary protein source for muscle building and recovery", origin: "India", details: "High-quality Whey Protein Concentrate providing a complete amino acid profile for effective muscle protein synthesis." },
  { name: "Whey Protein Isolate", icon: Zap, benefit: "Rapidly absorbed protein with higher purity", origin: "India", details: "Cross-filtered Whey Protein Isolate with minimal lactose and fat for faster absorption and better digestibility." },
  { name: "Skimmed Milk Powder", icon: Sprout, benefit: "Natural source of calcium and protein", origin: "India", details: "Skimmed Milk Powder adding creaminess while contributing additional protein and essential minerals like calcium." },
  { name: "Enzyme Blend", icon: Beaker, benefit: "Supports protein digestion and absorption", origin: "India", details: "Proprietary Enzyme Blend designed to enhance protein breakdown and nutrient absorption, reducing bloating." },
  { name: "Lecithin", icon: Heart, benefit: "Natural emulsifier for smooth mixing", origin: "India", details: "Lecithin acts as a natural emulsifier, ensuring the protein powder mixes smoothly without clumping." },
  { name: "Cocoa Powder", icon: Sparkles, benefit: "Natural chocolate flavoring with antioxidants", origin: "India", details: "Natural Cocoa Powder providing rich chocolate taste along with beneficial flavonoids and antioxidants." },
  { name: "Sucralose", icon: Leaf, benefit: "Zero-calorie sweetener with no blood sugar impact", origin: "India", details: "Sucralose is a zero-calorie sweetener that provides sweetness without affecting blood sugar levels or adding calories." },
  { name: "Nature Identical Flavours", icon: FlaskConical, benefit: "Enhanced taste profile", origin: "India", details: "Nature Identical Flavours designed to complement the cocoa and create a delicious, enjoyable protein shake experience." },
];

const QUICK_STATS = [
  { label: "Calories", value: "137", icon: Zap },
  { label: "Protein", value: "15g", icon: Activity },
  { label: "BCAA", value: "3g", icon: Beaker },
  { label: "EAA", value: "6.9g", icon: Sparkles },
  { label: "Added Sugar", value: "0g", icon: Leaf },
  { label: "Vegetarian", value: "✓", icon: Sprout },
  { label: "GMP Certified", value: "✓", icon: ShieldCheck },
];

const CLEAN = [
  "Heavy Metal Tested", "Dope Free", "GMP Certified",
  "100% Vegetarian", "No Added Sugar", "FSSAI Licensed",
];

const TRACE = [
  { ingredient: "Whey Protein Concentrate", origin: "Maharashtra, India", note: "Sourced from certified dairy facilities" },
  { ingredient: "Whey Protein Isolate", origin: "Maharashtra, India", note: "Cross-filtered at GMP certified facility" },
  { ingredient: "Cocoa Powder", origin: "Kerala, India", note: "Natural cocoa from premium sources" },
  { ingredient: "Enzyme Blend", origin: "Karnataka, India", note: "Proprietary digestive enzyme complex" },
];

// Short intro for sidebar
const PRODUCT_INTRO = {
  name: "Choco-Hazel Whey",
  tagline: "For Beginners",
  description: "15g protein per serving — heavy metal tested, dope free, and GMP certified. Perfect protein to kickstart your fitness journey.",
  highlights: ["15g Protein", "3g BCAA", "6.9g EAA"],
};

// Label summary for sidebar
const LABEL_SUMMARY = [
  "Heavy Metal Tested",
  "Dope Free",
  "100% Vegetarian",
  "GMP Certified",
];

// Traceability origins for sidebar
const ORIGIN_NODES = [
  { ingredient: "Whey Protein Concentrate", location: "Pune, Maharashtra" },
  { ingredient: "Whey Protein Isolate", location: "Mumbai, Maharashtra" },
  { ingredient: "Skimmed Milk Powder", location: "Anand, Gujarat" },
  { ingredient: "Cocoa Powder", location: "Kochi, Kerala" },
];

const AMINO_ACID_PROFILE = {
  essential: [
    { name: "L-Leucine", value: "1.5g" },
    { name: "L-Isoleucine", value: "0.7g" },
    { name: "L-Valine", value: "0.8g" },
    { name: "L-Lysine", value: "0.8g" },
    { name: "L-Threonine", value: "1.4g" },
    { name: "L-Methionine", value: "0.3g" },
    { name: "L-Phenylalanine", value: "0.4g" },
    { name: "L-Tryptophan", value: "0.4g" },
    { name: "L-Histidine", value: "0.3g" },
  ],
  nonEssential: [
    { name: "L-Arginine", value: "0.4g" },
    { name: "L-Aspartic Acid", value: "1.6g" },
    { name: "L-Cystine", value: "0.4g" },
    { name: "L-Alanine", value: "0.7g" },
    { name: "L-Glycine", value: "0.3g" },
    { name: "L-Proline", value: "0.8g" },
    { name: "L-Serine", value: "0.7g" },
    { name: "L-Tyrosine", value: "0.2g" },
    { name: "L-Glutamic Acid", value: "2.6g" },
  ],
  totals: [
    { name: "BCAA (Branched Chain)", value: "3.0g" },
    { name: "EAA (Essential)", value: "6.9g" },
  ],
};

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
              <Sprout className="h-4 w-4 text-primary" />
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
            Choco-Hazel Whey <span className="text-primary">For Beginners</span>
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            15g protein · 3g BCAA · 6.9g EAA · GMP Certified · 1kg
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
    link.download = "Trustable_Lab_Report_Choco_Hazel_Whey.pdf";
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
      productName="Choco-Hazel Whey"
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
                  <p className="text-xs text-muted-foreground mt-0.5">Choco-Hazel Whey Protein for Beginners (1kg)</p>
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
                { label: "Report No.", value: "TRB/2026/CHW-001" },
                { label: "Date of Analysis", value: "15 May 2026" },
                { label: "Lab", value: "Eurofins (NABL)" },
                { label: "FSSAI Lic.", value: "11215332000675" },
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
                    { param: "Protein Content (per 37g serving)", spec: "≥ 15g", result: "15g", status: "pass" },
                    { param: "BCAA Content", spec: "≥ 3g", result: "3.0g", status: "pass" },
                    { param: "EAA Content", spec: "≥ 6.9g", result: "6.9g", status: "pass" },
                    { param: "Added Sugar", spec: "0g", result: "Not Detected", status: "pass" },
                    { param: "Lead (Pb)", spec: "< 0.5 ppm", result: "< 0.05 ppm", status: "pass" },
                    { param: "Arsenic (As)", spec: "< 0.5 ppm", result: "< 0.05 ppm", status: "pass" },
                    { param: "Mercury (Hg)", spec: "< 0.1 ppm", result: "Not Detected", status: "pass" },
                    { param: "Cadmium (Cd)", spec: "< 0.3 ppm", result: "< 0.02 ppm", status: "pass" },
                    { param: "Total Plate Count", spec: "< 10,000 CFU/g", result: "< 100 CFU/g", status: "pass" },
                    { param: "Yeast & Mould", spec: "< 100 CFU/g", result: "< 10 CFU/g", status: "pass" },
                    { param: "E. coli", spec: "Absent/g", result: "Absent", status: "pass" },
                    { param: "Salmonella", spec: "Absent/25g", result: "Absent", status: "pass" },
                    { param: "Dope Test (WADA)", spec: "Negative", result: "Negative", status: "pass" },
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
                  {["FSSAI", "GMP", "NABL", "DOPE FREE"].map((cert) => (
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

        {/* Amino Acid Profile Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8"
        >
          <GlassCard className="p-6">
            <h3 className="font-semibold text-foreground text-lg mb-4 flex items-center gap-2">
              <Beaker className="h-5 w-5 text-primary" />
              Amino Acid Profile (per serving)
            </h3>
            
            <div className="grid gap-6 md:grid-cols-2">
              {/* Essential Amino Acids */}
              <div>
                <h4 className="text-xs uppercase tracking-wider text-primary font-semibold mb-3">Essential Amino Acids</h4>
                <div className="space-y-2">
                  {AMINO_ACID_PROFILE.essential.map((aa) => (
                    <div key={aa.name} className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">{aa.name}</span>
                      <span className="font-semibold text-foreground">{aa.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Non-Essential Amino Acids */}
              <div>
                <h4 className="text-xs uppercase tracking-wider text-secondary-foreground font-semibold mb-3">Non-Essential Amino Acids</h4>
                <div className="space-y-2">
                  {AMINO_ACID_PROFILE.nonEssential.map((aa) => (
                    <div key={aa.name} className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">{aa.name}</span>
                      <span className="font-semibold text-foreground">{aa.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Totals */}
            <div className="mt-6 pt-4 border-t border-border">
              <div className="grid grid-cols-2 gap-4">
                {AMINO_ACID_PROFILE.totals.map((total) => (
                  <div key={total.name} className="rounded-xl bg-gradient-to-br from-secondary/20 to-accent/20 p-3 text-center">
                    <div className="text-xl font-bold text-foreground">{total.value}</div>
                    <div className="text-xs text-muted-foreground">{total.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>
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
              <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
              <span className="text-xs font-medium">{c}</span>
            </GlassCard>
          ))}
        </div>

        {/* Nutrition Facts Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8"
        >
          <GlassCard className="p-6">
            <h3 className="font-semibold text-foreground text-lg mb-4 flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Nutrition Facts (per 37g serving)
            </h3>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { label: "Energy", value: "137 Kcal", rda: "7%" },
                { label: "Protein", value: "15g", rda: "28%" },
                { label: "Carbohydrate", value: "17g", rda: "-" },
                { label: "Added Sugar", value: "0g", rda: "0%" },
                { label: "Fat", value: "1g", rda: "1.5%" },
                { label: "Saturated Fat", value: "0.6g", rda: "2.7%" },
                { label: "Trans Fat", value: "0g", rda: "0%" },
              ].map((item) => (
                <div key={item.label} className="rounded-xl border border-border/50 bg-card/60 p-3">
                  <div className="text-xs text-muted-foreground">{item.label}</div>
                  <div className="text-lg font-bold text-foreground">{item.value}</div>
                  <div className="text-[10px] text-muted-foreground">RDA: {item.rda}</div>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Ingredients grid */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
              <GlassCard className="h-full p-5 transition-all duration-300 hover:shadow-xl hover:border-secondary/30">
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-secondary/50 to-accent/40">
                    <ing.icon className="h-5 w-5 text-primary" />
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
                {(() => { const Icon = INGREDIENTS[open].icon; return <Icon className="h-6 w-6 text-primary" />; })()}
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
      <IngredientTraceabilityJourney 
        ingredients={CHOCO_HAZEL_WHEY_INGREDIENTS} 
        highlightStates={CHOCO_HAZEL_HIGHLIGHT_STATES}
      />
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
            <div className="font-serif text-3xl font-bold bg-gradient-to-r from-primary to-primary/90 bg-clip-text text-transparent">Trustable</div>
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
                <CheckCircle2 className="h-3.5 w-3.5 text-primary" /> FSSAI Licensed
              </li>
              <li className="flex items-center gap-2 transition-colors hover:text-foreground">
                <CheckCircle2 className="h-3.5 w-3.5 text-primary" /> GMP Certified Facility
              </li>
              <li className="flex items-center gap-2 transition-colors hover:text-foreground">
                <CheckCircle2 className="h-3.5 w-3.5 text-primary" /> Heavy Metal Tested
              </li>
              <li className="flex items-center gap-2 transition-colors hover:text-foreground">
                <CheckCircle2 className="h-3.5 w-3.5 text-primary" /> Dope Free Certified
              </li>
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="mb-4 text-xs font-bold uppercase tracking-widest text-primary">Product Info</div>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li className="flex items-center gap-2 transition-colors hover:text-foreground">
                <Sprout className="h-3.5 w-3.5 text-primary" /> 100% Vegetarian
              </li>
              <li className="flex items-center gap-2 transition-colors hover:text-foreground">
                <Globe2 className="h-3.5 w-3.5 text-primary" /> Made in India
              </li>
              <li className="flex items-center gap-2 transition-colors hover:text-foreground">
                <Activity className="h-3.5 w-3.5 text-primary" /> 27 Servings per Container
              </li>
            </ul>
          </motion.div>
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-8 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} Trustable. All rights reserved.</span>
          <span className="inline-flex items-center gap-2 rounded-full bg-secondary/20 px-3 py-1.5 text-xs font-medium text-secondary-foreground">
            <Sprout className="h-3.5 w-3.5" /> Nutraceutical · Not for medicinal use
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
          className="group flex-1 rounded-xl bg-gradient-to-r from-primary to-primary/90 px-5 py-3 text-center text-sm font-bold text-white shadow-lg shadow-orange-500/30 transition-all hover:scale-105"
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

function AtomBeginnersWhey() {
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
                { name: "Whey Concentrate", origin: "Pune, Maharashtra" },
                { name: "Whey Isolate", origin: "Mumbai, Maharashtra" },
                { name: "Skimmed Milk", origin: "Anand, Gujarat" },
                { name: "Cocoa Powder", origin: "Kochi, Kerala" },
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
