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
		                <el-button type="primary" size="mini" icon="el-icon-edit" @click="openEditor(record)" :title="$t('actions.edit')">
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
		<FunctionEditor ref="editor" @onOK="saveEntity"></FunctionEditor>
  	</div>
	
</template>

<script>
	import { getJson, postJson, putJson, deleteJson }  from '@/utils/restapi'
	import FunctionEditor from '@/views/sysfunction/editor'
  	export default {
		// 注册依赖组件
		components : {FunctionEditor},
    	data() {
      	  	return {
				// 定义表格字段
        		header: [
        			{title: this.$t('common.code'), field: 'code', class: ''},
					{title: this.$t('common.name'), field: 'name', class: ''},
					{title: this.$t('function.category'), field: 'category', class: ''},
					{title: this.$t('common.type'), field: 'type', class: 'center', format: this.formatType}
        		],
				// 翻页数据格式
				pagination : {
					page: 1,
					size: 10,
					totalPage: 0,
					totalRecord: 0,
					records: []
				},
				// 查询条件
				conditions: {
					page : 0,
					size : 10
				},
				searchType: false
      	  	}
    	},
		created: function(){// 页面初始化时载入数据
			this.doSearch()
		},
    	methods: {
			doSearch() {// 执行查询
				getJson('api/sys/function/paginate', this.conditions, response => {
					let pagination = response.retObject
					pagination.page = pagination.page + 1
					this.pagination = pagination
				})
			},
			refresh(){// 刷新
				this.doSearch()
			},
      	  	changePage(page) {// 翻页
      	  		this.conditions.page = page - 1;
				this.doSearch()
      	  	},
			changePageSize(size){// 改变每页条数
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
					postJson('api/sys/function', entity, response =>{
						this.$refs.editor.close()
						this.doSearch()
					})
				}else{
					putJson('api/sys/function', entity, response =>{
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
	              	deleteJson('api/sys/function/' + item.code, {}, response => {
	              		this.$message({type: 'info', message: this.$t('function.delete_success', [item.name])})
						this.doSearch()
	              	})
	            }).catch(() => {
	              	this.$message({
	                	type: 'info',
	                	message: this.$t('delete_aborted')
	              	});
	            });
			},
			formatType(type){
				return this.$t('function.type_'+type)
			}
    	}
  	}
</script>
<style>
</style>
