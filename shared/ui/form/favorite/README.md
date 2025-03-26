# UI - Form - Favorite

-   북마크 전용 컴포넌트로, 체크박스 형태로 제작되어 있음

## 목차

1. [History](#history)
2. [File](#file)
3. [Useage](#useage)
4. [Props](#props)
5. [Events](#events)

---

### History

| 일자       | 버전  | 내용                         |
| ---------- | ----- | ---------------------------- |
| 2023-04-06 | 1.0.0 | Favorite 패키지 마이그레이션 |

---

#### File

| 파일명 | 타입  | 설명               |
| ------ | ----- | ------------------ |
| index  | index | 공유 컴포넌트 메인 |

---

### Useage

```vue
<comp-favorites id="아이디명" v-model="Vue Variables"></comp-favorites>
```

---

### Props

|           필수            | Prop               | 설명                                                       | 타입/값         | Default |
| :-----------------------: | :----------------- | :--------------------------------------------------------- | --------------- | ------- |
| :triangular_flag_on_post: | **id**             | 아이디<br>'아이디\_' + 넘버링 으로 개별 컴포넌트 ID 생성됨 | `String`        |         |
|                           | **val**            | checkbox value                                             | `Any`           |         |
|                           | **disabled**       | 클래스명                                                   | `Boolean`       |         |
|                           | **title**          | title속성, title + '등록 or 해제'                          | `String`        | 관심    |
| :triangular_flag_on_post: | **v-model(value)** | 컴포넌트 할당 변수                                         | `Vue Variables` |         |

---

### Events

|   Event   | 설명                           | Callback                 |
| :-------: | :----------------------------- | :----------------------- |
| **click** | 컴포넌트 클릭 이벤트 연결 함수 | `Object`<br>PointerEvent |
