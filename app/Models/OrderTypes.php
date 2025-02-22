<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class OrderTypes extends Model
{
        /** @use HasFactory<\Database\Factories\UserFactory> */
        use HasFactory;

        /**
         * The attributes that are mass assignable.
         *
         * @var array<int, string>
         */
        protected $fillable = [
            'name',
        ];

        // Define the relationship with colors
    public function colors()
    {
        return $this->hasMany(ProductsColors::class);
    }
}
