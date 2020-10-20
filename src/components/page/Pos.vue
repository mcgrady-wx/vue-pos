<template>
    <div class="pos">
        <el-row>
            <el-col :span="7" id="order-list">
                <el-tabs>
                    <el-tab-pane label="点餐">
                        <el-table :data="goods" border show-summary style="width: 100%" >
                            <el-table-column prop="goodsName" label="商品"  ></el-table-column>
                            <el-table-column prop="count" label="数量" width="70"></el-table-column>
                            <el-table-column prop="totalprice" label="金额" width="70"></el-table-column>
                            <el-table-column  label="操作" width="100" fixed="right">
                                <template slot-scope="scope">
                                    <el-button type="text" size="small" @click="del(scope.row)">删除</el-button>
                                    <el-button type="text" size="small" @click="addGood(scope.row)">增加</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="btu">
                            <el-button type="warning" >挂单</el-button>
                            <el-button type="danger" @click="clearlist">删除</el-button>
                            <el-button type="success" @click="checkout">结账</el-button>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="挂单">
                    挂单
                    </el-tab-pane>
                    <el-tab-pane label="外卖">
                    外卖
                    </el-tab-pane>
                </el-tabs>
            </el-col>
            <el-col :span="17">
                <div class="often-goods">
                    <div class="title">常用商品</div>
                    <div class="often-goods-list">
                        <ul>
                            <li v-for="goods in oftenGoods" :key="goods.goodsId" @click="addGood(goods)">
                                <span>{{goods.goodsName}}</span>
                                <span class="o-price">￥{{goods.price}}元</span>
                            </li>

                        </ul>
                    </div>
                </div>
                <div class="goods-type">
                    <el-tabs>
                        <el-tab-pane label="汉堡">
                            <ul class='cookList'>
                                <li v-for="goods in type0Goods" :key="goods.goodsId" @click="addGood(goods)">
                                    <span class="foodImg"><img :src="goods.goodsImg" width="100%"></span>
                                    <span class="foodName">{{goods.goodsName}}</span>
                                    <span class="foodPrice">￥{{goods.price}}元</span>
                                </li>
                            </ul>
                        </el-tab-pane>
                        <el-tab-pane label="小食">
                            <ul class='cookList'>
                                <li v-for="goods in type1Goods" :key="goods.goodsId" @click="addGood(goods)">
                                    <span class="foodImg"><img :src="goods.goodsImg" width="100%"></span>
                                    <span class="foodName">{{goods.goodsName}}</span>
                                    <span class="foodPrice">￥{{goods.price}}元</span>
                                </li>
                            </ul>
                        </el-tab-pane>
                        <el-tab-pane label="饮料">
                            <ul class='cookList'>
                                <li v-for="goods in type2Goods" :key="goods.goodsId" @click="addGood(goods)">
                                    <span class="foodImg"><img :src="goods.goodsImg" width="100%"></span>
                                    <span class="foodName">{{goods.goodsName}}</span>
                                    <span class="foodPrice">￥{{goods.price}}元</span>
                                </li>
                            </ul>
                        </el-tab-pane>
                        <el-tab-pane label="套餐">
                            <ul class='cookList'>
                                <li v-for="goods in type3Goods" :key="goods.goodsId" @click="addGood(goods)">
                                    <span class="foodImg"><img :src="goods.goodsImg" width="100%"></span>
                                    <span class="foodName">{{goods.goodsName}}</span>
                                    <span class="foodPrice">￥{{goods.price}}元</span>
                                </li>
                            </ul>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import axios from 'axios'
import {mapGetters,mapActions} from 'vuex'
export default {
    data(){
        return {
            oftenGoods:[],
            type0Goods:[],
            type1Goods:[],
            type2Goods:[],
            type3Goods:[]
        }
    },
    created() {
        //获取常用商品
        axios.get('static/oftenGoods.json')
        .then(res=>{
            if (res.status===200) {
                //console.log(res)
                this.oftenGoods=res.data.data
            }
        })
        .catch(error=>{
            console.log(error);
            alert('网络错误，不能访问');
        })
        //获取分类商品
        axios.get('static/typeGoods.json')
        .then(res=>{
            if (res.status===200) {
                //console.log(res)
                this.type0Goods=res.data.data[0];
                this.type1Goods=res.data.data[1];
                this.type2Goods=res.data.data[2];
                this.type3Goods=res.data.data[3];

            }
        })
        .catch(error=>{
            console.log(error);
            alert('网络错误，不能访问');
        })
    },
    mounted() {
        //解决用Element无法设置高度100%的问题
        let winHeight=document.body.clientHeight
        document.getElementById('order-list').style.height=winHeight+'px'
    },
    computed: {
        ...mapGetters(['goods'])
    },
    methods: {
        ...mapActions(['addGoods','delGoods','clearGoods']),
        addGood(goods){//添加商品
            //创建一个商品数据
            let newGoods={goodsId:goods.goodsId,goodsName:goods.goodsName,price:goods.price,count:1,totalprice:goods.price}
            //console.log(newGoods)
            this.addGoods(newGoods)
        },
        del(goods){//删除单个商品
            //console.log(goods)
            this.delGoods(goods)
        },
        clearlist(){  //清除商品
            if (this.goods.length===0) {
                this.$message.error('无可删除订单');
                return
            }  
            this.$confirm('此操作将删除该订单, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
                this.clearGoods()
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
      
        },
        checkout(){//结账
            if (this.goods.length===0) {
                this.$message.error('无可结账订单');
                return
            }
            //模拟结账
            this.$confirm('是否确定结账?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '结账成功!'
                });
                this.clearGoods()
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
                });          
            });
        }
    },
}
</script>

<style>
.el-tabs--top .el-tabs__item.is-top:nth-child(2) {
    padding-left: 20px;
}
.btu{
    margin-top: 10px;
}
.title{
    height: 20px;
    border-bottom:1px solid #D3DCE6;
    background-color: #F9FAFC;
    padding:10px;
    text-align: left;
}
.often-goods-list ul li{
    list-style: none;
    float:left;
    border:1px solid #E5E9F2;
    padding:10px;
    margin:5px;
    background-color:#fff;
}
.o-price{
    color:#58B7FF; 
}
.goods-type{
    clear: both;
}
.cookList li{
    list-style: none;
    width:23%;
    border:1px solid #E5E9F2;
    height: auot;
    overflow: hidden;
    background-color:#fff;
    padding: 2px;
    float:left;
    margin: 2px;
}
.cookList li span{
    display: block;
    float:left;
}
.foodImg{
    width: 80px;
    height: 80px;
}
.foodName{
    font-size: 20px;
    padding-left: 10px;
    color:brown;
}
.foodPrice{
    font-size: 20px;
    padding-left: 10px;
    padding-top:10px;
}
</style>