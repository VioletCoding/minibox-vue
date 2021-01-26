<template>
  <div v-if="dataFlag">

    <div class="nav">
      <van-nav-bar title="订单详情"
                   right-text="取消订单"
                   left-arrow
                   safe-area-inset-top
                   @click-left="()=>{this.$router.go(-1)}"
                   @click-right="cancelOrder"/>
    </div>

    <div class="text">
      <p>订单已生成，请在5分钟内支付</p>
      <p>超过5分钟订单会被自动取消</p>
    </div>

    <van-cell-group>
      <van-cell :title="'订单号：'+returnData.orderId"
                :value="returnData.createDate"/>

      <div class="game-info">
        <div class="inline-block">
          <img :src="returnData.mbGame.coverImg"
               :alt="returnData.mbGame.coverImg"
               width="170"
               height="80"/>
        </div>

        <div class="inline-block">
          <p>{{ returnData.mbGame.name }}</p>
        </div>
      </div>

      <van-cell title="价格"
                :value="returnData.mbGame.price + '元'"/>

    </van-cell-group>

    <van-submit-bar :price="returnData.mbGame.price * 100"
                    button-text="提交订单"
                    text-align="left"
                    safe-area-inset-bottom
                    button-color="black"
                    @submit="confirmOrder"/>

  </div>
</template>

<script>
import Api from "@/api/api";
import { Dialog } from "vant";
import utils from "@/api/utils";

export default {
  name: "MyGameOrder",
  data() {
    return {
      returnData: this.$route.params,
      dataFlag: false
    }
  },
  methods: {
    onLoad() {
      this.dataFlag = true;
    },
    //提交订单
    confirmOrder() {
      this.$http.post(Api.order_confirm, {
        orderGameId: this.returnData.mbGame.id,
        orderCost: this.returnData.mbGame.price,
        uid: localStorage.getItem("userId"),
        orderId: this.returnData.orderId,
        id: this.returnData.id
      }).then(resp => {
        if (resp.data.code == 200) {
          this.$toast({message: "感谢您的购买", icon: "success"});
          this.$router.go(-1);
        }
      })
    },
    //取消订单
    cancelOrder() {
      Dialog.confirm({
        title: "取消订单",
        message: "确定取消订单吗？"
      }).then(() => {
        this.$http.post(Api.order_cancel, {
          orderGameId: this.returnData.mbGame.id,
          orderCost: this.returnData.mbGame.price,
          uid: localStorage.getItem("userId"),
          orderId: this.returnData.orderId
        }).then(resp => this.$router.go(-1)
        ).catch(err => utils.errMessage(err));
      }).catch(cancel => cancel)
    }
  },
  mounted() {
    this.onLoad();
  }
}
</script>

<style scoped lang="less">
.inline-block {
  display: inline-block;
}

.nav {
  height: 50px;
}

.text {
  height: 70px;
  margin-bottom: 70px;

  p:first-child {
    text-align: center;
    font-weight: bold;
    font-size: 18px;
  }

  p:nth-child(2) {
    text-align: center;
    font-size: 12px;
    color: #969799;
  }
}

.game-info {
  height: 80px;
  padding: 10px 0 10px 10px;

  div:first-child {
    width: 50%;
    height: 100%;

    img:first-child {
      border-radius: 5px;
    }
  }

  div:nth-child(2) {
    width: 50%;
    height: 100%;
    vertical-align: top;

    p:first-child {
      text-align: center;
      position: relative;
      top: 15%;
      font-size: 16px;
      font-weight: bold;
    }
  }
}
</style>