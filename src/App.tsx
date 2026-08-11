import { useEffect, useRef, useState } from 'react'

/* ─── data ─────────────────────────────────────── */

const FEATURES = [
  {
    num: '01',
    title: 'Map Exploration',
    ko: '지역 기반 장소 탐색',
    desc: '지도 위에서 주변 장소를 발견하고, 다른 사람들의 코스를 시각적으로 탐색합니다.',
  },
  {
    num: '02',
    title: 'Course Creation',
    ko: '나만의 코스 제작',
    desc: '방문할 장소를 순서대로 이어 나만의 여행·데이트 코스를 직접 설계합니다.',
  },
  {
    num: '03',
    title: 'Route SNS',
    ko: '코스 기반 경험 공유',
    desc: '지도와 동선이 포함된 형태로 경험을 공유합니다. 장소가 아닌 코스를 나눕니다.',
  },
  {
    num: '04',
    title: 'Navigation',
    ko: '코스 따라가기',
    desc: '공유된 코스를 그대로 따라가며 같은 경험을 재현할 수 있습니다.',
  },
  {
    num: '05',
    title: 'AI Recommendation',
    ko: '맞춤 여행 추천',
    desc: '취향과 상황에 맞는 코스를 AI가 자동으로 추천하고 구성합니다.',
  },
]

const FLOW = ['Discover', 'Create', 'Share', 'Navigate']
const FLOW_KO = ['탐색', '제작', '공유', '이동']
const FLOW_DESC = [
  '지도에서 코스를 발견',
  '나만의 코스를 설계',
  '경험을 SNS로 공유',
  '코스를 따라 이동',
]

const STACK = [
  { layer: 'Frontend', value: 'React Native', note: 'Expo' },
  { layer: 'Backend', value: 'Firebase', note: 'Cloud Functions' },
  { layer: 'Database', value: 'Firestore', note: 'NoSQL' },
  { layer: 'Map API', value: 'Google Maps', note: 'Places + Routes' },
  { layer: 'Platform', value: 'iOS / Android', note: 'App Store' },
]

const AGENTS = [
  {
    name: 'ChatGPT',
    role: 'Product Manager',
    ko: '기능 기획 · 전략',
    color: '#10a37f',
    icon: '◈',
  },
  {
    name: 'Claude',
    role: 'Lead Developer',
    ko: 'React Native · Firebase',
    color: '#cc785c',
    icon: '◆',
  },
  {
    name: 'Gemini',
    role: 'QA Engineer',
    ko: '테스팅 · UX 검토',
    color: '#4285f4',
    icon: '◇',
  },
]

const ROADMAP = [
  { phase: '1', label: 'Foundation', status: 'active' },
  { phase: '2', label: 'Authentication', status: 'next' },
  { phase: '3', label: 'Course Engine', status: 'planned' },
  { phase: '4', label: 'Community', status: 'planned' },
  { phase: '5', label: 'Map Experience', status: 'planned' },
  { phase: '6', label: 'AI Recommendation', status: 'planned' },
  { phase: '7', label: 'Launch', status: 'planned' },
]

/* ─── helpers ───────────────────────────────────── */

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

function Section({
  children,
  style,
}: {
  children: React.ReactNode
  style?: React.CSSProperties
}) {
  return (
    <section
      style={{
        padding: '100px 0',
        maxWidth: 900,
        margin: '0 auto',
        width: '100%',
        ...style,
      }}
    >
      {children}
    </section>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontSize: 11,
        fontFamily: "'JetBrains Mono', monospace",
        letterSpacing: '0.14em',
        color: 'var(--text-3)',
        textTransform: 'uppercase',
        marginBottom: 32,
        display: 'flex',
        alignItems: 'center',
        gap: 12,
      }}
    >
      <span
        style={{
          display: 'inline-block',
          width: 20,
          height: 1,
          background: 'var(--border-strong)',
        }}
      />
      {children}
    </div>
  )
}

