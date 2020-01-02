import qiniu from 'qiniu';

function fileConfig(config) {
  const qiniuConfig = new qiniu.conf.Config();
  // qiniuConfig.zone = qiniu.zone.Zone_z1; // 空间对应的机房 华北

  const fileConfig = {
    accessKey: config.accessKey,
    secretKey: config.secretKey,
    bucket: config.bucket,
    domain: config.domain,
    putExtra: new qiniu.form_up.PutExtra(),
    formUploader: new qiniu.form_up.FormUploader(qiniuConfig),
    uploadToken: '',
  };

  const mac = new qiniu.auth.digest.Mac(
    fileConfig.accessKey,
    fileConfig.secretKey,
  );
  const putPolicy = new qiniu.rs.PutPolicy({ scope: fileConfig.bucket });
  fileConfig.uploadToken = putPolicy.uploadToken(mac);
  return fileConfig;
}

export default fileConfig;
