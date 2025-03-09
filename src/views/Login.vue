<template>
  <div>
    <div class="bg"></div>
    <div class="main">
      <div class="contain">
        <div class="logo">
          <el-image :src="logo" fit="cover" @click="router.push('/')"/>
        </div>

        <div class="header">{{ title }}</div>

        <div class="content">
          <div class="block">
            <el-input placeholder="账号" size="large" v-model="username" autocomplete="off" autofocus
                      @keyup="handleKeyup">
              <template #prefix>
                <el-icon>
                  <UserFilled/>
                </el-icon>
              </template>
            </el-input>
          </div>

          <div class="block">
            <el-input placeholder="密码" size="large" v-model="password" show-password autocomplete="off"
                      @keyup="handleKeyup">
              <template #prefix>
                <el-icon>
                  <Lock/>
                </el-icon>
              </template>
            </el-input>
          </div>

          <el-row class="btn-row">
            <el-button class="login-btn" size="large" type="primary" @click="login">登录</el-button>
          </el-row>

          <el-row class="opt" :gutter="24">
            <el-col :span="8"><el-link type="primary" @click="router.push('/register')">注册</el-link></el-col>
            <el-col :span="8">
              <el-link type="info" @click="showResetPass = true">重置密码</el-link>
            </el-col>
            <el-col :span="8">
              <el-link type="info" @click="router.push('/')">首页</el-link>
            </el-col>
          </el-row>

          <div v-if="wechatLoginURL !== ''">
            <el-divider class="divider">其他登录方式</el-divider>

            <div class="clogin">
              <a :href="wechatLoginURL" @click="setRoute(router.currentRoute.value.path)"><i class="iconfont icon-wechat"></i></a>
            </div>
          </div>
        </div>
      </div>

      <reset-pass @hide="showResetPass = false" :show="showResetPass"/>

      <captcha v-if="enableVerify" @success="doLogin" ref="captchaRef"/>

      <footer-bar/>
    </div>
  </div>
</template>

<script setup>

import {onMounted, ref} from "vue";
import {Lock, UserFilled} from "@element-plus/icons-vue";
import {httpGet, httpPost} from "@/utils/http";
import {useRouter} from "vue-router";
import FooterBar from "@/components/FooterBar.vue";
// import {isMobile} from "@/utils/libs";
import {checkSession, getLicenseInfo, getSystemInfo} from "@/store/cache";
// import {setUserToken} from "@/store/session";
import ResetPass from "@/components/ResetPass.vue";
import {showMessageError} from "@/utils/dialog";
import Captcha from "@/components/Captcha.vue";
// import {setRoute} from "@/store/system";
// import {useSharedStore} from "@/store/sharedata";

const router = useRouter();
const title = ref('Geek-AI');
const username = ref(process.env.VUE_APP_USER);
const password = ref(process.env.VUE_APP_PASS);
const showResetPass = ref(false)
const logo = ref("")
const licenseConfig = ref({})
const wechatLoginURL = ref('')
const enableVerify = ref(false)
const captchaRef = ref(null)
// 是否需要验证码，输入一次密码错之后就要验证码
const needVerify = ref(false)

onMounted(() => {
  // 获取系统配置
  // getSystemInfo().then(res => {
  //   logo.value = res.data.logo
  //   title.value = res.data.title
  //   enableVerify.value = res.data['enabled_verify']
  // }).catch(e => {
  //   showMessageError("获取系统配置失败：" + e.message)
  // })

  // getLicenseInfo().then(res => {
  //   licenseConfig.value = res.data
  // }).catch(e => {
  //   showMessageError("获取 License 配置：" + e.message)
  // })

  // checkSession().then(() => {
  //   if (isMobile()) {
  //     router.push('/mobile')
  //   } else {
  //     router.push('/chat')
  //   }
  // }).catch(() => {
  // })

  // const returnURL = `${location.protocol}//${location.host}/login/callback?action=login`
  // httpGet("/api/user/clogin?return_url="+returnURL).then(res => {
  //   wechatLoginURL.value = res.data.url
  // }).catch(e => {
  //   console.error(e)
  // })
})

const handleKeyup = (e) => {
  if (e.key === 'Enter') {
    login();
  }
};

const login = function () {
  if (username.value.trim() === '') {
    return showMessageError("请输入用户民")
  }
  if (password.value.trim() === '') {
    return showMessageError('请输入密码');
  }

  if (enableVerify.value && needVerify.value) {
    captchaRef.value.loadCaptcha()
  } else {
    doLogin({})
  }
}

// const store = useSharedStore()

const doLogin = (verifyData) => {
  httpPost('/api/user/login', {
    username: username.value.trim(),
    password: password.value.trim(),
    key: verifyData.key,
    dots: verifyData.dots,
    x: verifyData.x
  }).then((res) => {
    setUserToken(res.data.token)
    store.setIsLogin(true)
    needVerify.value = false
    if (isMobile()) {
      router.push('/mobile')
    } else {
      router.push('/chat')
    }

  }).catch((e) => {
    showMessageError('登录失败，' + e.message)
    needVerify.value = true
  })
}
</script>

<style scoped lang="scss">
.bg {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: #313237;
  background-image: url("~@/assets/img/login-bg.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: repeat-y;
  filter: blur(10px); /* 调整模糊程度，可以根据需要修改值 */
}

.main {
  .contain {
    position: fixed;
    left: 50%;
    top: 40%;
    width: 90%;
    max-width: 400px;
    transform: translate(-50%, -50%);
    padding: 20px 10px;
    color: #ffffff;
    border-radius: 10px;

    .logo {
      text-align: center;

      .el-image {
        width: 120px;
        cursor: pointer;
        border-radius: 50%;
      }
    }

    .header {
      width: 100%;
      margin-bottom: 24px;
      font-size: 24px;
      //color: $white_v1;
      letter-space: 2px;
      text-align: center;
      padding-top: 10px;
    }

    .content {
      width: 100%;
      height: auto;
      border-radius: 3px;

      .block {
      margin-bottom: 16px;

      .el-input__inner {
      //border: 1px solid $gray-v6 !important;

      .el-icon-user, .el-icon-lock {
        font-size: 20px;
      }
    }
    }

      .btn-row {
        padding-top: 10px;

        .login-btn {
          width: 100%;
          font-size: 16px;
          letter-spacing: 2px;
        }
      }

      .text-line {
        justify-content: center;
        padding-top: 10px;
        font-size: 14px;
      }

      .opt {
        padding: 15px;
        .el-col {
        text-align: center;
      }
      }

      .divider {
        border-top: 2px solid #c1c1c1;
      }

      .clogin {
        padding: 15px;
        display: flex;
        justify-content: center;

        .iconfont {
        font-size: 20px;
        background: #E9F1F6;
        padding: 8px;
        border-radius: 50%;
        cursor: pointer;
      }
        .iconfont.icon-wechat {
          color: #0bc15f;
        }
      }
    }
  }

  .footer {
    color: #ffffff;

    .container {
      padding: 20px;
    }
  }
}
</style>