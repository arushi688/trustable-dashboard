import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { INDIA_STATES } from "@/lib/india-states";

// Type definition for ingredient data
export type IngredientData = {
  name: string;
  origin: string;
  description: string;
  mapPosition: { x: number; y: number };
  cardPosition: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  color: string;
  delay: number;
};

// States to highlight for Protein & Herbs (Maharashtra, Tamil Nadu)
export const PROTEIN_HERBS_HIGHLIGHT_STATES = ["Maharashtra", "Tamil Nadu"];

// States to highlight for Choco-Hazel Whey (Maharashtra, Gujarat, Kerala)
export const CHOCO_HAZEL_HIGHLIGHT_STATES = ["Maharashtra", "Gujarat", "Kerala"];

// Default ingredients for Protein & Herbs product
export const PROTEIN_HERBS_INGREDIENTS: IngredientData[] = [
  {
    name: "Whey Protein",
    origin: "Pune, Maharashtra",
    description: "Cold processed at GMP certified facility",
    mapPosition: { x: 156, y: 339 }, // Pune - western Maharashtra
    cardPosition: "top-left",
    color: "#8B7355",
    delay: 0,
  },
  {
    name: "Shatavari Root",
    origin: "Nasik, Maharashtra",
    description: "Traditional Ayurvedic sourcing from certified farms",
    mapPosition: { x: 156, y: 316 }, // Nasik - northern Maharashtra
    cardPosition: "top-right",
    color: "#6B8E6B",
    delay: 0.8,
  },
  {
    name: "Green Tea",
    origin: "Nilgiris, Tamil Nadu",
    description: "Natural powder with catechins preserved",
    mapPosition: { x: 188, y: 449 }, // Nilgiris - western Tamil Nadu
    cardPosition: "bottom-left",
    color: "#4A7C59",
    delay: 1.6,
  },
  {
    name: "Curcumin",
    origin: "Erode, Tamil Nadu",
    description: "Standardised extraction for potency",
    mapPosition: { x: 200, y: 452 }, // Erode - central Tamil Nadu
    cardPosition: "bottom-right",
    color: "#C4A35A",
    delay: 2.4,
  },
];

// Ingredients for Choco-Hazel Whey Protein for Beginners
export const CHOCO_HAZEL_WHEY_INGREDIENTS: IngredientData[] = [
  {
    name: "Whey Protein Concentrate",
    origin: "Pune, Maharashtra",
    description: "Primary protein source from certified dairy facilities",
    mapPosition: { x: 156, y: 339 }, // Pune - western Maharashtra
    cardPosition: "top-left",
    color: "#8B7355",
    delay: 0,
  },
  {
    name: "Whey Protein Isolate",
    origin: "Mumbai, Maharashtra",
    description: "Cross-filtered for higher purity and absorption",
    mapPosition: { x: 145, y: 345 }, // Mumbai
    cardPosition: "top-right",
    color: "#6B8E6B",
    delay: 0.8,
  },
  {
    name: "Skimmed Milk Powder",
    origin: "Anand, Gujarat",
    description: "Premium dairy from cooperative farms",
    mapPosition: { x: 132, y: 295 }, // Anand, Gujarat
    cardPosition: "bottom-left",
    color: "#4A7C59",
    delay: 1.6,
  },
  {
    name: "Cocoa Powder",
    origin: "Kochi, Kerala",
    description: "Natural cocoa with rich antioxidants",
    mapPosition: { x: 180, y: 465 }, // Kerala
    cardPosition: "bottom-right",
    color: "#C4A35A",
    delay: 2.4,
  },
];

// States to highlight for Natural Strawberry (Maharashtra, Himachal Pradesh, Karnataka)
export const NATURAL_STRAWBERRY_HIGHLIGHT_STATES = ["Maharashtra", "Himachal Pradesh", "Karnataka"];

