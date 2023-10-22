import vision from '@google-cloud/vision';

const client = new vision.ImageAnnotatorClient();

export async function analyzeImage(imagePath) {
  const [result] = await client.labelDetection(imagePath);
  const labels = result.labelAnnotations;
  return labels?.map(label => label.description).join(', ');
}
