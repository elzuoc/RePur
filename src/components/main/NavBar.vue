<template>
  <nav ref="navbar" class="fixed top-0 z-10 w-full bg-zinc-100 shadow-sm">
    <div class="max-w-full mx-auto px-2 sm:px-8 lg:px-8">
      <div class="relative flex items-center justify-between h-12">
        <router-link to="/">
          <img
            class="block h-6 w-auto ml-2.5 text-black"
            src="@/assets/img/logo_01.png"
            alt="Workflow"
        /></router-link>

        <div class="inline-flex h-6">
          <div>{{ pageTitle }}</div>

          <SideMenu /><!-- Mobile menu button-->
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { ref, onMounted, onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';
import SideMenu from '../SideMenu.vue';

export default {
  name: 'NavBarComponent',
  components: {
    SideMenu,
  },
  setup() {
    const route = useRoute();
    const pageTitle = ref(null);
    const isMenuToggleOn = ref(false);
    const isUserToggleOn = ref(false);
    const navbar = ref(null);

    const menuToggle = () => {
      if (isMenuToggleOn.value === false) isMenuToggleOn.value = true;
      else isMenuToggleOn.value = false;
    };

    const userToggle = () => {
      if (isUserToggleOn.value === false) isUserToggleOn.value = true;
      else isUserToggleOn.value = false;
    };

    const handleScroll = (e) => {
      const { scrollTop } = e.target.scrollingElement;
      if (scrollTop === 0) {
        navbar.value.style.backgroundColor = 'rgba(255 255 255 / .4)';
      } else {
        navbar.value.style.backgroundColor = 'rgba(255 255 255 / .9)';
      }

      navbar.value.style.transition = 'all .3s';
    };

    onBeforeMount(() => {
      const path = route.path.replace('/', '');
      console.log(path);
      switch (path) {
        case 'SalesChannel':
          pageTitle.value = '購物管道設定';
          break;
        case 'Export':
          pageTitle.value = '匯出商品紀錄';
          break;
        default:
          pageTitle.value = '常購商品';
          break;
      }
    });
    onMounted(() => {
      // window.addEventListener('scroll', handleScroll());
      window.addEventListener('scroll', (e) => handleScroll(e));
    });

    return {
      pageTitle,
      // params
      isMenuToggleOn,
      isUserToggleOn,
      navbar,

      // methods
      menuToggle,
      userToggle,
    };
  },
};
</script>
