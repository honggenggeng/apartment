export default{
    //在局部的store分支上  只有getters和action这两个属性里的方法可以接受跟root中的数据 （rootstate,rootGetters）
    //mutations只能接受局部的参数 是因为他第二个参数是外部传进来的，而action可以就收root因为他第一个参数是结构赋值 可以就收root中的参数
    //在vuex组件中mutations和actions中的方法接受的参数第二个只能是外部传来的参数 如果多个参数需要传进来就要以对象的形式传送
    //也就是说mutations和actions中的方法接受外部的参数只能以第二个形参接受 只能是第二的形参接受外部的参数多个参数需要传进 就要用obj的形式
    namespaced:true,
    state:{
        number:1,
        tal:"modulesA中的数据",
        Authorization:false,
      },
      getters:{
          //局部的个getters中的方法可以接受的参数有state,getters,rootState,rootGetters
          re:function(state,getters,rootState,rootGetters){//顺序不能更换
              return state.number+rootState.information
          }
      },
      mutations:{
        add(state,can2){
          alert(state.number)
          state.number+=can2
        },
        changeAutho1(state){ //根据判断改变请求头部的Authorization
          state.Authorization=true
        },
        changeAutho2(state){ //根据判断改变请求头部的Authorization
          state.Authorization=false
        }
      },
      actions:{
        //   局部的actions中方法第一个参数接受的可以有{state,getters,commit,rootState,rootGetters}
        addplus({state,commit,rootState},can2){
          setTimeout(function(){
            state.number+=rootState.information
            commit("add",can2) //把跟store中的information属性传过去
          },300)
        },
      },
}