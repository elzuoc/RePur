<template>
  <div class="w-screen h-[calc(100vh-70px)] bg-zinc-100">
    <div class="fixed absolute m-auto inset-0 w-fit h-fit">
      <img src="@/assets/images/icons/404.svg" />
    </div>
  </div>
</template>

<script setup>
// import { defineProps } from 'vue';

defineProps({
  isSuccessMsg: Boolean,
});
</script>
