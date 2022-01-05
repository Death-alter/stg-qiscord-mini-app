<template>
  <view>
    <view class="btns">
      <view class="number-select">个数：<input v-model="num" type="text" /></view>
      <button type="primary" class="start-btn" @click="rollGame">开始随机</button>
    </view>
    <view class="result-list">
      <view class="result-item" v-for="(item, index) in result" :key="index">
        {{ item.name_zh }}
      </view>
    </view>
  </view>
</template>

<script>
import config from "@/config";
import { deepCopy } from "@/utils/tools";

export default {
  data() {
    return {
      num: 1,
      gameArr: config.game,
      result: [],
    };
  },
  methods: {
    rollGame() {
      const gameList = deepCopy(this.gameArr);
      const result = [];
      for (let i = 0; i < this.num && gameList.length > 0; i++) {
        const rand = Math.floor(Math.random() * gameList.length);
        result.push(gameList[rand]);
        gameList.splice(rand, 1);
      }
      this.result = result;
    },
  },
};
</script>

<style scoped>
.number-select {
  font-size: 36rpx;
  text-align: center;
  margin: 30rpx 0;
  line-height: 1.5;
}

.number-select input {
  display: inline-block;
  border-bottom:1px solid #000;
  width: 100rpx;
  vertical-align: bottom;
}

.start-btn {
  width: 60%;
  margin: 0 auto;
}

.result-list {
  text-align: center;
  margin: 50rpx 0;
}

.result-item {
  margin: 20rpx 0;
}
</style>