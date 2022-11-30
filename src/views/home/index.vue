<template>
  <div>
    <div class='top'>
      <div class="t-left">
        <i class="iconfont icon-fanhui"></i>
        <span class="t-text">电子健康码</span>
      </div>
      <div class="t-right">
        <div class="t-shoucang">
          <i class="iconfont icon-31shoucang"></i>
        </div>
        <div class="t-more">
          <i class="iconfont icon-gengduo"></i>
          <i class="iconfont icon-anjianfengexian"></i>
          <i class="iconfont icon-guanbi"></i>
        </div>
      </div>
    </div>
    <div class="center">
      <div class="code">
        <img class="bg one" src="@/assets/sd.png">
        <img class="bg two" src="@/assets/sd.png">
        <img class="bg three" src="@/assets/sd.png">
        <img class="bg four" src="@/assets/sd.png">
        <img class="bg five" src="@/assets/sd.png">
        <img class="bg six" src="@/assets/sd.png">
        <div class="time">{{ FormatTime(nowTime) }}</div>
        <div class="state">
          健康状态核验<span class="green">未见异常（绿码）</span>
        </div>
        <img class="code-img" src="@/assets/code.png">
        <img class="code-zhen" src="@/assets/zhen.png">
        <div class="zhezhao" v-show="!idCodeShow">
          <div class="name">
            <span class="name-n">**红</span>
            <i class="iconfont icon-yanjing_bi right"></i>
          </div>
          <div class="id-code">
            3706************28
          </div>
          <div class="zhezhao1" @click="idCodeShow = !idCodeShow"></div>
        </div>
        <div class="zhezhao" v-show="idCodeShow">
          <div class="name">
            <span class="name-n">刘晓红</span>
            <i class="iconfont icon-yanjing-zhengyan right"></i>
          </div>
          <div class="id-code">
            370613199408181028
          </div>
          <div class="zhezhao1" @click="idCodeShow = !idCodeShow"></div>
        </div>
      </div>
      <div class="card">
        <div class="cate">
          <div class="title">
            <span class="title-name">核酸检测</span>
            <i class="iconfont icon-zhankai"></i>
          </div>
          <div class="context mar">
            阴性<span class="big">2</span>天
          </div>
        </div>
        <div class="cate" @click="showPopup">
          <div class="title">
            <span class="title-name">通信大数据行程卡</span>
            <i class="iconfont icon-zhankai"></i>
          </div>
          <div class="context">
            <div class="button">点击查询</div>
          </div>
        </div>
        <!-- 弹出层内容 -->
        <van-popup
          v-model="popupShow"
          round
          position="bottom"
          :style="{ height: '84%' }"
        >
          <!-- 弹出层外标题 -->
          <div class="popup-title">
            <span class="title-left">
              <img src="@/assets/road.png">
              通信行程卡
              <i class="iconfont icon-xiangyou-copy"></i>
            </span>
            <span class="close">
              <i class="iconfont icon-guanbi1"></i>
            </span>
          </div>
          <!-- 弹出层内标题 -->
          <div class="popup-title-nei">通信行程卡</div>
          <div class="popup-context">
            <van-overlay show=true v-if="overlay">
              <div class="wrapper" @click.stop>
                <div class="block">
                  <div class="road-pic">
                    <img src="@/assets/road-pic.png">
                  </div>
                  <p class="chaxun">当前查询内容</p>
                  <p class="phoneCode">133****9096</p>
                  <van-checkbox v-model="checked">同意并授权运营商查询本人在疫情期间7天内到访地信息</van-checkbox>
                  <div class="butt">
                    <van-button :disabled="!checked" type="info" @click="overlay=false">查询</van-button>
                  </div>
                </div>
              </div>
            </van-overlay>
            <transition v-else name="van-slide-right">
              <div class="slide" v-show="visible">
                <div class="slide-img">
                  <img src="@/assets/title.png" alt="">
                </div>
                <p class="kouhao">疫情防控，人人有责</p>
              </div>
            </transition>
          </div>
        </van-popup>
      </div>
      <div class="lianjie yuan">
        <span class="list">支付宝乘车码</span>
        <i class="iconfont icon-zhankai"></i>
      </div>
      <div class="lianjie">
        <span class="list">疫苗接种查询</span>
        <div class="bei">
          <span class="beizhu">已接种三针</span>
          <i class="iconfont icon-zhankai"></i>
        </div>
      </div>
      <span class="lianjie">
        <span class="list">各地健康码服务热线</span>
        <i class="iconfont icon-zhankai"></i>
      </span>
    </div>
    <p class="wenan">数据来源：国家政务服务平台、通信大数据行程卡、山东省公共管理机构</p>
  </div>
