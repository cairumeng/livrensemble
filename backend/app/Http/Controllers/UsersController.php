<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

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

    public function avatarUploader(Request $request, User $user)
    {
        $request->validate(['avatar' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048']);
        $avatar = $request->avatar;
        $avatarName = time() . '.' . $avatar->extension();
        Storage::putFileAs('images/avatars', $avatar, $avatarName, 'public');
        $path = Storage::url('images/avatars/' . $avatarName);
        $user->update(['avatar' => $path]);
        return $path;
    }

    public function changeName(Request $request, User $user)
    {
        $request->validate(['name' => 'required|min:2|max:16']);
        return $user->update(['name' => $request->name]);
    }

    public function changePassword(Request $request, User $user)
    {
        $request->validate([
            'new_password' => 'required|confirmed|min:6',
            'current_password' => ['required', function ($attributes, $value, $fail) use ($user) {
                if (!Hash::check($value, $user->password)) {
                    return $fail(__('The current password is incorrect.'));
                }
            }],
        ]);
        return $user->update([
            'password' => Hash::make($request->new_password)
        ]);
    }
}
