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
              v-if="mainInfo.isHighest"
              class="w-fit h-fit inline-block text-[0.75rem] px-1 bg-rose-500 text-white rounded ml-2"
            >
              最貴
            </div>
            <div
              v-if="mainInfo.isLowest"
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
        <div class="grid grid-cols-5 gap-1">
          <div class="flex">
            <input
              v-model="input.date"
              type="date"
              class="h-10 w-full border border-zinc-300 rounded focus:outline-none focus:border-2 focus:border-zinc-300 px-2 py-1"
            />
          </div>
          <div class="flex">
            <input
              v-model="input.price"
              type="text"
              class="h-10 w-full border border-zinc-300 rounded focus:outline-none focus:border-2 focus:border-zinc-300 px-2 py-1"
              placeholder="平均單件價格"
            />
          </div>
          <div class="flex">
            <select
              v-model="input.discount"
              class="h-10 w-full border border-zinc-300 rounded focus:outline-none focus:border-2 focus:border-zinc-300 px-2 py-1"
            >
              <option value="" disabled>價格類型...</option>
              <option value="1">特惠活動價</option>
              <option value="0">日常價</option>
            </select>
          </div>
          <div class="flex">
            <select
              v-model="input.channel"
              class="h-10 w-full border border-zinc-300 rounded focus:outline-none focus:border-2 focus:border-zinc-300 px-2 py-1"
            >
              <option value="" disabled>購物管道...</option>
              <option v-for="item in channels" :key="item" :value="item.id">
                {{ item.shortname }}
              </option>
            </select>
          </div>
          <div class="flex">
            <button
              type="button"
              class="border w-full bg-emerald-500 text-white rounded"
              @click="insertSubProduct()"
            >
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
                v-if="subprod.isLowest"
                class="w-fit h-fit inline-block text-[0.75rem] px-1 bg-emerald-500 text-white rounded ml-2"
              >
                最便宜
              </div>
              <div
                v-if="subprod.isHighest"
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
    const channels = ref(null);
    const input = {
      date: null,
      price: null,
      discount: '',
      channel: '',
    };
    const originMaxMin = {
      max: null,
      min: null,
    };

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
          mainInfo.value.weight = resData.weight;
          mainInfo.value.unit = resData.unit;
          mainInfo.value.capacity = resData.weight + resData.unit;
          mainInfo.value.price = resData.price;
          parseChannel(resData.sales_channel);
          mainInfo.value.discount = resData.discount === '1';
          mainInfo.value.isHighest = resData.isHighest;
          mainInfo.value.isLowest = resData.isLowest;
        })
        .catch((error) => console.log(error));
    };

    const getSubProductList = () => {
      axios
        .get(`/api/GET/products?belongid=${mainId}`)
        .then((response) => {
          console.log('getSubProductList', response.data);
          subProductList.value = response.data;
        })
        .catch((error) => console.log(error));
    };

    const getChannelList = () => {
      axios
        .get('/api/GET/channels')
        .then((res) => {
          // console.log(res);
          channels.value = res.data;
        })
        .catch((error) => console.log(error));
    };

    const isHighest = () => {
      const newPrice = Number(input.price);
      const mainPrice = Number(mainInfo.value.price);
      let maxFlag = false;
      if (newPrice > mainPrice) {
        const findMaxPrice = subProductList.value.find((item) => item.isHighest);
        if (findMaxPrice && newPrice > Number(findMaxPrice.price)) {
          originMaxMin.max = findMaxPrice;
          maxFlag = true;
        } else if (!findMaxPrice) maxFlag = true;
      }

      return maxFlag;
    };

    const isLowest = () => {
      const newPrice = Number(input.price);
      const mainPrice = Number(mainInfo.value.price);
      let minFlag = false;
      if (newPrice < mainPrice) {
        const findMinPrice = subProductList.value.find((item) => item.isLowest);
        if (findMinPrice && newPrice < Number(findMinPrice.price)) {
          originMaxMin.min = findMinPrice;
          minFlag = true;
        } else if (!findMinPrice) minFlag = true;
      }

      return minFlag;
    };

    const adjustHighestSet = () => {
      originMaxMin.max.isHighest = false;
      return axios
        .patch(`/api/PATCH/channels/${originMaxMin.max.id}`, originMaxMin.max)
        .catch((error) => console.log(error));
    };
    const adjustLowestSet = () => {
      originMaxMin.min.isLowest = false;
      return axios
        .patch(`/api/PATCH/channels/${originMaxMin.min.id}`, originMaxMin.min)
        .catch((error) => console.log(error));
    };

    const insertSubProduct = () => {
      const params = {
        belongid: parseInt(mainId, 10),
        pic: mainInfo.value.pic,
        name: mainInfo.value.name,
        brand: mainInfo.value.brand,
        price: input.price,
        isHighest: isHighest(),
        isLowest: isLowest(),
        weight: mainInfo.value.weight,
        unit: mainInfo.value.unit,
        sales_channel: input.channel,
        discount: input.discount,
        buy_date: input.date,
      };
      console.log('params', params);
      axios
        .post('/api/POST/product', params)
        .then(() => {
          if (originMaxMin.max) {
            adjustHighestSet().then(() => {
              getMainProductInfo();
              getSubProductList();
            });
          } else if (originMaxMin.min) {
            adjustLowestSet().then(() => {
              getMainProductInfo();
              getSubProductList();
            });
          } else {
            getMainProductInfo();
            getSubProductList();
            console.log('else');
          }
        })
        .catch((error) => {
          console.error(error);
        });
    };

    // life cycle
    onMounted(() => {
      const { id } = route.params;
      mainId = id;
      // console.log(mainId);
      getMainProductInfo();
      getSubProductList();
      getChannelList();
    });

    return {
      getMainProductInfo,
      mainInfo,
      getSubProductList,
      subProductList,
      insertSubProduct,
      input,
      channels,
      getChannelList,
    };
  },
};
</script>

<style scoped>
a {
  color: #42b983;
}
</style>
