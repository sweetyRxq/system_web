<template>
	<el-dialog :title="title" :visible.sync="visible">
		<el-form v-if="visible == true" ref="saveForm" :model="entity" :rules="rules" status-icon label-width="120px">
			<div style="display:none;">
				<input type="hidden" v-model.trim="entity.id">
			</div>
	        <el-form-item :label="$t('common.name')" prop="name">
	          	<el-input v-if="!''" v-model.trim="entity.name" :placeholder="$t('global_validate.please_input') + $t('common.name')"></el-input>
	        </el-form-item>
	        <el-form-item :label="$t('cfgcc.channelName')" prop="channelName">
	          	<el-input v-if="!''" v-model.trim="entity.channelName" :placeholder="$t('global_validate.please_input') + $t('cfgcc.channelName')"></el-input>
	        </el-form-item>
	        <el-form-item :label="$t('cfgcc.chaincodeName')" prop="chaincodeName">
	          	<el-input v-if="!''" v-model.trim="entity.chaincodeName" :placeholder="$t('global_validate.please_input') + $t('cfgcc.chaincodeName')"></el-input>
	        </el-form-item>
		</el-form>
	    <span slot="footer" class="dialog-footer">
	      	<el-button @click="visible = false">{{$t('actions.cancel')}}</el-button>
	      	<el-button type="primary" @click="onOK">{{$t('actions.ok')}}</el-button>
	    </span>
	</el-dialog>
</template>
<script>
	export default {
		name: 'CFGCCEditor',
		data() {
			return {
				title : 'Untitled',
				visible: false,
				entity: {},
				mode : null,
				rules: {
					name: [{ required: true, message: this.$t('global_validate.please_input') + this.$t('common.name'), trigger: 'blur' }],
					channelName: [{ required: true, message: this.$t('global_validate.please_input') + this.$t('cfgcc.channelName'), trigger: 'blur' }],
					chaincodeName: [{ required: true, message: this.$t('global_validate.please_input') + this.$t('cfgcc.chaincodeName'), trigger: 'blur' }],
				}
			}
		},
		methods:{
			open(entity){
				this.visible = true
				this.entity = entity
				if(this.entity.id){
					this.mode = 'EDIT'
					this.title = this.$t('cfgcc.edit')
				}else{
					this.mode = 'NEW'
					this.title = this.$t('cfgcc.addnew')
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
				this.$refs.saveForm.validate(valid => {
					if(valid){
						this.$emit("onOK", this.entity)
					}
				})
			}
		}
	}
</script>