import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Award, Sparkles, ShieldCheck, FlaskConical } from "lucide-react";
import productImg from "@/assets/product-front.png";
import protienHerbsImg from "@/assets/protien-herbs.png";
import chocoHazelWheyImg from "@/assets/choco-hazel.png";
import naturalStrawberryImg from "@/assets/natural-strawberry.png";
import { Navbar } from "@/components/navbar";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "Trustable — Premium Nutrition Products" },
      { name: "description", content: "Explore our range of transparent, lab-tested nutrition products with full lab reports and ingredient traceability." },
      { property: "og:title", content: "Trustable — Premium Nutrition" },
      { property: "og:description", content: "India's most transparent nutrition brand with complete traceability." },
    ],
  }),
});

// Product catalog - Add new products here
const PRODUCTS = [
  // {
  //   id: "hazelnut-chocolate",
  //   name: "Hazelnut Chocolate",
  //   slug: "/hazelnut-chocolate",
  //   description: "15g plant protein, 23 vitamins & minerals, 0 added sugar",
  //   image: productImg,
  //   calories: 110,
  //   protein: "15g",
  //   available: true,
  //   highlights: ["Complete amino profile", "Gentle digestion", "1B CFU probiotics"],
  // },
  {
    id: "protien-herbs",
    name: "Protein & Herbs",
    slug: "/protien-herbs",
    description: "23g clean protein, 5.5g BCAA, 0g added sugar — with Ayurvedic herbs for women",
    image: protienHerbsImg,
    calories: 124,
    protein: "23g",
    serving: "1 scoop (33g) in 200ml → 23g protein",
    available: true,
    highlights: ["6 Ayurvedic herbs", "Hormonal balance", "Skin & hair support"],
  },
  {
    id: "choco-hazel-whey",
    name: "Choco-Hazel Whey Protein",
    slug: "/hazelnut-chocolate",
    description: "15g protein, 3g BCAA, 6.9g EAA — 100% vegetarian whey for beginners",
    image: chocoHazelWheyImg,
    calories: 137,
    protein: "15g",
    serving: "1 scoop (37g) in 200ml → 15g protein",
    available: true,
    highlights: ["Heavy metal tested", "Dope free", "GMP certified"],
  },
  {
    id: "natural-strawberry",
    name: "Natural Strawberry",
    slug: "/natural-strawberry",
    description: "27g protein, 7g BCAA, 12.6g EAA — India's most transparent whey protein",
    image: naturalStrawberryImg,
    calories: 139,
    protein: "27g",
    serving: "1 scoop (36g) in 200-250ml → 27g protein",
    available: true,
    highlights: ["Amino spiking tested", "Only 4 ingredients", "Heavy metals tested"],
  },
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
    </div>
  );
}

function Home() {
  return (
    <div className="relative min-h-screen bg-background font-sans text-foreground antialiased">
      <FloatingBlobs />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@400;500;600;700;800&display=swap');
        .font-serif { font-family: 'Fraunces', Georgia, serif; }
        .font-sans { font-family: 'Inter', system-ui, sans-serif; }
      `}</style>

      {/* Header */}
      <Navbar variant="home" />

      {/* Hero Section */}
      <section className="relative pt-20 pb-24 sm:pt-28 sm:pb-32">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/60 bg-gradient-to-r from-card/80 to-card/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground backdrop-blur-xl shadow-sm"
            >
              <Award className="h-3.5 w-3.5 text-secondary-foreground" /> Premium Nutrition
            </motion.div>

            <h1 className="font-serif text-5xl leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-7xl xl:text-8xl">
              India's Most <br />
              <span className="bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text italic text-transparent">Transparent</span> <br />
              <span className="text-foreground/90">Nutrition Brand</span>
            </h1>

            <p className="mt-6 mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
              Premium nutrition with complete transparency. Every batch lab-tested for purity and quality. Track every ingredient from source to your door.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 border-t border-border/50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: ShieldCheck,
                title: "Lab Verified",
                description: "Every batch tested by third-party labs for heavy metals, amino spiking, and purity",
              },
              {
                icon: FlaskConical,
                title: "100% Vegetarian",
                description: "Premium nutrition sourced from quality ingredients, GMP certified",
              },
              {
                icon: Sparkles,
                title: "Full Traceability",
                description: "Track every ingredient from source to your door",
              },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl border border-border/50 bg-gradient-to-br from-card/80 to-card/60 p-8 backdrop-blur-xl hover:shadow-lg transition-shadow"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-foreground">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <h2 className="font-serif text-4xl text-foreground sm:text-5xl">Our Products</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Each product comes with complete transparency and traceability
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {PRODUCTS.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  to={product.slug}
                  className="group block rounded-3xl border border-border/50 bg-gradient-to-br from-card/80 to-card/60 overflow-hidden backdrop-blur-xl transition-all hover:shadow-2xl hover:-translate-y-2"
                >
                  <div className="relative aspect-square overflow-hidden bg-muted/20">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="h-full w-full object-cover p-8 transition-transform group-hover:scale-110"
                    />
                    {!product.available && (
                      <div className="absolute top-4 right-4 rounded-full bg-muted px-3 py-1 text-xs font-semibold">
                        Coming Soon
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <h3 className="mb-2 text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    <p className="mb-4 text-sm text-muted-foreground">{product.description}</p>
                    
                    <div className="mb-4 flex flex-wrap gap-4 text-sm">
                      <div>
                        <span className="font-semibold text-foreground">{product.calories}</span>
                        <span className="text-muted-foreground"> cal</span>
                      </div>
                      <div>
                        <span className="font-semibold text-foreground">{product.protein}</span>
                        <span className="text-muted-foreground"> protein</span>
                      </div>
                    </div>
                    
                    <div className="mb-4 text-xs text-muted-foreground">
                      <span className="font-medium text-foreground/80">Serving:</span> {product.serving}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {product.highlights.map((highlight) => (
                        <span
                          key={highlight}
                          className="rounded-full border border-border/60 bg-background/50 px-3 py-1 text-xs font-medium text-muted-foreground"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>

                    {product.available && (
                      <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                        View Details <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    )}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          
          {/* More Products Coming Soon */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-3 rounded-full border border-border/60 bg-card/60 px-6 py-3 text-sm text-muted-foreground backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-primary/60 animate-pulse" />
              More products adding soon
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative mt-16 border-t border-border bg-gradient-to-b from-card/60 to-card/80 backdrop-blur-xl">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="text-center">
            <div className="font-serif text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Trustable
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              India's most transparent nutrition brand. Lab-tested, fully traceable.
            </p>
            <div className="mt-6 flex justify-center gap-4 text-xs text-muted-foreground">
              <span>© {new Date().getFullYear()} Trustable. All rights reserved.</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
