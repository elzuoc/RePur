<template>
  <div class="container mx-auto px-4">
    <div class="w-full relative">
      <div class="w-full border border-solid border-slate-300 text-slate-300 rounded bg-white z-2">
        <input
          type="hidden"
          class="w-[calc(100%-24px)] inline-block focus:outline-none focus:border focus-visible:border-solid focus:border-slate-400 rounded p-1"
          placeholder="Search..."
        />

        <div
          ref="search"
          class="w-[calc(100%-24px)] inline-block focus:outline-none focus:border focus-visible:border-solid focus:border-slate-400 rounded p-1 text-left"
          contenteditable="true"
          @click="clearSearchInput"
          @blur="initSearchInput"
          @input="filterSearchOptions($event)"
        >
          Search...
        </div>
        <img
          src="@/assets/icons/search.svg"
          class="w-6 inline-block cursor-pointer"
          @click="goSearch"
        />
      </div>

      <div
        id="searchSuggest"
        ref="searchSuggest"
        class="absolute top-9 w-full text-left bg-white p-1 z-20 border border-slate-50 bg-white p-1 text-left shadow-md hidden"
      >
        <div v-for="item in searchOptions" :key="item" class="cursor-pointer">
          <!-- eslint-disable vue/no-v-html -->
          <div @click="changeSearch(item)" v-html="item.name"></div>
          <!-- eslint-enable -->
        </div>
      </div>
    </div>

    <div
      class="w-full border-2 border-dashed border-slate-300 text-slate-300 rounded bg-white p-2 mt-2"
    >
      <div
        class="relative w-full h-20 border border-solid border-slate-300 text-slate-300 rounded bg-zinc-400"
        @click="openNewItemModal"
      >
        <div class="absolute m-auto inset-0 w-fit h-fit">
          <span class="text-white font-bold tracking-wider">+ 常購商品</span>
        </div>
      </div>
    </div>

    <div class="relative w-full mt-4 text-left">
      <div
        ref="sortSelector"
        class="w-fit h-10 p-2 border border-zinc-300 text-zinc-500 cursor-pointer"
        @click="openSortOption"
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
          @click="sortProductList({ event: $event, field: 'buy_date', type: 'desc' })"
        >
          <img src="@/assets/icons/sort-desc.svg" class="w-5 inline-block" />
          日期 新→舊
          <div class="hidden">buy_date-desc</div>
        </div>
        <div
          class="p-2 hover:bg-zinc-50 cursor-pointer"
          @click="sortProductList({ event: $event, field: 'buy_date', type: 'asc' })"
        >
          <img src="@/assets/icons/sort-asc.svg" class="w-5 inline-block" />
          日期 舊→新
          <div class="hidden">buy_date-asc</div>
        </div>
        <!-- <div class="p-2 hover:bg-zinc-50 cursor-pointer" @click="setSortOption($event)">
          <img src="@/assets/icons/sort-desc.svg" class="w-5 inline-block" />
          頻率 多→少
          <div class="hidden">times-desc</div>
        </div>
        <div class="p-2 hover:bg-zinc-50 cursor-pointer" @click="setSortOption($event)">
          <img src="@/assets/icons/sort-asc.svg" class="w-5 inline-block" />
          頻率 少→多
          <div class="hidden">times-asc</div>
        </div>
        <div class="p-2 hover:bg-zinc-50 cursor-pointer" @click="setSortOption($event)">
          <img src="@/assets/icons/view-list.svg" class="w-5 inline-block" />
          年度
        </div>
        <div class="p-2 hover:bg-zinc-50 cursor-pointer" @click="setSortOption($event)">
          <img src="@/assets/icons/star.svg" class="w-5 inline-block" />
          品牌
        </div> -->
      </div>
    </div>

    <div class="w-full mt-4 grid grid-cols-2 gap-2">
      <!-- one product -->
      <!-- <router-link
        v-for="item in products"
        :key="item"
        :to="{
          path: '/ProdDetail',
          name: 'ProdDetail',
          params: { id: item.id },
        }"
      > -->
      <router-link
        v-for="item in products"
        :key="item"
        :to="{
          path: '/ProdDetail',
          name: 'ProdDetail',
          query: { id: item.id },
        }"
      >
        <div class="flex grid grid-cols-3 gap-1 border">
          <div class="flex">
            <!-- 'background-image':
                  'url(https://raw.githubusercontent.com/elzuoc/RePur/main/src/assets/uploads/' +
                  item.pic +
                  ')'-->
            <div
              class="aspect-square bg-zinc-200 w-full"
              :style="{
                'background-image': 'url(' + item.pic + ')',
                'background-size': 'cover',
              }"
            ></div>
          </div>
          <div class="flex col-span-2">
            <div class="flex grid gap-1 text-left">
              <div class="flex h-5 overflow-hidden">
                <span class="font-bold truncate"> {{ item.name }} </span>
              </div>
              <div class="flex">
                <span class="text-xs">
                  {{ item.sales_channel_text }}/{{ item.brand }}/{{ item.weight }}{{ item.unit }}
                </span>
              </div>
              <div class="flex">
                <span class="text-[0.75rem]">NT$</span>{{ item.price }}
                <div
                  v-if="item.discount === '1'"
                  class="w-fit h-fit inline-block text-[0.75rem] px-1 bg-amber-500 text-white rounded ml-2"
                >
                  特惠活動
                </div>
              </div>
              <div class="flex w-full">
                <span class="text-[0.75rem]">{{ item.buy_date }}</span>
              </div>
            </div>
          </div>
        </div>
      </router-link>
    </div>
  </div>

  <div
    ref="screenMask"
    class="fixed w-screen h-screen z-10 top-0 left-0 bg-white/[0] backdrop-blur-[1px]"
    :class="{ block: isSortOpen, hidden: !isSortOpen }"
    @click="openSortOption"
  ></div>

  <div ref="modalMask" class="fixed top-0 left-0 z-10 w-screen h-screen bg-black/[.5] hidden"></div>
  <div
    ref="modal"
    class="fixed m-auto left-0 right-0 top-0 bottom-0 z-20 w-11/12 md:w-8/12 lg:w-5/12 h-fit bg-white rounded border border-zinc-200 hidden transition-all duration-300 ease-in"
    :class="{ 'opacity-0': isModalClose, 'opacity-100': isModalOpen }"
  >
    <div class="w-full border-b p-2 font-bold text-left">新增常購商品</div>
    <div class="w-full min-h-[50px] p-2">
      <div class="grid grid-cols-3 gap-2">
        <div class="flex">
          <div class="aspect-square w-full">
            <div
              class="w-full h-full border-2 border-dashed border-slate-300 text-slate-300 rounded bg-white p-2"
            >
              <div
                class="relative w-full h-full border border-solid border-slate-300 text-slate-300 rounded bg-zinc-400"
                @click="openFile"
              >
                <input
                  ref="fileInput"
                  type="file"
                  class="hidden"
                  accept="image/*"
                  @change="getFileInfo"
                />
                <input
                  ref="fileInfo"
                  type="text"
                  class="hidden"
                  placeholder="未選取圖片"
                  @click="openFile"
                />
                <input ref="fileName" v-model="input.img" type="text" class="hidden" />

                <div ref="tempImg" class="absolute m-auto inset-0 w-fit h-fit">
                  <span v-if="!dataBase64URL" class="text-white font-bold text-5xl">+</span>
                  <img v-if="dataBase64URL" :src="dataBase64URL" class="w-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex col-span-2">
          <div class="grid grid-rows-3 gap-2">
            <div class="flex">
              <input
                :ref="form['name']"
                v-model="input.name"
                type="text"
                :class="{
                  'h-10 w-full border border-zinc-300 rounded focus:outline-none focus:border-2 focus:border-zinc-300 px-2 py-1': true,
                  'border-red-400 focus:border-red-400': isVerify && focusName,
                }"
                placeholder="品名"
                @input="verifyInput"
              />
            </div>
            <div class="flex">
              <input
                :ref="form['brand']"
                v-model="input.brand"
                type="text"
                :class="{
                  'h-10 w-full border border-zinc-300 rounded focus:outline-none focus:border-2 focus:border-zinc-300 px-2 py-1': true,
                  'border-red-400 focus:border-red-400': isVerify && focusBrand,
                }"
                placeholder="品牌"
                @input="verifyInput"
              />
            </div>
            <div class="flex">
              <input
                v-model="input.capacity"
                type="text"
                class="h-10 w-1/2 border border-zinc-300 rounded focus:outline-none focus:border-2 focus:border-zinc-300 px-2 py-1"
                placeholder="容量/重量"
              />
              <select
                v-model="input.unit"
                class="h-10 w-1/2 border border-zinc-300 rounded focus:outline-none focus:border-2 focus:border-zinc-300 px-2 py-1"
              >
                <option value="" selected disabled>單位</option>
                <option v-for="(item, index) in unitOptions" :key="index" value="item.value">
                  {{ item.text }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div class="flex mt-2 w-full">
        <div class="grid grid-rows-2 gap-2 w-full">
          <div class="flex">
            <select
              v-model="input.store"
              class="h-10 w-1/3 border border-zinc-300 rounded focus:outline-none focus:border-2 focus:border-zinc-300 px-2 py-1"
            >
              <option value="" selected disabled>購買處</option>
              <option v-for="item in channels" :key="item" :value="item.id">
                {{ item.shortname }}
              </option>
            </select>
            <input
              :ref="form['price']"
              v-model="input.price"
              type="number"
              step="0.1"
              :class="{
                'h-10 w-1/3 border border-zinc-300 rounded focus:outline-none focus:border-2 focus:border-zinc-300 px-2 py-1': true,
                'border-red-400 focus:border-red-400': isVerify && focusPrice,
              }"
              placeholder="單件金額"
              @input="verifyInput"
            />
            <select
              v-model="input.discount"
              aria-label="discount"
              class="h-10 w-1/3 border border-zinc-300 rounded focus:outline-none focus:border-2 focus:border-zinc-300 px-2 py-1"
            >
              <option selected disabled>優惠？</option>
              <option value="0">日常價</option>
              <option value="1">活動優惠價</option>
            </select>
          </div>
          <div class="flex">
            <input
              v-model="input.date"
              aria-label="date"
              type="date"
              class="h-10 w-full border border-zinc-300 rounded focus:outline-none focus:border-2 focus:border-zinc-300 px-2 py-1"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="w-full border-t p-2">
      <button
        class="rounded py-1 px-2 mb-2 text-white bg-zinc-500 hover:bg-zinc-600 w-fit inline-block float-left"
        @click="closeModal"
      >
        Cancel
      </button>
      <button
        class="rounded py-1 px-2 mb-2 text-white bg-sky-500 hover:bg-sky-600 w-fit inline-block ml-2 float-right"
        @click="saveProduct"
      >
        OK
      </button>
    </div>

    <canvas ref="photoCanvas" width="500" height="500" class="hidden"></canvas>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

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
    // sort options
    const isSortOpen = ref(false);
    const sortSelector = ref(null);
    const sortOption = ref(null);
    // unit options
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
    // channel options
    const channels = ref(null);

    // new a product
    const photoCanvas = ref(null);
    const products = ref(null);
    const modal = ref(null);
    const modalMask = ref(null);
    const isModalOpen = ref(false);
    const isModalClose = ref(true);
    const fileInput = ref();
    const fileInfo = ref('');
    const tempImg = ref(null);
    const dataBase64URL = ref(null);
    const isVerify = ref(false);
    const focusName = ref(false);
    const focusBrand = ref(false);
    const focusPrice = ref(false);
    const input = {
      img: '',
      name: '',
      brand: '',
      capacity: '',
      unit: '',
      store: '',
      price: null,
      discount: 0,
      date: '',
    };
    const form = {
      name: ref(null),
      brand: ref(null),
      price: ref(null),
    };

    // search
    const search = ref(null);
    const searchSuggest = ref(null);
    const searchOptions = ref(null);

    // sort options
    const openSortOption = () => {
      if (!isSortOpen.value) {
        isSortOpen.value = true; // open sort menu
      } else {
        isSortOpen.value = false; // close sort menu
      }
    };

    const setSortOption = (e) => {
      const opt = e.target.innerHTML;
      sortSelector.value.innerHTML = opt;

      isSortOpen.value = false; // close sort menu
    };

    const sortProductList = (params) => {
      setSortOption(params.event);

      axios
        .get(`/api/GET/products?sort=true&sortField=${params.field}&sortType=${params.type}`)
        .then((response) => {
          // console.log('goSearch GET response', response);
          products.value = response.data.map((item) => {
            const parseText = (value) => {
              if (value === '1') return '全聯';
              if (value === '2') return '家樂福';
              return '其他';
            };

            return {
              ...item,
              sales_channel_text: parseText(item.sales_channel),
            };
          });
        })
        .catch((error) => {
          console.error(error);
        });
    };

    // channel opstions
    const getChannelList = () => {
      axios
        .get('/api/GET/channels')
        .then((res) => {
          // console.log(res);
          channels.value = res.data;
        })
        .catch((error) => console.log(error));
    };

    // product list
    const getProductList = () => {
      axios
        .get('/api/GET/products')
        .then((response) => {
          // console.log('GET response', response);
          products.value = response.data.map((item) => {
            const parseText = (value) => {
              if (value === '1') return '全聯';
              if (value === '2') return '家樂福';
              return '其他';
            };

            return {
              ...item,
              sales_channel_text: parseText(item.sales_channel),
            };
          });
        })
        .catch((error) => {
          console.error(error);
        });
    };

    // new a product
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

    const openFile = () => {
      fileInput.value.click();
    };
    const getFileInfo = () => {
      const file = fileInput.value.files[0];
      const { size } = file; // byte
      let sizeStr = null;
      if (size <= 1024) sizeStr = `${size}Byte | `;
      else if (size > 1024 && size <= 1048576) {
        sizeStr = `${(size / 1024).toFixed(1)}KB | `;
      } else if (size > 1048576 && size <= 1073741824) {
        sizeStr = `${(size / 1024 / 1024).toFixed(1)}MB | `;
      } else if (size > 1073741824) sizeStr = '檔案過大 | ';

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
      focusName.value = false;
      focusBrand.value = false;
      focusPrice.value = false;
    };

    const verifyInput = () => {
      isVerify.value = true;
      restoreInput();

      if (!input.name) {
        focusName.value = true;
        return false;
      }
      if (!input.brand) {
        focusBrand.value = true;
        return false;
      }
      if (!input.price) {
        focusPrice.value = true;
        return false;
      }

      isVerify.value = false;
      return true;
    };

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
        .then(() => {
          getProductList();
          closeModal();
        })
        .then(() => {})
        .catch((error) => {
          console.error(error);
        });
    };

    // search
    const initSearchInput = () => {
      if (search.value.textContent.trim() === '') {
        search.value.textContent = 'Search...';
        search.value.classList.remove('text-slate-800');
      }
    };
    const clearSearchInput = () => {
      if (search.value.textContent.trim() === 'Search...') search.value.textContent = '';
    };
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

    const changeSearch = (item) => {
      search.value.textContent = item.name.replace(/(<([^>]+)>)/gi, '');
      search.value.classList.add('text-slate-800');
      searchSuggest.value.classList.add('hidden');
    };

    const goSearch = () => {
      const params = {
        prodName:
          search.value.textContent.trim() === 'Search...' ? null : search.value.textContent.trim(),
      };

      axios
        .get(`/api/GET/products?search=${params.prodName}`)
        .then((response) => {
          // console.log('goSearch GET response', response);
          products.value = response.data.map((item) => {
            const parseText = (value) => {
              if (value === '1') return '全聯';
              if (value === '2') return '家樂福';
              return '其他';
            };

            return {
              ...item,
              sales_channel_text: parseText(item.sales_channel),
            };
          });
        })
        .catch((error) => {
          console.error(error);
        });
    };

    // life-cycle
    onMounted(() => {
      getProductList();
      getChannelList();
    });

    return {
      // sort options
      isSortOpen,
      sortSelector,
      sortOption,
      openSortOption,
      setSortOption,
      sortProductList,

      // unit options
      unitOptions,

      // channel options
      channels,
      getChannelList,

      // new a product
      products,
      modal,
      modalMask,
      isModalOpen,
      isModalClose,
      openNewItemModal,
      closeModal,
      fileInput,
      fileInfo,
      openFile,
      getFileInfo,
      saveProduct,
      input,
      photoCanvas,
      tempImg,

      // search
      search,
      initSearchInput,
      clearSearchInput,
      searchOptions,
      searchSuggest,
      filterSearchOptions,
      changeSearch,
      goSearch,

      // form
      form,
      verifyInput,
      dataBase64URL,
      isVerify,
      focusName,
      focusBrand,
      focusPrice,
    };
  },
};
</script>

<style scoped>
a {
  color: #42b983;
}
</style>
