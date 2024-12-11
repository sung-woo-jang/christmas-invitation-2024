// src/app/api/photos/route.ts
import { NextResponse } from 'next/server';
import axios from 'axios';
import crypto from 'crypto';
import { parseStringPromise } from 'xml2js';

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

export async function GET() {
  try {
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
    // console.log(response);
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

    return NextResponse.json({ photos });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}

// src/app/api/photos/route.ts
export async function PUT(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const fileName = formData.get('fileName') as string;

    const date = new Date().toISOString().split('T')[0].replace(/-/g, '');
    const timestamp = new Date().toISOString().replace(/[:-]|\.\d{3}/g, '');
    const accessKey = 'ncp_iam_BPAMKR3V7PDLzwbyQHQo';
    const secretKey = 'ncp_iam_BPKMKRLgjIRSPKDkytSgsV68238Iu54hn2';
    const region = 'kr-standard';
    const service = 's3';

    // 파일을 버퍼로 변환
    const buffer = Buffer.from(await file.arrayBuffer());
    const payloadHash = crypto
      .createHash('sha256')
      .update(buffer)
      .digest('hex');

    const canonicalHeaders =
      [
        `content-length:${buffer.length}`,
        `content-type:${file.type}`,
        `host:kr.object.ncloudstorage.com`,
        `x-amz-content-sha256:${payloadHash}`,
        `x-amz-date:${timestamp}`,
      ].join('\n') + '\n';

    const signedHeaders =
      'content-length;content-type;host;x-amz-content-sha256;x-amz-date';

    const canonicalRequest = [
      'PUT',
      `/kcc-invite/${encodeURIComponent(fileName)}`,
      '',
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

    // 서명키 생성 함수는 기존과 동일

    const signature = crypto
      .createHmac('sha256', getSignatureKey(secretKey, date, region, service))
      .update(stringToSign)
      .digest('hex');

    const authorizationHeader = [
      `${algorithm} Credential=${accessKey}/${scope}`,
      `SignedHeaders=${signedHeaders}`,
      `Signature=${signature}`,
    ].join(', ');

    const response = await axios.put(
      `https://kr.object.ncloudstorage.com/kcc-invite/${encodeURIComponent(fileName)}`,
      buffer,
      {
        headers: {
          'Content-Type': file.type,
          'Content-Length': buffer.length,
          Authorization: authorizationHeader,
          'x-amz-content-sha256': payloadHash,
          'x-amz-date': timestamp,
        },
      },
    );

    return NextResponse.json({
      success: true,
      message: 'File uploaded successfully',
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
