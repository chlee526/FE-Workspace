# UI - board - sort

-   게시판 Sort UI 컴포넌트

### 목차

1. [History](#history)
2. [File](#file)
3. [Useage](#useage)
4. [Props](#props)
5. [Events](#events)

---

### History

| 일자       | 버전  | 내용             |
| ---------- | ----- | ---------------- |
| 2023-08-31 | 1.0.0 | Sort Ui 컴포넌트 |

---

#### File

| 파일명 | 타입  | 설명               |
| ------ | ----- | ------------------ |
| index  | index | 공유 컴포넌트 메인 |

---

#### Useage

```vue
<comp-table-sort id="아이디" name="정렬명" v-model="Vue Variables" :min-one-value="false"></comp-table-sort>
```

---

#### Props

|        필수        | Prop            | 설명                                                                                                   | 타입/값         | Default |
| :----------------: | :-------------- | :----------------------------------------------------------------------------------------------------- | --------------- | ------- |
| :heavy_check_mark: | **id**          | 아이디                                                                                                 | `String`        |         |
|                    | **name**        | 정렬명                                                                                                 | `String`        |         |
| :heavy_check_mark: | **v-model**     | 컴포넌트 할당 변수                                                                                     | `Vue Variables` |         |
|                    | **minOneValue** | value 가 최소 한개 이상인지 체크 <br/>- 'false' 일 경우 이미 활성화되어있는 정렬버튼 재클릭시 선택해제 | `Boolean`       | true    |

---

#### Events

-   이벤트 없음
