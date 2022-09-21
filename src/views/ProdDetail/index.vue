<template>
  <div class="container mx-auto px-4">
    <div class="flex grid grid-cols-3 gap-1 border">
      <div class="flex">
        <div class="aspect-square bg-zinc-200 w-full">
          <img
            v-cloak
            :src="
              'https://raw.githubusercontent.com/elzuoc/RePur/main/src/assets/uploads/' +
              mainInfo.pic
            "
            class="w-full"
          />
        </div>
      </div>
      <div class="flex col-span-2">
        <div class="flex grid gap-1 text-left">
          <div class="flex h-5 overflow-hidden">
            <span class="font-bold truncate">{{ mainInfo.name }}</span>
          </div>
          <div class="flex">{{ mainInfo.brand }}/{{ mainInfo.capacity }}</div>
          <div class="flex"><span class="text-xs">購自</span>&nbsp;{{ mainInfo.channel }}</div>
          <div class="flex">
            <span class="text-[0.75rem]">NT$</span>{{ mainInfo.price }}
            <div
              v-if="mainInfo.discount"
              class="w-fit h-fit inline-block text-[0.75rem] px-1 bg-amber-500 text-white rounded ml-2"
            >
              特惠活動
            </div>
            <div
              v-if="!mainInfo.discount"
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
            <input
              type="date"
              class="h-10 w-full border border-zinc-300 rounded focus:outline-none focus:border-2 focus:border-zinc-300 px-2 py-1"
            />
          </div>
          <div class="flex">
            <input
              type="text"
              class="h-10 w-full border border-zinc-300 rounded focus:outline-none focus:border-2 focus:border-zinc-300 px-2 py-1"
              placeholder="平均單件價格"
            />
          </div>
          <div class="flex">
            <select
              class="h-10 w-full border border-zinc-300 rounded focus:outline-none focus:border-2 focus:border-zinc-300 px-2 py-1"
            >
              <option value="">特惠活動價</option>
              <option value="">日常價</option>
            </select>
          </div>
          <div class="flex">
            <button type="button" class="border w-full bg-emerald-500 text-white rounded">
              新增
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full mt-4 grid grid-cols-2 gap-2">
      <!-- one product -->
      <div
        v-for="subprod in subProductList"
        :key="subprod"
        class="flex grid grid-cols-3 gap-1 border"
      >
        <div class="flex">
          <div class="aspect-square bg-zinc-200 w-full">
            <img
              :src="
                'https://raw.githubusercontent.com/elzuoc/RePur/main/src/assets/uploads/' +
                subprod.pic
              "
              class="w-full"
            />
          </div>
        </div>
        <div class="flex col-span-2">
          <div class="flex grid gap-1">
            <div class="flex h-5 overflow-hidden">
              <span class="font-bold truncate">{{ subprod.name }}</span>
            </div>
            <div class="flex">
              <span class="text-xs">{{ subprod.brand }}/{{ subprod.weight + subprod.unit }}</span>
            </div>
            <div class="flex">
              <span class="text-[0.75rem]">NT$</span>{{ subprod.price }}
              <div
                v-if="subprod.discount === '1'"
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
              <div class="text-sm">{{ subprod.buy_date }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { ref } from 'vue';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

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
    let mainId = null;
    const mainInfo = ref({});
    const subProductList = ref(null);

    const parseChannel = (channelId) => {
      axios
        .get(`/api/GET/channels?parse=${channelId}`)
        .then((response) => {
          // console.log(response);
          mainInfo.value.channel = response.data.fullname;
        })
        .catch((error) => console.log(error));
    };

    const getMainProductInfo = () => {
      axios
        .get(`/api/GET/product/${mainId}`)
        .then((response) => {
          // console.log(response.data);
          const resData = response.data;
          mainInfo.value.pic = resData.pic;
          mainInfo.value.name = resData.name;
          mainInfo.value.brand = resData.brand;
          mainInfo.value.capacity = resData.weight + resData.unit;
          mainInfo.value.price = resData.price;
          parseChannel(resData.sales_channel);
          mainInfo.value.discount = resData.discount === '1';
        })
        .catch((error) => console.log(error));
    };

    const getSubProductList = () => {
      axios
        .get(`/api/GET/products?belongid=${mainId}`)
        .then((response) => {
          console.log(response.data);
          subProductList.value = response.data;
        })
        .catch((error) => console.log(error));
    };

    // life cycle
    onMounted(() => {
      const { id } = route.params;
      mainId = id;
      // console.log(mainId);
      getMainProductInfo();
      getSubProductList();
    });

    return {
      getMainProductInfo,
      mainInfo,
      getSubProductList,
      subProductList,
    };
  },
};
</script>

<style scoped>
a {
  color: #42b983;
}
</style>
