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
*/
(function (window) {
  let id = 0
  const PubSub = {}
  // 缓存所有待处理的回调函数
  const callbacks = {} 
  

  // 1. token = PubSub.subscribe(name, callback): 订阅消息   相当于绑定事件监听
  PubSub.subscribe = function (name, callback) {

    // 生成token值
    const token = 'id_' + (++id)

    // 取出指定消息对应的callbacks
    let callbackObj = callbacks[name]

    /* 
    if (!callbackObj) { // 如果不存在
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
  }

  // 2. PubSub.publish(name, data): 发布消息(异步)  相当于分发(dispatch)事件
  PubSub.publish = function (name, data) {
    
  }

  // 3. PubSub.publishSync(name, data): 发布消息(同步)
  PubSub.publishSync = function (name, data) {
    
  }

  // 4. PubSub.unsubscribe(flag): 取消订阅
  PubSub.unsubscribe = function (flag) {
    
  }

  window.PubSub = PubSub
})(window)