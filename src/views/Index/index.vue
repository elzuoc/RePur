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
      <div
        v-for="item in products"
        :key="item"
        class="flex grid grid-cols-3 gap-1 border"
      >
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

  <div
    ref="modalMask"
    class="fixed top-0 left-0 z-10 w-screen h-screen bg-black/[.5] hidden"
  ></div>
  <div
    ref="modal"
    class="fixed m-auto left-0 right-0 top-0 bottom-0 z-20 w-11/12 md:w-5/12 lg:w-3/12 h-fit bg-white rounded border border-zinc-200 hidden transition-all duration-300 ease-in"
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
                  @change="getFileInfo()"
                />
                <input
                  ref="fileInfo"
                  type="text"
                  class="hidden"
                  placeholder="未選取圖片"
                  @click="openFile()"
                />
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
                type="text"
                class="h-10 w-full border border-zinc-300 rounded focus:outline-none focus:border-2 focus:border-zinc-300 px-2 py-1"
                placeholder="品名"
              />
            </div>
            <div class="flex">
              <input
                type="text"
                class="h-10 w-full border border-zinc-300 rounded focus:outline-none focus:border-2 focus:border-zinc-300 px-2 py-1"
                placeholder="品牌"
              />
            </div>
            <div class="flex">
              <input
                type="text"
                class="h-10 w-1/2 border border-zinc-300 rounded focus:outline-none focus:border-2 focus:border-zinc-300 px-2 py-1"
                placeholder="容量/重量"
              />
              <select
                class="h-10 w-1/2 border border-zinc-300 rounded focus:outline-none focus:border-2 focus:border-zinc-300 px-2 py-1"
              >
                <option selected disabled>單位</option>
                <option>其他單位</option>
                <option value="g/克">g/克</option>
                <option>kg/公斤</option>
                <option>ml/毫升</option>
                <option>L/公升</option>
                <option>cm/公分</option>
                <option>m/公尺</option>
                <option>inch/英吋</option>
                <option>EU/歐碼</option>
                <option>UK/英國碼</option>
                <option>US/美國碼</option>
                <option>S</option>
                <option>M</option>
                <option>L</option>
                <option>XL</option>
                <option>2XL</option>
                <option>3XL</option>
                <option>4XL</option>
                <option>A0</option>
                <option>A1</option>
                <option>A2</option>
                <option>A3</option>
                <option>A4</option>
                <option>A5</option>
                <option>B1</option>
                <option>B2</option>
                <option>B3</option>
                <option>B4</option>
                <option>B5</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div class="flex mt-2 w-full">
        <div class="grid grid-rows-2 gap-2 w-full">
          <div class="flex">
            <select
              class="h-10 w-2/4 border border-zinc-300 rounded focus:outline-none focus:border-2 focus:border-zinc-300 px-2 py-1"
            >
              <option selected disabled>購買處</option>
              <option>全聯</option>
              <option>家樂福</option>
            </select>
            <input
              type="text"
              class="h-10 w-1/4 border border-zinc-300 rounded focus:outline-none focus:border-2 focus:border-zinc-300 px-2 py-1"
              placeholder="單件金額"
            />
            <select
              class="h-10 w-1/4 border border-zinc-300 rounded focus:outline-none focus:border-2 focus:border-zinc-300 px-2 py-1"
            >
              <option selected disabled>優惠？</option>
              <option>日常價</option>
              <option>活動優惠價</option>
            </select>
          </div>
          <div class="flex">
            <input
              type="date"
              class="h-10 w-full border border-zinc-300 rounded focus:outline-none focus:border-2 focus:border-zinc-300 px-2 py-1"
              value="2022-06-22"
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
      >
        OK
      </button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

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

    onMounted(() => {
      fetch('/api/GET/products')
        .then((res) => res.json())
        .then((json) => {
          products.value = json.products.map((item) => {
            const temp = item;
            if (item.sales_channel === '1') temp.sales_channel_text = '全聯';
            else if (item.sales_channel === '2')
              temp.sales_channel_text = '家樂福';

            return temp;
          });

          console.log(products.value);
        });
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
      let sizeStr = '';
      if (size <= 1024) sizeStr = `${size}Byte | `;
      else if (size > 1024 && size <= 1048576) {
        sizeStr = `${(size / 1024).toFixed(1)}KB | `;
      } else if (size > 1048576 && size <= 1073741824) {
        sizeStr = `${(size / 1024 / 1024).toFixed(1)}MB | `;
      } else sizeStr = '檔案過大 | ';

      fileInfo.value.value = sizeStr + fileInput.value.files[0].name;
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
    };
  },
};
</script>

<style scoped>
a {
  color: #42b983;
}
</style>
