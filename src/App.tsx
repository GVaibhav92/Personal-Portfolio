import { useEffect, useRef, useState, type ReactNode, type MouseEvent } from 'react'
import { motion, AnimatePresence, MotionConfig, useInView, animate } from 'framer-motion'
import { Lottie } from 'lottie-react'
import pandaAnimation from './assets/panda.json'
import { Github, Linkedin, Code2, Mail, Copy, Check, Download, Menu, X, ArrowUpRight, ArrowUp, Sun, Moon, ChevronDown } from 'lucide-react'
import Skills from './Skills'
import { links, projects, education, experience, certificates, skills } from './data'

type Project = typeof projects[number]
const nav = ['about', 'projects', 'experience', 'education', 'certificates', 'skills', 'fun-facts', 'contact'].filter(id => id !== 'certificates' || certificates.length > 0)
const tiles = ['linear-gradient(135deg,#2b3a67,#7b9cff)', 'linear-gradient(135deg,#7a2e4a,#ff8fab)', 'linear-gradient(135deg,#2f5d50,#9be3b8)']
const label = (id: string) => id.replace('-', ' ')

const spot = (e: MouseEvent<HTMLElement>) => {
  const r = e.currentTarget.getBoundingClientRect(), s = e.currentTarget.style
  s.setProperty('--mx', `${e.clientX - r.left}px`); s.setProperty('--my', `${e.clientY - r.top}px`)
}
const tilt = (e: MouseEvent<HTMLElement>) => {
  const r = e.currentTarget.getBoundingClientRect(), s = e.currentTarget.style
  s.setProperty('--ry', `${((e.clientX - r.left) / r.width - 0.5) * 10}deg`); s.setProperty('--rx', `${-((e.clientY - r.top) / r.height - 0.5) * 10}deg`)
}
const untilt = (e: MouseEvent<HTMLElement>) => { e.currentTarget.style.setProperty('--rx', '0deg'); e.currentTarget.style.setProperty('--ry', '0deg') }

const funFacts = [
  'Cold coffee-driven developer.',
  'I’m serious about things I shouldn’t be and not serious enough about things I should be.',
  'I debug better after a good playlist.',
];

function useTheme() {
  const [dark, setDark] = useState(() => { try { const s = localStorage.getItem('theme'); if (s) return s === 'dark' } catch { /* storage blocked */ } return true })
  useEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light'
    try { localStorage.setItem('theme', dark ? 'dark' : 'light') } catch { /* storage blocked */ }
  }, [dark])
  return [dark, () => setDark(d => !d)] as const
}

function ThemeToggle({ dark, toggle }: { dark: boolean; toggle: () => void }) {
  return (
    <button className="toggle" role="switch" aria-checked={dark} aria-label="Dark mode" onClick={toggle}>
      <motion.span className="knob" layout whileTap={{ scale: 0.85 }} transition={{ type: 'spring', stiffness: 500, damping: 26 }} style={{ marginLeft: dark ? 'auto' : 0 }}>
        {dark ? <Moon size={12} /> : <Sun size={12} />}
      </motion.span>
    </button>
  )
}

