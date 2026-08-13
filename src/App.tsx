import { useEffect, useState } from "react"
import {
  ArrowDown,
  ArrowRight,
  CalendarDays,
  Check,
  CircleDollarSign,
  Compass,
  ExternalLink,
  GitBranch,
  Layers3,
  Map,
  MapPin,
  Menu,
  Navigation,
  Route as RouteIcon,
  Search,
  Sparkles,
  X,
  Zap,
} from "lucide-react"

type SectionId = "overview" | "vision" | "flow" | "system"

const navItems: { id: SectionId label: string index: string }[] = [
  { id: "overview", label: "Overview", index: "01" },
  { id: "vision", label: "Value", index: "02" },
  { id: "flow", label: "Flow", index: "03" },
  { id: "system", label: "System", index: "04" },
]

const featureItems = [
  {
    id: "map",
    number: "01",
    icon: Map,
    title: "지도 위에서 발견",
    english: "Map discovery",
    description:
      "검색과 지역 필터로 장소를 찾고, 흩어진 핀을 하나의 이동 흐름으로 바라봅니다.",
    accent: "blue",
    tag: "LIVE IN MVP",
  },
  {
    id: "schedule",
    number: "02",
    icon: CalendarDays,
    title: "일정으로 연결",
    english: "Day-based itinerary",
    description:
      "선택한 장소를 DAY별 순서와 이동으로 정리해, 저장 가능한 코스로 완성합니다.",
    accent: "pink",
    tag: "LIVE IN MVP",
  },
  {
    id: "budget",
    number: "03",
    icon: CircleDollarSign,
    title: "예산 감각을 더해",
    english: "Budget context",
    description:
      "장소를 고르는 순간 예상 지출과 여행의 밀도를 함께 판단할 수 있도록 확장 중입니다.",
    accent: "gold",
    tag: "NEXT LAYER",
  },
  {
    id: "navigate",
    number: "04",
    icon: Navigation,
    title: "현장에서 실행",
    english: "Travel Navigator",
    description:
      "GPS 기반 진행 상태와 다음 목적지 안내로 계획을 실제 여행 경험으로 전환합니다.",
    accent: "mint",
    tag: "LIVE IN MVP",
  },
]

const flowItems = [
  {
    step: "01",
    title: "탐색",
    label: "Explore",
    icon: Search,
    detail: "지도에서 장소와 지역을 발견합니다.",
  },
  {
    step: "02",
    title: "선택",
    label: "Select",
    icon: MapPin,
    detail: "마음에 드는 장소를 Route에 담습니다.",
  },
  {
    step: "03",
    title: "설계",
    label: "Compose",
    icon: Layers3,
    detail: "DAY와 순서를 조정해 코스를 만듭니다.",
  },
  {
    step: "04",
    title: "저장",
    label: "Save",
    icon: CalendarDays,
    detail: "일정과 지도 프리뷰를 한 곳에 보관합니다.",
  },
  {
    step: "05",
    title: "이동",
    label: "Navigate",
    icon: Navigation,
    detail: "Travel Navigator와 함께 여행을 시작합니다.",
  },
]

