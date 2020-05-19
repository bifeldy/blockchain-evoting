// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const environment = {
  production: false,
  reCaptchaSecretKey: '6Ld4Bt4UAAAAALX2r3L0IcCKbwsXwGRX6dx5LlmM',
  apiKpuWeb: 'https://lindungihakpilihmu.kpu.go.id/index.php/dpt/proses_ceknik',
  dbHost: 'blockchain.coytj6xgui1h.us-east-1.rds.amazonaws.com',
  dbUser: 'bifeldy',
  dbPassword: '1234567890',
  dbName: 'evoting',
  ethIP: 'bifeldy.ip-dynamic.net',
  // From Reversed Engineer KPU-RI.apk
  apiKpuAndroid: 'https://r.kpu.go.id/Vi/cek_pemilih_tes',
  kpuAndroidSecretKey: '907f54d9ed0bd3d148e9599e3ad83867'
};

module.exports = environment;

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
