import React, { useEffect, useMemo, useState } from "react";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Megaphone,
  Users,
  Images,
  Newspaper,
  Clock,
  Activity,
  ChevronRight,
  CheckCircle,
  Menu,
} from "lucide-react";

// --- Simple in-file "CMS" so content is easy to tweak ---
const seedData = {
  name: "Gram Panchayat Sukhasan",
  tag: "Seva • Vikas • Samarpan",
  location: {
    village: "sukhasan",
    tehsil: "Chomu",
    district: "Madhepura",
    state: "Bihar",
    pincode: "852113",
  },
  about: {
    title: "About the Panchayat",
    body: "Gram Panchayat Sukhasan serves ~3,800 residents across 5 wards. We focus on reliable water supply, sanitation, girls’ education, and employment through rural self‑help groups. Our mission is to deliver fast, transparent services with citizen participation.",
    highlights: [
      "100% household tap‑connections (Har Ghar Jal)",
      "Door‑to‑door waste collection pilot",
      "Women‑led SHGs managing village library",
      "Monthly Gram Sabha on the first Sunday",
    ],
  },
  gallery: [
    {
      src: "https://commons.wikimedia.org/wiki/Special:FilePath/Field%20in%20a%20village%20in%20Bihar.jpg",
      alt: "Fields and homesteads in a Bihar village (Madhubani)",
    },
    {
      src: "https://commons.wikimedia.org/wiki/Special:FilePath/Villageinbihar.jpg",
      alt: "Typical village scene in Bihar",
    },
    {
      src: "https://commons.wikimedia.org/wiki/Special:FilePath/Old%20house%20in%20a%20Bihar%20village.jpg",
      alt: "Traditional house in a Bihar village (Madhubani)",
    },
    {
      src: "https://commons.wikimedia.org/wiki/Special:FilePath/Bihar%20Countryside.jpg",
      alt: "Bihar countryside landscape",
    },
    {
      src: "https://commons.wikimedia.org/wiki/Special:FilePath/Panchayat%20Sarkar%20Bhavan.jpg",
      alt: "Panchayat Sarkar Bhavan building",
    },
  ],
  updates: [
    {
      id: 1,
      title: "Swachhata Drive – Ward 3",
      date: "2025-08-25",
      body: "Village‑wide cleanliness drive completed in Ward 3 with 60+ volunteers. Compost pits prepared at the school campus.",
    },
    {
      id: 2,
      title: "Scholarship Camp for Girls",
      date: "2025-08-20",
      body: "Block office team organized document‑verification camp. 47 students received guidance on application and bank linkage.",
    },
  ],
  members: [
    {
      role: "Sarpanch",
      name: "Suman Devi",
      phone: "+91 9015588822",
      pic: "https://i.pravatar.cc/160?img=64",
    },
    {
      role: "Upa‑Sarpanch",
      name: "Ratan Lal",
      phone: "+91 6291121582",
      pic: "https://i.pravatar.cc/160?img=12",
    },
    {
      role: "Ward Member – 1",
      name: "Kesar Bai",
      phone: "+91 9123456789",
      pic: "https://i.pravatar.cc/160?img=32",
    },
    {
      role: "Ward Member – 2",
      name: "Mukesh Kumar",
      phone: "+91 9123456780",
      pic: "https://i.pravatar.cc/160?img=8",
    },
    {
      role: "Ward Member – 3",
      name: "Santosh",
      phone: "+91 9123456784",
      pic: "https://i.pravatar.cc/160?img=22",
    },
    {
      role: "Ward Member – 4",
      name: "Harish Chandra",
      phone: "+91 9123456781",
      pic: "https://i.pravatar.cc/160?img=5",
    },
    {
      role: "Ward Member – 5",
      name: "Shanti Devi",
      phone: "+91 9123456786",
      pic: "https://i.pravatar.cc/160?img=15",
    },
  ],
  contact: {
    address: "Panchayat Bhawan, Sukhasan, madhepura, Bihar 852113",
    phone: "+91 141 225 0000",
    email: "contact@sukhasan-pan.in",
    hours: "Mon–Sat: 10:00 AM – 4:00 PM",
    mapUrl: "https://maps.app.goo.gl/otfy2Ei47Jj9SFAp7",
  },
  social: {
    facebook: "https://www.facebook.com/Kalimandirsukhasan/",
    twitter: "https://x.com/sukhasan_gp",
    instagram: "https://instagram.com/sukhasan.panchayat",
    youtube: "https://youtube.com/@sukhasan.panchayat",
    whatsapp: "https://chat.whatsapp.com/EXAMPLE",
  },
};

