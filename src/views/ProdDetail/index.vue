<template>
  <div class="container mx-auto px-4">
    <div class="flex grid grid-cols-3 gap-1 border">
      <div class="flex">
        <div class="aspect-square bg-zinc-200 w-full">
          <img v-cloak :src="mainInfo.pic" class="w-full" />
        </div>
      </div>
      <div class="flex col-span-2">
        <div class="flex grid gap-1 text-left">
          <div class="flex h-5 overflow-hidden">
            <span class="font-bold truncate">{{ mainInfo.name }}</span>
          </div>
          <div class="flex">{{ mainInfo.brand }}/{{ mainInfo.weight + mainInfo.unit }}</div>
          <div class="flex"><span class="text-xs">購自</span>&nbsp;{{ mainInfo.channelTitle }}</div>
          <div class="flex">
            <span class="text-[0.75rem]">NT$</span>{{ mainInfo.price }}
            <div
              v-if="mainInfo.discount === 1"
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
              :ref="form['date']"
              v-model="input.date"
              type="date"
              :class="{
                'h-10 w-full border border-zinc-300 rounded focus:outline-none focus:border-2 focus:border-zinc-300 px-2 py-1': true,
                'border-red-400 focus:border-red-400': isVerify && focusDate,
              }"
              @input="verifyInput"
            />
          </div>
          <div class="flex">
            <input
              :ref="form['price']"
              v-model="input.price"
              type="number"
              :class="{
                'h-10 w-full border border-zinc-300 rounded focus:outline-none focus:border-2 focus:border-zinc-300 px-2 py-1': true,
                'border-red-400 focus:border-red-400': isVerify && focusPrice,
              }"
              placeholder="平均單件價格"
              @input="verifyInput"
            />
          </div>
          <div class="flex">
            <select
              :ref="form['discount']"
              v-model="input.discount"
              :class="{
                'h-10 w-full border border-zinc-300 rounded focus:outline-none focus:border-2 focus:border-zinc-300 px-2 py-1': true,
                'border-red-400 focus:border-red-400': isVerify && focusDiscount,
              }"
              @change="verifyInput"
            >
              <option value="0" disabled>價格類型...</option>
              <option value="1">特惠活動價</option>
              <option value="2">日常價</option>
            </select>
          </div>
          <div class="flex">
            <select
              :ref="form['channel']"
              v-model="input.channel"
              :class="{
                'h-10 w-full border border-zinc-300 rounded focus:outline-none focus:border-2 focus:border-zinc-300 px-2 py-1': true,
                'border-red-400 focus:border-red-400': isVerify && focusChannel,
              }"
              @change="verifyInput"
            >
              <option value="" disabled>購物管道...</option>
              <option v-for="item in channelOptions" :key="item" :value="item.id">
                {{ item.shortname }}
              </option>
            </select>
          </div>
          <div class="flex">
            <button
              type="button"
              class="border w-full bg-emerald-500 text-white rounded"
              @click="insertSubProduct"
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
            <img :src="subprod.pic" class="w-full" />
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

  <SuccessMsg :is-success-msg="isSuccessMsg" />
  <FailedMsg :is-failed-msg="isFailedMsg" />
  <ApiErrorMsg :is-api-error-msg="isApiErrorMsg" />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import SuccessMsg from '../../components/SuccessMsg.vue';
import FailedMsg from '../../components/FailedMsg.vue';
import ApiErrorMsg from '../../components/ApiErrorMsg.vue';

const route = useRoute();
let mainId = 0;
const mainInfo = ref({});
const subProductList = ref([]);
const channelOptions = ref([]);
const isVerify = ref(false);
const focusDate = ref(false);
const focusPrice = ref(false);
const focusDiscount = ref(false);
const focusChannel = ref(false);
const form = ref({
  date: null,
  price: null,
  discount: null,
  channel: null,
});
const input = {
  date: '',
  price: null,
  discount: 0,
  channel: '',
};
const originMaxMin = {
  max: {},
  min: {},
};
// msg
const isSuccessMsg = ref(false);
const isFailedMsg = ref(false);
const isApiErrorMsg = ref(false);

