<template>
    <div class="ui_chart_wrap is-gender" :id="id">
        <!-- 데이터 없는경우 -->
        <div v-if="!chartData || chartData.data.length == 0" class="no_data"><span class="ui_no_data_txt">데이터가 없습니다.</span></div>
        <!-- / 데이터 없는경우 -->

        <div class="graphBox" v-else>
            <!-- 남성 -->
            <div class="manWrap" :style="{ height: manScale }">
                <div class="manGraph">
                    <span class="info">{{ dataMan.per }}%</span>
                    <svg ref="manImg" id="manImg" viewBox="0 0 124 308" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <mask :id="mMaskId">
                            <rect x="0" y="0" width="100%" :height="setManHeight + '%'" fill="white"></rect>
                        </mask>
                        <path xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" d="M62 64C79.6731 64 94 49.6731 94 32C94 14.3269 79.6731 0 62 0C44.3269 0 30 14.3269 30 32C30 49.6731 44.3269 64 62 64ZM0 96C0 84.9543 8.9543 76 20 76H104C115.046 76 124 84.9543 124 96V182C124 193.046 115.046 202 104 202H87V288C87 299.046 78.0457 308 67 308H57C45.9543 308 37 299.046 37 288V202H20C8.95431 202 0 193.046 0 182V96Z" :fill="manColor" />

                        <path v-if="multiMan.length == 0" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" d="M62 64C79.6731 64 94 49.6731 94 32C94 14.3269 79.6731 0 62 0C44.3269 0 30 14.3269 30 32C30 49.6731 44.3269 64 62 64ZM0 96C0 84.9543 8.9543 76 20 76H104C115.046 76 124 84.9543 124 96V182C124 193.046 115.046 202 104 202H87V288C87 299.046 78.0457 308 67 308H57C45.9543 308 37 299.046 37 288V202H20C8.95431 202 0 193.046 0 182V96Z" fill="#ffff" :mask="mSvgId" />

                        <path v-else xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" d="M62 64C79.6731 64 94 49.6731 94 32C94 14.3269 79.6731 0 62 0C44.3269 0 30 14.3269 30 32C30 49.6731 44.3269 64 62 64ZM0 96C0 84.9543 8.9543 76 20 76H104C115.046 76 124 84.9543 124 96V182C124 193.046 115.046 202 104 202H87V288C87 299.046 78.0457 308 67 308H57C45.9543 308 37 299.046 37 288V202H20C8.95431 202 0 193.046 0 182V96Z" fill="#ffff" :mask="mSvgId" />

                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M92 32C92 48.5685 78.5685 62 62 62C45.4315 62 32 48.5685 32 32C32 15.4315 45.4315 2 62 2C78.5685 2 92 15.4315 92 32ZM94 32C94 49.6731 79.6731 64 62 64C44.3269 64 30 49.6731 30 32C30 14.3269 44.3269 0 62 0C79.6731 0 94 14.3269 94 32ZM39 202V200H37H20C10.0589 200 2 191.941 2 182V96C2 86.0589 10.0589 78 20 78H104C113.941 78 122 86.0589 122 96V182C122 191.941 113.941 200 104 200H87H85V202V288C85 297.941 76.9411 306 67 306H57C47.0589 306 39 297.941 39 288V202ZM20 202H35H37V204V288C37 299.046 45.9543 308 57 308H67C78.0457 308 87 299.046 87 288V204V202H89H104C115.046 202 124 193.046 124 182V96C124 84.9543 115.046 76 104 76H20C8.9543 76 0 84.9543 0 96V182C0 193.046 8.95431 202 20 202Z"
                            :fill="manColor" />
                    </svg>

                    <!-- 싱글 -->
                    <comp-bubble-box v-if="multiMan.length == 0" :html-type="true" pos="CM" :custom-color="manColor">
                        <button class="dataBox" :style="getClickStyle" @click="evt_click(dataMan)">
                            <div :style="{ height: setManHeight + '%' }"></div>
                            <div :style="{ height: 100 - setManHeight + '%' }"></div>
                        </button>
                        <div slot="html-content" class="v3_chart_tooltip" :class="onlyPercentage && 'only_percentage'">
                            <span class="title">{{ dataMan.name }}</span>
                            <strong v-if="!onlyPercentage" class="dv">{{ Number(dataMan.value).lengthLimitComma(1, 2) }}</strong>
                            <span v-if="!onlyPercentage" class="per">({{ dataMan.per }}%)</span>
                            <span v-else-if="onlyPercentage" class="only_per">{{ dataMan.per }}%</span>
                        </div>
                    </comp-bubble-box>

                    <!-- 멀티 -->
                    <div class="dataBox" ref="dataBox" id="dataBoxMan" v-else>
                        <comp-bubble-box class="is-gender" :html-type="true" pos="CM" :custom-color="manColor">
                            <div :style="{ height: multiManHgtT + 'px' }">
                                <button :style="getClickStyle" @click="evt_click(multiMan[1])"></button>
                            </div>
                            <div slot="html-content" class="v3_chart_tooltip" :class="onlyPercentage && 'only_percentage'">
                                <span class="title">{{ multiMan[1].name }}</span>
                                <strong v-if="!onlyPercentage" class="dv">{{ Number(multiMan[1].value).lengthLimitComma(1, 2) }}</strong>
                                <span v-if="!onlyPercentage" class="per">({{ multiMan[1].per }}%)</span>
                                <span v-else-if="onlyPercentage" class="only_per">{{ multiMan[1].per }}%</span>
                            </div>
                        </comp-bubble-box>
                        <comp-bubble-box class="is-gender" :html-type="true" pos="CM" :custom-color="manColor">
                            <div :style="{ height: multiManHgtB + 'px' }">
                                <button :style="getClickStyle" @click="evt_click(multiMan[0])"></button>
                            </div>
                            <div slot="html-content" class="v3_chart_tooltip" :class="onlyPercentage && 'only_percentage'">
                                <span class="title">{{ multiMan[0].name }}</span>
                                <strong v-if="!onlyPercentage" class="dv">{{ Number(multiMan[0].value).lengthLimitComma(1, 2) }}</strong>
                                <span v-if="!onlyPercentage" class="per">({{ multiMan[0].per }}%)</span>
                                <span v-else-if="onlyPercentage" class="only_per">{{ multiMan[0].per }}%</span>
                            </div>
                        </comp-bubble-box>
                    </div>
                </div>
                <div class="name">남성</div>
            </div>

            <!-- 여성 -->
            <div class="womanWrap" :style="{ height: womanScale }">
                <div class="womanGraph">
                    <span class="info">{{ dataWoman.per }}%</span>
                    <svg ref="womanImg" id="womanImg" viewBox="0 0 139 308" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <mask :id="fMaskId">
                            <rect x="0" y="0" width="100%" :height="setWomanHeight + '%'" fill="white"></rect>
                        </mask>
                        <path xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" d="M69 64C86.6731 64 101 49.6731 101 32C101 14.3269 86.6731 0 69 0C51.3269 0 37 14.3269 37 32C37 49.6731 51.3269 64 69 64ZM51.1009 85.1009C58.3905 70.0717 79.8014 70.0716 87.091 85.1008L136.162 186.272C142.604 199.554 132.929 215 118.167 215H94.096V288C94.096 299.046 85.1416 308 74.096 308H64.096C53.0503 308 44.096 299.046 44.096 288V215H20.0249C5.26242 215 -4.4125 199.554 2.02995 186.272L51.1009 85.1009Z" :fill="womanColor" />

                        <path v-if="multiMan.length == 0" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" d="M69 64C86.6731 64 101 49.6731 101 32C101 14.3269 86.6731 0 69 0C51.3269 0 37 14.3269 37 32C37 49.6731 51.3269 64 69 64ZM51.1009 85.1009C58.3905 70.0717 79.8014 70.0716 87.091 85.1008L136.162 186.272C142.604 199.554 132.929 215 118.167 215H94.096V288C94.096 299.046 85.1416 308 74.096 308H64.096C53.0503 308 44.096 299.046 44.096 288V215H20.0249C5.26242 215 -4.4125 199.554 2.02995 186.272L51.1009 85.1009Z" fill="#ffff" :mask="fSvgId" />

                        <path v-else xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" d="M69 64C86.6731 64 101 49.6731 101 32C101 14.3269 86.6731 0 69 0C51.3269 0 37 14.3269 37 32C37 49.6731 51.3269 64 69 64ZM51.1009 85.1009C58.3905 70.0717 79.8014 70.0716 87.091 85.1008L136.162 186.272C142.604 199.554 132.929 215 118.167 215H94.096V288C94.096 299.046 85.1416 308 74.096 308H64.096C53.0503 308 44.096 299.046 44.096 288V215H20.0249C5.26242 215 -4.4125 199.554 2.02995 186.272L51.1009 85.1009Z" fill="#ffff" :mask="fSvgId" />

                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M99 32C99 48.5685 85.5685 62 69 62C52.4315 62 39 48.5685 39 32C39 15.4315 52.4315 2 69 2C85.5685 2 99 15.4315 99 32ZM101 32C101 49.6731 86.6731 64 69 64C51.3269 64 37 49.6731 37 32C37 14.3269 51.3269 0 69 0C86.6731 0 101 14.3269 101 32ZM46.0959 215V213H44.0959H20.0249C6.73867 213 -1.96876 199.099 3.82945 187.145L52.9004 85.9737C59.4611 72.4474 78.7308 72.4474 85.2915 85.9736L134.362 187.145C140.161 199.099 131.453 213 118.167 213H94.0959H92.0959V215V288C92.0959 297.941 84.0371 306 74.0959 306H64.0959C54.1548 306 46.0959 297.941 46.0959 288V215ZM20.0249 215H42.0959H44.0959V217V288C44.0959 299.046 53.0503 308 64.0959 308H74.0959C85.1416 308 94.0959 299.046 94.0959 288V217V215H96.0959H118.167C132.929 215 142.604 199.554 136.162 186.272L87.091 85.1008C79.8014 70.0716 58.3905 70.0717 51.1009 85.1009L2.02995 186.272C-4.41251 199.554 5.26241 215 20.0249 215Z"
                            :fill="womanColor" />
                    </svg>

                    <!-- 싱글 -->
                    <comp-bubble-box v-if="multiWoman.length == 0" :html-type="true" pos="CM" :custom-color="womanColor">
                        <button class="dataBox" :style="getClickStyle" @click="evt_click(dataWoman)">
                            <span :style="{ height: setWomanHeight + '%' }"></span>
                            <span :style="{ height: 100 - setWomanHeight + '%' }"></span>
                        </button>
                        <div slot="html-content" class="v3_chart_tooltip" :class="onlyPercentage && 'only_percentage'">
                            <span class="title">{{ dataWoman.name }}</span>
                            <strong v-if="!onlyPercentage" class="dv">{{ Number(dataWoman.value).lengthLimitComma(1, 2) }}</strong>
                            <span v-if="!onlyPercentage" class="per">({{ dataWoman.per }}%)</span>
                            <span v-else-if="onlyPercentage" class="only_per">{{ dataWoman.per }}%</span>
                        </div>
                    </comp-bubble-box>

                    <!-- 멀티 -->
                    <div class="dataBox" id="dataBoxWo" v-else>
                        <comp-bubble-box :html-type="true" pos="CM" :custom-color="womanColor">
                            <div :style="{ height: multiWoHgtT + 'px' }">
                                <button :style="getClickStyle" @click="evt_click(multiWoman[1])"></button>
                            </div>
                            <div slot="html-content" class="v3_chart_tooltip" :class="onlyPercentage && 'only_percentage'">
                                <span class="title">{{ multiWoman[1].name }}</span>
                                <strong v-if="!onlyPercentage" class="dv">{{ Number(multiWoman[1].value).lengthLimitComma(1, 2) }}</strong>
                                <span v-if="!onlyPercentage" class="per">({{ multiWoman[1].per }}%)</span>
                                <span v-else-if="onlyPercentage" class="only_per">{{ multiWoman[1].per }}%</span>
                            </div>
                        </comp-bubble-box>
                        <comp-bubble-box :html-type="true" pos="CM" :custom-color="womanColor">
                            <div :style="{ height: multiWoHgtB + 'px' }">
                                <button :style="getClickStyle" @click="evt_click(multiWoman[0])"></button>
                            </div>
                            <div slot="html-content" class="v3_chart_tooltip" :class="onlyPercentage && 'only_percentage'">
                                <span class="title">{{ multiWoman[0].name }}</span>
                                <strong v-if="!onlyPercentage" class="dv">{{ Number(multiWoman[0].value).lengthLimitComma(1, 2) }}</strong>
                                <span v-if="!onlyPercentage" class="per">({{ multiWoman[0].per }}%)</span>
                                <span v-else-if="onlyPercentage" class="only_per">{{ multiWoman[0].per }}%</span>
                            </div>
                        </comp-bubble-box>
                    </div>
                </div>
                <div class="name">여성</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'comp-chart-gender',
    data() {
        return {
            dataMan: [],
            dataWoman: [],
            multiMan: [],
            multiWoman: [],
            multiManHgtT: 0,
            multiManHgtB: 0,
            multiWoHgtT: 0,
            multiWoHgtB: 0,
            manColor: '',
            womanColor: '',
        };
    },
    props: {
        id: { type: String },
        chartData: { type: Object },
        onlyPercentage: { type: Boolean, default: false },
    },
    computed: {
        manScale() {
            let result = '';
            let scale = ((this.dataMan.per / this.dataWoman.per) * 100).toFixed(1);
            if (this.multiMan.length > 0) {
                return this.dataMan.per > this.dataWoman.per ? (result = '100%') : scale > 40 ? (result = scale + '%') : (result = '40%');
            } else {
                return result;
            }
        },
        womanScale() {
            let result = '';
            let scale = ((this.dataWoman.per / this.dataMan.per) * 100).toFixed(1);
            if (this.multiWoman.length > 0) {
                return this.dataWoman.per > this.dataMan.per ? (result = '100%') : scale > 40 ? (result = scale + '%') : (result = '40%');
            } else {
                return result;
            }
        },

        setManHeight() {
            let result = '';
            result = this.multiMan.length > 0 ? 100 - this.multiMan[0].per : 100 - this.dataMan.per;
            return result;
        },

        setWomanHeight() {
            let result = '';
            result = this.multiWoman.length > 0 ? 100 - this.multiWoman[0].per : 100 - this.dataWoman.per;
            return result;
        },

        mMaskId() {
            let result = '';
            result = this.multiMan.length == 0 ? this.id + '_singleMan' : this.id + '_multiMan';
            return result;
        },

        mSvgId() {
            let name = '';
            let result = '';
            name = this.multiMan.length == 0 ? this.id + '_singleMan' : this.id + '_multiMan';
            result = `url(#${name})`;
            return result;
        },

        fMaskId() {
            let result = '';
            result = this.multiWoman.length == 0 ? this.id + '_singleWo' : this.id + '_multiWo';
            return result;
        },

        fSvgId() {
            let name = '';
            let result = '';
            name = this.multiWoman.length == 0 ? this.id + '_singleWo' : this.id + '_multiWo';
            result = `url(#${name})`;
            return result;
        },

        getClickEvtChk() {
            return this.$listeners.click ? true : false;
        },

        // 클릭 이벤트시 커서 스타일
        getClickStyle() {
            let style = {
                width: '100%',
                height: '100%',
                cursor: this.getClickEvtChk ? 'pointer' : 'default',
            };
            return style;
        },
    },

    watch: {
        chartData: {
            immediate: true,
            deep: true,
            handler() {
                this.getData();
            },
        },

        multiMan: {
            deep: true,
            handler() {
                this.$nextTick(() => {
                    this.multiHeight();
                });
            },
        },
        multiWoman: {
            deep: true,
            handler() {
                this.$nextTick(() => {
                    this.multiHeight();
                });
            },
        },
    },
    methods: {
        evt_click(val) {
            this.$emit('click', val);
        },

        getData() {
            let tmp = JSON.parse(JSON.stringify(this.chartData));
            let manData = 0;
            let womanData = 0;
            let totalData = 0;
            let manColor = '';
            let womanColor = '';

            tmp.data.forEach((item) => {
                if (item.name == '남성') {
                    item.datas.forEach((item2) => {
                        manData += item2.value;
                    });
                    if (item.color || item.fill) {
                        this.manColor = item.color || item.fill;
                    } else {
                        this.manColor = '#a0e0f7'; // 남성 기본색상
                    }
                } else {
                    item.datas.forEach((item2) => {
                        if (item2.color) womanColor = item2.color;
                        womanData += item2.value;
                    });

                    if (item.color || item.fill) {
                        this.womanColor = item.color || item.fill;
                    } else {
                        this.womanColor = '#f7b7e8'; // 여성 기본색상
                    }
                }

                totalData = manData + womanData;

                if (item.datas.length <= 1) {
                    this.dataMan = {
                        name: '남성',
                        value: manData,
                        per: totalData == 0 ? 0 : ((manData / totalData) * 100).toFixed(1),
                        color: manColor,
                    };

                    this.dataWoman = {
                        name: '여성',
                        value: womanData,
                        per: totalData == 0 ? 0 : ((womanData / totalData) * 100).toFixed(1),
                        color: womanColor,
                    };

                    // 멀티 데이터 초기화
                    if (this.multiMan.length > 0) this.multiMan = [];
                    if (this.multiWoman.length > 0) this.multiWoman = [];
                }

                if (item.datas.length > 1) {
                    if (item.name == '남성') {
                        item.datas.forEach((item3) => {
                            this.multiMan.push({
                                name: item.name + 'x' + item3.name,
                                value: item3.value,
                                per: ((item3.value / manData) * 100).toFixed(1),
                                color: item.color || item.fill ? item.color || item.fill : '',
                            });
                        });
                    } else {
                        item.datas.forEach((item3) => {
                            this.multiWoman.push({
                                name: item.name + 'x' + item3.name,
                                value: item3.value,
                                per: ((item3.value / womanData) * 100).toFixed(1),
                                color: item.color || item.fill ? item.color || item.fill : '',
                            });
                        });
                    }
                }
            });
        },

        multiHeight() {
            if (this.multiWoman.length == 0 || this.multiMan.length == 0) return;
            let dataBoxMan = document.getElementById('dataBoxMan');
            let manHgt = (dataBoxMan.clientHeight * this.setManHeight) / 100;
            this.multiManHgtT = manHgt;
            this.multiManHgtB = dataBoxMan.clientHeight - manHgt;

            let dataBoxWo = document.getElementById('dataBoxWo');
            let womanHgt = (dataBoxWo.clientHeight * this.setWomanHeight) / 100;
            this.multiWoHgtT = womanHgt;
            this.multiWoHgtB = dataBoxWo.clientHeight - womanHgt;
        },
    },

    mounted() {
        this.multiHeight();
    },
};
</script>

<style></style>
