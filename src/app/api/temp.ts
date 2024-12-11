import axios from 'axios';
import crypto from 'crypto';
import { parseStringPromise } from 'xml2js';
import { NextResponse } from 'next/server';

interface PhotoItem {
  Key: string[];
  LastModified: string[];
  Size: string[];
}

interface ParsedResponse {
  ListBucketResult: {
    Contents: PhotoItem[];
  };
}

const getSignatureKey = (
  key: string,
  dateStamp: string,
  regionName: string,
  serviceName: string,
) => {
  const kDate = crypto
    .createHmac('sha256', 'AWS4' + key)
    .update(dateStamp)
    .digest();
  const kRegion = crypto
    .createHmac('sha256', kDate)
    .update(regionName)
    .digest();
  const kService = crypto
    .createHmac('sha256', kRegion)
    .update(serviceName)
    .digest();
  return crypto.createHmac('sha256', kService).update('aws4_request').digest();
};

export const getList = async () => {
  const date = new Date().toISOString().split('T')[0].replace(/-/g, '');
  const timestamp = new Date().toISOString().replace(/[:-]|\.\d{3}/g, '');

  const accessKey = 'ncp_iam_BPAMKR3V7PDLzwbyQHQo';
  const secretKey = 'ncp_iam_BPKMKRLgjIRSPKDkytSgsV68238Iu54hn2';
  const region = 'kr-standard';
  const service = 's3';

  const method = 'GET';
  const canonicalUri = '/kcc-invite';
  const canonicalQueryString = '';
  const payloadHash =
    'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855';

  const canonicalHeaders =
    [
      `host:kr.object.ncloudstorage.com`,
      `x-amz-content-sha256:${payloadHash}`,
      `x-amz-date:${timestamp}`,
    ].join('\n') + '\n';

  const signedHeaders = 'host;x-amz-content-sha256;x-amz-date';

  const canonicalRequest = [
    method,
    canonicalUri,
    canonicalQueryString,
    canonicalHeaders,
    signedHeaders,
    payloadHash,
  ].join('\n');

  const algorithm = 'AWS4-HMAC-SHA256';
  const scope = `${date}/${region}/${service}/aws4_request`;
  const stringToSign = [
    algorithm,
    timestamp,
    scope,
    crypto.createHash('sha256').update(canonicalRequest).digest('hex'),
  ].join('\n');

  const getSignatureKey = (
    key: string,
    dateStamp: string,
    regionName: string,
    serviceName: string,
  ) => {
    const kDate = crypto
      .createHmac('sha256', 'AWS4' + key)
      .update(dateStamp)
      .digest();
    const kRegion = crypto
      .createHmac('sha256', kDate)
      .update(regionName)
      .digest();
    const kService = crypto
      .createHmac('sha256', kRegion)
      .update(serviceName)
      .digest();
    const kSigning = crypto
      .createHmac('sha256', kService)
      .update('aws4_request')
      .digest();
    return kSigning;
  };

  const signature = crypto
    .createHmac('sha256', getSignatureKey(secretKey, date, region, service))
    .update(stringToSign)
    .digest('hex');

  const authorizationHeader = [
    `${algorithm} Credential=${accessKey}/${scope}`,
    `SignedHeaders=${signedHeaders}`,
    `Signature=${signature}`,
  ].join(', ');

  const response = await axios.get(
    'https://kr.object.ncloudstorage.com/kcc-invite',
    {
      headers: {
        Authorization: authorizationHeader,
        'x-amz-content-sha256': payloadHash,
        'x-amz-date': timestamp,
      },
    },
  );

  // XML을 JSON으로 파싱
  const parsed: ParsedResponse = await parseStringPromise(response.data);

  // 필요한 데이터만 추출하여 가공
  const photos = parsed.ListBucketResult.Contents.map(
    (item: PhotoItem, index: number) => ({
      id: index + 1,
      name: `https://kr.object.ncloudstorage.com/kcc-invite/${encodeURIComponent(item.Key[0])}`,
      lastModified: item.LastModified[0],
      size: parseInt(item.Size[0], 10),
    }),
  );

  console.log(photos);
};
