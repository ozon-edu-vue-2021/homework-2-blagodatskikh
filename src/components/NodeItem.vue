<template>
  <div :class="{ [node.type]: true, selected: node.selected }" @click.stop.prevent="clickHandler">
    <div class="name">
      <FolderIcon v-if="node.type === 'directory'" :opened="node.expanded" />
      <FileIcon v-else-if="node.type === 'file' || node.type === 'link'" />
      <span>{{ node.name }}</span>
    </div>

    <div class="content">
      <template
        v-if="
          node.type === 'directory' && node.children.length && node.expanded
        "
      >
        <NodeItem
          v-for="child in node.children"
          :node="child"
          :path="`${path}/${child.name}`"
          :key="`${path}/${child.name}`"
        />
      </template>
    </div>
  </div>
</template>

<script>
import FileIcon from "./FileIcon.vue";
import FolderIcon from "./FolderIcon.vue";

export default {
  name: "NodeItem",
  props: {
    node: Object,
    path: String,
  },
  components: { FileIcon, FolderIcon },
  methods: {
    clickHandler() {
      if (this.node.type === 'directory') {
        this.$set(this.node, "expanded", !this.node.expanded);
      }
      
      this.$root.$emit('node-selected', this.node);
    },
  },
};
</script>

<style>
.file,
.link,
.directory {
  user-select: none;
  white-space: nowrap;
}
.link {
  color: blue;
}
.name {
  display: flex;
  flex-flow: row nowrap;
  gap: 5px;
  justify-content: flex-start;
}
.selected > .name {
  background-color: lightblue;
}
.content {
  margin-left: 10px;
}
</style>
