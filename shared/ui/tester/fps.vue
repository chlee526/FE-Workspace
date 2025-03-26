<template>
    <div id="tester-fps" :class="isHide ? 'is-hide' : ''" draggable="true" @dragstart="startDrag" @drag="onDrag" @dragover.prevent :style="{ left: position.x + 'px', top: position.y + 'px' }">
        <button class="close-btn" @click="evtClose"><span class="icon-close is-small"></span></button>
        <div class="fps memory" title="시작 메모리(변화 메모리)">
            <strong>SM</strong> {{ initMemory }} Mb<span class="calMemory">({{ getClaMemory }} Mb)</span>
        </div>
        <div class="fps memory" title="현재 메모리"><strong>CM</strong> {{ memory }} Mb</div>
        <div class="fps rtMemory" title="FPS"><strong>fps</strong> {{ fps }}</div>
        <div class="fps" title="최대 FPS"><strong>max</strong> {{ getMaxFps }}</div>
        <div class="fps" title="최소 FPS"><strong>min</strong> {{ getMinFps }}</div>
        <div ref="chart" class="chart">
            <div v-for="(item, idx) in this.rafTimeDatas" :key="idx" :style="`height:${(20 / item) * 30}px`"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'comp-tester-fps',

    data() {
        return {
            rafCnt: 0,
            initMemory: 0,
            memory: 0,
            fps: 0,
            lastTime: null,
            rafTimeDatas: [],
            position: {
                x: 10,
                y: window.innerHeight - 200,
            },
            isHide: false,
        };
    },

    computed: {
        getMaxFps() {
            return Math.max.apply(Math, this.rafTimeDatas);
        },
        getMinFps() {
            return Math.min.apply(Math, this.rafTimeDatas);
        },
        getClaMemory() {
            const result = (this.memory - this.initMemory).toFixed(2);
            return (result > 0 ? '▲ ' : '▼ ') + Math.abs(result);
        },
    },

    mounted() {
        this.initMemory = (parseInt(performance.memory.usedJSHeapSize) / (1024 * 1024)).toFixed(2);
        this.lastTime = performance.now();
        this.updateFPS();
    },

    watch: {
        rafTimeDatas(val) {
            if (val.length > this.$refs.chart.getBoundingClientRect().width) this.rafTimeDatas.shift();
        },
    },

    methods: {
        updateFPS() {
            const currentTime = performance.now();
            const elapsed = currentTime - this.lastTime;
            this.fps = parseInt(1000 / elapsed);
            this.lastTime = currentTime;
            this.rafCnt++;
            if (this.rafCnt % 5 == 0) this.rafTimeDatas.push(this.fps);
            if (this.rafCnt % 100 == 0) this.memory = (parseInt(performance.memory.usedJSHeapSize) / (1024 * 1024)).toFixed(2);
            requestAnimationFrame(this.updateFPS);
        },

        startDrag(e) {
            // 드래그 시작 위치 저장
            this.dragStartX = e.clientX - this.position.x;
            this.dragStartY = e.clientY - this.position.y;
        },

        onDrag(e) {
            if (!e.clientX && !e.clientY) return; // drag 이벤트 버그 처리

            const maxX = window.innerWidth - this.$el.offsetWidth;
            const maxY = window.innerHeight - this.$el.offsetHeight;

            let newX = e.clientX - this.dragStartX;
            let newY = e.clientY - this.dragStartY;

            // 화면 범위 제한
            newX = Math.min(Math.max(0, newX), maxX);
            newY = Math.min(Math.max(0, newY), maxY);

            this.position = { x: newX, y: newY };
        },

        evtClose() {
            this.isHide = true;
        },
    },
};
</script>

<style lang="scss" scoped>
#tester-fps {
    position: fixed;
    bottom: 10px;
    left: 10px;
    min-width: 220px;
    height: 190px;
    padding: 24px 24px 5px;
    background: #000;
    box-sizing: border-box;
    color: #fff;
    text-align: left;
    z-index: 9999;
    cursor: move;

    &.is-hide {
        visibility: hidden;
    }

    .close-btn {
        position: absolute;
        top: 8px;
        right: 8px;
    }

    .calMemory {
        padding-left: 6px;
        color: #999;
        font-size: 11px;
    }

    > .fps {
        display: flex;
        padding-bottom: 8px;
        line-height: 1;
        font-size: 11px;

        &.memory {
            margin-bottom: 10px;
            border-bottom: 1px dotted #414141;
        }
        &.rtMemory {
            font-size: 14px;
        }

        strong {
            flex: 0 0 30px;
            color: #999;
            font-weight: normal;
        }
    }

    .chart {
        display: flex;
        align-items: flex-end;
        width: 100%;
        height: 30px;
        margin: 5px 0 0;
        opacity: 0.6;

        > * {
            width: 1px;
            max-height: 30px;
            background: #fff;
        }
    }
}
</style>