function Navbar({ dark, toggle }: { dark: boolean; toggle: () => void }) {
  const [active, setActive] = useState(''), [open, setOpen] = useState(false)
  useEffect(() => {
    const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && setActive(e.target.id)), { rootMargin: '-45% 0px -50% 0px' })
    nav.forEach(id => { const el = document.getElementById(id); if (el) io.observe(el) })
    return () => io.disconnect()
  }, [])
  return (
    <header className="nav">
      <nav aria-label="Main" className="nav-in">
        <a href="#top" className="font-bold text-lg">Vaibhav Gupta</a>
        <ul className="hidden lg:flex items-center gap-1">
          {nav.map(id => (
            <li key={id}><a href={`#${id}`} className={`nl capitalize ${active === id ? 'on' : ''}`}>
              {active === id && <motion.span layoutId="pill" className="pill" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}{label(id)}</a></li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <ThemeToggle dark={dark} toggle={toggle} />
          <button className="lg:hidden btn" style={{ padding: '.4rem .6rem' }} aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X size={18} /> : <Menu size={18} />}</button>
        </div>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.ul className="drop lg:hidden" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
            {nav.map(id => <li key={id}><a href={`#${id}`} className="capitalize" onClick={() => setOpen(false)}>{label(id)}</a></li>)}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  )
}

function Typewriter({ words }: { words: string[] }) {
  const [i, setI] = useState(0), [n, setN] = useState(0), [del, setDel] = useState(false)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setN(words[0].length); return }
    const w = words[i]
    const t = setTimeout(() => {
      if (!del && n < w.length) setN(n + 1)
      else if (!del) setDel(true)
      else if (n > 0) setN(n - 1)
      else { setDel(false); setI((i + 1) % words.length) }
    }, !del && n === w.length ? 1500 : del ? 45 : 100)
    return () => clearTimeout(t)
  }, [n, del, i, words])
  return <span aria-label={words[0]}>{words[i].slice(0, n)}<span className="caret" aria-hidden /></span>
}

