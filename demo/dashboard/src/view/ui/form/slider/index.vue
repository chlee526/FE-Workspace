<template>
    <div id="content">
        <h2 id="page_title" class="ui_invisible"></h2>
        <div class="wrap">
            <!-- Location -->
            <comp-location></comp-location>
            <!-- // Location -->

            <!-- 본문 컨텐츠 -->
            <div class="contents">
                <div class="wrap">
                    <div class="ui_row">
                        <div class="wrap">
                            <div class="ui_col">
                                <div class="ui_box">
                                    <div class="header">
                                        <div class="wrap">
                                            <h3><span>Slider</span></h3>
                                            <div class="rc_wrap">
                                                <comp-helpbox-btn id="helper_s01" :active="true"></comp-helpbox-btn>
                                            </div>
                                        </div>
                                        <div class="ui_help_box" data-for="helper_s01">
                                            <div class="wrap">
                                                <a href="https://dev.realsn.com/rnd/solution/fe/workspace/ws/-/tree/devel/shared/ui/form/slider" target="_blank" class="reference_lnk">레퍼런스 바로가기</a>
                                                <ul>
                                                    <li>
                                                        <span><strong>크기</strong> : small, normal의 두가지 크기 제공</span>
                                                    </li>
                                                    <li>
                                                        <span><strong>가로 사이즈 고정</strong> : 슬라이더의 가로 크기를 고정</span>
                                                    </li>
                                                    <li>
                                                        <strong>타입</strong>
                                                        <ul>
                                                            <li><strong>구간 분할</strong> : 구간이 분할된 형태</li>
                                                            <li><strong>구간 미분할</strong> : 구간이 분할되지 않은 형태</li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span><strong>분할 구간 수</strong> : 분할 구간 수 설정 </span>
                                                    </li>
                                                    <li>
                                                        <span><strong>단위</strong> : 단위 설정</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="ui_function">
                                        <div class="rc">
                                            <div class="grp">
                                                <strong>크기</strong>
                                                <comp-selectbox id="set_size" v-model="set.size.value" :opts="set.size.opts" style="width: 120px"></comp-selectbox>
                                            </div>
                                            <hr />
                                            <div class="grp">
                                                <span>가로 사이즈 고정</span>
                                                <comp-input-box id="set_size_width" type="number" v-model="set.size.width" placeholder="가로" :min="480" style="width: 70px"></comp-input-box>
                                            </div>
                                            <hr />
                                            <div class="grp">
                                                <strong>타입</strong>
                                                <comp-radio-grp id="set_type" name="type" v-model="set.type.value" :opts="set.type.opts" :box="true"></comp-radio-grp>
                                            </div>
                                            <hr />

                                            <div class="grp">
                                                <span>분할 구간 수</span>
                                                <comp-radio-grp id="set_division" name="btn" v-model="set.division.value" :opts="set.division.opts" :disabled="getType === 'nolabel'" :box="true"></comp-radio-grp>
                                            </div>
                                            <hr />
                                            <div class="grp">
                                                <span>단위</span>
                                                <comp-input-box id="set_unit" c v-model="set.unit" placeholder="단위" style="width: 70px"></comp-input-box>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="content">
                                        <div class="wrap ui_ac" style="width: 100%">
                                            <comp-slider id="slider_demo" :class="getSize" v-model="datas.value" :type="getType" min="0" max="100" :division="getDivision" :unit="set.unit" :style="getWid"></comp-slider>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- // 본문 컨텐츠 -->
        </div>
    </div>
</template>

<script>
export default {
    name: 'component-slider',
    data() {
        return {
            datas: {
                value: '',
            },
            set: {
                size: {
                    width: '',
                    value: 1,
                    opts: [
                        { code: 0, name: 'Small', className: 'is-small' },
                        { code: 1, name: 'Normal', className: '' },
                    ],
                },
                type: {
                    value: 0,
                    opts: [
                        { code: 0, name: '구간 분할', className: 'label' },
                        { code: 1, name: '구간 미분할', className: 'nolabel' },
                    ],
                },
                division: {
                    value: 4,
                    opts: [
                        { code: 0, name: '2', disabled: false },
                        { code: 1, name: '4', disabled: false },
                        { code: 2, name: '5', disabled: false },
                        { code: 4, name: '10', disabled: false },
                    ],
                },
                unit: '',
            },
        };
    },

    watch: {
        'set.division': {
            deep: true,
            handler(val) {
                this.datas.value = '';
            },
        },
    },

    computed: {
        getSize() {
            return this.set.size.opts.getParseDatas({ code: this.set.size.value })[0].className;
        },
        getWid() {
            const size = this.set.size.width && this.set.size.width.length && this.set.size.width > 480 ? this.set.size.width + 'px' : '480px';
            return `width: ${size}`;
        },
        getType() {
            return this.set.type.opts.getParseDatas({ code: `${this.set.type.value}` })[0].className;
        },
        getDivision() {
            return this.set.division.opts.getParseDatas({ code: `${this.set.division.value}` })[0].name;
        },
    },
};
</script>

<style></style>
