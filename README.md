# <img src="https://github.com/user-attachments/assets/233351e4-3444-40fb-9d4c-4781a60d79b2"  height="25px"> **Organizing the Sound — with Love** &nbsp; <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black"/> <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=black"/> <img src="https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=Vercel&logoColor=white"/>

#### 사랑의 메시지를 수집하고 정리하여 사용자만의 '사랑의 소리'를 생성할 수 있는 감성 기반 인터랙티브 웹 프로젝트입니다.

### https://www.organizinglove.site/

---

### 웹 / 개인 프로젝트 (외주)

### 2024.11.25 ~ 2024.12.17

> **인터랙션 기반 요소 제어 및 사운드 재생 기능을 포함한 레이아웃 구현과 기능 개발을 담당**

---

### 💻 Overview

#### Home

<img src="/src/assets/screenshoㄹts/홈.png" width="100%" height="100%">

<br>

#### Main

<img src="/src/assets/screenshots/메인화면_02.png" width="100%" height="100%">

<br>

#### Organized

<img src="/src/assets/screenshots/organized_02.png" width="100%" height="100%">

<br>

#### About

<img src="/src/assets/screenshots/도움말.png" width="100%" height="100%">

<br>
<br>

---

### 💡 기획

이 프로젝트는 외주를 맡아 진행하였으며, 디자인을 세밀하게 재현하고, 사용자의 상호작용을 최적화하는 데 집중했습니다. Figma 기반의 디자인을 웹으로 구현하며 효율적인 상태 관리를 위해 단순 HTML/CSS 대신 React를 도입하였습니다. 이번 외주 프로젝트를 통해 디자인과 개발의 상호작용을 경험하고, 요구사항에 맞춘 퍼포먼스를 극대화하는 웹 솔루션을 선보였습니다.

<br>

### 🖇️ 기능

> ### ☝️ Hover

- 요소에 마우스를 올리면, 해당 요소에 저장된 노래가 재생되거나 이미지가 표시됩니다.
- 입력 후 준비버튼 클릭 시 하노이의 원판이 n개만큼 첫번째 위치에 생성

> ### 👆 Click

- 요소를 클릭하면, 해당 요소가 하나씩 리스트에 순차적으로 추가됩니다.

> ### 👀 Move

- zoom-pan-pinch 라이브러리를 활용하여, 마우스 휠로 화면을 확대/축소하고 드래그를 통해 이동할 수 있습니다.
- 이를 통해 사용자는 마치 실제 공간을 자유롭게 탐험하는 듯한 효과를 경험할 수 있습니다.

> ### 🔉 Sound

- 요소에 마우스를 올리면 미리 소리로 확인할 수 있으며, 하트 아이콘을 클릭하면 배경음악이 누적되어 재생되도록 구현하였습니다.
- ‘Play’ 버튼을 클릭하면, 저장된 소리들이 차례대로 실행됩니다.

<br>

### ⚒️ 개발 환경

#### **FrontEnd**

- node.js : 20.14.0
- React : 18.3.1

<br>