// Ingredients for Natural Strawberry Whey Protein
export const NATURAL_STRAWBERRY_INGREDIENTS: IngredientData[] = [
  {
    name: "Whey Protein Isolate",
    origin: "Pune, Maharashtra",
    description: "51% WPI delivering 90%+ protein by weight",
    mapPosition: { x: 156, y: 339 }, // Pune - western Maharashtra
    cardPosition: "top-left",
    color: "#E11D48",
    delay: 0,
  },
  {
    name: "Whey Protein Concentrate",
    origin: "Mumbai, Maharashtra",
    description: "42% WPC with balanced nutritional profile",
    mapPosition: { x: 145, y: 345 }, // Mumbai
    cardPosition: "top-right",
    color: "#DB2777",
    delay: 0.8,
  },
  {
    name: "Strawberry Powder",
    origin: "Kullu, Himachal Pradesh",
    description: "Natural freeze-dried strawberry (6.8%)",
    mapPosition: { x: 186, y: 182 }, // Himachal Pradesh
    cardPosition: "bottom-left",
    color: "#F43F5E",
    delay: 1.6,
  },
  {
    name: "Stevia",
    origin: "Belgaum, Karnataka",
    description: "Plant-derived natural sweetener (0.2%)",
    mapPosition: { x: 168, y: 395 }, // Karnataka
    cardPosition: "bottom-right",
    color: "#22C55E",
    delay: 2.4,
  },
];

// Manufacturing facility in Delhi
const FACILITY = { x: 193, y: 181 };

// Curved route path generator
function generateRoute(from: { x: number; y: number }, to: { x: number; y: number }, curveStrength = 0.35): string {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const cx = from.x + dx * 0.5 + dy * curveStrength;
  const cy = from.y + dy * 0.5 - dx * curveStrength;
  return `M ${from.x} ${from.y} Q ${cx} ${cy} ${to.x} ${to.y}`;
}

// --- Topographic texture lines ---
function TopoLines() {
  return (
    <g opacity="0.06">
      <motion.ellipse
        cx="155" cy="320" rx="40" ry="25"
        fill="none" stroke="#6B8E6B" strokeWidth="0.5"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.ellipse
        cx="160" cy="340" rx="30" ry="18"
        fill="none" stroke="#6B8E6B" strokeWidth="0.4"
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <motion.ellipse
        cx="195" cy="430" rx="32" ry="22"
        fill="none" stroke="#4A7C59" strokeWidth="0.5"
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      <motion.ellipse
        cx="200" cy="450" rx="26" ry="16"
        fill="none" stroke="#4A7C59" strokeWidth="0.4"
        animate={{ opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />
      <path d="M 100,260 Q 150,240 200,260 Q 250,280 280,300" fill="none" stroke="#8B7355" strokeWidth="0.3" opacity="0.5" />
      <path d="M 120,350 Q 170,330 220,350 Q 260,370 290,390" fill="none" stroke="#8B7355" strokeWidth="0.3" opacity="0.4" />
      <path d="M 160,420 Q 200,400 240,420 Q 270,440 280,460" fill="none" stroke="#4A7C59" strokeWidth="0.3" opacity="0.4" />
    </g>
  );
}

// --- Pulsing source pin ---
function SourcePin({
  x, y, color, isActive, delay, onHover, onLeave,
}: {
  x: number; y: number; color: string; isActive: boolean;
  delay: number; onHover: () => void; onLeave: () => void;
}) {
  return (
    <g onMouseEnter={onHover} onMouseLeave={onLeave} style={{ cursor: "pointer" }}>
      {/* Glow backdrop */}
      <motion.circle
        cx={x} cy={y} r={isActive ? 10 : 7}
        fill={color} opacity={isActive ? 0.25 : 0.12}
        filter="url(#softGlow)"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay, duration: 0.6, ease: "backOut" }}
        style={{ transformOrigin: `${x}px ${y}px` }}
      />
      {/* Core pin */}
      <motion.circle
        cx={x} cy={y} r={isActive ? 5.5 : 4}
        fill={color}
        stroke="#fff" strokeWidth="1.5"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: delay + 0.2, duration: 0.5, ease: "backOut" }}
        style={{ transformOrigin: `${x}px ${y}px` }}
      />
      {/* Inner dot */}
      <motion.circle
        cx={x} cy={y} r={isActive ? 2.5 : 1.8}
        fill="#fff"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ delay: delay + 0.5, duration: 2, repeat: Infinity }}
      />
    </g>
  );
}

