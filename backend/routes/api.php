<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::group(['prefix' => 'auth'], function ($router) {
    Route::post('login', 'AuthController@login');
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::post('me', 'AuthController@me');
});

Route::resource('users', 'UsersController')->only(['store', 'update']);
Route::post('users/{user}/upload-avatar', 'UsersController@avatarUploader');
Route::put('users/{user}/name', 'UsersController@changeName');
Route::put('users/{user}/change-password', 'UsersController@changePassword');

Route::post('password/email', 'ForgotPasswordController@forgot');
Route::post('password/reset', 'ForgotPasswordController@reset');
Route::resource('cities', 'CitiesController')->only(['index']);

Route::resource('restaurant-commands', 'RestaurantCommandsController')->only(['index', 'show']);
Route::resource('dish-categories', 'DishCategoriesController')->only(['index']);
Route::resource('cart-items', 'CartItemsController')->only(['index', 'update', 'store']);
Route::post('cart-items/scynchronize', 'CartItemsController@scynchronize');
Route::resource('addresses', 'AddressesController')->only(['index']);
Route::resource('client-commands', 'ClientCommandsController')->only(['index', 'store', 'show']);
