# 설계서

### 목차

1. [정의](#정의)
2. [네이밍 규칙](#네이밍-규칙)
3. [Component](#component)
4. [Style](#style)

---

### 정의

-   project에서 shared의 설정,레이아웃,UI,템플릿 등을 import해서 사용하며, 프로젝트 내에서 override 하는 방식
-   project의 node_modules은 workspace의 node_modules을 사용
-   주요 기능에 대한 프로세스는 순서도 참조

---

### 네이밍 규칙

#### 프로젝트명

-   년도\_프로젝트명
-   프로젝트명은 영문 소문자만 사용

#### 파일명

-   camelCase 사용
-   직관적인 이름 사용

#### 컴포넌트/모듈

-   camelCase 사용
-   직관적인 이름 사용
-   '컴포넌트명(모듈명)/index.vue', '컴포넌트명(모듈명)/index.js'로 사용

    ```js
    // componentA 제작시
    componentA / index.vue;
    componentA / index.js;

    // moduleA 제작시
    moduleA / index.vue;
    moduleA / index.js;
    ```

#### 라우터

-   kebabCase 사용
-   라우터 컴포넌트와 동일 한 이름으로 사용
    ```js
    라우터가 'user-profile' 인 경우, 컴포넌트는 'userProfile/index.vue'
    ```

#### Vuex

-   state : camelCase 사용
-   mutations : snakeCase 사용 하지만, 대문자만 사용
-   actions : snakeCase 사용 하지만, 대문자만 사용
-   getters는 /store/getters.js에서 관리하며, camelCase 사용

#### 코드

-   camelCase 사용
-   코드 스타일은 shared/config/ 의 lint와 prettier의 스타일을 따름.

#### Style

-   kebabCase 사용

---

### Component

#### 파일 구조

-   폴더(컴포넌트명)
    -   index.vue ··············// 메인 컴포넌트 파일
    -   style.scss ··············// 컴포넌트 style
    -   \readme.md ··············// 레퍼런스
    -   components ··············// 서브 컴포넌트
        -   기본 구조와 동일한 형태로 사용

#### 생성 규칙

-   퍼포먼스가 최우선 사항
-   before, after관련은 해당 라이프사이클의 위/아래에 명시
-   사용하지 않는 훅에 대해서는 명시 하지 않음
-   완료 후 퍼포먼스 테스트, 레퍼런스 제작 필수
-   주석 필수(메서드의 경우 아래 코드 참조)
-   컴포넌트 스타일은 ./style.scss 파일에 작성
-   아래 샘플 코드의 라이프사이클 선언 및 구조 동일하게 사용

```vue
<templage></templage>
<script>
export default {
    name: '컴포넌트명',
    data() {
        return {
            // 주석
            value: '',
        };
    },
    props: {
        // 주석
        prop명: { type: 데이터타입 },
    },
    computed: {},
    created() {},
    mounted() {},
    watch: {},
    methods: {
        /**
         * 기능정의
         * @param {데이터타입} param명 param 설명
         * @return {데이터타입} 반환 데이터 설명
         */
        testFunction(param) {},
    },
    destroyed() {},
};
</script>
<style lang="scss" scope>
@import './style.scss';
</style>
```

---

### Style

#### 규칙

-   웹표준 준수, 시멘틱 웹 지향
-   Scss 사용
-   kebabCase 사용
-   mixin, variables 활용(아직 전역에서 사용 안됨)
-   확장 가능성을 있을수 있으므로, 선택자에 태그명, id 사용 지양하고, class사용을 지향
-   주석 사용 지향(//, /\* \*/)
-   그룹을 만들때는 '그룹명-스타일명' 으로 제작
-   상태에 대한 스타일명 지정은 'is-'으로 시작
-   color는 hex or rgba만 사용

#### 코딩 순서

css선언시 아래 순서를 기준으로 제작

1. flex/grid
2. display
3. position
4. float
5. top, right, bottom, left
6. transform
7. width, height
8. padding
9. margin
10. border
11. background
12. overflow
13. font (style, family, color, size, weight, line-height)
14. align
15. etc (opacity, transition, animation 관련 등)
16. z-index

#### 작성 방법

-   아래 샘플 코드 참조해 추가요소, 상태, 위치에 대한 순서를 지켜 코딩

```css
.element {
    display: block;

    // 추가 요소
    &::before {
    }
    &::after {
    }

    // 상태
    &:hover {
    }
    &:focus {
    }
    &:active {
    }
    &:empty {
    }
    &::selection {
    }

    // 위치
    &:nth-child(n) {
    }
}
```
