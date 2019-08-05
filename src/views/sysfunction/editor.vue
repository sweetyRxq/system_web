<template>
	<el-dialog :title="title" :visible.sync="visible">
		<el-form v-if="visible == true" ref="saveForm" :rules="rules" :model="entity" status-icon label-width="80px">
	        <el-form-item :label="$t('common.code')" prop="code">
	          	<el-input v-if="!''" v-model.trim="entity.code" :placeholder="$t('function.msg_code')"></el-input>
	        </el-form-item>
	        <el-form-item :label="$t('common.name')" prop="name">
	          	<el-input v-if="!''" v-model.trim="entity.name" :placeholder="$t('function.msg_name')"></el-input>
	        </el-form-item>
	        <el-form-item :label="$t('function.category')" prop="category">
	          	<el-input v-if="!''" v-model.trim="entity.category" :placeholder="$t('function.msg_category')"></el-input>
	        </el-form-item>
	        <el-form-item :label="$t('common.type')" prop="type">
	          	<el-select v-model="entity.type" :placeholder="$t('global_validate.please_select')">
					<el-option :label="$t('function.type_BACKEND')" value="BACKEND"></el-option>
					<el-option :label="$t('function.type_MENU')" value="MENU"></el-option>
				</el-select>
	        </el-form-item>
			<el-form-item :label="$t('common.description')">
				<el-input
				  	type="textarea"
				  	:autosize="{ minRows: 3, maxRows: 10}"
				  	:placeholder="$t('')"
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
		name: 'FunctionEditor',
		data() {
			return {
				title : 'Untitled',
				visible: false,
				entity: {},
				mode : null,
				rules: {
					code: [
						{ required: true, message: this.$t('function.msg_code'), trigger: 'blur' },
						{ validator: UpperCaseLinevalidate, trigger: 'blur'}
					],
					name: [{ required: true, message: this.$t('function.msg_name'), trigger: 'blur' }],
					category: [
						{ required: true, message: this.$t('function.msg_category'), trigger: 'blur' },
						{ validator: UpperCaseLinevalidate, trigger: 'blur'}
					],
					type: [{ required: true, message: this.$t('function.msg_type'), trigger: 'change' }]
				}
			}
		},
		methods:{
			open(entity){
				this.visible = true
				this.entity = entity
				if(this.entity.code){
					this.mode = 'EDIT'
					this.title = this.$t('function.edit')
				}else{
					this.mode = 'NEW'
					this.title = this.$t('function.addnew')
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