import { GoogleGenAI, Type } from "@google/genai";
import { BlogPost } from "../types";

// ATENÇÃO: Use a chave da API aqui.
const API_KEY = "AIzaSyCcWGP_Dr4Ju2K9yWvj8BW-PcZW74GiEPo";

const ai = new GoogleGenAI({ apiKey: API_KEY });

const SYSTEM_INSTRUCTION = `
Você é um editor-chefe experiente e especialista em SEO do "O Blogueiro Oficial".
Sua tarefa é criar conteúdo de blog altamente engajador, viral e otimizado para mecanismos de busca.
O tom deve ser profissional, porém acessível e inspirador.
`;

export const generateBlogIdea = async (topic: string): Promise<BlogPost> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Escreva um post de blog completo e viral sobre: ${topic}. O post deve ter um título chamativo, conteúdo estruturado e hashtags relevantes.`,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING, description: "O título viral do post" },
            content: { type: Type.STRING, description: "O conteúdo completo do post em formato Markdown" },
            tags: { type: Type.ARRAY, items: { type: Type.STRING }, description: "5 hashtags relevantes para redes sociais" },
            generatedAt: { type: Type.STRING, description: "Data atual ISO" }
          },
          required: ["title", "content", "tags"],
        }
      }
    });

    const jsonText = response.text;
    if (!jsonText) throw new Error("No content generated");
    return JSON.parse(jsonText) as BlogPost;
  } catch (error) {
    console.error("Erro ao gerar post:", error);
    throw error;
  }
};