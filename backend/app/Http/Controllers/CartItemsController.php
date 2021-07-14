<?php

namespace App\Http\Controllers;

use App\Http\Resources\CartItemResource;
use App\Models\CartItem;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

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
            'cartItems' => CartItemResource::collection($cartItems),
            'cartInfo' => $cartInfo,
        ]);
    }

    public function scynchronize(Request $request)
    {
        $cartItems = collect($request->get('cartItems', []));
        $commandId = $request->commandId;
        $userId = Auth::id();
        $cartItemsToAdd = [];
        $currentDishIds = null;

        $currentCommand = CartItem::where('user_id', $userId)->first();

        $cartItems = $cartItems->map(function ($item) use ($commandId, $userId) {
            return [
                'user_id' => $userId,
                'restaurant_command_id' => $commandId,
                'dish_id' => $item['dish_id'],
                'quantity' => $item['quantity'],
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ];
        });

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
        $cartItem = CartItem::create([
            'user_id' => Auth::id(),
            'restaurant_command_id' => $request->commandId,
            'dish_id' => $request->dishId,
            'quantity' => 1,
        ]);
        return new CartItemResource($cartItem);
    }
}
