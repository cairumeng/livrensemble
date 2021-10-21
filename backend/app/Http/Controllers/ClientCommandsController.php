<?php

namespace App\Http\Controllers;

use App\Http\Resources\ClientCommandResource;
use App\Models\Address;
use App\Models\CartItem;
use Illuminate\Support\Arr;
use Illuminate\Http\Request;
use App\Models\ClientCommand;
use App\Models\ClientCommandDish;
use App\Models\RestaurantCommand;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class ClientCommandsController extends Controller
{
    public function index()
    {
        $clientCommands = ClientCommand::with(['restaurantCommand.restaurant', 'restaurantCommand.city'])->where('user_id', Auth::id())->paginate(10);

        return ClientCommandResource::collection($clientCommands);
    }

    public function store(Request $request)
    {
        $cartItems = CartItem::with('dish')->where('user_id', Auth::id())->get();

        $restaurantCommandId = $cartItems->first()->restaurant_command_id;

        $deliveryAddressOption = RestaurantCommand::findOrFail($restaurantCommandId)->delivery_address_option;

        $rules = [
            'address.name' => 'required|min:2',
            'address.phone' => 'required',
        ];

        if ($deliveryAddressOption == RestaurantCommand::DELIVERY_OPTION['TO_HOME']) {
            $rules['address.address'] = 'required';
            $rules['address.city_id'] = 'required';
        }

        $request->validate($rules);

        $clientCommandId = DB::transaction(function () use (&$cartItems, $restaurantCommandId, $deliveryAddressOption) {
            $amount = $cartItems->sum(function ($item) {
                return $item->dish->price * (1 - $item->dish->promo) * $item->quantity;
            });

            $addressId = null;
            if ($deliveryAddressOption == RestaurantCommand::DELIVERY_OPTION['TO_HOME']) {
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
                    Log::debug($addressData);
                    $address = Address::create(
                        array_merge($addressData, ['user_id' => Auth::id()])
                    );
                }
                $addressId = $address->id;
            }

            $attributes = [
                'user_id' => Auth::id(),
                'restaurant_command_id' => $restaurantCommandId,
                'address_id' => $addressId,
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

    public function show($id)
    {

        $result = ClientCommand::with(['restaurantCommand.restaurant', 'restaurantCommand.city'])->find($id);
        $clientCommand =  new ClientCommandResource($result);

        $clientCommandDishes = ClientCommandDish::with('dish')->where('client_command_id', $id)->get();

        $restaurantCommandId = $result->restaurant_command_id;

        $users = ClientCommand::with('user')->where('restaurant_command_id', $restaurantCommandId)->select('user_id')->get();

        return response()->json([
            'client_command' => $clientCommand,
            'client_command_dishes' => $clientCommandDishes,
            'users' => $users
        ]);
    }
}
