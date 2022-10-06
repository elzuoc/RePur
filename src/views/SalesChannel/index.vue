<template src="./template.html" />

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import SuccessMsg from '../../components/SuccessMsg.vue'; // eslint-disable-line no-unused-vars
import FailedMsg from '../../components/FailedMsg.vue'; // eslint-disable-line no-unused-vars
import ApiErrorMsg from '../../components/ApiErrorMsg.vue'; // eslint-disable-line no-unused-vars

const isDeleteSts = ref(false);
const modal = ref(null);
const modalMask = ref(null);
const isModalOpen = ref(false);
const isModalClose = ref(true);
const channelList = ref([]);
const isVerify = ref(false);
const focusFullName = ref(false);
const focusShortName = ref(false);
const focusEditFullName = ref(false);
const focusEditShortName = ref(false);
// eslint-disable-next-line no-unused-vars
const formRefs = ref({
  addFullName: null,
  addShortName: null,

  editFullName: null,
  editShortName: null,
});
const input = {
  addFullName: '',
  addShortName: '',

  editId: 0,
  editFullName: '',
  editShortName: '',

  delId: 0,
  delFullName: '',
};

// edit
const editModal = ref(null);
const isEditModalOpen = ref(false);

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

const getChannelList = () => {
  return axios
    .get('/api/GET/channels')
    .then((res) => res.data)
    .catch((error) => console.error(error));
};

const restoreInput = (behavior) => {
  if (behavior === 'add') {
    focusFullName.value = false;
    focusShortName.value = false;
  } else {
    focusEditFullName.value = false;
    focusEditShortName.value = false;
  }
};

// create form
const verifyAddInput = () => {
  isVerify.value = true;
  restoreInput('add');

  if (!input.addFullName) {
    focusFullName.value = true;
    return false;
  }
  if (!input.addShortName) {
    focusShortName.value = true;
    return false;
  }

  isVerify.value = false;
  return true;
};

const initCreateParams = () => {
  input.addFullName = '';
  input.addShortName = '';
};

const apiCreateChannel = (params) => axios.post(`/api/POST/channels`, params);
// eslint-disable-next-line no-unused-vars
const createChannel = async () => {
  if (!verifyAddInput()) return;

  const params = {
    fullname: input.addFullName,
    shortname: input.addShortName,
  };

  try {
    const { status } = await apiCreateChannel(params);

    if (status === 201) {
      channelList.value = await getChannelList();
      showSuccessMsg();
    } else {
      showFailedMsg();
    }

    initCreateParams();
  } catch (error) {
    showApiErrorMsg(error);
  }
};

// edit form
const verifyInput = () => {
  isVerify.value = true;
  restoreInput('edit');

  if (!input.editFullName) {
    focusEditFullName.value = true;
    return false;
  }
  if (!input.editShortName) {
    focusEditShortName.value = true;
    return false;
  }

  isVerify.value = false;
  return true;
};

// eslint-disable-next-line no-unused-vars
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

const apiEditChannel = (params) => axios.patch(`/api/PATCH/channels/${input.editId}`, params);
// eslint-disable-next-line no-unused-vars
const editChannel = async () => {
  if (!verifyInput()) return;

  const params = {
    fullname: input.editFullName,
    shortname: input.editShortName,
  };

  try {
    const { status } = await apiEditChannel(params);

    closeEditModal();
    if (status === 200) {
      channelList.value = await getChannelList();
      showSuccessMsg();
    } else {
      showFailedMsg();
    }
  } catch (error) {
    closeEditModal();
    showApiErrorMsg(error);
  }
};

// delete form
// eslint-disable-next-line no-unused-vars
const changeStatus = () => {
  if (isDeleteSts.value) isDeleteSts.value = false;
  else isDeleteSts.value = true;
};
// eslint-disable-next-line no-unused-vars
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

const apiDelChannel = () => axios.delete(`/api/DELETE/channels/${input.delId}`);
// eslint-disable-next-line no-unused-vars
const delChannel = async () => {
  try {
    const { status } = await apiDelChannel();

    closeModal();
    if (status === 204) {
      channelList.value = await getChannelList();
      showSuccessMsg();
    } else {
      showFailedMsg();
    }
  } catch (error) {
    closeModal();
    showApiErrorMsg(error);
  }
};

// life-cycle
onMounted(async () => {
  channelList.value = await getChannelList();
});
</script>

<script>
export default {
  name: 'SalesChannel',
};
</script>

<style scoped>
a {
  color: #42b983;
}
</style>
