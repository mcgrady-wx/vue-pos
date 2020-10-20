const actions={
    addGoods({commit,state},good){//添加商品
        let newGoods=state.goods.slice()
        //获得需要添加的数据在列表中的下标，如果存在只需要商品数量+1，如不存在直接push
        let index=newGoods.findIndex((item)=>{
            return item.goodsId===good.goodsId
        })
    
        if (index===-1) {//不存在
            newGoods.push(good)
        } else {//存在，只数量+1，价格数量*单价
            newGoods[index].count++
            newGoods[index].totalprice=newGoods[index].count*newGoods[index].price
        }
        //发起 commit改变列表
        commit('getNewGoods',newGoods)
    },
    delGoods({commit,state},good){//删除单个商品
        let newGoods=state.goods.slice()
        //获得需要删除的商品在数组列表中的下标
        let index=newGoods.findIndex((item)=>{
            return item.goodsId===good.goodsId
        })
        newGoods.splice(index,1)//删除元素
        //发起 commit改变列表
        commit('getNewGoods',newGoods)
    },
    clearGoods({commit}){//清除商品列表
        let newGoods=[]
        //发起 commit改变列表
        commit('getNewGoods',newGoods)
    }
}


export default actions