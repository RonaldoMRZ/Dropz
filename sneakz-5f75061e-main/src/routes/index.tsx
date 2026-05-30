import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState, useEffect } from "react";
import {
  Search, Flame, Truck, ShieldCheck, CreditCard, Star,
  Phone, MessageCircle, Instagram, ChevronRight, Sparkles, Award, Crown,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SNEAKZ — Tenis Premium & Luxury" },
      { name: "description", content: "Tenis Nike, Jordan, Adidas, New Balance, Puma y línea Luxury: Louis Vuitton, Gucci, Alexander McQueen, Dior y Balenciaga. Pide por WhatsApp." },
      { property: "og:title", content: "SNEAKZ — Tenis Premium & Luxury" },
      { property: "og:description", content: "Catálogo de tenis premium y de lujo. Pedidos por WhatsApp." },
    ],
  }),
  component: Home,
});

const WHATSAPP = "528113007945";
const PHONE_DISPLAY = "+52 811 300 7945";
const wa = (msg: string) =>
  `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;

type Product = {
  id: string;
  name: string;
  brand: "Nike" | "Jordan" | "Adidas" | "New Balance" | "Puma";
  tier: "Gama Alta" | "Gama Premium" | "Edición Limitada";
  price: number;
  oldPrice?: number;
  image: string;
  hot?: boolean;
  stock?: "low" | "ok";
};

type LuxuryProduct = {
  id: string;
  name: string;
  brand: "Louis Vuitton" | "Gucci" | "Alexander McQueen" | "Dior" | "Balenciaga" | "Prada";
  price: number;
  image: string;
  drop?: string;
};

const PRODUCTS: Product[] = [
  { id: "p1",  name: "Travis Scott Low Black Phantom", brand: "Jordan", tier: "Edición Limitada", price: 1650, oldPrice: 2100, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=900", hot: true, stock: "low" },
  { id: "p2",  name: "Travis Scott Low Reverse Mocha", brand: "Jordan", tier: "Edición Limitada", price: 1650, oldPrice: 2100, image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=900", hot: true },
  { id: "p3",  name: "Jordan 4 Retro Black Cat", brand: "Jordan", tier: "Gama Alta", price: 1500, oldPrice: 1900, image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?q=80&w=900" },
  { id: "p4",  name: "Jordan 1 Mid Chicago", brand: "Jordan", tier: "Gama Alta", price: 1450, image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=900" },
  { id: "p5",  name: "Nike Dunk Low Panda", brand: "Nike", tier: "Gama Alta", price: 1350, oldPrice: 1700, image: "https://images.unsplash.com/photo-1543508282-6319a3e2621f?q=80&w=900", hot: true },
  { id: "p6",  name: "Nike Air Force 1 Triple White", brand: "Nike", tier: "Gama Alta", price: 1250, image: "https://images.unsplash.com/photo-1597248881519-db089d3744a5?q=80&w=900" },
  { id: "p7",  name: "Nike Air Max 90 OG", brand: "Nike", tier: "Gama Alta", price: 1400, image: "https://images.unsplash.com/photo-1605408499391-6368c628ef42?q=80&w=900" },
  { id: "p8",  name: "Adidas Samba OG Black", brand: "Adidas", tier: "Gama Alta", price: 1300, image: "https://images.unsplash.com/photo-1539185441755-769473a23570?q=80&w=900", stock: "low" },
  { id: "p9",  name: "Adidas Campus 00s", brand: "Adidas", tier: "Gama Alta", price: 1280, image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?q=80&w=900" },
  { id: "p10", name: "New Balance 530 Silver", brand: "New Balance", tier: "Gama Premium", price: 1550, oldPrice: 1900, image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=900", hot: true },
  { id: "p11", name: "New Balance 9060", brand: "New Balance", tier: "Gama Premium", price: 1750, image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=900" },
  { id: "p12", name: "Puma Speedcat OG", brand: "Puma", tier: "Gama Alta", price: 1180, image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=900" },
];

const LUXURY: LuxuryProduct[] = [
  { id: "l1", name: "LV Trainer Monogram Denim", brand: "Louis Vuitton", price: 4200, image: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?q=80&w=1000", drop: "Iconic" },
  { id: "l2", name: "Gucci Rhyton Logo Print", brand: "Gucci", price: 3800, image: "https://images.unsplash.com/photo-1603487742131-4160ec999306?q=80&w=1000", drop: "Bestseller" },
  { id: "l3", name: "Alexander McQueen Oversized", brand: "Alexander McQueen", price: 3500, image: "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?q=80&w=1000", drop: "Hot" },
  { id: "l4", name: "Dior B22 Technical Knit", brand: "Dior", price: 4500, image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=1000", drop: "Limited" },
  { id: "l5", name: "Balenciaga Triple S Clear Sole", brand: "Balenciaga", price: 3900, image: "https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?q=80&w=1000" },
  { id: "l6", name: "Gucci Screener GG High-Top", brand: "Gucci", price: 3600, image: "https://images.unsplash.com/photo-1518894781321-630e638d0742?q=80&w=1000" },
  { id: "l7", name: "LV Skate Sneaker White/Green", brand: "Louis Vuitton", price: 4300, image: "https://images.unsplash.com/photo-1542219550-37153d387c27?q=80&w=1000", drop: "New" },
  { id: "l8", name: "Prada America's Cup Re-Nylon", brand: "Prada", price: 3400, image: "https://images.unsplash.com/photo-1551116952-fab9e16ce6a5?q=80&w=1000" },
];

const BRANDS = ["Todos", "Nike", "Jordan", "Adidas", "New Balance", "Puma"] as const;

function Home() {
  const [brand, setBrand] = useState<(typeof BRANDS)[number]>("Todos");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchBrand = brand === "Todos" || p.brand === brand;
      const matchQ = q.trim() === "" || (p.name + " " + p.brand).toLowerCase().includes(q.toLowerCase());
      return matchBrand && matchQ;
    });
  }, [brand, q]);

  const drops = PRODUCTS.filter((p) => p.hot).slice(0, 4);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <IntroAnimation />
      <TopBar />
      <Header />
      <Hero />
      <BenefitsMarquee />
      <DropOfTheWeek drops={drops} />
      <CategoryStrip onPick={setBrand} active={brand} />
      <section id="catalogo" className="mx-auto max-w-7xl px-4 pb-24 pt-10 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-primary">Catálogo</p>
            <h2 className="font-display text-5xl leading-none text-foreground sm:text-6xl">Todos los modelos</h2>
            <p className="mt-2 text-sm text-muted-foreground">{filtered.length} pares disponibles · Envío a todo México</p>
          </div>
          <div className="relative w-full sm:w-80">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Buscar modelo o marca…"
              className="w-full rounded-full border border-border bg-secondary/60 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-primary focus:bg-secondary"
            />
          </div>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {BRANDS.map((b) => (
            <button
              key={b}
              onClick={() => setBrand(b)}
              className={`rounded-full border px-5 py-2 text-sm font-semibold transition ${
                brand === b
                  ? "border-primary bg-primary text-primary-foreground shadow-glow"
                  : "border-border bg-secondary/50 text-foreground hover:border-primary/60 hover:bg-secondary"
              }`}
            >
              {b}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-secondary/30 py-20 text-center">
            <p className="text-muted-foreground">No encontramos modelos. Intenta otra búsqueda.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((p) => <ProductCard key={p.id} p={p} />)}
          </div>
        )}
      </section>
      <LuxurySection />
      <Testimonials />
      <CTAStrip />
      <Footer />
      <FloatingWhats />
    </main>
  );
}

function IntroAnimation() {
  const [gone, setGone] = useState(false);
  const [hide, setHide] = useState(false);
  useEffect(() => {
    const t1 = setTimeout(() => setGone(true), 1900);
    const t2 = setTimeout(() => setHide(true), 2600);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);
  if (hide) return null;
  return (
    <div
      className={`fixed inset-0 z-[100] grid place-items-center bg-background transition-all duration-700 ${gone ? "opacity-0 pointer-events-none scale-110" : "opacity-100"}`}
      aria-hidden
    >
      <div className="absolute inset-0 bg-gradient-hero grain" />
      <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-primary to-transparent intro-line" />
      <div className="relative text-center">
        <div className="overflow-hidden">
          <p className="intro-tag text-[10px] uppercase tracking-[0.5em] text-primary">Premium · Luxury · Mayoreo</p>
        </div>
        <div className="mt-3 overflow-hidden">
          <h1 className="intro-title font-display text-[22vw] leading-none sm:text-[14vw] lg:text-[10rem]">
            <span className="inline-block">S</span>
            <span className="inline-block">N</span>
            <span className="inline-block">E</span>
            <span className="inline-block bg-gradient-fire bg-clip-text text-transparent">A</span>
            <span className="inline-block">K</span>
            <span className="inline-block">Z</span>
          </h1>
        </div>
        <div className="overflow-hidden">
          <p className="intro-sub mt-2 text-sm text-muted-foreground">Bienvenido al drop</p>
        </div>
      </div>
      <style>{`
        .intro-title span {
          opacity: 0;
          transform: translateY(110%);
          animation: introUp 0.7s cubic-bezier(.2,.8,.2,1) forwards;
        }
        .intro-title span:nth-child(1){animation-delay:.05s}
        .intro-title span:nth-child(2){animation-delay:.13s}
        .intro-title span:nth-child(3){animation-delay:.21s}
        .intro-title span:nth-child(4){animation-delay:.29s}
        .intro-title span:nth-child(5){animation-delay:.37s}
        .intro-title span:nth-child(6){animation-delay:.45s}
        .intro-tag { animation: introUp 0.7s ease forwards; opacity:0; transform:translateY(110%); }
        .intro-sub { animation: introUp 0.7s ease forwards; animation-delay:.7s; opacity:0; transform:translateY(110%); }
        .intro-line { transform: scaleX(0); transform-origin: center; animation: introLine 1.2s cubic-bezier(.7,0,.3,1) forwards; animation-delay:.2s; }
        @keyframes introUp { to { opacity:1; transform:translateY(0); } }
        @keyframes introLine { to { transform: scaleX(1); } }
      `}</style>
    </div>
  );
}

function TopBar() {
  return (
    <div className="bg-gradient-fire text-primary-foreground">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 text-xs font-semibold sm:px-6 lg:px-8">
        <span className="hidden items-center gap-2 sm:inline-flex"><Flame className="size-3.5" /> HOT SALE — 3x2 EN TODA LA TIENDA</span>
        <div className="flex items-center gap-4">
          <a href={`tel:+${WHATSAPP}`} className="inline-flex items-center gap-1.5 hover:opacity-90"><Phone className="size-3.5" /> {PHONE_DISPLAY}</a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:opacity-90"><Instagram className="size-3.5" /> @sneakz.mx</a>
        </div>
      </div>
    </div>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-8">
        <a href="#" className="flex items-center gap-2">
          <div className="grid size-9 place-items-center rounded-md bg-primary text-primary-foreground shadow-glow">
            <Flame className="size-5" />
          </div>
          <div className="leading-none">
            <p className="font-display text-2xl tracking-wider">SNEAKZ</p>
            <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Premium · Luxury</p>
          </div>
        </a>
        <nav className="hidden items-center gap-7 text-sm font-medium lg:flex">
          <a href="#drop" className="hover:text-primary">Drop semanal</a>
          <a href="#categorias" className="hover:text-primary">Marcas</a>
          <a href="#catalogo" className="hover:text-primary">Catálogo</a>
          <a href="#luxury" className="hover:text-primary">Luxury</a>
          <a href="#contacto" className="hover:text-primary">Contacto</a>
        </nav>
        <a
          href={wa("¡Hola SNEAKZ! Quiero hacer un pedido.")}
          target="_blank" rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-[color:var(--whats)] px-4 py-2.5 text-sm font-semibold text-background shadow-card transition hover:translate-y-[-1px]"
        >
          <MessageCircle className="size-4" /> Pedir por WhatsApp
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-hero grain">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:py-28 lg:px-8">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
            <Flame className="size-3.5" /> Hot Sale activo
          </span>
          <h1 className="mt-5 font-display text-7xl leading-[0.9] text-foreground sm:text-8xl lg:text-[8.5rem]">
            TENIS <span className="bg-gradient-fire bg-clip-text text-transparent">PREMIUM</span><br />
            AL MEJOR <span className="italic">PRECIO</span>
          </h1>
          <p className="mt-6 max-w-xl text-pretty text-base text-muted-foreground sm:text-lg">
            Los modelos más buscados y nuestra línea Luxury: Louis Vuitton, Gucci, Alexander McQueen y más. Calidad garantizada, envíos a todo México y pedidos directos por WhatsApp.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#catalogo" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-primary-foreground shadow-glow transition hover:translate-y-[-1px]">
              Ver catálogo <ChevronRight className="size-4" />
            </a>
            <a href="#luxury"
              className="inline-flex items-center gap-2 rounded-full border border-accent/60 bg-secondary/60 px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-foreground hover:border-accent">
              <Crown className="size-4" /> Línea Luxury
            </a>
          </div>
          <dl className="mt-10 grid max-w-md grid-cols-3 gap-6 border-t border-border pt-6">
            {[
              { k: "+500", v: "Modelos" },
              { k: "+10K", v: "Clientes" },
              { k: "24h", v: "Envío MX" },
            ].map((s) => (
              <div key={s.v}>
                <dt className="font-display text-3xl text-primary">{s.k}</dt>
                <dd className="text-xs uppercase tracking-widest text-muted-foreground">{s.v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="relative">
          <div className="absolute -inset-10 -z-10 rounded-full bg-primary/20 blur-3xl" />
          <div className="relative aspect-square w-full overflow-hidden rounded-[2rem] border border-border shadow-glow">
            <img
              src="https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=1400"
              alt="Tenis destacado Jordan"
              className="size-full object-cover animate-float"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background via-background/70 to-transparent p-6">
              <p className="text-xs uppercase tracking-widest text-primary">Drop de la semana</p>
              <p className="font-display text-3xl">Edición Limitada</p>
            </div>
          </div>
          <div className="absolute -bottom-6 -left-6 hidden rounded-2xl border border-border bg-card p-4 shadow-card sm:block">
            <div className="flex items-center gap-3">
              <div className="grid size-10 place-items-center rounded-full bg-[color:var(--whats)] text-background">
                <MessageCircle className="size-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Pedidos por</p>
                <p className="font-semibold">WhatsApp 24/7</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BenefitsMarquee() {
  const items = [
    { i: <Truck className="size-4" />, t: "Envío GRATIS desde 3 pares" },
    { i: <CreditCard className="size-4" />, t: "3 Meses sin intereses" },
    { i: <ShieldCheck className="size-4" />, t: "Garantía de calidad" },
    { i: <Flame className="size-4" />, t: "HOT SALE 3x2" },
    { i: <Crown className="size-4" />, t: "Línea Luxury disponible" },
    { i: <Award className="size-4" />, t: "+10,000 clientes felices" },
  ];
  const row = (
    <div className="marquee-track">
      {[...items, ...items].map((x, i) => (
        <span key={i} className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-background">
          {x.i} {x.t} <span className="text-background/60">+</span>
        </span>
      ))}
    </div>
  );
  return (
    <div className="border-y border-primary/40 bg-gradient-fire py-4">
      <div className="marquee">{row}{row}</div>
    </div>
  );
}

function DropOfTheWeek({ drops }: { drops: Product[] }) {
  return (
    <section id="drop" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mb-10 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-primary">🔥 Drop de la semana</p>
          <h2 className="mt-2 font-display text-5xl leading-none sm:text-6xl">Ediciones limitadas</h2>
        </div>
        <a href="#catalogo" className="hidden items-center gap-1 text-sm font-semibold text-primary hover:underline sm:inline-flex">
          Ver todo <ChevronRight className="size-4" />
        </a>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {drops.map((p) => <ProductCard key={p.id} p={p} featured />)}
      </div>
    </section>
  );
}

function CategoryStrip({ onPick, active }: { onPick: (b: any) => void; active: string }) {
  const cats = [
    { name: "Nike",         img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=700" },
    { name: "Jordan",       img: "https://images.unsplash.com/photo-1556906781-9a412961c28c?q=80&w=700" },
    { name: "Adidas",       img: "https://images.unsplash.com/photo-1539185441755-769473a23570?q=80&w=700" },
    { name: "New Balance",  img: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=700" },
    { name: "Puma",         img: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=700" },
  ];
  return (
    <section id="categorias" className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-end justify-between">
        <h2 className="font-display text-4xl sm:text-5xl">Compra por marca</h2>
        <p className="hidden text-sm text-muted-foreground sm:block">Toca una marca para filtrar</p>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
        {cats.map((c) => (
          <button
            key={c.name}
            onClick={() => { onPick(c.name); document.getElementById("catalogo")?.scrollIntoView({ behavior: "smooth" }); }}
            className={`group relative aspect-[4/5] overflow-hidden rounded-2xl border transition ${
              active === c.name ? "border-primary shadow-glow" : "border-border hover:border-primary/60"
            }`}
          >
            <img src={c.img} alt={c.name} className="size-full object-cover transition duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4 text-left">
              <p className="font-display text-2xl">{c.name}</p>
              <p className="text-xs text-muted-foreground">Ver modelos →</p>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

function ProductCard({ p, featured = false }: { p: Product; featured?: boolean }) {
  const msg = `¡Hola! Me interesa pedir los ${p.name} ($${p.price} MXN).`;
  return (
    <article className={`group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card transition hover:-translate-y-1 hover:border-primary/60 ${featured ? "ring-1 ring-primary/30" : ""}`}>
      <div className="relative aspect-square overflow-hidden bg-secondary">
        <img src={p.image} alt={p.name} loading="lazy" className="size-full object-cover transition duration-700 group-hover:scale-110" />
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {p.hot && (
            <span className="inline-flex items-center gap-1 rounded-full bg-primary px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-primary-foreground">
              <Flame className="size-3" /> Hot
            </span>
          )}
          {p.oldPrice && (
            <span className="rounded-full bg-foreground px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-background">
              -{Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100)}%
            </span>
          )}
        </div>
        {p.stock === "low" && (
          <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-background/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-primary backdrop-blur">
            <Sparkles className="size-3" /> Últimos pares
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between text-[10px] uppercase tracking-widest">
          <span className="text-muted-foreground">{p.brand}</span>
          <span className="text-primary">{p.tier}</span>
        </div>
        <h3 className="mt-2 line-clamp-2 text-base font-semibold leading-snug text-foreground">{p.name}</h3>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="font-display text-2xl text-foreground">${p.price.toLocaleString("es-MX")}</span>
          {p.oldPrice && <span className="text-sm text-muted-foreground line-through">${p.oldPrice.toLocaleString("es-MX")}</span>}
          <span className="text-xs text-muted-foreground">MXN</span>
        </div>
        <a
          href={wa(msg)} target="_blank" rel="noreferrer"
          className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--whats)] px-4 py-2.5 text-sm font-semibold text-background transition hover:opacity-90"
        >
          <MessageCircle className="size-4" /> Pedir por WhatsApp
        </a>
      </div>
    </article>
  );
}

function LuxurySection() {
  return (
    <section id="luxury" className="relative overflow-hidden border-y border-accent/30 bg-[oklch(0.08_0.01_60)]">
      <div className="pointer-events-none absolute inset-0 opacity-40"
        style={{ backgroundImage: "radial-gradient(ellipse at 20% 20%, oklch(0.55 0.16 70 / 0.3), transparent 55%), radial-gradient(ellipse at 80% 80%, oklch(0.45 0.12 40 / 0.25), transparent 55%)" }} />
      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col items-center text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/50 bg-accent/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-accent">
            <Crown className="size-3.5" /> Línea Luxury
          </span>
          <h2 className="mt-4 font-display text-6xl leading-none sm:text-7xl lg:text-8xl">
            <span className="bg-gradient-to-r from-[oklch(0.85_0.13_80)] via-[oklch(0.92_0.1_90)] to-[oklch(0.78_0.16_60)] bg-clip-text text-transparent">
              DESIGNER SNEAKERS
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Louis Vuitton, Gucci, Alexander McQueen, Dior, Balenciaga y Prada. Piezas exclusivas para coleccionistas — venta individual y bajo pedido.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            {["Louis Vuitton", "Gucci", "McQueen", "Dior", "Balenciaga", "Prada"].map((b) => (
              <span key={b} className="rounded-full border border-border/60 bg-secondary/40 px-3 py-1">{b}</span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {LUXURY.map((l) => <LuxuryCard key={l.id} l={l} />)}
        </div>

        <div className="mt-12 text-center">
          <a href={wa("¡Hola! Quiero información de la línea Luxury (Louis Vuitton, Gucci, McQueen).")}
             target="_blank" rel="noreferrer"
             className="inline-flex items-center gap-2 rounded-full border border-accent bg-accent/10 px-7 py-3.5 text-sm font-bold uppercase tracking-widest text-accent transition hover:bg-accent hover:text-accent-foreground">
            <Crown className="size-4" /> Solicitar catálogo Luxury
          </a>
        </div>
      </div>
    </section>
  );
}

function LuxuryCard({ l }: { l: LuxuryProduct }) {
  const msg = `¡Hola! Me interesa el modelo Luxury ${l.brand} — ${l.name} ($${l.price} MXN).`;
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-accent/20 bg-card/80 backdrop-blur transition hover:-translate-y-1 hover:border-accent/60">
      <div className="relative aspect-square overflow-hidden bg-secondary">
        <img src={l.image} alt={l.name} loading="lazy" className="size-full object-cover transition duration-700 group-hover:scale-110" />
        <div className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-accent/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-accent-foreground">
          <Crown className="size-3" /> Luxury
        </div>
        {l.drop && (
          <div className="absolute right-3 top-3 rounded-full bg-background/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-accent backdrop-blur">
            {l.drop}
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-[10px] uppercase tracking-[0.25em] text-accent">{l.brand}</p>
        <h3 className="mt-2 line-clamp-2 text-base font-semibold leading-snug text-foreground">{l.name}</h3>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="font-display text-2xl">${l.price.toLocaleString("es-MX")}</span>
          <span className="text-xs text-muted-foreground">MXN</span>
        </div>
        <a
          href={wa(msg)} target="_blank" rel="noreferrer"
          className="mt-4 inline-flex items-center justify-center gap-2 rounded-full border border-accent bg-transparent px-4 py-2.5 text-sm font-semibold text-accent transition hover:bg-accent hover:text-accent-foreground"
        >
          <MessageCircle className="size-4" /> Consultar
        </a>
      </div>
    </article>
  );
}

function Testimonials() {
  const tt = [
    { name: "Carlos R.", city: "CDMX", t: "Pedí unos Jordan y unos Gucci en el mismo envío. Calidad real, llegaron en 2 días." },
    { name: "Daniela M.", city: "Monterrey", t: "Los Jordan llegaron idénticos a la foto. El servicio por WhatsApp es muy rápido." },
    { name: "Luis F.", city: "Guadalajara", t: "La línea Luxury es lo mejor. Conseguí unos LV que ya no encontraba en ningún lado." },
  ];
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-primary">Clientes felices</p>
        <h2 className="mt-2 font-display text-5xl sm:text-6xl">Lo que dicen de nosotros</h2>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {tt.map((t) => (
          <figure key={t.name} className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <div className="flex gap-1 text-primary">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="size-4 fill-current" />)}</div>
            <blockquote className="mt-4 text-pretty text-foreground/90">"{t.t}"</blockquote>
            <figcaption className="mt-4 text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">{t.name}</span> · {t.city}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function CTAStrip() {
  return (
    <section id="contacto" className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl border border-primary/40 bg-gradient-hero p-10 text-center sm:p-16">
        <div className="absolute -right-20 -top-20 size-72 rounded-full bg-primary/30 blur-3xl" />
        <p className="text-xs uppercase tracking-[0.3em] text-primary">Listo para tu pedido</p>
        <h2 className="mx-auto mt-3 max-w-2xl text-balance font-display text-5xl leading-none sm:text-7xl">
          ¿Listo para llevarte los <span className="bg-gradient-fire bg-clip-text text-transparent">mejores tenis</span>?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          Escríbenos por WhatsApp y te ayudamos a elegir el modelo y talla perfectos.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a href={wa("¡Hola SNEAKZ! Quiero hacer un pedido.")} target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[color:var(--whats)] px-7 py-4 text-sm font-bold uppercase tracking-widest text-background shadow-glow hover:translate-y-[-1px]">
            <MessageCircle className="size-4" /> Hablar por WhatsApp
          </a>
          <a href={`tel:+${WHATSAPP}`} className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-7 py-4 text-sm font-bold uppercase tracking-widest hover:border-primary">
            <Phone className="size-4" /> Llamar
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div>
          <div className="flex items-center gap-2">
            <div className="grid size-9 place-items-center rounded-md bg-primary text-primary-foreground"><Flame className="size-5" /></div>
            <p className="font-display text-2xl tracking-wider">SNEAKZ</p>
          </div>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            Tenis premium y de lujo en México. Pedidos rápidos y atención humana.
          </p>
        </div>
        <div>
          <p className="font-display text-lg">Navegar</p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><a href="#drop" className="hover:text-primary">Drop de la semana</a></li>
            <li><a href="#categorias" className="hover:text-primary">Marcas</a></li>
            <li><a href="#catalogo" className="hover:text-primary">Catálogo</a></li>
            <li><a href="#luxury" className="hover:text-primary">Luxury</a></li>
          </ul>
        </div>
        <div>
          <p className="font-display text-lg">Contacto</p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2"><Phone className="size-4" /> {PHONE_DISPLAY}</li>
            <li className="flex items-center gap-2"><MessageCircle className="size-4" /> WhatsApp 24/7</li>
            <li className="flex items-center gap-2"><Instagram className="size-4" /> @sneakz.mx</li>
          </ul>
        </div>
        <div>
          <p className="font-display text-lg">Beneficios</p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2"><Truck className="size-4 text-primary" /> Envío gratis 3+ pares</li>
            <li className="flex items-center gap-2"><CreditCard className="size-4 text-primary" /> 3 MSI disponibles</li>
            <li className="flex items-center gap-2"><ShieldCheck className="size-4 text-primary" /> Garantía de calidad</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} SNEAKZ — Premium & Luxury. Todos los derechos reservados.
      </div>
    </footer>
  );
}

function FloatingWhats() {
  return (
    <a
      href={wa("¡Hola! Quiero hacer un pedido.")} target="_blank" rel="noreferrer"
      aria-label="Pedir por WhatsApp"
      className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-[color:var(--whats)] px-5 py-3.5 text-sm font-bold text-background shadow-glow transition hover:translate-y-[-2px]"
    >
      <MessageCircle className="size-5" /> WhatsApp
    </a>
  );
}
