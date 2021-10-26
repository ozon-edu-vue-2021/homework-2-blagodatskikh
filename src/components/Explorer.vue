<template>
  <div class="explorer">
    <div class="file-path" :title="filePath">{{ filePath }}</div>
    <NodeItem :node="data" :path="data.name" />
  </div>
</template>

<script>
import NodeItem from "./NodeItem";

export default {
  props: {
    data: Object,
  },
  components: {
    NodeItem,
  },
  data: () => ({
    selectedNode: null,
  }),
  computed: {
    filePath() {
      const pathReversed = [];
      let currentNode = this.selectedNode;
      while (currentNode) {
        pathReversed.push(currentNode.name);
        currentNode = currentNode.parent;
      }
      const path = pathReversed.reverse().join('/');

      return path + (this.selectedNode?.target ? ` -> ${this.selectedNode?.target}` : '');
    }
  },
  mounted() {
    this.$root.$on('node-selected', this.selectionChanged);
  },
  methods: {
    selectionChanged(node) {
      if (this.selectedNode) {
        this.selectedNode.selected = false;
      }

      node.selected = true;
      this.selectedNode = node;
    },
  }
};
</script>

<style>
.explorer {
  display: flex;
  overflow: auto;
  margin: 0 auto;
  flex-flow: column nowrap;
  gap: 10px;
  width: 60%;
  height: 80vh;
}
.explorer > .file-path {
  position: sticky;
  top: 0;
  left: 0;
  background-color: gainsboro;
  padding: 4px;
  min-height: 1em;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