// --- Animated route with flowing particles ---
function AnimatedRoute({
  path, color, delay, isHighlighted,
}: {
  path: string; color: string; delay: number; isHighlighted: boolean;
}) {
  return (
    <g>
      {/* Route shadow */}
      <motion.path
        d={path} fill="none" stroke={color} strokeWidth={isHighlighted ? 3 : 2}
        strokeLinecap="round" opacity={isHighlighted ? 0.15 : 0.08}
        filter="url(#softGlow)"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: delay + 0.8, duration: 2, ease: "easeInOut" }}
      />
      {/* Main route */}
      <motion.path
        d={path} fill="none" stroke={color}
        strokeWidth={isHighlighted ? 2 : 1.2}
        strokeLinecap="round"
        strokeDasharray={isHighlighted ? "none" : "4 3"}
        opacity={isHighlighted ? 0.8 : 0.45}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: isHighlighted ? 0.8 : 0.45 }}
        transition={{ delay: delay + 0.8, duration: 2, ease: "easeInOut" }}
      />
      {/* Flowing particle 1 */}
      <motion.circle
        r={isHighlighted ? 3 : 2}
        fill={color}
        filter="url(#softGlow)"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.9, 0.9, 0] }}
        transition={{ delay: delay + 2.5, duration: 4, repeat: Infinity, repeatDelay: 1.5 }}
      >
        <animateMotion dur="4s" repeatCount="indefinite" begin={`${delay + 2.5}s`} path={path} />
      </motion.circle>
      {/* Flowing particle 2 (staggered) */}
      <motion.circle
        r={isHighlighted ? 2 : 1.5}
        fill={color}
        opacity={0.6}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.7, 0.7, 0] }}
        transition={{ delay: delay + 4, duration: 4, repeat: Infinity, repeatDelay: 1.5 }}
      >
        <animateMotion dur="4s" repeatCount="indefinite" begin={`${delay + 4}s`} path={path} />
      </motion.circle>
    </g>
  );
}

// --- Flight animation ---
function FlightAnimation({
  path, delay, color, isHighlighted,
}: {
  path: string; delay: number; color: string; isHighlighted: boolean;
}) {
  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: isHighlighted ? 1 : 0.85 }}
      transition={{ delay: delay + 2.2, duration: 0.6 }}
    >
      <animateMotion
        dur="6s" repeatCount="indefinite"
        begin={`${delay + 2.2}s`} path={path} rotate="auto"
      />
      {/* Airplane icon */}
      <g transform="rotate(90)">
        {/* Fuselage */}
        <ellipse cx="0" cy="0" rx="3" ry="8" fill={color} opacity="0.95" />
        {/* Wings */}
        <path d="M-8,-1 L-2,-1 L0,-3 L2,-1 L8,-1 L8,1 L2,1 L0,3 L-2,1 L-8,1 Z" fill={color} opacity="0.85" />
        {/* Tail */}
        <path d="M-3,6 L0,5 L3,6 L3,8 L0,7 L-3,8 Z" fill={color} opacity="0.75" />
        {/* Cockpit highlight */}
        <ellipse cx="0" cy="-5" rx="1.5" ry="2" fill="#fff" opacity="0.4" />
      </g>
      {/* Trail effect */}
      <motion.line
        x1="0" y1="-12" x2="0" y2="-25"
        stroke={color} strokeWidth="1.5" strokeLinecap="round"
        opacity="0.3"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: [0, 1, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
      />
    </motion.g>
  );
}

