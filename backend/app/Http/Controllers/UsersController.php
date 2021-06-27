<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UsersController extends Controller
{
    public function __construct()
    {
        $this->middleware('guest')->only(['store']);
    }

    public function store(Request $request)
    {
        $request->validate([
            'email' => 'required|email|unique:users',
            'password' => 'required|confirmed|min:6'
        ]);

        return User::create([
            'role' => $request->role,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'avatar' => env('APP_URL') . '/images/avatars/default_avatar.png'
        ]);
    }
    public function update(User $user, Request $request)
    {
        $request->validate([
            'name' => 'required|max:12',
            'description' => 'required|max:512'
        ]);

        return $user->update([
            'name' => $request->name,
            'description' => $request->description
        ]);
    }
}
