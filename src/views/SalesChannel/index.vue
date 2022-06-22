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
      <a href="#"
        ><img src="@/assets/icons/search.svg" class="w-6 inline-block"
      /></a>
    </div>

    <div>
      <div class="mt-4 py-4 border-y-2 border-zinc-200 border-dashed w-full">
        <div class="grid grid-cols-4 gap-1">
          <div class="flex col-span-2">
            <input
              type="text"
              class="border w-full rounded"
              placeholder="全名"
            />
          </div>
          <div class="flex">
            <div class="flex col-span-2">
              <input
                type="text"
                class="border w-full rounded"
                placeholder="簡稱"
              />
            </div>
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
      <div
        class="flex grid grid-cols-4 gap-1 border h-16 p-2"
        :class="{
          'border-sky-700': !isDeleteSts,
          'border-red-400': isDeleteSts,
          'bg-red-100': isDeleteSts,
        }"
      >
        <div class="flex col-span-3" @click="changeStatus()">
          <div class="flex grid gap-1 text-left">
            <div class="flex h-5 overflow-hidden">
              <span class="font-bold truncate"> 全聯福利中心 </span>
            </div>
            <div class="flex h-5"><span class="text-zinc-400">全聯</span></div>
          </div>
        </div>
        <div class="flex">
          <div v-if="!isDeleteSts" class="relative w-full bg-sky-700">
            <div class="absolute m-auto inset-0 w-fit h-fit text-white">
              <img src="@/assets/icons/pencil.svg" class="w-5 inline-block" />
            </div>
          </div>
          <div
            v-else
            class="relative w-full bg-red-400"
            @click="openDeleteCheckModal()"
          >
            <div class="absolute m-auto inset-0 w-fit h-fit text-white">
              <img src="@/assets/icons/trash.svg" class="w-5 inline-block" />
            </div>
          </div>
        </div>
      </div>

      <div
        class="flex grid grid-cols-4 gap-1 border h-16 p-2"
        :class="{
          'border-sky-700': !isDeleteSts,
          'border-red-400': isDeleteSts,
          'bg-red-100': isDeleteSts,
        }"
      >
        <div class="flex col-span-3" @click="changeStatus()">
          <div class="flex grid gap-1 text-left">
            <div class="flex h-5 overflow-hidden">
              <span class="font-bold truncate"> 全聯福利中心 </span>
            </div>
            <div class="flex h-5"><span class="text-zinc-400">全聯</span></div>
          </div>
        </div>
        <div class="flex">
          <div v-if="!isDeleteSts" class="relative w-full bg-sky-700">
            <div class="absolute m-auto inset-0 w-fit h-fit text-white">
              <img src="@/assets/icons/pencil.svg" class="w-5 inline-block" />
            </div>
          </div>
          <div
            v-else
            class="relative w-full bg-red-400"
            @click="openDeleteCheckModal()"
          >
            <div class="absolute m-auto inset-0 w-fit h-fit text-white">
              <img src="@/assets/icons/trash.svg" class="w-5 inline-block" />
            </div>
          </div>
        </div>
      </div>

      <div
        class="flex grid grid-cols-4 gap-1 border h-16 p-2"
        :class="{
          'border-sky-700': !isDeleteSts,
          'border-red-400': isDeleteSts,
          'bg-red-100': isDeleteSts,
        }"
      >
        <div class="flex col-span-3" @click="changeStatus()">
          <div class="flex grid gap-1 text-left">
            <div class="flex h-5 overflow-hidden">
              <span class="font-bold truncate"> 全聯福利中心 </span>
            </div>
            <div class="flex h-5"><span class="text-zinc-400">全聯</span></div>
          </div>
        </div>
        <div class="flex">
          <div v-if="!isDeleteSts" class="relative w-full bg-sky-700">
            <div class="absolute m-auto inset-0 w-fit h-fit text-white">
              <img src="@/assets/icons/pencil.svg" class="w-5 inline-block" />
            </div>
          </div>
          <div
            v-else
            class="relative w-full bg-red-400"
            @click="openDeleteCheckModal()"
          >
            <div class="absolute m-auto inset-0 w-fit h-fit text-white">
              <img src="@/assets/icons/trash.svg" class="w-5 inline-block" />
            </div>
          </div>
        </div>
      </div>
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
    <div class="w-full border-b p-2 font-bold">請注意</div>
    <div class="w-full min-h-[50px] p-2">您即將刪除資料：全聯福利中心</div>
    <div class="w-full border-t p-2">
      <button
        class="rounded py-1 px-2 text-white bg-zinc-500 hover:bg-zinc-600 w-fit inline-block float-left"
        @click="closeModal()"
      >
        Cancel
      </button>
      <button
        class="rounded py-1 px-2 text-white bg-sky-500 hover:bg-sky-600 w-fit inline-block ml-2 float-right"
      >
        OK
      </button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'SalesChannel',
  props: {
    msg: {
      type: String,
      default: '',
    },
  },
  setup() {
    const isDeleteSts = ref(false);
    const modal = ref(null);
    const modalMask = ref(null);
    const isModalOpen = ref(false);
    const isModalClose = ref(true);

    const changeStatus = () => {
      if (isDeleteSts.value) isDeleteSts.value = false;
      else isDeleteSts.value = true;
    };
    const openDeleteCheckModal = () => {
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
    };
    return {
      isDeleteSts,
      modal,
      modalMask,
      isModalOpen,
      isModalClose,
      changeStatus,
      openDeleteCheckModal,
      closeModal,
    };
  },
};
</script>

<style scoped>
a {
  color: #42b983;
}
</style>
