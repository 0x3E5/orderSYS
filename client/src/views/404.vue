<template>
    <div id="lost">
        <span>非常抱歉，你迷路了...</span>
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
    color: #fff;
    position: relative;
    background-color: #a0cfff;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 900'%3E%3Cpolygon fill='%2379bbff' points='957 450 539 900 1396 900'/%3E%3Cpolygon fill='%2353a8ff' points='957 450 872.9 900 1396 900'/%3E%3Cpolygon fill='%2375b9ff' points='-60 900 398 662 816 900'/%3E%3Cpolygon fill='%2350a6ff' points='337 900 398 662 816 900'/%3E%3Cpolygon fill='%2372b7ff' points='1203 546 1552 900 876 900'/%3E%3Cpolygon fill='%234ca4ff' points='1203 546 1552 900 1162 900'/%3E%3Cpolygon fill='%236eb5ff' points='641 695 886 900 367 900'/%3E%3Cpolygon fill='%2348a2ff' points='587 900 641 695 886 900'/%3E%3Cpolygon fill='%236ab3ff' points='1710 900 1401 632 1096 900'/%3E%3Cpolygon fill='%2344a0ff' points='1710 900 1401 632 1365 900'/%3E%3Cpolygon fill='%2366b1ff' points='1210 900 971 687 725 900'/%3E%3Cpolygon fill='%23409eff' points='943 900 1210 900 971 687'/%3E%3C/svg%3E");
    background-attachment: fixed;
    background-size: cover;
  }
  #lost>span{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    font-size: 30px;
    text-shadow: #7089E7 3px 5px 3px;
    user-select: none;
  }
</style>
