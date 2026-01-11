# Picky

웹 요소 검사 및 CSS 선택자 추출을 위한 유저스크립트 도구입니다. 모바일 환경에서도 브라우저 화면에서 즉시 요소를 선택하여 분석하고, 최적화된 CSS 선택자를 생성할 수 있습니다. 특히 Advanced 버전은 선택한 요소를 해당 사이트에서 영구적으로 숨기는 광고 차단 기능을 제공합니다.
* [Picky 설치](https://raw.githubusercontent.com/hooray804/Picky/main/Picky.user.js)
* [Picky Advanced 설치](https://raw.githubusercontent.com/hooray804/Picky/main/PickyAdvanced.user.js)
## 1. 주요 기능

* **지능형 CSS 선택자 생성**: ID, 클래스, 속성(data-test 등), nth-of-type을 분석하여 가장 고유한 선택자를 추천합니다.
* **영구적 요소 차단 (Advanced)**: 특정 요소를 선택해 '차단'하면 브라우저 저장소(GM_setValue)에 기록되어, 재방문 시에도 해당 요소가 나타나지 않도록 스타일을 적용합니다. 이 기능은 Safari의 개인정보 보호 브라우징 등에서 작동하지 않을 수 있으며 일부 유저스크립트 관리자의 경우 사용할 수 없습니다.
* **코드 및 리소스 검사 기능**: 
    * **HTML/CSS/JS**: 선택한 요소의 코드와 적용된 스타일을  확인합니다.
    * **쿠키 관리**: 현재 페이지의 쿠키 확인 및 수정, 삭제가 가능합니다. 대부분의 웹사이트에서는 권한 문제로 일부 쿠키가 제외됩니다.
    * **핑거프린팅 정보**: 브라우저의 User Agent, 해상도, WebGL 렌더러 등 시스템 정보를 요약해 보여줍니다.
* **Shadow DOM 지원**: 일반적인 선택기로 접근이 어려운 Shadow Root 내부 요소 탐색 및 스타일 주입 기능을 포함합니다. 이 기능 및 더 고도화된 요소 선택 기능이 현재 구현 중이며, 추후 호환성을 확장해 나갈 예정입니다. 
* **계층 구조 탐색**: 선택한 요소를 기준으로 상위(Parent) 또는 하위(Child) 요소로 범위를 쉽게 이동하며 분석할 수 있습니다.
* **모바일 최적화**: 터치 이벤트를 지원하며, 화면 점유를 최소화하는 미니멀 모드와 위치 변경(상/하단) 기능을 제공합니다.

## 2. 버전 비교

| 기능 | Picky (기본) | Picky Advanced |
| :--- | :--- | :--- |
| **핵심 용도** | 일회성 요소 분석 및 추출 | 요소 분석 및 개인화된 차단 규칙 적용 |
| **요소 차단** | 일시적 숨김 (새로고침 시 복구) | **영구 차단** (도메인별 규칙 저장) |
| **실행 리소스** | 작음 | 상대적으로 큼 |
| **권한 요구** | `none` | `GM_setValue`, `GM_getValue` |

## 3. 설치 방법

이 스크립트를 사용하려면 [Tampermonkey](https://www.tampermonkey.net/) 또는 [Userscripts](https://github.com/quoid/userscripts)와 같은 유저스크립트 관리자 확장 프로그램이 설치되어 있어야 합니다.

1. 유저스크립트 관리자를 설치합니다.
2. 아래 링크 중 원하는 버전의 `.user.js` 파일을 클릭 또는 복사합니다.
    * [Picky 설치](https://raw.githubusercontent.com/hooray804/Picky/main/Picky.user.js)
    * [Picky Advanced 설치](https://raw.githubusercontent.com/hooray804/Picky/main/PickyAdvanced.user.js)
3. 브라우저에 표시되는 '설치(Install)' 버튼을 클릭하거나 유저스크립트 관리자에서 적용합니다.

## 4. 사용 방법

1. 설치 후 웹사이트에 접속하면 자동으로 스크립트가 로드됩니다.
2. 화면에 나타나는 Picky UI를 통해 요소를 클릭하거나 탭하여 선택합니다.
3. **CSS 버튼**: 생성된 선택자를 클립보드에 복사합니다.
4. **차단 버튼 (Advanced)**: 광고나 방해 요소를 선택한 후 클릭하면 해당 사이트에서 영구적으로 숨겨집니다.
5. **리셋 버튼**: 선택을 해제하고 초기 상태로 돌아갑니다.

## 5. 라이선스

이 프로젝트는 Mozilla Public License 2.0 (MPL-2.0)을 따릅니다.
