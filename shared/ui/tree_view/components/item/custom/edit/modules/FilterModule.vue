<template>
    <comp-filter-grp :id="id" :ref="id" :getNoIconWrapPos="setWrapPos" :disableConfirmBtn="inputDisable" class="is-small btnAdd" @confirm="evt_confirm(source)" @close="evt_close" @cancel="evt_close" @open="evt_open(source)" pos="R">
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
            filterValue: this.value,
            input: {
                name: '',
            },
        };
    },
    props: {
        setWrapPos: {},
        id: {},
        noIconShow: {},
        value: {},
    },
    computed: {
        source: {
            get() {
                let obj = this.value;

                return obj;
            },
            set(val) {},
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
            this.$emit('evt_confirm', { data, input: this.input });
            this.hndl_close();
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
