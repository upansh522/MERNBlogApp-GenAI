import { GoogleGenerativeAI } from '@google/generative-ai'

class GeminiService {
    constructor() {
        this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
        this.model = this.genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" })
    }

    async generateBlogContent(title, category) {
        try {
            const prompt = `Write a comprehensive blog post about "${title}" in the ${category} category. 
            
            Please structure the content as follows:
            - Start with an engaging introduction
            - Include 3-4 main sections with detailed explanations
            - Add practical examples or code snippets where relevant
            - Include best practices and tips
            - End with a conclusion
            
            Make it informative, engaging, and suitable for a technical blog. 
            The content should be around 800-1200 words.
            Format it in HTML with proper headings (h2, h3), paragraphs, and lists where appropriate.
            Do not include the main title (h1) as it will be added separately.`

            const result = await this.model.generateContent(prompt)
            const response = await result.response
            const text = response.text()
            
            return {
                success: true,
                content: text
            }
        } catch (error) {
            console.error('Gemini API Error:', error)
            return {
                success: false,
                error: error.message || 'Failed to generate content'
            }
        }
    }
}

export default new GeminiService()