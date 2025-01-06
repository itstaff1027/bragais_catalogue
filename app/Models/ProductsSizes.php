<?php

namespace App\Models;

use App\Models\ProductsSizeValues;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ProductsSizes extends Model
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'sizes'
    ];

    public function sizeValues()
    {
        return $this->hasMany(ProductsSizeValues::class, 'size_id'); // Link order_type_id from pivot table
    }
}
