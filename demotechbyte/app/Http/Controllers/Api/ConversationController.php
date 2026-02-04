<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Conversation;

class ConversationController extends Controller
{
    //
    // Lấy danh sách conversation của user
    public function index()
    {
        $userId = auth()->id();

        $conversations = Conversation::where('owner_id', $userId)
            ->orWhere('renter_id', $userId)
            ->with([
                'owner:id,name',
                'renter:id,name',
                'messages' => fn($q) => $q->latest()->limit(1)
            ])
            ->get();

        return response()->json($conversations);
    }

    // Tạo hoặc lấy conversation
    
    
}
