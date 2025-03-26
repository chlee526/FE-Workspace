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
                                            <h3><span>Tab</span></h3>
                                            <div class="rc_wrap">
                                                <comp-helpbox-btn id="helper_s01" :active="true"></comp-helpbox-btn>
                                            </div>
                                        </div>
                                        <div class="ui_help_box" data-for="helper_s01">
                                            <div class="wrap">
                                                <a href="https://dev.realsn.com/rnd/solution/fe/workspace/ws/-/tree/main/shared/ui/form/tab" target="_blank" class="reference_lnk">레퍼런스 바로가기</a>
                                                <ul>
                                                    <li>
                                                        <span>Tab - Tab UI 컴포넌트</span>
                                                    </li>
                                                    <li>
                                                        <span><strong>타입</strong> : 위치에 따라 사용하는 용도가 다름(아래에서 Box는 가장 상위 레벨의 박스 형태를 말함)</span>
                                                        <ul>
                                                            <li><strong>컨텐츠형</strong> : 컨텐츠 내부에서 선언, 박스(Box) 안쪽에서 사용할 경우</li>
                                                            <li><strong>페이지형</strong> : 페이지 최상단, 최상위 박스 보다 위에서 사용할 경우</li>
                                                            <li><strong>박스형</strong> : 박스의 제목영역을 Tab으로 사용할 경우</li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span><strong>크기</strong> : small, normal 두가지 크기 제공하나, 컨텐츠형일 때만 사용 가능</span>
                                                    </li>
                                                    <li>
                                                        <span><strong>가로크기자동</strong> : 기본 가로 크기는 100%이나, 해당 옵션으로 자동크기로 설정 가능</span>
                                                    </li>
                                                    <li>
                                                        <span><strong>Tab 설정</strong> : 탭의 갯수를 늘리거나 줄여볼 수 있고, 이름과 사용여부등을 설정</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="ui_function">
                                        <div class="lc">
                                            <comp-filter-grp pos="BL">
                                                <template v-slot:title>Tab 설정</template>
                                                <template v-slot:items>
                                                    <dl>
                                                        <dt>
                                                            <strong>Tab</strong> <comp-button class="ui_btn is-xsmall is-icon-only" title="Tab 추가" @click="evt_tab_add"><span class="icon">&#xe017;</span></comp-button>
                                                        </dt>
                                                        <dd>
                                                            <comp-list v-model="set.items.opts" :component="set.tabComp" sortable></comp-list>
                                                        </dd>
                                                    </dl>
                                                </template>
                                            </comp-filter-grp>
                                        </div>
                                        <div class="rc">
                                            <div class="grp">
                                                <strong>타입</strong>
                                                <comp-radio-grp id="set_type" name="btnType" v-model="set.type.value" :opts="set.type.opts" :box="true"></comp-radio-grp>
                                                <strong>크기</strong>
                                                <comp-selectbox id="set_size" v-model="set.size.value" :opts="set.size.opts" style="width: 150px" :disabled="set.type.value != 0"></comp-selectbox>
                                            </div>
                                            <hr />
                                            <div class="grp">
                                                <comp-switch-btn id="set_autoWid" class="is-small" v-model="set.size.autoWid" label="가로크기자동"></comp-switch-btn>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="content">
                                        <div class="wrap">
                                            <template v-if="set.type.value == 0">
                                                <comp-tab id="tab_01" key="tab_01" :opts="set.items.opts" :class="[set.size.opts.getParseDatas({ code: set.size.value })[0].className, { 'is-wid-auto': set.size.autoWid }]" v-model="set.items.value"></comp-tab>
                                            </template>
                                            <template v-else-if="set.type.value == 1">
                                                <comp-tab id="tab_02" key="tab_02" class="is-page" :class="{ 'is-wid-auto': set.size.autoWid }" :opts="set.items.opts" v-model="set.items.value"></comp-tab>
                                            </template>
                                            <template v-else>
                                                <div class="ui_box">
                                                    <div class="header">
                                                        <div class="wrap">
                                                            <comp-tab id="tab_03" class="is-box" :class="{ 'is-wid-auto': set.size.autoWid }" :opts="set.items.opts" v-model="set.items.value"></comp-tab>
                                                        </div>
                                                    </div>
                                                    <div class="content">컨텐츠</div>
                                                </div>
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
import CompListGrp_Tab from './list_tab.vue';

export default {
    name: 'component-tab',
    data() {
        return {
            set: {
                size: {
                    value: 2,
                    opts: [
                        { code: 1, name: 'Small', className: 'is-small' },
                        { code: 2, name: 'Normal', className: '' },
                    ],
                    autoWid: false,
                },
                type: {
                    value: 0,
                    opts: [
                        { code: 0, name: '컨텐츠형(일반)' },
                        { code: 1, name: '페이지형' },
                        { code: 2, name: '박스형' },
                    ],
                    wid: null,
                },
                items: {
                    value: 1,
                    opts: [
                        { code: 1, name: 'Tab 1' },
                        { code: 2, name: 'Tab 2' },
                        { code: 3, name: 'Tab 3', disabled: true },
                    ],
                },
                tabComp: CompListGrp_Tab,
            },
        };
    },
    methods: {
        evt_tab_add(e) {
            const lastIdx = Math.max.apply(Math, this.set.items.opts.arrObjAttrToStr('code').split(','));
            this.set.items.opts.push({
                code: lastIdx + 1,
                name: 'Tab ' + (lastIdx + 1),
                disabled: false,
            });
        },
    },
};
</script>

<style></style>
