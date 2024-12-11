// utils/object-storage-server.ts
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

interface Photo {
  id: number;
  name: string;
  lastModified: string;
  size: number;
  base64Url?: string;
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

const getAuthHeaders = (
  accessKey: string,
  secretKey: string,
  bucketName: string = 'kcc-invite',
) => {
  const date = new Date().toISOString().split('T')[0].replace(/-/g, '');
  const timestamp = new Date().toISOString().replace(/[:-]|\.\d{3}/g, '');
  const region = 'kr-standard';
  const service = 's3';

  const method = 'GET';
  const canonicalUri = `/${bucketName}`;
  const canonicalQueryString = '';
  const payloadHash = 'UNSIGNED-PAYLOAD';

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

  const signature = crypto
    .createHmac('sha256', getSignatureKey(secretKey, date, region, service))
    .update(stringToSign)
    .digest('hex');

  const authorizationHeader = [
    `${algorithm} Credential=${accessKey}/${scope}`,
    `SignedHeaders=${signedHeaders}`,
    `Signature=${signature}`,
  ].join(', ');

  return {
    Authorization: authorizationHeader,
    'x-amz-content-sha256': payloadHash,
    'x-amz-date': timestamp,
    host: 'kr.object.ncloudstorage.com',
  };
};

export const getPhotosWithBase64 = async (): Promise<Photo[]> => {
  const accessKey = 'mtIVeRz3eDhYFpjIqF1c';
  const secretKey = 'x1QTNtCMK03kWlXplh2vgFU1rLhekIlV6VK5t4V5';

  try {
    // 1. 먼저 파일 목록을 가져옴
    const listHeaders = getAuthHeaders(accessKey, secretKey);
    const listResponse = await axios.get(
      'https://kr.object.ncloudstorage.com/kcc-invite',
      { headers: listHeaders },
    );

    const parsed: ParsedResponse = await parseStringPromise(listResponse.data);
    const photos = parsed.ListBucketResult.Contents.map(
      (item: PhotoItem, index: number) => ({
        id: index + 1,
        name: `https://kr.object.ncloudstorage.com/kcc-invite/${encodeURIComponent(
          item.Key[0],
        )}`,
        lastModified: item.LastModified[0],
        size: parseInt(item.Size[0], 10),
      }),
    );

    // 2. 각 이미지를 base64로 변환
    const photosWithBase64 = await Promise.all(
      photos.map(async (photo) => {
        try {
          const imgHeaders = getAuthHeaders(
            accessKey,
            secretKey,
            `kcc-invite/${photo.name.split('/').pop()}`,
          );
          const imageResponse = await axios.get(photo.name, {
            responseType: 'arraybuffer',
            headers: imgHeaders,
          });

          const base64 = Buffer.from(imageResponse.data, 'binary').toString(
            'base64',
          );
          const contentType = imageResponse.headers['content-type'];

          return {
            ...photo,
            base64Url: `data:${contentType};base64,${base64}`,
          };
        } catch (error) {
          console.error(`Error fetching image ${photo.name}:`, error);
          return photo;
        }
      }),
    );

    return photosWithBase64;
  } catch (error) {
    console.error('Error fetching photos:', error);
    throw error;
  }
};

export async function GET() {
  try {
    const photos = await getPhotosWithBase64();
    return NextResponse.json({ photos });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
