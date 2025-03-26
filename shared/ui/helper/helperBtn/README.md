# UI - helpbox_btn

-   NOTY

### 목차

1. [History](#history)
2. [File](#file)

---

### History

| 일자       | 버전  | 내용                     | 작성자 |
| ---------- | ----- | ------------------------ | ------ |
| 2023-04-13 | 1.0.0 | Prop - active 추가       | 이효성 |
| 2023-04-06 | 1.0.0 | helpbox_btn 마이그레이션 |

---

#### File

| 파일명 | 타입  | 설명               |
| ------ | ----- | ------------------ |
| index  | index | 공유 컴포넌트 메인 |

---

#### Useage

```
<comp-helpbox-btn id="아이디" class="클래스" :active="강제활성/비활성"></comp-helpbox-btn>
```

#### Props

| 필수               | Prop   | 설명                  | 타입/값                                         | Default |
| ------------------ | :----- | :-------------------- | :---------------------------------------------- | :------ |
| :heavy_check_mark: | id     | 아이디                | `String`                                        | ''      |
|                    | class  | 클래스                | `String`<br>`'is-small'/'is-large'/'is-xlarge'` | ''      |
|                    | active | 강제 활성/비활성 여부 | `Boolean`                                       |         |

---
