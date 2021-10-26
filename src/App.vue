<template>
  <div id="app">
    <Explorer :data="data" />
  </div>
</template>

<script>
import Explorer from './components/Explorer.vue';
import Node from './components/Node';

const getData = () => import(`/public/static/node_modules.json`).then(m => m.default || m);

export default {
  name: 'App',
  components: { Explorer },
  data: () => ({
    data: {},
  }),
  async created() {
    await this.fetchData();
  },
  methods: {
    async fetchData() {
      const data = await getData();

      this.data = this.prepareData(data);
    },
    prepareData({ type, name, target, contents }, parent = null) {
      const node = new Node(type, name, target, parent);

      let children = [];
      if (contents?.length) {
        children = contents.map(c => this.prepareData(c, node));
        children.sort((a, b) => String(a.type).localeCompare(b.type) || String(a.name).localeCompare(b.name));
      }
      node.children = children;

      return node;
    },
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
