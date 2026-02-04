<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Events\MessageSent;
use App\Models\Message;

class MessageController extends Controller
{
    // Lấy tin nhắn
    public function index($conversationId)
    {
        $messages = Message::where('conversation_id', $conversationId)
            ->with('sender:id,name')
            ->orderBy('created_at')
            ->get();

        // đánh dấu đã đọc
        Message::where('conversation_id', $conversationId)
            ->where('sender_id', '!=', auth()->id())
            ->update(['is_read' => true]);

        return response()->json($messages);
    }

    // Gửi tin nhắn
    public function store(Request $request)
    {
        $request->validate([
            'conversation_id' => 'required|exists:conversations,id',
            'message' => 'required|string',
        ]);

        $message = Message::create([
            'conversation_id' => $request->conversation_id,
            'sender_id' => auth()->id(),
            'message' => $request->message,
            'is_read' => false
        ]);

        broadcast(new MessageSent($message))->toOthers();

        return response()->json($message);
    }
}
