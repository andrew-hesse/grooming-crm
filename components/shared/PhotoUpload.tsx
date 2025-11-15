"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface PhotoUploadProps {
  appointmentId: string;
  onUploadSuccess?: (photos: UploadedPhoto[]) => void;
  maxFiles?: number;
}

interface UploadedPhoto {
  id: string;
  url: string;
  filename: string;
}

/**
 * PhotoUpload Component - Drag and drop photo upload for appointments
 * Uploads photos to Backblaze S3 during grooming visits
 *
 * @example
 * ```tsx
 * <PhotoUpload
 *   appointmentId="123e4567-e89b-12d3-a456-426614174000"
 *   onUploadSuccess={(photos) => console.log(photos)}
 *   maxFiles={10}
 * />
 * ```
 */
export function PhotoUpload({ appointmentId, onUploadSuccess, maxFiles = 10 }: PhotoUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadedPhotos, setUploadedPhotos] = useState<UploadedPhoto[]>([]);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setError(null);
      setUploading(true);

      try {
        const formData = new FormData();
        formData.append('appointmentId', appointmentId);

        acceptedFiles.forEach((file) => {
          formData.append('photos', file);
        });

        const response = await fetch('/api/appointments/upload-photos', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Upload failed');
        }

        const data = await response.json();
        setUploadedPhotos((prev) => [...prev, ...data.photos]);
        onUploadSuccess?.(data.photos);
      } catch (err) {
        setError('Failed to upload photos. Please try again.');
        console.error('Upload error:', err);
      } finally {
        setUploading(false);
      }
    },
    [appointmentId, onUploadSuccess]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp', '.heic'],
    },
    maxFiles: maxFiles - uploadedPhotos.length,
    maxSize: 10 * 1024 * 1024, // 10MB
    disabled: uploading || uploadedPhotos.length >= maxFiles,
  });

  const removePhoto = (photoId: string) => {
    setUploadedPhotos((prev) => prev.filter((p) => p.id !== photoId));
  };

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      {uploadedPhotos.length < maxFiles && (
        <Card
          {...getRootProps()}
          className={`p-8 border-2 border-dashed cursor-pointer transition-colors ${
            isDragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'
          } ${uploading ? 'opacity-50 cursor-not-allowed' : 'hover:border-primary'}`}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <Upload className="h-10 w-10 text-muted-foreground" />
            <p className="text-sm font-medium">
              {isDragActive ? 'Drop photos here...' : 'Drag & drop photos here, or click to select'}
            </p>
            <p className="text-xs text-muted-foreground">
              JPG, PNG, WEBP, HEIC up to 10MB each • {uploadedPhotos.length}/{maxFiles} uploaded
            </p>
          </div>
        </Card>
      )}

      {/* Error Message */}
      {error && (
        <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md">
          {error}
        </div>
      )}

      {/* Uploaded Photos Grid */}
      {uploadedPhotos.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {uploadedPhotos.map((photo) => (
            <div key={photo.id} className="relative group">
              <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                <img
                  src={photo.url}
                  alt={photo.filename}
                  className="w-full h-full object-cover"
                />
              </div>
              <Button
                size="icon"
                variant="destructive"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => removePhoto(photo.id)}
              >
                <X className="h-4 w-4" />
              </Button>
              <p className="mt-1 text-xs text-muted-foreground truncate">{photo.filename}</p>
            </div>
          ))}
        </div>
      )}

      {/* Loading State */}
      {uploading && (
        <div className="flex items-center justify-center p-4 text-sm text-muted-foreground">
          <ImageIcon className="h-4 w-4 mr-2 animate-pulse" />
          Uploading photos...
        </div>
      )}
    </div>
  );
}
