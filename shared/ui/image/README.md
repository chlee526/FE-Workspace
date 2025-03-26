# UI - Image

-   이미지 컴포넌트

## 목차

1. [History](#history)
2. [File](#file)
3. [Useage](#useage)
4. [Props](#props)
5. [Events](#events)

---

### History

| 일자       | 버전  | 내용                      |
| ---------- | ----- | ------------------------- |
| 2023-04-06 | 1.0.0 | Image 패키지 마이그레이션 |

---

#### File

| 파일명 | 타입  | 설명               |
| ------ | ----- | ------------------ |
| index  | index | 공유 컴포넌트 메인 |

---

### Useage

```vue
<!-- 기본 -->
<comp-image src="이미지 파일 경로" :background="false"></comp-image>
```

---

### Props

|        필수        | Prop           | 설명                                                     | 타입/값   | Default |
| :----------------: | :------------- | :------------------------------------------------------- | --------- | ------- |
| :heavy_check_mark: | **src**        | 이미지 파일 경로<br>이미지경로 에러시 icon-no-image 적용 | `String`  |         |
|                    | **background** | background 이미지 사용 여부                              | `Boolean` | false   |
|                    | **loading**    | 이미지 로딩 애니메이션 적용                              | `Boolean` | false   |
|                    | **style**      | CSS 설정                                                 | `CSS`     |         |

---

### Events

-   Events 없음
