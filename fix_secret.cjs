const fs = require('fs');
const credentials = {
  "type": "service_account",
  "project_id": "integrityclosings-calendar",
  "private_key_id": "9dce1a811e83a58828aa2383be3347e2091afdc02",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC0zQCruSFCAA Yl\ntQVsqsCQpAZLPMzvuAVmm12bZ9kDpsOStlrvhDPOQlPV7w+FCzD5rhlqDG0fp1/n\nK/CLK/EMQBmFlFgPFVYSfK+yLwlgeAQ09Vk3D4DXxJKRzrlavePxzNmTvCuR14kI\nm3M3t/UihFk6nu1ir4Hv4DswGogixYAIbMgR424PXWxQTq04H39pTnEHRadUKsI4\nCD2FAGhbajLYLslfSOMq1XorUCBkvh8GytdVYxgkfbZbqpsMTv00iNjCPgl9Mv5g\n8bcko20uMBJNs5nAvXuOjEjRGzuj60hpZ920hujZOPtUWcaRWe8QLlnwtV9M/86m\nbmYMDwiBAgMBAAECggEAEucsHsgoVgIyolaezpG7uGOt1MfylU2kIuozyz/8TIlv\nATPXphsoX3RH16I6+SoGYNR3C8No1VpmiIDrkWFyvlklUfYEju8oJJ6sr/CDBncF\n2ZOdVEhmrCh9Oolmj7oyzuEgDnYqCAGE7kVycmzlUEqOGbbsEtlOuIm1Jn5fpWLb\nuJ5yBtZqt6XEA65gWX8rhC+NloTHoC3Ch3rmdnkCZP4bHKMkbMO0WZFG1obH5zJq\nSjOknM7vOPdyCBqSu8JM7yAzdYqSiWH50ZMQ5mw50PmeG8bWMqVFxb8uewrLxp vH\njpGd6/PvE1VbyeYBV35Hd4/+QFmIKLTptlrsxbuQUQKBAgDn b94131Q3TdVmEqvS\nwGcmmAJDAetZNlDt/NA4sDGA lqAHfTmn6kh8dfgeagN9WgRdYSsM8f0j5upar+umf\nhfUi62I2DPRs12ruJ8ugAUb3TDwkERNCBqI3OmPlyd2O8usRDvRAH0joLSJCeqwb\nTE/f/WrDXsycKSOskOKAL3WHwwKBgQDH/VoEU2u8uzyTK8NIKlNI4wk+JTqqahnm\n6Sw1le/h71ECSWxL5AYDWTQURyY5o2muulPzEFr+sIvEKDlL5lXUXo6esdK5xHr\nU7eOyc0iJfi/QkUbc fG0mV C6hSz7GQgOUUqmMTGijIogcZjsq7jy6KP8xx6xbACC\nTlEa4+juawKBgHXlRdQ5rSPzEVZGMKNOgf1N3RdAO/UPIvPcp6+Gql/kYvfhHcTNE\nxnb2oZbyOVNOtX6zrxsdWCZnB6QaUHKKEaelE8SXJmaXsYrtpKFCC9fK6MhTJYf8L\ndA0gQI1pNOVC F7772C7mAPTNMNRuedBf/2tymsoFNxHt0dYiZqxrzkjKTAoGAMXM\nHns55ylJMV5raL5Y308kuHCgcZ9i30aUMNNdIUtLEXSL77Gqo9oKRe3Pn+Z7Av+a\ngMaZt840JY9XjC1QGOMp5k1rbeHSxgnQVa1Kd3vlARk6r3Xo357p7dx+eGA7eUJ4\nnIiDcr8ZtKhecR9MkW Eb+KlxkWOH+RpeC4r6ggMCgYBwX/0BmAB1uwz6djEHww5d\nttO4Ng1JIxPQ8YX4oMp4G9crSow5pjoTSmt72PD22ISef/f1Tl8YtNvoGPNvonDE\nrmAZoV43sm7Z/kl1+tCpj4f487dldwXZobh9b2N9SO1nN/vn5pOQ/M1EBpT7eZEy\n98QmMHJWEZVHIiDEyyja9Q==\n-----END PRIVATE KEY-----\n",
  "client_email": "integrityclosings-website-cale@integrityclosings-calendar.iam.gserviceaccount.com",
  "client_id": "105741774804675678829",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/integrityclosings-website-cale%40integrityclosings-calendar.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
};
const encoded = Buffer.from(JSON.stringify(credentials)).toString('base64');
fs.writeFileSync('calendar-secret.js', `export const ENCODED_CREDENTIALS = "${encoded}";\n`);
console.log('Successfully updated calendar-secret.js');
