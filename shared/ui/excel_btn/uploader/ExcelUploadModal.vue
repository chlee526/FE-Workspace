<template>
    <div class="wrap">
        <section ref="modal_item" class="ui_box popup_item popup_rel_info popup_excel_uploader" :style="'height:' + hgt + 'px'">
            <span class="bg" :style="'height:' + hgt + 'px'"></span>
            <div class="header">
                <div class="wrap">
                    <h2>
                        <!-- 타이틀 -->
                        <strong>
                            <template v-if="searchParams?.title">
                                {{ searchParams.title }}
                            </template>
                            <template v-else>새글등록</template>
                        </strong>
                    </h2>
                    <button type="button" class="close" title="팝업 닫기" @click="close">팝업 닫기</button>
                </div>
                <div>
                    <div class="errors">
                        <span
                            >오류 : <strong>{{ getErrorIndexList.length }}</strong
                            >건</span
                        >
                        <button class="ui_btn is-small" :disabled="getErrorIndexList.length < 1" @click="scrollToError">이동</button>
                    </div>
                    <button class="ui_btn is-small" :disabled="getErrorIndexList.length" @click="saveDatas(boardList)">전체저장</button>
                </div>
            </div>
            <div class="wrap">
                <div class="content" ref="scrollRoot" style="max-height: 500px">
                    <div class="ui_brd">
                        <div class="infos">
                            <div class="rc">
                                <div class="page_info">
                                    <span
                                        >총 <strong>{{ getBoardListlength }}</strong
                                        >건</span
                                    >
                                </div>
                            </div>
                        </div>
                        <div class="wrap">
                            <virtual-list ref="virtualList" :scrollRoot="$refs.scrollRoot" :dataComponent="{}" data-key="seq" :data-sources="boardList" :keeps="60" root-tag="table" header-tag="thead" wrap-tag="tbody" footer-tag="tbody" tmparea-tag="tbody" :pageMode="false" item-tag="tr">
                                <template #colgroup>
                                    <col v-for="{ key, width } in getColumns" :key="key" :style="{ width: width }" />
                                </template>
                                <template #header>
                                    <tr>
                                        <th v-for="{ name } in getColumns" :key="name">
                                            <strong>{{ name }}</strong>
                                        </th>
                                    </tr>
                                </template>

                                <!-- 데이터 없는 경우 -->
                                <template #footer v-if="!getBoardListlength">
                                    <tr class="is-no-over">
                                        <td class="is-no-over no_data in_list" :colspan="getColumnsLength">
                                            <span class="ui_no_data_txt">데이터가 없습니다.</span>
                                        </td>
                                    </tr>
                                </template>

                                <!-- 데이터 있는 경우 -->
                                <template v-else #item="{ item, index }">
                                    <tr :id="'seq_' + item.seq">
                                        <td v-for="column in getColumns" :key="column.key" :class="{ 'is-error': !isValidated(item, column.key), ui_al: column.align === 'left', ui_ar: column.align === 'right' }">
                                            <template v-if="item.errors.includes(column.key)">
                                                <!-- selectbox -->
                                                <comp-selectbox
                                                    v-if="column.inputType === 'selectbox'"
                                                    :id="`${column.key}_${item.seq}`"
                                                    class="is-wid100p"
                                                    :opts="column.options"
                                                    notSelectedLabel="재선택"
                                                    v-model="item[column.key]"
                                                    @input="
                                                        (value) => {
                                                            inputEvent(value, index, column);
                                                        }
                                                    " />

                                                <!-- textarea -->
                                                <comp-textarea
                                                    v-else-if="column.inputType === 'textarea'"
                                                    :id="`${column.key}_${item.seq}`"
                                                    rows="5"
                                                    :title="item[column.key]"
                                                    v-model="item[column.key]"
                                                    @input="
                                                        (value) => {
                                                            inputEvent(value, index, column);
                                                        }
                                                    " />

                                                <!-- inputbox -->
                                                <comp-input-box
                                                    v-else
                                                    :id="`${column.key}_${item.seq}`"
                                                    class="is-wid100p"
                                                    v-model="item[column.key]"
                                                    @input="
                                                        (value) => {
                                                            inputEvent(value, index, column);
                                                        }
                                                    " />
                                            </template>
                                            <span v-else :style="{ 'white-space': column?.isApplyMultiline ? 'pre-line' : 'normal' }">{{ getValueName(item[column.key], column) }}</span>
                                        </td>
                                    </tr>
                                </template>

                                <template slot="tmparea" v-if="getBoardListlength && getBoardListlength < 10">
                                    <tr v-for="idx in Math.abs(20 - getBoardListlength)" :key="'brd_2_' + idx">
                                        <td :colspan="getColumnsLength" class="is-no-over" />
                                    </tr>
                                </template>
                            </virtual-list>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    name: 'tmpl-modal-excel-uploader',
    data() {
        return {
            boardList: [],
        };
    },
    props: {
        popName: { type: String },
        searchParams: { type: Object },
        hgt: { type: Number, default: 500 },
        saveDatas: {
            type: Function,
            default: (datas) => {
                console.log('saveDatas >>>', datas);
            },
        },
    },
    computed: {
        getBoardListlength() {
            return this.boardList.length;
        },
        getColumns() {
            if (!this.searchParams?.columns.length) {
                return [];
            }
            return this.searchParams.columns;
        },
        getColumnsLength() {
            return this.getColumns.length;
        },
        validationColumns() {
            return this.getColumns.filter(({ validation }) => validation);
        },

        getParseBoardList() {
            if (!this.searchParams?.datas || !this.getColumnsLength) {
                return [];
            }

            return this.searchParams.datas.map((item, seq) => {
                let parsedItem = {
                    seq,
                    errors: [],
                };

                // 모든 컬럼에 대해 초기값 설정
                this.getColumns.forEach((column) => {
                    parsedItem[column.key] = ['inputbox', 'textarea'].includes(column?.inputType) ? '' : null;
                });

                // getColumns의 키를 순회하며 item의 값을 처리
                for (const column of this.getColumns) {
                    const value = item[column.key] || parsedItem[column.key];

                    // 파싱 로직 적용
                    if (column?.parse) {
                        parsedItem = { ...parsedItem, ...column.parse(value) };
                    } else {
                        parsedItem[column.key] = value;
                    }

                    // 유효성 검사
                    if (column?.validation && !column.validation(parsedItem)) {
                        parsedItem.errors.push(column.key);
                    }
                }

                return parsedItem;
            });
        },

        getErrorIndexList() {
            return this.boardList.filter((item) => this.validationColumns.some(({ key }) => !this.isValidated(item, key))).map(({ seq }) => seq);
        },
    },
    mounted() {
        this.boardList = this.getParseBoardList;
    },
    methods: {
        close() {
            this.$store.dispatch('MODAL_CLOSE', 'excel-uploader');
        },
        isValidated(item, column) {
            const validation = this.getColumns.find(({ key }) => key === column)?.validation;

            if (validation) {
                return validation(item);
            }

            return true;
        },
        getValueName(value, column) {
            if (column.inputType !== 'selectbox') {
                return value;
            }

            return column.options.find(({ code }) => code === value)?.name || '';
        },
        inputEvent(value, index, { key, inputType }) {
            const changeEvent = this.getColumns.find(({ key: column }) => column === key)?.changeEvent;
            const originalItem = { ...this.boardList[index] };

            if (changeEvent) {
                const changedValue = changeEvent(value);

                this.$set(this.boardList, index, {
                    ...originalItem,
                    ...changedValue,
                });

                if (inputType !== 'selectbox') {
                    this.$refs.virtualList.$el.querySelector(`#${key}_${originalItem.seq}`).value = changedValue[key];
                }

                return;
            }

            this.$set(this.boardList, index, {
                ...originalItem,
                column: value,
            });
        },

        /**
         * 에러로 스크롤 이동
         */
        async scrollToError() {
            const root = this.$refs.scrollRoot;
            const virtualList = this.$refs.virtualList;

            // 유틸리티 함수
            const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
            const findErrors = () => root.querySelectorAll('tr:has(.is-error)');

            // 스크롤 핸들러
            const scrollTo = async (position) => {
                root.scrollTop = position;
                await wait(50); // DOM 업데이트 대기
            };

            // 현재 화면의 에러로 스크롤
            const currentErrors = findErrors();
            if (currentErrors.length) {
                await scrollTo(currentErrors[0].offsetTop);
                return;
            }

            // 전체 리스트 순회하며 에러 찾기
            // eslint-disable-next-line no-constant-condition
            while (true) {
                // 처음으로 돌아가기 체크
                const shouldRestart = virtualList.range.padBehind === 0 && this.getErrorIndexList.length > 0;

                if (shouldRestart) {
                    await scrollTo(0);
                    await wait(100);
                    this.scrollToError();
                    break;
                }

                // 다음 영역 체크
                const lastElement = root.querySelector(`#seq_${virtualList.range.end}`);
                if (!lastElement) break;

                const isLastItem = lastElement.id === `seq_${this.getBoardListlength}`;
                if (isLastItem) {
                    console.log('모든 항목을 검색했지만 에러를 찾을 수 없습니다.');
                    break;
                }

                // 다음 영역으로 이동 후 에러 체크
                await scrollTo(lastElement.offsetTop);
                const newErrors = findErrors();

                if (newErrors.length) {
                    await scrollTo(newErrors[0].offsetTop);
                    break;
                }
            }
        },
    },
};
</script>
