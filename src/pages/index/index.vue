<template>
  <view class="content">
    <button type="primary" @click="goto('/pages/scorePages/tfcc')">查避弹</button>
    <button type="primary" @click="goto('/pages/scorePages/isndes')">查打分</button>
    <button type="primary" @click="goto('/pages/rankingPages/nn')">查NN</button>
    <button type="primary" @click="goto('/pages/rankingPages/score')">查打分榜</button>
    <button type="primary" @click="goto('/pages/randomPages/game')">随作品</button>
    <button type="primary" @click="goto('/pages/randomPages/shootType')">随机体</button>
  </view>
</template>

<script>
export default {
  data() {
    return {};
  },
  onLoad() {},
  methods: {
    goto(url) {
      uni.navigateTo({
        url,
      });
    },
  },
};
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 20rpx 0;
}

button {
  padding: 10rpx 40rpx;
  line-height: 1.5;
  margin: 20rpx;
  width: 50%;
}
</style>
