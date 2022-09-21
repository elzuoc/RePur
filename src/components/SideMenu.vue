<template>
  <div
    class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white cursor-pointer"
    @click="menuToggle()"
  >
    <svg
      class="h-6 w-6"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  </div>

  <div
    v-show="isMaskOn"
    class="fixed top-0 left-0 z-20 w-screen h-screen backdrop-blur-sm bg-black/[.2]"
    @click="closeSideMenu()"
  ></div>

  <div
    v-show="isMenuToggleOn"
    class="fixed top-0 right-0 z-20 bg-white w-40 h-full text-left p-5 text-white"
  >
    <div class="h5 font-semibold text-zinc-800">Menu</div>

    <div
      class="h5 leading-tight ml-2 mt-3 whitespace-normal text-zinc-400 hover:text-zinc-600 cursor-pointer"
    >
      <router-link to="/" @click="closeSideMenu()">慣購清單</router-link>
    </div>
    <!-- <div
      class="h5 leading-tight ml-2 mt-3 whitespace-normal text-zinc-400 hover:text-zinc-600 cursor-pointer"
    >
      <router-link to="/" @click="closeSideMenu()">新增商品</router-link>
    </div> -->
    <div
      class="h5 leading-tight ml-2 mt-3 whitespace-normal text-zinc-400 hover:text-zinc-600 cursor-pointer"
    >
      <router-link to="/SalesChannel" @click="closeSideMenu()">購物管道設定</router-link>
    </div>

    <div
      class="h5 leading-tight ml-2 mt-3 whitespace-normal text-zinc-400 hover:text-zinc-600 cursor-pointer"
    >
      <router-link to="/Export" @click="closeSideMenu()">匯出資料</router-link>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'SideMenu',
  setup() {
    const isMenuToggleOn = ref(false);
    const isMaskOn = ref(false);

    const menuToggle = () => {
      if (isMenuToggleOn.value === false) {
        isMaskOn.value = true;
        isMenuToggleOn.value = true;
      } else {
        isMaskOn.value = false;
        isMenuToggleOn.value = false;
      }
    };

    const closeSideMenu = () => {
      isMaskOn.value = false;
      isMenuToggleOn.value = false;
    };

    return {
      // params
      isMenuToggleOn,
      isMaskOn,

      // methods
      menuToggle,
      closeSideMenu,
    };
  },
};
</script>
