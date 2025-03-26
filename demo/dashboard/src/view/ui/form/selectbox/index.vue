<template>
    <div id="content">
        <h2 id="page_title" class="ui_invisible">SelectBox</h2>
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
                                            <h3>
                                                <span>SelectBox</span>
                                            </h3>
                                            <div class="rc_wrap">
                                                <comp-helpbox-btn id="helper_s01" :active="true"></comp-helpbox-btn>
                                            </div>
                                        </div>
                                        <div class="ui_help_box" data-for="helper_s01">
                                            <div class="wrap">
                                                <a href="https://dev.realsn.com/rnd/solution/fe/workspace/ws/-/tree/devel/shared/ui/form/selectbox" target="_blank" class="reference_lnk">레퍼런스 바로가기</a>
                                                <ul>
                                                    <li>
                                                        <span>SelectBox - 셀렉트박스(단일선택/다중선택) 컴포넌트</span>
                                                    </li>
                                                    <li>
                                                        <span><strong>크기</strong> : small, normal, large, xlarge 다섯가지 크기 제공</span>
                                                    </li>
                                                    <li>
                                                        <span><strong>가로 사이즈 고정</strong> : selectBox 가로 사이즈 고정</span>
                                                    </li>
                                                    <li>
                                                        <strong>선택없음 라벨</strong>
                                                        <ul>
                                                            <li>선택이 없는 경우, '선택없음'같은 텍스트 설정이 필요할때 사용</li>
                                                            <li>설정한 텍스트가 기본 텍스트로 설정</li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <strong>전체선택 라벨</strong>
                                                        <ul>
                                                            <li>전체 선택이 필요한 경우, '전체'같은 텍스트 설정이 필요할때 사용</li>
                                                            <li>단일선택일때 설정한 텍스트로 opts 0번째 요소로 추가됨</li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span><strong>자동완성</strong> : 자동완성 사용여부</span>
                                                    </li>
                                                    <li>
                                                        <span><strong>다중선택</strong> : 다중선택 사용여부</span>
                                                    </li>
                                                    <li>
                                                        <span><strong>색상포함</strong> : opts에 color로 전달받은 색상 사용 여부</span>
                                                    </li>
                                                    <li>
                                                        <span><strong>미사용</strong> : 사용할수 없는 상태</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="ui_function">
                                        <div class="lc">
                                            <comp-filter-grp pos="BL">
                                                <template v-slot:title>아이템 설정</template>
                                                <template v-slot:items>
                                                    <dl>
                                                        <dt>
                                                            <strong>아이템</strong> <comp-button class="ui_btn is-xsmall is-icon-only" title="아이템 추가" @click="evt_opt_add"><span class="icon">&#xe017;</span></comp-button>
                                                        </dt>
                                                        <dd>
                                                            <comp-list v-model="datas.opts" :component="set.optComp" sortable></comp-list>
                                                        </dd>
                                                    </dl>
                                                </template>
                                            </comp-filter-grp>
                                        </div>
                                        <div class="rc">
                                            <div class="grp">
                                                <span>크기</span>
                                                <comp-selectbox id="set_size" class="is-small" v-model="set.size.value" :opts="set.size.opts" notSelectedLabel="normal"></comp-selectbox>
                                            </div>
                                            <hr />
                                            <div class="grp">
                                                <span>가로 사이즈 고정</span>
                                                <comp-input-box id="set_size_width" class="is-small" v-model="set.size.width" placeholder="가로" style="width: 80px"></comp-input-box>
                                            </div>
                                            <hr />
                                            <div class="grp">
                                                <span>선택없음 라벨</span>
                                                <comp-input-box id="set_notSelectedLabel" class="is-small" v-model="set.notSelectedLabel" placeholder="선택없음 라벨" style="width: 110px"></comp-input-box>
                                            </div>
                                            <hr />
                                            <div class="grp">
                                                <span>전체선택 라벨</span>
                                                <comp-input-box id="set_allSelectedLabel" class="is-small" v-model="set.allSelectedLabel" placeholder="전체선택 라벨" style="width: 110px"></comp-input-box>
                                            </div>
                                            <hr />
                                            <div class="grp">
                                                <comp-switch-btn id="set_autoComplete" class="is-small" v-model="set.autoComplete" label="자동완성"></comp-switch-btn>
                                            </div>
                                            <hr />
                                            <div class="grp">
                                                <comp-switch-btn id="set_multiple" class="is-small" v-model="set.multiple" label="다중선택"></comp-switch-btn>
                                            </div>
                                            <hr />
                                            <div class="grp">
                                                <comp-switch-btn id="set_useColor" class="is-small" v-model="set.useColor" label="색상포함"></comp-switch-btn>
                                            </div>
                                            <hr />
                                            <div class="grp">
                                                <comp-switch-btn id="set_disabled" class="is-small" v-model="set.disabled" label="미사용"></comp-switch-btn>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="content">
                                        <div class="wrap" style="text-align: center">
                                            <comp-selectbox id="demo-selectbox" :class="set.size.value" v-model="datas.value" :opts="getSelectOpts" :style="{ width: set.size.width }" :not-selected-label="set.notSelectedLabel" :all-selected-label="set.allSelectedLabel" :auto-complete="set.autoComplete" :multiple="set.multiple" :use-color="set.useColor" :disabled="set.disabled"></comp-selectbox>
                                            <br /><br />
                                            <template v-if="set.multiple">
                                                <strong>opts 11개 이상 </strong>
                                                <comp-selectbox id="demo-selectbox2" :class="set.size.value" v-model="datas.mutipleSelectValue" :opts="getMutipleSelectOpts" :style="{ width: set.size.width }" :not-selected-label="set.notSelectedLabel" :all-selected-label="set.allSelectedLabel" :auto-complete="set.autoComplete" :multiple="set.multiple" :use-color="set.useColor" :disabled="set.disabled"></comp-selectbox>
                                            </template>
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
import CompListGrp_Opt from './list_opt.vue';

