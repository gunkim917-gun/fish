"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";

// -------------------------------------------------------------
// Creature Interface & Dataset Definition
// -------------------------------------------------------------
export interface Creature {
  id: string;
  name: string;
  scientificName: string;
  category: "tropical" | "coldwater" | "saltwater" | "plant";
  image: string;
  isPremium: boolean;
  tags: string[];
  description: string;
  biologicalFeatures: string;
  cohabitationInfo: string;
  stats: {
    lifespan: string;
    size: string;
    temp: string;
    pH: string;
    salinity?: string;
  };
  specialInfo: {
    title: string;
    content: string;
  };
  habitat: string;
  schedule: string[];
}

export const CREATURES: Creature[] = [
  // 1. 열대어 (Tropical Fish)
  {
    id: "guppy",
    name: "구피",
    scientificName: "Poecilia reticulata",
    category: "tropical",
    image: "/images/guppy.png",
    isPremium: false,
    tags: ["인기", "초보자 추천", "화려함"],
    description: "아름다운 꼬리지느러미와 강인한 생명력으로 입문자에게 가장 사랑받는 대표적인 열대어입니다.",
    biologicalFeatures: "구피는 몸집이 작고 활발하며, 수컷은 암컷에 비해 매우 화려하고 큰 지느러미를 가집니다. 번식력이 매우 뛰어나 수조 내에서 쉽게 번식하는 모습을 관찰할 수 있습니다.",
    cohabitationInfo: "순한 성격으로 대부분의 소형 열대어(네온테트라, 코리도라스 등)와 훌륭하게 합사할 수 있습니다. 단, 베타처럼 지느러미를 쪼는 어종이나 대형어와의 합사는 피해야 합니다.",
    stats: {
      lifespan: "2 ~ 3년",
      size: "3 ~ 6 cm",
      temp: "22°C ~ 28°C",
      pH: "7.0 ~ 8.0"
    },
    specialInfo: {
      title: "난태생 송사리과",
      content: "알을 낳지 않고 몸속에서 알을 부화시켜 직접 새끼를 낳는 독특한 번식 형태를 가지고 있습니다."
    },
    habitat: "중남미 원산으로 물의 흐름이 느리고 수초가 풍부한 강이나 늪지대에서 주로 서식합니다.",
    schedule: ["매일 1~2회: 소형어 전용 사료 급여", "매주 토요일: 20~30% 부분 환수", "매월 1일: 여과기 점검 및 수질 측정"]
  },
  {
    id: "betta",
    name: "베타",
    scientificName: "Betta splendens",
    category: "tropical",
    image: "/images/betta.png",
    isPremium: false,
    tags: ["화려함", "단독 사육", "지능적"],
    description: "마치 물속에서 춤추는 드레스를 연상시키는 크고 화려한 지느러미를 가진 투어(鬪魚)입니다.",
    biologicalFeatures: "베타는 매우 강한 영역 본능을 가진 투어로, 특히 수컷끼리는 목숨을 걸고 싸우기 때문에 반드시 단독 사육해야 합니다. 주인과 눈을 맞추는 등 지능적인 행동을 보입니다.",
    cohabitationInfo: "수컷 베타는 반드시 1마리만 단독 사육하는 것을 원칙으로 합니다. 네온테트라 등 매우 순하고 빠른 소형어와 넓은 수조에서는 제한적인 합사가 가능하나 추천하지 않습니다.",
    stats: {
      lifespan: "3 ~ 5년",
      size: "6 ~ 8 cm",
      temp: "24°C ~ 30°C",
      pH: "6.5 ~ 7.5"
    },
    specialInfo: {
      title: "라비린스(미로) 기관",
      content: "아가미 외에도 공기 호흡을 할 수 있는 특수 기관이 있어 산소가 부족한 좁은 고인 물에서도 생존할 수 있습니다."
    },
    habitat: "동남아시아(태국, 캄보디아 등)의 느리게 흐르는 하천, 논, 웅덩이 등 수초가 밀생한 곳에 서식합니다.",
    schedule: ["매일 1~2회: 베타 전용 침강성 사료 급여", "주 2회: 스포이드를 이용한 배설물 제거 및 환수", "매주 일요일: 지느러미 손상 여부 확인"]
  },
  {
    id: "neontetra",
    name: "네온테트라",
    scientificName: "Paracheirodon innesi",
    category: "tropical",
    image: "/images/neontetra.png",
    isPremium: false,
    tags: ["군영", "초보자 추천", "가성비"],
    description: "몸 표면을 가로지르는 붉고 푸른 네온 빛 띠가 아름다운, 군영을 이루어 헤엄치는 소형종입니다.",
    biologicalFeatures: "몸집이 3cm 내외로 아주 작으며, 여러 마리가 떼를 지어 군영을 할 때 극강의 아름다움을 발휘합니다. 성격이 온순하고 튼튼하여 군영 수조의 마스코트로 꼽힙니다.",
    cohabitationInfo: "온순한 모든 소형 열대어와 합사가 가능합니다. 구피, 플래티, 코리도라스 등과 매우 잘 지내며, 몸집 차이가 크게 나는 대형 어종(엔젤피쉬 등)의 경우 먹이가 될 수 있으므로 주의해야 합니다.",
    stats: {
      lifespan: "3 ~ 5년",
      size: "3 ~ 4 cm",
      temp: "20°C ~ 26°C",
      pH: "6.0 ~ 7.0"
    },
    specialInfo: {
      title: "빛의 굴절을 이용한 네온 광택",
      content: "피부 밑 반사 세포를 통해 푸른빛을 반사하며 어두운 물 속에서도 서로를 확인해 무리를 짓도록 도와줍니다."
    },
    habitat: "아마존 강 상류의 물 흐름이 완만하고 나뭇잎이 쌓여 유기산이 풍부한 블랙워터 지역에 서식합니다.",
    schedule: ["매일 2회: 미립자 사료 소량 급여", "격주 토요일: 25% 환수 및 수질 관리", "매월 15일: 수조 내 이끼 제거 및 청소"]
  },
  {
    id: "discus",
    name: "디스커스",
    scientificName: "Symphysodon",
    category: "tropical",
    image: "/images/guppy.png",
    isPremium: true,
    tags: ["열대어의 왕", "숙련자용", "고가"],
    description: "원반 모양의 독특한 체형과 환상적인 바디 패턴을 가진 '열대어의 왕'이라 불리는 품격 있는 종입니다.",
    biologicalFeatures: "매우 예민한 성격을 가지고 있으며, 완벽한 수질 관리가 요구됩니다. 치어에게 부모의 피부에서 분비되는 '디스커스 밀크'를 먹여 키우는 독특한 모성애를 가집니다.",
    cohabitationInfo: "매우 온순하고 느리기 때문에 성격이 강하거나 빠른 어종과의 합사는 피해야 합니다. 카디널테트라, 러미노즈테트라 등 조용하고 순한 소형종과 합사가 권장됩니다.",
    stats: {
      lifespan: "10 ~ 15년",
      size: "15 ~ 20 cm",
      temp: "28°C ~ 32°C",
      pH: "5.5 ~ 6.5"
    },
    specialInfo: {
      title: "디스커스 밀크 수유",
      content: "산란 후 부모의 몸에서 영양 물질이 담긴 점액질(밀크)을 분비하여 갓 부화한 새끼를 먹여 키웁니다."
    },
    habitat: "아마존강 유역의 나뭇가지가 많고 물의 흐름이 거의 없으며 따뜻하고 산성도가 높은 곳에 서식합니다.",
    schedule: ["매일 3~4회: 햄벅 사료 급여 (수질 오염 주의)", "매일 또는 격일: 10~20% 고빈도 환수", "매주 수요일: 수질 질산염 측정 및 여과 필터 세척"]
  },
  {
    id: "altum",
    name: "알텀 엔젤피쉬",
    scientificName: "Pterophyllum altum",
    category: "tropical",
    image: "/images/betta.png",
    isPremium: true,
    tags: ["수직의 미학", "대형종", "희귀종"],
    description: "위아래로 길게 뻗은 지느러미와 기품 있는 스트라이프 패턴이 매력적인 오리지널 엔젤피쉬입니다.",
    biologicalFeatures: "일반 엔젤피쉬보다 몸의 높이가 훨씬 높게 자라며 성격이 다소 예민합니다. 약산성의 아주 깨끗한 수질에서만 본연의 긴 지느러미 핀을 곧게 유지할 수 있습니다.",
    cohabitationInfo: "유어기에는 순하지만 성어가 되면서 소형 네온테트라 등을 사냥할 수 있으므로 크기 차이가 나는 합사는 지양합니다. 코리도라스, 디스커스 등과 좋은 조합을 이룹니다.",
    stats: {
      lifespan: "8 ~ 10년",
      size: "20 ~ 30 cm (높이)",
      temp: "26°C ~ 30°C",
      pH: "4.8 ~ 6.2"
    },
    specialInfo: {
      title: "높고 기품있는 종적 체형",
      content: "수풀 사이를 수직으로 유영하기 적합하도록 진화한 극단적인 플랫 체형을 특징으로 합니다."
    },
    habitat: "남미 오리노코 강 유역의 깊고 흐름이 느리며 침수된 나무뿌리가 얽혀 있는 수역에 주로 서식합니다.",
    schedule: ["매일 2회: 생먹이(냉동 장구벌레) 및 사료 급여", "매주 일요일: 30% 정밀 환수", "매월 말일: 수조 레이아웃 점검 및 이끼 제거"]
  },

  // 2. 냉수어 (Coldwater Fish)
  {
    id: "goldfish",
    name: "금붕어",
    scientificName: "Carassius auratus",
    category: "coldwater",
    image: "/images/goldfish.png",
    isPremium: false,
    tags: ["전통", "친근함", "풍만함"],
    description: "오랜 역사 동안 사랑받아 온 관상어로 통통한 몸매와 우아한 꼬리가 매력적인 냉수성 어종입니다.",
    biologicalFeatures: "위장 구조가 없어 끊임없이 먹이를 찾는 대식가이며 배설물이 많아 강력한 여과력이 필수적입니다. 수온 변화에 대한 저항력이 매우 뛰어납니다.",
    cohabitationInfo: "금붕어는 금붕어끼리 키우는 것이 가장 좋습니다. 몸이 느리기 때문에 빠르고 성격이 거친 열대어와 합사하면 지느러미를 뜯기거나 먹이를 빼앗겨 굶어 죽을 수 있습니다.",
    stats: {
      lifespan: "10 ~ 15년",
      size: "15 ~ 25 cm",
      temp: "15°C ~ 24°C",
      pH: "7.0 ~ 7.8"
    },
    specialInfo: {
      title: "위(Stomach)가 없는 대식가",
      content: "소화 기관에 위가 존재하지 않아 음식을 저장할 수 없으므로 자주 조금씩 먹이를 섭취하는 습성이 있습니다."
    },
    habitat: "아시아 전역의 흐름이 느린 강, 연못, 호수 등 진흙이 많고 수초가 자라는 담수역에서 개량되었습니다.",
    schedule: ["매일 2~3회: 금붕어 전용 고단백 사료 소량씩 급여", "매주 화요일: 배설물 청소 및 30% 환수", "매월 10일: 여과기 여과재 세척 (수조물 사용)"]
  },
  {
    id: "koi",
    name: "비단잉어",
    scientificName: "Cyprinus rubrofuscus",
    category: "coldwater",
    image: "/images/goldfish.png",
    isPremium: false,
    tags: ["장수", "대형종", "야외 연못"],
    description: "화려한 붉은빛과 금빛 무늬를 자랑하는 대형 관상어로, 지능이 높고 사람을 알아보는 매력이 있습니다.",
    biologicalFeatures: "성장 속도가 매우 빠르며 최대 1미터까지 자랄 수 있어 야외 연못 사육에 적합합니다. 수온 적응력이 엄청나 겨울철 얼어붙는 연못에서도 생존합니다.",
    cohabitationInfo: "성격은 매우 온순하지만 입에 들어가는 작은 크기의 어종은 삼킬 수 있습니다. 비슷한 크기의 대형 냉수어 또는 금붕어 대형 개체들과 합사가 가능합니다.",
    stats: {
      lifespan: "20 ~ 50년",
      size: "50 ~ 100 cm",
      temp: "5°C ~ 26°C",
      pH: "7.0 ~ 8.0"
    },
    specialInfo: {
      title: "사람과 교감하는 관상어",
      content: "매우 영리하여 주인의 발소리를 알아채고 물가로 모여들며 손으로 직접 먹이를 주는 '핸드 피딩'이 가능합니다."
    },
    habitat: "중국 및 일본을 중심으로 계곡, 천, 저수지 등의 넓고 깊은 담수 지역에서 품종 개량이 진행되었습니다.",
    schedule: ["매일 1~2회: 수온에 맞춘 전용 사료 급여", "매주 토요일: 연못/대형 여과조 찌꺼기 역세척", "매 분기별: 전체 건강 상태 점검 및 기생충 검사"]
  },
  {
    id: "whitecloud",
    name: "백운산",
    scientificName: "Tanichthys albonubes",
    category: "coldwater",
    image: "/images/neontetra.png",
    isPremium: false,
    tags: ["강인함", "초보자 추천", "가성비"],
    description: "히터 없이도 건강하게 잘 자라며 꼬리 끝의 붉은 점과 지느러미 광택이 소박하면서도 귀여운 어종입니다.",
    biologicalFeatures: "영하에 가까운 저온에서도 살아남을 정도로 엄청나게 강인한 생명력을 가지고 있습니다. 미니 어항이나 테라리움, 무여과 어항에서도 높은 생존율을 보입니다.",
    cohabitationInfo: "매우 얌전하고 활동적이어서 다른 소형 냉수어 및 소형 열대어와 두루두루 잘 어울립니다. 생이새우나 체리새우 등 소형 새우들과도 평화롭게 합사할 수 있습니다.",
    stats: {
      lifespan: "3 ~ 5년",
      size: "3 ~ 4 cm",
      temp: "10°C ~ 22°C",
      pH: "6.5 ~ 7.5"
    },
    specialInfo: {
      title: "히터가 필요 없는 어종",
      content: "겨울철 실내 온도 수준의 차가운 물에서도 아무런 문제 없이 활발히 활동하고 번식할 수 있습니다."
    },
    habitat: "중국 광동성의 백운산 지역의 맑고 차가운 산간 계곡 계류지와 수풀이 우거진 습지에 자생합니다.",
    schedule: ["매일 1회: 미립 사료 소량 급여", "매 2주 일요일: 20% 부분 환수", "매월 말일: 어항 유리가면 이끼 청소"]
  },
  {
    id: "butterfly_koi",
    name: "나비 비단잉어",
    scientificName: "Cyprinus carpio var.",
    category: "coldwater",
    image: "/images/goldfish.png",
    isPremium: true,
    tags: ["우아함", "하늘하늘", "프리미엄"],
    description: "일반 비단잉어보다 훨씬 길고 드레스처럼 펄럭이는 나비 같은 지느러미를 가져 물속의 신선이라 불립니다.",
    biologicalFeatures: "헤엄칠 때마다 은빛, 백색, 금빛의 긴 핀이 물결치는 모습이 황홀할 정도로 아름답습니다. 지느러미 핀이 길기 때문에 날카로운 구조물이 없는 환경이 권장됩니다.",
    cohabitationInfo: "온순하지만 긴 지느러미를 공격해 뜯어먹는 성격 급한 어종과의 합사는 절대 금물입니다. 일반 비단잉어나 대형 금붕어류와 합사해야 안전합니다.",
    stats: {
      lifespan: "15 ~ 30년",
      size: "40 ~ 70 cm",
      temp: "10°C ~ 25°C",
      pH: "7.0 ~ 7.8"
    },
    specialInfo: {
      title: "물속을 나는 나비의 날개",
      content: "지느러미가 멈추지 않고 평생 자라나는 유전적 특성을 지녀, 성장할수록 더욱 우아한 실루엣을 뽐냅니다."
    },
    habitat: "아시아 및 북미의 대형 양식장에서 긴 지느러미를 가진 특이 개체들을 선별 육성하여 고정화한 프리미엄 품종입니다.",
    schedule: ["매일 2회: 고품질 부상성 사료 급여", "매주 목요일: 바닥 슬러지 흡입 및 25% 환수", "매월 1일: 지느러미 상태 정밀 확인"]
  },

  // 3. 해수어 (Saltwater Fish)
  {
    id: "clownfish",
    name: "흰동가리",
    scientificName: "Amphiprion ocellaris",
    category: "saltwater",
    image: "/images/clownfish.png",
    isPremium: false,
    tags: ["니모", "말조개 공생", "해수 입문"],
    description: "디즈니 애니메이션 '니모'로 전 세계인에게 친숙한 해수어로, 말미잘과 공생하는 독특한 생태를 가집니다.",
    biologicalFeatures: "위아래로 실룩거리며 귀엽게 헤엄치는 특이한 유영 방식을 가집니다. 말미잘의 독소에 면역이 있어, 촉수 사이에 몸을 숨겨 포식자로부터 자신을 보호하는 공생 행동을 보입니다.",
    cohabitationInfo: "대체로 온순하나 영역 본능이 있어 동일종끼리는 다툼이 있을 수 있습니다. 블루탱, 고비, 클리너 슈림프 등 대다수 리프 세이프 어종들과 조화롭게 지냅니다.",
    stats: {
      lifespan: "6 ~ 10년",
      size: "8 ~ 11 cm",
      temp: "24°C ~ 26°C",
      pH: "8.1 ~ 8.4",
      salinity: "1.020 ~ 1.025 SG"
    },
    specialInfo: {
      title: "말미잘과의 완벽한 공생",
      content: "말미잘에게는 먹이 찌꺼기를 제공하고 배설물로 영양을 주며, 자신은 강한 독을 지닌 말미잘 품에서 안전을 얻습니다."
    },
    habitat: "태평양 및 인도양의 따뜻하고 얕은 산호초 지대에서 말미잘이 많이 서식하는 곳에 분포합니다.",
    schedule: ["매일 2회: 해수 전용 사료 및 냉동 먹이 급여", "매일: 수조 증발수 보충", "격주 토요일: 15% 해수 환수 및 스키머 청소"]
  },
  {
    id: "bluetang",
    name: "블루탱",
    scientificName: "Paracanthurus hepatus",
    category: "saltwater",
    image: "/images/clownfish.png",
    isPremium: false,
    tags: ["도리", "선명함", "활발함"],
    description: "쨍한 로열 블루 바디와 꼬리지느러미의 밝은 노란색 대비가 환상적인 해수 수조의 감초 같은 물고기입니다.",
    biologicalFeatures: "수조 구석구석을 매우 활발하고 빠르게 헤엄쳐 다니며 이끼를 갉아먹는 유용한 습성이 있습니다. 겁이 많아 놀라거나 잠을 잘 때 산호 틈새에 끼어 누워 자는 귀여운 버릇이 있습니다.",
    cohabitationInfo: "대부분의 산호 및 해수어와 무난히 합사되지만, 같은 탱(Tang) 종류끼리는 영역 다툼이 심할 수 있으므로 주의해야 합니다. 넓은 수조 환경을 구축해 주어야 스트레스가 적습니다.",
    stats: {
      lifespan: "8 ~ 15년",
      size: "20 ~ 30 cm",
      temp: "24°C ~ 26°C",
      pH: "8.1 ~ 8.4",
      salinity: "1.021 ~ 1.025 SG"
    },
    specialInfo: {
      title: "틈새 취침 습성",
      content: "위험을 느끼거나 밤이 되면 납작한 몸을 이용해 라이브 락 틈새에 꽉 끼여 죽은 듯이 옆으로 누워 자는 특이 버릇이 있습니다."
    },
    habitat: "인도-태평양 전역의 산호가 울창하고 물 흐름이 강한 외곽 산호초 벽면 및 암초 지대에 서식합니다.",
    schedule: ["매일 2회: 식물성 사료(김, 스피룰리나) 필수 급여", "매일: 프로테인 스키머 동작 점검", "매주 토요일: 해수염 비중 확인 및 20% 환수"]
  },
  {
    id: "seahorse",
    name: "빅벨리 해마",
    scientificName: "Hippocampus abdominalis",
    category: "saltwater",
    image: "/images/clownfish.png",
    isPremium: false,
    tags: ["독특함", "느림의 미학", "부성애"],
    description: "물고기답지 않은 독특한 외모와 세로로 유영하는 모습, 꼬리로 무언가를 감아 쥐는 귀여운 해양생물입니다.",
    biologicalFeatures: "헤엄치는 속도가 극도로 느려 지느러미나 수초, 구조물에 꼬리를 감아 몸을 지탱합니다. 이빨과 위가 없어 먹이를 쉴 새 없이 흡입해야 하므로 집중 관리가 필요합니다.",
    cohabitationInfo: "성격이 너무 느려 빠른 물고기와 합사 시 먹이 다툼에서 밀리게 됩니다. 파이프피쉬나 순한 고비류, 혹은 해마 단독 사육이 강력히 권장됩니다.",
    stats: {
      lifespan: "3 ~ 5년",
      size: "15 ~ 25 cm",
      temp: "20°C ~ 24°C",
      pH: "8.1 ~ 8.3",
      salinity: "1.022 ~ 1.025 SG"
    },
    specialInfo: {
      title: "아빠가 임신하고 아기를 낳는 부성애",
      content: "암컷이 수컷의 육아낭에 알을 낳으면, 아빠 해마가 주머니 속에서 알을 품어 부화시킨 뒤 진통을 겪으며 새끼를 낳습니다."
    },
    habitat: "호주 및 뉴질랜드 주변 해역의 수온이 다소 낮고 해초류가 풍부한 조용한 만 연안에 서식합니다.",
    schedule: ["매일 3~4회: 신선한 냉동 곤갱이 생먹이 급여", "매일 아침: 수조 온도 검사 (24도 이하 유지)", "매주 일요일: 15% 환수 및 잔여 생먹이 찌꺼기 청소"]
  },
  {
    id: "mandarin",
    name: "스플렌디드 맨다린",
    scientificName: "Synchiropus splendidus",
    category: "saltwater",
    image: "/images/clownfish.png",
    isPremium: true,
    tags: ["화려함 극치", "생먹이 필수", "리프세이프"],
    description: "사이키델릭한 문양과 우주적인 천연 원색 배색을 뽐내며, 산호초 바닥을 사뿐사뿐 기어 다니는 매혹적인 종입니다.",
    biologicalFeatures: "비늘이 없는 대신 독성이 있는 끈적한 점액질로 온몸을 덮어 포식자와 기생충으로부터 몸을 보호합니다. 인공 사료 적응이 극도로 어려워 라이브 락에서 자라는 미생물을 주로 먹습니다.",
    cohabitationInfo: "매우 온순하고 조용합니다. 바닥 영역을 침범하는 사나운 고비나 도티백 등을 제외하면 대부분의 순한 해수어와 완벽하게 어울립니다.",
    stats: {
      lifespan: "2 ~ 5년",
      size: "6 ~ 8 cm",
      temp: "24°C ~ 26°C",
      pH: "8.1 ~ 8.4",
      salinity: "1.021 ~ 1.025 SG"
    },
    specialInfo: {
      title: "비늘이 없는 독성 점액 보호막",
      content: "천적이 접근하지 못하도록 피부 표면에서 불쾌한 냄새와 약간의 독성이 있는 두꺼운 점액을 뿜어 방어합니다."
    },
    habitat: "서태평양 산호초 지대의 따뜻하고 조용한 석호 내 산호 틈새나 죽은 산호초 파편 바닥층에 거주합니다.",
    schedule: ["매일: 바닥 라이브 락의 미생물 밀도 점검", "격일: 강화 미생물 액체 및 냉동 플랑크톤 투입", "매주 수요일: 수질 암모니아 테스트"]
  },

  // 4. 수초 (Aquatic Plants)
  {
    id: "javamoss",
    name: "자바 모스",
    scientificName: "Vesicularia dubyana",
    category: "plant",
    image: "/images/javamoss.png",
    isPremium: false,
    tags: ["생명력", "새우 놀이터", "입문용"],
    description: "초보자도 광량과 이산화탄소 없이 쉽게 키울 수 있으며, 활착력이 뛰어나 조경에 필수적인 이끼 수초입니다.",
    biologicalFeatures: "돌이나 유목 표면에 닿으면 스스로 실 같은 뿌리를 내어 단단히 고정(활착)되어 자랍니다. 빽빽한 이끼 숲을 형성해 소형 새우나 물고기 치어의 훌륭한 은신처가 되어 줍니다.",
    cohabitationInfo: "모든 담수 생물과 잘 맞으며, 특히 체리새우나 야마토새우 같은 관상용 새우류와 궁합이 환상적입니다. 새우들은 자바 모스 사이에 낀 유기물과 이끼를 청소해 줍니다.",
    stats: {
      lifespan: "반평생 (지속 번식)",
      size: "성장 제한 없음 (트리밍 필요)",
      temp: "15°C ~ 28°C",
      pH: "5.5 ~ 7.5"
    },
    specialInfo: {
      title: "뛰어난 자연 활착력",
      content: "뿌리가 없는 태환식물이지만 실이나 본드로 고정해두면 유목과 돌의 거친 단면에 단단히 붙어 자라나는 능력을 가집니다."
    },
    habitat: "동남아시아 열대 지역의 그늘진 하천 바닥, 젖은 돌, 습기가 많은 육상 유목 표면에 널리 자생합니다.",
    schedule: ["매일: 물속 조명 6~8시간 점등", "매월 2회: 너무 자라난 덤불 가위 트리밍 및 청소", "매주 일요일: 수초용 액체 비료 소량 투여"]
  },
  {
    id: "anubias",
    name: "아누비아스 나나",
    scientificName: "Anubias barteri var. nana",
    category: "plant",
    image: "/images/javamoss.png",
    isPremium: false,
    tags: ["음성수초", "두꺼운 잎", "활착수초"],
    description: "광택이 도는 짙은 녹색의 두껍고 튼튼한 잎을 가진 대표적인 음성수초로, 유목이나 돌에 활착하여 키웁니다.",
    biologicalFeatures: "성장 속도가 매우 느리지만 광량이 적고 이산화탄소가 없는 척박한 환경에서도 좀처럼 죽지 않는 질긴 생명력을 가집니다. 잎이 단단하여 달팽이나 초식성 물고기의 공격에 잘 견딥니다.",
    cohabitationInfo: "거의 모든 담수어와 합사가 가능하며, 심지어 수초를 다 뜯어먹는 금붕어나 대형 시클리드 수조에도 넣을 수 있는 방어력 높은 수초입니다.",
    stats: {
      lifespan: "다년생 (지속 성장)",
      size: "5 ~ 15 cm",
      temp: "20°C ~ 30°C",
      pH: "6.0 ~ 7.5"
    },
    specialInfo: {
      title: "벌브(Rootstock) 매립 금지 법칙",
      content: "두꺼운 줄기(벌브)를 흙이나 소일에 묻으면 썩어버리므로, 반드시 돌이나 유목 겉면에 얹어 활착 사육해야 합니다."
    },
    habitat: "서아프리카의 흐름이 빠르고 그늘진 열대 삼림 계곡의 물가 암석지대에 붙어 반수중 상태로 자생합니다.",
    schedule: ["매일: 광량 확보를 위한 LED 조명 작동", "매주: 잎 표면 이끼 점검", "매월: 노랗게 시든 잎 트리밍"]
  },
  {
    id: "bucephalandra",
    name: "부세팔란드라",
    scientificName: "Bucephalandra",
    category: "plant",
    image: "/images/javamoss.png",
    isPremium: true,
    tags: ["펄 광택", "컬렉터 품목", "프리미엄"],
    description: "잎 표면에 수많은 보석이 박힌 듯 반짝이는 은색 펄과 조명에 따라 무지갯빛 오로라 광택을 내는 고급 활착 수초입니다.",
    biologicalFeatures: "성장이 믿을 수 없을 정도로 느리지만, 안착 후에는 깊고 진한 색상의 잎과 미세한 펄 입자들을 보석처럼 반짝여 매니아들 사이에서 매우 인기가 높습니다.",
    cohabitationInfo: "물 환경에 매우 예민하므로 수질이 갑자기 변하면 잎이 녹아내릴 수 있습니다. 따라서 깨끗한 수질을 유지해 주는 소형 새우류(레드비 등)와 함께 사육하는 것이 추천됩니다.",
    stats: {
      lifespan: "다년생 (지속 성장)",
      size: "3 ~ 10 cm",
      temp: "20°C ~ 26°C",
      pH: "6.0 ~ 7.0"
    },
    specialInfo: {
      title: "신비로운 무지갯빛 펄",
      content: "빛을 받으면 청록, 보라, 구리빛으로 변하는 특수한 메탈릭 펄 세포 구조를 잎사귀 표면에 탑재하고 있습니다."
    },
    habitat: "인도네시아 보르네오섬의 울창한 정글 속, 물살이 세고 그늘진 계곡 바위 틈에 극소수 군락을 지어 서식합니다.",
    schedule: ["매일: 미량의 이산화탄소 공급 및 조명 작동", "매주: 환수 시 온도 쇼크 주의", "매월 15일: 수질 경도 측정 및 이끼 방지제 시비"]
  }
];

