<template>
  <q-page class="flex bg-image flex-center">
      <q-card v-bind:style="$q.screen.lt.sm?{'width': '80%'}:{'width':'40%'}">
        <q-card-section>
          <q-avatar size="103px" class="absolute-center shadow-10">
            <img src="profile.svg">
          </q-avatar>
        </q-card-section>
        <q-card-section>
          <div class="text-center q-pt-lg">
            <div class="col text-h6 ellipsis">
              登录
            </div>
          </div>
        </q-card-section>
        <q-card-section>
          <q-form
            class="q-gutter-md"
          >
            <q-input
              v-model="dataForm.username"
              label="用户名"
              lazy-rules
              :rules="[ val => val && val.length > 0 || '请输入用户名']"
            >
              <template v-slot:prepend>
                <q-icon name="fa-solid fa-user" />
              </template>
            </q-input>

            <q-input
              type="password"
              v-model="dataForm.password"
              label="密码"
              lazy-rules
              :rules="[ val => val && val.length > 0 || '请输入密码']"
            >
              <template v-slot:prepend>
                <q-icon name="fa-solid fa-key" />
              </template>
            </q-input>
            <div class='row'>
              <div class='col-md-6 col-xs-12'>
                <img
                  :src=captchaPath
                  style='width: 150px;height: 50px;display: block'
                  class='q-mr-auto q-ml-auto cursor-pointer'
                  @click='getCaptcha'
                >
              </div>
              <div class='col-md-6 col-xs-12'>
                <q-input
                  v-model="dataForm.captcha"
                  label="验证码"
                  lazy-rules
                  :rules="[ val => val && val.length > 0 || '请输入验证码']"
                />
              </div>
            </div>


            <div>
              <q-btn label="登录" color="primary" @click="submit"/>
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-page>
</template>

<script>
import { defineComponent, onMounted, reactive, ref } from 'vue';
import {getUUID,getApiUrl} from 'src/utils';
import { useQuasar  } from 'quasar'

export default defineComponent({
  name: 'LoginIndex',
  setup() {
    const $q = useQuasar()
    const ajaxBar = ref()

    let dataForm = reactive({
      username: '',
      password: '',
      uuid: '',
      captcha: ''
    })
    /**
     * 验证码
     */
    let captchaPath = ref('')
    const getCaptcha = onMounted(() => {
      dataForm.uuid = getUUID()
      console.log($q)
      captchaPath.value = `${getApiUrl()}/v1/captcha/captcha.jpg?uuid=${dataForm.uuid}`
    })

    let submit = function (){

    }
    return {
      dataForm,
      ajaxBar,
      getCaptcha,
      captchaPath,
      submit
    };
  },
});
</script>
<style>
  .bg-image {
    background-image: linear-gradient(135deg, #7028e4 0%, #e5b2ca 100%);
  }
</style>
