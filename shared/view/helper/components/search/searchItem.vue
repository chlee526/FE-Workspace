<template>
    <div class="item">
        <div class="locate">
            <strong v-html="highlightKeyword(getLocate)"></strong>
            <span class="cnt" v-if="getDatas.length > 0">({{ getDatas.length }}건)</span>
        </div>
        <div class="wrap">
            <router-link :to="`/view/helper/${item.seq}`" v-for="item in getDatas" :key="item.id" class="subItem">
                <strong class="title" v-html="getTitleTag(item.subject)"></strong>
                <div class="content" v-html="highlightKeyword(item.content.getHtmlTextToStr())"></div>
            </router-link>
        </div>
    </div>
</template>

<script>
import { uuid } from 'vue-uuid';

export default {
    name: 'comp-helper-search-item',
    data() {
        return {};
    },
    props: {
        helpData: { type: Object },
        keyword: { type: String, default: '' },
    },
    computed: {
        getLocate() {
            return this.helpData.subject;
        },
        getDatas() {
            const flattenData = (item, parentSubjects = []) => {
                let result = [];

                if (item.children && item.children.length) {
                    item.children.forEach((child) => {
                        if (child.children && child.children.length) {
                            // 자식이 있는 경우 재귀적으로 처리
                            result = result.concat(flattenData(child, [...parentSubjects, child.subject]));
                        } else {
                            // 자식이 없는 경우만 결과에 추가
                            result.push({
                                id: uuid.v4(),
                                seq: child.seq,
                                subject: parentSubjects.length > 0 ? parentSubjects.join('>') + '>' + child.subject : child.subject,
                                content: child.content,
                                depth: parentSubjects.length + 1,
                            });
                        }
                    });
                } else {
                    // 자식이 없는 최하위 항목인 경우
                    result.push({
                        id: uuid.v4(),
                        seq: item.seq,
                        subject: parentSubjects.length > 0 ? parentSubjects.join('>') + '>' + item.subject : item.subject,
                        content: item.content,
                        depth: parentSubjects.length,
                    });
                }

                return result;
            };
            const result = flattenData(this.helpData);

            return result;
        },
    },
    mounted() {
        console.log(this.helpData);
    },
    watch: {
        // $route(val) {
        //     console.log('route 감지', val);
        // },
    },
    methods: {
        getTitleTag(text) {
            const textSplit = text.split('>');
            const result = textSplit.map((item) => `<span>${this.highlightKeyword(item)}</span>`).join('');
            return result;
        },
        highlightKeyword(text) {
            if (!this.keyword || !text) return text;

            if (text.length > 250) text = `${text.slice(0, 200)}...`;

            const regex = new RegExp(this.keyword, 'gi');
            return text.replace(regex, (match) => `<span class="is-highlight">${match}</span>`);
        },
    },
};
</script>

<style lang="scss">
@import './searchItem.scss';
</style>
