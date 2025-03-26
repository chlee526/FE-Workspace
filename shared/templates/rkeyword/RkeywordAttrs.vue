<template>
    <div class="dcp_chkboxs is-all is-box" :class="{ 'is-small': isSmall }">
        <comp-switch-btn :id="id + '_all'" class="is-small" v-model="allValues" @click="evt_allClick"></comp-switch-btn>
        <hr />
        <template v-for="($item, $idx) in attrs">
            <div v-for="($item2, $idx2) in $item" :key="$idx + '_' + $idx2" class="dcp checkbox is-btn" :class="{ 'is-first': $idx2 == 0, 'is-last': $idx2 == $item.length - 1, 'is-small': isSmall }" :data-color="$item2.color">
                <input :id="id + '_arrts_' + $idx + '_' + $idx2" type="checkbox" :value="getItemCode($item2)" v-model="parentValues" @click="evt_itemClick($event, $item2)" />
                <label :for="id + '_arrts_' + $idx + '_' + $idx2" class="customColor" :style="'--color: ' + $item2.color + ';' + getStyle($item2.color)">
                    <span v-if="deatilAttrs && $item2.children" class="icon is-before">&#xe031;</span>
                    <span class="txt">{{ $item2.name }}</span>
                </label>
            </div>
            <hr v-if="$idx < attrs.length - 1" :key="$idx" />
        </template>
        <div class="details">
            <button v-if="deatilAttrs" ref="toggleBtn" class="btn_detail is-setting" :class="{ 'is-active': detailActive }" @click="detailActive = !detailActive"><span class="icon">&#xe057;</span><span class="txt">속성상세설정</span></button>
            <transition name="fade_posy">
                <tmpl-rkeyword-attrs-detail ref="detailAttrs" v-if="deatilAttrs && detailActive" :id="id + '_detail'" :attrs="attrs" v-model="checked" @close="detailActive = false"></tmpl-rkeyword-attrs-detail>
            </transition>
        </div>
    </div>
</template>
<script>
import TmplRkeywordAttrsDetail from './RkeywordAttrsDetail.vue';

export default {
    name: 'tmpl-rkeyword-attrs',
    components: {
        'tmpl-rkeyword-attrs-detail': TmplRkeywordAttrsDetail,
    },
    data() {
        return {
            detailActive: false,
            parentValues: [],
            parentValuesAll: [],
            allValues: '',
            isFirst: true, // 첫 로딩시 defaultValues 적용을 위한 변수
            defaultValues: [], // 기본 값 배열(active true인 속성 code만 담김)
        };
    },
    props: {
        id: { type: String },
        value: { type: String, default: null },
        isSmall: { type: Boolean },
        attrs: {}, // 속성
        deatilAttrs: { type: Boolean }, // 속성상세설정 사용 여부
    },
    computed: {
        checked: {
            get() {
                return this.value;
            },
            set($val) {
                // 첫 로딩 시 연관어 속성 기본값으로 설정
                if (this.isFirst && this.defaultValues.length) {
                    $val = this.defaultValues.toString();
                    this.isFirst = false;
                }

                this.parentValuesAll.filter($item => {
                    let itemArr = $item.strToArr();
                    // 체크 변수 초기화
                    let chk = false;
                    itemArr.filter($item2 => {
                        // 부모값 배열의 각 항목에 대해 입력받은 값과의 일치 여부 체크
                        if ($val.strToArr().includes($item2)) chk = true;
                    });
                    if (chk) {
                        // 부모값 배열에 해당 항목이 없다면 추가
                        if (!this.parentValues.includes($item)) {
                            this.parentValues.push($item);
                        }
                    } else {
                        // 부모값 배열에 해당 항목이 있다면 삭제
                        if (this.parentValues.includes($item)) {
                            this.parentValues.splice(this.parentValues.indexOf($item), 1);
                        }
                    }
                });

                // 입력값에 대한 이벤트 발생
                let emitValue = this.parentValues.filter(val => val.indexOf(',') < 0);
                this.$emit('input', emitValue.toString());

                // 전체 선택 스위칭
                this.allValues = this.parentValues.length === this.parentValuesAll.length;
            },
        },
    },
    watch: {
        attrs() {
            this.parentValuesAll = [];
            this.parentValues = [];
        },
        parentValuesAll($val) {
            this.checked = $val.toString();
        },
    },
    methods: {
        getItemCode($data) {
            let result = [];
            if ($data.children) {
                // $data가 children을 가지고 있으면, 재귀적으로 getItemCode 함수 호출
                $data.children.filter($item => {
                    result.push(this.getItemCode($item));
                });
            } else {
                // 현재 코드를 result 배열에 추가
                result.push([$data.code]);
            }
            result = result.flat();

            // parentValuesAll 배열에 result를 문자열로 변환한 값이 없고 result의 길이가 0보다 크면 parentValuesAll 배열에 추가
            if (!this.parentValuesAll.includes(result.toString()) && result.length > 0) this.parentValuesAll.push(result.toString());

            // $data에 active 속성 true이고 defaultValues배열에 result 값이 없으면 defaultValues배열에 추가
            if ($data.active && result.length > 0 && !this.defaultValues.includes(result.toString())) this.defaultValues.push(result.toString());

            return result.toString();
        },
        getStyle($color) {
            let style = '';

            // default;
            style += 'border-color: rgba(' + String($color).hexToRgb() + ', 0.4);';
            style += 'color: ' + String($color) + ';';

            // Over;
            if (this.isOver) {
                style += 'background-color: rgba(' + String($color).hexToRgb() + ', 0.1);';
            }

            return style;
        },
        evt_itemClick(evt, $data) {
            const target = evt.target;
            const selValues = this.checked.strToArr();
            if ($data.children) {
                // 현재 선택된 값의 자식들을 배열로 변환하여 저장
                const targetArray = target.value.strToArr();

                // 멀티일 경우
                if (target.checked) {
                    // 선택된 값들을 selValues에 추가
                    targetArray.forEach($item => {
                        if (!selValues.includes($item)) selValues.push($item);
                    });
                } else {
                    // 선택된 값들을 selValues에서 제거
                    targetArray.forEach($item => {
                        if (selValues.includes($item)) selValues.splice(selValues.indexOf($item), 1);
                    });
                }
            } else {
                // 단일일 경우
                if (target.checked) {
                    // 선택된 값이 selValues에 없다면 추가
                    if (!selValues.includes(String($data.code)) && String($data.code) != null) selValues.push(String($data.code));
                } else {
                    // 선택된 값이 selValues에 있다면 제거
                    if (selValues.includes(String($data.code))) selValues.splice(selValues.indexOf(String($data.code)), 1);
                }
            }

            // selValues가 변경되었다면 checked에 새로운 값을 저장
            if (this.checked != selValues.toString()) {
                this.checked = selValues.toString();
            }
        },
        evt_allClick() {
            const selValues = this.parentValuesAll.filter($item => $item.indexOf(',') < 0);
            if (this.allValues) {
                this.checked = selValues.toString();
            } else {
                this.checked = '';
            }
        },
    },
};
</script>
