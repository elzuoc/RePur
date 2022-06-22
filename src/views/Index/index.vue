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
      <a href="#">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
          fill="currentColor"
          class="inline-block"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path
            d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
          />
        </svg>
      </a>
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

    <div class="w-full mt-4 text-left">
      <span class="font-bold">近期新增</span>
    </div>

    <div class="w-full mt-4 grid grid-cols-2 gap-2">
      <!-- one product -->
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
</template>

<script>
export default {
  name: 'IndexCompo',
  props: {
    msg: {
      type: String,
      default: '',
    },
  },
  setup() {
    return {};
  },
};
</script>

<style scoped>
a {
  color: #42b983;
}
</style>