export default {
    name: 'component-select',
    data() {
        return {
            datas: {
                value: '1',
                mutipleSelectValue: '1',
                opts: [
                    { code: '1', name: '아이템1', before: '&#xe078;', after: '' },
                    { code: '2', name: '<span style="color:red">123</span> 아이템2', before: '', after: '' },
                    { code: '3', name: '아이템3', before: '&#xe078;', after: '' },
                    { code: '4', name: '아이템4', after: '&#xe078;', before: '' },
                    { code: '5', name: '아이템5', before: '', after: '' },
                ],
            },
            set: {
                size: {
                    width: '',
                    value: '',
                    opts: [
                        { code: '', name: 'normal' },
                        { code: 'is-small', name: 'small' },
                        { code: 'is-large', name: 'large' },
                        { code: 'is-xlarge', name: 'xlarge' },
                    ],
                },
                notSelectedLabel: '',
                allSelectedLabel: '',
                multiple: false,
                useColor: false,
                autoComplete: false,
                disabled: false,
                optComp: CompListGrp_Opt,
            },
        };
    },
    computed: {
        getSelectOpts() {
            if (this.set.useColor) {
                const colorArray = ['#5BA1E0', '#EA7071', '#53C2F0', '#F1711B', '#FFA901'];
                return this.datas.opts.map((item, idx) => {
                    item.color = colorArray[idx];
                    return item;
                });
            } else {
                return this.datas.opts;
            }
        },
        getMutipleSelectOpts() {
            const mutipleSelectOpts = [];
            const colorArray = ['#5BA1E0', '#EA7071', '#53C2F0', '#F1711B', '#FFA901'];
            for (let i = 1; i <= 11; i++) {
                const item = { code: `${i}`, name: `아이템${i}`, before: '&#xe078;' };
                if (this.set.useColor) item.color = colorArray[i % 5];
                mutipleSelectOpts.push(item);
            }
            return mutipleSelectOpts;
        },
    },
    methods: {
        evt_opt_add(e) {
            const lastIdx = parseInt(this.datas.opts[this.datas.opts.length - 1].code) + 1;
            this.datas.opts.push({
                code: lastIdx,
                name: '추가 아이템',
            });
        },
    },
};
</script>
