<template>
    <div>
        <comp-input-box type="search" v-model="inputText" placeholder="내용을 검색하세요" focusResetVisible @search="inputSearchClick(inputText)"></comp-input-box>
        <component :is="getModuleComponent" ref="addGrp" id="addGrp" @evt_confirm="evt_confirm" @evt_cancel="evt_cancel" />
    </div>
</template>
<script>
let id = 1000;
import FilterModule from '../../modules/FilterModule.vue';
export default {
    name: 'tree-view-custom-item',
    data() {
        return {
            inputText: '',
            input: {
                name: '',
                sg_seqs: '',
            },
        };
    },

    props: {
        nodeInstance: {},
        editType: {
            type: Boolean,
            default: true,
        },
    },
    computed: {
        getModuleComponent() {
            return FilterModule;
        },

        source: {
            get() {
                return this.value;
            },
            set(val) {},
        },
    },

    watch: {
        source: {
            deep: true,
            handler(val) {
                this.inputKeyword = val.name;
            },
        },
    },

    methods: {
        evt_cancel() {},
        evt_confirm({ data, input }) {
            let firstChild = {
                level: 1,
                code: 'first',
                name: input.name,
            };

            this.$emit('evt_confirm', firstChild);
            this.$refs.addGrp.hndl_close();
        },
        inputSearchClick(searchName) {
            this.$emit('search', searchName);
        },
        addNodeFilterOpen() {},
        addNodeFilterCancle() {},
    },
};
</script>
