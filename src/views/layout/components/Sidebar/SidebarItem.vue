<template>
  <div class="menu-wrapper">
    <template v-for="item in routes" v-if="!item.hidden&&item.children">

      <!--<router-link v-if="!hasChildren(item)" :to="item.path+'/'+item.children[0].path"-->
        <!--:key="item.children[0].name">-->
        <!--<el-menu-item :index="item.path+'/'+item.children[0].path" :class="{'submenu-title-noDropdown':!isNest}">-->
          <!--<svg-icon v-if="item.children[0].meta&&item.children[0].meta.icon" :icon-class="item.children[0].meta.icon"></svg-icon>-->
          <!--<span v-if="item.children[0].meta&&item.children[0].meta.title" slot="title">{{item.children[0].meta.title + 111}}</span>-->
        <!--</el-menu-item>-->
      <!--</router-link>-->

      <el-submenu v-if="hasChildren(item)" :index="item.name||item.path" :key="item.name">
        <template slot="title">
          <svg-icon v-if="item.meta&&item.meta.icon" :icon-class="item.meta.icon"></svg-icon>
          <span v-if="item.name" slot="title">{{item.name}}</span>
        </template>

        <template v-for="child in item.children" v-if="!child.hidden">
          <sidebar-item :is-nest="true" class="nest-menu" v-if="child.children&&child.children.length>0" :routes="[child]" :key="child.name"></sidebar-item>
          <router-link v-else :to="child.path" :key="child.name">
            <el-menu-item :index="child.path">
              <svg-icon v-if="child.meta&&child.meta.icon" :icon-class="child.meta.icon"></svg-icon>
              <span v-if="child.meta&&child.name" slot="title">{{child.name}}</span>
            </el-menu-item>
          </router-link>
        </template>
      </el-submenu>

      <router-link v-else :to="item.path" :key="item.name">
        <el-menu-item :index="item.path" :class="{'submenu-title-noDropdown':!isNest}">
          <svg-icon v-if="item.meta&&item.meta.icon" :icon-class="item.meta.icon"></svg-icon>
          <span  slot="title">{{item.name}}</span>
        </el-menu-item>
      </router-link>


    </template>
  </div>
</template>

<script>
export default {
  name: 'SidebarItem',
  props: {
    routes: {
      type: Array
    },
    isNest: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    hasChildren(item) {

      if(!item.hidden && item.children.length>0 && item.children[0].path!='' ){
        return true
      } else {
        return false
      }

    }
  }
}
</script>
