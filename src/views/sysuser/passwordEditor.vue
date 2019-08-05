<template>
    <el-dialog :title="title" :visible.sync="visible">
        <el-form v-if="visible == true" ref="saveForm" label-position="right" :model="entity" :rules="rules" status-icon label-width="120px">
            <el-form-item prop="password" :label='$t("user.password")'>
                <el-input v-model.trim="entity.password" type="password" :placeholder='$t("user.password")'></el-input>
            </el-form-item>
            <el-form-item prop="confirmPassword" :label='$t("user.confirm_password")'>
                <el-input v-model.trim="entity.confirmPassword" type="password" :placeholder='$t("user.confirm_password")'></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
	      	<el-button @click="visible = false">{{$t('actions.cancel')}}</el-button>
	      	<el-button type="primary" @click="onOK">{{$t('actions.ok')}}</el-button>
	    </span>
    </el-dialog>
</template>
<script>

    import { globalValid } from '@/utils/validate'

    export default {
        name: 'PasswordEditor',
        data() {
            var validateConfirmPassword = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error(this.$t("user.msg_confirmPassword")));
                } else if (value === this.entity.password) {
                    callback();
                } else {
                    callback(new Error(this.$t("user.msg_confirmPassword_error")));
                }
            }
            return {
                title : 'Untitled',
                visible: false,
                entity: {},
                mode : null,
                rules : {
                    password: [
                        { required: true, message: this.$t("user.msg_password"), trigger: 'blur' },
                        { validator: globalValid, trigger: 'blur',limit:{ max: 256} }
                    ],
                    confirmPassword: [
                        { required: true, message: this.$t("user.msg_confirmPassword"), trigger: 'blur' },
                        { validator: validateConfirmPassword, message: this.$t("user.msg_confirmPassword_error"), trigger: 'blur' },
                        { validator: globalValid, trigger: 'blur',limit:{ max: 256} }
                    ],
                }
            }
        },
        methods:{
            open(entity){
                this.visible = true
                this.title = this.$t('user.reset_password')
                this.entity = entity
                this.entity.password = ''
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