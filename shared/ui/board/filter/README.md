# UI - board - Filter

-   게시판 헤더 Filter UI 컴포넌트

### 목차

1. [History](#history)
2. [File](#file)
3. [Useage](#useage)
4. [Props](#props)
5. [Events](#events)

---

### History

| 일자       | 버전  | 내용                                                            |
| ---------- | ----- | --------------------------------------------------------------- |
| 2023-11-16 | 1.0.0 | 'labelVisibleNum' prop 추가 (선택된 값의 라벨명 표시 개수 설정) |
| 2023-11-08 | 1.0.0 | 게시판 헤더 Filter Ui 컴포넌트 제작                             |

---

#### File

| 파일명 | 타입  | 설명               |
| ------ | ----- | ------------------ |
| index  | index | 공유 컴포넌트 메인 |

---

#### Useage

```vue
<comp-table-filter id="아이디" name="테이블 헤더명" v-model="Vue Variables" :opts="필터 옵션" :multi="true / false"></comp-table-filter>
```

---

#### Props

|        필수        | Prop                 | 설명                                                                                          | 타입/값   | Default |
| :----------------: | :------------------- | :-------------------------------------------------------------------------------------------- | --------- | ------- |
| :heavy_check_mark: | **id**               | 아이디                                                                                        | `String`  |         |
| :heavy_check_mark: | **name**             | 테이블 헤더명                                                                                 | `String`  |         |
| :heavy_check_mark: | **v-model**          | 컴포넌트 할당 변수 <br> 단일선택 - type: String (ex 'code') <br> 멀티선택 - (ex 'code,code2') | `String`  |         |
| :heavy_check_mark: | **opts**             | 필터 옵션                                                                                     | `Array`   | null    |
|                    | **multi**            | 멀티선택 여부                                                                                 | `Boolean` | false   |
|                    | **disableZeroValue** | 멀티선택 일 경우 선택된 값이 없을 경우 적용 버튼 비활성화 여부                                | `Boolean` | true    |
|                    | **labelVisibleNum**  | 멀티선택 일 경우 선택된 값의 라벨명 표시 개수 설정(ex: 2일 경우 -> '아이템1,아이템2 외 3개')  | `Number`  | null    |

---

#### Events

|    Event    | 설명                                 | Callback                                    |
| :---------: | :----------------------------------- | :------------------------------------------ |
| **confirm** | "적용" 버튼 클릭시, 해당 이벤트 사용 | `String / Array`<br>연결된 v-model 값 전달  |
