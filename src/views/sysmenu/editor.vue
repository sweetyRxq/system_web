<template>
    <el-dialog :title="title" :visible.sync="visible">
        <el-form v-if="visible == true" ref="saveForm" label-position="right" :model="entity" :rules="rules" status-icon label-width="120px">
            <el-form-item :label='$t("menu.name")' prop="name" >
                <el-input v-model.trim="entity.name" :placeholder='$t("menu.name")'></el-input>
            </el-form-item>
            <el-form-item :label='$t("menu.code")' prop="code" >
                <el-input v-model.trim="entity.code" :placeholder='$t("menu.code")'></el-input>
            </el-form-item>
            <el-form-item :label='$t("menu.url")' prop="url">
                <el-input v-model.trim="entity.url" :placeholder='$t("menu.url")'></el-input>
            </el-form-item>
            <el-form-item :label='$t("menu.params")' prop="params">
                <el-input v-model.trim="entity.params" :placeholder='$t("menu.params")'></el-input>
                <!--<el-button @click="clickParams">编辑</el-button>-->
            </el-form-item>
            <el-form-item :label='$t("menu.icon")' prop="icon" >
                <el-input v-model.trim="entity.icon" :placeholder='$t("menu.icon")'></el-input>
            </el-form-item>
            <el-form-item :label='$t("menu.parent_code")' prop="parentCode" >
                <el-select style="width: 100%;" v-model.trim="entity.parentCode" :placeholder='$t("global_validate.please_select")+$t("menu.parent_code")'>
                    <el-option :label='$t("menu.no_parent")' :value="null"></el-option>
                    <el-option v-for="(item,index) in allMenusData" :key="index" :label="item.name" :value="item.code"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item :label='$t("menu.description")' prop="description" >
                <el-input v-model.trim="entity.description" :placeholder='$t("menu.description")'></el-input>
            </el-form-item>
            <el-form-item :label='$t("menu.function")' prop="function">
                <el-select style="width: 100%;" v-model.trim="entity.function" :placeholder='$t("global_validate.please_select")+$t("menu.function")'>
                    <el-option
                            v-for="item in funsOptions"
                            :key="item.code"
                            :label="item.name"
                            :value="JSON.stringify(item)">
                    </el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
	      	<el-button @click="visible = false">{{$t('actions.cancel')}}</el-button>
	      	<el-button type="primary" @click="onOK">{{$t('actions.ok')}}</el-button>
	    </span>
    </el-dialog>
</template>
<script>

    import { UpperCaseLinevalidate,letterNumberLineValid } from '@/utils/validate'

    export default {
        name: 'MenuEditor',
        data() {
            return {
                title : 'Untitled',
                visible: false,
                entity: {},
                mode : null,
                funsProps : { multiple : true },
                rules : {
                    code:[
                        { required: true, message: this.$t("menu.msg_code"), trigger: 'blur' },
                        { validator: UpperCaseLinevalidate, trigger: 'blur'},
                    ],
                    name:[
                        { required: true, message: this.$t("menu.msg_name"), trigger: 'blur' }
                    ],
                    function:[
                        { required: true, message: this.$t("menu.msg_function"), trigger: 'change' }
                    ]
                }
            }
        },
        props:{
            funsOptions:Array,
            allMenusData:Array
        },
        methods:{
            open(entity){
                this.visible = true
                this.entity = typeof entity === 'string' ? JSON.parse(entity) : entity
                if(this.entity.code){
                    this.mode = 'EDIT'
                    this.entity.function = JSON.stringify(this.entity.function)
                    this.title = this.$t('menu.edit')
                }else{
                    this.mode = 'NEW'
                    this.title = this.$t('menu.add')

                    console.log(entity);
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