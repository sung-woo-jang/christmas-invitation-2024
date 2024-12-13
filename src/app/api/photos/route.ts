import axios from 'axios';
import crypto from 'crypto';
import { NextResponse } from 'next/server';
import sharp from 'sharp';
import { getPhotosWithBase64, getSignatureKey } from '@/utils/object-storage';
import { randomBytes } from 'node:crypto';

export async function GET() {
  try {
    const photos = await getPhotosWithBase64();
    return NextResponse.json(
      { photos },
      {
        headers: {
          'Cache-Control': 'no-store, must-revalidate',
          Pragma: 'no-cache',
        },
      },
    );
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request) {
  const accessKey = 'mtIVeRz3eDhYFpjIqF1c';
  const secretKey = 'x1QTNtCMK03kWlXplh2vgFU1rLhekIlV6VK5t4V5';

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const fileExtension = file.name.split('.').pop();
    const uniqueString = randomBytes(8).toString('hex');
    const fileName = encodeURIComponent(
      `${Date.now()}_${uniqueString}.${fileExtension}`,
    );
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    /*
     interface FitEnum {
        contain: 'contain';
        cover: 'cover';
        fill: 'fill';
        inside: 'inside';
        outside: 'outside';
    }
    */

    const buffer = await sharp(Buffer.from(await file.arrayBuffer()))
      .resize({
        width: 430,
        height: 932,
        fit: 'contain',
        withoutEnlargement: true,
      })
      .jpeg({ quality: 80 })
      .toBuffer();

    const date = new Date().toISOString().split('T')[0].replace(/-/g, '');
    const timestamp = new Date().toISOString().replace(/[:-]|\.\d{3}/g, '');
    const region = 'kr-standard';
    const service = 's3';
    const method = 'PUT';
    const bucketName = 'kcc-invite';

    const canonicalUri = `/${bucketName}/${fileName}`;
    const canonicalQueryString = '';
    const payloadHash = crypto
      .createHash('sha256')
      .update(buffer)
      .digest('hex');

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

    const headers = {
      Authorization: authorizationHeader,
      'x-amz-content-sha256': payloadHash,
      'x-amz-date': timestamp,
      'Content-Type': file.type,
      host: 'kr.object.ncloudstorage.com',
    };

    await axios.put(
      `https://kr.object.ncloudstorage.com/${bucketName}/${fileName}`,
      buffer,
      { headers },
    );

    return NextResponse.json({
      success: true,
      url: `https://kr.object.ncloudstorage.com/${bucketName}/${fileName}`,
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request) {
  const accessKey = 'mtIVeRz3eDhYFpjIqF1c';
  const secretKey = 'x1QTNtCMK03kWlXplh2vgFU1rLhekIlV6VK5t4V5';

  try {
    // URL에서 파일 경로 파라미터 추출
    const { searchParams } = new URL(request.url);
    const fileName = searchParams.get('fileName');

    if (!fileName) {
      return NextResponse.json(
        { error: 'No file name provided' },
        { status: 400 },
      );
    }

    const date = new Date().toISOString().split('T')[0].replace(/-/g, '');
    const timestamp = new Date().toISOString().replace(/[:-]|\.\d{3}/g, '');
    const region = 'kr-standard';
    const service = 's3';
    const method = 'DELETE';
    const bucketName = 'kcc-invite';

    // URI 생성
    const canonicalUri = `/${bucketName}/${encodeURIComponent(fileName)}`;
    const canonicalQueryString = '';
    const payloadHash = 'UNSIGNED-PAYLOAD';

    // 헤더 생성
    const canonicalHeaders =
      [
        `host:kr.object.ncloudstorage.com`,
        `x-amz-content-sha256:${payloadHash}`,
        `x-amz-date:${timestamp}`,
      ].join('\n') + '\n';

    const signedHeaders = 'host;x-amz-content-sha256;x-amz-date';

    // 정규화된 요청 생성
    const canonicalRequest = [
      method,
      canonicalUri,
      canonicalQueryString,
      canonicalHeaders,
      signedHeaders,
      payloadHash,
    ].join('\n');

    // 서명 문자열 생성
    const algorithm = 'AWS4-HMAC-SHA256';
    const scope = `${date}/${region}/${service}/aws4_request`;
    const stringToSign = [
      algorithm,
      timestamp,
      scope,
      crypto.createHash('sha256').update(canonicalRequest).digest('hex'),
    ].join('\n');

    // 서명 생성
    const signature = crypto
      .createHmac('sha256', getSignatureKey(secretKey, date, region, service))
      .update(stringToSign)
      .digest('hex');

    // Authorization 헤더 생성
    const authorizationHeader = [
      `${algorithm} Credential=${accessKey}/${scope}`,
      `SignedHeaders=${signedHeaders}`,
      `Signature=${signature}`,
    ].join(', ');

    // 요청 헤더 설정
    const headers = {
      Authorization: authorizationHeader,
      'x-amz-content-sha256': payloadHash,
      'x-amz-date': timestamp,
      host: 'kr.object.ncloudstorage.com',
    };

    // DELETE 요청 실행
    await axios.delete(`https://kr.object.ncloudstorage.com${canonicalUri}`, {
      headers,
    });

    return NextResponse.json({
      success: true,
      message: 'File deleted successfully',
    });
  } catch (error: any) {
    console.error('Error deleting file:', error);

    // 에러 응답 처리
    if (error.response) {
      return NextResponse.json(
        {
          error: 'Failed to delete file',
          status: error.response.status,
          message: error.response.data,
        },
        { status: error.response.status },
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
