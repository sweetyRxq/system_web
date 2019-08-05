<template>
	<el-dialog :title="title" :visible.sync="visible">
		<el-form v-if="visible == true" ref="saveForm" :model="entity" :rules="rules" status-icon label-width="160px">
	        <el-form-item :label="$t('common.code')" prop="code">
	          	<el-input v-if="!''" v-model.trim="entity.code"></el-input>
	        </el-form-item>
	        <el-form-item :label="$t('common.name')" prop="name">
	          	<el-input v-if="!''" v-model.trim="entity.name"></el-input>
	        </el-form-item>
	        <el-form-item :label="$t('organization.networkOrgName')" prop="networkOrgName">
	          	<el-input v-if="!''" v-model.trim="entity.networkOrgName"></el-input>
	        </el-form-item>
	        <el-form-item :label="$t('organization.sdkUrl')" prop="sdkUrl">
	          	<el-input v-if="!''" v-model.trim="entity.sdkUrl"></el-input>
	        </el-form-item>
	        <el-form-item :label="$t('organization.sdkAppId')" prop="sdkAppId">
	          	<el-input v-if="!''" v-model.trim="entity.sdkAppId"></el-input>
	        </el-form-item>
	        <el-form-item :label="$t('organization.sdkAppSecret')" prop="sdkAppSecret">
	          	<el-input v-if="!''" v-model.trim="entity.sdkAppSecret"></el-input>
	        </el-form-item>
	        <el-form-item :label="$t('organization.active')">
	            <template>
	              <el-switch
	                v-model="entity.active"
	                :active-value="1"
	                :inactive-value="0"
	                active-color="#13ce66"
	                inactive-color="#ff4949">
	              </el-switch>
	            </template>
	        </el-form-item>
			<el-form-item :label="$t('common.description')">
				<el-input
				  	type="textarea"
				  	:autosize="{ minRows: 3, maxRows: 10}"
				  	placeholder="请输入内容"
				  	v-model="entity.description">
				</el-input>
			</el-form-item>
		</el-form>
	    <span slot="footer" class="dialog-footer">
	      	<el-button @click="visible = false">{{$t('actions.cancel')}}</el-button>
	      	<el-button type="primary" @click="onOK">{{$t('actions.ok')}}</el-button>
	    </span>
	</el-dialog>
</template>
<script>

	import { UpperCaseLinevalidate } from '@/utils/validate'

	export default {
		name: 'OrganizationEditor',
		data() {
			return {
				title : 'Untitled',
				visible: false,
				entity: {},
				mode : null,
				rules:{
					code: [
						{ required: true, message: this.$t('global_validate.please_input') + this.$t('common.code'), trigger: 'blur' },
						{ validator: UpperCaseLinevalidate, trigger: 'blur'},
					],
					name: [{ required: true, message: this.$t('global_validate.please_input') + this.$t('common.name'), trigger: 'blur' }],
					networkOrgName: [{ required: true, message: this.$t('global_validate.please_input') + this.$t('organization.networkOrgName'), trigger: 'blur' }],
					sdkUrl: [{ required: true, message: this.$t('global_validate.please_input') + this.$t('organization.sdkUrl'), trigger: 'blur' }],
					sdkAppId: [{ required: true, message: this.$t('global_validate.please_input') + this.$t('organization.sdkAppId'), trigger: 'blur' }],
					sdkAppSecret: [{ required: true, message: this.$t('global_validate.please_input') + this.$t('organization.sdkAppSecret'), trigger: 'blur' }]
				}
			}
		},
		methods:{
			open(entity){
				this.visible = true
				this.entity = entity
				if(this.entity.code){
					this.mode = 'EDIT'
					this.title = this.$t('organization.edit')
				}else{
					this.mode = 'NEW'
					this.title = this.$t('organization.addnew')
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