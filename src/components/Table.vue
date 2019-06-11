<template>
  <div class="tableContainer">
    <div v-if="!uploadedJson">Null Json</div>

    <div v-if="uploadedJson" class="table">
      <div class="tableRow tableHeader">
        <span class="key"> key</span>
        <span class="code"> code</span>
        <span class="httpCode"> httpCode</span>
        <span class="message"> message</span>
      </div>
      <div v-for="(item, index) in innerItemList" :key="index" class="tableRow">
        <span class="key"> {{ item.key }}</span>
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
    const innerItemList = Object.entries(this.uploadedJson).map(item => {
      return {
        key: item[0],
        ...item[1]
      };
    });

    return {
      innerItemList
    };
  },
  methods: {
    onChangeHandler: function(item) {
      const targetItem = this.innerItemList.find(
        target => target.code === item.code
      );
      const { code, message } = targetItem;
      this.onChangeMessage(code, message);
    }
  }
};
</script>

<style>
.tableHeader.tableRow {
  background-color: black;
  color: white;
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
