<?php

use Inertia\Inertia;
use App\Http\Controllers\DB\Products;
use App\Http\Controllers\DB\ProductsColors;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DB\PublicProducts;

Route::get('/public_products', [PublicProducts::class, 'index']); 
Route::get('/public_products/{id}', [PublicProducts::class, 'show']); 


Route::get('/auth/api/products', [Products::class, 'index'])->middleware(['auth', 'verified']);   

Route::middleware(['auth', 'verified'])->group(function () {
    Route::post('/create-color', [ProductsColors::class, 'create_color'])->name('color_name.create');
    Route::post('/update-color/{id}', [ProductsColors::class, 'update_color'])->name('color_name.update');
    Route::post('/destroy-color/{id}', [ProductsColors::class, 'destroy_color'])->name('color_name.destroy');
    Route::get('/auth/api/get-colors', [ProductsColors::class, 'get_color'])->name('product.colors');
});
