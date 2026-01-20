<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CheckOwner
{
    public function handle(Request $request, Closure $next)
    {
        $user = auth('api')->user();

        if (!$user || $user->role !== 'owner') {
            return response()->json([
                'message' => 'Bạn không có quyền truy cập chức năng này.'
            ], 403);
        }

        return $next($request);
    }
}
