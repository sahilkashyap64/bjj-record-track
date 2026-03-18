import type { ExportPayload } from '@/types';

const SHARE_PREFIX = 'ML1.';

const bytesToBase64Url = (bytes: Uint8Array) => {
  let binary = '';
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
};

const base64UrlToBytes = (value: string) => {
  const base64 = value.replace(/-/g, '+').replace(/_/g, '/');
  const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, '=');
  const binary = atob(padded);
  return Uint8Array.from(binary, (char) => char.charCodeAt(0));
};

const compressText = async (text: string) => {
  if (typeof CompressionStream === 'undefined') {
    throw new Error('Compression is not supported on this device.');
  }
  const stream = new Blob([text]).stream().pipeThrough(new CompressionStream('gzip'));
  const buffer = await new Response(stream).arrayBuffer();
  return new Uint8Array(buffer);
};

const decompressText = async (bytes: Uint8Array) => {
  if (typeof DecompressionStream === 'undefined') {
    throw new Error('Import from link is not supported on this device.');
  }
  const copy = new Uint8Array(bytes.byteLength);
  copy.set(bytes);
  const stream = new Blob([copy as unknown as BlobPart]).stream().pipeThrough(new DecompressionStream('gzip'));
  return new Response(stream).text();
};

export const buildSharePayload = async (payload: ExportPayload) => {
  const compressed = await compressText(JSON.stringify(payload));
  return `${SHARE_PREFIX}${bytesToBase64Url(compressed)}`;
};

export const buildShareUrl = async (payload: ExportPayload) => {
  const encoded = await buildSharePayload(payload);
  const url = new URL(window.location.href);
  url.hash = `share=${encoded}`;
  return url.toString();
};

export const readSharePayloadFromLocation = () => {
  const hash = window.location.hash.replace(/^#/, '');
  if (!hash.startsWith('share=')) return null;
  const value = decodeURIComponent(hash.slice('share='.length));
  if (!value.startsWith(SHARE_PREFIX)) return null;
  return value;
};

export const parseSharePayload = async (encoded: string): Promise<ExportPayload> => {
  const compressed = base64UrlToBytes(encoded.slice(SHARE_PREFIX.length));
  const json = await decompressText(compressed);
  const parsed = JSON.parse(json) as ExportPayload;
  if (parsed.version !== 1) {
    throw new Error('Unsupported backup version.');
  }
  return parsed;
};

export const clearSharePayloadFromLocation = () => {
  const url = new URL(window.location.href);
  url.hash = '';
  window.history.replaceState({}, document.title, url.toString());
};
