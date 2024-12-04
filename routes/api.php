<?php

use Inertia\Inertia;
use App\Http\Controllers\DB\ProductsHeelHeights;
use App\Http\Controllers\DB\Products;
use App\Http\Controllers\DB\ProductsCategories;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DB\ProductsSizes;
use App\Http\Controllers\DB\ProductsColors;
use App\Http\Controllers\DB\PublicProducts;
use App\Http\Controllers\DB\OrderTypes;

Route::get('/public_products', [PublicProducts::class, 'index']); 
Route::get('/public_products/{id}', [PublicProducts::class, 'show']); 


Route::get('/auth/api/products', [Products::class, 'index'])->middleware(['auth', 'verified']);   

// Color
Route::middleware(['auth', 'verified'])->group(function () {
    Route::post('/create-color', [ProductsColors::class, 'create_color'])->name('color_name.create');
    Route::post('/update-color/{id}', [ProductsColors::class, 'update_color'])->name('color_name.update');
    Route::post('/destroy-color/{id}', [ProductsColors::class, 'destroy_color'])->name('color_name.destroy');
    Route::get('/auth/api/get-colors', [ProductsColors::class, 'get_color'])->name('product.colors');
});
// Sizes
Route::middleware(['auth', 'verified'])->group(function () {
    // Size Name
    Route::post('/create-size', [ProductsSizes::class, 'create_size'])->name('size_name.create');
    Route::post('/update-size/{id}', [ProductsSizes::class, 'update_size'])->name('size_name.update');
    Route::post('/destroy-size/{id}', [ProductsSizes::class, 'destroy_size'])->name('size_name.destroy');
    Route::get('/auth/api/get-sizes', [ProductsSizes::class, 'get_size'])->name('product.sizes');
    // Size Values
    Route::get('/auth/api/get-size-values/{id}', [ProductsSizes::class, 'get_size_values'])->name('product.size-values');
    Route::post('/create-size-values', [ProductsSizes::class, 'create_size_values'])->name('size_values.create');
    Route::post('/update-size-values/{id}', [ProductsSizes::class, 'update_size_values'])->name('size_values.update');
    Route::post('/destroy-size-values/{id}', [ProductsSizes::class, 'destroy_size_values'])->name('size_values.destroy');
});
// Heel Heights
Route::middleware(['auth', 'verified'])->group(function () {
    Route::post('/create-HeelHeight', [ProductsHeelHeights::class, 'create_heel_height'])->name('heel_height_name.create');
    Route::post('/update-HeelHeight/{id}', [ProductsHeelHeights::class, 'update_heel_height'])->name('heel_height_name.update');
    Route::post('/destroy-HeelHeight/{id}', [ProductsHeelHeights::class, 'destroy_heel_height'])->name('heel_height_name.destroy');
    Route::get('/auth/api/get-HeelHeights', [ProductsHeelHeights::class, 'get_heel_height'])->name('product.heel_heights');
});
// Categories
Route::middleware(['auth', 'verified'])->group(function () {
    Route::post('/create-categories', [ProductsCategories::class, 'create_categories'])->name('categories_name.create');
    Route::post('/update-categories/{id}', [ProductsCategories::class, 'update_categories'])->name('categories_name.update');
    Route::post('/destroy-categories/{id}', [ProductsCategories::class, 'destroy_categories'])->name('categories_name.destroy');
    Route::get('/auth/api/get-categories', [ProductsCategories::class, 'get_categories'])->name('product.categories');
});
// Order Types
Route::middleware(['auth', 'verified'])->group(function () {
    Route::post('/create-order_types', [OrderTypes::class, 'create_order_types'])->name('order_types_name.create');
    Route::post('/update-order_types/{id}', [OrderTypes::class, 'update_order_types'])->name('order_types_name.update');
    Route::post('/destroy-order_types/{id}', [OrderTypes::class, 'destroy_order_types'])->name('order_types_name.destroy');
    Route::get('/auth/api/get-order_types', [OrderTypes::class, 'index'])->name('product.order_types');
});

// Add Products and its components
Route::middleware(['auth', 'verified'])->group(function () {
    Route::post('/create-products', [Products::class, 'create_products'])->name('products_name.create');
    // Route::post('/update-products/{id}', [Products::class, 'update_products'])->name('products_name.update');
    // Route::post('/destroy-products/{id}', [Products::class, 'destroy_products'])->name('products_name.destroy');
    // Route::get('/auth/api/get-products', [Products::class, 'get_products'])->name('product.products');
});