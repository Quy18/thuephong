<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Room;
use App\Services\AI\AiSearchService;

class AiSearchController extends Controller
{
    //
    public function search(Request $request, AiSearchService $ai)
    {
        $keyword = $request->keyword;

        // 1️⃣ AI phân tích
        $filters = $ai->analyze($keyword);

        /**
         * Ví dụ $filters:
         * [
         *   'location' => 'Quận 7',
         *   'max_price' => 4000000,
         *   'amenities' => ['máy lạnh']
         * ]
         */

        // 2️⃣ Query DB
        $query = Room::query()
            ->with(['owner', 'images'])
            ->where('status', 'available');

        if (!empty($filters['city'])) {
            $query->where('city', 'like', '%' . $filters['city'] . '%');
        }

        if (!empty($filters['max_price'])) {
            $query->where('price', '<=', $filters['max_price']);
        }

        if (!empty($filters['min_price'])) {
            $query->where('price', '>=', $filters['min_price']);
        }

        // if (!empty($filters['amenities'])) {
        //     $query->whereHas('amenities', function ($q) use ($filters) {
        //         $q->whereIn('name', $filters['amenities']);
        //     });
        // }

        return response()->json([
            'data' => $query->limit(20)->get()
        ]);
    }
}
