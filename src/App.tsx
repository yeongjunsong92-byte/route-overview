import { useEffect, useRef, useState } from 'react'

/* ── types ── */
type ProjectData = {
  project: { name: string; subtitle: string; tagline: string; coreMessage: string; currentPhase: string; phaseLabel: string; progress: number; lastUpdated: string }
  vision: { problem: { title: string; desc: string }; solution: { title: string; desc: string } }
  features: { num: string; title: string; ko: string; desc: string }[]
  currentStatus: { phase: string; completed: string[]; inProgress: string[]; next: string[] }
  designSystem: { brandKeywords: string[]; designReferences: string[]; colors: { name: string; hex: string; label: string }[]; typography: string; principles: { title: string; desc: string }[] }
  decisionLog: { date: string; title: string; reason: string }[]
  futureVision: { num: string; title: string; desc: string }[]
  stack: { layer: string; value: string; note: string }[]
  agents: { name: string; role: string; ko: string; color: string; icon: string }[]
  roadmap: { phase: string; label: string; status: string }[]
}

const FLOW = ['Discover', 'Create', 'Share', 'Navigate']
const FLOW_KO = ['탐색', '제작', '공유', '이동']
const FLOW_DESC = ['지도에서 코스를 발견', '나만의 코스를 설계', '경험을 SNS로 공유', '코스를 따라 이동']

/* ── hooks ── */
function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold })
    obs.observe(el); return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

/* ── primitives ── */
function Fade({ children, delay = 0, style }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
  const { ref, visible } = useInView()
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(18px)', transition: `opacity 0.55s ease ${delay}s, transform 0.55s ease ${delay}s`, ...style }}>
      {children}
    </div>
  )
}

function Section({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <section id={id} style={{ padding: '88px 0', maxWidth: 900, margin: '0 auto', width: '100%' }}>
      {children}
    </section>
  )
}

function Pad({ children }: { children: React.ReactNode }) {
  return <div style={{ padding: '0 40px' }}>{children}</div>
}

function SectionLabel({ children, color }: { children: React.ReactNode; color?: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
      <span style={{ width: 18, height: 1, background: color ?? 'var(--accent)', display: 'inline-block' }} />
      <span style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.14em', color: color ?? 'var(--accent)', textTransform: 'uppercase', fontWeight: 600 }}>
        {children}
      </span>
    </div>
  )
}

