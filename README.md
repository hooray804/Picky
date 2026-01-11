# Picky

웹 요소 검사 및 CSS 선택자 추출을 위한 경량 유저스크립트 도구입니다. 복잡한 개발자 도구를 켜지 않고도 브라우저 상에서 즉시 요소를 분석하고 최적의 선택자를 생성할 수 있습니다.

## 1. 주요 특징

* **지능형 CSS 선택자**: ID, 클래스, nth-of-type 등을 조합하여 가장 고유하고 짧은 선택자를 자동 생성합니다.
* **Shadow DOM 지원**: 일반적인 도구로 접근하기 어려운 Shadow Root 내부 요소까지 검사 가능합니다. 이 기능은 현재 구현 중이며, 추후 호환성을 확장해 나갈 예정입니다.
* **코드 검사기**: 선택한 요소의 정렬된 HTML, 계산된 CSS, 연관된 JS 이벤트를 즉시 확인합니다.
* **다양한 편의 도구**: 요소 숨김/격리, 링크된 URL 추출, 쿠키 관리 및 브라우저 핑거프린팅 정보 확인 기능을 포함합니다.
* **반응형 UI**: 데스크톱과 모바일 환경을 모두 지원하며, 미니멀 모드와 풀 모드 등 원하는 UI로의 전환이 자유롭습니다.

## 2. 버전 비교 (Picky vs Picky Advanced)

| 기능 | Picky | Picky Advanced |
| :--- | :--- | :--- |
| **주요 목적** | 순수 요소 검사 및 분석 | 요소 검사 + 광고 및 유해 요소 차단 |
| **광고 차단** | 미지원 | **지원** (도메인별 규칙 저장 및 자동 적용) |
| **데이터 저장** | 없음 (휘발성) | **지원** (설정 및 차단 리스트 영구 저장) |
| **권한(Grant)** | `none` (호환성 높음) | `GM_setValue`, `GM_getValue` |
| **실행 가벼움** | 가벼움 | 기능에 따른 리소스 사용 |

## 3. 설치 방법

이 스크립트를 사용하려면 [Tampermonkey](https://www.tampermonkey.net/) 또는 [Userscripts](https://github.com/quoid/userscripts)와 같은 유저스크립트 관리자 확장 프로그램이 필요합니다.

1.  유저스크립트 관리자를 설치합니다.
2.  아래 링크 중 원하는 버전을 클릭하여 설치 페이지로 이동합니다.
    * [Picky 설치하기](https://raw.githubusercontent.com/hooray804/Picky/main/Picky.user.js)
    * [Picky Advanced 설치하기](https://raw.githubusercontent.com/hooray804/Picky/main/PickyAdvanced.user.js)
3.  '설치(Install)' 버튼을 눌러 브라우저에 추가합니다.

## 4. 라이선스

이 프로젝트의 코드는 Mozilla Public License 2.0 (MPL-2.0)에 따라 라이선스가 부여됩니다.
