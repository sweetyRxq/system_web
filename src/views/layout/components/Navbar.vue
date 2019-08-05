<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
    <breadcrumb></breadcrumb>
    <el-dropdown class="avatar-container" trigger="click" placement="bottom">
      <div class="avatar-wrapper">
        <img class="user-avatar" src="@/assets/images/girl.png">
        <span class="user-account">{{userData.account}}
        <i class="el-icon-caret-bottom"></i>
        </span>
      </div>
      <el-dropdown-menu class="user-dropdown" slot="dropdown">
        <router-link class="inlineBlock" to="/home">
          <el-dropdown-item>
            {{$t('home')}}
          </el-dropdown-item>
        </router-link>
        <el-dropdown-item>
          <span @click="logout" style="display:block;">{{$t('signout')}}</span>
        </el-dropdown-item>
<!--        <el-dropdown-item divided><span @click="handleCommand('zh')">简体中文</span></el-drogit-->
      </el-dropdown-menu>
    </el-dropdown>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import { setup } from '@/locales'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'userData'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    },
    handleCommand(local){
      this.$i18n.locale=local
      setup(local)
      location.reload()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;
    .avatar-wrapper {
      cursor: pointer;
      position: relative;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
        margin-top: 5px;
        margin-right: 5px;
      }
      .user-account{
        float: right;
      }
    }
  }
}
</style>

