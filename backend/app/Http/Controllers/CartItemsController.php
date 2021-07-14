<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;

class CartItemsController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth']);
    }

    public function index()
    {
        $cartItems = CartItem::with('dish')->where('user_id', Auth::id())->get();

        $cartInfo = [
            'commandId' => $cartItems->first() ? $cartItems->first()->restaurant_command_id : null
        ];

        return response()->json([
            'cartItems' => $cartItems->map(function ($item) {
                return [
                    'id' => $item->id,
                    'dish_id' => $item->dish_id,
                    'quantity' => $item->quantity,
                    'name' => $item->dish->name,
                    'price' => $item->dish->price,
                    'promo' => $item->dish->promo
                ];
            }),
            'cartInfo' => $cartInfo,
        ]);
    }

    public function scynchronize(Request $request)
    {
        $dishes = $request->get('cartItems', []);
        $commandId = $request->commandId;

        $userId = Auth::id();
        $cartItemsToAdd = [];
        $cartItems = [];

        $currentDishIds = null;
        $currentCommand = CartItem::where('user_id', $userId)->first();

        $now = Carbon::now();
        foreach ($dishes as $dish) {
            $cartItems[] = [
                'user_id' => $userId,
                'restaurant_command_id' => $commandId,
                'dish_id' => $dish['id'],
                'quantity' => $dish['quantity'],
                'created_at' => $now,
                'updated_at' => $now,
            ];
        }


        if ($currentCommand && ($currentCommand['restaurant_command_id'] != $commandId)) {
            CartItem::where('user_id', $userId)->delete();
            CartItem::insert($cartItems);
        } else {
            $currentDishIds = CartItem::where('user_id', $userId)->pluck('dish_id')->toArray();
            foreach ($cartItems as $cartItem) {
                if (!$currentDishIds || !in_array($cartItem['dish_id'], $currentDishIds)) {
                    $cartItemsToAdd[] = $cartItem;
                }
            }

            CartItem::insert($cartItemsToAdd);
        }

        return $this->index();
    }

    public function update(Request $request, CartItem $cartItem)
    {
        $newQuantity = $cartItem->quantity + $request->quantity;
        if ($newQuantity <= 0) {
            return $cartItem->delete();
        }
        return $cartItem->increment('quantity', intval($request->quantity));
    }

    public function store(Request $request)
    {
        return CartItem::insert([
            'user_id' => Auth::id(),
            'restaurant_command_id' => $request->commandId,
            'dish_id' => $request->dishId,
            'quantity' => 1,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);
    }
}
