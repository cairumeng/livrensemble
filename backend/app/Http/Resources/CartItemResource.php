<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CartItemResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'dish_id' => $this->dish_id,
            'quantity' => $this->quantity,
            'name' => $this->dish->name,
            'price' => $this->dish->price,
            'promo' => $this->dish->promo
        ];
    }
}
