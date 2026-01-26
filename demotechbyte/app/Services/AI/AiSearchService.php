<?php

namespace App\Services\AI;

use OpenAI\Laravel\Facades\OpenAI;

class AiSearchService
{
    public function analyze(string $keyword): array
    {
        $prompt = 
            "
            Bạn là hệ thống phân tích tìm kiếm phòng trọ.

            Từ câu người dùng, hãy trả về JSON với các field:
            - city (string | null)
            - max_price (number | null)
            - min_price (number | null)

            CHỈ TRẢ JSON, KHÔNG GIẢI THÍCH.

            Câu người dùng: \"$keyword\"
            "
            ;

        $response = OpenAI::chat()->create([
            'model' => 'gpt-4o-mini',
            'messages' => [
                ['role' => 'user', 
                'content' => $prompt],
            ],
            'temperature' => 0,
        ]);

        $content = $response->choices[0]->message->content;

        $content = trim($content);
        $content = preg_replace('/```json|```/', '', $content);

        return json_decode($content, true) ?? [];
    }
}
