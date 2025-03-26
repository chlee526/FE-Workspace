<template>
    <comp-chart-gender v-if="chartData.data && chartData.data.length > 0" :id="id" :chartData="chartData" :style="setStyle" :onlyPercentage="true"></comp-chart-gender>
    <div v-else class="ui_nodata" :style="setStyle"></div>
</template>

<script>
import { API_gender } from '@shared/api/datalab/gender.js';
import { uuid } from 'vue-uuid';
import { mapGetters } from 'vuex';
export default {
    name: 'tmpl-inc-genderage-gender',

    data() {
        return {
            apiUID: uuid.v4(),
            apiParams: null,
            loading: false,
            genderData: [],
            chartData: {},
        };
    },
    props: {
        id: { type: String }, // 아이디
        commonSearchOpts: { type: Object }, // 검색조건(분석대상 포함)
    },

    computed: {
        ...mapGetters(['getGender']),
        setStyle() {
            let result = {
                boxSizing: 'border-box',
                marginBottom: 20 + 'px',
                height: 190 + 'px',
            };
            return result;
        },

        getChartData() {
            if (this.genderData.length == 0) return false;
            let genderData = JSON.parse(JSON.stringify(this.genderData));
            let result = {};
            let dataArr = [];

            Object.keys(genderData[0]).forEach((item) => {
                let tmpObj = { code: item };
                dataArr.push(tmpObj);
            });

            dataArr.forEach((item2) => {
                item2.name = item2.code == 'male' ? '남성' : '여성';
                item2.datas = [{ value: genderData[0][item2.code] ? Number(genderData[0][item2.code]) : null }];
                item2.color = item2.code == 'male' ? this.getGender[1].color : this.getGender[2].color;
            });
            result.data = dataArr;

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

    methods: {
        async fetchData() {
            this.loading = true;
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

            await API_gender(this.apiUID, this.apiParams)
                .then((res) => {
                    // 임시데이터
                    // let tmp = [
                    //     { female: '20', male: '80' },
                    //     { female: '35', male: '65' },
                    //     { female: '65', male: '35' },
                    //     { female: '19', male: '81' },
                    //     { female: '46', male: '54' },
                    // ];
                    // res.data = [tmp[Math.floor(Math.random() * 5)]];
                    //-- 임시데이터

                    this.genderData = res.data;
                    this.chartData = this.getChartData;
                    this.loading = false;
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
