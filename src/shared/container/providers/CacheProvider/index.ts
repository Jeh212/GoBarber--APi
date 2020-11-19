import {container} from 'tsyringe'


import ICacheProvider from './model/ICacheProvider'
import RedisCacheProvider from './implementations/RedisCacheProvider'


const provider = {
  redis:RedisCacheProvider,
}


container.registerSingleton<ICacheProvider>(
  'CacheProvider',
  RedisCacheProvider,
)