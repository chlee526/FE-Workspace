# UI - form - tab

-   Tab(Radio) 컴포넌트
-   Page/Box/Content Tab 3가지로 분류.
-   기본 Content Tab.

---

## 목차

1. [History](#history)
2. [File](#file)
3. [Useage](#useage)
4. [Props](#props)
5. [Class](#class)

### History

| 일자       | 버전  | 내용                     |
| ---------- | ----- | ------------------------ |
| 2023-07-28 | 1.0.0 | Class > is-wid-auto 추가 |
| 2023-04-06 | 1.0.0 | Tab 마이그레이션         |

---

#### File

| 파일명 | 타입  | 설명               |
| ------ | ----- | ------------------ |
| index  | index | 공유 컴포넌트 메인 |

---

#### Useage

```vue
  <!-- Content Tab -->
    <comp-tab id="아이디명" class="클래스명" :opts="옵션목록" v-model="Vue Variables"></comp-tab>

    <!-- Page Tab -->
    <div id="container">
        <div id="content">
            <div class="wrap">
                <div class="contents">
                    <div class="wrap">
                        <!-- Page Tab은 이자리에 들어감 -->
                        <comp-tab id="아이디명" class="is-page 추가클래스" :opts="옵션목록" v-model="Vue Variables"></comp-tab>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Box Tab -->
    <div class="ui_box">
        <div class="header">
            <div class="wrap">
                <!-- Box Tab은 이자리에 들어감 -->
                <comp-tab id="아이디명" class="is-box 추가클래스" :opts="옵션목록" v-model="Vue Variables"></comp-tab>
            </div>
        </div>
        <div class="content">
            컨텐츠
        </div>
    </div>


```

#### Props

|        필수        | Prop        | 설명               | 타입/값                                                                                                      | Default |
| :----------------: | :---------- | :----------------- | :----------------------------------------------------------------------------------------------------------- | :------ |
| :heavy_check_mark: | **id**      | 아이디             | `String`                                                                                                     | ''      |
|                    | **class**   | 클래스             | `String` <br> `타입 : 'is-page'(페이지탭)/'is-box'(박스탭)`<br> `사이즈 : 'is-small'/'is-large'/'is-xlarge'` | ''      |
| :heavy_check_mark: | **value**   | value 값           | `String`                                                                                                     | ''      |
| :heavy_check_mark: | **opts**    | 옵션 목록          | `Array` <br> `[ { code: "Value값", name: "옵션명", disabled: "미사용여부(Boolean)" } ]`                      | ''      |
| :heavy_check_mark: | **v-model** | 컴포넌트 할당 변수 | `Vue Variables`                                                                                              | ''      |

---

#### Class

| Class           | 설명                                                                   |
| :-------------- | :--------------------------------------------------------------------- |
| **is-wid-auto** | 기본 가로 사이즈가 100%이며, 해당 클래스 삽입 시 가로 크기 auto로 변환 |

---
