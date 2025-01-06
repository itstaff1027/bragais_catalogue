<?php

namespace App\Models;

use App\Models\OrderTypes;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ProductsColorValues extends Model
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory;

    /**
    * The attributes that are mass assignable.
    *
    * @var array<int, string>
    */

    // protected $table = 'products_color_values';
    protected $fillable = [
        'color_id',
        'product_id',
        'order_type_id'
    ];

    public function color()
{
    return $this->belongsTo(ProductsColors::class, 'color_id');
}

public function orderType()
{
    return $this->belongsTo(OrderTypes::class, 'order_type_id');
}
}
