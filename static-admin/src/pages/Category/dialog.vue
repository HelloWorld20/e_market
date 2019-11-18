<template>
    <el-dialog
        title="分类操作"
        :visible.sync="visible"
        :before-close="() => $emit('close')"
    >
        <el-form :model="form" :rules="rules" ref="form">
            <el-form-item prop="name" label="分类名称" label-width="120px">
                <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="分类优先级" label-width="120px">
                <el-input-number v-model="form.preority"></el-input-number>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="$emit('close')">取 消</el-button>
            <el-button type="primary" @click="handleSubmit">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
import { Dialog, Form, FormItem } from 'element-ui';
export default {
    data() {
        return {
            form: {
                name: '',
                preority: 0,
                id: undefined,
            },
            rules: {
                name: [
                    {
                        required: true,
                        message: '请输入分类名称',
                        trigger: 'blur',
                    },
                ],
            },
        };
    },
    created() {
        this.$on('setValue', this.setValue);
    },
    props: {
        visible: {
            require: true,
            type: Boolean,
            default: false,
        },
    },
    components: {
        [Dialog.name]: Dialog,
        [Form.name]: Form,
        [FormItem.name]: FormItem,
    },
    methods: {
        setValue(opts) {
            this.form.name = opts.name;
            this.form.preority = opts.preority;
            if (opts.id) {
                this.form.id = opts.id;
            } else {
                this.form.id = undefined;
            }
        },
        handleSubmit() {
            this.$refs['form'].validate(valid => {
                if (valid) {
                    this.$emit('submit', this.form);
                }
            });
        },
    },
    beforeDestroyed() {
        this.$off('setValue', this.setValue);
    },
};
</script>

<style lang="less" scoped></style>