function GlassCard({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) {
  return <div className={`glass-card ${className}`}>{children}</div>
}

function RoutePreview() {
  const [selectedStop, setSelectedStop] = useState(1)
  const stops = [
    { name: "Seongsu", time: "10:30", x: 22, y: 68, tone: "blue" },
    { name: "Seoul Forest", time: "12:10", x: 47, y: 42, tone: "pink" },
    { name: "Euljiro", time: "15:40", x: 74, y: 28, tone: "blue" },
    { name: "Namsan", time: "18:20", x: 82, y: 73, tone: "pink" },
  ]

  return (
    <div className="route-preview glass-card">
      <div className="preview-head">
        <div>
          <span className="eyebrow">LIVE ROUTE / SEOUL</span>
          <h2>Saturday, in motion</h2>
        </div>
        <div className="live-pill">
          <span /> route active
        </div>
      </div>
      <div className="map-surface">
        <div className="map-grid" />
        <span className="map-label label-one">SEONGSU</span>
        <span className="map-label label-two">SEOUL FOREST</span>
        <span className="map-label label-three">EULJIRO</span>
        <span className="map-label label-four">NAMSAN</span>
        <svg
          className="route-svg"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M22 68 C31 64 34 49 47 42 S65 25 74 28 S79 59 82 73" />
          <path
            className="route-dash"
            d="M22 68 C31 64 34 49 47 42 S65 25 74 28 S79 59 82 73"
          />
        </svg>
        {stops.map((stop, index) => (
          <button
            key={stop.name}
            type="button"
            className={`map-stop ${stop.tone} ${
              selectedStop === index ? "is-selected" : ""
            }`}
            style={{ left: `${stop.x}%`, top: `${stop.y}%` }}
            onClick={() => setSelectedStop(index)}
            aria-label={`${stop.name} 선택`}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
          </button>
        ))}
        <div className="map-corner top-left">37°33' / 126°59'</div>
        <div className="map-corner bottom-right">04 STOPS / 08.4 KM</div>
      </div>
      <div className="route-detail">
        <div className="selected-place">
          <div className="place-icon">
            <MapPin size={16} />
          </div>
          <div>
            <span className="micro-label">NEXT STOP</span>
            <strong>{stops[selectedStop].name}</strong>
          </div>
        </div>
        <div className="place-meta">
          <span>{stops[selectedStop].time}</span>
          <span className="dot-separator">•</span>
          <span>walk 18 min</span>
        </div>
      </div>
      <div className="preview-bottom">
        <div className="mini-itinerary">
          <span className="day-badge">DAY 01</span>
          <div className="mini-bars">
            <i />
            <i />
            <i />
          </div>
          <span>4 places connected</span>
        </div>
        <div className="budget-badge">
          <CircleDollarSign size={14} /> ₩84,000 est.
        </div>
      </div>
    </div>
  )
}

function App() {
  const [activeSection, setActiveSection] = useState<SectionId>("overview")
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActiveSection(visible.target.id as SectionId)
      },
      { rootMargin: "-18% 0px -62% 0px", threshold: [0.05, 0.2, 0.5] },
    )
    navItems.forEach(({ id }) => {
      const section = document.getElementById(id)
      if (section) observer.observe(section)
    })
    return () => observer.disconnect()
  }, [])

  const scrollTo = (id: SectionId) => {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" })
    setMenuOpen(false)
  }

  return (
    <div className="route-site">
      <div className="ambient ambient-pink" />
      <div className="ambient ambient-blue" />
      <div className="ambient ambient-orbit" />
      <div className="noise" />

      <header className="site-header">
        <div className="header-inner">
          <button
            type="button"
            className="brand"
            onClick={() => scrollTo("overview")}
            aria-label="Route overview로 이동"
          >
            <span className="brand-mark">
              <RouteIcon size={20} strokeWidth={2.4} />
            </span>
            <span className="brand-name">Route</span>
            <span className="brand-status">PROJECT 01</span>
          </button>
          <nav className="desktop-nav" aria-label="프로젝트 소개 탐색">
            {navItems.map((item) => (
              <button
                type="button"
                key={item.id}
                className={activeSection === item.id ? "active" : ""}
                onClick={() => scrollTo(item.id)}
              >
                <span>{item.index}</span>
                {item.label}
              </button>
            ))}
          </nav>
          <div className="header-actions">
            <a
              className="github-link"
              href="https://github.com/yeongjunsong92-byte/Route-app-claud"
              target="_blank"
              rel="noreferrer"
            >
              <GitBranch size={16} /> <span>Repository</span>{" "}
              <ExternalLink size={13} />
            </a>
            <button
              type="button"
              className="mobile-menu-button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label="메뉴 열기"
            >
              {menuOpen ? <X size={19} /> : <Menu size={19} />}
            </button>
          </div>
          {menuOpen && (
            <div className="mobile-nav">
              {navItems.map((item) => (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                >
                  <span>{item.index}</span>
                  {item.label}
                  <ArrowRight size={15} />
                </button>
              ))}
            </div>
          )}
        </div>
      </header>

      <main>
        <section id="overview" className="hero section-shell">
          <div className="hero-copy">
            <span className="section-kicker">
              <Sparkles size={14} /> PERSONAL TRAVEL PLANNER / WEB MVP
            </span>
            <p className="hero-index">
              01 <span /> A BETTER WAY TO MOVE
            </p>
            <h1>
              여행은 장소의 목록이 아니라,
              <br />
              <em>이어지는 흐름</em>이어야 하니까.
            </h1>
            <p className="hero-description">
              Route는 지도에서 발견한 장소를 나만의 코스로 연결하고, 저장한
              계획을 현장에서 실행하는 개인 여행 플래너입니다. 검색과 일정
              사이의 끊어진 순간을 하나의 route line으로 이어갑니다.
            </p>
            <div className="hero-actions">
              <button
                type="button"
                className="primary-button"
                onClick={() => scrollTo("flow")}
              >
                Route의 흐름 보기 <ArrowDown size={16} />
              </button>
              <button
                type="button"
                className="text-button"
                onClick={() => scrollTo("vision")}
              >
                왜 Route인가 <ArrowRight size={16} />
              </button>
            </div>
            <div className="hero-proof">
              <div>
                <strong>01</strong>
                <span>map to memory</span>
              </div>
              <div>
                <strong>04</strong>
                <span>core features</span>
              </div>
              <div>
                <strong>∞</strong>
                <span>your own route</span>
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <RoutePreview />
            <div className="floating-note note-a">
              <span className="note-icon pink">
                <CalendarDays size={15} />
              </span>
              <div>
                <strong>DAY 01</strong>
                <small>itinerary ready</small>
              </div>
            </div>
            <div className="floating-note note-b">
              <span className="note-icon blue">
                <Navigation size={15} />
              </span>
              <div>
                <strong>18 min</strong>
                <small>to next stop</small>
              </div>
            </div>
          </div>
          <div className="scroll-cue">
            <span className="scroll-line" /> SCROLL TO EXPLORE
          </div>
        </section>

        <section id="vision" className="section-shell vision-section">
          <div className="section-heading split-heading">
            <div>
              <span className="section-kicker">
                <span className="kicker-line" /> THE TENSION
              </span>
              <h2>
                여행 계획은 왜<br />
                <em>흩어져</em> 있을까?
              </h2>
            </div>
            <p>
              장소는 지도에, 후기는 SNS에, 이동은 별도의 내비게이션에 남습니다.
              Route는 그 사이의 단절을 줄이고, 한 번의 선택이 다음 행동으로
              자연스럽게 이어지는 경험을 설계합니다.
            </p>
          </div>
          <div className="problem-grid">
            <GlassCard className="problem-card muted-card">
              <span className="problem-symbol">01</span>
              <span className="problem-tag">BEFORE</span>
              <h3>
                찾고, 저장하고,
                <br />
                다시 조합하는 일
              </h3>
              <p>
                지도 앱, 블로그, 메모장을 오가며 장소를 수집하지만 실제 동선과
                하루의 리듬은 마지막까지 비어 있습니다.
              </p>
              <div className="broken-line">
                <span /> <span /> <span />
              </div>
            </GlassCard>
            <GlassCard className="problem-card solution-card">
              <span className="problem-symbol accent-symbol">02</span>
              <span className="problem-tag accent-tag">ROUTE'S ANSWER</span>
              <h3>
                발견을 바로
                <br />
                <em>이동</em>으로 바꾸는 일
              </h3>
              <p>
                장소를 선택하는 순간 route line이 생기고, DAY 일정과 다음
                목적지가 하나의 화면 안에서 연결됩니다.
              </p>
              <div className="connected-line">
                <span />
                <span />
                <span />
                <span />
              </div>
            </GlassCard>
          </div>
          <div className="values-row">
            <div className="value-intro">
              <span className="section-kicker">
                <span className="kicker-line" /> CORE VALUE
              </span>
              <h3>
                Route가 지키는
                <br />
                <em>세 가지 기준</em>
              </h3>
            </div>
            <div className="value-item">
              <span className="value-number">01</span>
              <div className="value-icon blue-icon">
                <Compass size={20} />
              </div>
              <h4>Discover with context</h4>
              <p>장소 하나가 아니라 주변과 다음 목적지까지 함께 발견합니다.</p>
            </div>
            <div className="value-item">
              <span className="value-number">02</span>
              <div className="value-icon pink-icon">
                <Layers3 size={20} />
              </div>
              <h4>Compose your rhythm</h4>
              <p>
                정답이 정해진 패키지가 아닌, 나만의 속도로 코스를 설계합니다.
              </p>
            </div>
            <div className="value-item">
              <span className="value-number">03</span>
              <div className="value-icon mint-icon">
                <Zap size={20} />
              </div>
              <h4>Move with confidence</h4>
              <p>
                저장된 계획을 현장의 다음 행동으로 바꾸어 여행을 완주합니다.
              </p>
            </div>
          </div>
        </section>

        <section id="flow" className="section-shell feature-section">
          <div className="section-heading">
            <span className="section-kicker">
              <span className="kicker-line" /> PRODUCT ANATOMY
            </span>
            <h2>
              한 번의 계획이
              <br />
              <em>네 개의 화면</em>이 되는 방식
            </h2>
            <p>
              Route의 핵심 기능은 각각 따로 존재하지 않습니다. 발견한 장소가
              일정이 되고, 일정은 이동이 되며, 이동의 기록은 다음 여행을 위한
              기억이 됩니다.
            </p>
          </div>
          <div className="feature-grid">
            {featureItems.map((item) => {
              const Icon = item.icon
              return (
                <GlassCard
                  key={item.id}
                  className={`feature-card feature-${item.accent}`}
                >
                  <div className="feature-top">
                    <span className="feature-number">{item.number}</span>
                    <span className="feature-tag">{item.tag}</span>
                  </div>
                  <div className="feature-icon">
                    <Icon size={23} />
                  </div>
                  <span className="feature-english">{item.english}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <div className="feature-arrow">
                    <ArrowRight size={16} />
                  </div>
                </GlassCard>
              )
            })}
          </div>
          <div className="flow-board glass-card">
            <div className="flow-board-head">
              <div>
                <span className="section-kicker">
                  <span className="kicker-line" /> USER JOURNEY
                </span>
                <h3>From pin to path</h3>
              </div>
              <span className="flow-caption">
                A route is made one decision at a time.
              </span>
            </div>
            <div className="flow-track">
              {flowItems.map((item, index) => {
                const Icon = item.icon
                return (
                  <div className="flow-node" key={item.step}>
                    <div className="flow-node-top">
                      <span>{item.step}</span>
                      <div className="flow-node-icon">
                        <Icon size={17} />
                      </div>
                    </div>
                    <h4>{item.title}</h4>
                    <span className="flow-label">{item.label}</span>
                    <p>{item.detail}</p>
                    {index < flowItems.length - 1 && (
                      <div className="flow-connector">
                        <ArrowRight size={14} />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <section id="system" className="section-shell system-section">
          <div className="system-quote">
            <span className="quote-mark">“</span>
            <blockquote>
              장소를 저장하는 서비스에서,
              <br />
              <em>여행의 흐름을 설계하는 도구로.</em>
            </blockquote>
            <span className="quote-caption">ROUTE / PRODUCT PRINCIPLE</span>
          </div>
          <div className="system-grid">
            <GlassCard className="system-card system-stack">
              <div className="system-card-head">
                <span className="section-kicker">
                  <span className="kicker-line" /> BUILT FOR REAL MOVEMENT
                </span>
                <RouteIcon size={19} />
              </div>
              <h3>
                계획에서 현장까지
                <br />
                <em>끊김 없는 기반</em>
              </h3>
              <p>
                실제 MVP는 지도 탐색, DAY별 일정, 코스 상세, GPS 기반 Travel
                Navigator까지 하나의 흐름으로 구현되어 있습니다.
              </p>
              <div className="stack-chips">
                <span>React + Vite</span>
                <span>Firebase</span>
                <span>Google Maps</span>
                <span>GPS Navigator</span>
              </div>
            </GlassCard>
            <GlassCard className="system-card system-status">
              <div className="system-card-head">
                <span className="section-kicker">
                  <span className="kicker-line" /> CURRENT BUILD
                </span>
                <span className="status-dot" />
              </div>
              <div className="status-heading">
                <span className="status-value">MVP</span>
                <span className="status-label">ready to explore</span>
              </div>
              <div className="status-list">
                <div>
                  <span>
                    <Check size={13} /> Map discovery
                  </span>
                  <b>READY</b>
                </div>
                <div>
                  <span>
                    <Check size={13} /> Day itinerary
                  </span>
                  <b>READY</b>
                </div>
                <div>
                  <span>
                    <Check size={13} /> Travel Navigator
                  </span>
                  <b>READY</b>
                </div>
                <div className="next">
                  <span>
                    <CircleDollarSign size={13} /> Budget context
                  </span>
                  <b>NEXT</b>
                </div>
              </div>
              <div className="status-progress">
                <span />
                <i />
              </div>
            </GlassCard>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-brand">
          <span className="brand-mark">
            <RouteIcon size={18} />
          </span>
          <div>
            <strong>Route</strong>
            <span>Personal travel, connected.</span>
          </div>
        </div>
        <p>
          프로젝트 소개 페이지를 먼저 확인한 뒤,
          <br />
          다음 단계에서 앱 체험 화면으로 이어집니다.
        </p>
        <div className="footer-meta">
          <span>© 2025 Route Project</span>
          <a
            href="https://github.com/yeongjunsong92-byte/route-overview"
            target="_blank"
            rel="noreferrer"
          >
            Overview repository <ExternalLink size={13} />
          </a>
        </div>
      </footer>
    </div>
  )
}

export default App
