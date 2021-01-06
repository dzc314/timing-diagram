<template>
  <div class="timing-diagram" @click="activeEventIndex = null">
    <div class="timing-items">
      <div class="timing-item" v-for="(item, index) in columns" :key="index">
        <strong>{{ item }}</strong>
      </div>
    </div>
    <div class="timing-events">
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
    }
  },
  computed: {
    size() {
      return this.columns.length - 1
    },
  },
  methods: {
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
    overflow-y: auto;
    box-sizing: border-box;
    > .timing-event {
      margin: 10px 0;
      padding: 0 50px;
      > .timing-event-line {
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
}
</style>