function Clock() {
  const [t, setT] = useState(new Date())
  useEffect(() => { const id = setInterval(() => setT(new Date()), 30000); return () => clearInterval(id) }, [])
  return <p className="mono cap text-center mt-4">Vellore, IND · IST {t.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit' })}</p>
}

function PandaAnimation() {
  return (
    <div className="panda-animation" aria-hidden="true">
      <Lottie
      src={pandaAnimation}
      autoplay
      loop
      />

      <div className="panda-bubble">
        Let's Go!
      </div>
    </div>
  )
}

function Hero() {
  const item = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <section id="top" className="wrap hero">
      <div className="hero-grid">

        {/* LEFT — INTRODUCTION */}
        <motion.div
          className="hero-content"
          initial="hidden"
          animate="show"
          transition={{ staggerChildren: 0.12 }}
        >
          <motion.p
            variants={item}
            className="hero-greeting"
          >
            <Typewriter
              words={['Hello', 'Namaste', 'Hola', 'Bonjour']}
            />
          </motion.p>

          <motion.h1
            variants={item}
            className="hero-title"
          >
            I'm Vaibhav.

            <span className="hero-description">
              Backend developer focused on building{' '}
              <span className="ul">scalable</span>,{' '}
              <span className="ul">reliable</span>, and{' '}
              <span className="ul">high-performance</span> systems.
            </span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mono cap hero-meta"
          >
            Integrated M.Tech CSE student · VIT Vellore
          </motion.p>

          <motion.div
            variants={item}
            className="hero-actions"
          >
            <a
              className="btn pri"
              href="#projects"
            >
              Explore my work
            </a>

            {links.resume && (
              <a
                className="btn"
                href={links.resume}
                download
              >
                <Download size={16} />
                Resume
              </a>
            )}
          </motion.div>
        </motion.div>

        {/* RIGHT — PANDA */}
        <motion.div
          className="hero-animation"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: 0.25,
            duration: 0.6,
            ease: 'easeOut',
          }}
        >
          <PandaAnimation />
          <Clock />
        </motion.div>

      </div>

      {/* TECHNOLOGY STACK */}
      <div className="hero-stack">
        <p className="cap">
          Working with
        </p>

        <ul className="hero-stack-list">
          {['Go', 'PostgreSQL', 'Redis', 'Docker', 'Flutter'].map(t => (
            <li
              key={t}
              className="mute"
            >
              {t}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Rise({ children, i = 0 }: { children: ReactNode; i?: number }) {
  return <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ delay: i * 0.08, duration: 0.5 }}>{children}</motion.div>
}
function Section({ id, title, sub, split, children }: { id: string; title: string; sub?: string; split?: boolean; children: ReactNode }) {
  const head = <><h2 className="h2">{title}</h2>{sub && <p className="mute -mt-4 mb-8 max-w-xs">{sub}</p>}</>
  return (
    <section id={id} className="sec"><div className="wrap">
      {split ? <div className="grid lg:grid-cols-[260px_1fr] gap-x-12"><div className="lg:sticky lg:top-28 self-start">{head}</div><div>{children}</div></div> : <>{head}{children}</>}
    </div></section>
  )
}

function Count({ to, dec = 0 }: { to: number; dec?: number }) {
  const ref = useRef<HTMLSpanElement>(null), inView = useInView(ref, { once: true })
  useEffect(() => {
    if (!inView || !ref.current) return
    const el = ref.current
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { el.textContent = to.toFixed(dec); return }
    const c = animate(0, to, { duration: 1.4, ease: 'easeOut', onUpdate: v => { el.textContent = v.toFixed(dec) } })
    return () => c.stop()
  }, [inView, to, dec])
  return <span ref={ref}>{(0).toFixed(dec)}</span>
}

function About() {
  const stats: [number, number, string][] = [
    [8.95, 2, 'Current CGPA'],
    [projects.length, 0, 'Featured projects'],
    [Object.keys(skills).length, 0, 'Skill areas'],
  ]

  const phil = [
    [
      'Measure first',
      'Profile and benchmark before changing anything, then change one thing at a time.',
    ],
    [
      'Design for failure',
      'Networks drop and services restart. Retries, timeouts and idempotency belong in the design.',
    ],
    [
      'Keep it simple',
      'The fewest moving parts that meet the requirement are the easiest to debug.',
    ],
  ]

  return (
    <Section
      id="about"
      title="About"
      sub="Who I am and how I think about software."
      split
    >
      <div className="about-copy max-w-3xl">
        <p>
          I enjoy the parts of software users never see: how requests flow
          through a system, where they wait, how services communicate, and
          what happens when something fails.
        </p>

        <p>
          I understand both the systems behind a product and the interfaces
          people use.
        </p>

        <p>
          Most of my learning comes from building real projects and pushing
          them past the basics: adding reliability, handling failure,
          measuring performance, and weighing the trade-offs behind
          architectural decisions.
        </p>
      </div>

      <div className="flex flex-wrap gap-10 mt-10">
        {stats.map(([v, d, l]) => (
          <div key={l}>
            <p className="text-4xl font-bold">
              <Count to={v} dec={d} />
            </p>
            <p className="mute text-sm">{l}</p>
          </div>
        ))}
      </div>

      <p className="cap mt-12">Currently exploring</p>

      <div className="flex flex-wrap gap-2 mt-3">
        {['Distributed systems', 'gRPC', 'System design'].map(t => (
          <span className="tag" key={t}>
            {t}
          </span>
        ))}
      </div>

      <div className="grid sm:grid-cols-3 gap-5 mt-10">
        {phil.map(([t, d], i) => (
          <Rise key={t} i={i}>
            <div
              className="card h-full"
              onMouseMove={spot}
            >
              <h3 className="font-bold">{t}</h3>
              <p className="mute text-sm mt-2">{d}</p>
            </div>
          </Rise>
        ))}
      </div>
    </Section>
  )
}

function ProjectCard({ p, i, onOpen }: { p: Project; i: number; onOpen: () => void }) {
  return (
    <div className="card proj" role="button" tabIndex={0} aria-label={`Open ${p.name} details`} onClick={onOpen}
      onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), onOpen())}
      onMouseMove={e => { spot(e); tilt(e) }} onMouseLeave={untilt}>
      <div className="tile" style={{ background: tiles[i % tiles.length] }}>
        <span className="mono text-2xl font-medium">{p.name}</span>
        <span className="mono text-xs opacity-80">{p.tech.slice(0, 3).join(' · ')}</span>
      </div>
      <h3 className="text-xl font-bold px-2">{p.name}</h3>
      <p className="mute text-sm px-2">{p.desc}</p>
      <span className="mono text-sm px-2 mt-2 inline-flex items-center gap-1">View details <ArrowUpRight size={14} className="arrow" /></span>
    </div>
  )
}

