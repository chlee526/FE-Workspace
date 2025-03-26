# UI - Form - Button

-   컴포넌트가 아닌 'ui_btn' class로 설정 가능
-   'a' or 'button' 태그에만 설정 가능

## 목차

1. [History](#history)
2. [File](#file)
3. [Useage](#useage)
4. [Props](#props)
5. [Events](#events)

---

### History

| 일자       | 버전  | 내용                       |
| ---------- | ----- | -------------------------- |
| 2023-04-06 | 1.0.0 | Button 패키지 마이그레이션 |

---

#### File

| 파일명 | 타입  | 설명               |
| ------ | ----- | ------------------ |
| index  | index | 공유 컴포넌트 메인 |

---

### Useage

```vue
<!-- 기본형(a) -->
<comp-button href="#"><span class="txt">버튼명</span></comp-button>

<!-- 기본형(button) -->
<comp-button><span class="txt">버튼명</span></comp-button>

<!-- 미사용(Disabled) -->
<comp-button disabled><span class="txt">버튼명</span></comp-button>

<!-- 컬러사용(포인트) -->
<comp-button class="is-color-hl"><span class="txt">버튼명</span></comp-button>

<!-- 아이콘만 사용 -->
<comp-button href="#" class="is-icon-only"><span class="icon">&#xe008;</span></comp-button>

<!-- 아이콘과 텍스트 같이 사용 - 아이콘이 앞인 경우 -->
<comp-button class="is-icon-with is-before"><span class="icon">&#xe008;</span><span class="txt">버튼</span></comp-button>

<!-- 아이콘과 텍스트 같이 사용 - 아이콘이 뒤인 경우 -->
<comp-button class="is-icon-with is-after"><span class="txt">버튼</span><span class="icon">&#xe008;</span></comp-button>

<!-- 로딩 여부 사용 - 다운로드-->
<comp-button :loading="true"><span class="txt">다운로드</span></comp-button>
```

---

### Props

| 필수 | Prop            | 설명        | 타입/값   | Default   |
| :--: | :-------------- | :---------- | --------- | --------- |
|      | **disabled**    | 비활성화    | `Boolean` | false     |
|      | **customColor** | 커스텀 색상 | `Hex`     | null      |
|      | **loading**     | 로딩여부    | `Boolean` | undefined |

---

### Events

|   Event   | 설명                       | Callback                  |
| :-------: | :------------------------- | :------------------------ |
| **click** | 버튼 클릭 이벤트 연결 함수 | `Object`<br>PointerEvent  |
