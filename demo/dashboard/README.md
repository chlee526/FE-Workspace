# 2023 - Vue UIKit(cli version)

### 목차

1. History
2. Project 정보
3. Project 설정
4. 프로젝트 리소스
5. FTP 정보
6. 개발 Server 정보
7. Local Server 설정
8. 배포

---

### History

| 일자       | 버전  | 내용                                |
| ---------- | ----- | ----------------------------------- |
| 2023-06-15 | 2.0.0 | 보일러플레이트 프로젝트 코드로 통일 |
| 2023-05-02 | 1.0.0 | 프로젝트 생성                       |

---

#### Project 정보

-   node: - v18
-   작업목록(QA) : 
-   API가이드 : 
-   브랜치
    -   main: 운영
    -   devel: 개발

---

### Project 설정

1. package.json - 프로젝트명/디펜던시 확인
2. vue.config.js - 개발서버 설정(port: 8765~, Shared 리드미 확인), 로컬 호스트 등록필수
3. env - 환경설정, API경로(API연결이 되야함)
4. 구동 테스트 `npm run dev`
5. 프로젝트 전용 설정 시작

    ###### ①. 스타일 설정

    ```
    /src/assets/css/
    ./override : 프로젝트에서 다시 설정되어야 하는 스타일
    ./vendors : 프로젝트 전용 외부 라이브러리 스타일
    ./view : 프로젝트 전용 컨텐츠

    스타일 추가 후, './design.scss' 에서 관리
    ```

    ###### ②. vendor(설치형이 아닌 외부라이브러리) 설정

    ```
    /src/assets/js/
    가능하다면 설치형으로 의존성 주입
    ```

    ###### ③. 로고 설정

    ```
    /src/assets/img/
    최대 높이 40px을 넘기지 않음.
    ```

    ###### ④. 사용 컴포넌트 설정

    ```
    /src/plugins/global-components.js
    프로젝트에서 사용할 컴포넌트를 정리한다.
    사용하지 않는 컴포넌트 제거
    ```

    ###### ⑤. Router 설정

    ```
    /src/router/index/
    'contentRoutes'에 프로젝트 메뉴 설정
    ```

    ###### ⑥. Store 설정

    ```
    /src/store/
    ./modules/opts.js : 분류체계 설정(API로 가저 오지 않는 코드는 직접 등록)
    ./getters.js에 getter등록
    ```

    ###### ⑦. View 컨텐츠 제작

    ```
    /src/view/
    컨텐츠
    ```

---

### 프로젝트 리소스

전용 리스소

-   <strong>env</strong> ··············// 공통 환경설정
-   <strong>env.development</strong> ··············// 개발 전용 환경설정
-   <strong>env.production</strong> ··············// 프로젝트 전용 환경설정
-   <strong>src</strong>
    -   <strong>api</strong> ··············// api
        -   <strong>validation.js</strong> ··············// api 유효성 체크
    -   <strong>assets</strong> ··············// assets
        -   <strong>css</strong> ··············// style
            -   <strong>override</strong> ··············// Override 스타일
            -   <strong>vendors</strong> ··············// 외부자원 스타일
            -   <strong>design.scss</strong> ··············// 스타일 관리
        -   <strong>img</strong> ··············// img
        -   <strong>js</strong> ··············// 외부js
    -   <strong>filters</strong> ··············// 전역필터
    -   <strong>layout</strong> ··············// layout
    -   <strong>plugins</strong> ··············// 공용/전용 컴포넌트 등록 및 관리
        -   <strong>global-components.js</strong> ··············// 컴포넌트 등록 및 관리
    -   <strong>router</strong> ··············// router관리
    -   <strong>store</strong> ··············// store
        -   <strong>modules</strong> ··············// Module
            -   <strong>helper.js</strong> ··············// 도움말(store로 관리 필수)
            -   <strong>opts.js</strong> ··············// 분류체계
        -   <strong>getters.js</strong> ··············// Store Getter 관리
    -   <strong>view</strong>··············// 컨텐츠

---

```