function Divider() {
  return (
    <div
      style={{
        height: 1,
        background: 'var(--border)',
        maxWidth: 900,
        margin: '0 auto',
      }}
    />
  )
}

/* ─── main ──────────────────────────────────────── */

export default function App() {
  /* scroll-linked nav highlight */
  const [scrollY, setScrollY] = useState(0)
  useEffect(() => {
    const h = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])

  /* fade-in hooks */
  const vision = useInView()
  const features = useInView()
  const flow = useInView()
  const tech = useInView()
  const team = useInView()
  const roadmap = useInView()

  return (
    <div
      style={{
        background: 'var(--bg)',
        color: 'var(--text-1)',
        overflowX: 'hidden',
      }}
    >
      {/* ───────────────────────────────
          STICKY NAV
      ─────────────────────────────── */}
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          height: 52,
          display: 'flex',
          alignItems: 'center',
          padding: '0 40px',
          justifyContent: 'space-between',
          background: scrollY > 60 ? 'rgba(8,8,10,0.88)' : 'transparent',
          backdropFilter: scrollY > 60 ? 'blur(12px)' : 'none',
          borderBottom: scrollY > 60 ? '1px solid var(--border)' : '1px solid transparent',
          transition: 'background 0.3s, border-color 0.3s',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div
            style={{
              width: 20,
              height: 20,
              borderRadius: 5,
              background: 'linear-gradient(135deg, #5e6ad2, #3ecba5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
              <path d="M2 9L6 3L10 9" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span style={{ fontWeight: 700, fontSize: 14, letterSpacing: '-0.02em' }}>Route</span>
        </div>
        <div style={{ display: 'flex', gap: 28 }}>
          {['Vision', 'Features', 'Tech', 'Team', 'Roadmap'].map(l => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              style={{
                fontSize: 13,
                color: 'var(--text-3)',
                textDecoration: 'none',
                transition: 'color 0.15s',
              }}
              onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-1)')}
              onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-3)')}
            >
              {l}
            </a>
          ))}
        </div>
      </nav>

      {/* ───────────────────────────────
          COVER
      ─────────────────────────────── */}
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '120px 40px 80px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background glow */}
        <div
          style={{
            position: 'absolute',
            top: '30%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 600,
            height: 400,
            background:
              'radial-gradient(ellipse, rgba(94,106,210,0.12) 0%, rgba(62,203,165,0.05) 50%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        {/* Badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 7,
            border: '1px solid var(--border-strong)',
            borderRadius: 20,
            padding: '5px 14px',
            marginBottom: 48,
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: 'var(--green)',
              boxShadow: '0 0 0 3px rgba(62,203,165,0.2)',
              display: 'inline-block',
            }}
          />
          <span
            style={{
              fontSize: 11,
              fontFamily: "'JetBrains Mono', monospace",
              color: 'var(--text-3)',
              letterSpacing: '0.08em',
            }}
          >
            Phase 1 · In Development · 2026
          </span>
        </div>

        {/* Wordmark */}
        <h1
          style={{
            fontSize: 'clamp(72px, 12vw, 120px)',
            fontWeight: 800,
            letterSpacing: '-0.05em',
            lineHeight: 0.9,
            color: 'var(--text-1)',
            marginBottom: 24,
          }}
        >
          ROUTE
        </h1>

        {/* Tagline */}
        <p
          style={{
            fontSize: 'clamp(16px, 2.5vw, 22px)',
            color: 'var(--text-2)',
            fontWeight: 400,
            letterSpacing: '-0.02em',
            lineHeight: 1.5,
            maxWidth: 520,
            marginBottom: 16,
          }}
        >
          여행 계획부터 이동까지 연결하는
          <br />
          지도 기반 경험 공유 플랫폼
        </p>

        <p
          style={{
            fontSize: 13,
            fontFamily: "'JetBrains Mono', monospace",
            color: 'var(--accent)',
            letterSpacing: '0.04em',
          }}
        >
          AI Travel Platform
        </p>

        {/* Scroll cue */}
        <div
          style={{
            position: 'absolute',
            bottom: 40,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <div
            style={{
              width: 1,
              height: 40,
              background: 'linear-gradient(to bottom, var(--border-strong), transparent)',
            }}
          />
        </div>
      </div>

      {/* ───────────────────────────────
          CORE MESSAGE
      ─────────────────────────────── */}
      <div
        style={{
          maxWidth: 900,
          margin: '0 auto',
          padding: '0 40px 100px',
          textAlign: 'center',
        }}
      >
        <p
          style={{
            fontSize: 'clamp(28px, 4vw, 48px)',
            fontWeight: 700,
            letterSpacing: '-0.04em',
            lineHeight: 1.2,
            color: 'var(--text-1)',
          }}
        >
          "장소가 아닌
          <span
            style={{
              background: 'linear-gradient(135deg, #5e6ad2, #3ecba5)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {' '}코스{' '}
          </span>
          를 공유한다."
        </p>
      </div>

      <Divider />

      {/* ───────────────────────────────
          VISION
      ─────────────────────────────── */}
      <div id="vision">
        <Section>
          <div
            ref={vision.ref}
            style={{
              padding: '0 40px',
              opacity: vision.visible ? 1 : 0,
              transform: vision.visible ? 'none' : 'translateY(24px)',
              transition: 'opacity 0.6s ease, transform 0.6s ease',
            }}
          >
            <SectionLabel>Project Vision</SectionLabel>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60 }}>
              {/* Problem */}
              <div>
                <div
                  style={{
                    fontSize: 11,
                    fontFamily: "'JetBrains Mono', monospace",
                    color: 'var(--red)',
                    letterSpacing: '0.1em',
                    marginBottom: 20,
                  }}
                >
                  PROBLEM
                </div>
                <h3
                  style={{
                    fontSize: 28,
                    fontWeight: 700,
                    letterSpacing: '-0.03em',
                    color: 'var(--text-1)',
                    lineHeight: 1.2,
                    marginBottom: 20,
                  }}
                >
                  여행 계획은
                  <br />
                  여전히 불편합니다
                </h3>
                <p style={{ fontSize: 15, color: 'var(--text-3)', lineHeight: 1.75 }}>
                  지도 앱, 블로그, SNS를 오가며
                  정보를 수집하고, 직접 정리하고,
                  결국 공유는 텍스트 링크로 끝납니다.
                  경험은 사라지고 동선은 남지 않습니다.
                </p>
              </div>

              {/* Solution */}
              <div>
                <div
                  style={{
                    fontSize: 11,
                    fontFamily: "'JetBrains Mono', monospace",
                    color: 'var(--green)',
                    letterSpacing: '0.1em',
                    marginBottom: 20,
                  }}
                >
                  SOLUTION
                </div>
                <h3
                  style={{
                    fontSize: 28,
                    fontWeight: 700,
                    letterSpacing: '-0.03em',
                    color: 'var(--text-1)',
                    lineHeight: 1.2,
                    marginBottom: 20,
                  }}
                >
                  모든 것을
                  <br />
                  하나로 통합합니다
                </h3>
                <p style={{ fontSize: 15, color: 'var(--text-3)', lineHeight: 1.75 }}>
                  검색, 지도, 코스 생성, SNS 공유를
                  하나의 플랫폼으로 통합합니다.
                  Route에서 발견하고, 만들고, 나누고,
                  그대로 따라갑니다.
                </p>
              </div>
            </div>
          </div>
        </Section>
      </div>

      <Divider />

      {/* ───────────────────────────────
          FEATURES
      ─────────────────────────────── */}
      <div id="features">
        <Section>
          <div
            ref={features.ref}
            style={{
              padding: '0 40px',
              opacity: features.visible ? 1 : 0,
              transform: features.visible ? 'none' : 'translateY(24px)',
              transition: 'opacity 0.6s ease, transform 0.6s ease',
            }}
          >
            <SectionLabel>Core Features</SectionLabel>

            <h2
              style={{
                fontSize: 'clamp(36px, 5vw, 56px)',
                fontWeight: 800,
                letterSpacing: '-0.04em',
                lineHeight: 1.05,
                color: 'var(--text-1)',
                marginBottom: 64,
              }}
            >
              5가지 핵심 기능
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {FEATURES.map((f, i) => (
                <div
                  key={f.num}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '56px 1fr 1fr',
                    gap: 32,
                    padding: '28px 0',
                    borderTop: '1px solid var(--border)',
                    alignItems: 'start',
                    transition: 'background 0.15s',
                  }}
                >
                  <span
                    style={{
                      fontSize: 12,
                      fontFamily: "'JetBrains Mono', monospace",
                      color: 'var(--text-3)',
                      paddingTop: 4,
                    }}
                  >
                    {f.num}
                  </span>
                  <div>
                    <div
                      style={{
                        fontSize: 20,
                        fontWeight: 700,
                        letterSpacing: '-0.02em',
                        color: 'var(--text-1)',
                        marginBottom: 4,
                      }}
                    >
                      {f.title}
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        fontFamily: "'JetBrains Mono', monospace",
                        color: 'var(--accent)',
                      }}
                    >
                      {f.ko}
                    </div>
                  </div>
                  <p style={{ fontSize: 14, color: 'var(--text-3)', lineHeight: 1.7, paddingTop: 3 }}>
                    {f.desc}
                  </p>
                  {i === FEATURES.length - 1 && (
                    <div
                      style={{
                        gridColumn: '1 / -1',
                        borderBottom: '1px solid var(--border)',
                        marginTop: 0,
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </Section>
      </div>

      <Divider />

      {/* ───────────────────────────────
          UX FLOW
      ─────────────────────────────── */}
      <Section>
        <div
          ref={flow.ref}
          style={{
            padding: '0 40px',
            opacity: flow.visible ? 1 : 0,
            transform: flow.visible ? 'none' : 'translateY(24px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          <SectionLabel>User Experience Flow</SectionLabel>

          <h2
            style={{
              fontSize: 'clamp(36px, 5vw, 56px)',
              fontWeight: 800,
              letterSpacing: '-0.04em',
              lineHeight: 1.05,
              color: 'var(--text-1)',
              marginBottom: 64,
            }}
          >
            사용자 여정
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 0,
              position: 'relative',
            }}
          >
            {/* connecting line */}
            <div
              style={{
                position: 'absolute',
                top: 28,
                left: '12.5%',
                right: '12.5%',
                height: 1,
                background: 'linear-gradient(to right, var(--accent), var(--border))',
              }}
            />

            {FLOW.map((step, i) => (
              <div key={step} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: '50%',
                    background: i === 0 ? 'var(--accent)' : 'var(--surface)',
                    border: `1px solid ${i === 0 ? 'var(--accent)' : 'var(--border-strong)'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 13,
                    fontWeight: 700,
                    color: i === 0 ? 'white' : 'var(--text-3)',
                    fontFamily: "'JetBrains Mono', monospace",
                    position: 'relative',
                    zIndex: 1,
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div
                    style={{
                      fontSize: 16,
                      fontWeight: 700,
                      color: 'var(--text-1)',
                      letterSpacing: '-0.02em',
                      marginBottom: 4,
                    }}
                  >
                    {step}
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      fontFamily: "'JetBrains Mono', monospace",
                      color: 'var(--text-3)',
                      marginBottom: 8,
                    }}
                  >
                    {FLOW_KO[i]}
                  </div>
                  <div style={{ fontSize: 13, color: 'var(--text-3)', lineHeight: 1.5 }}>
                    {FLOW_DESC[i]}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Divider />

      {/* ───────────────────────────────
          TECH STACK
      ─────────────────────────────── */}
      <div id="tech">
        <Section>
          <div
            ref={tech.ref}
            style={{
              padding: '0 40px',
              opacity: tech.visible ? 1 : 0,
              transform: tech.visible ? 'none' : 'translateY(24px)',
              transition: 'opacity 0.6s ease, transform 0.6s ease',
            }}
          >
            <SectionLabel>Technical Architecture</SectionLabel>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'start' }}>
              <div>
                <h2
                  style={{
                    fontSize: 'clamp(32px, 4vw, 48px)',
                    fontWeight: 800,
                    letterSpacing: '-0.04em',
                    lineHeight: 1.1,
                    color: 'var(--text-1)',
                    marginBottom: 20,
                  }}
                >
                  검증된
                  <br />
                  기술 스택
                </h2>
                <p style={{ fontSize: 15, color: 'var(--text-3)', lineHeight: 1.75 }}>
                  확장성과 개발 속도를 모두 잡기 위해
                  React Native와 Firebase를 선택했습니다.
                  단일 코드베이스로 iOS와 Android를 동시에 지원합니다.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {STACK.map((s, i) => (
                  <div
                    key={s.layer}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '100px 1fr auto',
                      alignItems: 'center',
                      gap: 20,
                      padding: '16px 0',
                      borderTop: '1px solid var(--border)',
                      borderBottom: i === STACK.length - 1 ? '1px solid var(--border)' : 'none',
                    }}
                  >
                    <span
                      style={{
                        fontSize: 10,
                        fontFamily: "'JetBrains Mono', monospace",
                        color: 'var(--text-3)',
                        letterSpacing: '0.08em',
                      }}
                    >
                      {s.layer}
                    </span>
                    <span
                      style={{
                        fontSize: 15,
                        fontWeight: 600,
                        color: 'var(--text-1)',
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {s.value}
                    </span>
                    <span
                      style={{
                        fontSize: 10,
                        fontFamily: "'JetBrains Mono', monospace",
                        color: 'var(--text-3)',
                        background: 'var(--surface)',
                        border: '1px solid var(--border)',
                        borderRadius: 3,
                        padding: '2px 7px',
                      }}
                    >
                      {s.note}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>
      </div>

      <Divider />

      {/* ───────────────────────────────
          AI TEAM
      ─────────────────────────────── */}
      <div id="team">
        <Section>
          <div
            ref={team.ref}
            style={{
              padding: '0 40px',
              opacity: team.visible ? 1 : 0,
              transform: team.visible ? 'none' : 'translateY(24px)',
              transition: 'opacity 0.6s ease, transform 0.6s ease',
            }}
          >
            <SectionLabel>AI Team</SectionLabel>

            <h2
              style={{
                fontSize: 'clamp(36px, 5vw, 56px)',
                fontWeight: 800,
                letterSpacing: '-0.04em',
                lineHeight: 1.05,
                color: 'var(--text-1)',
                marginBottom: 64,
              }}
            >
              AI가 팀을 이룹니다
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 40 }}>
              {AGENTS.map((agent) => (
                <div key={agent.name} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                  {/* Icon */}
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 12,
                      background: agent.color + '18',
                      border: `1px solid ${agent.color}30`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 20,
                      color: agent.color,
                    }}
                  >
                    {agent.icon}
                  </div>

                  <div>
                    <div
                      style={{
                        fontSize: 22,
                        fontWeight: 800,
                        letterSpacing: '-0.03em',
                        color: 'var(--text-1)',
                        marginBottom: 4,
                      }}
                    >
                      {agent.name}
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        fontFamily: "'JetBrains Mono', monospace",
                        color: agent.color,
                        marginBottom: 16,
                      }}
                    >
                      {agent.role}
                    </div>
                    <div
                      style={{
                        height: 1,
                        background: 'var(--border)',
                        marginBottom: 16,
                      }}
                    />
                    <p style={{ fontSize: 14, color: 'var(--text-3)', lineHeight: 1.65 }}>
                      {agent.ko}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>
      </div>

      <Divider />

      {/* ───────────────────────────────
          ROADMAP
      ─────────────────────────────── */}
      <div id="roadmap">
        <Section>
          <div
            ref={roadmap.ref}
            style={{
              padding: '0 40px',
              opacity: roadmap.visible ? 1 : 0,
              transform: roadmap.visible ? 'none' : 'translateY(24px)',
              transition: 'opacity 0.6s ease, transform 0.6s ease',
            }}
          >
            <SectionLabel>Roadmap</SectionLabel>

            <h2
              style={{
                fontSize: 'clamp(36px, 5vw, 56px)',
                fontWeight: 800,
                letterSpacing: '-0.04em',
                lineHeight: 1.05,
                color: 'var(--text-1)',
                marginBottom: 64,
              }}
            >
              개발 로드맵
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {ROADMAP.map((r, i) => {
                const isActive = r.status === 'active'
                const isNext = r.status === 'next'
                return (
                  <div
                    key={r.phase}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '40px 32px 1fr auto',
                      gap: 20,
                      alignItems: 'center',
                      padding: '20px 0',
                      borderTop: '1px solid var(--border)',
                      borderBottom: i === ROADMAP.length - 1 ? '1px solid var(--border)' : 'none',
                      opacity: r.status === 'planned' ? 0.5 : 1,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 11,
                        fontFamily: "'JetBrains Mono', monospace",
                        color: 'var(--text-3)',
                      }}
                    >
                      0{r.phase}
                    </span>
                    <div
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: '50%',
                        background: isActive
                          ? 'var(--accent)'
                          : isNext
                          ? 'var(--amber)'
                          : 'var(--text-3)',
                        boxShadow: isActive ? '0 0 0 4px rgba(94,106,210,0.2)' : 'none',
                      }}
                    />
                    <span
                      style={{
                        fontSize: 18,
                        fontWeight: isActive ? 700 : 500,
                        color: isActive ? 'var(--text-1)' : 'var(--text-2)',
                        letterSpacing: '-0.02em',
                      }}
                    >
                      {r.label}
                    </span>
                    <span
                      style={{
                        fontSize: 10,
                        fontFamily: "'JetBrains Mono', monospace",
                        color: isActive
                          ? 'var(--accent)'
                          : isNext
                          ? 'var(--amber)'
                          : 'var(--text-3)',
                        background: isActive
                          ? 'rgba(94,106,210,0.12)'
                          : isNext
                          ? 'rgba(232,168,75,0.12)'
                          : 'transparent',
                        borderRadius: 3,
                        padding: isActive || isNext ? '2px 8px' : '0',
                      }}
                    >
                      {isActive ? '진행 중' : isNext ? '예정' : '계획'}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </Section>
      </div>

      {/* ───────────────────────────────
          FOOTER
      ─────────────────────────────── */}
      <footer
        style={{
          borderTop: '1px solid var(--border)',
          padding: '32px 40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          maxWidth: 900,
          margin: '0 auto',
          width: '100%',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div
            style={{
              width: 16,
              height: 16,
              borderRadius: 4,
              background: 'linear-gradient(135deg, #5e6ad2, #3ecba5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="8" height="8" viewBox="0 0 12 12" fill="none">
              <path d="M2 9L6 3L10 9" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span style={{ fontWeight: 700, fontSize: 13, letterSpacing: '-0.02em' }}>Route</span>
        </div>
        <span
          style={{
            fontSize: 11,
            fontFamily: "'JetBrains Mono', monospace",
            color: 'var(--text-3)',
          }}
        >
          Route Project Overview · 2026
        </span>
      </footer>
    </div>
  )
}
