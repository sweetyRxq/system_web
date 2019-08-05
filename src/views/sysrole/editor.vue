<template>
    <el-dialog :title="title" :visible.sync="visible">
        <el-form v-if="visible == true" ref="saveForm" :model="entity" :rules="rules" status-icon label-width="100px">
            <el-form-item :label="$t('role.code')" prop="code">
                <el-input v-if="!''" v-model.trim="entity.code" :placeholder="$t('role.msg_code')" ></el-input>
            </el-form-item>
            <el-form-item :label="$t('role.name')" prop="name">
                <el-input v-if="!''" v-model.trim="entity.name" :placeholder="$t('role.msg_name')" ></el-input>
            </el-form-item>
            <el-form-item :label="$t('role.functions')" >
                <el-cascader
                        v-model.trim="entity.functions"
                        :placeholder="$t('global_validate.please_select')"
                        :options="functionsOptions"
                        :props="{ multiple: true, checkStrictly: true,expandTrigger: 'hover',emitPath: false }"
                        collapse-tags
                        clearable
                        @change="changeCascader"
                ></el-cascader>
            </el-form-item>
            <el-form-item :label="$t('role.description')">
                <el-input
                        type="textarea"
                        :autosize="{ minRows: 3, maxRows: 10}"
                        :placeholder="$t('global_validate.please_select')"
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

    import { UpperCasevalidate } from '@/utils/validate'

    export default {
        name: 'RoleEditor',
        data() {
            return {
                title : 'Untitled',
                visible: false,
                entity: {},
                mode : null,
                funsProps : { multiple : true },
                rules : {
                    code:[
                        { required: true, message: this.$t("role.msg_code"), trigger: 'blur' },
                        { validator: UpperCasevalidate, trigger: 'blur'},
                    ],
                    name:[
                        { required: true, message: this.$t("role.msg_name"), trigger: 'blur' }
                    ]
                },
            }
        },
        props:{
          functionsOptions:Array
        },
        methods:{
            open(entity){
                this.visible = true
                this.entity = typeof entity === 'string' ? JSON.parse(entity) : entity
                if(this.entity.code){
                    console.log(this.entity)
                    this.mode = 'EDIT'
                    this.title = this.$t('role.edit')
                    if(this.entity.functions.length > 0 ){
                        let functions = []
                        this.entity.functions.forEach(item => {
                            functions.push(JSON.stringify(item))
                        })
                        this.entity.functions = functions
                    }
                }else{
                    this.mode = 'NEW'
                    this.title = this.$t('role.addnew')
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
                // console.log(this.entity)
                this.$refs.saveForm.validate(valid => {
                    if(valid){
                        this.$emit("onOK", this.entity)
                    }
                })

            },
            changeCascader(val){
                // console.log(val)
            }
        }
    }
</script>