function Modal({ p, onClose }: { p: Project; onClose: () => void }) {
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', k); document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', k); document.body.style.overflow = '' }
  }, [onClose])
  return (
    <motion.div className="overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.div className="modal" role="dialog" aria-modal="true" aria-label={p.name} onClick={e => e.stopPropagation()}
        initial={{ y: 40, scale: 0.96, opacity: 0 }} animate={{ y: 0, scale: 1, opacity: 1 }} exit={{ y: 20, opacity: 0 }} transition={{ type: 'spring', stiffness: 300, damping: 28 }}>
        <button className="btn absolute top-4 right-4" style={{ padding: '.35rem' }} aria-label="Close" onClick={onClose}><X size={16} /></button>
        <h3 className="text-2xl font-bold pr-10">{p.name}</h3>
        <p className="mute mt-2">{p.desc}</p>
        <div className="flex flex-wrap gap-2 mt-4">{p.tech.map(t => <span className="tag" key={t}>{t}</span>)}</div>
        {p.metrics && <div className="grid grid-cols-3 gap-3 mt-5">{p.metrics.map(([v, l]) => <div key={l} className="card" style={{ padding: '.75rem' }}><p className="font-bold text-lg">{v}</p><p className="mute text-xs">{l}</p></div>)}</div>}
        <ul className="list-disc pl-5 mt-5 space-y-2 text-sm mute">{p.points.map(x => <li key={x}>{x}</li>)}</ul>
        {p.note && <p className="mono text-xs mute mt-4">{p.note}</p>}
        <div className="flex flex-wrap gap-3 mt-6"><a className="btn pri" href={p.repo} target="_blank" rel="noreferrer"><Github size={16} />View code</a>{p.demo && <a className="btn" href={p.demo.url} target="_blank" rel="noreferrer"><ArrowUpRight size={16} />{p.demo.label}</a>}</div>
      </motion.div>
    </motion.div>
  )
}

function Experience() {
  const [open, setOpen] = useState(0)
  return (
    <Section id="experience" title="Experience" sub="Where I have worked and led." split>
      <div className="grid gap-4 max-w-3xl">{experience.map((e, i) => {
        const has = !!e.bullets?.length
        const head = <span><span className="block font-bold">{e.role}</span><span className="mute text-sm">{e.org}{e.when && ` · ${e.when}`}</span></span>
        return (
          <div className="card" key={e.org} onMouseMove={spot}>
            {has ? (
              <button className="w-full flex justify-between items-center text-left" aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}>
                {head}<ChevronDown size={18} style={{ transform: open === i ? 'rotate(180deg)' : 'none', transition: 'transform .25s' }} />
              </button>
            ) : head}
            {has && <AnimatePresence initial={false}>{open === i && (
              <motion.ul initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden list-disc pl-5 mt-3 text-sm mute space-y-1">
                {e.bullets!.map(b => <li key={b}>{b}</li>)}</motion.ul>)}</AnimatePresence>}
          </div>)})}</div>
    </Section>
  )
}

function Flip() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [factIndex, setFactIndex] = useState(0);

  const handleFlip = () => {
    setIsFlipped((previousState) => !previousState);

    if (!isFlipped) {
      setFactIndex((previousIndex) => (previousIndex + 1) % funFacts.length);
    }
  };

  return (
    <button
      type="button"
      className="flip"
      aria-pressed={isFlipped}
      aria-label="Flip card to reveal a fun fact"
      onClick={handleFlip}
    >
      <motion.div
        className="flipin"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{
          duration: 0.6,
          type: 'spring',
          damping: 18,
        }}
      >
        <div className="face mono mute">
          Fun fact: tap to reveal
        </div>

        <div className="face back">
          “{funFacts[factIndex]}”
        </div>
      </motion.div>
    </button>
  );
}


