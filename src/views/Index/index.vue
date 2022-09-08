<template>
  <div class="container mx-auto px-4">
    <div class="w-full border border-solid border-slate-300 text-slate-300 rounded bg-white">
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
        @click="openNewItemModal()"
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
      <!-- one product start -->
      <div v-for="item in products" :key="item" class="flex grid grid-cols-3 gap-1 border">
        <div class="flex">
          <div
            class="aspect-square bg-zinc-200 w-full"
            :style="{
              'background-image': 'url(/src/assets/uploads/' + item.pic + ')',
              'background-size': 'cover',
            }"
          ></div>
        </div>
        <div class="flex col-span-2 w-full">
          <div class="flex grid gap-1 w-full">
            <div class="flex h-5 overflow-hidden">
              <span class="font-bold truncate">{{ item.name }}</span>
            </div>
            <div class="flex">
              <span class="text-xs"
                >{{ item.sales_channel_text }}/{{ item.brand }}/{{ item.weight
                }}{{ item.unit }}</span
              >
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
      <!-- one product end -->
    </div>
  </div>

  <div ref="modalMask" class="fixed top-0 left-0 z-10 w-screen h-screen bg-black/[.5] hidden"></div>
  <div
    ref="modal"
    class="fixed m-auto left-0 right-0 top-0 bottom-0 z-20 w-11/12 md:w-8/12 lg:w-5/12 h-fit bg-white rounded border border-zinc-200 hidden transition-all duration-300 ease-in"
    :class="{ 'opacity-0': isModalClose, 'opacity-100': isModalOpen }"
  >
    <div class="w-full border-b p-2 font-bold text-left">新增慣購商品</div>
    <div class="w-full min-h-[50px] p-2">
      <div class="grid grid-cols-3 gap-2">
        <div class="flex">
          <div class="aspect-square w-full">
            <div
              class="w-full h-full border-2 border-dashed border-slate-300 text-slate-300 rounded bg-white p-2"
            >
              <div
                class="relative w-full h-full border border-solid border-slate-300 text-slate-300 rounded bg-zinc-400"
                @click="openFile()"
              >
                <input
                  ref="fileInput"
                  type="file"
                  class="hidden"
                  accept="image/*"
                  @change="getFileInfo()"
                />
                <input
                  ref="fileInfo"
                  type="text"
                  class="hidden"
                  placeholder="未選取圖片"
                  @click="openFile()"
                />
                <input ref="fileName" v-model="input.img" type="text" class="hidden" />

                <div class="absolute m-auto inset-0 w-fit h-fit">
                  <span class="text-white font-bold text-5xl">+</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex col-span-2">
          <div class="grid grid-rows-3 gap-2">
            <div class="flex">
              <input
                v-model="input.name"
                type="text"
                class="h-10 w-full border border-zinc-300 rounded focus:outline-none focus:border-2 focus:border-zinc-300 px-2 py-1"
                placeholder="品名"
              />
            </div>
            <div class="flex">
              <input
                v-model="input.brand"
                type="text"
                class="h-10 w-full border border-zinc-300 rounded focus:outline-none focus:border-2 focus:border-zinc-300 px-2 py-1"
                placeholder="品牌"
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
                <option value="單位">其他單位</option>
                <option value="g">g/克</option>
                <option value="kg">kg/公斤</option>
                <option value="ml">ml/毫升</option>
                <option value="L">L/公升</option>
                <option value="cm">cm/公分</option>
                <option value="m">m/公尺</option>
                <option value="inch">inch/英吋</option>
                <option value="EU">EU/歐碼</option>
                <option value="UK">UK/英國碼</option>
                <option value="US">US/美國碼</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
                <option value="2XL">2XL</option>
                <option value="3XL">3XL</option>
                <option value="4XL">4XL</option>
                <option value="A0">A0</option>
                <option value="A1">A1</option>
                <option value="A2">A2</option>
                <option value="A3">A3</option>
                <option value="A4">A4</option>
                <option value="A5">A5</option>
                <option value="B1">B1</option>
                <option value="B2">B2</option>
                <option value="B3">B3</option>
                <option value="B4">B4</option>
                <option value="B5">B5</option>
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
              class="h-10 w-2/4 border border-zinc-300 rounded focus:outline-none focus:border-2 focus:border-zinc-300 px-2 py-1"
            >
              <option value="" selected disabled>購買處</option>
              <option value="1">全聯</option>
              <option value="2">家樂福</option>
            </select>
            <input
              v-model="input.price"
              type="text"
              class="h-10 w-1/4 border border-zinc-300 rounded focus:outline-none focus:border-2 focus:border-zinc-300 px-2 py-1"
              placeholder="單件金額"
            />
            <select
              v-model="input.discount"
              class="h-10 w-1/4 border border-zinc-300 rounded focus:outline-none focus:border-2 focus:border-zinc-300 px-2 py-1"
            >
              <option selected disabled>優惠？</option>
              <option value="0">日常價</option>
              <option value="1">活動優惠價</option>
            </select>
          </div>
          <div class="flex">
            <input
              v-model="input.date"
              type="date"
              class="h-10 w-full border border-zinc-300 rounded focus:outline-none focus:border-2 focus:border-zinc-300 px-2 py-1"
            />
          </div>
        </div>
      </div>
      <!-- <div class="p-2 grid grid-rows-3 w-full">
        <div class="flex w-full">
          <div class="w-full border border-zinc-300 rounded">
            <input
              ref="fileInput"
              type="file"
              class="hidden"
              @change="getFileInfo()"
            />
            <input
              ref="fileInfo"
              type="text"
              class="inline-flex h-10 px-2 focus:outline-none rounded-l w-[calc(100%-5rem)] focus:border-2 focus:border-zinc-300 text-xs cursor-pointer"
              placeholder="未選取圖片"
              readonly="readonly"
              @click="openFile()"
            />
            <div
              class="w-20 h-10 p-2 bg-zinc-600 rounded-r text-white inline-flex cursor-pointer"
              @click="openFile()"
            >
              選擇圖片
            </div>
          </div>
        </div>
      </div> -->
    </div>
    <div class="w-full border-t p-2">
      <button
        class="rounded py-1 px-2 mb-2 text-white bg-zinc-500 hover:bg-zinc-600 w-fit inline-block float-left"
        @click="closeModal()"
      >
        Cancel
      </button>
      <button
        class="rounded py-1 px-2 mb-2 text-white bg-sky-500 hover:bg-sky-600 w-fit inline-block ml-2 float-right"
        @click="saveProduct()"
      >
        OK
      </button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  name: 'IndexCompo',
  props: {
    msg: {
      type: String,
      default: '',
    },
  },
  setup() {
    const products = ref(null);
    const modal = ref(null);
    const modalMask = ref(null);
    const isModalOpen = ref(false);
    const isModalClose = ref(true);
    const fileInput = ref();
    const fileInfo = ref('');
    const input = {
      img: null,
      name: null,
      brand: null,
      capacity: null,
      unit: '',
      store: '',
      price: null,
      discount: null,
      date: '2022-06-22',
    };

    const getProductList = () => {
      axios
        .get('/api/GET/products')
        .then((response) => {
          console.log('GET response', response);
          products.value = response.data.map((item) => {
            const temp = item;
            if (item.sales_channel === '1') temp.sales_channel_text = '全聯';
            else if (item.sales_channel === '2') temp.sales_channel_text = '家樂福';

            return temp;
          });
        })
        .catch((error) => {
          console.error(error);
        });
    };
    onMounted(() => {
      getProductList();
    });

    // Modal
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
    const openFile = () => {
      fileInput.value.click();
    };
    const getFileInfo = () => {
      const { size } = fileInput.value.files[0]; // byte
      let sizeStr = null;
      if (size <= 1024) sizeStr = `${size}Byte | `;
      else if (size > 1024 && size <= 1048576) {
        sizeStr = `${(size / 1024).toFixed(1)}KB | `;
      } else if (size > 1048576 && size <= 1073741824) {
        sizeStr = `${(size / 1024 / 1024).toFixed(1)}MB | `;
      } else if (size > 1073741824) sizeStr = '檔案過大 | ';

      fileInfo.value.value = sizeStr + fileInput.value.files[0].name;
      input.img = fileInput.value.files[0].name;
    };

    const saveProduct = () => {
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

    return {
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
    };
  },
};
</script>

<style scoped>
a {
  color: #42b983;
}
</style>
