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
        <div class="tr" v-for="record in pagination.records">
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
    <MenuEditor ref="editor" :funsOptions="funsOptions" :allMenusData="allMenusData" @onOK="saveEntity"></MenuEditor>
  </div>

</template>

<script>
  import { getJson, postJson, putJson, deleteJson }  from '@/utils/restapi'
  import MenuEditor from '@/views/sysmenu/editor'
  export default {
    components : {MenuEditor},
    data() {
      return {
        header: [
          {title: this.$t('menu.name'), field: 'name', class: ''},
          {title: this.$t('menu.code'), field: 'code', class: ''},
          {title: this.$t('menu.icon'), field: 'icon', class: '', format: this.formatIcon},
          {title: this.$t('menu.parent_code'), field: 'parentCode', class: ''},
          {title: this.$t('menu.description'), field: 'description', class: ''}
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
        funsOptions: [],
        allMenusData: [],
        searchType: false
      }
    },
    created: function(){
      this.doSearch()
      this.getFunctionsData()
      this.getAllMenuData()
    },
    methods: {
      doSearch() {
        getJson('api/sys/menu/paginate', this.conditions, response => {
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
          console.log(entity);
          if(entity.function){
            entity.function = JSON.parse(entity.function);
          }
          postJson('api/sys/menu', entity, response =>{
            this.$refs.editor.close()
            this.doSearch()
            this.getAllMenuData()
            this.$message.success(this.$t('saveSuccess'))
          })
        }else{
          console.log(entity);
          if(typeof entity.function === 'string'){
            entity.function = JSON.parse(entity.function);
          }
          putJson('api/sys/menu', entity, response =>{
            this.$refs.editor.close()
            this.doSearch()
            this.getAllMenuData()
            this.$message.success(this.$t('saveSuccess'))
          })
        }
      },
      deleteEntity(item){// 删除菜单
        this.$confirm(this.$t('menu.delete_confirm', [item.name]), this.$t('confirm'), {
          confirmButtonText: this.$t('actions.ok'),
          cancelButtonText: this.$t('actions.cancel'),
          type: 'warning'
        }).then(() => {
          deleteJson('api/sys/menu/' + item.code, {}, response => {
            this.$message({type: 'info', message: this.$t('menu.delete_success', [item.name])})
            this.doSearch()
            this.getAllMenuData()
            if(this.pagination.records.length == 1){
              this.conditions.page -= 1
            }
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
          const options = response.retObject
          for(let key in options){
            this.funsOptions.push(options[key])
          }
        })
      },
      getAllMenuData(){
        getJson('api/sys/menu', null, response => {
          const options = response.retObject
          for(let key in options){
            this.allMenusData.push(options[key])
          }
        })
      },
      formatIcon(value){
        return value ? `<i class="el-icon-${value}"></i>` : value
      }
    }
  }
</script>
<style>
</style>
