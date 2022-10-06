<template src="./template.html" />

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import SuccessMsg from '../../components/SuccessMsg.vue'; // eslint-disable-line no-unused-vars
import FailedMsg from '../../components/FailedMsg.vue'; // eslint-disable-line no-unused-vars
import ApiErrorMsg from '../../components/ApiErrorMsg.vue'; // eslint-disable-line no-unused-vars

// sort options
const isSortOpen = ref(false);
const sortSelector = ref(null);
const sortOption = ref(null); // eslint-disable-line no-unused-vars

// unit options
// eslint-disable-next-line no-unused-vars
const unitOptions = ref([
  { text: '其他單位', value: '單位' },
  { text: 'g/克', value: 'g' },
  { text: 'ml/毫升', value: 'ml' },
  { text: 'L/公升', value: 'liter' },
  { text: 'cm/公分', value: 'cm' },
  { text: 'm/公尺', value: 'm' },
  { text: 'inch/英吋', value: 'inch' },
  { text: 'EU/歐碼', value: 'EU' },
  { text: 'UK/英國碼', value: 'UK' },
  { text: 'US/美國碼', value: 'US' },
  { text: 'S', value: 'S' },
  { text: 'M', value: 'M' },
  { text: 'L', value: 'L' },
  { text: 'XL', value: 'XL' },
  { text: '2XL', value: '2XL' },
  { text: '3XL', value: '3XL' },
  { text: '4XL', value: '4XL' },
  { text: 'A0', value: 'A0' },
  { text: 'A1', value: 'A1' },
  { text: 'A2', value: 'A2' },
  { text: 'A3', value: 'A3' },
  { text: 'A4', value: 'A4' },
  { text: 'A5', value: 'A5' },
  { text: 'B1', value: 'B1' },
  { text: 'B2', value: 'B2' },
  { text: 'B3', value: 'B3' },
  { text: 'B4', value: 'B4' },
  { text: 'B5', value: 'B5' },
]);

const channelOptions = ref([]);

// new a product
const photoCanvas = ref(null);
const products = ref([]);
const modal = ref(null);
const modalMask = ref(null);
const isModalOpen = ref(false);
const isModalClose = ref(true);
const fileInput = ref('');
const fileInfo = ref('');
const tempImg = ref(null); // eslint-disable-line no-unused-vars
const dataBase64URL = ref('');
const isVerify = ref(false);
const focus = ref({
  name: false,
  brand: false,
  price: false,
});
const input = {
  img: '',
  name: '',
  brand: '',
  capacity: '',
  unit: '',
  store: '',
  price: Infinity,
  discount: 0,
  date: '',
};

// search
const search = ref('');
const searchSuggest = ref(null);
const searchOptions = ref([]);

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

// sort options
// eslint-disable-next-line no-unused-vars
const openSortOption = () => {
  if (!isSortOpen.value) {
    isSortOpen.value = true;
  } else {
    isSortOpen.value = false;
  }
};

const setSortOption = (e) => {
  const opt = e.target.innerHTML;
  sortSelector.value.innerHTML = opt;

  isSortOpen.value = false;
};

// eslint-disable-next-line no-unused-vars
const sortProductList = (params) => {
  setSortOption(params.event);

  axios
    .get(`/api/GET/products?sort=true&sortField=${params.field}&sortType=${params.type}`)
    .then((response) => {
      // console.log('goSearch GET response', response);
      const { data } = response;
      products.value = data.map((item) => {
        const parseText = (value) => {
          const findChannel = channelOptions.value.find((channel) => channel.id === value);
          if (findChannel) return findChannel.shortname;
          return '其他';
        };

        return {
          ...item,
          sales_channel_text: parseText(item.sales_channel),
        };
      });
    })
    .catch((error) => showApiErrorMsg(error));
};

const getChannelOptions = () => {
  axios
    .get('/api/GET/channels')
    .then((res) => {
      // console.log(res);
      channelOptions.value = res.data;
    })
    .catch((error) => showApiErrorMsg(error));
};

const getProductList = () => {
  axios
    .get('/api/GET/products')
    .then((response) => {
      // console.log('GET response', response);
      const { data } = response;
      products.value = data.map((item) => {
        const parseText = (value) => {
          const findChannel = channelOptions.value.find((channel) => channel.id === value);
          if (findChannel) return findChannel.shortname;
          return '其他';
        };

        return {
          ...item,
          sales_channel_text: parseText(item.sales_channel),
        };
      });
    })
    .catch((error) => showApiErrorMsg(error));
};

// new a product
// eslint-disable-next-line no-unused-vars
const openNewItemModal = () => {
  modal.value.style.display = 'block';
  modalMask.value.style.display = 'block';
  isModalOpen.value = true;
  isModalClose.value = false;
};
const closeModal = () => {
  modal.value.style.display = 'none';
  modalMask.value.style.display = 'none';
  isModalOpen.value = false;
  isModalClose.value = true;

  fileInfo.value.value = ''; // clear Input File Selector
};

// Input File Selector (one file)
const newImg = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image(500, 500);
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('加載失敗'));
    img.src = src;
    img.crossOrigin = 'anonymous';
  });
};