</template>

<script>
export default {
  name: 'Ho-me',
  components: {},
  props: [],
  data () {
    return {
      timer: undefined,
      nowTime: new Date(),
      latedata: '2020-1-9',
      idCodeShow: false, // 身份信息显示
      popupShow: false, // 弹出层行程卡显示
      popupShowNei: true, // 行程卡第二弹出层
      checked: false, // 行程卡选择框
      overlay: true // 第一遮罩层是否显示
    }
  },
  computed: {},
  watch: {},
  created () {
    // 显示时间，在渲染页面之前一直调用该函数，对this.time进行赋值
    this.timer = setInterval(() => {
      this.nowTime = new Date().toLocaleString()
    })
  },
  beforeDestroy () {
    if (this.timer) {
      clearInterval(this.timer)
    }
  },
  mounted () {},
  methods: {
    FormatTime () {
      // 返回显示的日期时间格式
      const date = new Date()
      const month = this.formatTime(date.getMonth() + 1)
      const day = this.formatTime(date.getDate())
      const hour = this.formatTime(date.getHours())
      const minute = this.formatTime(date.getMinutes())
      const second = this.formatTime(date.getSeconds())
      return `${month}月${day}日${hour}:${minute}:${second}`
    },
    formatTime (n) {
      // 判断是否需要加0
      if (n < 10) {
        return '0' + n
      } else {
        return n
      }
    },
    showPopup () { // 展示行程卡弹框
      this.popupShow = true
    }
  }
}
</script>

