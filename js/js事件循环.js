A:异步和同步任务
    主线程中执行 形成执行栈 另外还要任务队列用于保存异步任务

    主线程不断重复
        1：执行栈 同步任务
        2：遇到异步任务放置到任务队列中
        3：执行完同步任务 检查是否有异步任务 并全部执行 


B:宏任务和微任务
    宏任务
        script(整体代码)、setTimeout、setInterval、UI 渲染、 I/O、postMessage、 MessageChannel、setImmediate(Node.js 环境)
    微任务
        Promise、 MutaionObserver、process.nextTick(Node.js环境）

            1：script等[宏任务] 
            2：执行完宏任务
            3：是否有微任务 【无 执行下一个宏任务】
            4：【有 微任务】执行所有微任务
            5：执行下一个宏任务 ---> 1
