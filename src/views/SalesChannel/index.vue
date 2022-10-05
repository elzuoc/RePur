<template src="./template.html" />

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const isDeleteSts = ref(false);
const modal = ref(null);
const modalMask = ref(null);
const isModalOpen = ref(false);
const isModalClose = ref(true);
const channels = ref([]);
const isVerify = ref(false);
const focusFullName = ref(false);
const focusShortName = ref(false);
const focusEditFullName = ref(false);
const focusEditShortName = ref(false);
// eslint-disable-next-line no-unused-vars
const formRefs = ref({
  // new
  addFullName: null,
  addShortName: null,
  // edit
  editFullName: null,
  editShortName: null,
});
const input = {
  // new
  addFullName: '',
  addShortName: '',
  // edit
  editId: 0,
  editFullName: '',
  editShortName: '',
  // delete
  delId: 0,
  delFullName: '',
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

const restoreInput = (behavior) => {
  if (behavior === 'add') {
    focusFullName.value = false;
    focusShortName.value = false;
  } else if (behavior === 'edit') {
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

// eslint-disable-next-line no-unused-vars
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

// eslint-disable-next-line no-unused-vars
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
// eslint-disable-next-line no-unused-vars
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
</script>

<style scoped>
a {
  color: #42b983;
}
</style>
