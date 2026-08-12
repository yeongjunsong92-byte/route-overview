import React, { useState } from 'react';
import { 
  Compass, MapPin, Route as RouteIcon, Navigation, Sparkles, 
  Cpu, Users, CheckCircle2, ArrowRight, 
  GitBranch, Globe, Menu, X, Layers, Shield, Zap, Heart, Star
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'overview' | 'vision' | 'journey' | 'tech' | 'ai' | 'design'>('overview');
  const [menuOpen, setMenuOpen] = useState(false);

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'vision', label: 'Vision' },
    { id: 'journey', label: 'Journey' },
    { id: 'tech', label: 'Tech Stack' },
    { id: 'ai', label: 'AI Team' },
    { id: 'design', label: 'Design System' },
  ] as const;

  return (
    <div className="min-h-screen bg-[#050507] text-[#F5F5F7] font-sans antialiased selection:bg-[#E6B7C7] selection:text-[#111111] overflow-x-hidden">
      {/* Ambient glowing background gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-[#E6B7C7]/15 via-[#6D9EEB]/10 to-transparent rounded-full blur-[120px] pointer-events-none"></div>

      {/* Apple-style Glassmorphism Header */}
      <header className="sticky top-0 z-50 bg-[#050507]/70 backdrop-blur-2xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => setActiveTab('overview')}>
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#E6B7C7] to-[#6D9EEB] p-[1px] shadow-lg shadow-[#E6B7C7]/20 transition-transform group-hover:scale-105">
              <div className="w-full h-full bg-[#121216] rounded-2xl flex items-center justify-center text-[#E6B7C7]">
                <RouteIcon className="w-5 h-5" />
              </div>
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight text-white">Route</span>
              <span className="text-[10px] ml-2 px-2.5 py-0.5 rounded-full bg-white/10 text-[#E6B7C7] font-mono font-medium tracking-wider uppercase border border-white/10">Bootcamp HQ</span>
            </div>
          </div>

          <nav className="hidden lg:flex items-center space-x-1 bg-white/5 p-1 rounded-full border border-white/10 backdrop-blur-md">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 ${activeTab === tab.id ? 'bg-gradient-to-r from-[#E6B7C7] to-[#D49EB1] text-[#111111] shadow-md shadow-[#E6B7C7]/30 scale-[1.02]' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          <div className="hidden lg:flex items-center space-x-3">
            <a 
              href="https://github.com/yeongjunsong92-byte/Route-app-claud" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 text-xs font-semibold text-white shadow-lg transition-all hover:scale-105"
            >
              <GitBranch className="w-4 h-4 text-[#E6B7C7]" />
              <span>GitHub Repository</span>
            </a>
          </div>

          <button
            type="button"
            aria-label="메뉴 열기"
            className="lg:hidden w-11 h-11 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-white"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {menuOpen && (
            <div className="absolute top-20 left-4 right-4 lg:hidden rounded-3xl bg-[#121216]/95 border border-white/15 shadow-2xl backdrop-blur-2xl p-4 space-y-2 z-50">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => { setActiveTab(tab.id); setMenuOpen(false); }}
                  className={`w-full text-left px-5 py-3 rounded-2xl text-sm font-semibold transition-all ${activeTab === tab.id ? 'bg-[#E6B7C7] text-[#111111]' : 'text-zinc-300 hover:bg-white/5'}`}
                >
                  {tab.label}
                </button>
              ))}
              <a
                href="https://github.com/yeongjunsong92-byte/Route-app-claud"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-5 py-3 rounded-2xl text-sm font-semibold text-white bg-white/10 hover:bg-white/15"
              >
                <GitBranch className="w-4 h-4 text-[#E6B7C7]" />
                <span>GitHub Repository</span>
              </a>
            </div>
          )}
        </div>
      </header>

      {/* Main Content Area */}
      {activeTab === 'overview' && (
        <main className="max-w-7xl mx-auto px-6 py-16 space-y-20 relative z-10">
          {/* Apple-style Hero Banner */}
          <div className="relative rounded-[40px] bg-gradient-to-b from-[#18181C] to-[#111115] border border-white/10 p-10 md:p-20 shadow-2xl overflow-hidden text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-[#E6B7C7]/15 to-[#6D9EEB]/10 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="space-y-8 max-w-2xl relative z-10">
              <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#E6B7C7]/15 border border-[#E6B7C7]/30 text-[#E6B7C7] text-xs font-mono font-semibold tracking-wider uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Route MVP Portfolio & Bootcamp HQ</span>
              </div>
              <h1 className="text-4xl md:text-7xl font-black tracking-tight text-white leading-[1.08]">
                "장소가 아닌 <span className="bg-gradient-to-r from-[#E6B7C7] to-[#D49EB1] bg-clip-text text-transparent">코스</span>를 공유한다."
              </h1>
              <p className="text-zinc-400 text-lg md:text-xl font-normal leading-relaxed">
                Route는 사용자가 자신의 여행 경로를 직접 설계하고, 지도 위에서 실제 이동 경험을 나누는 차세대 위치 기반 여행 플랫폼입니다. 복잡한 SNS를 넘어 완벽히 작동하는 웹 MVP 서비스를 구축했습니다.
              </p>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2">
                <button 
                  onClick={() => setActiveTab('vision')} 
                  className="px-8 py-4 rounded-full bg-white text-[#111111] font-bold text-sm hover:bg-[#E6B7C7] shadow-xl transition-all duration-300 flex items-center space-x-2 cursor-pointer hover:scale-105"
                >
                  <span>제품 비전 살펴보기</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setActiveTab('journey')} 
                  className="px-8 py-4 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 text-white font-bold text-sm backdrop-blur-md transition-all duration-300 cursor-pointer hover:scale-105"
                >
                  개발 여정 (Journey)
                </button>
              </div>
            </div>

            <div className="relative z-10 w-full md:w-auto flex-shrink-0">
              <div className="w-72 h-72 md:w-80 md:h-80 rounded-[32px] bg-gradient-to-br from-white/10 to-white/5 border border-white/15 backdrop-blur-2xl p-8 flex flex-col justify-between shadow-2xl">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-[#E6B7C7]/20 flex items-center justify-center text-[#E6B7C7]">
                    <Compass className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">Active MVP</span>
                </div>
                <div className="space-y-2 text-left">
                  <p className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Core Philosophy</p>
                  <p className="text-xl font-bold text-white">Every Course,<br />Every Memory.</p>
                </div>
                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-zinc-400">
                  <span>React 19 / Vite</span>
                  <span>Firebase / Maps</span>
                </div>
              </div>
            </div>
          </div>

          {/* Problem & Solution Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-[32px] bg-[#121216] border border-white/10 p-10 space-y-6 shadow-xl relative overflow-hidden group hover:border-red-500/30 transition-all">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-2xl group-hover:bg-red-500/15 transition-all"></div>
              <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center text-xl font-black">
                ✕
              </div>
              <h3 className="text-2xl font-bold text-white">기존 여행 계획의 한계 (Problem)</h3>
              <p className="text-zinc-400 leading-relaxed text-base">
                지도 앱, 블로그, SNS를 번갈아 가며 정보를 수집하고 텍스트로 정리하지만, 현장에 도착하면 동선이 끊기고 실제 경험은 기록되지 않습니다. 단편적인 장소 추천만으로는 생생한 여행 코스를 재현하기 어렵습니다.
              </p>
            </div>

            <div className="rounded-[32px] bg-[#121216] border border-white/10 p-10 space-y-6 shadow-xl relative overflow-hidden group hover:border-emerald-500/30 transition-all">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/15 transition-all"></div>
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center text-xl font-black">
                ✓
              </div>
              <h3 className="text-2xl font-bold text-white">Route의 통합 솔루션 (Solution)</h3>
              <p className="text-zinc-400 leading-relaxed text-base">
                검색, 지도, 코스 생성, SNS 공유, 실시간 내비게이션까지 하나의 플랫폼에 통합했습니다. 사용자는 다른 사람의 코스를 그대로 가져와 완주하고, 자신만의 독창적인 여행 루트를 세상에 공유할 수 있습니다.
              </p>
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="rounded-[28px] bg-[#121216] border border-white/10 p-8 space-y-2 text-center shadow-lg">
              <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Target Platform</p>
              <p className="text-3xl font-extrabold text-white">Web MVP</p>
              <p className="text-xs text-zinc-400">React + Vite 즉시 접속</p>
            </div>
            <div className="rounded-[28px] bg-[#121216] border border-white/10 p-8 space-y-2 text-center shadow-lg">
              <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Core Engine</p>
              <p className="text-3xl font-extrabold text-[#E6B7C7]">Google Maps</p>
              <p className="text-xs text-zinc-400">Places & Directions API</p>
            </div>
            <div className="rounded-[28px] bg-[#121216] border border-white/10 p-8 space-y-2 text-center shadow-lg">
              <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Backend DB</p>
              <p className="text-3xl font-extrabold text-[#6D9EEB]">Firebase</p>
              <p className="text-xs text-zinc-400">Auth, Firestore, Storage</p>
            </div>
            <div className="rounded-[28px] bg-[#121216] border border-white/10 p-8 space-y-2 text-center shadow-lg">
              <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Collaboration</p>
              <p className="text-3xl font-extrabold text-white">AI-Driven</p>
              <p className="text-xs text-zinc-400">Claude + ChatGPT + Manus</p>
            </div>
          </div>
        </main>
      )}

      {/* Product Vision Tab */}
      {activeTab === 'vision' && (
        <main className="max-w-7xl mx-auto px-6 py-16 space-y-16 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">Product Vision</h2>
            <p className="text-zinc-400 text-lg">사용자가 여행을 발견하고, 설계하고, 이동하는 모든 여정을 관통하는 4가지 핵심 기능입니다.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-[32px] bg-[#121216] border border-white/10 p-10 space-y-6 shadow-xl hover:border-[#6D9EEB]/40 transition-all group">
              <div className="w-16 h-16 rounded-2xl bg-[#6D9EEB]/10 border border-[#6D9EEB]/20 text-[#6D9EEB] flex items-center justify-center group-hover:scale-110 transition-transform">
                <Compass className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-white">01. 지도 기반 장소 탐색 (Map Exploration)</h3>
              <p className="text-zinc-400 leading-relaxed text-base">
                지도 위에서 주변의 인기 장소를 발견하고, 다른 여행자들이 공유한 생생한 코스를 시각적으로 탐색합니다. 카테고리별 필터를 통해 원하는 취향의 명소를 한눈에 찾을 수 있습니다.
              </p>
            </div>

            <div className="rounded-[32px] bg-[#121216] border border-white/10 p-10 space-y-6 shadow-xl hover:border-[#E6B7C7]/40 transition-all group">
              <div className="w-16 h-16 rounded-2xl bg-[#E6B7C7]/10 border border-[#E6B7C7]/20 text-[#E6B7C7] flex items-center justify-center group-hover:scale-110 transition-transform">
                <RouteIcon className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-white">02. 나만의 코스 제작 (Course Creation)</h3>
              <p className="text-zinc-400 leading-relaxed text-base">
                방문할 장소들을 날짜(DAY)별로 선택하고 순서를 직관적으로 배치하여 나만의 여행 및 데이트 코스를 직접 설계합니다. 코스 저장 시 실시간으로 데이터베이스에 안전하게 반영됩니다.
              </p>
            </div>

            <div className="rounded-[32px] bg-[#121216] border border-white/10 p-10 space-y-6 shadow-xl hover:border-purple-500/40 transition-all group">
              <div className="w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-white">03. 코스 기반 SNS 공유 (Route SNS)</h3>
              <p className="text-zinc-400 leading-relaxed text-base">
                단순한 사진 낱장이 아닌, 완성된 동선과 지도 경로가 포함된 코스를 커뮤니티 피드에 공유합니다. 좋아요와 댓글, 팔로우 기능을 통해 다른 사용자들과 여행 경험을 나눕니다.
              </p>
            </div>

            <div className="rounded-[32px] bg-[#121216] border border-white/10 p-10 space-y-6 shadow-xl hover:border-amber-500/40 transition-all group">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Navigation className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-white">04. 실시간 지도 따라가기 (Travel Navigator)</h3>
              <p className="text-zinc-400 leading-relaxed text-base">
                작성된 코스를 바탕으로 실제 현장에서 실시간 GPS 추적과 경로 안내를 받으며 여행을 완주할 수 있습니다. 완주 후에는 자동으로 여행 기록(Travel Log)이 생성됩니다.
              </p>
            </div>
          </div>
        </main>
      )}

      {/* Development Journey Tab */}
      {activeTab === 'journey' && (
        <main className="max-w-5xl mx-auto px-6 py-16 space-y-16 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">Development Journey</h2>
            <p className="text-zinc-400 text-lg">아이디어 구상부터 웹 서비스 배포까지, 부트캠프 형식으로 체계적으로 진행된 5단계 개발 로드맵입니다.</p>
          </div>

          <div className="space-y-6">
            <div className="rounded-[32px] bg-[#121216] border border-white/10 p-8 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
              <div className="space-y-3">
                <span className="px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-semibold">Completed</span>
                <h3 className="text-2xl font-bold text-white">Phase 1: 아이디어 및 브랜드 설계</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">핵심 가치 정의, 브랜드 아이덴티티(Route) 수립, 디자인 시스템 및 컬러 팔레트 확정.</p>
              </div>
              <div className="text-sm font-mono text-zinc-500 bg-white/5 px-4 py-2 rounded-xl border border-white/10 self-start md:self-center">Week 1–2</div>
            </div>

            <div className="rounded-[32px] bg-[#121216] border border-white/10 p-8 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
              <div className="space-y-3">
                <span className="px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-semibold">Completed</span>
                <h3 className="text-2xl font-bold text-white">Phase 2: 프로토타입 제작 및 화면 아키텍처</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">React + Vite 기반 화면 구조 설계, 주요 컴포넌트 목업 및 네비게이션 흐름 정의.</p>
              </div>
              <div className="text-sm font-mono text-zinc-500 bg-white/5 px-4 py-2 rounded-xl border border-white/10 self-start md:self-center">Week 3–4</div>
            </div>

            <div className="rounded-[32px] bg-[#121216] border border-white/10 p-8 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
              <div className="space-y-3">
                <span className="px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-semibold">Completed</span>
                <h3 className="text-2xl font-bold text-white">Phase 3: Firebase 및 Google Maps API 연동</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">Firebase Authentication 회원가입/로그인, Firestore 데이터 스키마 구축, Google Maps 장소 검색 및 마커 연동.</p>
              </div>
              <div className="text-sm font-mono text-zinc-500 bg-white/5 px-4 py-2 rounded-xl border border-white/10 self-start md:self-center">Week 5–6</div>
            </div>

            <div className="rounded-[32px] bg-[#121216] border border-[#E6B7C7]/40 p-8 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#E6B7C7]/10 rounded-full blur-3xl pointer-events-none"></div>
              <div className="space-y-3 relative z-10">
                <span className="px-3.5 py-1 rounded-full bg-[#E6B7C7]/20 border border-[#E6B7C7]/30 text-[#E6B7C7] text-xs font-mono font-semibold">In Progress</span>
                <h3 className="text-2xl font-bold text-white">Phase 4: MVP 핵심 기능 고도화</h3>
                <p className="text-zinc-300 text-sm leading-relaxed">CreateScreen 코스 생성 UX 완성, MyCourse 저장된 코스 관리, Course Detail 상세 보기 리디자인.</p>
              </div>
              <div className="text-sm font-mono text-[#E6B7C7] bg-[#E6B7C7]/10 px-4 py-2 rounded-xl border border-[#E6B7C7]/20 self-start md:self-center relative z-10">Current Stage</div>
            </div>

            <div className="rounded-[32px] bg-[#121216] border border-white/10 p-8 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
              <div className="space-y-3">
                <span className="px-3.5 py-1 rounded-full bg-zinc-500/10 border border-zinc-500/20 text-zinc-400 text-xs font-mono font-semibold">Upcoming</span>
                <h3 className="text-2xl font-bold text-white">Phase 5: 웹 서비스 공개 및 QA</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">Vercel 배포, 반응형 UI 최종 검수, 사용자 피드백 반영 및 AI 추천 기능 연동.</p>
              </div>
              <div className="text-sm font-mono text-zinc-500 bg-white/5 px-4 py-2 rounded-xl border border-white/10 self-start md:self-center">Week 8+</div>
            </div>
          </div>
        </main>
      )}

      {/* Tech Stack Tab */}
      {activeTab === 'tech' && (
        <main className="max-w-7xl mx-auto px-6 py-16 space-y-16 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">Tech Stack</h2>
            <p className="text-zinc-400 text-lg">안정성과 확장성을 고려하여 엄선한 모던 웹 기술 스택입니다.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-[32px] bg-[#121216] border border-white/10 p-10 space-y-6 shadow-xl">
              <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center">
                <Globe className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-white">Frontend</h3>
              <ul className="space-y-3 text-sm text-zinc-300">
                <li className="flex items-center space-x-3"><CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" /><span>React 19 & TypeScript</span></li>
                <li className="flex items-center space-x-3"><CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" /><span>Vite 울트라 패스트 빌드</span></li>
                <li className="flex items-center space-x-3"><CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" /><span>Tailwind CSS v4 스타일링</span></li>
                <li className="flex items-center space-x-3"><CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" /><span>Lucide React 아이콘</span></li>
              </ul>
            </div>

            <div className="rounded-[32px] bg-[#121216] border border-white/10 p-10 space-y-6 shadow-xl">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
                <Cpu className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-white">Backend & DB</h3>
              <ul className="space-y-3 text-sm text-zinc-300">
                <li className="flex items-center space-x-3"><CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" /><span>Firebase Authentication</span></li>
                <li className="flex items-center space-x-3"><CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" /><span>Cloud Firestore NoSQL DB</span></li>
                <li className="flex items-center space-x-3"><CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" /><span>Firebase Storage</span></li>
                <li className="flex items-center space-x-3"><CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" /><span>Cloud Functions (AI 추천)</span></li>
              </ul>
            </div>

            <div className="rounded-[32px] bg-[#121216] border border-white/10 p-10 space-y-6 shadow-xl">
              <div className="w-14 h-14 rounded-2xl bg-[#E6B7C7]/10 border border-[#E6B7C7]/20 text-[#E6B7C7] flex items-center justify-center">
                <MapPin className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-white">APIs & Tools</h3>
              <ul className="space-y-3 text-sm text-zinc-300">
                <li className="flex items-center space-x-3"><CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" /><span>Google Maps JavaScript API</span></li>
                <li className="flex items-center space-x-3"><CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" /><span>Google Places & Directions API</span></li>
                <li className="flex items-center space-x-3"><CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" /><span>Git & GitHub Version Control</span></li>
                <li className="flex items-center space-x-3"><CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" /><span>Vercel Deployment Pipeline</span></li>
              </ul>
            </div>
          </div>
        </main>
      )}

      {/* AI Collaboration Tab */}
      {activeTab === 'ai' && (
        <main className="max-w-7xl mx-auto px-6 py-16 space-y-16 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">AI Collaboration Team</h2>
            <p className="text-zinc-400 text-lg">AI 모델들과의 유기적인 협업 파이프라인으로 기획부터 개발, 검증까지 완벽하게 수행합니다.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="rounded-[32px] bg-[#121216] border border-white/10 p-8 space-y-6 shadow-xl text-center">
              <div className="w-16 h-16 rounded-3xl bg-blue-500/10 border border-blue-500/20 text-blue-400 mx-auto flex items-center justify-center font-black text-xl">
                GPT
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-xl text-white">ChatGPT</h3>
                <p className="text-xs font-mono text-blue-400 uppercase tracking-widest">Product Manager</p>
              </div>
              <p className="text-sm text-zinc-400 leading-relaxed">서비스 방향 결정, 기능 기획 및 우선순위 수립, PRD 작성 총괄.</p>
            </div>

            <div className="rounded-[32px] bg-[#121216] border border-white/10 p-8 space-y-6 shadow-xl text-center">
              <div className="w-16 h-16 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center font-black text-xl">
                CLD
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-xl text-white">Claude</h3>
                <p className="text-xs font-mono text-emerald-400 uppercase tracking-widest">Lead Developer</p>
              </div>
              <p className="text-sm text-zinc-400 leading-relaxed">React 및 Firebase 아키텍처 구현, 코드 리팩토링 및 기능 개발.</p>
            </div>

            <div className="rounded-[32px] bg-[#121216] border border-white/10 p-8 space-y-6 shadow-xl text-center">
              <div className="w-16 h-16 rounded-3xl bg-purple-500/10 border border-purple-500/20 text-purple-400 mx-auto flex items-center justify-center font-black text-xl">
                GEM
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-xl text-white">Gemini</h3>
                <p className="text-xs font-mono text-purple-400 uppercase tracking-widest">QA Engineer</p>
              </div>
              <p className="text-sm text-zinc-400 leading-relaxed">UI 검수, 기능 테스트, 엣지 케이스 및 버그 리포트 작성.</p>
            </div>

            <div className="rounded-[32px] bg-[#121216] border border-white/10 p-8 space-y-6 shadow-xl text-center">
              <div className="w-16 h-16 rounded-3xl bg-[#E6B7C7]/10 border border-[#E6B7C7]/20 text-[#E6B7C7] mx-auto flex items-center justify-center font-black text-xl">
                MAN
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-xl text-white">Manus AI</h3>
                <p className="text-xs font-mono text-[#E6B7C7] uppercase tracking-widest">Autonomous Agent</p>
              </div>
              <p className="text-sm text-zinc-400 leading-relaxed">자율 실행 에이전트로서 전체 프로젝트 조율, 배포 및 통합 관리.</p>
            </div>
          </div>
        </main>
      )}

      {/* Design System Tab */}
      {activeTab === 'design' && (
        <main className="max-w-7xl mx-auto px-6 py-16 space-y-16 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">Design System</h2>
            <p className="text-zinc-400 text-lg">Apple 스타일의 깊이감과 모던한 감성을 담아낸 Route만의 디자인 철학입니다.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-[32px] bg-[#121216] border border-white/10 p-10 space-y-8 shadow-xl">
              <h3 className="text-2xl font-bold text-white">Color Palette</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div className="w-12 h-12 rounded-2xl bg-[#050507] border border-white/20"></div>
                  <div>
                    <p className="font-bold text-white text-sm">Dark Background</p>
                    <p className="text-xs font-mono text-zinc-400">#050507 (Apple OLED Black)</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div className="w-12 h-12 rounded-2xl bg-[#E6B7C7]"></div>
                  <div>
                    <p className="font-bold text-white text-sm">Primary Pink Accent</p>
                    <p className="text-xs font-mono text-zinc-400">#E6B7C7 (Route Signature Pink)</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div className="w-12 h-12 rounded-2xl bg-[#6D9EEB]"></div>
                  <div>
                    <p className="font-bold text-white text-sm">Secondary Blue Accent</p>
                    <p className="text-xs font-mono text-zinc-400">#6D9EEB (Map & Navigation Blue)</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[32px] bg-[#121216] border border-white/10 p-10 space-y-8 shadow-xl">
              <h3 className="text-2xl font-bold text-white">Design Principles</h3>
              <ul className="space-y-6 text-sm text-zinc-300">
                <li className="space-y-1">
                  <p className="font-bold text-white text-base">01. Immersive Glassmorphism</p>
                  <p className="text-zinc-400">반투명 블러 효과와 미세한 보더 라인을 활용하여 입체감 있는 UI 구현.</p>
                </li>
                <li className="space-y-1">
                  <p className="font-bold text-white text-base">02. Card-Centric Architecture</p>
                  <p className="text-zinc-400">정보의 가독성을 극대화하는 넉넉한 여백과 둥근 모서리(Rounded-3xl).</p>
                </li>
                <li className="space-y-1">
                  <p className="font-bold text-white text-base">03. High Contrast & Legibility</p>
                  <p className="text-zinc-400">어두운 배경 위에서 돋보이는 맑은 화이트 텍스트와 감각적인 포인트 컬러.</p>
                </li>
              </ul>
            </div>
          </div>
        </main>
      )}

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-6 py-16 border-t border-white/10 mt-28 text-center text-sm text-zinc-500 space-y-3 relative z-10">
        <p className="text-zinc-400 font-medium">© 2026 Route Project Bootcamp HQ. All rights reserved.</p>
        <p className="font-mono text-xs text-zinc-600">Every Course, Every Memory. Built with React, Vite & Tailwind CSS.</p>
      </footer>
    </div>
  );
}
