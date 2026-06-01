"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { CREATURES } from "@/app/page";

export default function DetailPage() {
  const params = useParams();
  const router = useRouter();
  
  // Find the creature in our central database
  const creatureId = params.id as string;
  const creature = CREATURES.find((c) => c.id === creatureId);

  // Interaction feedback states
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // If creature doesn't exist
  if (!creature) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#060a16] text-slate-100 p-6">
        <div className="text-center glass-panel border border-cyan-500/20 rounded-2xl p-8 max-w-sm">
          <span className="text-5xl block mb-4">🐠</span>
          <h2 className="text-2xl font-bold text-cyan-400 mb-2">생물 정보를 찾을 수 없습니다</h2>
          <p className="text-sm text-slate-400 mb-6">존재하지 않거나 업데이트 예정인 수생생물입니다.</p>
          <Link
            href="/"
            className="px-6 py-2.5 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg text-sm font-semibold hover:from-cyan-500 hover:to-blue-500 transition-all inline-block"
          >
            메인 페이지로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col text-slate-100 bg-[#060a16] pb-20 relative">
      
      {/* Toast Notification Popup */}
      {toastMessage && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 animate-bounce">
          <div className="bg-slate-950/90 border border-cyan-400/40 text-cyan-400 backdrop-blur-md px-6 py-3 rounded-full text-xs sm:text-sm font-bold shadow-xl shadow-cyan-950/60 flex items-center gap-2">
            <span>✨</span>
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------
          1. DETAILS HEADER
          ------------------------------------------------------------- */}
      <header className="w-full glass-panel border-b border-cyan-500/10 mb-8 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors font-bold text-sm">
            <span>◀</span>
            <span>도감 메인으로</span>
          </Link>

          <span className="text-lg font-bold tracking-wider text-cyan-400 glow-text">
            AquaScope Encyclopedia
          </span>

          <div className="flex items-center gap-2">
            <span className="text-xs bg-cyan-950 text-cyan-400 border border-cyan-500/30 px-2.5 py-1 rounded-md font-mono font-semibold">
              {creature.category === "tropical" && "🐠 열대어"}
              {creature.category === "coldwater" && "🐟 냉수어"}
              {creature.category === "saltwater" && "🐡 해수어"}
              {creature.category === "plant" && "🌿 수초"}
            </span>
          </div>
        </div>
      </header>

      {/* -------------------------------------------------------------
          2. DOUBLE COLUMN DETAILED LAYOUT
          ------------------------------------------------------------- */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* ==================== LEFT COLUMN (7/12 width) ==================== */}
        <section className="lg:col-span-7 space-y-6">
          
          {/* A. Hero Graphic Card */}
          <div className="glass-panel border border-cyan-500/15 rounded-3xl overflow-hidden relative shadow-lg">
            {/* Background Cover Image */}
            <div className="aspect-[16/9] w-full relative bg-slate-950">
              <img
                src={creature.image}
                alt={creature.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060a16] via-slate-950/20 to-transparent" />
            </div>

            {/* Float Info Box */}
            <div className="p-6 sm:p-8 relative -mt-16 bg-slate-950/80 backdrop-blur-md border-t border-cyan-500/10 rounded-t-3xl">
              <div className="flex flex-wrap gap-2 mb-3">
                {creature.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] sm:text-xs font-semibold px-2.5 py-0.5 rounded-full bg-cyan-950/50 text-cyan-400 border border-cyan-500/20"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-slate-100 glow-text mb-1">
                {creature.name}
              </h1>
              <p className="text-sm sm:text-base text-cyan-500 italic font-mono mb-4">
                {creature.scientificName}
              </p>
              <p className="text-sm text-slate-300 leading-relaxed">
                {creature.description}
              </p>
            </div>
          </div>

          {/* B. Biological Features (생물학적 특징) */}
          <div className="glass-panel border border-cyan-500/10 rounded-2xl p-6 sm:p-8 space-y-4">
            <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2 border-b border-cyan-500/10 pb-3">
              <span>🧬</span> 생물학적 특징
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed font-sans whitespace-pre-line">
              {creature.biologicalFeatures}
            </p>
          </div>

          {/* C. Cohabitation Info (합사 정보) */}
          <div className="glass-panel border border-cyan-500/10 rounded-2xl p-6 sm:p-8 space-y-4">
            <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2 border-b border-cyan-500/10 pb-3">
              <span>👥</span> 합사 가이드 (Cohabitation)
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed font-sans whitespace-pre-line">
              {creature.cohabitationInfo}
            </p>
          </div>

          {/* D. Bottom Caution Banner (주의사항) */}
          {creature.id === "betta" && (
            <div className="rounded-2xl border border-red-500/20 bg-red-950/20 p-5 flex items-start gap-4">
              <span className="text-2xl">⚠️</span>
              <div>
                <h4 className="text-sm font-bold text-red-400">단독 사육 필수 경고</h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  수컷 베타는 투쟁심이 강해 동종끼리 합사할 시 한 마리가 죽을 때까지 싸웁니다. 거울 플레어링은 하루 5분 이내로 제한해 주세요.
                </p>
              </div>
            </div>
          )}
          {creature.id === "goldfish" && (
            <div className="rounded-2xl border border-amber-500/20 bg-amber-950/20 p-5 flex items-start gap-4">
              <span className="text-2xl">⚠️</span>
              <div>
                <h4 className="text-sm font-bold text-amber-400">여과장치 점검 권고</h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  금붕어는 배설량이 엄청난 대식가이므로 상면여과기 혹은 외부여과기와 같이 강력한 물리 여과 수단이 갖춰진 곳에서 기르는 것이 필수적입니다.
                </p>
              </div>
            </div>
          )}
          {creature.id === "clownfish" && (
            <div className="rounded-2xl border border-cyan-500/20 bg-cyan-950/20 p-5 flex items-start gap-4">
              <span className="text-2xl">💡</span>
              <div>
                <h4 className="text-sm font-bold text-cyan-400">말미잘 합사 주의</h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  말미잘은 강력한 해수 수조 조명과 원활한 수류가 없으면 쉽게 녹아 수질을 악화시킵니다. 말미잘 합사는 수조가 6개월 이상 안정된 뒤 진행해 주세요.
                </p>
              </div>
            </div>
          )}

        </section>

        {/* ==================== RIGHT COLUMN (5/12 width) ==================== */}
        <section className="lg:col-span-5 space-y-6">
          
          {/* A. Key Stats Card (주요 통계) */}
          <div className="glass-panel border border-cyan-500/15 rounded-2xl p-6 sm:p-8">
            <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2 border-b border-cyan-500/10 pb-3 mb-5">
              <span>📊</span> 주요 정보 및 스펙
            </h3>

            <div className="space-y-4 text-sm mb-6">
              <div className="flex items-center justify-between py-2 border-b border-slate-900">
                <span className="text-slate-400">⏳ 평균 수명</span>
                <span className="font-bold text-slate-200">{creature.stats.lifespan}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-slate-900">
                <span className="text-slate-400">📏 성체 크기</span>
                <span className="font-bold text-slate-200">{creature.stats.size}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-slate-900">
                <span className="text-slate-400">🌡️ 적정 수온</span>
                <span className="font-bold text-cyan-400">{creature.stats.temp}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-slate-900">
                <span className="text-slate-400">🧪 적정 수질 (pH)</span>
                <span className="font-bold text-cyan-400">pH {creature.stats.pH}</span>
              </div>
              {creature.stats.salinity && (
                <div className="flex items-center justify-between py-2 border-b border-slate-900">
                  <span className="text-slate-400">🧂 적정 해수 염도</span>
                  <span className="font-bold text-amber-400">{creature.stats.salinity}</span>
                </div>
              )}
            </div>

            {/* Custom Interactive Action Buttons */}
            <div className="space-y-3 pt-2">
              <button
                onClick={() => triggerToast("📄 사육 가이드 PDF 고해상도 가이드북 다운로드가 완료되었습니다.")}
                className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-cyan-400 border border-cyan-500/20 hover:border-cyan-400 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2"
              >
                <span>📄</span> 사육 가이드 PDF 다운로드
              </button>
              <button
                onClick={() => triggerToast(`📥 [${creature.name}]이(가) 내 마이 탱크(My Tank) 컬렉션에 추가되었습니다!`)}
                className="w-full py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2"
              >
                <span>📥</span> 내 어항에 추가하기
              </button>
              <button
                onClick={() => triggerToast(`📖 [${creature.name}] 분석 리포트가 내 백과사전 스크랩북에 등록되었습니다.`)}
                className="w-full py-3 bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2"
              >
                <span>📖</span> 아쿠아 도감 등록 및 즐겨찾기
              </button>
            </div>
          </div>

          {/* B. Special Info Card (특이 정보) */}
          <div className="glass-panel border border-cyan-500/10 rounded-2xl p-6 sm:p-8 space-y-3 bg-cyan-950/10">
            <span className="text-xs font-bold px-2 py-0.5 bg-cyan-900 text-cyan-400 border border-cyan-500/20 rounded">
              SPECIAL REPORT
            </span>
            <h4 className="text-base font-extrabold text-slate-100">
              {creature.specialInfo.title}
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              {creature.specialInfo.content}
            </p>
          </div>

          {/* C. Habitat & Ecology Card (서식지 및 식생) */}
          <div className="glass-panel border border-cyan-500/10 rounded-2xl p-6 sm:p-8 space-y-3">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">
              🏠 원산지 및 야생 서식지
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {creature.habitat}
            </p>
          </div>

          {/* D. Management Schedule Card (관리 일정) */}
          <div className="glass-panel border border-cyan-500/15 rounded-2xl p-6 sm:p-8">
            <h3 className="text-base font-bold text-slate-100 flex items-center gap-2 border-b border-cyan-500/10 pb-3 mb-4">
              <span>📅</span> 추천 사육 및 관리 일정
            </h3>
            
            <div className="space-y-3">
              {creature.schedule.map((item, idx) => (
                <div 
                  key={idx}
                  className="flex items-center gap-3 bg-slate-950/60 p-3 rounded-lg border border-cyan-500/5 text-xs text-slate-300 hover:border-cyan-500/20 transition-colors"
                >
                  <span className="w-5 h-5 rounded-full bg-cyan-950 text-cyan-400 font-mono font-bold flex items-center justify-center text-[10px] shrink-0 border border-cyan-500/20">
                    {idx + 1}
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <p className="text-[10px] text-slate-500 mt-4 text-center">
              ※ 아쿠아스코프 시스템이 제공하는 권장 일정이며, 실제 개체 수에 따라 조율해 주세요.
            </p>
          </div>

        </section>

      </main>

    </div>
  );
}