export default function Home() {
  // State Management
  const [activeCategory, setActiveCategory] = useState<"tropical" | "coldwater" | "saltwater" | "plant">("tropical");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  
  // Modals visibility state
  const [activeModal, setActiveModal] = useState<null | "subscribe" | "unlock" | "request">(null);
  
  // Custom Modal feedback states
  const [emailInput, setEmailInput] = useState("");
  const [unlockCode, setUnlockCode] = useState("");
  const [requestData, setRequestData] = useState({ name: "", category: "tropical", reason: "" });
  
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  // Category Configuration
  const categories = [
    { id: "tropical", label: "열대어", icon: "🐠" },
    { id: "coldwater", label: "냉수어", icon: "🐟" },
    { id: "saltwater", label: "해수어", icon: "🐡" },
    { id: "plant", label: "수초", icon: "🌿" },
  ] as const;

  // Filter creatures based on Category, Search Query, and custom Filter tags (인기 어종 / 최근 업데이트)
  const filteredCreatures = useMemo(() => {
    return CREATURES.filter((c) => {
      // 1. Category Filter
      if (c.category !== activeCategory) return false;
      
      // 2. Search Query Filter (Korean Name or Scientific Name)
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        const matchesName = c.name.toLowerCase().includes(query);
        const matchesScientificName = c.scientificName.toLowerCase().includes(query);
        const matchesTag = c.tags.some(t => t.toLowerCase().includes(query));
        if (!matchesName && !matchesScientificName && !matchesTag) return false;
      }

      // 3. Filter Tag (인기 어종: "인기" 태그 포함, 최근 업데이트: "초보자 추천" 또는 "프리미엄" 태그 포함)
      if (activeFilter === "popular") {
        return c.tags.includes("인기") || c.tags.includes("열대어의 왕") || c.tags.includes("니모") || c.tags.includes("우아함");
      }
      if (activeFilter === "recent") {
        return c.isPremium || c.tags.includes("초보자 추천") || c.tags.includes("신비로운 무지갯빛 펄");
      }

      return true;
    });
  }, [activeCategory, searchQuery, activeFilter]);

  // Modal handlers
  const handleSubscribeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    setFeedbackMessage("🎉 성공적으로 구독되었습니다! 아쿠아스코프의 새로운 생물 분석 리포트가 메일함으로 즉시 배송됩니다.");
    setTimeout(() => {
      setFeedbackMessage(null);
      setActiveModal(null);
      setEmailInput("");
    }, 4000);
  };

  const handleUnlockSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedbackMessage("🔓 프리미엄 콘텐츠 잠금이 해제되었습니다! 이제 아쿠아스코프의 모든 숨겨진 심해 생물 백과사전을 탐색할 수 있습니다.");
    setTimeout(() => {
      setFeedbackMessage(null);
      setActiveModal(null);
      setUnlockCode("");
    }, 4000);
  };

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestData.name.trim() || !requestData.reason.trim()) return;
    setFeedbackMessage(`📝 [${requestData.name}] 생물 정보 요청이 정상 접수되었습니다! 전문 아쿠아리스트가 정밀 조사를 진행하겠습니다.`);
    setTimeout(() => {
      setFeedbackMessage(null);
      setActiveModal(null);
      setRequestData({ name: "", category: "tropical", reason: "" });
    }, 4000);
  };

  return (
    <div className="min-h-screen flex flex-col relative text-slate-100 bg-[#060a16]">
      
      {/* -------------------------------------------------------------
          1. HEADER SECTION
          ------------------------------------------------------------- */}
      <header className="sticky top-0 z-40 w-full glass-panel border-b border-cyan-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          {/* Logo with Aquascope Brand */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-2xl font-bold tracking-wider text-cyan-400 glow-text transition-all duration-300 group-hover:text-cyan-300">
              AquaScope
            </span>
            <span className="text-xs bg-cyan-950 text-cyan-400 border border-cyan-500/30 px-2 py-0.5 rounded-full font-mono">
              V1.2
            </span>
          </Link>

          {/* Real-time Search Input */}
          <div className="flex-1 max-w-md relative hidden md:block">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
              🔍
            </span>
            <input
              type="text"
              placeholder="생물 이름, 학명, 태그 등으로 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950/80 border border-cyan-500/15 focus:border-cyan-400 rounded-full py-2 pl-10 pr-4 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-all"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-cyan-400 text-xs"
              >
                ✕
              </button>
            )}
          </div>

          {/* Right Control Actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveModal("subscribe")}
              className="relative px-5 py-2.5 rounded-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-medium text-sm transition-all duration-300 shadow-md shadow-cyan-500/15 hover:shadow-cyan-500/30 active:scale-95"
            >
              구독하기
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Search Bar Wrapper */}
      <div className="px-4 py-3 md:hidden border-b border-cyan-500/5 bg-[#070e20]/60">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
            🔍
          </span>
          <input
            type="text"
            placeholder="생물 이름, 학명 등으로 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950/90 border border-cyan-500/20 focus:border-cyan-400 rounded-full py-2 pl-10 pr-4 text-sm text-slate-200 focus:outline-none"
          />
        </div>
      </div>

      {/* -------------------------------------------------------------
          2. MAIN CONTENT WRAPPER
          ------------------------------------------------------------- */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Intro/Hero Text Section */}
        <section className="text-center mb-12 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/5 blur-[80px] rounded-full pointer-events-none" />
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-cyan-300">
            신비로운 수생생물 백과사전
          </h1>
          <p className="max-w-2xl mx-auto text-slate-400 text-sm sm:text-base leading-relaxed">
            아쿠아스코프는 담수와 해수를 넘나드는 형형색색의 수생생물 정보와 체계적인 활착법, 사육 일정을 기록하는 프리미엄 백과사전입니다. 각 생물을 터치하여 정밀 사육 가이드를 탐색해 보세요.
          </p>

          {/* Quick Filter Tags */}
          <div className="flex items-center justify-center gap-2 mt-6">
            <button
              onClick={() => setActiveFilter(null)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                activeFilter === null
                  ? "bg-cyan-500/10 border-cyan-500/40 text-cyan-300"
                  : "bg-slate-900/50 border-slate-800 text-slate-400 hover:text-slate-200"
              }`}
            >
              전체 보기
            </button>
            <button
              onClick={() => setActiveFilter("popular")}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                activeFilter === "popular"
                  ? "bg-cyan-500/10 border-cyan-500/40 text-cyan-300"
                  : "bg-slate-900/50 border-slate-800 text-slate-400 hover:text-slate-200"
              }`}
            >
              🔥 인기 생물
            </button>
            <button
              onClick={() => setActiveFilter("recent")}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                activeFilter === "recent"
                  ? "bg-cyan-500/10 border-cyan-500/40 text-cyan-300"
                  : "bg-slate-900/50 border-slate-800 text-slate-400 hover:text-slate-200"
              }`}
            >
              ✨ 스페셜 & 프리미엄
            </button>
          </div>
        </section>

        {/* -------------------------------------------------------------
            3. CATEGORY TABS NAVIGATION
            ------------------------------------------------------------- */}
        <section className="mb-8">
          <div className="flex border-b border-cyan-500/10 justify-between sm:justify-start gap-1 sm:gap-4 overflow-x-auto pb-px">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  // Optional reset search to not conflict
                }}
                className={`flex items-center gap-2 py-4 px-6 text-sm font-semibold tracking-wide border-b-2 transition-all shrink-0 ${
                  activeCategory === cat.id
                    ? "border-cyan-400 text-cyan-400 font-bold glow-text"
                    : "border-transparent text-slate-400 hover:text-slate-200"
                }`}
              >
                <span className="text-lg">{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* -------------------------------------------------------------
            4. CREATURE GRID SECTION
            ------------------------------------------------------------- */}
        <section>
          {filteredCreatures.length === 0 ? (
            <div className="text-center py-20 glass-card rounded-2xl border border-cyan-500/5">
              <span className="text-4xl block mb-4">🔍</span>
              <p className="text-slate-400 text-sm">해당 검색어나 필터 조건에 부합하는 생물 정보가 없습니다.</p>
              <button 
                onClick={() => { setSearchQuery(""); setActiveFilter(null); }}
                className="mt-4 text-xs font-semibold text-cyan-400 underline hover:text-cyan-300"
              >
                검색 조건 초기화
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              
              {/* Dynamic rendering of creature cards */}
              {filteredCreatures.map((creature) => {
                // If it is Premium, render with Blur lock
                if (creature.isPremium) {
                  return (
                    <div 
                      key={creature.id}
                      className="glass-card rounded-2xl overflow-hidden relative border border-cyan-500/10 flex flex-col group"
                    >
                      {/* Image section with premium blur */}
                      <div className="aspect-[4/3] w-full bg-slate-950 relative zoom-container">
                        <img
                          src={creature.image}
                          alt={creature.name}
                          className="w-full h-full object-cover filter blur-[6px] opacity-40 scale-105"
                        />
                        {/* Premium Tag in top left */}
                        <div className="absolute top-4 left-4 z-10">
                          <span className="text-[10px] tracking-wider uppercase font-bold px-2 py-0.5 bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 rounded-full">
                            PREMIUM
                          </span>
                        </div>
                      </div>

                      {/* Info body with blurred/faded look */}
                      <div className="p-5 flex-1 flex flex-col justify-between opacity-50 select-none">
                        <div>
                          <div className="flex items-center gap-1.5 mb-2">
                            {creature.tags.slice(0, 2).map((tag, idx) => (
                              <span key={idx} className="text-[10px] bg-slate-900 text-slate-400 px-2 py-0.5 rounded-md">
                                #{tag}
                              </span>
                            ))}
                          </div>
                          <h3 className="text-lg font-bold text-slate-300">{creature.name}</h3>
                          <p className="text-xs text-cyan-500/60 italic font-mono mb-3">{creature.scientificName}</p>
                          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{creature.description}</p>
                        </div>
                      </div>

                      {/* Locked Overlay with action button */}
                      <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[3px] flex flex-col items-center justify-center p-6 text-center z-20">
                        <span className="text-3xl mb-2 text-cyan-400 animate-pulse">🔒</span>
                        <h4 className="text-base font-bold text-slate-100 mb-1">프리미엄 생물 정보</h4>
                        <p className="text-xs text-slate-400 mb-4 max-w-[200px] leading-relaxed">
                          {creature.name}의 사육 가이드, 주요 통계 및 활착 일정표는 잠겨 있습니다.
                        </p>
                        <button
                          onClick={() => setActiveModal("unlock")}
                          className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-lg text-xs font-semibold shadow-md transition-all active:scale-95"
                        >
                          콘텐츠 잠금 해제
                        </button>
                      </div>
                    </div>
                  );
                }

                // Normal unlocked card
                return (
                  <Link 
                    href={`/detail/${creature.id}`}
                    key={creature.id}
                    className="glass-card rounded-2xl overflow-hidden border border-cyan-500/10 flex flex-col group cursor-pointer"
                  >
                    {/* Normal Card Image */}
                    <div className="aspect-[4/3] w-full bg-slate-950 relative zoom-container border-b border-cyan-500/5">
                      <img
                        src={creature.image}
                        alt={creature.name}
                        className="w-full h-full object-cover transition-transform duration-500"
                      />
                      
                      {/* Interactive hover scale hint */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                        <span className="text-xs font-bold text-cyan-400 flex items-center gap-1">
                          상세 백과 보기 ➔
                        </span>
                      </div>
                      
                      {/* Normal tags on hover/card top */}
                      <div className="absolute top-4 left-4 z-10 flex gap-1">
                        {creature.tags.includes("인기") && (
                          <span className="text-[10px] font-bold px-2 py-0.5 bg-cyan-500 text-slate-950 rounded-full shadow-md">
                            HOT
                          </span>
                        )}
                        {creature.tags.includes("초보자 추천") && (
                          <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-500 text-slate-950 rounded-full shadow-md">
                            EASY
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Tags */}
                        <div className="flex items-center gap-1.5 mb-2">
                          {creature.tags.slice(0, 3).map((tag, idx) => (
                            <span key={idx} className="text-[10px] bg-cyan-950/30 text-cyan-400 border border-cyan-500/10 px-2 py-0.5 rounded">
                              #{tag}
                            </span>
                          ))}
                        </div>
                        {/* Name and Scientific Name */}
                        <h3 className="text-xl font-extrabold text-slate-100 group-hover:text-cyan-400 transition-colors duration-300">
                          {creature.name}
                        </h3>
                        <p className="text-xs text-cyan-500/80 italic font-mono mb-3">{creature.scientificName}</p>
                        {/* Description */}
                        <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed mb-4">
                          {creature.description}
                        </p>
                      </div>
                      
                      {/* Card Footer Info */}
                      <div className="pt-3 border-t border-cyan-500/5 flex items-center justify-between text-xs text-slate-500">
                        <div className="flex items-center gap-2">
                          <span>🌡️ {creature.stats.temp}</span>
                          <span>🧪 pH {creature.stats.pH}</span>
                        </div>
                        <span className="font-bold text-cyan-400 group-hover:translate-x-1 transition-transform">
                          자세히 →
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}

              {/* -------------------------------------------------------------
                  5. REQUEST CARD (6TH CARD AT HOME)
                  ------------------------------------------------------------- */}
              <div 
                onClick={() => setActiveModal("request")}
                className="glass-card rounded-2xl border border-dashed border-cyan-500/30 flex flex-col items-center justify-center p-8 text-center cursor-pointer min-h-[320px] bg-cyan-950/5 hover:bg-cyan-950/15 hover:border-cyan-400/50 transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-full bg-cyan-950/50 border border-cyan-500/20 text-cyan-400 flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform shadow-inner">
                  ＋
                </div>
                <h3 className="text-lg font-bold text-slate-200 mb-2">새로운 생물정보 요청</h3>
                <p className="text-xs text-slate-400 max-w-[200px] leading-relaxed mb-6">
                  원하시는 수생생물이나 수초 정보가 백과사전에 없나요? 지금 분석을 요청해 주세요!
                </p>
                <button
                  className="px-4 py-2 border border-cyan-500/30 group-hover:border-cyan-400 text-cyan-400 group-hover:text-cyan-300 rounded-lg text-xs font-semibold transition-all"
                >
                  요청서 작성하기
                </button>
              </div>

            </div>
          )}
        </section>
      </main>

      {/* -------------------------------------------------------------
          6. FOOTER SECTION
          ------------------------------------------------------------- */}
      <footer className="w-full mt-20 border-t border-cyan-500/10 bg-[#040812] py-8 text-slate-500 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="font-bold text-cyan-500/60 text-sm">AquaScope</span>
            <span>© 2026 AquaScope Inc. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#" onClick={(e) => {e.preventDefault(); alert("개인정보처리방침이 팝업으로 제공됩니다.");}} className="hover:text-cyan-400 transition-colors">개인정보처리방침</a>
            <a href="#" onClick={(e) => {e.preventDefault(); alert("이용약관이 팝업으로 제공됩니다.");}} className="hover:text-cyan-400 transition-colors">이용약관</a>
            <a href="#" onClick={(e) => {e.preventDefault(); alert("고객센터 이메일: support@aquascope.com");}} className="hover:text-cyan-400 transition-colors">고객센터</a>
            <a href="#" onClick={(e) => {e.preventDefault(); alert("아쿠아스코프는 세계 최고의 수생생물 전문 연구소와 협력합니다.");}} className="hover:text-cyan-400 transition-colors">회사소개</a>
          </div>
        </div>
      </footer>

      {/* -------------------------------------------------------------
          7. PREMIUM GLASSMORPHISM MODALS (Subscription / Unlock / Request)
          ------------------------------------------------------------- */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-overlay">
          
          {/* Modal Card Backing */}
          <div className="w-full max-w-md rounded-2xl glass-panel border border-cyan-500/20 p-6 sm:p-8 relative modal-content shadow-2xl shadow-cyan-950/50">
            
            {/* Close Button */}
            <button
              onClick={() => {
                setActiveModal(null);
                setFeedbackMessage(null);
              }}
              className="absolute top-4 right-4 text-slate-400 hover:text-cyan-400 transition-colors text-xl font-bold w-8 h-8 rounded-full flex items-center justify-center hover:bg-slate-900/60"
            >
              ✕
            </button>

            {/* FEEDBACK SUCCESS ANIMATED STATE */}
            {feedbackMessage ? (
              <div className="text-center py-6">
                <span className="text-5xl block mb-4 animate-bounce">🌊</span>
                <h4 className="text-xl font-bold text-cyan-400 mb-2 glow-text">요청 완료!</h4>
                <p className="text-sm text-slate-300 leading-relaxed max-w-sm mx-auto">{feedbackMessage}</p>
                <div className="mt-8 flex justify-center">
                  <div className="w-12 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full animate-pulse" />
                </div>
              </div>
            ) : (
              <>
                {/* 1. SUBSCRIPTION MODAL */}
                {activeModal === "subscribe" && (
                  <form onSubmit={handleSubscribeSubmit}>
                    <div className="text-center mb-6">
                      <span className="text-4xl block mb-2">💎</span>
                      <h3 className="text-2xl font-extrabold text-slate-100 tracking-tight">아쿠아스코프 구독하기</h3>
                      <p className="text-xs text-slate-400 mt-2">
                        구독하시면 신비로운 희귀 심해 생물 분석 보고서와 매주 업데이트되는 전문 수초 사육 노하우를 가장 먼저 받아볼 수 있습니다.
                      </p>
                    </div>

                    {/* Pricing Highlight Card */}
                    <div className="bg-cyan-950/20 border border-cyan-500/20 rounded-xl p-4 mb-6 text-center">
                      <span className="text-[10px] font-bold text-cyan-400 block tracking-widest uppercase mb-1">MONTHLY SPECIAL</span>
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-3xl font-extrabold text-slate-100">₩4,900</span>
                        <span className="text-xs text-slate-400">/ 월</span>
                      </div>
                      <p className="text-[10px] text-slate-500 mt-1">※ 첫 달 무료 체험 제공 • 언제든지 해지 가능</p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 mb-1.5">구독 신청 이메일 주소</label>
                        <input
                          type="email"
                          required
                          value={emailInput}
                          onChange={(e) => setEmailInput(e.target.value)}
                          placeholder="your-email@aquascope.com"
                          className="w-full bg-slate-950/80 border border-cyan-500/15 focus:border-cyan-400 rounded-lg py-2.5 px-3.5 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-sm rounded-lg tracking-wide transition-all shadow-md active:scale-95"
                      >
                        무료 체험 시작 및 구독하기
                      </button>
                    </div>
                  </form>
                )}

                {/* 2. UNLOCK MODAL */}
                {activeModal === "unlock" && (
                  <form onSubmit={handleUnlockSubmit}>
                    <div className="text-center mb-6">
                      <span className="text-4xl block mb-2">🔑</span>
                      <h3 className="text-2xl font-extrabold text-slate-100 tracking-tight">콘텐츠 잠금 해제</h3>
                      <p className="text-xs text-slate-400 mt-2">
                        라이센스 키를 입력하거나 프리미엄 패스를 통해 아쿠아스코프 백과사전의 모든 디스커스, 나비비단잉어, 맨다린, 부세팔란드라 등 스페셜 어종들의 정밀 분석 정보를 즉시 개방하세요.
                      </p>
                    </div>

                    {/* Premium Benefits List */}
                    <div className="space-y-2 mb-6 bg-slate-950/40 rounded-xl p-4 border border-cyan-500/5 text-left text-xs text-slate-300">
                      <div className="flex items-center gap-2">
                        <span className="text-cyan-400">✔</span>
                        <span>디스커스 수유 등 모든 프리미엄 생리 특징 데이터 오픈</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-cyan-400">✔</span>
                        <span>맞춤형 활착법 및 이끼 방지 주간 캘린더 연동</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-cyan-400">✔</span>
                        <span>사육 가이드 PDF 다운로드 기능 즉시 개방</span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 mb-1.5">라이센스 키 또는 이메일 코드</label>
                        <input
                          type="text"
                          required
                          value={unlockCode}
                          onChange={(e) => setUnlockCode(e.target.value)}
                          placeholder="AQUA-XXXX-XXXX-XXXX"
                          className="w-full bg-slate-950/80 border border-cyan-500/15 focus:border-cyan-400 rounded-lg py-2.5 px-3.5 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-bold text-sm rounded-lg tracking-wide transition-all shadow-md active:scale-95"
                      >
                        지금 모든 프리미엄 잠금 해제
                      </button>
                    </div>
                  </form>
                )}

                {/* 3. REQUEST CREATURE MODAL */}
                {activeModal === "request" && (
                  <form onSubmit={handleRequestSubmit}>
                    <div className="text-center mb-6">
                      <span className="text-4xl block mb-2">📝</span>
                      <h3 className="text-2xl font-extrabold text-slate-100 tracking-tight font-sans">새로운 생물정보 요청</h3>
                      <p className="text-xs text-slate-400 mt-2">
                        백과사전에 등록하고 싶은 물고기나 수초를 신청해 주세요. 다른 회원들과 공유할 수 있는 풍성한 분석 문서를 등록해 드립니다.
                      </p>
                    </div>

                    <div className="space-y-4 text-left">
                      {/* Name input */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 mb-1.5">요청 생물 이름 (예: 가오리, 블루탱 등)</label>
                        <input
                          type="text"
                          required
                          value={requestData.name}
                          onChange={(e) => setRequestData({ ...requestData, name: e.target.value })}
                          placeholder="생물명 입력..."
                          className="w-full bg-slate-950/80 border border-cyan-500/15 focus:border-cyan-400 rounded-lg py-2.5 px-3.5 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                        />
                      </div>

                      {/* Category Selector */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 mb-1.5">생물 분류군</label>
                        <select
                          value={requestData.category}
                          onChange={(e) => setRequestData({ ...requestData, category: e.target.value })}
                          className="w-full bg-slate-950 border border-cyan-500/15 focus:border-cyan-400 rounded-lg py-2.5 px-3.5 text-sm text-slate-200 focus:outline-none"
                        >
                          <option value="tropical">열대어 (Tropical)</option>
                          <option value="coldwater">냉수어 (Coldwater)</option>
                          <option value="saltwater">해수어 (Saltwater)</option>
                          <option value="plant">수초 (Plant)</option>
                        </select>
                      </div>

                      {/* Reason Textarea */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 mb-1.5">상세 요청 사유 (사육 가이드, 특징 등 요구사항)</label>
                        <textarea
                          required
                          rows={3}
                          value={requestData.reason}
                          onChange={(e) => setRequestData({ ...requestData, reason: e.target.value })}
                          placeholder="예: 초보자가 기르기 쉬운 합사 방법과 적정 수온 및 수질 정보를 자세히 알고 싶습니다."
                          className="w-full bg-slate-950/80 border border-cyan-500/15 focus:border-cyan-400 rounded-lg py-2.5 px-3.5 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-cyan-400 resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-sm rounded-lg tracking-wide transition-all shadow-md active:scale-95"
                      >
                        백과사전 분석 요청 제출하기
                      </button>
                    </div>
                  </form>
                )}
              </>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
