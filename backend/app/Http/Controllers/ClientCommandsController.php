<?php

namespace App\Http\Controllers;

use App\Models\Address;
use App\Models\CartItem;
use Illuminate\Support\Arr;
use App\Models\ClientCommand;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;

class ClientCommandsController extends Controller
{
    public function store()
    {
        $clientCommand = DB::transaction(function () {
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
                return $item->dish->price * $item->quantity;
            });
            $attributes = [
                'user_id' => Auth::id(),
                'restaurant_command_id' => $cartItems->first()->restaurant_command_id,
                'address_id' => $address->id,
                'amount' => $amount,
                'note' => request('note')
            ];

            $clientCommand = ClientCommand::create($attributes);
            Log::debug($clientCommand->toArray());
            return $clientCommand;
        });

        return response()->json();
        // return ClientCommand::create([
        //     'user_id' => Auth::id(),
        //     // 'restaurant_command_id'=>

        // ]);
    }
}