<style scoped lang='less'>
.top{
  height: 50px;
  padding: 0 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  .t-left{
    display: flex;
    align-items: center;
    .icon-fanhui{
      font-size: 20px;
    }
    .t-text{
      font-size: 18px;
    }
  }
  .t-right{
    display: flex;
    align-items: center;
    .t-shoucang{
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      text-align: center;
      margin-right: 6px;
      border: 1px solid #F3F3F3;
      border-radius: 50%;
      .icon-31shoucang{
        font-size: 20px;
        line-height: 32px;
      }
    }
    .t-more{
      display: flex;
      align-items: center;
      justify-content: center;
      width: 85px;
      height: 32px;
      line-height: 32px;
      text-align: center;
      border: 1px solid #F3F3F3;
      border-radius: 16px;
      .iconfont{
        font-size: 20px;
      }
      .icon-anjianfengexian{
        margin: 0 4px;
      }
    }
  }
}
.center{
  padding: 20px 20px 10px;
  .code{
    height: 384px;
    position: relative;
    text-align: center;
    background-color: #fff;
    border-radius: 10px;
    overflow: hidden;
    .bg{
      position: absolute;
      z-index: 1;
      width: 96px;
      opacity: 0.3;
    }
    .one{
      left: 8px;
      top: 12px;
    }
    .two{
      left: 140px;
      top: -56px;
    }
    .three{
      right: 14px;
      top: 48px;
    }
    .four{
      left: -26px;
      bottom: 49px;
    }
    .five{
      left: 120px;
      top: 330px;
    }
    .six{
      right: 29px;
      bottom: 76px;
    }
    .time{
      position: relative;
      z-index: 2;
      line-height: 22px;
      font-size: 22px;
      font-weight: bolder;
      margin: 9px 0;
    }
    .state{
      position: relative;
      z-index: 2;
      font-size: 12px;
      line-height: 12px;
      .green{
        color: #028002;
      }
    }
    .code-img{
      width: 260px;
      height: 260px;
      margin-top: 9px;
      z-index: 2;
      position: relative;
    }
    .code-zhen{
      width: 29px;
      height: 28px;
      position: absolute;
      top:54px;
      left: 28px;
      z-index: 3;
    }
    .zhezhao{
      position: relative;
      .name{
        font-size: 17px;
        font-weight: bolder;
        .name-n{
          margin-right: -60px;
        }
        .right{
          margin-right: 44px;
          margin-top: 3px;
          color: #545454;
          float: right;
        }
      }
      .id-code{
        font-size: 17px;
        font-weight: bolder;
        margin-top: 5px;
      }
      .zhezhao1{
        position: absolute;
        top:0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 999;
      }
    }
  }
  .card{
    display: flex;
    justify-content: space-between;
    margin: 15px 0;
    .cate{
      width: 160px;
      height: 100px;
      border-radius: 5px;
      overflow: hidden;
      background-color: #fff;
      .title{
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 30px;
        padding: 0 11px;
        background-color: #CCCCCC;
        .title-name{
          font-size: 14px;
        }
        .icon-zhankai{
          color: #fff;
        }
      }
      .context{
        height: 70px;
        line-height: 70px;
        font-size: 10px;
        font-weight: bolder;
        text-align: center;
        .big{
          color: #028002;
          font-size: 42px;
        }
        .button{
          width: 100px;
          height: 24px;
          line-height: 24px;
          font-weight: normal;
          border-radius: 12px;
          color: #fff;
          font-size: 16px;
          margin: 22px auto 0;
          background-color: #028002;
        }
      }
      .mar{
        margin-top: -10px;
      }
    }
    .van-popup{
      overflow-y: visible;
      .popup-title{
        width: 100%;
        position: absolute;
        display: flex;
        justify-content: space-between;
        align-items: center;
        top: -30px;
        color: #fff;
        font-size: 16px;
        span{
          margin: 0 10px;
        }
        .title-left{
          display: flex;
          align-items: center;
          img{
            width: 18px;
            height: 18px;
            margin-right: 4px;
          }
          .iconfont{
            font-size: 14px;
          }
        }
        .close{
          display: inline-block;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background-color: rgba(0, 0, 0, 0.6);
          color: #fff;
          text-align: center;
          .iconfont{
            font-size: 8px;
            line-height: 22px;
          }
        }
      }
      .popup-title-nei{
        height: 40px;
        font-size: 18px;
        padding-left: 18px;
        line-height: 40px;
        border-radius: 20px 20px 0 0;
      }
      .popup-context{
        position: absolute;
        top: 40px;
        bottom: 0;
        left: 0;
        right: 0;
        background-image: url(@/assets/road-bg.png);
        background-repeat:no-repeat;
        background-size:100%;
        .van-overlay{
          position: absolute;
          bottom: 0;
        }
        .slide{
          position: absolute;
          bottom: 0;
          top: 0;
          left: 0;
          right: 0;
          width: 100%;
          height: 100%;
          background-color: #2ba568;
          .slide-img{
            text-align: center;
            padding: 25px 0 12px;
            img{
              width: 70%;
            }
          }
          .kouhao{
            text-align: center;
            margin: 0;
            color: #fff;
            font-size: 16px;
          }
        }
      }
    }
  }
  .lianjie{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 47px;
    color: #fff;
    padding: 0 12px;
    border-bottom: 1px solid #6ABC68;
    background-color: #0C860F;
    .list{
      font-size: 14px;
    }
    .bei{
      display: flex;
      align-items: center;
      .beizhu{
        font-size: 14px;
        margin-right: 10px;
      }
    }
  }
  .yuan{
    border-radius: 5px 5px 0 0;
  }
}
.wenan{
  font-size: 14px;
  margin: 0 0 28px;
  color: #B7F4AE;
  text-align: justify;
  padding: 0 10px;
}

// 行程卡遮罩层
.wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding:0 25px;
  }

  .block {
    width: 100%;
    height: 450px;
    border-radius: 10px;
    background-color: #fff;
    .road-pic{
      padding: 30px 0 0;
      text-align: center;
      img{
        width: 75%;
      }
    }
    .chaxun{
      text-align: center;
      font-size: 12px;
      color: #989898;
      margin: 7px;
    }
    .phoneCode{
      text-align: center;
      font-size: 16px;
      margin: 0;
    }
    .van-checkbox{
      padding: 20px;
      /deep/ .van-checkbox__label{
        font-size: 16px !important;
        color: #989898;
      }
    }
    .butt{
      padding:0 20px;
      .van-button{
        width: 100%;
        border-radius: 10px;
      }
    }
  }
</style>
