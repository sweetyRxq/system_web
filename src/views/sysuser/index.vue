<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24" class="header-row">
        <el-button size="small" type="primary" icon="el-icon-plus" @click="openEditor({})">{{$t('actions.addnew')}}</el-button>
        <el-button size="small" icon="el-icon-refresh" @click="refresh">{{$t('actions.refresh')}}</el-button>
      </el-col>
      <el-col :span="24" class="second_row">
        <div class="table">
          <div class="thead">
            <div class="tr">
              <div class="th" v-for="item in header">{{item.title}}</div>
              <div class="th" style="width:200px">{{$t('common.actions')}}</div>
            </div>
          </div>
          <div class="tbody">
            <div class="tr" v-for="record in pagination.records">
              <div class="td" v-for="column in header" :key="record.code" :class="'td ' + column.class" :title="record[column.field]">
                <div class="col-title">{{column.title}}</div>
                <div class="col-value">
                  <span v-if="column.format" v-html="column.format(record[column.field])"></span>
                  <span v-else="column.format">{{getFieldValue(record, column.field)}}</span>
                </div>
              </div>
              <div class="td span adaptable">
                  <el-button type="warning" size="mini" icon="el-icon-unlock" @click="openpasswordEditor(record)" :title="$t('user.reset_password')">
                    {{$t("user.reset_password")}}
                  </el-button>
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
      </el-col>
      <el-col :span="24" v-if="pagination.totalRecord" class="footer">
        <el-pagination
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
          :current-page="pagination.page"
          :page-size="pagination.size"
          :page-sizes="[5, 10, 20, 50]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.totalRecord">
        </el-pagination>
      </el-col>
    </el-row>
    <!--增加修改对话框-->
    <userEditor ref="editor" :selectRoles="selectRoles" :selectOrgs="selectOrgs" @onOK="saveEntity"></userEditor>
    <!--重置密码对话框-->
    <userPasswordEditor ref="passwordEditor" @onOK="savePasswordEntity"></userPasswordEditor>
  </div>
</template>

<script>

  import { getJson, postJson, putJson, deleteJson }  from '@/utils/restapi'
  import userEditor from '@/views/sysuser/editor'
  import userPasswordEditor from '@/views/sysuser/passwordEditor'

  	export default {
      components:{
        userEditor,
        userPasswordEditor
      },
      data() {
        return {
          header:[
            {title: this.$t('user.account'), field: 'account', class: ''},
            {title: this.$t('user.email'), field: 'email', class: ''},
            {title: this.$t('user.role'), field: 'role', class: '',format: this.formatRoleCode},
            {title: this.$t('user.organization'), field: 'organization.name', class: ''},
            {title: this.$t('is_active'), field: 'active', class: '',format: this.formatActive}
          ],
          selectRoles:[],
          selectOrgs:[],
          dialogTitle:'',
          pagination:{
            page: 1,
            size: 10,
            totalPage: 0,
            totalRecord: 0,
            records: []
          },
          conditions: {
            page : 0,
            size : 5
          },
          passwordForm:{},
          resetPasswordVisible:false,
          searchType: false
        }
      },
      methods: {
        init(){
          getJson('api/sys/user/paginate', this.conditions, response => {
            let pagination = response.retObject
            pagination.page = pagination.page + 1
            this.pagination = pagination
          })
        },
        saveEntity(){// 保存和修改功能
          let entity = this.$refs.editor.getEntity()
          let mode = this.$refs.editor.getMode()
          if(mode == 'NEW'){
            entity.id = uuidv1();
            entity.organization = JSON.parse(entity.organization)
            entity.role = JSON.parse(entity.role)
            postJson('api/sys/user', entity, response =>{
              this.$refs.editor.close()
              this.refresh()
              this.$message.success(this.$t('saveSuccess'))
            },fail => {

            },error => {
              console.log(error)
            })
          }else{
            console.log(entity);
            entity.role = typeof entity.role =='string' ? JSON.parse(entity.role) : entity.role
            entity.organization = typeof entity.organization =='string' ? JSON.parse(entity.organization) : entity.organization
            putJson('api/sys/user', entity, response =>{
              this.$message.success(this.$t("saveSuccess"))
              this.$refs.editor.close()
              this.refresh()
            },error => {
              this.$message.error(error)
            })
          }
        },
        openEditor(item){// 打开编辑器
          this.$refs.editor.open(item)
        },
        openpasswordEditor(item){// 打开编辑器
          this.$refs.passwordEditor.open(item)
        },
        deleteEntity(item){// 删除用户
          this.$confirm(this.$t('user.delete_confirm', [item.account]), this.$t('confirm'), {
            confirmButtonText: this.$t('actions.ok'),
            cancelButtonText: this.$t('actions.cancel'),
            type: 'warning'
          }).then(() => {
            deleteJson('api/sys/user/' + item.id, {}, response => {
              this.$message({type: 'info', message: this.$t('user.delete_success', [item.account])})
              this.init()
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
        savePasswordEntity(){
          let entity = this.$refs.passwordEditor.getEntity()
          putJson('api/sys/user', entity, response =>{
            this.$message.success(this.$t("saveSuccess"))
            this.$refs.passwordEditor.close()
            this.refresh()
          },error => {
            this.$message.error(error)
          })
        },
        handleCurrentChange(val) {
          this.conditions.page = val
          this.init()
        },
        handleSizeChange(val) {
          this.conditions.size = val
          this.conditions.page = 1
          this.init()
        },
        refresh(){
          this.init()
        },
        getRoles(){
          getJson('api/sys/role', this.conditions, response => {
            if(response){
              this.selectRoles = response.retObject
            }
          })
        },
        getOrgs(){
          getJson('api/sys/organization', this.conditions, response => {
            if(response){
              this.selectOrgs = response.retObject
            }
          })
        },
        formatActive(value) {
          return value == 1 ? '<span class="activated">' + this.$t('common.activated') + '</span>' : '<span class="inactivated">' + this.$t('common.inactivated') + '</span>'
        },
        formatRoleCode(value) {
          return value ? value.name : value
        },
		getFieldValue(source, keys){
			if(keys == null) return resource
			let items = keys.split(".")
			let value = source
			for(let i=0;i<items.length;i++){
				if(value != undefined && value != null) {
					value = value[items[i]]
				}
			}
			return value
		}
      },
      created() {
        this.init()
        this.getRoles()
        this.getOrgs()
      },
      mounted() {

      }
    }
</script>
<style>
</style>
