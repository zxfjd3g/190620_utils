/* 
自定义消息订阅与发布的模块
1. 定义整体结构: 定义所有语法(但不实现)
2. 设计内部容器的数据结构:
      {
        "add": {
          'token1': fn1,
          'token2': fn2
        },
        "remove": {
          'token1': fn3
        }
      }
3. 实现订阅
4. 实现异步/同步发布
5. 取消订阅
*/
(function (window) {
  let id = 0
  const PubSub = {}
  // 缓存所有待处理的回调函数
  let callbacks = {} 
  

  // 1. token = PubSub.subscribe(name, callback): 订阅消息   相当于绑定事件监听
  PubSub.subscribe = function (name, callback) {

    // 生成token值
    const token = `id_${name}_${++id}`  // token的组成: 前缀_消息名_唯一的ID值

    // 取出指定消息对应的callbacks
    let callbackObj = callbacks[name]

    /* 
    if (!callbackObj) { 
      callbacks[name] = {
        [token]: callback
      }
    } else {
      callbackObj[token] = callback
    } */

    if (!callbackObj) { // 如果当前小容器不存在
      callbackObj = {} // 创建一个新的
      callbacks[name] = callbackObj // 将小容器添加到大容器中
    }
    callbackObj[token] = callback // 将回调函数添加到小容器中

    return token
  }

  // 2. PubSub.publish(name, data): 发布消息(异步)  相当于分发(dispatch)事件
  PubSub.publish = function (name, data) {
    // 得到对应的所有回调函数
    const callbackObj = callbacks[name]
    if (callbackObj) {
      // 异步执行所有回调函数
      setTimeout(() => {
        Object.values(callbackObj).forEach(callback => {
          callback(name, data)
        })
      })
    }
  }

  // 3. PubSub.publishSync(name, data): 发布消息(同步)
  PubSub.publishSync = function (name, data) {
    // 得到对应的所有回调函数
    const callbackObj = callbacks[name]
    if (callbackObj) {
      // 同步执行所有回调函数
      Object.values(callbackObj).forEach(callback => {
        callback(name, data)
      })
    }
  }

  // 4. PubSub.unsubscribe(flag): 取消订阅
  PubSub.unsubscribe = function (flag) {
    // 1. flag如果没值, 取消所有
    if (flag===undefined) {
      callbacks = {}
    } else if (typeof flag === 'string') {
      // 2. 如果flag是一个token, 取消一个回调函数
      if (flag.indexOf('id_')===0) {
        // 得到对应的消息名
        const msgName = flag.split('_')[1]
        const callbackObj = callbacks[msgName]
        if (callbackObj) {
          delete callbackObj[flag]  // 删除保存对应回调函数的属性
        }
      } else {
        // 3. 如果消息名, 取消此消息的所有回调函数
        delete callbacks[flag]
        // callbacks[flag] = {}
      }
    } else {
      throw new Error('传入的参数只能是string类型')
    }
  }

  window.PubSub = PubSub
})(window)