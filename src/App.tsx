import { useEffect, useRef, useState } from 'react'

type ProjectData = {
  project: { name: string; subtitle: string; tagline: string; coreMessage: string; currentPhase: string; phaseLabel: string; progress: number; lastUpdated: string }
  vision: { problem: { title: string; desc: string }; solution: { title: string; desc: string } }
  features: { num: string; title: string; ko: string; desc: string }[]
  stack: { layer: string; value: string; note: string }[]
  agents: { name: string; role: string; ko: string; color: string; icon: string }[]
  roadmap: { phase: string; label: string; status: string }[]
}

const FLOW = ['Discover', 'Create', 'Share', 'Navigate']
const FLOW_KO = ['탐색', '제작', '공유', '이동']
const FLOW_DESC = ['지도에서 코스를 발견', '나만의 코스를 설계', '경험을 SNS로 공유', '코스를 따라 이동']

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold })
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

function Section({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return <section style={{ padding: '100px 0', maxWidth: 900, margin: '0 auto', width: '100%', ...style }}>{children}</section>
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.14em', color: 'var(--text-3)', textTransform: 'uppercase', marginBottom: 32, display: 'flex', alignItems: 'center', gap: 12 }}>
      <span style={{ display: 'inline-block', width: 20, height: 1, background: 'var(--border-strong)' }} />
      {children}
    </div>
  )
}

function Divider() {
  return <div style={{ height: 1, background: 'var(--border)', maxWidth: 900, margin: '0 auto' }} />
}

