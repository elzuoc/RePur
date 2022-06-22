<template>
  <div class="container mx-auto px-4">
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
          <div class="flex">品牌全名/容量</div>
          <div class="flex"><span class="text-xs">購自</span>&nbsp;全聯</div>
          <div class="flex">
            <span class="text-[0.75rem]">NT$</span>30
            <div
              class="w-fit h-fit inline-block text-[0.75rem] px-1 bg-amber-500 text-white rounded ml-2"
            >
              特惠活動
            </div>
            <div
              class="w-fit h-fit inline-block text-[0.75rem] px-1 bg-emerald-500 text-white rounded ml-2"
            >
              最便宜
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="mt-4 py-4 border-y-2 border-zinc-200 border-dashed w-full">
        <div class="grid grid-cols-4 gap-1">
          <div class="flex">
            <input type="date" class="border w-full rounded" />
          </div>
          <div class="flex">
            <input
              type="text"
              class="border w-full rounded"
              placeholder="平均單件價格"
            />
          </div>
          <div class="flex">
            <select class="border w-full rounded">
              <option value="">特惠活動價</option>
              <option value="">日常價</option>
            </select>
          </div>
          <div class="flex">
            <button
              type="button"
              class="border w-full bg-emerald-500 text-white rounded"
            >
              新增
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full mt-4 grid grid-cols-2 gap-2">
      <!-- one product -->
      <div class="flex grid grid-cols-3 gap-1 border">
        <div class="flex">
          <div class="aspect-square bg-zinc-200 w-full"></div>
        </div>
        <div class="flex col-span-2">
          <div class="flex grid gap-1">
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
              <div
                class="w-fit h-fit inline-block text-[0.75rem] px-1 bg-rose-500 text-white rounded ml-2"
              >
                最貴
              </div>
            </div>
            <div class="w-full text-zinc-500 text-right px-1">
              <div class="text-sm">2022-06-21</div>
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
// import { ref } from 'vue';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

export default {
  name: 'ProdDetail',
  props: {
    msg: {
      type: String,
      default: '',
    },
  },
  setup() {
    const route = useRoute();

    onMounted(() => {
      const { id } = route.params;
      console.log(id);
    });
    return {};
  },
};
</script>

<style scoped>
a {
  color: #42b983;
}
</style>
