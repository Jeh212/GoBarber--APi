import { container } from 'tsyringe';
import uploadConfig from '@config/upload'

import IStorageProvider from '../providers/StorageProviders/models/IStorageProvider';
import DiskStorageProvider from '../providers/StorageProviders/implementations/DiskStorageProvider';

import IMailProvider from './MailProvider/models/IMailProvider';
import EtherealMailProvider from './MailProvider/implementations/EtherealMailProvider';

import IMailTemplateProvider from './MailTemplateProvider/models/IMailTemplateProvider';
import HandleBarsMailTemplateProivider from './MailTemplateProvider/implementations/HandleBarsMailTemplateProvider';


import S3StorageProvider from '../providers/StorageProviders/implementations/S3StorageProvider';


const providers  ={

  disk:DiskStorageProvider,
  s3:S3StorageProvider,

};

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  providers[uploadConfig.driver],
);

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  HandleBarsMailTemplateProivider,
);

container.registerInstance<IMailProvider>(
  'MailProvider',
  container.resolve(EtherealMailProvider),
);



