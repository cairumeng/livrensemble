<?php

namespace Tests\Feature\Controllers;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class CartControllerTest extends TestCase
{
    public function testCartSynchronize_different_command_id()
    {
        $response = $this->post('/cart-items/synchronize', []);
        $response->assertStatus(200);
    }

    public function testCartSynchronize_same_command_id_with_different_dishes()
    {
        $response = $this->post('/cart-items/synchronize', []);
        $response->assertStatus(200);
    }

    public function testCartSynchronize_same_command_id_with_same_dishes()
    {
        $response = $this->post('/cart-items/synchronize', []);
        $response->assertStatus(200);
    }

    public function testCartSynchronize_when_carts_in_database_is_empty()
    {
    }
}
