<template src="./template.html" />

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import SuccessMsg from '../../components/SuccessMsg.vue'; // eslint-disable-line no-unused-vars
import FailedMsg from '../../components/FailedMsg.vue'; // eslint-disable-line no-unused-vars
import ApiErrorMsg from '../../components/ApiErrorMsg.vue'; // eslint-disable-line no-unused-vars

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
// eslint-disable-next-line no-unused-vars
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

const parseChannel = (channelId) => {
  axios
    .get(`/api/GET/channels?parse=${channelId}`)
    .then((response) => {
      // console.log(response);
      const { fullname } = response.data; // 解構
      mainInfo.value.channelTitle = fullname;
    })
    .catch((error) => console.log(error));
};

const getMainProductInfo = () => {
  axios
    .get(`/api/GET/product/${mainId}`)
    .then((response) => {
      // console.log(response.data);
      const { data } = response; // 解構
      mainInfo.value = data;
      parseChannel(data.sales_channel);
    })
    .catch((error) => console.log(error));
};

const getSubProductList = () => {
  axios
    .get(`/api/GET/products?belongid=${mainId}`)
    .then((response) => {
      // console.log('getSubProductList', response.data);
      const { data } = response; // 解構
      subProductList.value = data;
    })
    .catch((error) => console.log(error));
};

const getChannelOptions = () => {
  axios
    .get('/api/GET/channels')
    .then((res) => {
      // console.log(res);
      const { data } = res; // 解構
      channelOptions.value = data;
    })
    .catch((error) => console.log(error));
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

// eslint-disable-next-line no-unused-vars
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
