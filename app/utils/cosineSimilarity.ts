// utils/cosineSimilarity.ts

export function cosineSimilarity(vector1: number[], vector2: number[]): number | null {
    if (vector1.length !== vector2.length) {
      console.error("Vectors must have the same length");
      return null;
    }
  
    const dotProduct = vector1.reduce((acc, val, i) => acc + val * vector2[i], 0);
    const magnitude1 = Math.sqrt(vector1.reduce((acc, val) => acc + val * val, 0));
    const magnitude2 = Math.sqrt(vector2.reduce((acc, val) => acc + val * val, 0));
  
    if (magnitude1 === 0 || magnitude2 === 0) {
      console.error("One of the vectors is zero");
      return null;
    }
  
    return dotProduct / (magnitude1 * magnitude2);
  }
  