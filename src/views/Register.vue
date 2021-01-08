<template>
  <div style="margin-left: 1rem; margin-top: 1rem; margin-right: 1rem">

    <a-form-model ref="ruleForm" :model="ruleForm" :rules="rules" v-bind="layout">
      <a-form-model-item has-feedback label="用户名" prop="userName">
        <a-input v-model.number="ruleForm.userName"/>
      </a-form-model-item>
      <a-form-model-item has-feedback label="密码" prop="pass">
        <a-input v-model="ruleForm.pass" type="password" autocomplete="off"/>
      </a-form-model-item>
      <a-form-model-item has-feedback label="确认密码" prop="checkPass">
        <a-input v-model="ruleForm.checkPass" type="password" autocomplete="off"/>
      </a-form-model-item>

      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="submitForm('ruleForm')">
          提交
        </a-button>
        <a-button style="margin-left: 1rem" @click="resetForm('ruleForm')">
          重置
        </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
export default {
  data() {
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码！'));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次密码不一致！"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        userName: '',
        pass: '',
        checkPass: '',

      },
      rules: {
        pass: [{validator: validatePass, trigger: 'change'}],
        checkPass: [{validator: validatePass2, trigger: 'change'}],
        userName: [{required: true, message: '请输入用户名', trigger: 'change'}],
      },
      layout: {
        labelCol: {span: 4},
        wrapperCol: {span: 14},
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {

          this.$store.dispatch("toRegister",
              {username: this.ruleForm.userName, password: this.ruleForm.pass})
              .then(() => {
                this.$message.success("注册成功");
                this.$router.push("/login");
              }).catch(() => {
            this.$message.error("注册失败");
          })
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped>

</style>
