# UI - board - Paginate

### 목차

1. [History](#history)
2. [File](#file)
3. [Useage](#useage)
4. [Props](#props)

---

### History

| 일자       | 버전  | 내용                                                    |
| ---------- | ----- | ------------------------------------------------------- |
| 2024-11-28 | 1.0.0 | 'useLimit' prop 추가 (기존 최대 10000건 조회 해제 처리) |
| 2023-04-07 | 1.0.0 | 컴포넌트 생성                                           |

---

#### File

| 파일명 | 타입  | 설명               |
| ------ | ----- | ------------------ |
| index  | index | 공유 컴포넌트 메인 |

---

#### Useage

```vue
<comp-paginate v-model="v모델" :datas="게시판 옵션" :total-len="데이터 수량" :limitLen="데이터 제한 수" :useLimit="10000건 제한 사용 유무" :click="클릭 이벤트"></comp-paginate>
```

---

#### Props

|        필수        | Prop         | 설명                   | 타입/값            | Default                                    |
| :----------------: | :----------- | :--------------------- | ------------------ | ------------------------------------------ |
|                    | **id**       | 아이디                 | `String`           |                                            |
| :heavy_check_mark: | **v-model**  | v-model 페이징 넘버    | `String`, `Number` |                                            |
| :heavy_check_mark: | **datas**    | 게시판 옵션            | `Object`           | {row_limit, page_num, padingColCnt, order} |
| :heavy_check_mark: | **totalLen** | 게시판 data 갯수       | `String`, `Number` |                                            |
|                    | **limitLen** | data 조회 최대 값      | `String`, `Number` |                                            |
|                    | **click**    | click event            |                    |                                            |
|                    | **useLimit** | 최대 10000건 조회 제한 | `Boolean`          | true                                       |

---
