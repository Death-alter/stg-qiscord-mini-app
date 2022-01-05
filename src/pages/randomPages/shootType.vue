<template>
  <view>
    <view class="options">
      <view class="options-item">
        <text>个数：</text>
        <input v-model="num" type="text" />
      </view>
      <view class="options-item">
        <text>作品：</text>
        <picker :value="gameIndex" :range="pickerData" @change="onGameChange">
          <view class="picker">{{ pickerData[gameIndex] }}</view>
        </picker>
      </view>
      <button type="primary" class="start-btn" @click="rollShootType">开始随机</button>
    </view>
    <view class="result-list">
      <view class="result-item" v-for="(item, index) in result" :key="index">
        {{ `${item.name} ${item.character}${item.type}` }}
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
      gameIndex: 0,
      gameArr: config.game,
      result: [],
    };
  },
  computed: {
    all() {
      const arr = [];
      for (let item of this.gameArr) {
        item.shootType.character.forEach((v, i) => {
          if (item.shootType.type) {
            for (let value of item.shootType.type) {
              arr.push({
                name: item.name_zh,
                character: v,
                type: value,
              });
            }
          } else {
            arr.push({
              name: item.name_zh,
              character: v,
              type: "",
            });
          }
        });
      }
      return arr;
    },
    pickerData() {
      return [
        "任意",
        ...this.gameArr.map((item) => {
          return item.name_zh;
        }),
      ];
    },
  },
  methods: {
    rollShootType() {
      const arr = [];
      if (this.gameIndex > 0) {
        const item = this.gameArr[this.gameIndex - 1];
        item.shootType.character.forEach((v, i) => {
          if (item.shootType.type) {
            for (let value of item.shootType.type) {
              arr.push({
                name: item.name_zh,
                character: v,
                type: value,
              });
            }
          } else {
            arr.push({
              name: item.name_zh,
              character: v,
              type: "",
            });
          }
        });
      }

      const gameList = deepCopy(arr.length ? arr : this.all);
      const result = [];
      for (let i = 0; i < this.num && gameList.length > 0; i++) {
        const rand = Math.floor(Math.random() * gameList.length);
        result.push(gameList[rand]);
        gameList.splice(rand, 1);
      }
      this.result = result;
    },
    onGameChange(e) {
      this.gameIndex = e.detail.value;
    },
  },
};
</script>

<style scoped>
.options-item {
  font-size: 36rpx;
  text-align: center;
  margin: 30rpx 0;
  line-height: 1.5;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 40rpx !important;
}

.options-item input {
  border-bottom: 1px solid #000;
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

.picker {
  background: #ccc;
  border-radius: 8rpx;
  padding: 6rpx 20rpx;
}
</style>
