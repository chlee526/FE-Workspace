<template>
    <div class="detail_set">
        <div class="wrap">
            <span class="arrow"></span>
            <ul>
                <li v-for="($trItem, $trIdx) in getChildrensList" :key="$trIdx">
                    <comp-checkbox v-if="$trItem.children" class="is-parentItem is-wid100p" :id="id + '_' + $trIdx" :val="getItemCode($trItem)" v-model="parentValues" :label="$trItem.name" :btn="true" :custom-color="$trItem.color" @click="evt_parentItemClick" style="font-weight: bold"></comp-checkbox>
                    <comp-checkbox v-else class="is-parentItem is-wid100p" :id="id + '_' + $trIdx" :val="$trItem.code" v-model="values" :label="$trItem.name" :btn="true" :custom-color="$trItem.color" @click="evt_parentItemClick" style="font-weight: bold"></comp-checkbox>

                    <ul v-if="$trItem.children">
                        <li v-for="($tdItem, $tdIdx) in $trItem.children" :key="$tdIdx">
                            <comp-checkbox v-if="$tdItem.code" :id="id + '_' + $trIdx + '_' + $tdIdx" class="is-small" :val="$tdItem.code" v-model="values" :label="$tdItem.name" :btn="true" :custom-color="$trItem.color"></comp-checkbox>
                            <comp-checkbox v-else :id="id + '_' + $trIdx + '_' + $tdIdx" class="is-parentItem is-small" :val="getItemCode($tdItem)" v-model="parentValues" :label="$tdItem.name" :btn="true" :custom-color="$trItem.color" @click="evt_parentItemClick"></comp-checkbox>

                            <template v-if="$tdItem.children">
                                <ul>
                                    <li v-for="($item, $idx) in $tdItem.children" :key="$idx">
                                        <comp-checkbox class="is-small" :id="id + '_' + $trIdx + '_' + $tdIdx + '_' + $idx" :val="$item.code" v-model="values" :label="$item.name" :btn="true" :custom-color="$trItem.color"></comp-checkbox>
                                    </li>
                                </ul>
                            </template>
                        </li>
                    </ul>
                </li>
            </ul>
            <div class="footer">
                <div class="lc">
                    <button class="ui_btn is-icon-only" title="선택초기화" @click="values = []"><span class="icon">&#xe020;</span></button>
                </div>
                <div class="rc">
                    <button class="ui_btn is-color-black" @click="evt_confirm"><span class="txt">적용</span></button>
                    <button class="ui_btn" @click="$emit('close')"><span class="txt">취소</span></button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'tmpl-rkeyword-attrs-detail',
    data() {
        return {
            childrenDepth: 0,
            values: [],
            parentValues: [],
            parentValuesAll: [],
        };
    },
    props: {
        id: { type: String },
        val: { type: String, default: null },
        value: { type: String, default: null },
        attrs: {},
    },
    computed: {
        checked: {
            get() {
                return this.value;
            },
            set($val) {
                this.$emit('input', $val);
            },
        },
        getChildrensList() {
            const datas = JSON.parse(JSON.stringify(this.attrs));
            return datas.flat().map($item => {
                return $item;
            });
        },
    },
    mounted() {
        this.values = this.value.strToArr();
    },
    watch: {
        value($val) {
            this.values = $val.strToArr();
        },
        values($val, $oldVal) {
            if ($val.toString() == $oldVal.toString()) return;

            const tmp = $val.toString().strToArr();
            // 존재하는 item만 result
            const result = tmp.filter($item => !!$item);

            this.parentValuesAll.forEach($item => {
                const itemArr = $item.strToArr();
                let chk = true;
                itemArr.forEach($item2 => {
                    if (!$val.includes($item2)) chk = false;
                });

                if (chk) {
                    if (!this.parentValues.includes($item)) this.parentValues.push($item);
                } else {
                    if (this.parentValues.includes($item)) this.parentValues.splice(this.parentValues.indexOf($item), 1);
                }
            });
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

            return result.toString();
        },
        evt_parentItemClick(evt) {
            const target = evt.target;
            if (target.checked) {
                this.values = this.values.concat(target.value.strToArr());
            } else {
                this.values = this.values.filter($item => {
                    return !target.value.strToArr().includes($item);
                });
            }
        },
        evt_confirm() {
            this.checked = this.values.toString();
            this.$emit('close');
        },
    },
};
</script>
