<template>
    <div class="test-1">
        <div class="test-2">LNB</div>
        <div class="test-3">
            <div></div>
            <div class="test-3-2">CONTENT</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'commonpages-test',
};
</script>

<style lang="scss" scoped>
.test-1 {
    display: flex;
    flex-direction: row;
    flex: 1 1;

    .test-2 {
        position: sticky;
        top: 0;
        width: 200px;
        background: #cccccc;
    }

    .test-3 {
        .test-3-2 {
            height: 2000px;
        }
    }
}
</style>
