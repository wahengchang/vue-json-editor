<template>
  <div class="tableContainer">
    <div v-if="!uploadedJson">Null Json</div>

    <div v-if="uploadedJson" class="table">
      <div class="tableRow tableHeader">
        <span class="key" @click="orderBy('type1')"> Main Key</span>
        <span class="key" @click="orderBy('type2')"> Second Key</span>
        <span class="code" @click="orderBy('code')"> code</span>
        <span class="httpCode" @click="orderBy('httpCode')"> httpCode</span>
        <span class="message"> message</span>
      </div>
      <div v-for="(item, index) in innerItemList" :key="index" class="tableRow">
        <span class="key"> {{ item.type1 }}</span>
        <span class="key"> {{ item.type2 }}</span>
        <span class="code"> {{ item.code }}</span>
        <span class="httpCode"> {{ item.httpCode }}</span>
        <textarea
          class="message"
          v-model="item.message"
          @input="onChangeHandler(item)"
        />
      </div>
    </div>
  </div>
</template>

<script>
const numberIsBigger = (num1 = -1, num2 = -1) => {
  return num1 > num2 ? 1 : -1;
};

const comparer = (item1, item2, isReverse) => {
  if (typeof item1 === "string") {
    return isReverse ? (item1 > item2 ? -1 : 1) : item2 > item1 ? -1 : 1;
  }

  const result = isReverse
    ? numberIsBigger(item1, item2)
    : numberIsBigger(item2, item1);

  return result;
};
export default {
  name: "Table",
  props: {
    uploadedJson: {
      type: Object,
      default: null
    },
    onChangeMessage: {
      type: Function,
      default: null
    }
  },
  computed: {},
  components: {},
  data: function() {
    const innerItemList = [];

    Object.entries(this.uploadedJson).forEach(item => {
      const [type1, subItem] = item;
      Object.entries(subItem).forEach(_item => {
        const [type2, errorObj] = _item;
        innerItemList.push({
          ...errorObj,
          type1,
          type2
        });
      });
    });

    return {
      innerItemList,
      isSort: false
    };
  },
  methods: {
    onChangeHandler: function(item) {
      const targetItem = this.innerItemList.find(
        target => target.type2 === item.type2 && target.type1 === item.type1
      );
      const { type2: secondKey, message, type1: mainKey } = targetItem;
      this.onChangeMessage(mainKey, secondKey, message);
    },
    orderBy: function(field) {
      const itemList = this.innerItemList.sort((item1, item2) =>
        comparer(item1[field], item2[field], this.isSort)
      );
      this.isSort = !this.isSort;
      return (this.innerItemList = [...itemList]);
    }
  }
};
</script>

<style>
.tableHeader.tableRow {
  background-color: black;
  color: white;
  cursor: pointer;
}
.tableContainer {
  width: 100%;
}
.tableRow {
  display: flex;
  background-color: lightgray;
  margin: 10px 10px;
  text-align: left;
}

.tableRow span {
  height: 50px;
  line-height: 50px;
  font-size: 16px;
  padding: 0 10px;
}

.key {
  width: 250px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.code {
  width: 350px;
}
.httpCode {
  width: 100px;
}
textarea.message {
  width: 500px;
  font-size: 16px;
  padding: 10px;
  border: gray solid 1px;
}
</style>
