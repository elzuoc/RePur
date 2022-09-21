<template>
  <div class="container mx-auto px-4">
    <!-- <div class="w-full border border-solid border-slate-300 text-slate-300 rounded bg-white">
      <input
        type="text"
        class="w-[calc(100%-24px)] inline-block focus:outline-none focus:border focus-visible:border-solid focus:border-slate-400 rounded p-1"
        placeholder="Search..."
      />
      <a href="#"><img src="@/assets/icons/search.svg" class="w-6 inline-block" /></a>
    </div> -->

    <div>
      <div class="mt-4 py-4 border-b-2 border-zinc-200 border-dashed w-full">
        <div class="grid grid-cols-4 gap-1">
          <div class="flex col-span-2">
            <input
              :ref="formRefs['addFullName']"
              v-model="input.addFullName"
              type="text"
              class="h-10 w-full border border-zinc-300 rounded focus:outline-none focus:border-2 focus:border-zinc-300 px-2 py-1"
              placeholder="全名"
              @input="verifyAddInput()"
            />
          </div>
          <div class="flex">
            <div class="flex col-span-2">
              <input
                :ref="formRefs['addShortName']"
                v-model="input.addShortName"
                type="text"
                class="h-10 w-full border border-zinc-300 rounded focus:outline-none focus:border-2 focus:border-zinc-300 px-2 py-1"
                placeholder="簡稱"
                @input="verifyAddInput()"
              />
            </div>
          </div>
          <div class="flex">
            <button
              type="button"
              class="border w-full bg-emerald-500 text-white rounded"
              @click="createChannel()"
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
        v-for="item in channels"
        :key="item"
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
              <span class="font-bold truncate">{{ item.fullname }}</span>
            </div>
            <div class="flex h-5">
              <span class="text-zinc-400">{{ item.shortname }}</span>
            </div>
          </div>
        </div>
        <div class="flex">
          <div
            class="relative w-full bg-sky-700"
            :class="{ hidden: isDeleteSts }"
            @click="openEditModal(item)"
          >
            <div class="absolute m-auto inset-0 w-fit h-fit text-white">
              <img src="@/assets/icons/pencil.svg" class="w-5 inline-block" />
            </div>
          </div>
          <div
            class="relative w-full bg-red-400"
            :class="{ hidden: !isDeleteSts }"
            @click="openDeleteCheckModal(item)"
          >
            <div class="absolute m-auto inset-0 w-fit h-fit text-white">
              <img src="@/assets/icons/trash.svg" class="w-5 inline-block" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div ref="modalMask" class="fixed top-0 left-0 z-10 w-screen h-screen bg-black/[.5] hidden"></div>
  <div
    ref="modal"
    class="fixed m-auto left-0 right-0 top-0 bottom-0 z-20 w-11/12 md:w-5/12 lg:w-3/12 h-fit bg-white rounded border border-zinc-200 hidden transition-all duration-300 ease-in"
    :class="{ 'opacity-0': isModalClose, 'opacity-100': isModalOpen }"
  >
    <div class="w-full border-b p-2 font-bold">請注意</div>
    <div class="w-full min-h-[50px] p-2">您即將刪除資料：{{ input.delFullName }}</div>
    <div class="w-full border-t p-2">
      <button
        class="rounded py-1 px-2 text-white bg-zinc-500 hover:bg-zinc-600 w-fit inline-block float-left"
        @click="closeModal()"
      >
        Cancel
      </button>
      <button
        class="rounded py-1 px-2 text-white bg-sky-500 hover:bg-sky-600 w-fit inline-block ml-2 float-right"
        @click="delChannel()"
      >
        OK
      </button>
    </div>
  </div>

  <div
    ref="editModal"
    class="fixed m-auto left-0 right-0 top-0 bottom-0 z-20 w-11/12 md:w-8/12 lg:w-5/12 h-fit bg-white rounded border border-zinc-200 hidden transition-all duration-300 ease-in"
    :class="{ 'opacity-0': !isEditModalOpen, 'opacity-100': isEditModalOpen }"
  >
    <div class="w-full border-b p-2 font-bold text-left">編輯購物管道</div>
    <div class="w-full min-h-[50px] p-2">
      <div class="grid grid-cols-3 gap-2">
        <div class="flex col-span-2">
          <input
            :ref="formRefs['editFullName']"
            v-model="input.editFullName"
            type="text"
            class="h-10 w-full border border-zinc-300 rounded focus:outline-none focus:border-2 focus:border-zinc-300 px-2 py-1"
            placeholder="全名"
            @input="verifyInput()"
          />
        </div>
        <div class="flex">
          <input
            :ref="formRefs['editShortName']"
            v-model="input.editShortName"
            type="text"
            class="h-10 w-full border border-zinc-300 rounded focus:outline-none focus:border-2 focus:border-zinc-300 px-2 py-1"
            placeholder="簡稱"
            @input="verifyInput()"
          />
        </div>
      </div>
    </div>
    <div class="w-full border-t p-2">
      <button
        class="rounded py-1 px-2 mb-2 text-white bg-zinc-500 hover:bg-zinc-600 w-fit inline-block float-left"
        @click="closeEditModal()"
      >
        Cancel
      </button>
      <button
        class="rounded py-1 px-2 mb-2 text-white bg-sky-500 hover:bg-sky-600 w-fit inline-block ml-2 float-right"
        @click="editChannel()"
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
    const channels = ref(null);
    const formRefs = {
      // new
      addFullName: ref(null),
      addShortName: ref(null),
      // edit
      editFullName: ref(null),
      editShortName: ref(null),
    };
    const input = {
      // new
      addFullName: null,
      addShortName: null,
      // edit
      editId: null,
      editFullName: null,
      editShortName: null,
      // delete
      delId: null,
      delFullName: null,
    };

    // edit
    const editModal = ref(null);
    const isEditModalOpen = ref(false);

    const getChannelList = () => {
      axios
        .get('/api/GET/channels')
        .then((res) => {
          // console.log(res);
          channels.value = res.data;
        })
        .catch((error) => console.log(error));
    };

    const focusInput = (field) => {
      formRefs[field].value.classList.add('border-red-400', 'focus:border-red-400');

      return false;
    };

    const restoreInput = (field) => {
      formRefs[field].value.classList.remove('border-red-400', 'focus:border-red-400');
    };

    // create form
    const verifyAddInput = () => {
      restoreInput('addFullName');
      restoreInput('addShortName');

      if (!input.addFullName) return focusInput('addFullName');
      if (!input.addShortName) return focusInput('addShortName');

      return true;
    };

    const createChannel = () => {
      if (!verifyAddInput()) return;

      const params = {
        fullname: input.addFullName,
        shortname: input.addShortName,
      };

      axios
        .post(`/api/POST/channels`, params)
        .then(() => getChannelList())
        .catch((error) => console.log(error));
    };

    // edit form
    const verifyInput = () => {
      restoreInput('editFullName');
      restoreInput('editShortName');

      if (!input.editFullName) return focusInput('editFullName');
      if (!input.editShortName) return focusInput('editShortName');

      return true;
    };

    const openEditModal = (dataInfo) => {
      editModal.value.style.display = 'block';
      modalMask.value.style.display = 'block';
      isEditModalOpen.value = true;

      input.editId = dataInfo.id;
      input.editFullName = dataInfo.fullname;
      input.editShortName = dataInfo.shortname;
    };

    const closeEditModal = () => {
      editModal.value.style.display = 'none';
      modalMask.value.style.display = 'none';
      isEditModalOpen.value = false;

      input.editId = null;
      input.editFullName = null;
      input.editShortName = null;
    };

    const editChannel = () => {
      if (!verifyInput()) return;

      const params = {
        fullname: input.editFullName,
        shortname: input.editShortName,
      };

      axios
        .patch(`/api/PATCH/channels/${input.editId}`, params)
        .then(() => {
          getChannelList();
          closeEditModal();
        })
        .catch((error) => console.log(error));
    };

    // delete form
    const changeStatus = () => {
      if (isDeleteSts.value) isDeleteSts.value = false;
      else isDeleteSts.value = true;
    };
    const openDeleteCheckModal = (dataInfo) => {
      modal.value.style.display = 'block';
      modalMask.value.style.display = 'block';
      isModalOpen.value = true;
      isModalClose.value = false;

      input.delId = dataInfo.id;
      input.delFullName = dataInfo.fullname;
    };
    const closeModal = () => {
      modal.value.style.display = 'none';
      modalMask.value.style.display = 'none';
      isModalOpen.value = false;
      isModalClose.value = true;
    };
    const delChannel = () => {
      axios
        .delete(`/api/DELETE/channels/${input.delId}`)
        .then((response) => {
          console.log(response);
          getChannelList();
          closeModal();
        })
        .catch((error) => console.log(error));
    };

    // life-cycle
    onMounted(() => {
      getChannelList();
    });

    return {
      isDeleteSts,
      modal,
      modalMask,
      isModalOpen,
      isModalClose,
      changeStatus,
      openDeleteCheckModal,
      closeModal,
      openEditModal,
      closeEditModal,
      channels,
      getChannelList,
      // form
      formRefs,
      editModal,
      isEditModalOpen,
      createChannel,
      input,
      verifyInput,
      verifyAddInput,
      editChannel,
      // del
      delChannel,
    };
  },
};
</script>

<style scoped>
a {
  color: #42b983;
}
</style>
