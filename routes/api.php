<?php

use Inertia\Inertia;
use App\Http\Controllers\DB\Products;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DB\PublicProducts;

Route::get('/public_products', [PublicProducts::class, 'index']); 
Route::get('/public_products/{id}', [PublicProducts::class, 'show']); 


Route::get('/products', [Products::class, 'index'])->middleware(['auth', 'verified']);   