export default function App() {
  const [data, setData] = useState<ProjectData | null>(null)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => { fetch('/data.json').then(r => r.json()).then(setData) }, [])
  useEffect(() => {
    const h = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])

  const vision = useInView()
  const features = useInView()
  const flow = useInView()
  const tech = useInView()
  const team = useInView()
  const roadmap = useInView()

  if (!data) return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)', color: 'var(--text-3)', fontFamily: "'JetBrains Mono', monospace", fontSize: 12 }}>
      Loading...
    </div>
  )

  const { project, vision: vis, features: feats, stack, agents, roadmap: rm } = data

  return (
    <div style={{ background: 'var(--bg)', color: 'var(--text-1)', overflowX: 'hidden' }}>
      {/* NAV */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, height: 52, display: 'flex', alignItems: 'center', padding: '0 40px', justifyContent: 'space-between', background: scrollY > 60 ? 'rgba(8,8,10,0.88)' : 'transparent', backdropFilter: scrollY > 60 ? 'blur(12px)' : 'none', borderBottom: scrollY > 60 ? '1px solid var(--border)' : '1px solid transparent', transition: 'background 0.3s, border-color 0.3s' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 20, height: 20, borderRadius: 5, background: 'linear-gradient(135deg, #5e6ad2, #3ecba5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2 9L6 3L10 9" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
          <span style={{ fontWeight: 700, fontSize: 14, letterSpacing: '-0.02em' }}>{project.name}</span>
        </div>
        <div style={{ display: 'flex', gap: 28 }}>
          {['Vision', 'Features', 'Tech', 'Team', 'Roadmap'].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} style={{ fontSize: 13, color: 'var(--text-3)', textDecoration: 'none' }}
              onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-1)')}
              onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-3)')}>{l}</a>
          ))}
        </div>
      </nav>

      {/* COVER */}
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '120px 40px 80px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%, -50%)', width: 600, height: 400, background: 'radial-gradient(ellipse, rgba(94,106,210,0.12) 0%, rgba(62,203,165,0.05) 50%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, border: '1px solid var(--border-strong)', borderRadius: 20, padding: '5px 14px', marginBottom: 48 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--green)', boxShadow: '0 0 0 3px rgba(62,203,165,0.2)', display: 'inline-block' }} />
          <span style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: 'var(--text-3)', letterSpacing: '0.08em' }}>{project.currentPhase} · In Development · {project.lastUpdated}</span>
        </div>
        <h1 style={{ fontSize: 'clamp(72px, 12vw, 120px)', fontWeight: 800, letterSpacing: '-0.05em', lineHeight: 0.9, color: 'var(--text-1)', marginBottom: 24 }}>{project.name.toUpperCase()}</h1>
        <p style={{ fontSize: 'clamp(16px, 2.5vw, 22px)', color: 'var(--text-2)', fontWeight: 400, letterSpacing: '-0.02em', lineHeight: 1.5, maxWidth: 520, marginBottom: 16 }}>{project.tagline}</p>
        <p style={{ fontSize: 13, fontFamily: "'JetBrains Mono', monospace", color: 'var(--accent)', letterSpacing: '0.04em' }}>{project.subtitle}</p>
        <div style={{ position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)' }}>
          <div style={{ width: 1, height: 40, background: 'linear-gradient(to bottom, var(--border-strong), transparent)' }} />
        </div>
      </div>

      {/* CORE MESSAGE */}
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 40px 100px', textAlign: 'center' }}>
        <p style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1.2, color: 'var(--text-1)' }}>
          "<span style={{ background: 'linear-gradient(135deg, #5e6ad2, #3ecba5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{project.coreMessage}</span>"
        </p>
      </div>

      <Divider />

      {/* VISION */}
      <div id="vision">
        <Section>
          <div ref={vision.ref} style={{ padding: '0 40px', opacity: vision.visible ? 1 : 0, transform: vision.visible ? 'none' : 'translateY(24px)', transition: 'opacity 0.6s ease, transform 0.6s ease' }}>
            <SectionLabel>Project Vision</SectionLabel>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60 }}>
              <div>
                <div style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: 'var(--red)', letterSpacing: '0.1em', marginBottom: 20 }}>PROBLEM</div>
                <h3 style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--text-1)', lineHeight: 1.2, marginBottom: 20 }}>{vis.problem.title}</h3>
                <p style={{ fontSize: 15, color: 'var(--text-3)', lineHeight: 1.75 }}>{vis.problem.desc}</p>
              </div>
              <div>
                <div style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: 'var(--green)', letterSpacing: '0.1em', marginBottom: 20 }}>SOLUTION</div>
                <h3 style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--text-1)', lineHeight: 1.2, marginBottom: 20 }}>{vis.solution.title}</h3>
                <p style={{ fontSize: 15, color: 'var(--text-3)', lineHeight: 1.75 }}>{vis.solution.desc}</p>
              </div>
            </div>
          </div>
        </Section>
      </div>

      <Divider />

      {/* FEATURES */}
      <div id="features">
        <Section>
          <div ref={features.ref} style={{ padding: '0 40px', opacity: features.visible ? 1 : 0, transform: features.visible ? 'none' : 'translateY(24px)', transition: 'opacity 0.6s ease, transform 0.6s ease' }}>
            <SectionLabel>Core Features</SectionLabel>
            <h2 style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.05, color: 'var(--text-1)', marginBottom: 64 }}>{feats.length}가지 핵심 기능</h2>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {feats.map((f, i) => (
                <div key={f.num} style={{ display: 'grid', gridTemplateColumns: '56px 1fr 1fr', gap: 32, padding: '28px 0', borderTop: '1px solid var(--border)', borderBottom: i === feats.length - 1 ? '1px solid var(--border)' : 'none', alignItems: 'start' }}>
                  <span style={{ fontSize: 12, fontFamily: "'JetBrains Mono', monospace", color: 'var(--text-3)', paddingTop: 4 }}>{f.num}</span>
                  <div>
                    <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text-1)', marginBottom: 4 }}>{f.title}</div>
                    <div style={{ fontSize: 12, fontFamily: "'JetBrains Mono', monospace", color: 'var(--accent)' }}>{f.ko}</div>
                  </div>
                  <p style={{ fontSize: 14, color: 'var(--text-3)', lineHeight: 1.7, paddingTop: 3 }}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>
      </div>

      <Divider />

      {/* UX FLOW */}
      <Section>
        <div ref={flow.ref} style={{ padding: '0 40px', opacity: flow.visible ? 1 : 0, transform: flow.visible ? 'none' : 'translateY(24px)', transition: 'opacity 0.6s ease, transform 0.6s ease' }}>
          <SectionLabel>User Experience Flow</SectionLabel>
          <h2 style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.05, color: 'var(--text-1)', marginBottom: 64 }}>사용자 여정</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 28, left: '12.5%', right: '12.5%', height: 1, background: 'linear-gradient(to right, var(--accent), var(--border))' }} />
            {FLOW.map((step, i) => (
              <div key={step} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
                <div style={{ width: 56, height: 56, borderRadius: '50%', background: i === 0 ? 'var(--accent)' : 'var(--surface)', border: `1px solid ${i === 0 ? 'var(--accent)' : 'var(--border-strong)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: i === 0 ? 'white' : 'var(--text-3)', fontFamily: "'JetBrains Mono', monospace", position: 'relative', zIndex: 1 }}>{String(i + 1).padStart(2, '0')}</div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-1)', letterSpacing: '-0.02em', marginBottom: 4 }}>{step}</div>
                  <div style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: 'var(--text-3)', marginBottom: 8 }}>{FLOW_KO[i]}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-3)', lineHeight: 1.5 }}>{FLOW_DESC[i]}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Divider />

      {/* TECH */}
      <div id="tech">
        <Section>
          <div ref={tech.ref} style={{ padding: '0 40px', opacity: tech.visible ? 1 : 0, transform: tech.visible ? 'none' : 'translateY(24px)', transition: 'opacity 0.6s ease, transform 0.6s ease' }}>
            <SectionLabel>Technical Architecture</SectionLabel>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'start' }}>
              <div>
                <h2 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.1, color: 'var(--text-1)', marginBottom: 20 }}>검증된<br />기술 스택</h2>
                <p style={{ fontSize: 15, color: 'var(--text-3)', lineHeight: 1.75 }}>확장성과 개발 속도를 모두 잡기 위해 React Native와 Firebase를 선택했습니다. 단일 코드베이스로 iOS와 Android를 동시에 지원합니다.</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {stack.map((s, i) => (
                  <div key={s.layer} style={{ display: 'grid', gridTemplateColumns: '100px 1fr auto', alignItems: 'center', gap: 20, padding: '16px 0', borderTop: '1px solid var(--border)', borderBottom: i === stack.length - 1 ? '1px solid var(--border)' : 'none' }}>
                    <span style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", color: 'var(--text-3)', letterSpacing: '0.08em' }}>{s.layer}</span>
                    <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-1)', letterSpacing: '-0.01em' }}>{s.value}</span>
                    <span style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", color: 'var(--text-3)', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 3, padding: '2px 7px' }}>{s.note}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>
      </div>

      <Divider />

      {/* TEAM */}
      <div id="team">
        <Section>
          <div ref={team.ref} style={{ padding: '0 40px', opacity: team.visible ? 1 : 0, transform: team.visible ? 'none' : 'translateY(24px)', transition: 'opacity 0.6s ease, transform 0.6s ease' }}>
            <SectionLabel>AI Team</SectionLabel>
            <h2 style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.05, color: 'var(--text-1)', marginBottom: 64 }}>AI가 팀을 이룹니다</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 40 }}>
              {agents.map(agent => (
                <div key={agent.name} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: agent.color + '18', border: `1px solid ${agent.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, color: agent.color }}>{agent.icon}</div>
                  <div>
                    <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text-1)', marginBottom: 4 }}>{agent.name}</div>
                    <div style={{ fontSize: 12, fontFamily: "'JetBrains Mono', monospace", color: agent.color, marginBottom: 16 }}>{agent.role}</div>
                    <div style={{ height: 1, background: 'var(--border)', marginBottom: 16 }} />
                    <p style={{ fontSize: 14, color: 'var(--text-3)', lineHeight: 1.65 }}>{agent.ko}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>
      </div>

      <Divider />

      {/* ROADMAP */}
      <div id="roadmap">
        <Section>
          <div ref={roadmap.ref} style={{ padding: '0 40px', opacity: roadmap.visible ? 1 : 0, transform: roadmap.visible ? 'none' : 'translateY(24px)', transition: 'opacity 0.6s ease, transform 0.6s ease' }}>
            <SectionLabel>Roadmap</SectionLabel>
            <h2 style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.05, color: 'var(--text-1)', marginBottom: 64 }}>개발 로드맵</h2>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {rm.map((r, i) => {
                const isActive = r.status === 'active'
                const isNext = r.status === 'next'
                return (
                  <div key={r.phase} style={{ display: 'grid', gridTemplateColumns: '40px 32px 1fr auto', gap: 20, alignItems: 'center', padding: '20px 0', borderTop: '1px solid var(--border)', borderBottom: i === rm.length - 1 ? '1px solid var(--border)' : 'none', opacity: r.status === 'planned' ? 0.5 : 1 }}>
                    <span style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: 'var(--text-3)' }}>0{r.phase}</span>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: isActive ? 'var(--accent)' : isNext ? 'var(--amber)' : 'var(--text-3)', boxShadow: isActive ? '0 0 0 4px rgba(94,106,210,0.2)' : 'none' }} />
                    <span style={{ fontSize: 18, fontWeight: isActive ? 700 : 500, color: isActive ? 'var(--text-1)' : 'var(--text-2)', letterSpacing: '-0.02em' }}>{r.label}</span>
                    <span style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", color: isActive ? 'var(--accent)' : isNext ? 'var(--amber)' : 'var(--text-3)', background: isActive ? 'rgba(94,106,210,0.12)' : isNext ? 'rgba(232,168,75,0.12)' : 'transparent', borderRadius: 3, padding: isActive || isNext ? '2px 8px' : '0' }}>
                      {isActive ? '진행 중' : isNext ? '예정' : '계획'}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </Section>
      </div>

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid var(--border)', padding: '32px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: 900, margin: '0 auto', width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 16, height: 16, borderRadius: 4, background: 'linear-gradient(135deg, #5e6ad2, #3ecba5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="8" height="8" viewBox="0 0 12 12" fill="none"><path d="M2 9L6 3L10 9" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
          <span style={{ fontWeight: 700, fontSize: 13, letterSpacing: '-0.02em' }}>{project.name}</span>
        </div>
        <span style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: 'var(--text-3)' }}>Route Project Overview · {project.lastUpdated}</span>
      </footer>
    </div>
  )
}
