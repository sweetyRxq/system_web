//GENERATE_START
<template>
	<el-dialog :title="title" :visible.sync="visible">
		<el-form v-if="visible == true" ref="saveForm" :model="entity" status-icon label-width="120px">
			<el-form-item :label="$t('commentlog.name')">
			   <el-input v-if="!''" v-model.trim="entity.name"></el-input>
			</el-form-item>
			<el-form-item :label="$t('commentlog.uuid')">
			   <el-input v-if="!''" v-model.trim="entity.uuid"></el-input>
			</el-form-item>
			<el-form-item :label="$t('commentlog.commentDate')">
			   <el-input v-if="!''" v-model.trim="entity.commentDate"></el-input>
			</el-form-item>
			<el-form-item :label="$t('commentlog.content')">
			   <el-input v-if="!''" v-model.trim="entity.content"></el-input>
			</el-form-item>
			<el-form-item :label="$t('commentlog.commonetUser')">
			   <el-input v-if="!''" v-model.trim="entity.commonetUser"></el-input>
			</el-form-item>
		</el-form>
	    <span slot="footer" class="dialog-footer">
	      	<el-button @click="visible = false">{{$t('actions.cancel')}}</el-button>
	      	<el-button type="primary" @click="onOK">{{$t('actions.ok')}}</el-button>
	    </span>
	</el-dialog>
</template>
<script>
	import { getJson }  from '@/utils/restapi'
	export default {
		name: 'ClsTestEditor',
		data() {
			return {
				title : 'Untitled',
				visible: false,
				entity: {},
				mode : null,
				chaincodeOptions: []
			}
		},
		mounted(){
			// Do nothing
		},
		methods:{
			open(entity){
				this.visible = true
				this.entity = entity
				if(this.entity.uuid){
					this.mode = 'EDIT'
					this.title = this.$t('commentlog.edit')
				}else{
					this.mode = 'NEW'
					this.title = this.$t('commentlog.addnew')
				}
			},
			getMode(){
				return this.mode
			},
			getEntity(){
				return this.entity
			},
			close(){
				this.visible = false
			},
			onOK(){
				this.$emit("onOK", this.entity)
			}
		}
	}
</script>
//GENERATE_END