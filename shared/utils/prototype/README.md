# UTILS - Prototype

-   프로토타입

### 목차

1. [History](#history)
2. [File](#file)
3. [Methods](#methods)
    1. [Basic](#basic)
    2. [Array](#array)
    3. [Colors](#colors)
    4. [Date](#date)
    5. [Link](#link)
    6. [Number](#number)
    7. [Object](#object)
    8. [String](#string)

---

### History

| 일자       | 버전  | 내용                                                                |
| ---------- | ----- | ------------------------------------------------------------------- |
| 2024-11-27 | 1.0.1 | String 유틸에 decodeHTMLEntities 추가(html엔티티코드 > 문자로 변환) |
| 2023-12-21 | 1.0.1 | Flatten, findNodeByProps 추가                                       |
| 2023-12-18 | 1.0.1 | 기본 정의 추가                                                      |
| 2023-06-07 | 1.0.0 | 프로토타입 정의                                                     |

---

### File

| 파일명         | 설명                                      |
| -------------- | ----------------------------------------- |
| index.js       | 기본                                      |
| util.array.js  | 배열 관련                                 |
| util.colors.js | 컬러 관련(JSGradient Library 포함)        |
| util.date.js   | 날짜 관련                                 |
| util.link.js   | 링크 관련                                 |
| util.number.js | 숫자형 관련                               |
| util.object.js | JSON 객체 관련(고급검색 Rule 생성기 포함) |
| util.string.js | 문자열 관련                               |

---

### Methods

#### Basic

| Method    | 설명                  | 매개변수                      | Default | Return | EX                |
| :-------- | :-------------------- | ----------------------------- | ------- | ------ | ----------------- |
| **sleep** | await를 사용한 딜레이 | time: 딜레이 시간(ms) `{Int}` |         |        | await sleep(1000) |

#### Array

| Method                     | 설명                                                          | 매개변수                                                                       | Default | Return            | EX                                                                                                           |
| :------------------------- | :------------------------------------------------------------ | ------------------------------------------------------------------------------ | ------- | ----------------- | ------------------------------------------------------------------------------------------------------------ |
| **~~shuffle~~**            | 셔플(랜덤)                                                    |                                                                                |         | `Array`           | [1,2,3] -> [2,3,1]<br>:recycle: lodash - shuffle 사용 요망                                                   |
| **arrToStr**               | Array -> String 변환                                          | sep: 구분자 `{String}`                                                         | ','     | `String`          | [1,2,3] -> '1,2,3'                                                                                           |
| **strToArr**<br>`{String}` | String -> Array 변환                                          | sep: 구분자 `{String}`                                                         | ','     | `Array`           | '1,2,3' -> [1,2,3]                                                                                           |
| **arrObjAttrToStr**        | JSON데이터 내에서<br>해당 속성의 값을<br>String형태로 반환    | attr: 속성명 `{String}`<br>sep: 구분자 `{String}`<br>lim: 갯수제한 `{String}`  |         | `String`          | [{a: 1, b: 2, c: 3}].arrObjAttrToStr('a', ',') -> '1'                                                        |
| **~~arrCalcSum~~**         | Array내의 모든 합(숫자형 데이터일 경우)                       |                                                                                |         | `Int`             | [1,2,3] -> 6<br>:recycle: lodash - sum 사용 요망                                                             |
| **getParseDatas**          | key에 해당하는 조건과 매칭되는 데이터 반환                    | key: 조건 `{Object}`, returnNullCheck: 리턴값이 null이 필요한 경우 `{Boolean}` |         | `Array` or `Null` | [{a: 1, b: 2}, {a: 1, b: 3}, {b: 2}].getParseDatas({a: 1}) -> [{a: 1, b: 2}, {a: 1, b: 3}]                   |
| **getRootData**            | JSON데이터 코드(code)값이 매칭 되는 제일 상위 아이템 가져오기 | codeVal: 코드값 `{String}`                                                     |         | `Array`           | [{a: 1, children: [code: 1]}, {b: 1, children: [code: 2]}].getRootData('2') -> [{b: 1, children: [code: 2]}] |
| **delAttr**                | JSON데이터 속성제거                                           | attr: 속성명 `{String}`                                                        |         | `Array`           | [{a: 1, b: 2}, {a: 1, b: 3}, {b: 2}].delAttr('a') -> [{b: 2}, {b: 3}, {b: 2}]                                |
| **exptAttr**               | JSON데이터 key에 매칭되는 데이터 제외 후 리턴                 | key: 속성명 `{Object}`                                                         |         | `Array`           | [{a: 1, b: 2}, {a: 1, b: 3}, {b: 2}].exptAttr({a:1}) -> [{b: 2}]                                             |
| **addItem**                | JSON데이터에 동일 데이터가 없으면 추가                        | item: 속성명 `{*}`                                                             |         | `Array`           | [1,2,3,4].addItem('5') -> [1,2,3,4,5]<br>[1,2,3,4].addItem('4') -> [1,2,3,4]                                 |
| **removeItem**             | JSON데이터에 동일 데이터가 있으면 제거                        | item: 속성명 `{*}`                                                             |         | `Array`           | [1,2,3,4].removeItem('5') -> [1,2,3,4]<br>[1,2,3,4].removeItem('4') -> [1,2,3]                               |
| **flatten**                | Json 형식의 Array -> 1차원 Array로 변형                       | childNodeName: 하위 노드의 속성 명 `{String}`                                  |         | `Array`           |                                                                                                              |

#### Colors

| Method                             | 설명                                                               | 매개변수                                                                               | Default      | Return   | EX                                                                                                                                                        |
| :--------------------------------- | :----------------------------------------------------------------- | -------------------------------------------------------------------------------------- | ------------ | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| jsgradient                         | 컬러 모듈                                                          |                                                                                        |              |          |                                                                                                                                                           |
| **hexToRgb**<br>`{String}`         | Hex -> [R,G,B]                                                     |                                                                                        |              | `Array`  | '#ff0000' -> [255,0,0]                                                                                                                                    |
| **rgbToHex**<br>`{Array}`          | [R,G,B] -> Hex                                                     |                                                                                        |              | `String` | [255,0,0] -> '#ff0000'                                                                                                                                    |
| **getTextColorByBG**<br>`{String}` | 타겟 색상의 반전 색상((지정색 or 브랙) or 화이트)                  | color: 어두운 계열의 리턴 색상값 `{String}`                                            | '#000000'    | `String` | '#ff0000' -> '#ffffff'(luma값이 높아 화이트 반환, luma값이 낮으면 지정색(블랙) 반환)                                                                      |
| **getGradients**<br>`{Array}`      | 타겟에 시작값부터 종료값까지의 색상을 지정단계의 그라디언트로 반환 | colorA: 시작 색상값 `{String}`<br>colorB: 종료 색상값 `{String}`<br>step: 단계 `{Int}` | null,null,10 | `Array`  | [].getGradients('#ff0000', '#000000') -> [ "#ff0000", "#e30000", "#c70000", "#ab0000", "#8f0000", "#730000", "#570000", "#3b0000", "#1f0000", "#000000" ] |

#### Date

| Method                                        | 설명                                                  | 매개변수                                                              | Default           | Return    | EX                                                                                                                                                                                         |
| :-------------------------------------------- | :---------------------------------------------------- | --------------------------------------------------------------------- | ----------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **isDate**<br>`{String}`                      | 날짜유형인지 확인                                     |                                                                       |                   | `Boolean` | '2023-01-01' -> true<br>'string' -> false                                                                                                                                                  |
| **dateToStr**<br>`{Date}` or `{String}`       | String형태로 반환                                     | sep: 구분자 `{String}`<br>format: 리턴 포맷 `{String}`                | '-', 'YYYY-MM-DD' | `String`  | new Date() -> '2023-01-01'                                                                                                                                                                 |
| **strToDate**<br>`{String}`                   | String(YYYY-MM-DD hh:mm:ss, 시간은 없어도 됨) -> Date |                                                                       |                   | `Date`    | '2023-01-01' -> 'Date(2023,0,1,0,0,0)'                                                                                                                                                     |
| **dateCalculator**<br>`{Date}` or `{String}`  | gap만큼 더하거나 뺀 날짜를 반환                       | gap: 날짜 차이(Y,M을 붙여서 연월로도 계산가능) `{Number} or {String}` |                   | `String`  | '2023-01-01'.dateCalculator(10) -> '2023-01-11'                                                                                                                                            |
| **getFirstDate**<br>`{Date}` or `{String}`    | 데이터 월의 1일 반환                                  |                                                                       |                   | `String`  | '2023-01-15' -> '2023-01-01'                                                                                                                                                               |
| **getLastDate**<br>`{Date}` or `{String}`     | 데이터 월의 마지막일 반환                             |                                                                       |                   | `String`  | '2023-01-15' -> '2023-01-31'                                                                                                                                                               |
| **getDayDate**<br>`{Date}` or `{String}`      | 데이터 주의 day(요일) 날짜 반환                       | day: 요일(0:일요일 ~ 6:토요일) `{String}`                             | 0                 | `Array`   | '2023-01-18' -> '2023-01-15'                                                                                                                                                               |
| **getWeekend**<br>`{Date}` or `{String}`      | 데이터 날짜의 주차                                    |                                                                       |                   | `Int`     | '2023-01-15' -> 3                                                                                                                                                                          |
| **getWeekendToStr**<br>`{Date}` or `{String}` | 데이터 날짜의 주차 텍스트 형태(YYYY-'W'WW)            |                                                                       |                   | `String`  | '2023-01-15' -> '2023-W03'                                                                                                                                                                 |
| **time24to12**<br>`{String}`                  | 24시간 표기법 -> 12시간 표기법(AM/PM)                 | format: 시간포맷 `{String}`                                           | 'hh:mm:ss'        | `String`  | '22:15:31' -> '10:15:31 PM'                                                                                                                                                                |
| **getDatePOP()**<br>`{함수형}`                | 비교기간 날짜 반환                                    | date: 시작날짜, 종료날짜 객체 `{Object}`                              |                   | `Object`  | {s_date: {date: '2022-01-05'}, e_date: {date: '2022-01-10'}} -> {s_date: {date: '2022-01-05'}, e_date: {date: '2022-01-10'}, ps_date: {date: '2022-01-01'}, pe_date: {date: '2022-01-04'}} |

#### Link

| Method                       | 설명                                          | 매개변수                                                       | Default  | Return   | EX                                                                           |
| :--------------------------- | :-------------------------------------------- | -------------------------------------------------------------- | -------- | -------- | ---------------------------------------------------------------------------- |
| **buzmsLink**<br>`{String}`  | buzms통해서 리다이렉션                        |                                                                |          | `String` | 'http://realsn.com' -> 'http://hub.buzzms.co.kr?url=http%3A%2F%2Frealsn.com' |
| **formSubmit**<br>`{String}` | form태그 임시로 만들어서 submit으로 링크 전달 | params: 매개변수 `{Object}`<br>newWindow: 새창여부 `{Boolean}` | {}, true |          |                                                                              |

#### Number

| Method                                           | 설명                                                           | 매개변수                                                                                | Default  | Return   | EX                                                                 |
| :----------------------------------------------- | :------------------------------------------------------------- | --------------------------------------------------------------------------------------- | -------- | -------- | ------------------------------------------------------------------ |
| **isNum**<br>`{Number}` or `{String}`            | 데이터가 숫자형인지 확인                                       |                                                                                         |          | `Number` | 1 -> 1<br>'string' -> 0                                            |
| **lengthLimitComma**<br>`{Number}` or `{String}` | 데이터에 ,(콤마) 포함 및 축약                                  | digits: 소수점 표현 자릿수 `{Number}`<br>limit: 해당 자릿수 이상일 경우 축약 `{Number}` | 1,8      | `String` | 123456789 -> '123.5M'<br>'asd' -> 0                                |
| **addComma**<br>`{Number}` or `{String}`         | 데이터에 ,(콤마) 포함                                          |                                                                                         |          | `String` | 123456789 -> '123,456,789'                                         |
| **numAddZero**<br>`{Number}` or `{String}`       | 데이터의 자릿수가 digit 이하일때<br>부족한 자릿수만큼 0 더하기 | digit: 자릿수 `{Number}`                                                                | 2        | `String` | 1 -> '01'                                                          |
| **numToFluc**<br>`{Number}` or `{String}`        | 데이터를 등락표기로 반환                                       | unit: 추가 표기법 `{String}`<br>limit: 해당 자릿수 이상일 경우 축약 `{Number}`          | '', null | `String` | 123 -> `▲123`<br>-123 -> `▼123`<br>(123).numToFluc('%') -> `▲123%` |
| **numToFlucHtml**<br>`{Number}` or `{String}`    | 데이터를 등락표기가 된 html 태그로 반환                        | unit: 추가 표기법 `{String}`<br>limit: 해당 자릿수 이상일 경우 축약 `{Number}`          | '', null | `String` | 123 -> `<span class="is-up">123</span>`                            |

#### Object

| Method                              | 설명                                                                | 매개변수                                                                                                              | Default | Return    | EX                                 |
| :---------------------------------- | :------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------- | ------- | --------- | ---------------------------------- |
| **isObject**<br>`{함수형}`          | 데이터가 객체형인지 확인                                            |                                                                                                                       |         | `Boolean` |                                    |
| **deepMergeJSON**<br>`{함수형}`     | 여러개의 데이터를 깊은 복사/병합 후 반환                            |                                                                                                                       |         | `Object`  | :recycle: lodash - merge 사용 요망 |
| **combinationRule**<br>`{함수형}`   | 고급검색 키워드 룰 생성                                             |                                                                                                                       |         | `String`  |                                    |
| **dataListHighlight**<br>`{함수형}` | 게시판 데이터의 하이라이트 데이터 반환                              | searchOpts: 검색조건 `{Object}`<br>list: 데이터 `{Array}`<br>targets: 데이터에서 하이라이트할 필드명 `{Array}`        |         | `Array`   |                                    |
| **findNodeByProps**<br>`{함수형}`   | 다중 깊이의 Json데이터에서 조건(json)에 만족하는 첫번째 데이터 반환 | node: 전체 데이터 `{Object}`<br>props: 조건 `{Object}`<br>childNodeName: 자식 노드 속성명(기본 'children') `{String}` |         | `Object`  |                                    |
| **renameProperties**<br>`{함수형}`  | 다중 깊이의 Json데이터에서 속성명을 원하는 속성명으로 변경          | node: 전체 데이터 `{Object}`<br>props: 조건 `{Object}`<br>childNodeName: 자식 노드 속성명(기본 'children') `{String}` |         | `Object`  |                                    |

#### String

| Method                               | 설명                                                    | 매개변수                                                                                   | Default | Return               | EX                                    |
| :----------------------------------- | :------------------------------------------------------ | ------------------------------------------------------------------------------------------ | ------- | -------------------- | ------------------------------------- |
| **replaceAll**<br>`{String}`         | 텍스트 치환                                             | bTxt: 치환 전 텍스트 `{String}`<br>aTxt: 치환 후 텍스트 `{String}`                         |         | `String`             | ('abc').replaceAll('a', 'b') -> 'bbc' |
| **lengthLimit**<br>`{String}`        | 말줄임(...)                                             | limit: 최대 글자 수 `{Number}`                                                             |         | `String`             | ('12345').lengthLimit(2) -> '12...'   |
| **queryStrToJson**<br>`{String}`     | QueryString -> JSON                                     |                                                                                            |         | `String`             | 'a=1&b=2' -> {a: 1, b: 2}             |
| **sentiToIcoClass**<br>`{String}`    | 감성 코드를 아이콘 감성 클래스로 반환                   |                                                                                            |         | `String`             | '1' -> 'is-positive'                  |
| **strEscape**<br>`{String}`          | 텍스트에서 특수문자 치환                                |                                                                                            |         | `String`             | '&' -> '\\&'                          |
| **strUnEscape**<br>`{String}`        | 텍스트에서 \ 제거                                       |                                                                                            |         | `String`             | '\\&' -> '&'                          |
| **escapeSpace**<br>`{String}`        | 공백이 2개 이상인 경우 1개로 조정(Trim, ZeroWidthSpace) |                                                                                            |         | `String`             | ' a b c ' -> 'a b c'                  |
| **replaceGap**<br>`{String}`         | 개행 문자 유니코드를 공백 또는 replacement 로 치환      | replacement: 치환 후 텍스트 `{String}`                                                     | ' '     | `String`             | 'abc\\ndef' -> 'abc def'              |
| **copyClipBoard**<br>`{String}`      | 클립보드에 텍스트 복사                                  | useNoty: 클립보드 복사 성공/실패 Noty 노출 여부 - 설정 시 성공여부 return 안함 `{Boolean}` |         | `Boolean, undefined` |                                       |
| **decodeHTMLEntities**<br>`{String}` | Html entitie코드 -> 문자로 변환                         |                                                                                            |         | `{String}`           | &lt;여러분&gt; -> <여러분>            |

---
