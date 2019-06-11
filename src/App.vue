<template>
  <div id="app">
    <div class="row">
      <input
        type="file"
        id="file"
        ref="myFiles"
        class="custom-file-input"
        @change="previewFiles"
      />
      <button v-if="uploadedJson" @click="onDownloadHandler">Download</button>
    </div>

    <div class="row">
      <Table
        v-if="uploadedJson"
        :uploadedJson="uploadedJson"
        :onChangeMessage="onChangeMessage"
      />
    </div>
  </div>
</template>

<script>
import Table from "./components/Table.vue";

export default {
  name: "app",
  components: {
    Table
  },
  data: function() {
    return {
      uploadedJson: null
    };
  },
  methods: {
    previewFiles(event) {
      const self = this;
      const reader = new FileReader();

      reader.onload = function(_event) {
        try {
          const jsonObj = JSON.parse(_event.target.result);
          self.uploadedJson = jsonObj;
        } catch (err) {
          alert(err);
        }
      };
      reader.readAsText(event.target.files[0]);
    },
    onChangeMessage: function(code, message) {
      this.uploadedJson[code].message = message;
    },
    onDownloadHandler: function() {
      const filename = `json-${new Date().getTime()}.json`;
      const text = JSON.stringify(this.uploadedJson, null, 2);
      const element = document.createElement("a");
      element.setAttribute(
        "href",
        "data:text/plain;charset=utf-8," + encodeURIComponent(text)
      );
      element.setAttribute("download", filename);

      element.style.display = "none";
      document.body.appendChild(element);

      element.click();

      document.body.removeChild(element);
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
