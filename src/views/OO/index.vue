<template>
  <div class="w-[calc(100vw-80px)] ml-[80px] mt-[70px] text-left text-3xl">
    Buttons
  </div>

  <div
    class="container mx-auto px-2.5 md:ml-[80px] md:max-w-[calc(100vw-160px)] mt-5 text-left"
  >
    <div class="text-xl text-zinc-400">
      Use Tailwind’s custom button styles for actions in forms, dialogs, and
      more with support for multiple sizes, states, and more.
    </div>

    <div class="mt-10 text-xl font-semibold">Examples</div>
    <div class="mt-3 text-xl text-zinc-400">Use button/div tag.</div>
    <div class="mt-3 border border-zinc-200 p-5"></div>
    <div class="bg-zinc-200 p-5 overflow-x-auto">
      <pre><code class="select-all selection:bg-stone-600 selection:text-white">
      </code></pre>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'UtilCompo',
  props: {
    msg: {
      type: String,
      default: '',
    },
  },
  setup() {
    const count = ref(0);
    return {
      count,
    };
  },
};
</script>

<style scoped>
a {
  color: #42b983;
}
</style>
