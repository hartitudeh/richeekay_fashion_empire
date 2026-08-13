import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const jsonPath = path.join(process.cwd(), 'src', 'data', 'userUploads.json');
    if (!fs.existsSync(jsonPath)) {
      return NextResponse.json([]);
    }
    const fileData = fs.readFileSync(jsonPath, 'utf8');
    const items = JSON.parse(fileData || '[]');
    return NextResponse.json(items);
  } catch (error) {
    console.error('Error fetching uploaded gallery items:', error);
    return NextResponse.json([]);
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const titleInput = formData.get('title') as string | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Determine extension
    let ext = 'jpg';
    if (file.name.includes('.')) {
      ext = file.name.split('.').pop() || 'jpg';
    }

    const filename = `outfit-${Date.now()}.${ext}`;
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');

    // Ensure uploads directory exists
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const filePath = path.join(uploadsDir, filename);
    fs.writeFileSync(filePath, buffer);

    // Format title
    const formattedTitle = titleInput
      ? titleInput
      : file.name
          .replace(/\.[^/.]+$/, '')
          .split(/[-_]/)
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');

    const newItem = {
      id: `user-upload-${Date.now()}`,
      title: formattedTitle || 'VIP Client Outfit Feature',
      category: 'gala-gowns',
      image: `/uploads/${filename}`,
      photographer: 'Featured VIP Client Upload',
      description: 'Submitted outfit photo wearing RICHEEKAY Haute Couture. Permanently saved to codebase.'
    };

    // Update userUploads.json
    const jsonPath = path.join(process.cwd(), 'src', 'data', 'userUploads.json');
    let existingItems = [];
    if (fs.existsSync(jsonPath)) {
      try {
        const content = fs.readFileSync(jsonPath, 'utf8');
        existingItems = JSON.parse(content || '[]');
      } catch (e) {
        existingItems = [];
      }
    }

    const updatedItems = [newItem, ...existingItems];
    fs.writeFileSync(jsonPath, JSON.stringify(updatedItems, null, 2), 'utf8');

    return NextResponse.json({ success: true, item: newItem });
  } catch (error) {
    console.error('Error saving uploaded file:', error);
    return NextResponse.json({ error: 'Failed to save file' }, { status: 500 });
  }
}
