<template>
    <div id="showQRCode">
        <el-dialog
        :title="qrcodeData.title+'号桌二维码'"
        :visible.sync="qrcodeData.visible"
        close-on-click-modal
        width="300px"
        center>
        <img class="qrcodeIMG" :src="qrcodeURL" alt="">
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="qrcodeData.visible = false">确 定</el-button>
        </span>
        </el-dialog>
    </div>
</template>

<script>
import QRCode from 'qrcode'
export default {
  name: 'showQRCode',
  props: { qrcodeData: Object },
  data () {
    return {
      qrcodeURL: ''
    }
  },
  methods: {
    drawQRCode (data) {
      QRCode.toDataURL(data, (err, url) => {
        this.qrcodeURL = url
      })
    }
  }
}
</script>

<style scoped>
    .qrcodeIMG{
        display: block;
        width: 200px;
        height: 200px;
        margin: 0 auto;
    }
</style>
