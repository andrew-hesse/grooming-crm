import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { uploadToBackblaze, generatePhotoKey, isValidImageType, isValidFileSize } from '@/lib/backblaze-s3';

/**
 * POST /api/appointments/upload-photos
 * Upload photos for an appointment to Backblaze S3
 * Requires staff or admin role
 */
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();

    // Check authentication
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check user role (only staff/admin can upload)
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (!profile || !['admin', 'staff'].includes(profile.role)) {
      return NextResponse.json({ error: 'Forbidden: Insufficient permissions' }, { status: 403 });
    }

    // Parse form data
    const formData = await request.formData();
    const appointmentId = formData.get('appointmentId') as string;
    const photoFiles = formData.getAll('photos') as File[];

    if (!appointmentId) {
      return NextResponse.json({ error: 'appointmentId is required' }, { status: 400 });
    }

    if (photoFiles.length === 0) {
      return NextResponse.json({ error: 'No photos provided' }, { status: 400 });
    }

    // Verify appointment exists
    const { data: appointment } = await supabase
      .from('appointments')
      .select('id')
      .eq('id', appointmentId)
      .single();

    if (!appointment) {
      return NextResponse.json({ error: 'Appointment not found' }, { status: 404 });
    }

    // Upload photos to Backblaze and save to database
    const uploadedPhotos = [];

    for (const file of photoFiles) {
      // Validate file
      if (!isValidImageType(file.type)) {
        continue; // Skip invalid file types
      }

      if (!isValidFileSize(file.size)) {
        continue; // Skip files that are too large
      }

      // Convert file to buffer
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // Generate unique key for S3
      const photoKey = generatePhotoKey(appointmentId, file.name);

      // Upload to Backblaze
      const { url, key } = await uploadToBackblaze(buffer, photoKey, file.type);

      // Save to database
      const { data: photo, error: dbError } = await supabase
        .from('appointment_photos')
        .insert({
          appointment_id: appointmentId,
          photo_url: url,
          photo_key: key,
          uploaded_by: user.id,
          file_size: file.size,
          mime_type: file.type,
        })
        .select()
        .single();

      if (dbError) {
        console.error('Database error:', dbError);
        continue;
      }

      uploadedPhotos.push({
        id: photo.id,
        url: photo.photo_url,
        filename: file.name,
      });
    }

    return NextResponse.json({
      success: true,
      photos: uploadedPhotos,
      count: uploadedPhotos.length,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
