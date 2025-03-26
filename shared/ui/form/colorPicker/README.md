# UI - Form - Color Picker

-   Color Picker 컴포넌트

---

## 목차

1. [History](#history)
2. [File](#file)
3. [Useage](#useage)
4. [Props](#props)
5. [Events](#events)

---

### History

| 일자       | 버전  | 내용                                         |
| ---------- | ----- | -------------------------------------------- |
| 2023-08-03 | 2.0.2 | 초기화 기능 분리, '댣기/취소' 버튼 상시 적용 |
| 2023-07-21 | 2.0.1 | 자동 추가                                    |
| 2023-07-13 | 2.0.0 | 컴포넌트 템플릿 재정의 및 pos, disabled 추가 |
| 2023-07-07 | 1.0.0 | 최초 기능 추가                               |

---

#### File

| 파일명 | 타입  | 설명               |
| ------ | ----- | ------------------ |
| index  | index | 공유 컴포넌트 메인 |

---

### Useage

```html
<comp-colorpicker v-model="Vue Variables" :setPosition="true" :useConfirm="true" :useReset="true" :disabled="false" :pos="BC" />
```

---

### Props

|        필수        | Prop            | 설명                                                 | 타입/값   | Default |
| :----------------: | :-------------- | :--------------------------------------------------- | --------- | ------- |
| :heavy_check_mark: | **v-model**     | v-model                                              | `String`  |         |
|                    | **useConfirm**  | 적용 기능 유무                                       | `Boolean` | true    |
|                    | **useReset**    | 초기화 기능 유무                                     | `Boolean` | true    |
|                    | **disabled**    | 미사용 처리                                          | `Boolean` | false   |
|                    | **pos**         | colorPicker 활성화 창 위치 정의                      | `String`  | "BC"    |
|                    | **setPosition** | colorPicker 활성화 창 브라우져 크기에 맞게 위치 설정 | `Boolean` | false   |

---

### Events

없음

---
