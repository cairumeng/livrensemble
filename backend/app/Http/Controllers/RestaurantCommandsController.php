<?php

namespace App\Http\Controllers;

use App\Models\City;
use Illuminate\Http\Request;
use App\Models\RestaurantCommand;
use App\Http\Controllers\Controller;

class RestaurantCommandsController extends Controller
{
    public function index(Request $request)
    {
        if (!$request->has('cityId')) {
            return response()->json(['commands' => []]);
        }

        $cityId = $request->cityId;
        $city = City::find($cityId);
        $commands = RestaurantCommand::with('restaurant')
            ->byStatus(RestaurantCommand::STATUS['GROUPING'])
            ->byCity($city)
            ->paginate(10);

        return response()->json([
            'city' => $city,
            'commands' => $commands
        ]);
    }

    public function show($id)
    {
        $command = RestaurantCommand::with('restaurant')->findOrFail($id);
        return response()->json([
            'command' => $command->getAttributes(),
            'restaurant' => $command->restaurant,

        ]);
    }
}
