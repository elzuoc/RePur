<template>
  <div class="container mx-auto px-4">
    <div
      class="w-full border border-solid border-slate-300 text-slate-300 rounded bg-white"
    >
      <input
        type="text"
        class="w-[calc(100%-24px)] inline-block focus:outline-none focus:border focus-visible:border-solid focus:border-slate-400 rounded p-1"
        placeholder="Search..."
      />
      <a href="#"
        ><img src="@/assets/icons/search.svg" class="w-6 inline-block"
      /></a>
    </div>

    <div
      class="w-full border-2 border-dashed border-slate-300 text-slate-300 rounded bg-white p-2 mt-2"
    >
      <div
        class="relative w-full h-20 border border-solid border-slate-300 text-slate-300 rounded bg-zinc-400"
      >
        <div class="absolute m-auto inset-0 w-fit h-fit">
          <span class="text-white font-bold tracking-wider">+ 慣購商品</span>
        </div>
      </div>
    </div>

    <div class="relative w-full mt-4 text-left">
      <div
        ref="sortSelector"
        class="w-fit h-10 p-2 border border-zinc-300 text-zinc-500 cursor-pointer"
        @click="openSortOption()"
      >
        <img src="@/assets/icons/sort-desc.svg" class="w-5 inline-block" />
        日期 新→舊
      </div>
      <div
        ref="sortOption"
        class="absolute w-fit h-fit z-20 bg-white/[.95] shadow-md shadow-zinc-300"
        :class="{ block: isSortOpen, hidden: !isSortOpen }"
      >
        <div
          class="p-2 hover:bg-zinc-50 cursor-pointer"
          @click="setSortOption($event)"
        >
          <img src="@/assets/icons/sort-desc.svg" class="w-5 inline-block" />
          日期 新→舊
        </div>
        <div
          class="p-2 hover:bg-zinc-50 cursor-pointer"
          @click="setSortOption($event)"
        >
          <img src="@/assets/icons/sort-asc.svg" class="w-5 inline-block" />
          日期 舊→新
        </div>
        <div
          class="p-2 hover:bg-zinc-50 cursor-pointer"
          @click="setSortOption($event)"
        >
          <img src="@/assets/icons/sort-desc.svg" class="w-5 inline-block" />
          頻率 多→少
        </div>
        <div
          class="p-2 hover:bg-zinc-50 cursor-pointer"
          @click="setSortOption($event)"
        >
          <img src="@/assets/icons/sort-asc.svg" class="w-5 inline-block" />
          頻率 少→多
        </div>
        <div
          class="p-2 hover:bg-zinc-50 cursor-pointer"
          @click="setSortOption($event)"
        >
          <img src="@/assets/icons/view-list.svg" class="w-5 inline-block" />
          年度
        </div>
        <div
          class="p-2 hover:bg-zinc-50 cursor-pointer"
          @click="setSortOption($event)"
        >
          <img src="@/assets/icons/star.svg" class="w-5 inline-block" />
          品牌
        </div>
      </div>
    </div>

    <div class="w-full mt-4 grid grid-cols-2 gap-2">
      <!-- one product -->
      <router-link
        :to="{ path: '/ProdDetail', name: 'ProdDetail', params: { id: '3' } }"
      >
        <div class="flex grid grid-cols-3 gap-1 border">
          <div class="flex">
            <div class="aspect-square bg-zinc-200 w-full"></div>
          </div>
          <div class="flex col-span-2">
            <div class="flex grid gap-1 text-left">
              <div class="flex h-5 overflow-hidden">
                <span class="font-bold truncate">
                  品名品名品名品名品名品名品名品名品名品名品名品名品名品名品名
                </span>
              </div>
              <div class="flex"><span class="text-xs">品牌簡稱/容量</span></div>
              <div class="flex">
                <span class="text-[0.75rem]">NT$</span>30
                <div
                  class="w-fit h-fit inline-block text-[0.75rem] px-1 bg-amber-500 text-white rounded ml-2"
                >
                  特惠活動
                </div>
              </div>
            </div>
          </div>
        </div>
      </router-link>

      <div class="flex grid grid-cols-3 gap-1 border">
        <div class="flex">
          <div class="aspect-square bg-zinc-200 w-full"></div>
        </div>
        <div class="flex col-span-2">
          <div class="flex grid gap-1 text-left">
            <div class="flex h-5 overflow-hidden">
              <span class="font-bold truncate"
                >品名品名品名品名品名品名品名品名品名品名品名品名品名品名品名</span
              >
            </div>
            <div class="flex"><span class="text-xs">品牌簡稱/容量</span></div>
            <div class="flex"><span class="text-[0.75rem]">NT$</span>30</div>
          </div>
        </div>
      </div>

      <div class="flex grid grid-cols-3 gap-1 border">
        <div class="flex">
          <div class="aspect-square bg-zinc-200 w-full"></div>
        </div>
        <div class="flex col-span-2">
          <div class="flex grid gap-1 text-left">
            <div class="flex h-5 overflow-hidden">
              <span class="font-bold truncate"
                >品名品名品名品名品名品名品名品名品名品名品名品名品名品名品名</span
              >
            </div>
            <div class="flex"><span class="text-xs">品牌簡稱/容量</span></div>
            <div class="flex"><span class="text-[0.75rem]">NT$</span>30</div>
          </div>
        </div>
      </div>

      <div class="flex grid grid-cols-3 gap-1 border">
        <div class="flex">
          <div class="aspect-square bg-zinc-200 w-full"></div>
        </div>
        <div class="flex col-span-2">
          <div class="flex grid gap-1 text-left">
            <div class="flex h-5 overflow-hidden">
              <span class="font-bold truncate"
                >品名品名品名品名品名品名品名品名品名品名品名品名品名品名品名</span
              >
            </div>
            <div class="flex"><span class="text-xs">品牌簡稱/容量</span></div>
            <div class="flex"><span class="text-[0.75rem]">NT$</span>30</div>
          </div>
        </div>
      </div>

      <div class="flex grid grid-cols-3 gap-1 border">
        <div class="flex">
          <div class="aspect-square bg-zinc-200 w-full"></div>
        </div>
        <div class="flex col-span-2">
          <div class="flex grid gap-1 text-left">
            <div class="flex h-5 overflow-hidden">
              <span class="font-bold truncate"
                >品名品名品名品名品名品名品名品名品名品名品名品名品名品名品名</span
              >
            </div>
            <div class="flex"><span class="text-xs">品牌簡稱/容量</span></div>
            <div class="flex"><span class="text-[0.75rem]">NT$</span>30</div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div
    ref="screenMask"
    class="fixed w-screen h-screen z-10 top-0 left-0 bg-white/[0] backdrop-blur-[1px]"
    :class="{ block: isSortOpen, hidden: !isSortOpen }"
    @click="openSortOption()"
  ></div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'BuyList',
  components: {},
  props: {
    msg: {
      type: String,
      default: '',
    },
  },
  setup() {
    const isSortOpen = ref(false);
    const sortSelector = ref(null);
    const sortOption = ref(null);

    const openSortOption = () => {
      if (!isSortOpen.value) isSortOpen.value = true; // open sort menu
      else isSortOpen.value = false; // close sort menu
    };

    const setSortOption = (e) => {
      const opt = e.target.innerHTML;
      sortSelector.value.innerHTML = opt;

      isSortOpen.value = false; // close sort menu
    };

    return {
      isSortOpen,
      sortSelector,
      sortOption,
      openSortOption,
      setSortOption,
    };
  },
};
</script>

<style scoped>
a {
  color: #42b983;
}
</style>
