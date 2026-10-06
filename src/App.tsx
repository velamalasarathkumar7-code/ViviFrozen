import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from 'react';
import { ArrowDown, ArrowRight, Check, ChevronDown, Fish, Menu, Minus, Plus, Search, ShieldCheck, Snowflake, Truck, Waves, X, MessageCircle, ShoppingBag, Phone, MapPin, Clock3, Send } from 'lucide-react';
import { categories, products, type Product, type ProductCategory } from './catalog';
import './index.css';

type BasketLine = { productId: string; quantity: number };
const whatsapp = (message: string, number = '9840645269') => `https://wa.me/91${number}?text=${encodeURIComponent(message)}`;
const inr = (amount: number) => `₹${amount.toLocaleString('en-IN')}`;
const phoneNumbers = { Swapna: '958151372', Vivek: '9840645269' };
const swapnaAdditionalNumber = '9581541372';
const reasons = [
  { label: 'Premium Quality', icon: ShieldCheck },
  { label: 'Hygienic Processing', icon: Check },
  { label: 'Fresh Frozen', icon: Snowflake },
  { label: 'Reliable Supply', icon: Truck },
  { label: 'Wholesale Orders', icon: Fish },
  { label: 'Competitive Pricing', icon: ShoppingBag },
] as const;

function App() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<ProductCategory | 'All products'>('All products');
  const [basket, setBasket] = useState<BasketLine[]>(() => {
    try { return JSON.parse(localStorage.getItem('vivi-order-basket') || '[]') as BasketLine[]; } catch { return []; }
  });
  const [customer, setCustomer] = useState('');
  const [basketOpen, setBasketOpen] = useState(false);
  const [selected, setSelected] = useState<Product | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [toast, setToast] = useState('');
  const [inquirySent, setInquirySent] = useState(false);

  useEffect(() => {
    localStorage.setItem('vivi-order-basket', JSON.stringify(basket));
  }, [basket]);
  useEffect(() => {
    document.title = 'VIVI Frozen Sea Foods | Supplying Quality You Can Trust';
    const description = 'Premium frozen seafood for hotels, restaurants, catering businesses and wholesale customers. Explore the VIVI Frozen Sea Foods range.';
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) { meta = document.createElement('meta'); meta.setAttribute('name', 'description'); document.head.appendChild(meta); }
    meta.setAttribute('content', description);
    const socialTitle = document.querySelector('meta[property="og:title"]') || document.createElement('meta');
    socialTitle.setAttribute('property','og:title'); socialTitle.setAttribute('content','VIVI Frozen Sea Foods | Supplying Quality You Can Trust');
    if (!socialTitle.parentNode) document.head.appendChild(socialTitle);
    const socialDescription = document.querySelector('meta[property="og:description"]') || document.createElement('meta');
    socialDescription.setAttribute('property','og:description'); socialDescription.setAttribute('content',description);
    if (!socialDescription.parentNode) document.head.appendChild(socialDescription);
    const socialType = document.querySelector('meta[property="og:type"]') || document.createElement('meta');
    socialType.setAttribute('property','og:type'); socialType.setAttribute('content','website');
    if (!socialType.parentNode) document.head.appendChild(socialType);
    const twitterCard = document.querySelector('meta[name="twitter:card"]') || document.createElement('meta');
    twitterCard.setAttribute('name','twitter:card'); twitterCard.setAttribute('content','summary_large_image');
    if (!twitterCard.parentNode) document.head.appendChild(twitterCard);
  }, []);

  const filtered = useMemo(() => products.filter(p =>
    (category === 'All products' || p.category === category) &&
    p.name.toLowerCase().includes(search.trim().toLowerCase())
  ), [category, search]);
  const basketCount = basket.length;
  const total = basket.reduce((sum, item) => {
    const product = products.find(p => p.id === item.productId);
    return sum + (product ? product.price * item.quantity : 0);
  }, 0);
  const notify = (message: string) => { setToast(message); window.setTimeout(() => setToast(''), 2400); };
  const addToBasket = (product: Product, quantity: number) => {
    setBasket(prev => {
      const found = prev.find(line => line.productId === product.id);
      return found ? prev.map(line => line.productId === product.id ? { ...line, quantity: line.quantity + quantity } : line) : [...prev, { productId: product.id, quantity }];
    });
    setSelected(null);
    notify(`${product.name} added to your order`);
  };
  const changeQuantity = (id: string, quantity: number) => setBasket(prev =>
    quantity <= 0 ? prev.filter(line => line.productId !== id) : prev.map(line => line.productId === id ? { ...line, quantity } : line)
  );
  const orderMessage = () => [
    'Hello VIVI Frozen Sea Foods, I would like to place an order.',
    `Customer: ${customer.trim()}`,
    ...basket.map(line => {
      const p = products.find(product => product.id === line.productId)!;
      return `• ${p.name} — ${line.quantity} KG × ${inr(p.price)}/KG = ${inr(p.price * line.quantity)}`;
    }),
    `Estimated total: ${inr(total)}`,
    'Please confirm availability and delivery details.',
  ].join('\n');
  const navItems = ['Home','Products','About Us','Services','Contact'];
  const scrollTo = (name: string) => {
    document.getElementById(name === 'About Us' ? 'about' : name.toLowerCase().replace(' ','-'))?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };
  const submitInquiry = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const message = [
      'Hello VIVI Frozen Sea Foods, I have a business inquiry.',
      `Name: ${data.get('name')}`, `Mobile Number: ${data.get('mobile')}`,
      `Business Name: ${data.get('business')}`, `Product: ${data.get('product')}`,
      `Quantity: ${data.get('quantity')}`, `Message: ${data.get('message') || '—'}`,
    ].join('\n');
    setInquirySent(true);
    window.open(whatsapp(message), '_blank', 'noopener,noreferrer');
  };
  return (
    <div className="min-h-[100dvh] bg-[#f4f9fa] text-[#16334d]">
      <div className="bg-[#092d4b] text-[#d9f0f3]">
        <div className="shell flex min-h-9 items-center justify-between gap-3 text-[11px] font-semibold tracking-wide">
          <span>Supplying Quality You Can Trust</span>
          <a href="tel:9840645269" className="ml-auto inline-flex items-center gap-2 hover:text-white" data-testid="link-top-phone"><Phone size={12}/> Vivek {phoneNumbers.Vivek}</a>
        </div>
      </div>
      <header className="sticky top-0 z-40 border-b border-[#deeaed] bg-[#f8fcfc]/95 backdrop-blur-xl">
        <div className="shell flex h-[76px] items-center justify-between gap-4">
          <button onClick={() => scrollTo('Home')} className="flex items-center gap-3 text-left" aria-label="VIVI Frozen Sea Foods home" data-testid="link-brand-home">
            <span className="grid h-11 w-11 place-items-center rounded-[15px] bg-[#0b3555] text-[#a8e4ec]"><Waves size={24}/></span>
            <span className="leading-tight"><span className="block font-[var(--app-font-serif)] text-[17px] font-extrabold tracking-[.11em] text-[#0d304f]">VIVI</span><span className="block text-[9px] font-bold tracking-[.17em] text-[#527083]">FROZEN SEA FOODS</span></span>
          </button>
          <nav className="hidden items-center gap-7 md:flex" aria-label="Main navigation">
            {navItems.map(item=><button key={item} onClick={()=>scrollTo(item)} className="nav-link text-[13px] font-semibold text-[#39596e] hover:text-[#0a3555]" data-testid={`link-nav-${item.toLowerCase().replaceAll(' ','-')}`}>{item}</button>)}
          </nav>
          <div className="flex items-center gap-2">
            <button onClick={()=>setBasketOpen(true)} aria-label={`Open order basket, ${basketCount} ${basketCount===1?'product':'products'}`} className="relative grid h-11 w-11 place-items-center rounded-full border border-[#d7e5e8] text-[#123b59] hover:bg-[#e7f3f5]" data-testid="button-open-basket">
              <ShoppingBag size={19}/>{basketCount>0&&<span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-[#ed684f] px-1 text-[10px] font-bold text-white">{basketCount}</span>}
            </button>
            <button onClick={()=>setBasketOpen(true)} className="hidden rounded-full bg-[#ed684f] px-5 py-3 text-[12px] font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#dc583f] sm:inline-flex" data-testid="button-order-now">Order Now <ArrowRight className="ml-2" size={15}/></button>
            <button onClick={()=>setMenuOpen(!menuOpen)} className="grid h-11 w-11 place-items-center rounded-full border border-[#d7e5e8] md:hidden" aria-label={menuOpen?'Close menu':'Open menu'} aria-expanded={menuOpen} data-testid="button-mobile-menu">{menuOpen?<X size={20}/>:<Menu size={20}/>}</button>
          </div>
        </div>
        {menuOpen&&<nav className="border-t border-[#deeaed] bg-[#f8fcfc] px-4 py-3 md:hidden" aria-label="Mobile navigation">{navItems.map(item=><button key={item} onClick={()=>scrollTo(item)} className="block w-full rounded-xl px-4 py-3 text-left text-sm font-semibold hover:bg-[#eaf4f6]" data-testid={`mobile-nav-${item.toLowerCase().replaceAll(' ','-')}`}>{item}</button>)}<button onClick={()=>{setMenuOpen(false);setBasketOpen(true)}} className="mt-1 w-full rounded-xl bg-[#ed684f] px-4 py-3 text-left text-sm font-bold text-white">Order Now</button></nav>}
      </header>

      <main>
        <section id="home" className="hero-grid relative isolate min-h-[625px] overflow-hidden text-white md:min-h-[655px]">
          <div className="shell relative z-10 flex min-h-[625px] items-center py-20 md:min-h-[655px]">
            <div className="max-w-[660px] fade-up">
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-[11px] font-bold tracking-[.15em] text-[#c7f0f2] backdrop-blur-sm"><span className="h-2 w-2 rounded-full bg-[#ef694e]"/> SUPPLYING QUALITY YOU CAN TRUST</div>
              <h1 className="font-[var(--app-font-serif)] text-[clamp(3rem,7vw,5.6rem)] font-extrabold leading-[.99] tracking-[-.055em]">Premium Frozen<br/>Seafood <span className="text-[#a7e3eb]">You Can Trust</span></h1>
              <p className="mt-6 max-w-[590px] text-base leading-7 text-[#e0f0f3] md:text-[18px]">Supplying quality frozen seafood to hotels, restaurants, catering businesses and wholesale customers.</p>
              <p className="mt-4 text-[12px] font-bold tracking-[.13em] text-[#bee7e9]">Premium Quality <span className="mx-2 text-[#ef694e]">•</span> Hygienic <span className="mx-2 text-[#ef694e]">•</span> Fresh Frozen</p>
              <div className="mt-9 flex flex-wrap gap-3"><button onClick={()=>scrollTo('Products')} className="inline-flex min-h-12 items-center rounded-full bg-[#ed684f] px-7 text-sm font-bold text-white transition hover:-translate-y-1 hover:bg-[#dc583f]" data-testid="button-hero-products">View Products <ArrowRight size={16} className="ml-2"/></button><button onClick={()=>scrollTo('Contact')} className="inline-flex min-h-12 items-center rounded-full border border-white/35 bg-white/10 px-7 text-sm font-bold text-white transition hover:bg-white/20" data-testid="button-hero-contact">Contact Us</button></div>
            </div>
            <a href="#products" className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-[10px] font-bold uppercase tracking-[.18em] text-white/65 md:flex">Explore our range <ArrowDown size={13}/></a>
          </div>
          <div className="absolute bottom-0 right-0 hidden h-24 w-[42%] rounded-tl-[100%] bg-[#b1e6eb]/10 md:block"/>
        </section>

        <section className="relative z-10 -mt-8">
          <div className="shell grid overflow-hidden rounded-2xl border border-[#dbe9eb] bg-white shadow-[0_16px_46px_rgba(12,49,72,.10)] sm:grid-cols-3">
            {[['Premium Quality','Carefully selected seafood'],['Hygienic Handling','Thoughtful product handling'],['Reliable Supply','For food businesses of all sizes']].map(([title,copy],i)=><div className={`flex items-center gap-4 px-6 py-5 ${i?'border-t border-[#e5eef0] sm:border-l sm:border-t-0':''}`} key={title}><span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#e9f5f6] text-[#117d96]">{i===0?<ShieldCheck size={20}/>:i===1?<Snowflake size={20}/>:<Truck size={20}/>}</span><span><strong className="block text-sm text-[#173b57]">{title}</strong><small className="mt-1 block text-xs text-[#6b8290]">{copy}</small></span></div>)}
          </div>
        </section>

        <section id="products" className="wave-bg py-24 md:py-28">
          <div className="shell">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div><span className="section-kicker">Our seafood selection</span><h2 className="section-title">Good things from<br className="hidden sm:block"/> cold waters.</h2><p className="max-w-xl text-sm leading-6 text-[#637d8b]">Browse the VIVI range for your kitchen, service or wholesale requirements. Prices shown per kilogram.</p></div>
              <div className="relative w-full md:max-w-[310px]"><Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#78909c]"/><input type="search" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search seafood…" className="h-12 w-full rounded-full border border-[#d8e6e9] bg-white pl-11 pr-4 text-sm outline-none transition focus:border-[#41a7b8] focus:ring-4 focus:ring-[#41a7b8]/10" aria-label="Search products" data-testid="input-product-search"/></div>
            </div>
            <div className="mt-8 flex gap-2 overflow-x-auto pb-2" role="group" aria-label="Filter products by category">
              {(['All products',...categories] as Array<ProductCategory|'All products'>).map(item=><button key={item} onClick={()=>setCategory(item)} className={`shrink-0 rounded-full border px-4 py-2.5 text-xs font-bold transition ${category===item?'border-[#0e3b5a] bg-[#0e3b5a] text-white':'border-[#d6e5e8] bg-white text-[#486576] hover:border-[#58aaba]'}`} data-testid={`filter-${item.toLowerCase().replaceAll(' ','-').replaceAll('&','and')}`}>{item}</button>)}
            </div>
            <div className="mb-4 mt-7 flex items-center justify-between text-xs text-[#718995]"><span data-testid="text-product-count">{filtered.length} products</span><span>All prices are per KG</span></div>
            {filtered.length>0?<div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{filtered.map((product,index)=><ProductCard key={product.id} product={product} index={index} onSelect={()=>setSelected(product)} onAdd={()=>setSelected(product)}/>)}</div>:<div className="rounded-3xl border border-dashed border-[#bdd2d8] bg-white px-6 py-16 text-center"><Fish size={30} className="mx-auto text-[#8bb7c0]"/><h3 className="mt-4 font-[var(--app-font-serif)] text-xl font-bold">No seafood found</h3><p className="mt-2 text-sm text-[#718995]">Try a different search or category.</p><button onClick={()=>{setSearch('');setCategory('All products')}} className="mt-5 text-sm font-bold text-[#147e96] underline underline-offset-4">Clear filters</button></div>}
          </div>
        </section>

        <section id="about" className="overflow-hidden bg-[#e7f3f5] py-24 md:py-28">
          <div className="shell grid items-center gap-14 md:grid-cols-[.95fr_1.05fr]">
            <div className="relative min-h-[360px] overflow-hidden rounded-[30px] bg-[#0b3857] md:min-h-[450px]">
              <img src="https://images.pexels.com/photos/3296398/pexels-photo-3296398.jpeg?auto=compress&cs=tinysrgb&w=1100" alt="Fresh seafood arranged for careful preparation" className="absolute inset-0 h-full w-full object-cover opacity-80" loading="lazy"/>
              <div className="absolute inset-0 bg-gradient-to-t from-[#092d4b]/90 via-transparent to-transparent"/>
              <div className="absolute bottom-7 left-7 right-7"><span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs font-bold text-white backdrop-blur"><Snowflake size={15}/> Frozen to Perfection</span><p className="mt-4 max-w-[330px] font-[var(--app-font-serif)] text-2xl font-bold leading-tight text-white">Care and consistency, from handling through cold-chain practices.</p></div>
            </div>
            <div><span className="section-kicker">A dependable seafood partner</span><h2 className="section-title">Quality made for<br/>your kind of kitchen.</h2><p className="text-[15px] leading-7 text-[#526f80]">VIVI Frozen Sea Foods is focused on supplying quality frozen seafood with an emphasis on hygiene, reliable sourcing, freshness and consistent product quality.</p><p className="mt-4 text-sm leading-7 text-[#526f80]">We serve hotels, restaurants, catering businesses and wholesale customers with premium quality, hygienic handling, fresh frozen products and reliable supply.</p>
            <div className="mt-8"><h3 className="mb-3 text-xs font-extrabold uppercase tracking-[.13em] text-[#547686]">Why Choose VIVI</h3><div className="grid grid-cols-2 gap-3 sm:grid-cols-3">{reasons.map(({label,icon:Icon})=><article key={label} className="flex min-h-[82px] items-center gap-3 rounded-2xl border border-[#d7e7e9] bg-white p-3"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#e9f5f6] text-[#168397]"><Icon size={17}/></span><span className="text-xs font-bold leading-5 text-[#234b64]">{label}</span></article>)}</div></div>
              <div className="mt-8 border-l-2 border-[#ed684f] pl-4"><h3 className="font-[var(--app-font-serif)] text-lg font-extrabold">Frozen to Perfection</h3><p className="mt-1 text-sm leading-6 text-[#607b89]">Proper freezing, hygienic handling and reliable cold-chain practices help maintain product quality from our supply to your kitchen.</p></div>
            </div>
          </div>
        </section>

        <section id="services" className="bg-[#f6fafb] py-24 md:py-28">
          <div className="shell">
            <div className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><span className="section-kicker">Supply for your service</span><h2 className="section-title">Built around the way<br/>you do business.</h2></div><p className="max-w-md text-sm leading-6 text-[#657f8d]">A considered seafood range and dependable supply for professional kitchens and wholesale buyers.</p></div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[['Hotels','Consistent frozen seafood for hotel kitchens and food service.','01'],['Restaurants','A dependable range for your menu and everyday service.','02'],['Catering','Product options to support catering orders and larger events.','03'],['Wholesale Supply','Wholesale availability for buyers sourcing frozen seafood.','04']].map(([title,copy,n])=><article key={title} className="group flex min-h-[175px] items-start gap-5 rounded-2xl border border-[#dce9eb] bg-white p-6 transition hover:-translate-y-1 hover:shadow-[0_15px_36px_rgba(15,56,81,.08)] md:p-8"><span className="font-[var(--app-font-serif)] text-3xl font-extrabold text-[#b9dce1]">{n}</span><div><h3 className="font-[var(--app-font-serif)] text-xl font-extrabold text-[#163a56]">{title}</h3><p className="mt-2 max-w-md text-sm leading-6 text-[#6a828e]">{copy}</p></div><ArrowRight className="ml-auto mt-2 shrink-0 text-[#83b9c1] transition group-hover:translate-x-1 group-hover:text-[#ed684f]" size={18}/></article>)}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#0b3555] py-16 text-white">
          <div className="absolute -right-20 -top-48 h-[500px] w-[500px] rounded-full border border-white/10"/><div className="absolute -right-2 -top-28 h-[360px] w-[360px] rounded-full border border-white/10"/>
          <div className="shell relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-center"><div><span className="text-xs font-bold uppercase tracking-[.16em] text-[#a8e4eb]">Let's talk supply</span><h2 className="mt-3 font-[var(--app-font-serif)] text-3xl font-extrabold tracking-[-.04em] md:text-4xl">Your next order starts here.</h2><p className="mt-3 text-sm text-[#d0e4e9]">Tell us what your business needs. We’ll help you find the right products.</p></div><button onClick={()=>scrollTo('Contact')} className="inline-flex min-h-12 items-center rounded-full bg-[#ed684f] px-6 text-sm font-bold text-white transition hover:-translate-y-1 hover:bg-[#dc583f]" data-testid="button-supply-inquiry">Make an inquiry <ArrowRight className="ml-2" size={16}/></button></div>
        </section>

        <section id="contact" className="wave-bg py-24 md:py-28">
          <div className="shell">
            <div className="mb-12 text-center"><span className="section-kicker">Get in touch</span><h2 className="section-title">Let’s make your next<br className="hidden sm:block"/> order straightforward.</h2><p className="mx-auto max-w-lg text-sm leading-6 text-[#647f8d]">Reach out to our team or send a business inquiry. We’ll continue the conversation on WhatsApp.</p></div>
            <div className="grid gap-8 lg:grid-cols-[.82fr_1.18fr]">
              <div className="space-y-4">
                <div className="rounded-3xl bg-[#0b3555] p-7 text-white"><span className="text-xs font-bold uppercase tracking-[.14em] text-[#a6e0e6]">Contact the team</span><div className="mt-5 space-y-4">
                  {Object.entries(phoneNumbers).map(([name,number])=><div key={name} className="flex items-center justify-between gap-3 border-b border-white/15 pb-4 last:border-0 last:pb-0"><div><small className="block text-xs text-[#b9d7dd]">{name}</small><a className="mt-1 block text-lg font-bold tracking-wide" href={`tel:${number}`} data-testid={`link-phone-${name.toLowerCase()}`}>{number}</a>{name==='Swapna'&&<a className="mt-1 block text-sm font-semibold tracking-wide text-[#c3e7eb]" href={`tel:${swapnaAdditionalNumber}`} data-testid="link-phone-swapna-additional">{swapnaAdditionalNumber}</a>}</div>{name==='Vivek'?<a href={whatsapp('Hello VIVI Frozen Sea Foods, I would like to speak with Vivek.')} target="_blank" rel="noreferrer" className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-[#a6e0e6] hover:bg-white/20" aria-label="WhatsApp Vivek" data-testid="link-whatsapp-vivek"><MessageCircle size={18}/></a>:<a href={whatsapp('Hello VIVI Frozen Sea Foods, I would like to speak with Swapna.',swapnaAdditionalNumber)} target="_blank" rel="noreferrer" className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-[#a6e0e6] hover:bg-white/20" aria-label="WhatsApp Swapna" data-testid="link-whatsapp-swapna"><MessageCircle size={18}/></a>}</div>)}
                </div></div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  <div className="min-h-[145px] rounded-2xl border border-[#d9e8eb] bg-white p-5"><MapPin className="text-[#16859b]" size={19}/><h3 className="mt-3 text-sm font-bold">Google Maps</h3><p className="mt-1 text-xs leading-5 text-[#718995]">Location details will be added here.</p><span className="mt-3 inline-block rounded-full bg-[#e9f4f5] px-3 py-1 text-[10px] font-bold text-[#397182]">Map placeholder</span></div>
                  <div className="min-h-[145px] rounded-2xl border border-[#d9e8eb] bg-white p-5"><Clock3 className="text-[#16859b]" size={19}/><h3 className="mt-3 text-sm font-bold">Business Hours</h3><p className="mt-1 text-xs leading-5 text-[#718995]">Please contact us to discuss availability.</p><span className="mt-3 inline-block rounded-full bg-[#e9f4f5] px-3 py-1 text-[10px] font-bold text-[#397182]">Hours placeholder</span></div>
                </div>
              </div>
              <form onSubmit={submitInquiry} onChange={()=>setInquirySent(false)} className="rounded-3xl border border-[#d9e8eb] bg-white p-6 shadow-[0_16px_50px_rgba(12,49,72,.06)] sm:p-8" data-testid="form-business-inquiry">
                <div className="mb-6"><h3 className="font-[var(--app-font-serif)] text-2xl font-extrabold">Business inquiry</h3><p className="mt-1 text-sm text-[#718995]">Share a few details and continue on WhatsApp.</p></div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Name"><input name="name" autoComplete="name" required placeholder="Your name" className="form-input" data-testid="input-inquiry-name"/></Field>
                  <Field label="Mobile Number"><input name="mobile" type="tel" inputMode="tel" autoComplete="tel" required pattern="[+0-9 ()-]{7,}" placeholder="Your mobile number" className="form-input" data-testid="input-inquiry-mobile"/></Field>
                  <Field label="Business Name"><input name="business" required placeholder="Hotel, restaurant or business" className="form-input" data-testid="input-inquiry-business"/></Field>
                  <Field label="Select Product"><select name="product" required defaultValue="" className="form-input" data-testid="select-inquiry-product"><option value="" disabled>Choose a product</option>{categories.map(group=><optgroup key={group} label={group}>{products.filter(p=>p.category===group).map(p=><option key={p.id} value={p.name}>{p.name}</option>)}</optgroup>)}</select><ChevronDown className="pointer-events-none absolute right-3 top-[39px] text-[#7d949d]" size={16}/></Field>
                  <Field label="Quantity"><div className="relative"><input name="quantity" required type="number" min="1" step="1" placeholder="KG required" className="form-input pr-12" data-testid="input-inquiry-quantity"/><span className="pointer-events-none absolute right-4 top-3 text-xs font-bold text-[#75909d]">KG</span></div></Field>
                  <Field label="Message (optional)"><input name="message" placeholder="Anything else we should know?" className="form-input" data-testid="input-inquiry-message"/></Field>
                </div>
                <button type="submit" className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#0c785f] px-6 text-sm font-bold text-white transition hover:bg-[#09654f]" data-testid="button-submit-inquiry"><Send size={16} className="mr-2"/>{inquirySent?'Continue on WhatsApp':'Send inquiry on WhatsApp'} <ArrowRight size={15} className="ml-2"/></button>
                <p className="mt-3 text-center text-[11px] leading-5 text-[#80939b]">This opens a WhatsApp message to Vivek. Your inquiry is not submitted on this website.</p>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#082b47] text-[#d6e9ed]">
        <div className="shell grid gap-10 py-12 md:grid-cols-[1.4fr_1fr_1fr] md:py-14">
          <div><div className="flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-[15px] bg-white/10 text-[#a8e4eb]"><Waves size={23}/></span><span className="font-[var(--app-font-serif)] text-sm font-extrabold tracking-[.13em]">VIVI FROZEN SEA FOODS</span></div><p className="mt-4 text-sm text-[#bad1d7]">Hotel • Restaurant • Catering • Wholesale Supply</p><p className="mt-2 text-sm font-bold text-white">Supplying Quality You Can Trust</p></div>
          <div><h3 className="text-xs font-extrabold uppercase tracking-[.15em] text-[#91cbd2]">Explore</h3><div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 text-sm">{['Home','Products','About Us','Services','Contact'].map(name=><button key={name} onClick={()=>scrollTo(name)} className="text-left text-[#d6e9ed] hover:text-white" data-testid={`footer-nav-${name.toLowerCase().replaceAll(' ','-')}`}>{name}</button>)}</div></div>
          <div><h3 className="text-xs font-extrabold uppercase tracking-[.15em] text-[#91cbd2]">Talk to us</h3><a href="tel:9840645269" className="mt-4 block text-sm hover:text-white">Vivek · {phoneNumbers.Vivek}</a><a href="tel:958151372" className="mt-2 block text-sm hover:text-white">Swapna · {phoneNumbers.Swapna}</a><a href={`tel:${swapnaAdditionalNumber}`} className="mt-2 block text-sm hover:text-white">Swapna · {swapnaAdditionalNumber}</a><p className="mt-5 text-[11px] leading-5 text-[#9dbbc4]">Legal information pages have not been published.</p><div className="mt-3 flex gap-4 text-xs text-[#d6e9ed]"><button onClick={()=>notify('Privacy Policy is a placeholder. No policy page is published.')} className="underline underline-offset-2" data-testid="button-privacy-placeholder">Privacy Policy</button><button onClick={()=>notify('Terms is a placeholder. No terms page is published.')} className="underline underline-offset-2" data-testid="button-terms-placeholder">Terms</button></div></div>
        </div>
          <div className="border-t border-white/10"><div className="shell flex flex-col justify-between gap-2 py-4 text-[11px] text-[#9dbbc4] sm:flex-row"><span>© {new Date().getFullYear()} VIVI Frozen Sea Foods</span><span>Supplying Quality You Can Trust</span></div></div>
      </footer>
      <a href={whatsapp('Hello VIVI Frozen Sea Foods, I would like to make an inquiry.')} target="_blank" rel="noreferrer" className="fixed bottom-5 right-4 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#0b8668] text-white shadow-[0_9px_30px_rgba(8,63,53,.3)] transition hover:-translate-y-1 md:hidden" aria-label="Chat with VIVI on WhatsApp" data-testid="button-floating-whatsapp"><MessageCircle size={25}/></a>

      {selected&&<ProductDialog product={selected} onClose={()=>setSelected(null)} onAdd={(quantity)=>addToBasket(selected,quantity)}/>}
      {basketOpen&&<BasketDialog basket={basket} customer={customer} setCustomer={setCustomer} total={total} onClose={()=>setBasketOpen(false)} onQuantity={changeQuantity} onOrder={()=>{if(!basket.length)return;if(!customer.trim()){notify('Enter your name to continue the order.');return;}window.open(whatsapp(orderMessage()),'_blank','noopener,noreferrer')}}/>}
      {toast&&<div role="status" className="fixed bottom-5 left-1/2 z-[70] -translate-x-1/2 rounded-full bg-[#103d58] px-5 py-3 text-sm font-semibold text-white shadow-xl" data-testid="status-toast">{toast}</div>}
    </div>
  );
}


function ImageSlider({images,alt,eager,className=''}:{images:string[];alt:string;eager?:boolean;className?:string}) {
  const [i,setI]=useState(0);
  const [failed,setFailed]=useState(false);
  const [startX,setStartX]=useState<number|null>(null);
  const n=images.length;
  const go=(d:number)=>setI((i+d+n)%n);
  if(failed) return <div className="absolute inset-0 bg-[linear-gradient(135deg,#d6edf0,#94cbd3)]"/>;
  return <div className={`absolute inset-0 ${className}`} onTouchStart={e=>setStartX(e.touches[0].clientX)} onTouchEnd={e=>{if(startX===null||n<2)return;const dx=e.changedTouches[0].clientX-startX;if(Math.abs(dx)>40)go(dx<0?1:-1);setStartX(null)}}>
    <img src={images[i]} alt={alt} className="product-photo h-full w-full object-cover" loading={eager?'eager':'lazy'} onError={()=>setFailed(true)}/>
    {n>1&&<>
      <button type="button" aria-label="Previous photo" onClick={e=>{e.stopPropagation();go(-1)}} className="absolute left-2 top-1/2 z-10 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-[#12405c] shadow"><ArrowRight size={14} className="rotate-180"/></button>
      <button type="button" aria-label="Next photo" onClick={e=>{e.stopPropagation();go(1)}} className="absolute right-2 top-1/2 z-10 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-[#12405c] shadow"><ArrowRight size={14}/></button>
      <div className="absolute bottom-3 left-3 z-10 flex gap-1.5">{images.map((_,k)=><span key={k} className={`h-1.5 rounded-full transition-all ${k===i?'w-4 bg-white':'w-1.5 bg-white/60'}`}/>)}</div>
    </>}
  </div>;
}

function ProductCard({product,index,onSelect,onAdd}:{product:Product;index:number;onSelect:()=>void;onAdd:()=>void}) {
  return <article className="product-card group overflow-hidden rounded-2xl border border-[#dce9eb] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_42px_rgba(12,49,72,.11)]" data-testid={`card-product-${product.id}`}>
    <div role="button" tabIndex={0} onClick={onSelect} onKeyDown={e=>{if(e.key==='Enter')onSelect()}} className="relative block h-[190px] w-full cursor-pointer overflow-hidden bg-[#e4f0f2] text-left" aria-label={`View ${product.name} details`} data-testid={`button-details-${product.id}`}>
      <ImageSlider images={product.images} alt={`${product.name} seafood product`} eager={index<=4}/>
      <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-bold text-[#28516a] shadow-sm">{product.category==='Prawn Category'?'Prawns':product.category==='Fish Category'?'Fish':'Seafood'}</span>
      <span className="absolute bottom-3 right-3 grid h-9 w-9 place-items-center rounded-full bg-white text-[#12405c] shadow-sm transition group-hover:bg-[#ed684f] group-hover:text-white"><ArrowRight size={16}/></span>
    </div>
    <div className="p-4"><button onClick={onSelect} className="min-h-[42px] text-left font-[var(--app-font-serif)] text-[15px] font-extrabold leading-5 text-[#153b57] hover:text-[#157d95]" data-testid={`text-product-name-${product.id}`}>{product.name}</button>
      <div className="mt-3 flex items-end justify-between gap-2"><div><span className="text-[10px] font-semibold uppercase tracking-[.08em] text-[#879ba4]">Price / KG</span><p className="mt-0.5 text-lg font-extrabold text-[#123b58]" data-testid={`text-price-${product.id}`}>{inr(product.price)}<span className="ml-1 text-[11px] font-semibold text-[#77909c]">/ kg</span></p></div><button onClick={onAdd} className="inline-flex min-h-10 shrink-0 items-center gap-1.5 rounded-full bg-[#e8f4f5] px-3 text-xs font-bold text-[#0f657c] transition hover:bg-[#0c3b5b] hover:text-white" aria-label={`Add ${product.name} to order`} data-testid={`button-add-${product.id}`}><Plus size={15}/><span>Add to Order</span></button></div>
    </div>
  </article>;
}

function Field({label,children}:{label:string;children:ReactNode}) {
  return <label className="relative block"><span className="mb-1.5 block text-xs font-bold text-[#395a6d]">{label}</span>{children}</label>;
}

function ProductDialog({product,onClose,onAdd}:{product:Product;onClose:()=>void;onAdd:(quantity:number)=>void}) {
  const [quantity,setQuantity]=useState(1);
  useEffect(()=>{const onKey=(e:KeyboardEvent)=>{if(e.key==='Escape')onClose()};window.addEventListener('keydown',onKey);return()=>window.removeEventListener('keydown',onKey)},[onClose]);
  return <div className="dialog-backdrop fixed inset-0 z-[60] flex items-center justify-center bg-[#06253c]/65 p-4 backdrop-blur-sm" onMouseDown={e=>{if(e.target===e.currentTarget)onClose()}} role="presentation">
    <section role="dialog" aria-modal="true" aria-labelledby="product-dialog-title" className="relative grid w-full max-w-[760px] overflow-hidden rounded-[26px] bg-white shadow-2xl md:grid-cols-2" data-testid="dialog-product">
      <button onClick={onClose} className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-white/90 text-[#183e57] shadow" aria-label="Close product details" data-testid="button-close-product"><X size={18}/></button>
      <div className="relative min-h-[260px] bg-[#e3f1f3] md:min-h-[420px]"><ImageSlider images={product.images} alt={`Frozen seafood product: ${product.name}`} eager/></div>
      <div className="flex flex-col justify-center p-7 md:p-9"><span className="section-kicker">{product.category}</span><h2 id="product-dialog-title" className="mt-2 font-[var(--app-font-serif)] text-3xl font-extrabold leading-tight text-[#143a56]">{product.name}</h2><p className="mt-3 text-sm leading-6 text-[#69818d]">Frozen seafood for your food service and wholesale requirements.</p><p className="mt-6 text-xs font-semibold uppercase tracking-wider text-[#80939b]">Price per KG</p><p className="mt-1 text-3xl font-extrabold text-[#123b58]">{inr(product.price)}<span className="ml-2 text-sm font-semibold text-[#718994]">/ KG</span></p>
        <div className="mt-7 flex items-center justify-between rounded-xl bg-[#f0f7f8] p-3"><span className="text-sm font-bold text-[#35566a]">Quantity (KG)</span><div className="flex items-center gap-3"><button onClick={()=>setQuantity(Math.max(1,quantity-1))} className="grid h-9 w-9 place-items-center rounded-full bg-white text-[#35566a]" aria-label="Decrease quantity" data-testid="button-dialog-decrease"><Minus size={15}/></button><input type="number" min="1" step="1" value={quantity} onChange={e=>setQuantity(Math.max(1,Number(e.target.value)||1))} className="w-12 bg-transparent text-center font-bold outline-none" aria-label="Quantity in kilograms" data-testid="input-dialog-quantity"/><button onClick={()=>setQuantity(quantity+1)} className="grid h-9 w-9 place-items-center rounded-full bg-white text-[#35566a]" aria-label="Increase quantity" data-testid="button-dialog-increase"><Plus size={15}/></button></div></div>
        <p className="mt-3 text-right text-sm font-bold text-[#244b62]">Estimated: {inr(product.price*quantity)}</p><button onClick={()=>onAdd(quantity)} className="mt-5 flex min-h-12 w-full items-center justify-center rounded-full bg-[#ed684f] px-5 text-sm font-bold text-white hover:bg-[#dc583f]" data-testid="button-dialog-add">Add to Order <ArrowRight size={16} className="ml-2"/></button>
      </div>
    </section>
  </div>;
}

function BasketDialog({basket,customer,setCustomer,total,onClose,onQuantity,onOrder}:{basket:BasketLine[];customer:string;setCustomer:(v:string)=>void;total:number;onClose:()=>void;onQuantity:(id:string,q:number)=>void;onOrder:()=>void}) {
  const count=basket.reduce((sum,line)=>sum+line.quantity,0);
  useEffect(()=>{const onKey=(e:KeyboardEvent)=>{if(e.key==='Escape')onClose()};window.addEventListener('keydown',onKey);return()=>window.removeEventListener('keydown',onKey)},[onClose]);
  return <div className="dialog-backdrop fixed inset-0 z-[60] flex justify-end bg-[#06253c]/55 backdrop-blur-sm" onMouseDown={e=>{if(e.target===e.currentTarget)onClose()}} role="presentation">
    <aside role="dialog" aria-modal="true" aria-labelledby="basket-title" className="flex h-full w-full max-w-[510px] flex-col bg-[#f8fbfb] shadow-2xl" data-testid="dialog-basket">
      <div className="flex items-center justify-between border-b border-[#dfeaec] bg-white px-6 py-5"><div><h2 id="basket-title" className="font-[var(--app-font-serif)] text-2xl font-extrabold">Your order</h2><p className="mt-1 text-xs text-[#718995]">{count} KG total quantity</p></div><button onClick={onClose} className="grid h-10 w-10 place-items-center rounded-full bg-[#eff6f7] text-[#35566a]" aria-label="Close basket" data-testid="button-close-basket"><X size={18}/></button></div>
      <div className="flex-1 overflow-y-auto px-5 py-5">
         {basket.length===0?<div className="mt-16 rounded-3xl border border-dashed border-[#bfd5da] bg-white px-5 py-12 text-center"><ShoppingBag className="mx-auto text-[#85b5bd]" size={31}/><h3 className="mt-4 font-[var(--app-font-serif)] text-lg font-extrabold">Your order is empty</h3><p className="mt-2 text-sm text-[#748a95]">Add products from our range to get started.</p><button onClick={()=>{onClose();document.getElementById('products')?.scrollIntoView({behavior:'smooth'})}} className="mt-5 rounded-full bg-[#103c5a] px-5 py-2.5 text-xs font-bold text-white">Explore products</button></div>:<div className="space-y-3">{basket.map(line=>{
          const product=products.find(p=>p.id===line.productId);if(!product)return null;
          return <article key={line.productId} className="flex gap-3 rounded-2xl border border-[#dfeaec] bg-white p-3" data-testid={`basket-line-${product.id}`}><img src={product.image} alt="" className="h-[82px] w-[82px] rounded-xl object-cover"/><div className="min-w-0 flex-1"><div className="flex justify-between gap-2"><div><h3 className="text-sm font-bold leading-5 text-[#1a3e58]">{product.name}</h3><p className="mt-1 text-xs text-[#718995]">{inr(product.price)} / KG</p></div><button onClick={()=>onQuantity(product.id,0)} className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-[#9aaeb6] hover:bg-[#fff0ed] hover:text-[#d85d47]" aria-label={`Remove ${product.name}`} data-testid={`button-remove-${product.id}`}><X size={15}/></button></div><div className="mt-2 flex items-center justify-between"><div className="flex items-center gap-2"><button onClick={()=>onQuantity(product.id,line.quantity-1)} className="grid h-7 w-7 place-items-center rounded-full bg-[#eef6f7] text-[#385c6d]" aria-label={`Decrease ${product.name} quantity`} data-testid={`button-quantity-minus-${product.id}`}><Minus size={13}/></button><span className="min-w-[30px] text-center text-xs font-bold">{line.quantity} KG</span><button onClick={()=>onQuantity(product.id,line.quantity+1)} className="grid h-7 w-7 place-items-center rounded-full bg-[#eef6f7] text-[#385c6d]" aria-label={`Increase ${product.name} quantity`} data-testid={`button-quantity-plus-${product.id}`}><Plus size={13}/></button></div><strong className="text-sm text-[#173d58]">{inr(product.price*line.quantity)}</strong></div></div></article>;
        })}</div>}
      </div>
      <div className="border-t border-[#dfeaec] bg-white p-5">
        <label className="block text-xs font-bold text-[#35566a]">Customer name <span className="text-[#ed684f]">*</span><input value={customer} onChange={e=>setCustomer(e.target.value)} placeholder="Name for this order" className="mt-2 h-11 w-full rounded-xl border border-[#d8e6e9] bg-white px-3 text-sm outline-none focus:border-[#49a4b5]" data-testid="input-customer-name" required/></label>
        <div className="mt-4 flex items-center justify-between border-t border-dashed border-[#dbe7e9] pt-4"><span className="text-sm font-semibold text-[#5d7786]">Estimated total</span><strong className="font-[var(--app-font-serif)] text-2xl font-extrabold text-[#123b58]" data-testid="text-basket-total">{inr(total)}</strong></div>
        <p className="mt-1 text-[11px] text-[#8598a0]">Final availability and order details to be confirmed.</p>
        <button onClick={onOrder} disabled={!basket.length} className="mt-4 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#0c785f] text-sm font-bold text-white transition hover:bg-[#09654f] disabled:cursor-not-allowed disabled:bg-[#9dbbb4]" data-testid="button-send-order"><MessageCircle size={17} className="mr-2"/>Continue order on WhatsApp <ArrowRight size={15} className="ml-2"/></button>
        {!customer.trim()&&basket.length>0&&<p className="mt-2 text-center text-xs font-medium text-[#9b5a48]">Enter your name to continue the order.</p>}
      </div>
    </aside>
  </div>;
}

export default App;