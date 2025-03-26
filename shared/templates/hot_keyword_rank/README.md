# Templates - HotKeywordRank

-   인기 검색어 순위변화
-   최대 12주까지 지원

### 목차

1. [History](#history)
2. [File](#file)
3. [Useage](#useage)
4. [Props](#props)
5. [Events](#events)

---

### History

| 일자       | 버전  | 내용                                           |
| ---------- | ----- | ---------------------------------------------- |
| 2025-01-13 | 1.0.0 | setBgWhite제거, 'is-white'클래스 사용으로 변경 |
| 2023-04-06 | 1.0.0 | HotKeywordRank 패키지 마이그레이션             |

---

#### File

| 파일명 | 타입  | 설명               |
| ------ | ----- | ------------------ |
| index  | index | 공유 컴포넌트 메인 |

---

#### Useage

```vue
<!-- 기본 -->
<tmpl-hot-keyword id="아이디" :common-search-opts="공통검색조건" :keyword-list="인기 검색어 순위변화 목록"></tmpl-hot-keyword>

<!-- 커스텀 색상 Object 적용 -->
<tmpl-hot-keyword id="아이디" :common-search-opts="공통검색조건" :keyword-list="인기 검색어 순위변화 목록" :custom-color="커스텀색상"></tmpl-hot-keyword>

<!-- 커스텀 색상 String 적용 -->
<tmpl-hot-keyword id="아이디" :common-search-opts="공통검색조건" :keyword-list="인기 검색어 순위변화 목록" custom-color="HexCode(ex:#000)"></tmpl-hot-keyword>

<!-- 포커스 박스 사용 -->
<tmpl-hot-keyword id="아이디" :common-search-opts="공통검색조건" :keyword-list="인기 검색어 순위변화 목록" :focous-box-on-off="포커스 박스 사용 여부"></tmpl-hot-keyword>

<!-- 순위 범위 설정 -->
<tmpl-hot-keyword id="아이디" :common-search-opts="공통검색조건" :keyword-list="인기 검색어 순위변화 목록" rankRange="10"></tmpl-hot-keyword>

<!-- 활성화 색상 설정 -->
<tmpl-hot-keyword id="아이디" :common-search-opts="공통검색조건" :keyword-list="인기 검색어 순위변화 목록" fix-active-color="#7ec5df"></tmpl-hot-keyword>

<!-- 배경 흰색 설정 -->
<tmpl-hot-keyword id="아이디" :common-search-opts="공통검색조건" :keyword-list="인기 검색어 순위변화 목록" :set-Bg-White="true"></tmpl-hot-keyword>
```

---

#### Props

|        필수        | Prop                 | 설명                                                                                                                                                                                                                                                                                                                                              | 타입/값        | Default |
| :----------------: | :------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------- | ------- |
| :heavy_check_mark: | **id**               | 아이디                                                                                                                                                                                                                                                                                                                                            | `String`       |         |
| :heavy_check_mark: | **commonSearchOpts** | 공통 검색 조건(analsList 필수)<br><pre>{ ...(날짜/기간) , analsList: [ { code, name } ] }</pre>                                                                                                                                                                                                                                                   | `Object`       |         |
|                    | **keywordList**      | 인기 검색어 순위변화 목록<br><pre>[ { s_date, e_date, weekend, list: [ {code, name}, ... ] }, ... ]</pre>                                                                                                                                                                                                                                         | `Array`        | null    |
|                    | **customColor**      | 커스텀 색상<br>customColor 미적용시 $store.state.OptsStore.ranks 적용<br>type Object : 낮은 순위부터 기재, rank가 빈 값일 경우 20위에 들지 않는 항목에 적용<br><pre>{ default: [<br> { rank: '3', color: '#EC5151' },<br> { rank: '6', color: '#ABC834' },<br> { rank: '10', color: '#1F9BC9' },<br> { rank: '', color: '#AAAAAA' },<br>] }</pre> | `Object / Hex` | null    |
|                    | **focousBoxOnOff**   | 주별 순위 확인에서 현재 보고 있는 페이지 표시                                                                                                                                                                                                                                                                                                     | `Boolean`      | false   |
|                    | **rankRange**        | 순위 범위                                                                                                                                                                                                                                                                                                                                         | `String`       | 20      |
|                    | **fixActiveColor**   | 검색어 색상 강제 설정                                                                                                                                                                                                                                                                                                                             | `Hex`          | null    |
|                    | ~~**setBgWhite**~~   | ~~검색어 배경 색상 강제 #fff 설정 여부~~                                                                                                                                                                                                                                                                                                          | `Boolean`      | false   |

---

#### CSS Class

| Class        | 설명                 | Default |
| :----------- | :------------------- | ------- |
| **is-white** | td색상 화이트로 고정 |         |

---

#### Events

-   Events 없음
