import axios from 'axios';
import crypto from 'crypto';
import { NextResponse } from 'next/server';
import { getPhotosWithBase64, getSignatureKey } from '@/utils/object-storage';

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

export async function PUT(request: Request) {
  const accessKey = 'mtIVeRz3eDhYFpjIqF1c';
  const secretKey = 'x1QTNtCMK03kWlXplh2vgFU1rLhekIlV6VK5t4V5';

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const fileName = encodeURIComponent(file.name);

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
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
