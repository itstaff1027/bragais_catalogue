<?php

namespace App\Models;

use App\Models\ProductsSizes;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Products extends Model
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'model',
        'status',
    ];

    public function colors(){
        return $this->belongsToMany(ProductsColors::class, 'products_color_values', 'product_id', 'color_id')
                    ->withPivot('order_type_id');
    }

    public function categories(){
        return $this->belongsToMany(ProductsCategories::class, 'products_category_values', 'product_id', 'category_id');
    }

    public function sizes(){
        return $this->belongsToMany(ProductsSizes::class, 'product_size_value_ids', 'product_id', 'size_value_id');
    }

    public function heel_heights(){
        return $this->belongsToMany(ProductsHeelHeights::class, 'products_heel_height_values', 'product_id', 'heel_height_id');
    }
}