// --- Manufacturing Facility Hub ---
function FacilityHub({ arrived }: { arrived: boolean }) {
  return (
    <g>
      {/* Radial glow */}
      <motion.circle
        cx={FACILITY.x} cy={FACILITY.y} r={20}
        fill="url(#hubGradient)"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: arrived ? 0.6 : 0.3, scale: 1 }}
        transition={{ delay: 3.5, duration: 1, ease: "backOut" }}
        style={{ transformOrigin: `${FACILITY.x}px ${FACILITY.y}px` }}
      />
      {/* Hub outer ring */}
      <motion.circle
        cx={FACILITY.x} cy={FACILITY.y} r={12}
        fill="none" stroke="#4A7C59" strokeWidth="1.5"
        opacity={arrived ? 0.7 : 0.4}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 3.5, duration: 0.6, ease: "backOut" }}
        style={{ transformOrigin: `${FACILITY.x}px ${FACILITY.y}px` }}
      />
      {/* Hub core */}
      <motion.circle
        cx={FACILITY.x} cy={FACILITY.y} r={7}
        fill="#4A7C59"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 3.7, duration: 0.5, ease: "backOut" }}
        style={{ transformOrigin: `${FACILITY.x}px ${FACILITY.y}px` }}
      />
      {/* Hub inner dot */}
      <motion.circle
        cx={FACILITY.x} cy={FACILITY.y} r={3}
        fill="#fff" opacity={0.9}
        initial={{ scale: 0 }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ delay: 3.9, duration: 2, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: `${FACILITY.x}px ${FACILITY.y}px` }}
      />
      {/* Delhi label */}
      <motion.text
        x={FACILITY.x} y={FACILITY.y - 18}
        fontSize="7" fill="#4A7C59" opacity="0.8"
        fontFamily="Inter, sans-serif" fontWeight="700" letterSpacing="0.1em"
        textAnchor="middle"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ delay: 4, duration: 0.8 }}
      >
        DELHI
      </motion.text>
      <motion.text
        x={FACILITY.x} y={FACILITY.y - 10}
        fontSize="4.5" fill="#8B7355" opacity="0.6"
        fontFamily="Inter, sans-serif" fontWeight="500" letterSpacing="0.05em"
        textAnchor="middle"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 4.2, duration: 0.8 }}
      >
        MANUFACTURING
      </motion.text>
    </g>
  );
}

// --- Particle burst ---
function ParticleBurst() {
  const particles = Array.from({ length: 16 });
  return (
    <g>
      {particles.map((_, i) => {
        const angle = (i / 16) * Math.PI * 2;
        const radius = 20 + Math.random() * 20;
        const endX = FACILITY.x + Math.cos(angle) * radius;
        const endY = FACILITY.y + Math.sin(angle) * radius;
        return (
          <motion.circle
            key={i}
            r={1 + Math.random() * 1.5}
            fill={i % 3 === 0 ? "#C4A35A" : i % 3 === 1 ? "#4A7C59" : "#6B8E6B"}
            initial={{ cx: FACILITY.x, cy: FACILITY.y, opacity: 0 }}
            animate={{
              cx: [FACILITY.x, endX],
              cy: [FACILITY.y, endY],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              delay: 5.5 + i * 0.08,
              duration: 2,
              repeat: Infinity,
              repeatDelay: 4,
              ease: "easeOut",
            }}
          />
        );
      })}
    </g>
  );
}

// --- Region labels with positions ---
const REGION_LABEL_POSITIONS: Record<string, { x: number; y: number; fill: string }> = {
  "Maharashtra": { x: 125, y: 330, fill: "#8B7355" },
  "Tamil Nadu": { x: 185, y: 465, fill: "#4A7C59" },
  "Gujarat": { x: 95, y: 270, fill: "#8B7355" },
  "Kerala": { x: 175, y: 485, fill: "#4A7C59" },
};

function RegionLabels({ highlightStates }: { highlightStates: string[] }) {
  return (
    <g className="select-none">
      {highlightStates.map((stateName, index) => {
        const position = REGION_LABEL_POSITIONS[stateName];
        if (!position) return null;
        return (
          <motion.text
            key={stateName}
            x={position.x}
            y={position.y}
            fontSize="6"
            fill={position.fill}
            opacity="0.5"
            fontFamily="Inter, sans-serif"
            fontWeight="600"
            letterSpacing="0.15em"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 2 + index * 0.5, duration: 1 }}
          >
            {stateName.toUpperCase()}
          </motion.text>
        );
      })}
    </g>
  );
}

