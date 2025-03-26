# UI - function - dialog

-   DIALOG

### 목차

1. [History](#history)
2. [File](#file)
3. [Useage](#useage)
4. [Events](#events)
5. [종류](#종류)
6. [버튼타입](#버튼타입)

---

### History

| 일자       | 버전  | 내용                |
| ---------- | ----- | ------------------- |
| 2023-04-06 | 1.0.0 | Dialog 마이그레이션 |

---

#### File

| 파일명 | 타입  | 설명               |
| ------ | ----- | ------------------ |
| index  | index | 공유 컴포넌트 메인 |

---

#### Useage

```
    <!-- 버튼없음 -->
    <button @click="$store.dispatch("종류", ["내용", "제목" ])">버튼</button>

    <!-- 버튼 긍정만 -->
    <button @click="$store.dispatch("종류", ["내용", "제목",버튼 타입]).then(긍정콜백)">버튼</button>

    <!-- 버튼 긍정/부정 -->
    <button @click="$store.dispatch("종류", ["내용", "제목",버튼 타입]).then(긍정콜백).catch(부정콜백)">버튼</button>

```

#### 종류

| 종류        | 설명 | 타입/값  | Default |
| ----------- | ---- | -------- | ------- |
| DIALOG      | 기본 | `String` |         |
| DIALOG_ERR  | 에러 | `String` |         |
| DIALOG_WRN  | 경고 | `String` |
| DIALOG_INFO | 정보 | `String` |
| DIALOG_QST  | 질문 | `String` |
| DIALOG_COM  | 완료 | `String` |

---

### 버튼 타입

| 버튼 타입 | 설명                    | 타입/값  | Default |
| --------- | ----------------------- | -------- | ------- |
| 0         | 메세지 내용만 있는 경우 | `Number` |
| 1         | 확인/취소               | `Number` |
| 2         | 예/아니오               | `Number` |
| 3         | 예/아니오/취소          | `Number` |
| 긍정콜백  | 확인(0), 예(2)          | `Number` |
| 부정콜백  | 취소(1), 아니오(3)      | `Number` |
