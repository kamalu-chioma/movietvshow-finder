// utils/ocr.ts

/**
 * Sends an image to the OCR API for text extraction.
 * @param imageFile - The image file to be processed by OCR.
 * @returns The extracted text from the image or null if no text is recognized.
 */
export async function extractTextFromImage(imageFile: File): Promise<string | null> {
    const formData = new FormData();
    formData.append("apikey", process.env.OCR_SPACE_API_KEY || "");
    formData.append("file", imageFile);
    formData.append("language", "eng");
    formData.append("scale", "true"); // Optional: Enable scaling for better recognition
    formData.append("OCREngine", "2"); // Optional: Use a more advanced OCR engine if supported
  
    const apiUrl = process.env.OCR_SPACE_API_URL;
    if (!apiUrl) {
      console.error("OCR API URL is not defined in environment variables.");
      return null;
    }
  
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        console.error(`OCR API request failed with status ${response.status}`);
        return null;
      }
  
      const data = await response.json();
      console.log("OCR Response:", data); // Debugging: log the OCR response
  
      // Check if ParsedResults has content
      if (data.ParsedResults && data.ParsedResults.length > 0) {
        const extractedText = data.ParsedResults[0].ParsedText;
        console.log("Extracted Text:", extractedText); // Debugging: log the extracted text
        return extractedText || null;
      } else {
        console.warn("No text was parsed from the image.");
        return null;
      }
    } catch (error) {
      console.error("Error during OCR processing:", error);
      return null;
    }
  }
  
  /**
   * Extracts likely title lines from OCR text, considering all lines that match title patterns.
   * @param text - The full text extracted by OCR.
   * @returns A single string combining all lines likely to be part of the title.
   */
  export function extractTitle(text: string): string {
    const lines = text.split('\n');
  
    // Keywords commonly found in non-title text such as credits and descriptions
    const nonTitleKeywords = [
      'Directed by', 'Produced by', 'Starring', 'Based on', 'Executive Producer',
      'Screenplay', 'Written by', 'From', 'Presented by', 'Feature', 'Company',
      'Cast', 'Music', 'Director', 'Production', 'A Warner', 'In Association With',
      'Restoration', 'Studio', 'Film', 'Feature', 'Produced', 'Screenplay'
    ];
  
    // Filter and select lines based on likely title criteria:
    // 1. Uppercase, to match movie title conventions.
    // 2. Not containing non-title keywords.
    // 3. Reasonable length, assuming titles aren’t extremely long.
    const probableTitleLines = lines.filter(line => {
      const isUpperCase = line === line.toUpperCase();
      const containsNonTitleKeyword = nonTitleKeywords.some(keyword => line.includes(keyword));
      const isReasonableLength = line.length >= 3 && line.length <= 50; // Title line should not be overly short or long
  
      return isUpperCase && !containsNonTitleKeyword && isReasonableLength;
    });
  
    // If no probable title lines were found, use the largest text segment (fallback)
    if (probableTitleLines.length === 0) {
      const fallbackTitle = lines.reduce((largest, line) => {
        return line.length > largest.length ? line : largest;
      }, "");
      console.log("Fallback Title:", fallbackTitle);
      return fallbackTitle.trim();
    }
  
    // Join probable title lines to form a single title
    const title = probableTitleLines.join(' ').trim();
    console.log("Extracted Title:", title); // Debugging: log the combined title
    return title;
  }
  