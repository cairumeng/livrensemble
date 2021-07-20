<?php

namespace App\Http\Resources;

use Illuminate\Support\Facades\Log;
use Illuminate\Http\Resources\Json\JsonResource;

class ClientCommandResource extends JsonResource
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
            'restaurant_command' => $this->restaurantCommand->getAttributes(),
            'restaurant' => $this->restaurantCommand->restaurant->getAttributes(),
            'city' => $this->restaurantCommand->city ? $this->restaurantCommand->city->getAttributes() : [],
            'client_command' => $this->getAttributes(),
        ];
    }
}
