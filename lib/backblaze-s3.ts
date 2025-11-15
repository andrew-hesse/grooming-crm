import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

/**
 * Backblaze B2 S3 Client Configuration
 * Uses S3-compatible API for photo storage
 */

// Initialize S3 client for Backblaze B2
const s3Client = new S3Client({
  endpoint: process.env.BACKBLAZE_ENDPOINT || 'https://s3.us-west-004.backblazeb2.com',
  region: process.env.BACKBLAZE_REGION || 'us-west-004',
  credentials: {
    accessKeyId: process.env.BACKBLAZE_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.BACKBLAZE_SECRET_ACCESS_KEY || '',
  },
});

const BUCKET_NAME = process.env.BACKBLAZE_BUCKET_NAME || '';

/**
 * Upload a file to Backblaze B2
 *
 * @param file - File buffer to upload
 * @param key - S3 object key (path in bucket)
 * @param contentType - MIME type of the file
 * @returns Promise with upload result including URL
 *
 * @example
 * ```typescript
 * const result = await uploadToBackblaze(
 *   fileBuffer,
 *   'appointments/123/photo1.jpg',
 *   'image/jpeg'
 * );
 * console.log(result.url); // Public URL to the photo
 * ```
 */
export async function uploadToBackblaze(
  file: Buffer,
  key: string,
  contentType: string
): Promise<{ url: string; key: string }> {
  try {
    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
      Body: file,
      ContentType: contentType,
      // Make the file publicly readable
      ACL: 'public-read',
    });

    await s3Client.send(command);

    // Construct the public URL
    const url = `${process.env.BACKBLAZE_ENDPOINT}/${BUCKET_NAME}/${key}`;

    return { url, key };
  } catch (error) {
    console.error('Error uploading to Backblaze:', error);
    throw new Error('Failed to upload file to Backblaze B2');
  }
}

/**
 * Generate a presigned URL for secure file upload
 * Useful for client-side direct uploads
 *
 * @param key - S3 object key
 * @param expiresIn - URL expiration time in seconds (default: 3600 = 1 hour)
 * @returns Presigned URL for upload
 */
export async function getPresignedUploadUrl(
  key: string,
  contentType: string,
  expiresIn: number = 3600
): Promise<string> {
  try {
    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
      ContentType: contentType,
      ACL: 'public-read',
    });

    const signedUrl = await getSignedUrl(s3Client, command, { expiresIn });
    return signedUrl;
  } catch (error) {
    console.error('Error generating presigned URL:', error);
    throw new Error('Failed to generate presigned upload URL');
  }
}

/**
 * Generate a presigned URL for file download
 * Useful for private files that need temporary access
 *
 * @param key - S3 object key
 * @param expiresIn - URL expiration time in seconds (default: 3600 = 1 hour)
 * @returns Presigned URL for download
 */
export async function getPresignedDownloadUrl(
  key: string,
  expiresIn: number = 3600
): Promise<string> {
  try {
    const command = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
    });

    const signedUrl = await getSignedUrl(s3Client, command, { expiresIn });
    return signedUrl;
  } catch (error) {
    console.error('Error generating presigned download URL:', error);
    throw new Error('Failed to generate presigned download URL');
  }
}

/**
 * Delete a file from Backblaze B2
 *
 * @param key - S3 object key to delete
 * @returns Promise that resolves when deletion is complete
 *
 * @example
 * ```typescript
 * await deleteFromBackblaze('appointments/123/photo1.jpg');
 * ```
 */
export async function deleteFromBackblaze(key: string): Promise<void> {
  try {
    const command = new DeleteObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
    });

    await s3Client.send(command);
  } catch (error) {
    console.error('Error deleting from Backblaze:', error);
    throw new Error('Failed to delete file from Backblaze B2');
  }
}

/**
 * Generate a unique file key for appointment photos
 * Format: appointments/{appointmentId}/{timestamp}-{filename}
 *
 * @param appointmentId - UUID of the appointment
 * @param filename - Original filename
 * @returns Unique S3 key
 */
export function generatePhotoKey(appointmentId: string, filename: string): string {
  const timestamp = Date.now();
  const sanitizedFilename = filename.replace(/[^a-zA-Z0-9.-]/g, '_');
  return `appointments/${appointmentId}/${timestamp}-${sanitizedFilename}`;
}

/**
 * Get the public URL for a file in Backblaze B2
 *
 * @param key - S3 object key
 * @returns Public URL to access the file
 */
export function getPublicUrl(key: string): string {
  return `${process.env.BACKBLAZE_ENDPOINT}/${BUCKET_NAME}/${key}`;
}

/**
 * Validate file type for photo uploads
 * Only allows image files
 *
 * @param mimeType - MIME type to validate
 * @returns true if valid image type
 */
export function isValidImageType(mimeType: string): boolean {
  const allowedTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
    'image/heic',
    'image/heif',
  ];
  return allowedTypes.includes(mimeType.toLowerCase());
}

/**
 * Validate file size for uploads
 * Maximum 10MB per photo
 *
 * @param sizeInBytes - File size in bytes
 * @returns true if within size limit
 */
export function isValidFileSize(sizeInBytes: number): boolean {
  const MAX_SIZE = 10 * 1024 * 1024; // 10MB
  return sizeInBytes <= MAX_SIZE;
}
