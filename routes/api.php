<?php

use Inertia\Inertia;
use App\Http\Controllers\DB\ProductsHeelHeights;
use App\Http\Controllers\DB\Products;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DB\ProductsSizes;
use App\Http\Controllers\DB\ProductsColors;
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

Route::middleware(['auth', 'verified'])->group(function () {
    Route::post('/create-size', [ProductsSizes::class, 'create_size'])->name('size_name.create');
    Route::post('/update-size/{id}', [ProductsSizes::class, 'update_size'])->name('size_name.update');
    Route::post('/destroy-size/{id}', [ProductsSizes::class, 'destroy_size'])->name('size_name.destroy');
    Route::get('/auth/api/get-sizes', [ProductsSizes::class, 'get_size'])->name('product.sizes');

    Route::get('/auth/api/get-size-values/{id}', [ProductsSizes::class, 'get_size_values'])->name('product.size-values');
    Route::post('/create-size-values', [ProductsSizes::class, 'create_size_values'])->name('size_values.create');
    Route::post('/update-size-values/{id}', [ProductsSizes::class, 'update_size_values'])->name('size_values.update');
    Route::post('/destroy-size-values/{id}', [ProductsSizes::class, 'destroy_size_values'])->name('size_values.destroy');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::post('/create-HeelHeight', [ProductsHeelHeights::class, 'create_heel_height'])->name('heel_height_name.create');
    Route::post('/update-HeelHeight/{id}', [ProductsHeelHeights::class, 'update_heel_height'])->name('heel_height_name.update');
    Route::post('/destroy-HeelHeight/{id}', [ProductsHeelHeights::class, 'destroy_heel_height'])->name('heel_height_name.destroy');
    Route::get('/auth/api/get-HeelHeights', [ProductsHeelHeights::class, 'get_heel_height'])->name('product.heel_heights');
});