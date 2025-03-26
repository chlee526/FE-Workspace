# templates - age_rank_table

-   성별/연령별 인기 검색어 순위 템플릿
-   기존 템플릿 미작동 , 오류건이 많아서 수정

### 목차

1. [History](#history)
2. [File](#file)
3. [Useage](#useage)
4. [Props](#props)
5. [Events](#events)

---

### History

| 일자       | 버전  | 내용                                             |
| ---------- | ----- | ------------------------------------------------ |
| 2025-01-17 | 2.0.0 | 성별X연령별 인기 검색어 비교 템플릿 재정의       |
| 2023-04-06 | 1.0.0 | 성별X연령별 인기 검색어 비교 템플릿 마이그레이션 |

---

#### File

| 파일명      | 타입  | 설명                 |
| ----------- | ----- | -------------------- |
| index       | index | 공유 컴포넌트 메인   |
| AgeRankItem | index | 검색어 리스트 아이템 |

---

#### Useage

```vue
<template>
    <tmpl-page_age_rank :id="id" v-model="value" :keywordList="검색조건" :rankRange="검색 순위갯수" :common-search-opts="공통검색조건" @updateOpts="옵션 내용 업데이트" />
</template>
```

---

#### Props

| 필수               | Prop                 | 설명               | 타입/값         | Default |
| :----------------- | :------------------- | :----------------- | :-------------- | :------ |
| :heavy_check_mark: | **id**               | 아이디             | `String`        |         |
| :heavy_check_mark: | **v-model**          | 컴포넌트 할당 변수 | `Vue Variables` |         |
| :heavy_check_mark: | **commonSearchOpts** | 검색데이터         | `Object`        |         |
| :heavy_check_mark: | **keywordList**      | 검색 조건          | `Object`        |         |
|                    | **rankRange**        | 검색 순위 갯수     | `Number`        | 20      |

---

#### Events

|     Event      | 설명                 | Callback                         |
| :------------: | :------------------- | :------------------------------- |
| **updateOpts** | 변경 된 옵션 값 정보 | `Object`<br>변경 된 옵션 값 정보 |