// Utility: pretty date
const pretty = (iso) =>
  new Date(iso + "T00:00:00").toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

function Badge({ icon: Icon, children }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-emerald-700 ring-1 ring-emerald-200">
      <Icon size={14} /> {children}
    </span>
  );
}

function Nav() {
  const [open, setOpen] = React.useState(false);
  return (
    <header className="sticky top-0 z-40 w-full bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:py-4">
        <div className="flex items-center gap-3">
          <img
            src="https://commons.wikimedia.org/wiki/Special:FilePath/Villageinbihar.jpg"
            alt="Emblem"
            className="h-8 w-8"
          />
          <div className="leading-tight">
            <p className="text-xs text-neutral-500">Government of Bihar</p>
            <h1 className="text-sm md:text-base font-semibold">
              {seedData.name}
            </h1>
          </div>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <a href="#about" className="hover:text-emerald-700">
            About
          </a>
          <a href="#gallery" className="hover:text-emerald-700">
            Gallery
          </a>
          <a href="#updates" className="hover:text-emerald-700">
            Updates
          </a>
          <a href="#members" className="hover:text-emerald-700">
            Members
          </a>
          <a href="#contact" className="hover:text-emerald-700">
            Contact
          </a>
          <a href="#social" className="hover:text-emerald-700">
            Social
          </a>
        </nav>
        <button
          className="md:hidden p-2"
          onClick={() => setOpen(!open)}
          aria-label="Open menu"
        >
          ☰
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t">
          <div className="mx-auto max-w-6xl grid px-4 py-3 text-sm gap-3">
            {[
              ["#about", "About"],
              ["#gallery", "Gallery"],
              ["#updates", "Updates"],
              ["#members", "Members"],
              ["#contact", "Contact"],
              ["#social", "Social"],
            ].map(([href, label]) => (
              <a
                key={href}
                href={href}
                className="py-2"
                onClick={() => setOpen(false)}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-emerald-50 via-white to-amber-50" />
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16 lg:py-20">
        <div className="grid md:grid-cols-2 items-center gap-10">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-emerald-700 ring-1 ring-emerald-200">
              ISO 9001 Service Standards
            </span>
            <h2 className="mt-4 text-3xl md:text-5xl font-bold tracking-tight text-neutral-900">
              {seedData.name}
            </h2>
            <p className="mt-3 text-lg text-neutral-600">{seedData.tag}</p>
            <p className="mt-5 text-neutral-700 leading-relaxed">
              Empowering citizens of {seedData.location.village},{" "}
              {seedData.location.tehsil}, {seedData.location.district}. We
              enable quick services, transparent schemes, and a cleaner, greener
              village.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href="#updates"
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-white shadow hover:bg-emerald-700"
              >
                Latest Updates
              </a>
              <a
                href="#about"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 ring-1 ring-neutral-200 hover:ring-neutral-300"
              >
                Learn More →
              </a>
            </div>
            <div className="mt-6 flex flex-wrap gap-2 text-xs text-neutral-600">
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-emerald-700 ring-1 ring-emerald-200">
                Har Ghar Jal
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-emerald-700 ring-1 ring-emerald-200">
                ODF+
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-emerald-700 ring-1 ring-emerald-200">
                Digital Grievances
              </span>
            </div>
          </div>
          <div className="relative">
            {/* <img className="rounded-3xl shadow-lg ring-1 ring-black/5" src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1400&auto=format&fit=crop" alt="Panchayat building"/> */}
            <img
              className="rounded-3xl shadow-lg ring-1 ring-black/5"
              src="https://commons.wikimedia.org/wiki/Special:FilePath/Villageinbihar.jpg"
              alt="Gram Panchayat Sukhasan"
            />
            <div className="absolute -bottom-4 -right-4 rounded-2xl bg-white p-4 shadow ring-1 ring-neutral-200">
              <p className="text-xs text-neutral-500">Next Gram Sabha</p>
              <p className="font-semibold">First Sunday of every month</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function NewsTicker() {
  const items = seedData.updates.map((u) => `${u.title} • ${pretty(u.date)}`);
  const [idx, setIdx] = React.useState(0);
  React.useEffect(() => {
    const id = setInterval(() => setIdx((v) => (v + 1) % items.length), 3000);
    return () => clearInterval(id);
  }, [items.length]);
  return (
    <div className="bg-amber-50 border-y">
      <div className="mx-auto max-w-6xl flex items-center gap-3 px-4 py-2 text-amber-900">
        {/* Newspaper icon replacement */}
        <span style={{ fontWeight: 600 }}>📰</span>{" "}
        <span className="text-sm">{items[idx]}</span>
      </div>
    </div>
  );
}

function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-4 py-12 md:py-16">
      <div className="grid md:grid-cols-2 gap-10 items-start">
        <div>
          <h3 className="text-2xl md:text-3xl font-semibold tracking-tight">
            {seedData.about.title}
          </h3>
          <p className="mt-4 text-neutral-700 leading-relaxed">
            {seedData.about.body}
          </p>
          <ul className="mt-6 grid gap-3">
            {seedData.about.highlights.map((h) => (
              <li key={h} className="flex items-start gap-3">
                ✅ <span>{h}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl border p-6 md:p-8 bg-white shadow-sm">
          <h4 className="font-semibold text-neutral-800">
            Administrative Details
          </h4>
          <dl className="mt-4 grid grid-cols-3 gap-4 text-sm">
            <dt className="text-neutral-500">Village</dt>
            <dd className="col-span-2">{seedData.location.village}</dd>
            <dt className="text-neutral-500">Tehsil</dt>
            <dd className="col-span-2">{seedData.location.tehsil}</dd>
            <dt className="text-neutral-500">District</dt>
            <dd className="col-span-2">{seedData.location.district}</dd>
            <dt className="text-neutral-500">State</dt>
            <dd className="col-span-2">{seedData.location.state}</dd>
            <dt className="text-neutral-500">PIN</dt>
            <dd className="col-span-2">{seedData.location.pincode}</dd>
          </dl>
          <a
            target="_blank"
            rel="noreferrer"
            href={seedData.contact.mapUrl}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-white hover:bg-emerald-700"
          >
            View on Map
          </a>
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  return (
    <section id="gallery" className="mx-auto max-w-6xl px-4 py-12 md:py-16">
      <div className="flex items-center gap-3">
        <span>🖼️</span>
        <h3 className="text-2xl md:text-3xl font-semibold">Photo Gallery</h3>
      </div>
      <p className="mt-2 text-neutral-600">
        Moments from community life and development work.
      </p>
      <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
        {seedData.gallery.slice(0, 5).map((g, i) => (
          <a
            key={i}
            href={g.src}
            target="_blank"
            rel="noreferrer"
            className="group relative block overflow-hidden rounded-2xl ring-1 ring-black/5"
          >
            <img
              src={g.src}
              alt={g.alt}
              className="aspect-[4/3] w-full object-cover transition group-hover:scale-105"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition" />
          </a>
        ))}
      </div>
    </section>
  );
}

function Updates() {
  return (
    <section id="updates" className="mx-auto max-w-6xl px-4 py-12 md:py-16">
      <div className="flex items-center gap-3">
        <span>📣</span>
        <h3 className="text-2xl md:text-3xl font-semibold">News & Updates</h3>
      </div>
      <div className="mt-6 grid md:grid-cols-2 gap-6">
        {seedData.updates.map((u) => (
          <article
            key={u.id}
            className="rounded-2xl border bg-white p-6 shadow-sm"
          >
            <div className="flex items-center gap-2 text-sm text-neutral-600">
              {/* Calendar icon */}📅 {pretty(u.date)}
            </div>
            <h4 className="mt-2 text-lg font-semibold">{u.title}</h4>
            <p className="mt-2 text-neutral-700">{u.body}</p>
            <a
              href="#contact"
              className="mt-4 inline-flex items-center gap-2 text-emerald-700 hover:underline"
            >
              Have a question? →
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}

function Members() {
  return (
    <section id="members" className="mx-auto max-w-6xl px-4 py-12 md:py-16">
      <div className="flex items-center gap-3">
        <span>👥</span>
        <h3 className="text-2xl md:text-3xl font-semibold">
          Panchayat Members
        </h3>
      </div>
      <div className="mt-6 grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {seedData.members.map((m) => (
          <div
            key={m.name}
            className="rounded-2xl border bg-white p-6 shadow-sm"
          >
            <div className="flex items-center gap-4">
              <img
                src={m.pic}
                alt={m.name}
                className="h-14 w-14 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold">{m.name}</p>
                <p className="text-sm text-neutral-600">{m.role}</p>
              </div>
            </div>
            {m.phone && (
              <a
                href={`tel:${m.phone}`}
                className="mt-3 inline-flex items-center gap-2 text-sm text-emerald-700 hover:underline"
              >
                {m.phone}
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  const [msg, setMsg] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);
  return (
    <section id="contact" className="mx-auto max-w-6xl px-4 py-12 md:py-16">
      <div className="flex items-center gap-3">
        <span>📍</span>
        <h3 className="text-2xl md:text-3xl font-semibold">Contact</h3>
      </div>
      <div className="mt-6 grid md:grid-cols-2 gap-6">
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <dl className="grid gap-3 text-sm">
            <div className="flex items-start gap-3">
              <span>📍</span>
              <div>
                <dt className="text-neutral-500">Address</dt>
                <dd className="font-medium">{seedData.contact.address}</dd>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span>📞</span>
              <div>
                <dt className="text-neutral-500">Phone</dt>
                <dd className="font-medium">{seedData.contact.phone}</dd>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span>✉️</span>
              <div>
                <dt className="text-neutral-500">Email</dt>
                <dd className="font-medium">{seedData.contact.email}</dd>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span>⏰</span>
              <div>
                <dt className="text-neutral-500">Hours</dt>
                <dd className="font-medium">{seedData.contact.hours}</dd>
              </div>
            </div>
          </dl>
          <a
            target="_blank"
            rel="noreferrer"
            href={seedData.contact.mapUrl}
            className="mt-4 inline-flex items-center gap-2 text-emerald-700 hover:underline"
          >
            Open Google Maps →
          </a>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
          className="rounded-2xl border bg-white p-6 shadow-sm"
        >
          <h4 className="font-semibold mb-3">Send us a message</h4>
          <label className="block text-sm">
            Your Name
            <input
              required
              className="mt-1 w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Full name"
            />
          </label>
          <label className="block text-sm mt-3">
            Phone
            <input
              required
              className="mt-1 w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Mobile number"
            />
          </label>
          <label className="block text-sm mt-3">
            Message
            <textarea
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              rows={4}
              className="mt-1 w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="How can we help?"
            />
          </label>
          <button className="mt-4 w-full rounded-xl bg-emerald-600 px-4 py-2.5 text-white hover:bg-emerald-700">
            Submit
          </button>
          {submitted && (
            <p className="mt-3 text-sm text-emerald-700">
              Thanks! (Demo) Your message is saved locally:{" "}
              <span className="font-mono">{msg || "<empty>"}</span>
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

function Social() {
  const s = seedData.social;
  const IconLink = ({ href, children }) => (
    <a
      target="_blank"
      rel="noreferrer"
      href={href}
      className="inline-flex items-center gap-2 rounded-xl border px-4 py-2 hover:bg-neutral-50"
    >
      {children}
    </a>
  );
  return (
    <section id="social" className="mx-auto max-w-6xl px-4 py-12 md:py-16">
      <div className="flex items-center gap-3">
        <span>🔗</span>
        <h3 className="text-2xl md:text-3xl font-semibold">Social Media</h3>
      </div>
      <p className="mt-2 text-neutral-600">
        Follow for updates, photos, and live Gram Sabha notices.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <IconLink href={s.facebook}>Facebook</IconLink>
        <IconLink href={s.twitter}>X (Twitter)</IconLink>
        <IconLink href={s.instagram}>Instagram</IconLink>
        <IconLink href={s.youtube}>YouTube</IconLink>
        <IconLink href={s.whatsapp}>WhatsApp Community</IconLink>
      </div>
    </section>
  );
}

function Footer() {
  const updated = React.useMemo(() => new Date().toLocaleString(), []);
  return (
    <footer className="mt-10 border-t bg-neutral-50">
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-neutral-600">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p>
            © {new Date().getFullYear()} {seedData.name}. All rights reserved.
          </p>
          <p>Last updated: {updated}</p>
        </div>
      </div>
    </footer>
  );
}

export default function PanchayatDemoSite() {
  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <Nav />
      <NewsTicker />
      <Hero />
      <About />
      <Gallery />
      <Updates />
      <Members />
      <Contact />
      <Social />
      <Footer />
    </main>
  );
}