const getImage = async (src) => {
  const img = await newImg(src);
  return img;
};

// eslint-disable-next-line no-unused-vars
const openFile = () => {
  fileInput.value.click();
};
// eslint-disable-next-line no-unused-vars
const getFileInfo = () => {
  const file = fileInput.value.files[0];
  const { size } = file; // byte
  let sizeStr = null;
  if (size <= 1024) {
    sizeStr = `${size}Byte | `;
  } else if (size > 1024 && size <= 1048576) {
    sizeStr = `${(size / 1024).toFixed(1)}KB | `;
  } else if (size > 1048576 && size <= 1073741824) {
    sizeStr = `${(size / 1024 / 1024).toFixed(1)}MB | `;
  } else if (size > 1073741824) {
    sizeStr = '檔案過大 | ';
  }

  fileInfo.value.value = sizeStr + fileInput.value.files[0].name;
  input.img = fileInput.value.files[0].name;

  // 商品圖
  const getCanvas = photoCanvas.value;
  const ctx = getCanvas.getContext('2d');
  const url = window.URL || window.webkitURL;
  const imgSrc = url.createObjectURL(file);

  getImage(imgSrc).then((img) => {
    // console.log('img', img);
    ctx.drawImage(img, 0, 0, 500, 500);
    dataBase64URL.value = getCanvas.toDataURL();

    input.img = dataBase64URL.value;
    // console.log(dataBase64URL.value);
  });
};

const restoreInput = () => {
  focus.value.name = false;
  focus.value.brand = false;
  focus.value.price = false;
};

const verifyInput = () => {
  isVerify.value = true;
  restoreInput();

  if (!input.name) {
    focus.value.name = true;
    return false;
  }
  if (!input.brand) {
    focus.value.brand = true;
    return false;
  }
  if (input.price === Infinity) {
    focus.value.price = true;
    return false;
  }

  isVerify.value = false;
  return true;
};

// eslint-disable-next-line no-unused-vars
const saveProduct = () => {
  if (!verifyInput()) return;

  const params = {
    belongid: 0,
    pic: input.img,
    name: input.name,
    brand: input.brand,
    price: input.price,
    weight: input.capacity,
    unit: input.unit,
    sales_channel: input.store,
    discount: input.discount,
    buy_date: input.date,
  };

  axios
    .post('/api/POST/product', params)
    .then((response) => {
      const { status } = response;
      closeModal();

      if (status === 201) {
        getProductList();
        showSuccessMsg();
      } else {
        showFailedMsg();
      }
    })
    .catch((error) => {
      closeModal();
      showApiErrorMsg(error);
    });
};

// search
// eslint-disable-next-line no-unused-vars
const initSearchInput = () => {
  if (search.value.textContent.trim() === '') {
    search.value.textContent = 'Search...';
    search.value.classList.remove('text-slate-800');
  }
};
// eslint-disable-next-line no-unused-vars
const clearSearchInput = () => {
  if (search.value.textContent.trim() === 'Search...') search.value.textContent = '';
};
// eslint-disable-next-line no-unused-vars
const filterSearchOptions = (e) => {
  searchOptions.value = Array.from(products.value).filter((item) =>
    item.name.includes(e.target.innerHTML)
  );

  const regex = new RegExp(e.target.innerHTML, 'gi');
  searchOptions.value = searchOptions.value
    .filter((item) => item.name.includes(e.target.innerHTML))
    .map((item) => {
      const temp = JSON.parse(JSON.stringify(item));
      temp.name = temp.name.replace(
        regex,
        `<span class="bg-amber-100">${e.target.innerHTML}</span>`
      );

      return temp;
    });

  searchSuggest.value.classList.remove('hidden');
  if (search.value.textContent.trim() === '') searchSuggest.value.classList.add('hidden');
};

// eslint-disable-next-line no-unused-vars
const changeSearch = (item) => {
  search.value.textContent = item.name.replace(/(<([^>]+)>)/gi, '');
  search.value.classList.add('text-slate-800');
  searchSuggest.value.classList.add('hidden');
};

// eslint-disable-next-line no-unused-vars
const goSearch = () => {
  const params = {
    prodName:
      search.value.textContent.trim() === 'Search...' ? null : search.value.textContent.trim(),
  };

  axios
    .get(`/api/GET/products?search=${params.prodName}`)
    .then((response) => {
      // console.log('goSearch GET response', response);
      const { data } = response;
      products.value = data.map((item) => {
        const parseText = (value) => {
          const findChannel = channelOptions.value.find((channel) => channel.id === value);
          if (findChannel) return findChannel.shortname;

          return '其他';
        };

        return {
          ...item,
          sales_channel_text: parseText(item.sales_channel),
        };
      });
    })
    .catch((error) => showApiErrorMsg(error));
};

// life-cycle
onMounted(() => {
  getChannelOptions();
  getProductList();
});
</script>

<script>
export default {
  name: 'BuyList',
};
</script>

<style scoped>
a {
  color: #42b983;
}
</style>