function BigTitle({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <h2 style={{ fontSize: 'clamp(32px, 4.5vw, 48px)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.1, color: 'var(--text-1)', marginBottom: 48, ...style }}>
      {children}
    </h2>
  )
}

function Rule() {
  return <div style={{ height: 1, background: 'var(--border)', maxWidth: 900, margin: '0 auto' }} />
}

function Tag({ children, color }: { children: React.ReactNode; color?: string }) {
  return (
    <span style={{ display: 'inline-block', fontSize: 11, fontWeight: 600, color: color ?? 'var(--text-2)', background: color ? color + '14' : 'var(--surface-2)', border: `1px solid ${color ? color + '30' : 'var(--border)'}`, borderRadius: 5, padding: '3px 9px', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.04em' }}>
      {children}
    </span>
  )
}

function Mono({ children, color }: { children: React.ReactNode; color?: string }) {
  return <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.05em', color: color ?? 'var(--text-3)' }}>{children}</span>
}

/* ── main ── */
export default function App() {
  const [data, setData] = useState<ProjectData | null>(null)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => { fetch('/data.json').then(r => r.json()).then(setData) }, [])
  useEffect(() => {
    const h = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])

  if (!data) return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)', color: 'var(--text-3)', fontFamily: "'JetBrains Mono', monospace", fontSize: 12 }}>
      Loading...
    </div>
  )

  const { project, vision: vis, features: feats, currentStatus: cs, designSystem: ds, decisionLog, futureVision, stack, agents, roadmap: rm } = data

  const navItems = [
    { label: 'Vision', href: '#vision' },
    { label: 'Status', href: '#status' },
    { label: 'Features', href: '#features' },
    { label: 'Design', href: '#design' },
    { label: 'Tech', href: '#tech' },
    { label: 'Team', href: '#team' },
    { label: 'Roadmap', href: '#roadmap' },
    { label: 'Future', href: '#future' },
  ]

  return (
    <div style={{ background: 'var(--bg)', color: 'var(--text-1)', overflowX: 'hidden' }}>

      {/* ── NAV ── */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, height: 52, display: 'flex', alignItems: 'center', padding: '0 40px', justifyContent: 'space-between', background: scrollY > 60 ? 'rgba(245,245,247,0.92)' : 'transparent', backdropFilter: scrollY > 60 ? 'blur(20px)' : 'none', borderBottom: scrollY > 60 ? '1px solid var(--border)' : '1px solid transparent', transition: 'all 0.3s' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 24, height: 24, borderRadius: 6, background: 'linear-gradient(135deg, #E6B7C7, #6D9EEB)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 9L6 3L10 9" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
          <span style={{ fontWeight: 800, fontSize: 15, letterSpacing: '-0.03em', color: 'var(--text-1)' }}>{project.name}</span>
          <span style={{ fontSize: 11, color: 'var(--text-3)', marginLeft: 2, fontFamily: "'JetBrains Mono', monospace" }}>/ Project HQ</span>
        </div>
        <div style={{ display: 'flex', gap: 2 }}>
          {navItems.map(({ label, href }) => (
            <a key={label} href={href} style={{ fontSize: 12, color: 'var(--text-3)', textDecoration: 'none', padding: '4px 9px', borderRadius: 5, transition: 'all 0.15s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-1)'; (e.currentTarget as HTMLAnchorElement).style.background = 'var(--surface)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-3)'; (e.currentTarget as HTMLAnchorElement).style.background = 'transparent' }}>
              {label}
            </a>
          ))}
        </div>
      </nav>

      {/* ── COVER ── */}
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '120px 40px 80px', position: 'relative', overflow: 'hidden', maxWidth: 900, margin: '0 auto' }}>
        {/* Ambient glow */}
        <div style={{ position: 'absolute', top: '40%', left: '60%', transform: 'translate(-50%, -50%)', width: 600, height: 500, background: 'radial-gradient(ellipse, rgba(230,183,199,0.22) 0%, rgba(109,158,235,0.1) 50%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 48, alignItems: 'center', position: 'relative' }}>
          {/* Left: wordmark */}
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 20, padding: '5px 14px', marginBottom: 40, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--green)', boxShadow: '0 0 0 3px rgba(76,175,125,0.2)', display: 'inline-block' }} />
              <Mono color="var(--text-3)">{project.currentPhase} · {project.phaseLabel} · {project.lastUpdated}</Mono>
            </div>

            <h1 style={{ fontSize: 'clamp(68px, 11vw, 108px)', fontWeight: 900, letterSpacing: '-0.055em', lineHeight: 0.88, color: 'var(--text-1)', marginBottom: 28 }}>
              {project.name.toUpperCase()}
            </h1>

            <p style={{ fontSize: 'clamp(15px, 2vw, 18px)', color: 'var(--text-2)', fontWeight: 400, letterSpacing: '-0.01em', lineHeight: 1.65, maxWidth: 440, marginBottom: 14 }}>
              {project.tagline}
            </p>

            <p style={{ fontSize: 12, fontFamily: "'JetBrains Mono', monospace", color: 'var(--accent)', letterSpacing: '0.06em', fontWeight: 600 }}>
              {project.subtitle}
            </p>
          </div>

          {/* Right: status panel */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: '24px 24px', minWidth: 200, boxShadow: '0 2px 12px rgba(0,0,0,0.06)', display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Phase */}
            <div>
              <Mono>PHASE</Mono>
              <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.04em', color: 'var(--text-1)', marginTop: 4 }}>{project.currentPhase}</div>
              <div style={{ fontSize: 13, color: 'var(--text-2)', marginTop: 2 }}>{project.phaseLabel}</div>
            </div>
            <div style={{ height: 1, background: 'var(--border)' }} />
            {/* Progress */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <Mono>PROGRESS</Mono>
                <Mono color="var(--accent)">{project.progress}%</Mono>
              </div>
              <div style={{ height: 4, background: 'var(--surface-2)', borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ width: `${project.progress}%`, height: '100%', background: 'linear-gradient(to right, #E6B7C7, #6D9EEB)', borderRadius: 4, transition: 'width 1s ease' }} />
              </div>
            </div>
            <div style={{ height: 1, background: 'var(--border)' }} />
            {/* Status */}
            <div>
              <Mono>ACTIVE TASKS</Mono>
              <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 6 }}>
                {cs.inProgress.map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--accent)', flexShrink: 0 }} />
                    <span style={{ fontSize: 12, color: 'var(--text-2)', lineHeight: 1.4 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ height: 1, background: 'var(--border)' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Mono>UPDATED</Mono>
              <Mono>{project.lastUpdated}</Mono>
            </div>
          </div>
        </div>

        {/* Core message */}
        <div style={{ marginTop: 64, paddingTop: 36, borderTop: '1px solid var(--border)' }}>
          <p style={{ fontSize: 'clamp(22px, 3.5vw, 38px)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.25, color: 'var(--text-1)' }}>
            "장소가 아닌{' '}
            <span style={{ background: 'linear-gradient(135deg, #E6B7C7, #C8698A)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>코스</span>
            를 공유한다."
          </p>
          <p style={{ marginTop: 8, fontSize: 13, color: 'var(--text-3)', fontStyle: 'italic' }}>{project.coreMessage && '— Route Core Thesis'}</p>
        </div>

        <div style={{ position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)' }}>
          <div style={{ width: 1, height: 36, background: 'linear-gradient(to bottom, var(--border-strong), transparent)' }} />
        </div>
      </div>

      <Rule />

      {/* ── VISION ── */}
      <div id="vision">
        <Section>
          <Pad>
            <Fade>
              <SectionLabel>Project Vision</SectionLabel>
              <BigTitle>왜 Route인가</BigTitle>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56 }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
                    <div style={{ width: 28, height: 28, borderRadius: 7, background: 'var(--red-dim)', border: '1px solid rgba(212,90,90,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>✕</div>
                    <Mono color="var(--red)">PROBLEM</Mono>
                  </div>
                  <h3 style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text-1)', lineHeight: 1.25, marginBottom: 16 }}>{vis.problem.title}</h3>
                  <p style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.85 }}>{vis.problem.desc}</p>
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
                    <div style={{ width: 28, height: 28, borderRadius: 7, background: 'var(--green-dim)', border: '1px solid rgba(76,175,125,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>✓</div>
                    <Mono color="var(--green)">SOLUTION</Mono>
                  </div>
                  <h3 style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text-1)', lineHeight: 1.25, marginBottom: 16 }}>{vis.solution.title}</h3>
                  <p style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.85 }}>{vis.solution.desc}</p>
                </div>
              </div>
            </Fade>
          </Pad>
        </Section>
      </div>

      <Rule />

      {/* ── CURRENT STATUS — project log style ── */}
      <div id="status">
        <Section>
          <Pad>
            <Fade>
              <SectionLabel>Current Status</SectionLabel>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 40 }}>
                <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.1, color: 'var(--text-1)' }}>
                  {cs.phase}
                </h2>
              </div>

              {/* Log layout */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                {/* Header */}
                <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr auto', gap: 16, padding: '10px 20px', background: 'var(--surface-2)', borderBottom: '1px solid var(--border)' }}>
                  <Mono>STATUS</Mono>
                  <Mono>TASK</Mono>
                  <Mono>TYPE</Mono>
                </div>

                {/* Completed rows */}
                {cs.completed.map((item, i) => (
                  <div key={`c-${i}`} style={{ display: 'grid', gridTemplateColumns: '120px 1fr auto', gap: 16, padding: '13px 20px', borderBottom: '1px solid var(--border)', alignItems: 'center', background: 'transparent' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                      <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--green)', display: 'inline-block' }} />
                      <Mono color="var(--green)">Done</Mono>
                    </div>
                    <span style={{ fontSize: 13, color: 'var(--text-3)', textDecoration: 'line-through', textDecorationColor: 'rgba(0,0,0,0.15)' }}>{item}</span>
                    <Tag>완료</Tag>
                  </div>
                ))}

                {/* In Progress rows — highlighted */}
                {cs.inProgress.map((item, i) => (
                  <div key={`ip-${i}`} style={{ display: 'grid', gridTemplateColumns: '120px 1fr auto', gap: 16, padding: '14px 20px', borderBottom: '1px solid var(--border)', alignItems: 'center', background: 'rgba(200,105,138,0.03)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                      <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 0 3px rgba(200,105,138,0.2)', display: 'inline-block' }} />
                      <Mono color="var(--accent)">Active</Mono>
                    </div>
                    <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-1)' }}>{item}</span>
                    <Tag color="var(--accent)">진행 중</Tag>
                  </div>
                ))}

                {/* Next rows */}
                {cs.next.map((item, i) => (
                  <div key={`n-${i}`} style={{ display: 'grid', gridTemplateColumns: '120px 1fr auto', gap: 16, padding: '13px 20px', borderBottom: i < cs.next.length - 1 ? '1px solid var(--border)' : 'none', alignItems: 'center', opacity: 0.6 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                      <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--text-3)', display: 'inline-block', border: '1.5px solid var(--text-3)', boxSizing: 'border-box', background: 'transparent' as any }} />
                      <Mono>Backlog</Mono>
                    </div>
                    <span style={{ fontSize: 13, color: 'var(--text-2)' }}>{item}</span>
                    <Tag>예정</Tag>
                  </div>
                ))}
              </div>

              {/* Summary strip */}
              <div style={{ marginTop: 20, display: 'flex', gap: 16 }}>
                {[
                  { label: '완료', count: cs.completed.length, color: 'var(--green)' },
                  { label: '진행 중', count: cs.inProgress.length, color: 'var(--accent)' },
                  { label: '예정', count: cs.next.length, color: 'var(--text-3)' },
                ].map(({ label, count, color }) => (
                  <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 18, fontWeight: 800, color, fontVariantNumeric: 'tabular-nums' }}>{count}</span>
                    <span style={{ fontSize: 12, color: 'var(--text-3)' }}>{label}</span>
                  </div>
                ))}
              </div>
            </Fade>
          </Pad>
        </Section>
      </div>

      <Rule />

      {/* ── FEATURES ── */}
      <div id="features">
        <Section>
          <Pad>
            <Fade>
              <SectionLabel>Core Features</SectionLabel>
              <BigTitle>{feats.length}가지 핵심 기능</BigTitle>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {feats.map((f, i) => (
                  <div key={f.num} style={{ display: 'grid', gridTemplateColumns: '48px 1fr 1fr', gap: 28, padding: '24px 0', borderTop: '1px solid var(--border)', borderBottom: i === feats.length - 1 ? '1px solid var(--border)' : 'none', alignItems: 'start' }}>
                    <Mono>{f.num}</Mono>
                    <div>
                      <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text-1)', marginBottom: 6 }}>{f.title}</div>
                      <Tag color="var(--accent)">{f.ko}</Tag>
                    </div>
                    <p style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.75, paddingTop: 2 }}>{f.desc}</p>
                  </div>
                ))}
              </div>
            </Fade>
          </Pad>
        </Section>
      </div>

      <Rule />

      {/* ── UX FLOW ── */}
      <Section>
        <Pad>
          <Fade>
            <SectionLabel>User Experience Flow</SectionLabel>
            <BigTitle>사용자 여정</BigTitle>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', position: 'relative' }}>
              <div style={{ position: 'absolute', top: 28, left: '12.5%', right: '12.5%', height: 1, background: 'linear-gradient(to right, var(--accent), var(--blue))' }} />
              {FLOW.map((step, i) => (
                <div key={step} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
                  <div style={{ width: 56, height: 56, borderRadius: '50%', background: i === 0 ? 'linear-gradient(135deg, #E6B7C7, #C8698A)' : 'var(--surface)', border: `1px solid ${i === 0 ? 'transparent' : 'var(--border)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: i === 0 ? 'white' : 'var(--text-3)', fontFamily: "'JetBrains Mono', monospace", position: 'relative', zIndex: 1, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-1)', letterSpacing: '-0.02em', marginBottom: 3 }}>{step}</div>
                    <div style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: 'var(--accent)', marginBottom: 8, fontWeight: 600 }}>{FLOW_KO[i]}</div>
                    <div style={{ fontSize: 13, color: 'var(--text-3)', lineHeight: 1.55 }}>{FLOW_DESC[i]}</div>
                  </div>
                </div>
              ))}
            </div>
          </Fade>
        </Pad>
      </Section>

      <Rule />

      {/* ── DESIGN SYSTEM — brand doc style ── */}
      <div id="design">
        <Section>
          <Pad>
            <Fade>
              <SectionLabel>Design System</SectionLabel>
              <BigTitle>브랜드 & 디자인 원칙</BigTitle>

              {/* Design Principles — featured */}
              <div style={{ marginBottom: 52 }}>
                <Mono>DESIGN PRINCIPLES</Mono>
                <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
                  {ds.principles.map((p, i) => (
                    <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: '22px 18px', position: 'relative', overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                      <div style={{ position: 'absolute', top: 14, right: 16, fontFamily: "'JetBrains Mono', monospace", fontSize: 28, fontWeight: 800, color: 'var(--accent)', opacity: 0.08, lineHeight: 1 }}>
                        {String(i + 1).padStart(2, '0')}
                      </div>
                      <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--accent)', letterSpacing: '-0.02em', marginBottom: 10 }}>{p.title}</div>
                      <p style={{ fontSize: 12, color: 'var(--text-3)', lineHeight: 1.7 }}>{p.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Color system */}
              <div style={{ marginBottom: 44 }}>
                <Mono>COLOR SYSTEM</Mono>
                <div style={{ marginTop: 16, display: 'flex', gap: 10 }}>
                  {ds.colors.map(c => (
                    <div key={c.name} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
                      <div style={{ height: 72, borderRadius: 12, background: c.hex, border: '1px solid var(--border)', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }} />
                      <div style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", color: 'var(--text-3)' }}>{c.hex}</div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-2)' }}>{c.label}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-3)' }}>{c.name}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }}>
                {/* Typography */}
                <div>
                  <Mono>TYPOGRAPHY</Mono>
                  <div style={{ marginTop: 16, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '20px 18px' }}>
                    <div style={{ fontSize: 36, fontWeight: 900, letterSpacing: '-0.04em', color: 'var(--text-1)', lineHeight: 1 }}>Aa</div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-1)', marginTop: 10 }}>{ds.typography}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 3 }}>Korean + Latin variable font</div>
                    <div style={{ marginTop: 14, height: 1, background: 'var(--border)' }} />
                    <div style={{ marginTop: 12, fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'var(--text-3)' }}>JetBrains Mono / monospace</div>
                  </div>
                </div>
                {/* Brand keywords */}
                <div>
                  <Mono>BRAND KEYWORDS</Mono>
                  <div style={{ marginTop: 16, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {ds.brandKeywords.map(k => (
                      <span key={k} style={{ fontSize: 14, fontWeight: 700, color: 'var(--accent)', background: 'var(--accent-soft)', borderRadius: 8, padding: '8px 16px' }}>{k}</span>
                    ))}
                  </div>
                  <Mono style={{ display: 'block', marginTop: 24 }}>DESIGN REFERENCES</Mono>
                  <div style={{ marginTop: 10, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {ds.designReferences.map(r => (
                      <span key={r} style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-2)', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 7, padding: '5px 13px' }}>{r}</span>
                    ))}
                  </div>
                </div>
              </div>
            </Fade>
          </Pad>
        </Section>
      </div>

      <Rule />

      {/* ── TECH ── */}
      <div id="tech">
        <Section>
          <Pad>
            <Fade>
              <SectionLabel>Technical Architecture</SectionLabel>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'start' }}>
                <div>
                  <BigTitle>검증된 기술 스택</BigTitle>
                  <p style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.85 }}>확장성과 개발 속도를 모두 잡기 위해 React Native와 Firebase를 선택했습니다. 단일 코드베이스로 iOS와 Android를 동시에 지원합니다.</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                  {stack.map((s, i) => (
                    <div key={s.layer} style={{ display: 'grid', gridTemplateColumns: '90px 1fr auto', alignItems: 'center', gap: 16, padding: '14px 20px', borderBottom: i < stack.length - 1 ? '1px solid var(--border)' : 'none' }}>
                      <Mono>{s.layer}</Mono>
                      <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-1)' }}>{s.value}</span>
                      <Tag>{s.note}</Tag>
                    </div>
                  ))}
                </div>
              </div>
            </Fade>
          </Pad>
        </Section>
      </div>

      <Rule />

      {/* ── TEAM ── */}
      <div id="team">
        <Section>
          <Pad>
            <Fade>
              <SectionLabel>AI Team</SectionLabel>
              <BigTitle>AI가 팀을 이룹니다</BigTitle>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }}>
                {agents.map(agent => (
                  <div key={agent.name} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: '26px 22px', display: 'flex', flexDirection: 'column', gap: 18, boxShadow: '0 1px 4px rgba(0,0,0,0.04)', transition: 'box-shadow 0.2s' }}
                    onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 16px rgba(0,0,0,0.1)'}
                    onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.boxShadow = '0 1px 4px rgba(0,0,0,0.04)'}>
                    <div style={{ width: 42, height: 42, borderRadius: 10, background: agent.color + '18', border: `1px solid ${agent.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, color: agent.color }}>{agent.icon}</div>
                    <div>
                      <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text-1)', marginBottom: 3 }}>{agent.name}</div>
                      <div style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: agent.color, fontWeight: 600, marginBottom: 14 }}>{agent.role}</div>
                      <div style={{ height: 1, background: 'var(--border)', marginBottom: 12 }} />
                      <p style={{ fontSize: 13, color: 'var(--text-3)', lineHeight: 1.65 }}>{agent.ko}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Fade>
          </Pad>
        </Section>
      </div>

      <Rule />

      {/* ── DECISION LOG — table style ── */}
      <Section>
        <Pad>
          <Fade>
            <SectionLabel>Decision Log</SectionLabel>
            <BigTitle>주요 의사결정</BigTitle>
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
              {/* Table header */}
              <div style={{ display: 'grid', gridTemplateColumns: '80px 220px 1fr', gap: 24, padding: '10px 24px', background: 'var(--surface-2)', borderBottom: '1px solid var(--border)' }}>
                <Mono>DATE</Mono>
                <Mono>DECISION</Mono>
                <Mono>REASON</Mono>
              </div>
              {/* Table rows */}
              {decisionLog.map((d, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '80px 220px 1fr', gap: 24, padding: '18px 24px', borderBottom: i < decisionLog.length - 1 ? '1px solid var(--border)' : 'none', alignItems: 'start', transition: 'background 0.15s' }}
                  onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.background = 'var(--surface-2)'}
                  onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.background = 'transparent'}>
                  <Mono>{d.date}</Mono>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-1)', letterSpacing: '-0.02em', lineHeight: 1.4 }}>{d.title}</div>
                  <p style={{ fontSize: 13, color: 'var(--text-3)', lineHeight: 1.75 }}>{d.reason}</p>
                </div>
              ))}
            </div>
          </Fade>
        </Pad>
      </Section>

      <Rule />

      {/* ── ROADMAP — timeline style ── */}
      <div id="roadmap">
        <Section>
          <Pad>
            <Fade>
              <SectionLabel>Roadmap</SectionLabel>
              <BigTitle>개발 로드맵</BigTitle>

              {/* Horizontal timeline */}
              <div style={{ position: 'relative', paddingBottom: 48 }}>
                {/* Track line */}
                <div style={{ position: 'absolute', top: 20, left: 0, right: 0, height: 2, background: 'var(--border)', borderRadius: 2 }} />
                {/* Active progress */}
                <div style={{ position: 'absolute', top: 20, left: 0, width: `${(1 / rm.length) * 100}%`, height: 2, background: 'linear-gradient(to right, #E6B7C7, #C8698A)', borderRadius: 2 }} />

                <div style={{ display: 'grid', gridTemplateColumns: `repeat(${rm.length}, 1fr)`, position: 'relative' }}>
                  {rm.map((r) => {
                    const isActive = r.status === 'active'
                    const isNext = r.status === 'next'
                    const isDone = r.status === 'done'
                    return (
                      <div key={r.phase} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, paddingTop: 0 }}>
                        {/* Node */}
                        <div style={{
                          width: isActive ? 40 : 32, height: isActive ? 40 : 32,
                          borderRadius: '50%',
                          background: isActive ? 'linear-gradient(135deg, #E6B7C7, #C8698A)' : isDone ? 'var(--green)' : 'var(--surface)',
                          border: `2px solid ${isActive ? 'transparent' : isNext ? 'var(--amber)' : 'var(--border)'}`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          position: 'relative', zIndex: 1,
                          boxShadow: isActive ? '0 0 0 6px rgba(200,105,138,0.15), 0 2px 12px rgba(200,105,138,0.3)' : '0 2px 6px rgba(0,0,0,0.08)',
                          transition: 'all 0.3s',
                          marginTop: isActive ? -4 : 0,
                        }}>
                          <span style={{ fontSize: 10, fontWeight: 700, color: isActive ? 'white' : isNext ? 'var(--amber)' : 'var(--text-3)', fontFamily: "'JetBrains Mono', monospace" }}>
                            {r.phase}
                          </span>
                        </div>
                        {/* Label */}
                        <div style={{ textAlign: 'center', paddingTop: 6 }}>
                          <div style={{ fontSize: 12, fontWeight: isActive ? 800 : 500, color: isActive ? 'var(--text-1)' : 'var(--text-3)', letterSpacing: '-0.01em', marginBottom: 4, lineHeight: 1.3 }}>{r.label}</div>
                          {isActive && (
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: 'var(--accent-dim)', borderRadius: 6, padding: '2px 7px' }}>
                              <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--accent)', display: 'inline-block' }} />
                              <Mono color="var(--accent)">NOW</Mono>
                            </div>
                          )}
                          {isNext && (
                            <Mono color="var(--amber)">Next</Mono>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </Fade>
          </Pad>
        </Section>
      </div>

      <Rule />

      {/* ── FUTURE VISION — AI focused ── */}
      <div id="future">
        <Section>
          <Pad>
            <Fade>
              <SectionLabel>Future Vision</SectionLabel>
              <BigTitle>Route의 미래</BigTitle>

              {/* Featured vision item */}
              <div style={{ background: 'linear-gradient(135deg, rgba(200,105,138,0.06) 0%, rgba(109,158,235,0.06) 100%)', border: '1px solid rgba(200,105,138,0.2)', borderRadius: 18, padding: '32px 32px', marginBottom: 20, display: 'grid', gridTemplateColumns: '1fr auto', gap: 32, alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", color: 'var(--accent)', letterSpacing: '0.12em', fontWeight: 700, marginBottom: 12 }}>CORE VISION</div>
                  <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.04em', color: 'var(--text-1)', marginBottom: 12, lineHeight: 1.2 }}>AI Travel Assistant</div>
                  <p style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.8, maxWidth: 440 }}>
                    사용자의 취향과 이동 패턴을 학습하고, 대화형 AI로 최적의 여행 코스를 자동 생성합니다. Route는 단순한 지도 앱을 넘어 개인 여행 비서로 진화합니다.
                  </p>
                  <div style={{ marginTop: 16, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {['개인화 추천', '자동 일정 생성', '대화형 계획', '취향 학습'].map(tag => (
                      <Tag key={tag} color="var(--accent)">{tag}</Tag>
                    ))}
                  </div>
                </div>
                <div style={{ fontSize: 72, opacity: 0.15, lineHeight: 1 }}>✦</div>
              </div>

              {/* Sub-visions */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
                {futureVision.slice(1).map((f, i) => (
                  <div key={f.num} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: '22px 20px', display: 'flex', flexDirection: 'column', gap: 10, boxShadow: '0 1px 4px rgba(0,0,0,0.04)', transition: 'all 0.2s' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 16px rgba(200,105,138,0.1)'; (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(200,105,138,0.25)' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = '0 1px 4px rgba(0,0,0,0.04)'; (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border)' }}>
                    <Mono color="var(--accent)">{f.num}</Mono>
                    <div style={{ fontSize: 16, fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text-1)', lineHeight: 1.3 }}>{f.title}</div>
                    <p style={{ fontSize: 13, color: 'var(--text-3)', lineHeight: 1.7 }}>{f.desc}</p>
                  </div>
                ))}
              </div>
            </Fade>
          </Pad>
        </Section>
      </div>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: '1px solid var(--border)', padding: '28px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: 900, margin: '0 auto', width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 18, height: 18, borderRadius: 4, background: 'linear-gradient(135deg, #E6B7C7, #6D9EEB)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="9" height="9" viewBox="0 0 12 12" fill="none"><path d="M2 9L6 3L10 9" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
          <span style={{ fontWeight: 800, fontSize: 13, letterSpacing: '-0.02em' }}>{project.name}</span>
          <span style={{ fontSize: 12, color: 'var(--text-3)', marginLeft: 4 }}>Project HQ</span>
        </div>
        <Mono>{project.lastUpdated} · Every Course, Every Memory.</Mono>
      </footer>
    </div>
  )
}
