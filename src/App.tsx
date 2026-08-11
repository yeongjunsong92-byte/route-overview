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
function useInView(threshold = 0.12) {
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
function Fade({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  const { ref, visible } = useInView()
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(20px)', transition: 'opacity 0.55s ease, transform 0.55s ease', ...style }}>
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

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28 }}>
      <span style={{ width: 18, height: 1, background: 'var(--accent)', display: 'inline-block' }} />
      <span style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.14em', color: 'var(--accent)', textTransform: 'uppercase', fontWeight: 600 }}>
        {children}
      </span>
    </div>
  )
}

function BigTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{ fontSize: 'clamp(34px, 5vw, 52px)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.08, color: 'var(--text-1)', marginBottom: 56 }}>
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

  const navItems = ['Vision', 'Status', 'Features', 'Design', 'Tech', 'Team', 'Roadmap', 'Future']

  return (
    <div style={{ background: 'var(--bg)', color: 'var(--text-1)', overflowX: 'hidden' }}>

      {/* ── NAV ── */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, height: 52, display: 'flex', alignItems: 'center', padding: '0 40px', justifyContent: 'space-between', background: scrollY > 60 ? 'rgba(245,245,247,0.9)' : 'transparent', backdropFilter: scrollY > 60 ? 'blur(16px)' : 'none', borderBottom: scrollY > 60 ? '1px solid var(--border)' : '1px solid transparent', transition: 'all 0.3s' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 24, height: 24, borderRadius: 6, background: 'linear-gradient(135deg, #E6B7C7, #6D9EEB)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 9L6 3L10 9" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
          <span style={{ fontWeight: 800, fontSize: 15, letterSpacing: '-0.03em', color: 'var(--text-1)' }}>{project.name}</span>
        </div>
        <div style={{ display: 'flex', gap: 4 }}>
          {navItems.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} style={{ fontSize: 12, color: 'var(--text-3)', textDecoration: 'none', padding: '4px 8px', borderRadius: 5, transition: 'all 0.15s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-1)'; (e.currentTarget as HTMLAnchorElement).style.background = 'var(--surface)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-3)'; (e.currentTarget as HTMLAnchorElement).style.background = 'transparent' }}>
              {l}
            </a>
          ))}
        </div>
      </nav>

      {/* ── COVER ── */}
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '120px 40px 80px', position: 'relative', overflow: 'hidden' }}>
        {/* Ambient */}
        <div style={{ position: 'absolute', top: '35%', left: '50%', transform: 'translate(-50%, -50%)', width: 700, height: 500, background: 'radial-gradient(ellipse, rgba(230,183,199,0.25) 0%, rgba(109,158,235,0.1) 50%, transparent 70%)', pointerEvents: 'none' }} />

        {/* Badge */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 20, padding: '5px 14px', marginBottom: 44, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--green)', boxShadow: '0 0 0 3px rgba(76,175,125,0.2)', display: 'inline-block' }} />
          <span style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: 'var(--text-3)', letterSpacing: '0.08em' }}>
            {project.currentPhase} · In Development · {project.lastUpdated}
          </span>
        </div>

        {/* Wordmark */}
        <h1 style={{ fontSize: 'clamp(72px, 12vw, 120px)', fontWeight: 900, letterSpacing: '-0.05em', lineHeight: 0.88, color: 'var(--text-1)', marginBottom: 28 }}>
          {project.name.toUpperCase()}
        </h1>

        <p style={{ fontSize: 'clamp(15px, 2.2vw, 20px)', color: 'var(--text-2)', fontWeight: 400, letterSpacing: '-0.01em', lineHeight: 1.6, maxWidth: 480, marginBottom: 16 }}>
          {project.tagline}
        </p>

        <p style={{ fontSize: 12, fontFamily: "'JetBrains Mono', monospace", color: 'var(--accent)', letterSpacing: '0.06em', fontWeight: 600 }}>
          {project.subtitle}
        </p>

        {/* Progress bar */}
        <div style={{ marginTop: 52, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 200, height: 3, background: 'var(--surface-2)', borderRadius: 3, overflow: 'hidden', border: '1px solid var(--border)' }}>
            <div style={{ width: `${project.progress}%`, height: '100%', background: 'linear-gradient(to right, #E6B7C7, #6D9EEB)', borderRadius: 3 }} />
          </div>
          <span style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: 'var(--text-3)' }}>
            {project.phaseLabel} · {project.progress}% 완료
          </span>
        </div>

        <div style={{ position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)' }}>
          <div style={{ width: 1, height: 36, background: 'linear-gradient(to bottom, var(--border-strong), transparent)' }} />
        </div>
      </div>

      {/* Core Message */}
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 40px 88px', textAlign: 'center' }}>
        <Fade>
          <p style={{ fontSize: 'clamp(26px, 4vw, 44px)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.25, color: 'var(--text-1)' }}>
            "장소가 아닌{' '}
            <span style={{ background: 'linear-gradient(135deg, #E6B7C7, #C8698A)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>코스</span>
            를 공유한다."
          </p>
        </Fade>
      </div>

      <Rule />

      {/* ── VISION ── */}
      <div id="vision">
        <Section>
          <Pad>
            <Fade>
              <SectionLabel>Project Vision</SectionLabel>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56 }}>
                <div>
                  <div style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", color: 'var(--red)', letterSpacing: '0.12em', fontWeight: 700, marginBottom: 16 }}>PROBLEM</div>
                  <h3 style={{ fontSize: 26, fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text-1)', lineHeight: 1.25, marginBottom: 16 }}>{vis.problem.title}</h3>
                  <p style={{ fontSize: 15, color: 'var(--text-2)', lineHeight: 1.8 }}>{vis.problem.desc}</p>
                </div>
                <div>
                  <div style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", color: 'var(--green)', letterSpacing: '0.12em', fontWeight: 700, marginBottom: 16 }}>SOLUTION</div>
                  <h3 style={{ fontSize: 26, fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text-1)', lineHeight: 1.25, marginBottom: 16 }}>{vis.solution.title}</h3>
                  <p style={{ fontSize: 15, color: 'var(--text-2)', lineHeight: 1.8 }}>{vis.solution.desc}</p>
                </div>
              </div>
            </Fade>
          </Pad>
        </Section>
      </div>

      <Rule />

      {/* ── CURRENT STATUS ── */}
      <div id="status">
        <Section>
          <Pad>
            <Fade>
              <SectionLabel>Current Status</SectionLabel>
              <BigTitle>{cs.phase}</BigTitle>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
                {/* Completed */}
                <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: '24px 22px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 20 }}>
                    <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--green)', display: 'inline-block' }} />
                    <span style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", color: 'var(--green)', letterSpacing: '0.1em', fontWeight: 700 }}>COMPLETED</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
                    {cs.completed.map((item, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 9 }}>
                        <span style={{ fontSize: 13, color: 'var(--green)', marginTop: 1, flexShrink: 0 }}>✓</span>
                        <span style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.5 }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* In Progress */}
                <div style={{ background: 'var(--surface)', border: `1px solid var(--accent)30`, borderRadius: 14, padding: '24px 22px', boxShadow: '0 1px 4px rgba(200,105,138,0.08)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 20 }}>
                    <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--accent)', display: 'inline-block', boxShadow: '0 0 0 3px rgba(200,105,138,0.2)' }} />
                    <span style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", color: 'var(--accent)', letterSpacing: '0.1em', fontWeight: 700 }}>IN PROGRESS</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
                    {cs.inProgress.map((item, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 9 }}>
                        <span style={{ fontSize: 13, color: 'var(--accent)', marginTop: 1, flexShrink: 0 }}>◉</span>
                        <span style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.5 }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Next */}
                <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: '24px 22px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 20 }}>
                    <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--text-3)', display: 'inline-block' }} />
                    <span style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", color: 'var(--text-3)', letterSpacing: '0.1em', fontWeight: 700 }}>NEXT</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
                    {cs.next.map((item, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 9 }}>
                        <span style={{ fontSize: 13, color: 'var(--text-3)', marginTop: 1, flexShrink: 0 }}>○</span>
                        <span style={{ fontSize: 13, color: 'var(--text-3)', lineHeight: 1.5 }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
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
                    <span style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: 'var(--text-3)', paddingTop: 3 }}>{f.num}</span>
                    <div>
                      <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text-1)', marginBottom: 4 }}>{f.title}</div>
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

      {/* ── DESIGN SYSTEM ── */}
      <div id="design">
        <Section>
          <Pad>
            <Fade>
              <SectionLabel>Design System</SectionLabel>
              <BigTitle>브랜드 & 디자인</BigTitle>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, marginBottom: 48 }}>
                {/* Brand keywords */}
                <div>
                  <div style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: 'var(--text-3)', letterSpacing: '0.1em', marginBottom: 16 }}>BRAND KEYWORDS</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {ds.brandKeywords.map(k => (
                      <span key={k} style={{ fontSize: 14, fontWeight: 700, color: 'var(--accent)', background: 'var(--accent-soft)', borderRadius: 8, padding: '6px 14px' }}>{k}</span>
                    ))}
                  </div>
                </div>
                {/* Design references */}
                <div>
                  <div style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: 'var(--text-3)', letterSpacing: '0.1em', marginBottom: 16 }}>DESIGN REFERENCES</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {ds.designReferences.map(r => (
                      <span key={r} style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-2)', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 7, padding: '5px 13px' }}>{r}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Color swatches */}
              <div style={{ marginBottom: 44 }}>
                <div style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: 'var(--text-3)', letterSpacing: '0.1em', marginBottom: 16 }}>COLOR SYSTEM</div>
                <div style={{ display: 'flex', gap: 12 }}>
                  {ds.colors.map(c => (
                    <div key={c.name} style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
                      <div style={{ height: 56, borderRadius: 10, background: c.hex, border: '1px solid var(--border)', boxShadow: '0 2px 6px rgba(0,0,0,0.06)' }} />
                      <div style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", color: 'var(--text-3)' }}>{c.hex}</div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-2)' }}>{c.name}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Principles */}
              <div>
                <div style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: 'var(--text-3)', letterSpacing: '0.1em', marginBottom: 16 }}>DESIGN PRINCIPLES</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
                  {ds.principles.map((p, i) => (
                    <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '20px 18px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                      <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-1)', marginBottom: 8 }}>{p.title}</div>
                      <p style={{ fontSize: 13, color: 'var(--text-3)', lineHeight: 1.65 }}>{p.desc}</p>
                    </div>
                  ))}
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
                  <BigTitle>검증된{'\n'}기술 스택</BigTitle>
                  <p style={{ fontSize: 15, color: 'var(--text-2)', lineHeight: 1.8 }}>확장성과 개발 속도를 모두 잡기 위해 React Native와 Firebase를 선택했습니다. 단일 코드베이스로 iOS와 Android를 동시에 지원합니다.</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                  {stack.map((s, i) => (
                    <div key={s.layer} style={{ display: 'grid', gridTemplateColumns: '90px 1fr auto', alignItems: 'center', gap: 16, padding: '14px 20px', borderBottom: i < stack.length - 1 ? '1px solid var(--border)' : 'none' }}>
                      <span style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", color: 'var(--text-3)', letterSpacing: '0.08em' }}>{s.layer}</span>
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
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
                {agents.map(agent => (
                  <div key={agent.name} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: '28px 24px', display: 'flex', flexDirection: 'column', gap: 20, boxShadow: '0 1px 4px rgba(0,0,0,0.04)', transition: 'box-shadow 0.2s' }}
                    onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 16px rgba(0,0,0,0.1)'}
                    onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.boxShadow = '0 1px 4px rgba(0,0,0,0.04)'}>
                    <div style={{ width: 44, height: 44, borderRadius: 11, background: agent.color + '18', border: `1px solid ${agent.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, color: agent.color }}>{agent.icon}</div>
                    <div>
                      <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text-1)', marginBottom: 3 }}>{agent.name}</div>
                      <div style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: agent.color, fontWeight: 600, marginBottom: 14 }}>{agent.role}</div>
                      <div style={{ height: 1, background: 'var(--border)', marginBottom: 14 }} />
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

      {/* ── DECISION LOG ── */}
      <Section>
        <Pad>
          <Fade>
            <SectionLabel>Decision Log</SectionLabel>
            <BigTitle>주요 의사결정</BigTitle>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {decisionLog.map((d, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: 28, padding: '24px 0', borderTop: '1px solid var(--border)', borderBottom: i === decisionLog.length - 1 ? '1px solid var(--border)' : 'none', alignItems: 'start' }}>
                  <span style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", color: 'var(--text-3)', paddingTop: 4 }}>{d.date}</span>
                  <div>
                    <div style={{ fontSize: 17, fontWeight: 700, color: 'var(--text-1)', letterSpacing: '-0.02em', marginBottom: 8 }}>{d.title}</div>
                    <p style={{ fontSize: 14, color: 'var(--text-3)', lineHeight: 1.7 }}>{d.reason}</p>
                  </div>
                </div>
              ))}
            </div>
          </Fade>
        </Pad>
      </Section>

      <Rule />

      {/* ── ROADMAP ── */}
      <div id="roadmap">
        <Section>
          <Pad>
            <Fade>
              <SectionLabel>Roadmap</SectionLabel>
              <BigTitle>개발 로드맵</BigTitle>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {rm.map((r, i) => {
                  const isActive = r.status === 'active'
                  const isNext = r.status === 'next'
                  return (
                    <div key={r.phase} style={{ display: 'grid', gridTemplateColumns: '40px 28px 1fr auto', gap: 20, alignItems: 'center', padding: '18px 0', borderTop: '1px solid var(--border)', borderBottom: i === rm.length - 1 ? '1px solid var(--border)' : 'none', opacity: r.status === 'planned' ? 0.45 : 1 }}>
                      <span style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", color: 'var(--text-3)' }}>0{r.phase}</span>
                      <div style={{ width: 9, height: 9, borderRadius: '50%', background: isActive ? 'var(--accent)' : isNext ? 'var(--amber)' : 'var(--text-3)', boxShadow: isActive ? '0 0 0 4px rgba(200,105,138,0.2)' : 'none' }} />
                      <span style={{ fontSize: 17, fontWeight: isActive ? 700 : 500, color: isActive ? 'var(--text-1)' : 'var(--text-2)', letterSpacing: '-0.02em' }}>{r.label}</span>
                      <span style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", color: isActive ? 'var(--accent)' : isNext ? 'var(--amber)' : 'var(--text-3)', background: isActive ? 'var(--accent-dim)' : isNext ? 'var(--amber-dim)' : 'transparent', borderRadius: 4, padding: isActive || isNext ? '3px 8px' : '0', fontWeight: 600 }}>
                        {isActive ? '진행 중' : isNext ? '예정' : '계획'}
                      </span>
                    </div>
                  )
                })}
              </div>
            </Fade>
          </Pad>
        </Section>
      </div>

      <Rule />

      {/* ── FUTURE VISION ── */}
      <div id="future">
        <Section>
          <Pad>
            <Fade>
              <SectionLabel>Future Vision</SectionLabel>
              <BigTitle>Route의 미래</BigTitle>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
                {futureVision.map((f, i) => (
                  <div key={f.num} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: '28px 26px', display: 'flex', flexDirection: 'column', gap: 14, boxShadow: '0 1px 4px rgba(0,0,0,0.04)', transition: 'all 0.2s', cursor: 'default' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 20px rgba(200,105,138,0.12)'; (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(200,105,138,0.3)' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = '0 1px 4px rgba(0,0,0,0.04)'; (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border)' }}>
                    <span style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: 'var(--accent)', fontWeight: 700 }}>{f.num}</span>
                    <div style={{ fontSize: 19, fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text-1)' }}>{f.title}</div>
                    <p style={{ fontSize: 14, color: 'var(--text-3)', lineHeight: 1.7 }}>{f.desc}</p>
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
          <span style={{ fontSize: 12, color: 'var(--text-3)', marginLeft: 4 }}>Project Overview</span>
        </div>
        <span style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: 'var(--text-3)' }}>
          {project.lastUpdated} · Every Course, Every Memory.
        </span>
      </footer>
    </div>
  )
}
