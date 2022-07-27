import Mock from 'mockjs'

Mock.mock('/api/login','post',(options)=>{
  return {
      code:'10000',
      msg:'请求成功',
      data:'888888',
      
  }
})