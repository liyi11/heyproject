<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <div class="left-logo">
      <img src="../../../../assets/images/logo_text_1.png" alt="" v-if="sidebar.opened" >
      <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container">
      </hamburger>
    </div>
    <el-menu
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      mode="vertical"
      >
      <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path"></sidebar-item>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './sidebarItem'
export default {
  components: {
    SidebarItem,
    Hamburger:() => import('@/components/Hamburger')
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),

    routes() {
      return global.antRouter
    },
    isCollapse() {
      return !this.sidebar.opened
    },

  },
  data() {
        return {
        }
    },
    mounted(){
    },
    methods:{
      toggleSideBar() {
        this.$store.dispatch('ToggleSideBar')
      },
    }
}
</script>
