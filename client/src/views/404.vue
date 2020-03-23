<template>
    <div id="lost">
        <div class="not-found">
          <span class="title">Oops，您的访问出错了！...</span>
          <span class="link"><el-link href="javascript:window.history.go(-1)" type="primary">&gt;点击此处，返回上一页&lt;</el-link></span>
        </div>
    </div>
</template>

<script>
export default {
  name: 'NotFound'
}
</script>

<style scoped>
  #lost{
    width: 100%;
    height: 100%;
    color: #333;
    position: relative;
  }
  #lost>.not-found{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);

    user-select: none;
  }
  #lost>.not-found>.title{
    font-size: 30px;
    text-shadow: rgb(152, 169, 233) 3px 5px 3px;
  }
  #lost>.not-found>.link{
    text-align: center;
    display: block;
    margin-top: 20px;
  }
</style>
