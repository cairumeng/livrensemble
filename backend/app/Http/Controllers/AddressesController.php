<?php

namespace App\Http\Controllers;

use App\Models\Address;
use App\Models\CartItem;
use App\Models\RestaurantCommand;
use Illuminate\Support\Facades\Auth;

class AddressesController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function index()
    {
        $cartItem = CartItem::where('user_id', Auth::id())->firstOrFail();

        $restaurantCommandId = $cartItem->restaurant_command_id;
        $restaurantCommand = RestaurantCommand::find($restaurantCommandId);
        $deliveryAddressOption = $restaurantCommand->delivery_address_option;

        $address = Address::with('city')->where('user_id', Auth::id())->first();

        if (!$address) {
            $address = new Address();
        }

        if ($deliveryAddressOption === RestaurantCommand::DELIVERY_OPTION['TO_POSITION']) {
            $address->address = $restaurantCommand->delivery_address;
        }
        return response()->json([
            'deliveryAddressOption' => $deliveryAddressOption,
            'address' => $address
        ]);
    }
}
