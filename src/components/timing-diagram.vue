<template>
  <div class="timing-diagram" @click="activeEventIndex = null">
    <div class="timing-items">
      <div class="timing-item" v-for="(item, index) in columns" :key="index">
        <strong>{{ item }}</strong>
      </div>
    </div>
    <div class="timing-events" ref="eventsView">
      <div ref="eventsList" :style="{ 'margin-right': eventsListMarginRight }">
        <div
          class="timing-event"
          v-for="(item, index) in events"
          :key="index"
          :class="{ active: index === activeEventIndex }"
        >
          <p
            @click.stop="eventHandler(item, index)"
            class="timing-event-line"
            :class="calcDirection(item)"
            :style="calcStyle(item)"
          >
            {{ item.text }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    columns: {
      type: Array,
      default: () => [],
    },
    events: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      activeEventIndex: null,
      eventsListMarginRight: 0,
    }
  },
  computed: {
    size() {
      return this.columns.length - 1
    },
  },
  watch: {
    events: {
      handler: function () {
        this.$nextTick(this.calcEventsListStyle)
      },
      deep: true,
    },
  },
  mounted() {
    // this.calcEventsListStyle()
    this.$nextTick(this.calcEventsListStyle)
  },
  methods: {
    calcEventsListStyle() {
      const eventsViewHeight = this.$refs.eventsView.offsetHeight
      const eventsListHeight = this.$refs.eventsList.offsetHeight
      console.log(eventsViewHeight, eventsListHeight)
      this.eventsListMarginRight =
        eventsViewHeight < eventsListHeight ? '-10px' : 0
    },
    eventHandler(event, index) {
      // console.log(event)
      this.activeEventIndex = index
      this.$emit('eventClick', event)
    },
    calcStyle(row) {
      const { from, to } = row
      const fromIndex = this.columns.indexOf(from)
      const toIndex = this.columns.indexOf(to)
      const index = Math.min(fromIndex, toIndex)
      const len = Math.abs(fromIndex - toIndex)
      const width = this.formatPercentage(len / this.size)
      const marginLeft = this.formatPercentage(index / this.size)
      return {
        width,
        marginLeft,
      }
    },
    formatPercentage(value) {
      return Math.round(value * 10000) / 100 + '%'
    },
    calcDirection(row) {
      const { from, to } = row
      const fromIndex = this.columns.indexOf(from)
      const toIndex = this.columns.indexOf(to)
      return fromIndex < toIndex ? 'arrow-right' : 'arrow-left'
    },
  },
}
</script>

<style lang="scss" scoped>
$event-line-color: #666;
.timing-diagram {
  position: relative;
  height: 100%;
  min-height: 300px;
  padding: 50px;
  .timing-items {
    display: flex;
    height: 100%;
    justify-content: space-between;
    .timing-item {
      position: relative;
      width: 0;
      border-right: 1px solid #ddd;
      > strong {
        position: absolute;
        bottom: 100%;
        left: 50%;
        width: 100px;
        margin-left: -50px;
        text-align: center;
        word-wrap: break-word;
        word-break: normal;
      }
    }
  }
  .timing-events {
    position: absolute;
    top: 50px;
    left: 0;
    width: 100%;
    height: calc(100% - 100px);
    overflow-x: hidden;
    overflow-y: auto;
    box-sizing: border-box;
    .timing-event {
      // margin: 10px 0;
      padding: 10px 50px;
      > .timing-event-line {
        margin: 0;
        position: relative;
        border-bottom: 1px solid $event-line-color;
        cursor: pointer;
        &::after {
          content: '';
          position: absolute;
          bottom: -4px;
          display: block;
          width: 0;
          height: 0;
          border-top: 4px solid transparent;
          border-bottom: 4px solid transparent;
        }
        &.arrow-right::after {
          right: 0;
          border-left: 6px solid $event-line-color;
        }
        &.arrow-left::after {
          left: 0;
          border-right: 6px solid $event-line-color;
        }
      }
    }
  }
  // 滚动条
  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }
  ::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 2px;
  }
  ::-webkit-scrollbar-thumb {
    background: rgba(197, 206, 224, 0.5);
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 120, 15, 0.8);
  }
  ::-webkit-scrollbar-corner {
    background: transparent;
  }
}
</style>