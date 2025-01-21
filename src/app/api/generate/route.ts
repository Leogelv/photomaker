import { NextResponse } from 'next/server';
import Replicate from 'replicate';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

const DEFAULT_NEGATIVE_PROMPT = "ugly, deformed, noisy, blurry, distorted, grainy, duplicate, double image, two heads, multiple bodies, extra limbs, poorly drawn face, poorly drawn hands, missing fingers, extra fingers, deformed hands, bad anatomy, watermark, signature, text";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const prompt = formData.get('prompt') as string;
    const file = formData.get('file') as File;
    const pose = formData.get('pose') as string;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Конвертируем файл в base64
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Image = `data:${file.type};base64,${buffer.toString('base64')}`;

    // Запускаем модель
    const output = await replicate.run(
      "fofr/consistent-character:9c77a3c2f884193fcee4d89645f02a0b9def9434f9e03cb98460456b831c8772",
      {
        input: {
          prompt: `${prompt} ${pose ? `, ${pose}` : ''}`,
          subject: base64Image,
          negative_prompt: DEFAULT_NEGATIVE_PROMPT,
          number_of_outputs: 3,
          output_format: "webp",
          output_quality: 100,
          randomise_poses: false,
          disable_safety_checker: true,
          number_of_images_per_pose: 1
        }
      }
    );

    return NextResponse.json({ urls: output });
  } catch (error) {
    console.error('Generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate images' },
      { status: 500 }
    );
  }
} 