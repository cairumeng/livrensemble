<?php

namespace App\Http\Controllers;

use App\Models\Address;
use App\Models\CartItem;
use Illuminate\Support\Arr;
use App\Models\ClientCommand;
use App\Models\ClientCommandDish;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class ClientCommandsController extends Controller
{
    public function store()
    {
        $clientCommandId = DB::transaction(function () {
            $address = Address::where('user_id', Auth::id())->first();
            $addressData = Arr::only(
                request('address'),
                ['address', 'name', 'city_id', 'phone', 'wechat']
            );
            if ($address) {
                if (request('isAddressUpdated')) {
                    $address->update($addressData);
                }
            } else {
                $address = Address::create(
                    array_merge($addressData, ['user_id' => Auth::id()])
                );
            }
            $cartItems = CartItem::with('dish')->where('user_id', Auth::id())->get();
            $amount = $cartItems->sum(function ($item) {
                return $item->dish->price * (1 - $item->dish->promo) * $item->quantity;
            });
            $attributes = [
                'user_id' => Auth::id(),
                'restaurant_command_id' => $cartItems->first()->restaurant_command_id,
                'address_id' => $address->id,
                'amount' => $amount,
                'note' => request('note')
            ];

            $clientCommand = ClientCommand::create($attributes);
            $clientCommandDishes = [];
            foreach ($cartItems as $item) {
                $clientCommandDishes[] = [
                    'client_command_id' => $clientCommand->id,
                    'dish_id' => $item->dish_id,
                    'quantity' => $item->quantity,
                    'price' => $item->dish->price * (1 - $item->dish->promo),
                    'unit' => $item->dish->unit
                ];
            }
            ClientCommandDish::insert($clientCommandDishes);
            CartItem::where('user_id', Auth::id())->delete();
            return $clientCommand->id;
        });
        return response()->json(['clientCommandId' => $clientCommandId]);
    }
}
