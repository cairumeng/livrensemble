<?php

namespace App\Http\Controllers;

use App\Models\City;
use Illuminate\Http\Request;

class CitiesController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->search;
        if (strlen($search) < 1) return response()->json([]);

        $cities = City::where('name', 'like', "${search}%")
            ->orWhere('postal_code', 'like', "${search}%")
            ->select(['id', 'name', 'postal_code'])
            ->get();

        return response()->json($cities);
    }
}
