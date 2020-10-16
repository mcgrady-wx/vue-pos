<template>
    <div class="pos">
        <el-row>
            <el-col :span="7" id="order-list">我是订单栏</el-col>
            <el-col :span="17">我是产品栏</el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    mounted() {
        //解决用Element无法设置高度100%的问题
        let winHeight=document.body.clientHeight
        document.getElementById('order-list').style.height=winHeight+'px'
    },
}
</script>

<style>
#order-list{
    background: chartreuse;
}
</style>