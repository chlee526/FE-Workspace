<template>
    <comp-chart-age v-if="chartData.data" :id="id" :chartData="chartData" :style="setStyle" :onlyPercentage="true"></comp-chart-age>
    <div v-else class="ui_nodata" :style="setStyle"></div>
</template>

<script>
import { API_age } from '@shared/api/datalab/age.js';
import { uuid } from 'vue-uuid';
import { mapGetters } from 'vuex';
export default {
    name: 'tmpl-inc-genderage-age',
    data() {
        return {
            apiUID: uuid.v4(),
            apiParams: {},
            loading: false,
            chartData: {},
            ageDatas: [],
        };
    },
    props: {
        id: { type: String }, // 아이디
        commonSearchOpts: { type: Object }, // 검색조건(분석대상 포함)
    },
    computed: {
        ...mapGetters(['getAnalTargets']),
        setStyle() {
            let result = {
                height: 200 + 'px',
                marginTop: 20 + 'px',
            };
            return result;
        },
        // 데이터 sort
        getChartData() {
            if (this.ageDatas.length == 0) return false;
            let result = {};
            let ageData = JSON.parse(JSON.stringify(this.ageDatas));
            ageData.forEach(($item, $idx) => {
                $item.category = $idx == ageData.length - 1 ? $item.age + '대~' : $item.age + '대';
                $item.value = Number($item.cnt);
                $item.color = '#c7c7c7';
                delete $item.age;
                delete $item.cnt;
            });

            // value 내림차순 정렬
            let sortArr = JSON.parse(JSON.stringify(ageData));
            sortArr.sort((a, b) => {
                return b.value - a.value;
            });

            // 1,2 위 하이라이트
            for (let i = 0; i < 2; i++) {
                sortArr[i].color = this.getAnalTargets.default[0].color;
            }

            ageData.forEach((item) => {
                sortArr.forEach((item2) => {
                    if (item.category == item2.category) {
                        item.color = item2.color;
                    }
                });
            });

            result.data = ageData;
            return result;
        },
    },
    watch: {
        commonSearchOpts: {
            immediate: true,
            deep: true,
            handler(val) {
                if (val.analsList && val.analsList.length !== 0) this.fetchData();
            },
        },
    },
    mounted() {},
    methods: {
        async fetchData() {
            this.apiParams = JSON.parse(JSON.stringify(this.commonSearchOpts));
            let rk_seq = {
                code: this.apiParams.analsList[0].attr_type_code ? this.apiParams.analsList[0].code.substring(1) : this.apiParams.analsList[0].code,
                name: this.apiParams.analsList[0].name,
                attr_type_code: this.apiParams.analsList[0].attr_type_code || '',
            };
            this.apiParams.rk_seq = this.apiParams.rk_seq ? this.apiParams.rk_seq.push(rk_seq) : [rk_seq];

            if (this.apiParams.analsList && this.apiParams.analsList.length && this.apiParams.analsList[0].attr_type_code == 'out') {
                this.apiParams.s_date = this.apiParams.ps_date;
                this.apiParams.e_date = this.apiParams.pe_date;
            }

            delete this.apiParams.analsList;
            delete this.apiParams.category;

            await API_age(this.apiUID, this.apiParams)
                .then((res) => {
                    //  임시데이터
                    // res.data = [
                    //     { cnt: '10', age: '10' },
                    //     { cnt: '25', age: '20' },
                    //     { cnt: '30', age: '30' },
                    //     { cnt: '5', age: '40' },
                    //     { cnt: '10', age: '50' },
                    //     { cnt: '20', age: '60' },
                    // ];
                    // -- 임시데이터
                    this.ageDatas = res.data;
                    this.chartData = this.getChartData;
                    this.$emit('excelParams', this.apiParams);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    },
};
</script>

<style lang="scss" scoped></style>
