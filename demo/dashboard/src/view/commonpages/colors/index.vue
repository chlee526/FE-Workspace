<template>
    <div id="content">
        <h2 id="page_title" class="ui_invisible">asdasd</h2>
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
                                <!-- 고객사 -->
                                <div class="colors">
                                    <strong>고객사</strong>
                                    <template v-for="($item, $idx) in colors.client">
                                        <span v-bind:key="$idx" class="color_item" :style="'--color: ' + $item.color"
                                            >{{ $item.name }}<span class="color">{{ $item.color }}</span></span
                                        >
                                    </template>
                                </div>
                                <hr />
                                <!-- 감성 -->
                                <div class="colors">
                                    <strong>감성</strong>
                                    <template v-for="($item, $idx) in $store.getters.getSentis">
                                        <span v-bind:key="$idx" class="color_item" :style="'--color: ' + $item.color"
                                            >{{ $item.name }}<span class="color">{{ $item.color }}</span></span
                                        >
                                    </template>
                                </div>
                                <hr />
                                <!-- 채널 -->
                                <div class="colors">
                                    <strong>채널</strong>

                                    <template v-for="($item, $idx) in this.$store.getters.getChns">
                                        <span v-bind:key="$idx" class="color_item" :style="'--color: ' + $item.color"
                                            >{{ $item.name }}<span class="color">{{ $item.color }}</span></span
                                        >
                                    </template>
                                </div>
                                <hr />
                                <!-- 분석대상 -->
                                <div class="colors">
                                    <strong>분석대상</strong>
                                    <template v-for="($item, $idx) in colors.analTargets">
                                        <span v-bind:key="$idx" class="color_item" :style="'--color: ' + $item.color"
                                            >{{ $item.name }}<span class="color">{{ $item.color }}</span></span
                                        >
                                    </template>
                                </div>
                                <hr />
                                <!-- 순위 -->
                                <div class="colors">
                                    <strong>순위<span>(기본)</span></strong>
                                    <template v-for="($item, $idx) in $store.getters.getRanks.default">
                                        <span v-bind:key="$idx" class="color_item" :style="'--color: ' + $item.color"
                                            >{{ $item.rank ? '~' + $item.rank + '위' : '~' }}<span class="color">{{ $item.color }}</span></span
                                        >
                                    </template>
                                </div>
                                <hr />
                                <!-- 연관키워드 속성 -->
                                <div class="colors">
                                    <strong>연관어 속성<span>(기본)</span></strong>
                                    <template v-for="($item, $idx) in $store.getters.getRkAttrs.default">
                                        <template v-for="($item2, $idx2) in $item">
                                            <span v-bind:key="$idx + '_' + $idx2" class="color_item" :style="'--color: ' + $item2.color"
                                                >{{ $item2.name }}<span class="color">{{ $item2.color }}</span></span
                                            >
                                        </template>
                                    </template>
                                </div>
                                <hr />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'commonpages-colors',
    data() {
        return {
            colors: {
                client: [
                    { color: '#7487e5', name: 'primary' },
                    { color: '#52beba', name: 'secondary' },
                ],
                analTargets: [
                    { color: '#EC5151', name: '분석대상 1' },
                    { color: '#F58B39', name: '분석대상 2' },
                    { color: '#F6B61F', name: '분석대상 3' },
                    { color: '#ABC834', name: '분석대상 4' },
                    { color: '#69B229', name: '분석대상 5' },
                    { color: '#28AA53', name: '분석대상 6' },
                    { color: '#1E9BC9', name: '분석대상 7' },
                    { color: '#3972D5', name: '분석대상 8' },
                    { color: '#9C69DF', name: '분석대상 9' },
                    { color: '#AAAAAA', name: '분석대상 10' },
                ],
            },
        };
    },
};
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
