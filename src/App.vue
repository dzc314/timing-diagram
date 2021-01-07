<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <div class="timing-view">
      <timing-diagram
        :events="events"
        :columns="columns"
        @eventClick="eventHandler"
      ></timing-diagram>
    </div>
  </div>
</template>

<script>
import TimingDiagram from '@/components/timing-diagram.vue'

export default {
  name: 'App',
  components: {
    TimingDiagram,
  },
  data() {
    return {
      columns: ['A', 'B', 'C', 'D'],
      events: [
        {
          from: 'A',
          to: 'B',
          text: 'Hello B',
        },
        {
          from: 'B',
          to: 'D',
          text: 'Hello D',
        },
        {
          from: 'B',
          to: 'A',
          text: 'Hello A',
        },
        {
          from: 'B',
          to: 'C',
          text: 'Hi C',
        },
        {
          from: 'C',
          to: 'B',
          text: 'Hi B',
        },
        {
          from: 'C',
          to: 'A',
          text: 'Hi A',
        },
        {
          from: 'A',
          to: 'C',
          text: 'Hi C',
        },
      ],
    }
  },
  methods: {
    eventHandler(event) {
      console.log(event)
    },
  },
}
</script>

<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  .timing-view {
    height: 500px;
  }
}
* {
  box-sizing: border-box;
}
</style>
