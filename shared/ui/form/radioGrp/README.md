# UI - Form - RadioGrp

-   라디오버튼(그룹형) 컴포넌트
-   버튼형/박스형 선택이 가능
-   옵션목록으로 라디오 버튼 데이터 연결

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
| 2023-04-06 | 1.0.0 | RadioGrp 패키지 마이그레이션 |

---

#### File

| 파일명 | 타입  | 설명               |
| ------ | ----- | ------------------ |
| index  | index | 공유 컴포넌트 메인 |

---

### Useage

```vue
<!-- 기본형 -->
<comp-radio-grp id="아이디명" class="클래스명" name="그룹명" v-model="Vue Variables" :opts="Vue연결 옵션목록(Array)"></comp-radio-grp>

<!-- 박스형 -->
<comp-radio-grp id="아이디명" class="클래스명" name="그룹명" v-model="Vue Variables" :opts="Vue연결 옵션목록(Array)" :box="true"></comp-radio-grp>
```

---

### Props

|           필수            | Prop        | 설명                                                                                                                                                                    | 타입/값         | Default |
| :-----------------------: | :---------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- | ------- |
| :triangular_flag_on_post: | **id**      | 아이디<br>'아이디\_' + 넘버링 으로 개별 컴포넌트 ID 생성됨                                                                                                              | `String`        |         |
|                           | **class**   | 클래스명<br> 사이즈 : `'is-small'/'is-large'/'is-xlarge'`                                                                                                               | `String`        |         |
| :triangular_flag_on_post: | **name**    | 그룹명                                                                                                                                                                  | `String`        |         |
| :triangular_flag_on_post: | **v-model** | 컴포넌트 할당 변수                                                                                                                                                      | `Vue Variables` |         |
| :triangular_flag_on_post: | **opts**    | 옵션 목록<br><pre>[ { code: "Value값", name: "옵션명", disabled: "미사용여부(Boolean)", color: "커스텀컬러", before: "라벨 아이콘", after: "라벨 아이콘" }, ... ]</pre> | `Array`         |         |
|                           | **box**     | 박스형으로 사용 여부                                                                                                                                                    | `Boolean`       | false   |
|                           | **btn**     | 버튼형으로 사용 여부                                                                                                                                                    | `Boolean`       | false   |

---

### Events

-   Events 없음