// --- Ingredient Card (around map edges) ---
function IngredientCard({
  ingredient,
  index,
  isActive,
  position,
}: {
  ingredient: IngredientData;
  index: number;
  isActive: boolean;
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}) {
  const positionClasses = {
    "top-left": "top-6 left-4 sm:top-10 sm:left-6 lg:top-14 lg:left-4",
    "top-right": "top-6 right-4 sm:top-10 sm:right-6 lg:top-14 lg:right-4",
    "bottom-left": "bottom-20 left-4 sm:bottom-24 sm:left-6 lg:bottom-20 lg:left-4",
    "bottom-right": "bottom-20 right-4 sm:bottom-24 sm:right-6 lg:bottom-20 lg:right-4",
  };

  return (
    <motion.div
      className={`absolute z-10 hidden sm:block ${positionClasses[position]}`}
      initial={{ opacity: 0, y: 12, scale: 0.92 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: isActive ? 1.04 : 1,
      }}
      transition={{ delay: 1.5 + index * 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        className={`w-44 lg:w-52 rounded-2xl border p-3.5 lg:p-4 backdrop-blur-xl transition-all duration-500 ${
          isActive
            ? "border-primary/30 bg-card/95 shadow-xl shadow-primary/10"
            : "border-border/20 bg-card/75 shadow-md shadow-black/5"
        }`}
      >
        <div className="flex items-center gap-2 mb-1.5">
          <div
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: ingredient.color, boxShadow: `0 0 8px ${ingredient.color}40` }}
          />
          <span className="text-[11px] font-bold text-foreground tracking-tight">
            {ingredient.name}
          </span>
        </div>
        <p className="text-[10px] leading-relaxed text-muted-foreground mb-2">
          {ingredient.description}
        </p>
        <div className="flex items-center gap-1.5 pt-1.5 border-t border-border/20">
          <svg className="h-2.5 w-2.5 text-muted-foreground/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span className="text-[9px] uppercase tracking-widest text-muted-foreground/70 font-semibold">
            {ingredient.origin}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// --- Final Product Reveal ---
function FinalProductReveal({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ delay: 0.8, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 flex justify-center"
        >
          <motion.div
            className="relative inline-flex items-center gap-4 rounded-2xl border border-primary/15 bg-gradient-to-r from-card/95 via-card/90 to-card/95 px-8 py-5 backdrop-blur-xl"
            animate={{
              boxShadow: [
                "0 4px 30px -8px rgba(74, 124, 89, 0.08)",
                "0 12px 50px -10px rgba(74, 124, 89, 0.18)",
                "0 4px 30px -8px rgba(74, 124, 89, 0.08)",
              ],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.div
              className="relative h-12 w-12 rounded-xl bg-gradient-to-br from-primary/15 to-secondary/20 flex items-center justify-center"
              animate={{ rotate: [0, 2, -2, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg className="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <motion.div
                className="absolute -top-1 -right-1 h-3.5 w-3.5 rounded-full bg-green-400 border-2 border-card"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
            <div className="text-left">
              <motion.p
                className="text-sm font-bold text-foreground tracking-tight"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
              >
                Crafted with traceable ingredients
              </motion.p>
              <motion.p
                className="text-[11px] text-muted-foreground mt-0.5"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.5, duration: 0.6 }}
              >
                Every source verified · Every path documented
              </motion.p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ===== MAIN COMPONENT =====
export interface IngredientTraceabilityJourneyProps {
  ingredients?: IngredientData[];
  highlightStates?: string[];
}

export function IngredientTraceabilityJourney({ 
  ingredients = PROTEIN_HERBS_INGREDIENTS,
  highlightStates = PROTEIN_HERBS_HIGHLIGHT_STATES,
}: IngredientTraceabilityJourneyProps) {
  const [activeIngredient, setActiveIngredient] = useState<number | null>(null);
  const [arrived, setArrived] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setArrived(true), 6000);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  // Generate unique non-intersecting flight paths for each ingredient
  // Alternate curve directions and vary strengths to avoid overlapping routes
  const routeCurves = [
    { strength: -0.4, offset: 0.45 },   // curve left
    { strength: 0.5, offset: 0.5 },     // curve right
    { strength: -0.55, offset: 0.4 },   // curve left, wider arc
    { strength: 0.6, offset: 0.55 },    // curve right, wider arc
  ];

  const routes = ingredients.map((ing, index) => {
    const curve = routeCurves[index];
    const from = ing.mapPosition;
    const to = FACILITY;
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const cx = from.x + dx * curve.offset + dy * curve.strength;
    const cy = from.y + dy * curve.offset - dx * curve.strength;
    return `M ${from.x} ${from.y} Q ${cx} ${cy} ${to.x} ${to.y}`;
  });

  return (
    <section ref={sectionRef} className="relative py-20 overflow-hidden">
      {/* Warm cream ambient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/5 to-transparent" />

      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 text-center"
        >
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-primary font-semibold">
            Supply Chain Transparency
          </p>
          <h2 className="font-serif text-4xl text-foreground sm:text-5xl">
            Ingredient Journey
          </h2>
          <p className="mt-4 mx-auto max-w-lg text-sm leading-relaxed text-muted-foreground">
            Every ingredient is ethically sourced, verified, and intentionally brought together —
            trace the path from origin to your hands.
          </p>
        </motion.div>

        {/* Map Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.3, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto"
          style={{ maxWidth: "960px" }}
        >
          {/* Outer glow/shadow */}
          <div className="absolute inset-8 rounded-[40px] bg-gradient-to-br from-secondary/10 via-primary/5 to-accent/10 blur-3xl" />

          {/* Map card */}
          <div className="relative rounded-3xl border border-border/20 bg-gradient-to-br from-card/60 via-card/40 to-card/60 p-6 sm:p-10 lg:p-12 backdrop-blur-sm shadow-2xl shadow-primary/5">
            {/* Ambient breathing */}
            <motion.div
              className="absolute inset-0 rounded-3xl"
              style={{ background: "radial-gradient(ellipse at 50% 45%, rgba(74, 124, 89, 0.04) 0%, transparent 70%)" }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Ingredient cards at corners */}
            {isInView && ingredients.map((ing, i) => (
              <IngredientCard
                key={i}
                ingredient={ing}
                index={i}
                isActive={activeIngredient === i}
                position={ing.cardPosition}
              />
            ))}

            {/* SVG Map - Hero visual */}
            <svg
              viewBox="80 30 400 530"
              className="relative w-full mx-auto"
              style={{ maxWidth: "560px", minHeight: "420px" }}
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <radialGradient id="hubGradient" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#4A7C59" stopOpacity="0.5" />
                  <stop offset="60%" stopColor="#4A7C59" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#4A7C59" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="mapFillGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8B7355" stopOpacity="0.06" />
                  <stop offset="100%" stopColor="#6B8E6B" stopOpacity="0.04" />
                </linearGradient>
                <linearGradient id="highlightFillGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6B8E6B" stopOpacity="0.18" />
                  <stop offset="100%" stopColor="#4A7C59" stopOpacity="0.12" />
                </linearGradient>
                <linearGradient id="mapStrokeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6B8E6B" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#8B7355" stopOpacity="0.4" />
                </linearGradient>
                <radialGradient id="maharashtraGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#8B7355" stopOpacity="0.14" />
                  <stop offset="100%" stopColor="#8B7355" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="tamilnaduGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#4A7C59" stopOpacity="0.14" />
                  <stop offset="100%" stopColor="#4A7C59" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="gujaratGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#8B7355" stopOpacity="0.14" />
                  <stop offset="100%" stopColor="#8B7355" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="keralaGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#4A7C59" stopOpacity="0.14" />
                  <stop offset="100%" stopColor="#4A7C59" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* India states - render each state path */}
              {INDIA_STATES.map((state, index) => {
                const isHighlighted = highlightStates.includes(state.name);
                return (
                  <motion.path
                    key={state.name}
                    d={state.path}
                    fill={isHighlighted ? "url(#highlightFillGrad)" : "url(#mapFillGrad)"}
                    stroke={isHighlighted ? "#6B8E6B" : "#8B7355"}
                    strokeWidth={isHighlighted ? "0.8" : "0.4"}
                    strokeOpacity={isHighlighted ? 0.7 : 0.35}
                    strokeLinejoin="round"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 1.5, delay: index * 0.03, ease: "easeOut" }}
                  />
                );
              })}

              {/* Region highlight glows - dynamic based on highlighted states */}
              {highlightStates.includes("Maharashtra") && (
                <motion.ellipse
                  cx="160" cy="330" rx="45" ry="35"
                  fill="url(#maharashtraGlow)"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: [0.5, 0.9, 0.5] } : {}}
                  transition={{ delay: 1.5, duration: 5, repeat: Infinity, ease: "easeInOut" }}
                />
              )}

              {highlightStates.includes("Tamil Nadu") && (
                <motion.ellipse
                  cx="200" cy="450" rx="35" ry="25"
                  fill="url(#tamilnaduGlow)"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: [0.5, 0.9, 0.5] } : {}}
                  transition={{ delay: 2, duration: 5, repeat: Infinity, ease: "easeInOut" }}
                />
              )}

              {highlightStates.includes("Gujarat") && (
                <motion.ellipse
                  cx="130" cy="290" rx="40" ry="30"
                  fill="url(#gujaratGlow)"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: [0.5, 0.9, 0.5] } : {}}
                  transition={{ delay: 1.8, duration: 5, repeat: Infinity, ease: "easeInOut" }}
                />
              )}

              {highlightStates.includes("Kerala") && (
                <motion.ellipse
                  cx="185" cy="465" rx="25" ry="30"
                  fill="url(#keralaGlow)"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: [0.5, 0.9, 0.5] } : {}}
                  transition={{ delay: 2.2, duration: 5, repeat: Infinity, ease: "easeInOut" }}
                />
              )}

              {/* Topographic texture */}
              {isInView && <TopoLines />}

              {/* Region labels */}
              {isInView && <RegionLabels highlightStates={highlightStates} />}

              {/* Animated routes */}
              {isInView && routes.map((path, i) => (
                <AnimatedRoute
                  key={`route-${i}`}
                  path={path}
                  color={ingredients[i].color}
                  delay={ingredients[i].delay}
                  isHighlighted={activeIngredient === i}
                />
              ))}

              {/* Flights */}
              {isInView && routes.map((path, i) => (
                <FlightAnimation
                  key={`flight-${i}`}
                  path={path}
                  delay={ingredients[i].delay}
                  color={ingredients[i].color}
                  isHighlighted={activeIngredient === i}
                />
              ))}

              {/* Source pins */}
              {isInView && ingredients.map((ing, i) => (
                <SourcePin
                  key={`pin-${i}`}
                  x={ing.mapPosition.x}
                  y={ing.mapPosition.y}
                  color={ing.color}
                  isActive={activeIngredient === i}
                  delay={ing.delay + 0.3}
                  onHover={() => setActiveIngredient(i)}
                  onLeave={() => setActiveIngredient(null)}
                />
              ))}

              {/* Manufacturing hub */}
              {isInView && <FacilityHub arrived={arrived} />}
            </svg>

            {/* Mobile ingredient list */}
            <div className="mt-6 grid gap-2.5 sm:hidden">
              {ingredients.map((ing, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 1.5 + i * 0.2 }}
                  className={`flex items-center gap-3 rounded-xl border p-3 backdrop-blur-sm transition-all duration-300 ${
                    activeIngredient === i
                      ? "border-primary/30 bg-card/90 shadow-md"
                      : "border-border/20 bg-card/50"
                  }`}
                  onTouchStart={() => setActiveIngredient(i)}
                  onTouchEnd={() => setActiveIngredient(null)}
                >
                  <div
                    className="h-3 w-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: ing.color, boxShadow: `0 0 8px ${ing.color}50` }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-foreground">{ing.name}</p>
                    <p className="text-[10px] text-muted-foreground">{ing.origin}</p>
                  </div>
                  <svg className="h-3.5 w-3.5 text-muted-foreground/40 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Final product reveal */}
        <FinalProductReveal visible={isInView && arrived} />

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 3, duration: 0.8 }}
          className="mt-8 flex flex-wrap justify-center gap-3"
        >
          {ingredients.map((ing, i) => (
            <button
              key={i}
              className={`group flex items-center gap-2 rounded-full border px-4 py-2 text-[11px] font-medium transition-all duration-300 ${
                activeIngredient === i
                  ? "border-primary/30 bg-primary/10 text-foreground shadow-sm shadow-primary/10"
                  : "border-border/30 bg-card/50 text-muted-foreground hover:border-border/50 hover:bg-card/70 hover:text-foreground"
              }`}
              onMouseEnter={() => setActiveIngredient(i)}
              onMouseLeave={() => setActiveIngredient(null)}
            >
              <span
                className="h-2.5 w-2.5 rounded-full transition-transform duration-300 group-hover:scale-125"
                style={{ backgroundColor: ing.color, boxShadow: activeIngredient === i ? `0 0 8px ${ing.color}60` : "none" }}
              />
              {ing.name}
            </button>
          ))}
          <div className="flex items-center gap-2 rounded-full border border-border/30 bg-card/50 px-4 py-2 text-[11px] font-medium text-muted-foreground">
            <span className="h-2.5 w-2.5 rounded-full bg-[#4A7C59]" style={{ boxShadow: "0 0 6px rgba(74, 124, 89, 0.4)" }} />
            Manufacturing Hub
          </div>
        </motion.div>
      </div>
    </section>
  );
}
