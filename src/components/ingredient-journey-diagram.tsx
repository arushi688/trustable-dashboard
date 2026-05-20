import { motion } from "framer-motion";
import { MapPin, Factory, Home, ChevronDown } from "lucide-react";

export type IngredientOrigin = {
  name: string;
  origin: string;
};

type IngredientJourneyDiagramProps = {
  ingredients: IngredientOrigin[];
  manufacturingLocation?: string;
};

// Ingredient colors for variety
const INGREDIENT_COLORS = [
  { bg: "bg-green-50", gradient: "from-green-500 to-emerald-600", text: "text-green-700" },
  { bg: "bg-blue-50", gradient: "from-blue-500 to-cyan-600", text: "text-blue-700" },
  { bg: "bg-purple-50", gradient: "from-purple-500 to-violet-600", text: "text-purple-700" },
  { bg: "bg-rose-50", gradient: "from-rose-500 to-pink-600", text: "text-rose-700" },
  { bg: "bg-amber-50", gradient: "from-amber-500 to-yellow-600", text: "text-amber-700" },
  { bg: "bg-teal-50", gradient: "from-teal-500 to-emerald-600", text: "text-teal-700" },
];

export function IngredientJourneyDiagram({
  ingredients,
  manufacturingLocation = "Delhi",
}: IngredientJourneyDiagramProps) {
  return (
    <section className="py-12 sm:py-16" id="journey">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <h3 className="font-serif text-2xl sm:text-3xl text-foreground mb-2">
          From Source to Your Table
        </h3>
        <p className="text-muted-foreground text-sm sm:text-base max-w-md mx-auto">
          Follow the journey of our ingredients — from trusted sources to your doorstep
        </p>
      </motion.div>

      {/* Desktop Layout */}
      <div className="hidden md:block">
        {/* Row 1: Ingredients */}
        <div className="flex justify-center gap-3 lg:gap-4 flex-wrap max-w-5xl mx-auto px-4">
          {ingredients.map((ingredient, index) => {
            const colorSet = INGREDIENT_COLORS[index % INGREDIENT_COLORS.length];
            return (
              <motion.div
                key={ingredient.name}
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="relative"
              >
                <div
                  className={`${colorSet.bg} rounded-xl p-4 border border-border/50 shadow-sm hover:shadow-md transition-all duration-300 text-center min-w-[130px] lg:min-w-[150px]`}
                >
                  {/* Icon */}
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className={`mx-auto mb-2 w-10 h-10 rounded-full bg-gradient-to-br ${colorSet.gradient} flex items-center justify-center shadow-md`}
                  >
                    <MapPin className="w-5 h-5 text-white" />
                  </motion.div>
                  
                  {/* Ingredient Name */}
                  <h4 className={`font-semibold text-sm mb-0.5 ${colorSet.text}`}>
                    {ingredient.name}
                  </h4>
                  
                  {/* Origin */}
                  <p className="text-muted-foreground text-xs">
                    {ingredient.origin}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Converging Lines SVG */}
        <div className="relative h-20 max-w-5xl mx-auto">
          <svg className="w-full h-full" viewBox="0 0 800 80" preserveAspectRatio="xMidYMid meet">
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgb(156, 163, 175)" stopOpacity="0.4" />
                <stop offset="100%" stopColor="rgb(245, 158, 11)" stopOpacity="0.6" />
              </linearGradient>
            </defs>
            {ingredients.map((_, index) => {
              const totalItems = ingredients.length;
              const spacing = 800 / (totalItems + 1);
              const startX = spacing * (index + 1);
              const endX = 400;
              const controlY = 40;
              
              return (
                <motion.path
                  key={index}
                  d={`M ${startX} 0 Q ${startX + (endX - startX) * 0.5} ${controlY} ${endX} 80`}
                  fill="none"
                  stroke="url(#lineGradient)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
                />
              );
            })}
          </svg>
        </div>

        {/* Row 2: Manufacturing */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex justify-center"
        >
          <div className="bg-amber-50 rounded-2xl p-6 border border-border/50 shadow-md text-center min-w-[180px]">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="mx-auto mb-3 w-14 h-14 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg"
            >
              <Factory className="w-7 h-7 text-white" />
            </motion.div>
            <h4 className="font-semibold text-foreground text-lg mb-1">
              {manufacturingLocation}
            </h4>
            <p className="text-muted-foreground text-sm">
              Manufacturing
            </p>
          </div>
        </motion.div>

        {/* Arrow Down */}
        <div className="flex justify-center py-4">
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-1"
          >
            <div className="w-0.5 h-6 bg-gradient-to-b from-amber-400 to-primary/60 rounded-full" />
            <ChevronDown className="w-5 h-5 text-primary/60" />
          </motion.div>
        </div>

        {/* Row 3: Your Place */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="flex justify-center"
        >
          <div className="bg-primary/10 rounded-2xl p-6 border border-border/50 shadow-md text-center min-w-[180px]">
            <motion.div
              whileHover={{ scale: 1.1, rotate: -5 }}
              className="mx-auto mb-3 w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg"
            >
              <Home className="w-7 h-7 text-white" />
            </motion.div>
            <h4 className="font-semibold text-foreground text-lg mb-1">
              Your Place
            </h4>
            <p className="text-muted-foreground text-sm">
              Delivered to You
            </p>
          </div>
        </motion.div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden px-4">
        {/* Ingredients Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {ingredients.map((ingredient, index) => {
            const colorSet = INGREDIENT_COLORS[index % INGREDIENT_COLORS.length];
            return (
              <motion.div
                key={ingredient.name}
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`${colorSet.bg} rounded-xl p-3 border border-border/50 shadow-sm text-center`}
              >
                <div className={`mx-auto mb-2 w-8 h-8 rounded-full bg-gradient-to-br ${colorSet.gradient} flex items-center justify-center shadow-sm`}>
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                <h4 className={`font-semibold text-xs mb-0.5 ${colorSet.text} line-clamp-1`}>
                  {ingredient.name}
                </h4>
                <p className="text-muted-foreground text-[10px] line-clamp-1">
                  {ingredient.origin}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Arrow Down */}
        <div className="flex justify-center py-3">
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center"
          >
            <div className="w-0.5 h-4 bg-gradient-to-b from-muted-foreground/40 to-amber-400 rounded-full" />
            <ChevronDown className="w-4 h-4 text-amber-500" />
          </motion.div>
        </div>

        {/* Manufacturing */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="bg-amber-50 rounded-xl p-4 border border-border/50 shadow-sm text-center mb-3"
        >
          <div className="mx-auto mb-2 w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-md">
            <Factory className="w-5 h-5 text-white" />
          </div>
          <h4 className="font-semibold text-foreground text-base mb-0.5">
            {manufacturingLocation}
          </h4>
          <p className="text-muted-foreground text-xs">
            Manufacturing
          </p>
        </motion.div>

        {/* Arrow Down */}
        <div className="flex justify-center py-3">
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center"
          >
            <div className="w-0.5 h-4 bg-gradient-to-b from-amber-400 to-primary/60 rounded-full" />
            <ChevronDown className="w-4 h-4 text-primary/60" />
          </motion.div>
        </div>

        {/* Your Place */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="bg-primary/10 rounded-xl p-4 border border-border/50 shadow-sm text-center"
        >
          <div className="mx-auto mb-2 w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-md">
            <Home className="w-5 h-5 text-white" />
          </div>
          <h4 className="font-semibold text-foreground text-base mb-0.5">
            Your Place
          </h4>
          <p className="text-muted-foreground text-xs">
            Delivered to You
          </p>
        </motion.div>
      </div>
    </section>
  );
}
