# UI - Form - Adv

-   Adv UI
-   고급검색 컴포넌트

### 목차

1. [History](#history)
2. [File](#file)
3. [Useage](#useage)
4. [Props](#props)
5. [Events](#events)

---

### History

| 일자       | 버전  | 내용                          |
| ---------- | ----- | ----------------------------- |
| 2023-04-06 | 1.0.0 | Adv 패키지 마이그레이션 |

---

#### File

| 파일명            | 타입     | 설명                           |
| ----------------- | ------- | ------------------------------ |
| index             | index   | 공유 컴포넌트 메인               |
| AdvInput          | 컴포넌트 | 검색어 입력 폼                  |
| AdvInputLately    | 컴포넌트 | 최근검색어 목록                  |
| AdvInputDetail    | 컴포넌트 | 고급검색어 설정 모달             |
| AdvInputDetailTab | 컴포넌트 | 고급검색어 설정 내부 검색 그룹 탭 |

---

#### Useage

```vue
<template>
  <!-- 페이지내 topsearchs 파일에서 사용 -->
  <comp-topsearch :search-input-datas.sync="inputDatas" :search-datas.sync="resultDatas">
    <!-- 조건 -->
    <template slot="input_forms">
      <tr>
        <th>
          <comp-bubble-box content="필수값 입니다" class="is-validation" pos="LB" :show-fixed="!inputDatas.advs.keyword_1.name.length && !inputDatas.advs.keyword_2.name.length && !inputDatas.advs.keyword_3.name.length">
            <h4>검색어</h4>
          </comp-bubble-box>
        </th>
        <td>
          <comp-adv v-model="inputDatas.advs"></comp-adv>
        </td>
      </tr>
    </template>
  </comp-topsearch>
</template>

<script>
data(){
  return {
    inputDatas: {
    // 고급 검색 키워드
      advs: {
        keyword_1: {
          name: '', // 이름
          keyword_normal: '', // 일반 키워드
          keyword_construction: '', // 구문 키워드
          keyword_adjacency: '', // 인접 키워드
          keyword_except: '', // 제외 키워드
          color: '', // 컬러
          rule: '', // 키워드 조합 룰
          date_disabled: true, // 범위달력 사용 여부
          s_date: {
            date: new Date().dateToStr(), // 시작 날짜
          },
          e_date: {
            date: new Date().dateToStr(), // 종료 날짜
          },
          ps_date: {
            date: new Date().dateToStr(), // 시작 날짜(이전기간)
          },
          pe_date: {
            date: new Date().dateToStr(), // 종료 날짜(이전기간)
          },
          popChk: true,
        },
        keyword_2: {
          name: '', // 이름
          keyword_normal: '', // 일반 키워드
          keyword_construction: '', // 구문 키워드
          keyword_adjacency: '', // 인접 키워드
          keyword_except: '', // 제외 키워드
          color: '', // 컬러
          rule: '', // 키워드 조합 룰
          date_disabled: true, // 범위달력 사용 여부
          s_date: {
            date: '', // 시작 날짜
          },
          e_date: {
            date: '', // 종료 날짜
          },
          ps_date: {
            date: '', // 시작 날짜(이전기간)
          },
          pe_date: {
            date: '', // 종료 날짜(이전기간)
          },
          popChk: true,
        },
        keyword_3: {
          name: '', // 이름
          keyword_normal: '', // 일반 키워드
          keyword_construction: '', // 구문 키워드
          keyword_adjacency: '', // 인접 키워드
          keyword_except: '', // 제외 키워드
          color: '', // 컬러
          rule: '', // 키워드 조합 룰
          date_disabled: true, // 범위달력 사용 여부
          s_date: {
            date: '', // 시작 날짜
          },
          e_date: {
            date: '', // 종료 날짜
          },
          ps_date: {
            date: '', // 시작 날짜(이전기간)
          },
          pe_date: {
            date: '', // 종료 날짜(이전기간)
          },
          popChk: true,
        },
      },
    },
  }
}
  
</script>
```

---

#### Props

|           필수     | Prop        | 설명                                                         | 타입/값  | Default |
| :----------------: | :-----------| :---------------------------------------------------------- | -------- | ------- |
| :heavy_check_mark: | **v-model** | 검색어 정보                                                   | `Object` |        |
|                    | **cDateGap**| 기준날짜 설정시 사용 ex) 오늘기준을 1일전으로 설정할시,&nbsp; -1 전달  | `Number` |   0     |

---

#### Events

-   Events 없음
