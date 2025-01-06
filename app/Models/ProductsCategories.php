<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ProductsCategories extends Model
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'categories',
        'gender'
    ];

    public function products()
    {
        return $this->belongsToMany(
            Products::class,
            'products_category_values',  // Pivot table
            'category_id',               // Foreign key in pivot table for ProductsCategories
            'product_id'                 // Foreign key in pivot table for Products
        );
    }
}
