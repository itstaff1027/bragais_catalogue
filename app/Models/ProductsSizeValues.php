<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ProductsSizeValues extends Model
{
        /** @use HasFactory<\Database\Factories\UserFactory> */
        use HasFactory;

        /**
         * The attributes that are mass assignable.
         *
         * @var array<int, string>
         */
        protected $fillable = [
            'size_values',
            'size_id'
        ];
}
