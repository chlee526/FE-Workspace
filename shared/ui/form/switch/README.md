# UI - Form - Switch

-   스위치(체크박스/라디오) 컴포넌트
-   기본형/라벨포함형/박스형(라디오X) 선택이 가능
-   한개의 스위치에 한개의 데이터 연결

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
| 2023-04-06 | 1.0.0 | Switch 패키지 마이그레이션 |

---

#### File

| 파일명 | 타입  | 설명               |
| ------ | ----- | ------------------ |
| index  | index | 공유 컴포넌트 메인 |

---

### Useage

```vue
<!-- 체크박스 기본형 -->
<comp-switch-btn id="아이디명" class="클래스명" v-model="Vue Variables"></comp-switch-btn>

<!-- 라디오 기본형 -->
<comp-switch-btn id="아이디명" class="클래스명" radio-grp="그룹명" v-model="Vue Variables" val="Value값"></comp-switch-btn>

<!-- 체크박스 라벨포함 -->
<comp-switch-btn id="아이디명" class="클래스명" v-model="Vue Variables" label="라벨"></comp-switch-btn>

<!-- 박스형(라벨필수/라디오 지원 X) -->
<comp-switch-btn id="아이디명" class="클래스명" v-model="Vue Variables" label="라벨(라벨필수)" box="true"></comp-switch-btn>

<!-- 미사용(Disabled) -->
<comp-switch-btn id="아이디명" class="클래스명" v-model="Vue Variables" disabled></comp-switch-btn>
```

---

### Props

|           필수            | Prop          | 설명                                                                                                                                                                                                            | 타입/값         | Default |
| :-----------------------: | :------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- | ------- |
| :triangular_flag_on_post: | **id**        | 아이디<br>'아이디\_' + 넘버링 으로 개별 컴포넌트 ID 생성됨                                                                                                                                                      | `String`        |         |
|                           | **class**     | 클래스명<br> 사이즈 : `'is-xxsmall'/'is-xsmall'/'is-small'/'is-large'/'is-xlarge'`                                                                                                                              | `String`        |         |
| :triangular_flag_on_post: | **val**       | input value                                                                                                                                                                                                     | `Any`           |         |
| :triangular_flag_on_post: | **v-model**   | 컴포넌트 할당 변수                                                                                                                                                                                              | `Vue Variables` |         |
|                           | **label**     | 라벨명(박스형 일 때 필수)                                                                                                                                                                                       | `String`        |         |
|                           | **box**       | 박스형 사용 여부(radioGrp와 함께 사용 불가)                                                                                                                                                                     | `Boolean`       | false   |
| :triangular_flag_on_post: | **radioGrp**  | 그룹명(라디오형 사용시 필수)                                                                                                                                                                                    | `String`        |         |
|                           | **radioName** | 라디오형 사용 시 name 설정                                                                                                                                                                                      | `String`        |         |
|                           | **disabled**  | 미사용 여부                                                                                                                                                                                                     | `Boolean`       |         |
|                           | **valForm**   | 스위치 이벤트 결과(true/false)에 대한 돌려받는 결과값 <br> 예시 : `[{code: 코드값, name:이름},{code:코드값2, name:이름2}]를 넣을 경우`<br> `true 일경우 첫번째 객체의 코드값 false일 경우 두번째 객체의 코드값` | `Array`         |         |

---

### Events

|   Event   | 설명                       | Callback                 |
| :-------: | :------------------------- | :----------------------- |
| **click** | 차트 클릭 이벤트 연결 함수 | `Object`<br>PointerEvent |
