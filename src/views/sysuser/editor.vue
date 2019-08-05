<template>
    <el-dialog
        :title="title"
        :visible.sync="visible"
        width="40%">
        <el-form v-if="visible == true"  ref="saveForm" :model="entity" status-icon :rules="rules" label-width="80px">
            <el-form-item :label='$t("user.account")' prop="account">
                <el-input v-if="!''" v-model.trim="entity.account" :placeholder="$t('global_validate.please_input') + $t('user.account')"></el-input>
            </el-form-item>
            <el-form-item :label='$t("user.email")' prop="email">
                <el-input v-if="!''" v-model.trim="entity.email" :placeholder="$t('global_validate.please_input') + $t('user.email')"></el-input>
            </el-form-item>
            <el-form-item v-if="isShow" :label='$t("user.password")' prop="password">
                <el-input v-if="!''" type="password" v-model.trim="entity.password" :placeholder="$t('global_validate.please_input') + $t('user.password')"></el-input>
            </el-form-item>
            <el-form-item v-if="isShow" :label='$t("user.confirm_password")' prop="confirmPassword">
                <el-input v-if="!''" type="password" v-model.trim="entity.confirmPassword" :placeholder="$t('global_validate.please_input') + $t('user.confirm_password')"></el-input>
            </el-form-item>
            <el-form-item  prop="role" :label='$t("user.role")'>
                <el-select v-model.trim="entity.role" :placeholder="$t('user.msg_role')" >
                    <el-option  v-for="(item,indexR) in selectRoles" :key="indexR" :label="item.name" :value="JSON.stringify(item)"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item  prop="organization" :label='$t("user.organization")'>
              <el-select v-model.trim="entity.organization" :placeholder="$t('user.msg_organization')">
                <el-option  v-for="(item,indexR) in selectOrgs" :key="item.code" :label="item.name" :value="JSON.stringify(item)"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label='$t("is_active")'>
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
        </el-form>
        <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false">{{$t("actions.cancel")}}</el-button>
        <el-button type="primary" @click="onOK">{{$t("actions.ok")}} </el-button>
      </span>
    </el-dialog>
</template>

<script>

    import { globalValid,letterNumberLineValid } from '@/utils/validate'

    export default {
        name: "UserEditor",
        data () {
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
                visible: false,
                title: 'editorForm',
                entity: {},
                isShow:true,
                mode: null,
                rules: {
                    account: [
                        { required: true, message: this.$t("user.msg_account"), trigger: 'blur' },
                        { validator: globalValid, trigger: 'blur',limit:{ max: 50} },
                        { validator: letterNumberLineValid, trigger: 'blur'},
                    ],
                    email: [
                        { required: true, message: this.$t("user.msg_email"), trigger: 'blur' },
                        { type: 'email', message: this.$t("user.msg_email_error"), trigger: ['blur'] },
                        { validator: globalValid, trigger: 'blur',limit:{ max: 256} }
                    ],
                    password: [
                        { required: true, message: this.$t("user.msg_password"), trigger: 'blur' },
                        { validator: globalValid, trigger: 'blur',limit:{ max: 256} }
                    ],
                    confirmPassword: [
                        { required: true, message: this.$t("user.msg_confirmPassword"), trigger: 'blur' },
                        { validator: validateConfirmPassword, message: this.$t("user.msg_confirmPassword_error"), trigger: 'blur' },
                        { validator: globalValid, trigger: 'blur',limit:{ max: 256} }
                    ],
                    role: [
                        { required: true, message: this.$t("user.msg_role"), trigger: 'change' }
                    ],
                    organization: [
                        { required: true, message: this.$t("user.msg_organization"), trigger: 'change' }
                    ],
                },
            }
        },
        props:{
            selectRoles:Array,
            selectOrgs:Array
        },
        methods:{
            open(entity){
                this.visible = true
                this.entity = typeof entity === 'string' ? JSON.parse(entity) : entity
                if(this.entity.id){
                    this.mode = 'EDIT'
                    this.isShow = false
                    this.title = this.$t('user.edit_user')
                    this.entity.role = this.entity.role ? JSON.stringify(this.entity.role) : this.entity.role
                    this.entity.organization = this.entity.organization ? JSON.stringify(this.entity.organization) : this.entity.organization
                }else{
                    this.mode = 'NEW'
                    this.isShow = true
                    this.title = this.$t('user.add_user')
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

<style scoped>

</style>