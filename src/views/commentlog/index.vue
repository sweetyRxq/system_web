//GENERATE_START
<!-- The CommentLog Business Entity manangement Component -->
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
				<div class="tr" v-for="record in pagination.dataList">
					<div v-for="column in header"  :class="'td ' + column.class" :title="record[column.field]">
						<div class="col-title">{{column.title}}</div>
						<div class="col-value">{{getFieldValue(record, column.field)}}</div>
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
		</div>
		<div class="footer">
			<el-button type="default" size="mini" @click="first">{{$t('common.firstPage')}}</el-button>
		    <el-button type="primary" size="mini" @click="next">{{$t('common.nextPage')}}</el-button>
		</div>
		<CommentLogEditor ref="editor" @onOK="saveEntity"></CommentLogEditor>
  	</div>
	
</template>

<script>
	import { getJson, postJson, putJson, deleteJson }  from '@/utils/restapi'
	import CommentLogEditor from '@/views/commentlog/editor'
  	export default {
		// 注册依赖组件
		components : {CommentLogEditor},
    	data() {
      	  	return {
				// 定义表格字段
        		header: [
    				{title: this.$t('commentlog.name'), field: 'name', class: ''},   
    				{title: this.$t('commentlog.uuid'), field: 'uuid', class: ''},   
    				{title: this.$t('commentlog.commonetUser'), field: 'commonetUser', class: ''},   
    				{title: this.$t('commentlog.content'), field: 'content', class: ''},   
    				{title: this.$t('commentlog.commentDate'), field: 'commentDate', class: ''}   
        		],
				// 翻页数据格式
				pagination : {
					pageSize: 10,
					curBookMark: null,
					preBookMark: null,
					nxtBookMark: null,
					dataList: []
				},
				// 查询条件
				conditions: {
					bookMark : null,
					dataType : "CommentLog",
					pageSize : 10
				}
				
      	  	}
    	},
		created: function(){// 页面初始化时载入数据
			//this.doSearch()
		},
    	methods: {
			doSearch() {// 执行查询
				getJson('api/blockchain/commentlog/paginate', this.conditions, response => {
					let pagination = response.retObject
					this.pagination = pagination
				})
			},
			refresh(){// 刷新
				this.doSearch()
			},
			first(){
				this.conditions.bookMark = null
				this.doSearch()
			},
			next(){
				this.conditions.bookMark = this.pagination.nxtBookMark
				this.doSearch()
			},
			openEditor(item){// 打开编辑器
				this.$refs.editor.open(item)
			},
			saveEntity(){// 保存和修改功能
				let entity = this.$refs.editor.getEntity()
				let mode = this.$refs.editor.getMode()
				if(mode == 'NEW'){
					postJson('api/blockchain/commentlog', entity, response =>{
						this.$refs.editor.close()
						this.doSearch()
					})
				}else{
					putJson('api/blockchain/commentlog', entity, response =>{
						this.$refs.editor.close()
						this.doSearch()
					})
				}
			},
			deleteEntity(item){// 删除功能
	            this.$confirm(this.$t('cfgentity.delete_confirm', [item.name]), this.$t('confirm'), {
	              	confirmButtonText: this.$t('actions.ok'),
	              	cancelButtonText: this.$t('actions.cancel'),
	              	type: 'warning'
	            }).then(() => {
	              	deleteJson('api/blockchain/commentlog/' + item.uuid, {}, response => {
	              		this.$message({type: 'info', message: this.$t('cfgentity.delete_success', [item.name])})
						this.doSearch()
	              	})
	            }).catch(() => {
	              	this.$message({
	                	type: 'info',
	                	message: this.$t('delete_aborted')
	              	});
	            });
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
    	}
  	}
</script>
//GENERATE_END
<style>
</style>