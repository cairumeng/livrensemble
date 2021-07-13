<?php

namespace App\Http\Controllers;

use App\Models\DishCategory;
use Illuminate\Http\Request;
use App\Models\RestaurantCommand;

class DishCategoriesController extends Controller
{
    public function index(Request $request)
    {
        if (!$request->has('commandId')) {
            return response()->json(['categories' => []]);
        }
        $restaurantId = RestaurantCommand::find($request->commandId)->restaurant_id;

        $categories = DishCategory::with('dishes')->where('restaurant_id', $restaurantId)->get();
        return response()->json([
            'categories' => $categories
        ]);
    }
}
