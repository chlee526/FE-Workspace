<template>
    <comp-filter-grp :ref="id" :getNoIconWrapPos="setWrapPos" :disableConfirmBtn="inputDisable" class="is-small btnAdd" @confirm="evt_confirm(source)" @close="evt_close" @cancel="evt_close" @open="evt_open(source)" pos="R">
        <template v-if="!noIconShow" v-slot:custom>&#xe017;</template>
        <template v-slot:items>
            <dl>
                <dt><strong>그룹명</strong></dt>
                <dd><comp-input-box ref="inputBox" class="is-small" v-model="input.name" @enter="evt_confirm(source)" placeholder="키워드 입력"></comp-input-box></dd>
            </dl>
        </template>
    </comp-filter-grp>
</template>

<script>
export default {
    name: 'treeView-filterModule',
    data() {
        return {
            input: {
                name: '',
            },
            modify: {
                name: '',
                sg_seqs: '',
                p_seqs: '',
            },
        };
    },
    props: {
        setWrapPos: {},
        id: {},
        noIconShow: {},
        disableConfirmBtn: {},
        value: {},

        seqsList: {},
    },
    computed: {
        source: {
            get() {
                return this.value;
            },
            set(val) {},
        },
        getSeqsList() {
            if (this.$store.getters.getChns.length > 0) {
                let list = JSON.parse(JSON.stringify(this.$store.getters.getChns));

                if (this.id == 'addGrp') {
                    list.map((item) => {
                        if (!this.source.sg_seqs.includes(item.code)) {
                            item.disabled = true;
                        }
                        return item;
                    });
                } else {
                    if (this.source.p_seqs != undefined) {
                        list.map((item) => {
                            if (!this.source.p_seqs.includes(item.code)) {
                                item.disabled = true;
                            }
                        });
                    }
                }
                return list;
            } else {
                let list = JSON.parse(
                    JSON.stringify([
                        { code: 'c_93', name: 'c_93' },
                        { code: 'c_113', name: 'c_113' },
                        { code: 'c_94', name: 'c_94' },
                        { code: 'c_95', name: 'c_95' },
                        { code: 'c_97', name: 'c_97' },
                        { code: 'c_99', name: 'c_99' },
                        { code: 'c_100', name: 'c_100' },
                    ]),
                );

                if (this.id == 'addGrp') {
                    list.map((item) => {
                        if (!this.source.sg_seqs.includes(item.code)) {
                            item.disabled = true;
                        }
                        return item;
                    });
                } else {
                    if (this.source.p_seqs != undefined) {
                        list.map((item) => {
                            if (!this.source.p_seqs.includes(item.code)) {
                                item.disabled = true;
                            }
                        });
                    }
                }

                return list;
            }
        },

        inputDisable() {
            if (this.input.name.length < 1) {
                return true;
            } else {
                return false;
            }
        },
    },
    methods: {
        evt_confirm(data) {
            console.log('이거맞음?', { data, input: this.input });
            this.$emit('evt_confirm', { data, input: this.input });
        },
        evt_close() {
            this.$emit('onTool', false);
            this.$emit('evt_close');
        },

        hndl_open() {
            let target = this.id;

            this.$refs[target]?.hndl_open();
        },

        hndl_close() {
            let target = this.id;

            this.$refs[target]?.hndl_close();
            // this.input.name = '';
        },

        evt_open(data) {
            setTimeout(() => {
                this.$emit('onTool', true);
            }, 100);

            this.$nextTick(() => {
                this.$refs.inputBox.$refs.input.focus();
            });

            if (this.id.includes('addGrp')) {
                this.input.name = '';
            } else {
                this.input.name = data.name;
            }
        },
    },
};
</script>

<style></style>
