<template>
  <div
    class="badge-container"
    :style="{ background: background, color: event.color, width: width }"
  >
    <span>{{ event.time }}</span>
    <span
      class="badge-text"
      :style="{position}"
      :class="{ 'badge-dotted-text': !fullText }"
      @mouseover="fullText = true"
      @mouseleave="fullText = false"
      >{{ event.text }}</span
    >
  </div>
</template>
<script>
import tinycolor from "tinycolor2";
export default {
  name: "Badge",
  props: {
    event: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      fullText: false,
    };
  },
  computed: {
    background() {
      var color = tinycolor(this.event.color);
      color.setAlpha(0.2);
      return color.toRgbString();
    },
    width() {
      return this.fullText ? "max-content" : "100%";
    },
    position(){
      if(this.fullText){
        return {
          position: 'absolute'
        }
      } else {
        return {
          position: 'unset'
        }
      }
    }
  },
};
</script>
<style scoped>
.badge-container {
  z-index: 100;
  height: 20px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  font-size: 0.9em;
  margin-bottom: 5px;
  position: relative;
}
.badge-container span:first-child {
  margin-left: 10px;
}
.badge-container span:last-child {
  margin-left: 10px;
}
.badge-text {
  margin-right: 10px;
}
.badge-dotted-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>