const showApiErrorMsg = (error) => {
  isApiErrorMsg.value = true;
  setTimeout(() => {
    isApiErrorMsg.value = false;
  }, 3000);

  console.log(error);
};
const showSuccessMsg = () => {
  isSuccessMsg.value = true;
  setTimeout(() => {
    isSuccessMsg.value = false;
  }, 3000);
};
const showFailedMsg = () => {
  isFailedMsg.value = true;
  setTimeout(() => {
    isFailedMsg.value = false;
  }, 3000);
};

const apiParseChannel = (id) => axios.get(`/api/GET/channels?parse=${id}`);
const parseChannel = async (channelId) => {
  try {
    const { data } = await apiParseChannel(channelId);
    mainInfo.value.channelTitle = data.fullname;
  } catch (error) {
    showApiErrorMsg(error);
  }
};

const apiGetMainProductInfo = (id) => axios.get(`/api/GET/product/${id}`);
const getMainProductInfo = async () => {
  const prodId = mainId;
  try {
    const { data } = await apiGetMainProductInfo(prodId);
    mainInfo.value = data;
    parseChannel(data.sales_channel);
  } catch (error) {
    showApiErrorMsg(error);
  }
};

const apiGetSubProductList = () => axios.get(`/api/GET/products?belongid=${mainId}`);
const getSubProductList = async () => {
  try {
    const { data } = await apiGetSubProductList();
    subProductList.value = data;
  } catch (error) {
    showApiErrorMsg(error);
  }
};

const apiGetChannelOptions = () => axios.get('/api/GET/channels');
const getChannelOptions = async () => {
  try {
    const { data } = await apiGetChannelOptions();
    channelOptions.value = data;
  } catch (error) {
    showApiErrorMsg(error);
  }
};

const restoreInput = () => {
  focusDate.value = false;
  focusPrice.value = false;
  focusDiscount.value = false;
  focusChannel.value = false;
};
const verifyInput = () => {
  isVerify.value = true;
  restoreInput();

  if (!input.date) {
    focusDate.value = true;
    return false;
  }
  if (!input.price) {
    focusPrice.value = true;
    return false;
  }
  if (!input.discount) {
    focusDiscount.value = true;
    return false;
  }
  if (!input.channel) {
    focusChannel.value = true;
    return false;
  }

  isVerify.value = false;
  return true;
};
const initInputParams = () => {
  input.date = null;
  input.price = null;
  input.discount = 0;
  input.channel = '';
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
    } else if (!findMaxPrice && mainInfo.value.isHighest) {
      originMaxMin.max = mainInfo.value;
      maxFlag = true;
    }
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
    .patch(`/api/PATCH/products/${originMaxMin.max.id}`, originMaxMin.max)
    .catch((error) => console.log(error));
};
const adjustLowestSet = () => {
  originMaxMin.min.isLowest = false;
  return axios
    .patch(`/api/PATCH/products/${originMaxMin.min.id}`, originMaxMin.min)
    .catch((error) => console.log(error));
};

const insertSubProduct = () => {
  if (!verifyInput()) return;

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
  // console.log('params', params);
  axios
    .post('/api/POST/product', params)
    .then((response) => {
      const { status } = response;

      if (status === 201) {
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
        }

        showSuccessMsg();
      } else {
        showFailedMsg();
      }

      initInputParams();
    })
    .catch((error) => showApiErrorMsg(error));
};

// life cycle
onMounted(() => {
  const { id } = route.query;
  mainId = id;
  // console.log(route.query);
  getMainProductInfo();
  getSubProductList();
  getChannelOptions();
});
</script>

<script>
export default {
  name: 'ProdDetail',
};
</script>

<style scoped>
a {
  color: #42b983;
}
</style>
