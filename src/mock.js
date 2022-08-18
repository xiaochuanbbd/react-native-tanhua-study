import Mock from 'mockjs'

Mock.mock('/api/login', 'post', (options) => {
  return {
    code: '10000',
    msg: '请求成功',
    data: '888888',

  }
})
//检查验证码
Mock.mock('/api/loginVerification', 'post', (options) => {
  let data = JSON.parse(options.body)
  if (data.phone == 18229999999) {
    return {
      code: '10000',
      isNew: false,
      msg: '请求成功',
    }
  } else {
    return {
      code: '10000',
      isNew: true,
      msg: '请求成功',
    }
  }

})