<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ProductsColors extends Model
{
        /** @use HasFactory<\Database\Factories\UserFactory> */
        use HasFactory;

        /**
         * The attributes that are mass assignable.
         *
         * @var array<int, string>
         */
        protected $fillable = [
            'color'
        ];
        // Define the relationship with products
    public function products()
    {
        return $this->belongsToMany(Products::class, 'products_color_values', 'color_id', 'product_id')
                    ->withPivot('order_type_id');
    }

    // Define the relationship with order types
    // Define the relationship with order types (from products_color_values pivot)
    public function orderType()
    {
        return $this->belongsToMany(OrderTypes::class, 'products_color_values', 'color_id', 'order_type_id')->distinct(); // Link order_type_id from pivot table
    }
}
