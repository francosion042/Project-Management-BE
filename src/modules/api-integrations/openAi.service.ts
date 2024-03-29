import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { OpenAiRequestDto } from './dto/openai-request.dto';
import { EnvConfigService } from '../../envConfig/envConfig.service';

@Injectable()
export class OpenAiService {
  private readonly openai;

  constructor(private readonly envConfigService: EnvConfigService) {
    this.openai = new OpenAI({
      apiKey: envConfigService.getString('OPENAI_API_KEY'),
    });
  }

  async generateResponse(data: OpenAiRequestDto): Promise<string> {
    try {
      // Make a request to the OpenAI API
      const response = await this.openai.chat.completions.create({
        messages: [{ role: 'user', content: data.prompt }],
        model: 'gpt-3.5-turbo',
      });

      // Extract and return the generated text from the API response
      return response.choices?.[0]?.message.content || '';
    } catch (error) {
      // Handle errors (e.g., log them or throw a custom exception)
      console.error('Error generating response from OpenAI:', error.message);
      throw new Error('Failed to generate response from OpenAI.');
    }
  }
}