function Contact() {
  const [copied, setCopied] = useState(false)
  const copy = async () => { try { await navigator.clipboard.writeText(links.email); setCopied(true); setTimeout(() => setCopied(false), 1800) } catch { /* clipboard blocked */ } }
  return (
    <Section id="contact" title="Contact" sub="Let's connect! Drop by to say hello anytime." split>
      <p className="text-xl mute max-w-xl">Open to internships and backend projects. Reach out on LinkedIn{links.email ? ' or by email' : ''}.</p>
      {links.email && (<div className="flex items-center gap-3 mt-6">
        <a href={`mailto:${links.email}`} className="mono text-xl lk">{links.email}</a>
        <button className="btn" style={{ padding: '.4rem' }} onClick={copy} aria-label="Copy email" aria-live="polite">{copied ? <Check size={16} /> : <Copy size={16} />}</button>
      </div>)}
      <p className="cap mt-10">Explore more</p>
      <div className="flex flex-wrap gap-6 mt-3 text-lg">
        {([[Github, 'GitHub', links.github], [Linkedin, 'LinkedIn', links.linkedin], [Code2, 'LeetCode', links.leetcode]] as const).map(([Icon, l, href]) => (
          <a key={l} className="lk inline-flex items-center gap-2" href={href} target="_blank" rel="noreferrer"><Icon size={16} />{l}</a>))}
        {links.email && <a className="lk inline-flex items-center gap-2" href={`mailto:${links.email}`}><Mail size={16} />Email</a>}
      </div>
    </Section>
  )
}

export default function App() {
  const [dark, toggle] = useTheme(), [sel, setSel] = useState<Project | null>(null)
  return (
    <MotionConfig reducedMotion="user">
      <Navbar dark={dark} toggle={toggle} />
      <main>
        <Hero />
        <About />
        <Section id="projects" title="Work" sub="Open a project to see how it works."><div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">{projects.map((p, i) => <Rise key={p.name} i={i}><ProjectCard p={p} i={i} onOpen={() => setSel(p)} /></Rise>)}</div></Section>
        <Experience />
        <Section id="education" title="Education" sub="Where I have studied." split><ol className="space-y-6 border-l pl-6 max-w-2xl" style={{ borderColor: 'var(--line)' }}>{education.map(e => (
          <li key={e.title} className="relative group"><span className="absolute -left-[31px] top-2 w-2.5 h-2.5 rounded-full transition-transform group-hover:scale-150" style={{ background: 'var(--acc)' }} />
            <p className="mono cap">{e.when}</p><h3 className="font-bold">{e.title}</h3><p className="mute text-sm">{e.where}{e.note && ` · ${e.note}`}</p></li>))}</ol></Section>
        {certificates.length > 0 && (<Section id="certificates" title="Certificates" sub="Courses and credentials." split><div className="grid sm:grid-cols-3 gap-5">{certificates.map((c, i) => <Rise key={i} i={i}><div className="card" onMouseMove={spot}><h3 className="font-bold">{c.name}</h3><p className="mute text-sm">{c.issuer} · {c.year}</p>{c.credentialId && <p className="mono text-xs mute mt-1">ID: {c.credentialId}</p>}{c.url ? <a className="btn mt-4" href={c.url} target="_blank" rel="noreferrer">Verify credential <ArrowUpRight size={14} /></a> : null}</div></Rise>)}</div></Section>)}
        <Skills />
        <Section id="fun-facts" title="Fun Facts" sub="A little personality reveal." split><Flip /></Section>
        <Contact />
      </main>
      <footer className="wrap py-8 flex flex-wrap justify-between items-center gap-3 mono cap" style={{ borderTop: '1px solid var(--line)' }}>
        <span>© {new Date().getFullYear()} Vaibhav Gupta · All rights reserved.</span>
        <button className="btn mono" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Back to top <ArrowUp size={14} /></button>
      </footer>
      <AnimatePresence>{sel && <Modal key={sel.name} p={sel} onClose={() => setSel(null)} />}</AnimatePresence>
    </MotionConfig>
  )
}
