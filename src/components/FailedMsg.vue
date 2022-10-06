<template>
  <div
    :class="{
      'fixed m-auto left-0 right-0 top-0 bottom-0 z-10 w-fit h-fit p-5 bg-zinc-900/[.7]  text-white rounded transition-all duration-300 ease-in': true,
      'opacity-0 hidden': !isFailedMsg,
      'opacity-100': isFailedMsg,
    }"
  >
    儲存失敗
  </div>
</template>

<script setup>
// import { defineProps } from 'vue';

defineProps({
  isFailedMsg: Boolean,
});
</script>
