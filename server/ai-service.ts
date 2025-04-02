import { OpenAI } from "openai";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL || undefined,
});

// Initialize Google Gemini client
const gemini = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY || "");

// AI provider options
export type AIProvider = "openai" | "gemini";

interface GeneratePromptOptions {
  category?: string;
  userPreferences?: any;
  difficulty?: string;
  pastPrompts?: string[];
  count?: number;
  provider?: AIProvider;
}

/**
 * Generate conversation prompts using OpenAI
 */
async function generatePromptsWithOpenAI(
  options: GeneratePromptOptions
): Promise<string[]> {
  const {
    category = "General",
    userPreferences = {},
    difficulty = "Medium",
    pastPrompts = [],
    count = 1,
  } = options;

  // Build system message based on preferences and past interactions
  let systemMessage = `You are a thoughtful conversation prompt generator for an app called BondBridge that helps people build deeper relationships. 
Create ${count} thoughtful, engaging ${difficulty}-level conversation prompt${count > 1 ? "s" : ""} for the '${category}' category.`;

  if (Object.keys(userPreferences).length > 0) {
    systemMessage += `\nConsider the user's preferences: ${JSON.stringify(userPreferences)}.`;
  }

  if (pastPrompts.length > 0) {
    systemMessage += `\nHere are some prompts the user has seen before (avoid duplicating these): ${JSON.stringify(pastPrompts.slice(-5))}.`;
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemMessage },
        { role: "user", content: `Generate ${count} ${difficulty} conversation prompt${count > 1 ? "s" : ""} for the ${category} category.` }
      ],
      temperature: 0.7,
      max_tokens: 150 * count,
    });

    // Parse the generated prompts from the response
    const content = response.choices[0]?.message?.content || "";
    
    // Handle both numbered list format and line-based format
    let prompts: string[] = [];
    
    if (/^\d+\.\s/.test(content)) {
      // Numbered list format: "1. prompt\n2. prompt"
      prompts = content.split(/\n+/)
        .filter(line => /^\d+\.\s/.test(line))
        .map(line => line.replace(/^\d+\.\s/, "").trim());
    } else {
      // Simple line-based format
      prompts = content.split(/\n+/)
        .map(line => line.trim())
        .filter(line => line.length > 0);
    }
    
    return prompts.slice(0, count);
  } catch (error) {
    console.error("Error generating prompts with OpenAI:", error);
    throw new Error("Failed to generate prompts with OpenAI");
  }
}

/**
 * Generate conversation prompts using Google Gemini
 */
async function generatePromptsWithGemini(
  options: GeneratePromptOptions
): Promise<string[]> {
  const {
    category = "General",
    userPreferences = {},
    difficulty = "Medium",
    pastPrompts = [],
    count = 1,
  } = options;

  // Create prompt for Gemini
  let prompt = `You are a thoughtful conversation prompt generator for an app called BondBridge that helps people build deeper relationships. 
Create ${count} thoughtful, engaging ${difficulty}-level conversation prompt${count > 1 ? "s" : ""} for the '${category}' category.`;

  if (Object.keys(userPreferences).length > 0) {
    prompt += `\nConsider the user's preferences: ${JSON.stringify(userPreferences)}.`;
  }

  if (pastPrompts.length > 0) {
    prompt += `\nHere are some prompts the user has seen before (avoid duplicating these): ${JSON.stringify(pastPrompts.slice(-5))}.`;
  }

  prompt += `\n\nReturn ONLY the prompts, one per line without numbering or additional explanation.`;

  try {
    // Get the gemini-pro model
    const model = gemini.getGenerativeModel({ model: "gemini-pro" });
    
    // Generate content
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Split the text into individual prompts
    const prompts = text.split(/\n+/)
      .map(line => line.trim())
      .filter(line => line.length > 0 && !line.startsWith("Here") && !line.startsWith("These"));
    
    return prompts.slice(0, count);
  } catch (error) {
    console.error("Error generating prompts with Gemini:", error);
    throw new Error("Failed to generate prompts with Gemini");
  }
}

/**
 * Generate conversation prompts using the specified AI provider
 */
export async function generatePrompts(
  options: GeneratePromptOptions = {}
): Promise<string[]> {
  const provider = options.provider || "openai";
  
  try {
    if (provider === "openai") {
      return await generatePromptsWithOpenAI(options);
    } else if (provider === "gemini") {
      return await generatePromptsWithGemini(options);
    } else {
      throw new Error(`Unsupported AI provider: ${provider}`);
    }
  } catch (error) {
    console.error(`Error generating prompts with ${provider}:`, error);
    
    // If one provider fails, try the other as a fallback
    try {
      const fallbackProvider = provider === "openai" ? "gemini" : "openai";
      console.log(`Falling back to ${fallbackProvider}...`);
      
      if (fallbackProvider === "openai") {
        return await generatePromptsWithOpenAI(options);
      } else {
        return await generatePromptsWithGemini(options);
      }
    } catch (fallbackError) {
      console.error("Fallback also failed:", fallbackError);
      throw new Error("Failed to generate prompts with all available providers");
    }
  }
}