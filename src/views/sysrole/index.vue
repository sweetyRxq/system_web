<template>
  <div class="app-container">
    <div class="page-header">
      <el-button type="primary" size="small" icon="el-icon-plus" @click="openEditor({})">{{$t('actions.addnew')}}</el-button>
      <el-button size="small" icon="el-icon-refresh" @click="refresh">{{$t('actions.refresh')}}</el-button>
    </div>
    <div class="table">
      <div class="thead">
        <div class="tr">
          <div class="th" v-for="item in header">{{item.title}}</div>
          <div class="th" style="width:140px">{{$t('common.actions')}}</div>
        </div>
      </div>
      <div class="tbody">
        <div class="tr" v-if="pagination.records" v-for="record in pagination.records">
          <div v-for="column in header"  :class="'td ' + column.class" :title="record[column.field]">
            <div class="col-title">{{column.title}}</div>
            <div class="col-value">
              <span v-if="column.format" v-html="column.format(record[column.field])"></span>
              <span v-else="column.format">{{record[column.field]}}</span>
            </div>
          </div>
          <div class="td span adaptable">
            <el-button type="primary" size="mini" icon="el-icon-edit" @click="openEditor(JSON.stringify(record))" :title="$t('actions.edit')">
              {{$t('actions.edit')}}
            </el-button>
            <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteEntity(record)" :title="$t('actions.delete')">
              {{$t('actions.delete')}}
            </el-button>
          </div>
        </div>
      </div>
      <div class="tfooter" v-if="!pagination.totalRecord">
        <span v-if="searchType">{{$t('search_table_null')}}</span>
        <span v-else="searchType">{{$t('table_null')}}</span>
      </div>
    </div>
    <div class="footer" v-if="pagination.totalRecord">
      <el-pagination
              @current-change="changePage"
              @size-change="changePageSize"
              :current-page="pagination.page"
              :page-size="pagination.size"
              :page-sizes="[5, 10, 20, 50]"
              layout="total, sizes, prev, pager, next, jumper"
              :total="pagination.totalRecord">
      </el-pagination>
    </div>
    <RoleEditor ref="editor" :functionsOptions="functionsOptions" @onOK="saveEntity"></RoleEditor>
  </div>

</template>

<script>
  import { getJson, postJson, putJson, deleteJson }  from '@/utils/restapi'
  import RoleEditor from '@/views/sysrole/editor'
  export default {
    components : {RoleEditor},
    data() {
      return {
        header: [
          {title: this.$t('role.code'), field: 'code', class: ''},
          {title: this.$t('role.name'), field: 'name', class: ''},
          {title: this.$t('role.functions'), field: 'functions', class: 'center', format: this.formatFunctions},
          {title: this.$t('role.description'), field: 'description', class: ''},
        ],
        pagination : {
          page: 1,
          size: 10,
          totalPage: 0,
          totalRecord: 0,
          records: []
        },
        conditions: {
          page : 0,
          size : 10
        },
        functionsOptions:[],
        searchType: false
      }
    },
    created: function(){
      this.doSearch()
      this.getFunctionsData()
    },
    methods: {
      doSearch() {
        getJson('api/sys/role/paginate', this.conditions, response => {
          let pagination = response.retObject
          pagination.page = pagination.page + 1
          this.pagination = pagination
        })
      },
      refresh(){
        this.doSearch()
      },
      changePage(page) {
        this.conditions.page = page - 1;
        this.doSearch()
      },
      changePageSize(size){
        this.conditions.size = size
        this.doSearch()
      },
      openEditor(item){// 打开编辑器
        this.$refs.editor.open(item)
      },
      saveEntity(){// 保存和修改功能
        let entity = this.$refs.editor.getEntity()
        let mode = this.$refs.editor.getMode()
        if(mode == 'NEW'){
          if(entity.functions.length > 0){
            entity.functions = entity.functions.map(item => {
              return JSON.parse(item);
            })
          }
          postJson('api/sys/role', entity, response =>{
            this.$refs.editor.close()
            this.doSearch()
          })
        }else{
          if(entity.functions.length > 0){
            entity.functions = entity.functions.map(item => {
              let data = item;
              if(typeof item === 'string'){
                data = JSON.parse(item);
              }
              return data
            })
          }
          putJson('api/sys/role', entity, response =>{
            this.$refs.editor.close()
            this.doSearch()
          })
        }
      },
      deleteEntity(item){// 删除功能
        this.$confirm(this.$t('function.delete_confirm', [item.name]), this.$t('confirm'), {
          confirmButtonText: this.$t('actions.ok'),
          cancelButtonText: this.$t('actions.cancel'),
          type: 'warning'
        }).then(() => {
          deleteJson('api/sys/role/' + item.code, {}, response => {
            this.$message({type: 'info', message: this.$t('function.delete_success', [item.name])})
            if(this.pagination.records.length == 1){
              this.conditions.page -= 1
            }
            this.doSearch()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('delete_aborted')
          });
        });
      },
      getFunctionsData(){
        getJson('api/sys/function', null, response => {
          let options = response.retObject,
              menuList = [],
              menuChildrenList = []
          options.forEach((item,index) => {
            if(item.type == 'MENU'){
              menuList.push(item)
            }else{
              menuChildrenList.push(item)
            }
          })
          this.functionsOptions = this.cascaderOptions(menuList,menuChildrenList)
        })
      },
      cascaderOptions(menu,children){
        let options = []
        menu.forEach(item => {
          let child = [],
              menuType = item.code.split('_')[1]
          children.forEach(citem => {
            let childrenType = citem.category.split('_')[1]
            if(menuType == childrenType){
              child.push({
                value: JSON.stringify(citem),
                label: citem.name
              })
            }
          })
          options.push({
            value: JSON.stringify(item),
            label: item.name,
            children: child
          })
        })
        return options
      },
      formatFunctions(value){
        let functions = JSON.parse(JSON.stringify(value)),
            result = ''

        if(functions.length > 0){
          functions.forEach((item,index) => {
            result += `<option disabled>${item.name}</option>`

          })
        }
        return `<select class="el-select role-select"><option>${this.$t('role.functionList')}</option>${result}</select>`
      }
    }
  }
</script>
<style>
  .role-select{
    border-color: rgba(0,0,0,0);
  }
</style>
