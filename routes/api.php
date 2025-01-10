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
use App\Http\Controllers\DB\ProductsColorValues;
use App\Http\Controllers\DB\ProductsHeelHeightValues;
use App\Http\Controllers\DB\ProductSizeValueIds;
use App\Http\Controllers\ImageUploader;
use App\Http\Controllers\Tools\ToolsController;

Route::get('/public_products/{id}', [PublicProducts::class, 'show']); 
Route::get('/public/get-categories', [PublicProducts::class, 'get_categories'])->name('public-product.categories');

Route::get('/auth/api/products', [Products::class, 'index'])->middleware(['auth', 'verified']);   

Route::post('/upload-image', [ImageUploader::class, 'upload'])->middleware(['auth', 'verified'])->name('upload.image');
Route::post('/upload-image-section', [ImageUploader::class, 'upload_image_section'])->middleware(['auth', 'verified'])->name('upload.image_section');
Route::post('/update-image-section', [ImageUploader::class, 'update_image_section'])->middleware(['auth', 'verified'])->name('upload.updated_image_section');
Route::post('/destroy-image-scrollable', [ImageUploader::class, 'destroy_image_scrollable'])->middleware(['auth', 'verified'])->name('destroy.image_section');

// Color
Route::middleware(['auth', 'verified'])->group(function () {
    Route::post('/create-color', [ProductsColors::class, 'create_color'])->name('color_name.create');
    Route::post('/update-color/{id}', [ProductsColors::class, 'update_color'])->name('color_name.update');
    Route::post('/destroy-color/{id}', [ProductsColors::class, 'destroy_color'])->name('color_name.destroy');
    Route::get('/auth/api/get-colors', [ProductsColors::class, 'get_color'])->name('product.colors');
    // Route::post('/product_with_color/{id}', [ProductsColors::class, 'get_product_with_color'])->name('product_with.colors');
});

// Color Values
Route::middleware(['auth', 'verified'])->group(function () {
    // Route::post('/create-color', [ProductsColors::class, 'create_color'])->name('color_name.create');
    Route::post('/update-product-color', [ProductsColorValues::class, 'update_product_color'])->name('add_product.color');
    Route::post('/destroy-product-color', [ProductsColorValues::class, 'destroy_product_color'])->name('remove_product.color');
    Route::get('/product-selected-colors/{id}', [ProductsColorValues::class, 'color_product'])->name('color_product');
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

// Sizes Values with Product Ids
Route::middleware(['auth', 'verified'])->group(function () {
    // Route::post('/create-HeelHeight', [ProductsHeelHeights::class, 'create_heel_height'])->name('heel_height_name.create');
    Route::post('/update-Sizes', [ProductSizeValueIds::class, 'update_product_sizes'])->name('sizes_product.update');
    Route::post('/destroy-Sizes', [ProductSizeValueIds::class, 'destroy_product_sizes'])->name('sizes_product.destroy');
    Route::get('/product_selected_sizes/{id}', [ProductSizeValueIds::class, 'sizes_product'])->name('sizes_product');
});

// Heel Heights
Route::middleware(['auth', 'verified'])->group(function () {
    Route::post('/create-HeelHeight', [ProductsHeelHeights::class, 'create_heel_height'])->name('heel_height_name.create');
    Route::post('/update-HeelHeight/{id}', [ProductsHeelHeights::class, 'update_heel_height'])->name('heel_height_name.update');
    Route::post('/destroy-HeelHeight/{id}', [ProductsHeelHeights::class, 'destroy_heel_height'])->name('heel_height_name.destroy');
    Route::get('/auth/api/get-HeelHeights', [ProductsHeelHeights::class, 'get_heel_height'])->name('product.heel_heights');
});

// Heel Height Values
Route::middleware(['auth', 'verified'])->group(function () {
    // Route::post('/create-HeelHeight', [ProductsHeelHeights::class, 'create_heel_height'])->name('heel_height_name.create');
    Route::post('/update-HeelHeight', [ProductsHeelHeightValues::class, 'update_product_heelHeight'])->name('heel_height_product.update');
    Route::post('/destroy-HeelHeight', [ProductsHeelHeightValues::class, 'destroy_product_heelHeight'])->name('heel_height_product.destroy');
    Route::get('/product_selected_heel_heights/{id}', [ProductsHeelHeightValues::class, 'heel_height_product'])->name('heel_height_product');
});

// Categories
Route::middleware(['auth', 'verified'])->group(function () {
    Route::post('/create-categories', [ProductsCategories::class, 'create_categories'])->name('categories_name.create');
    Route::post('/update-categories/{id}', [ProductsCategories::class, 'update_categories'])->name('categories_name.update');
    Route::post('/update-categories-gender/{id}', [ProductsCategories::class, 'update_categories_gender'])->name('categories_gender.update');
    Route::post('/destroy-categories/{id}', [ProductsCategories::class, 'destroy_categories'])->name('categories_name.destroy');
    Route::get('/auth/api/get-categories', [ProductsCategories::class, 'get_categories'])->name('product.categories');

    Route::post('/update-product-category', [ProductsCategories::class, 'update_product_category'])->name('update_product.category');
});
// Order Types
Route::middleware(['auth', 'verified'])->group(function () {
    Route::post('/create-order_types', [OrderTypes::class, 'create_order_types'])->name('order_types_name.create');
    Route::post('/update-order_types/{id}', [OrderTypes::class, 'update_order_types'])->name('order_types_name.update');
    Route::post('/destroy-order_types/{id}', [OrderTypes::class, 'destroy_order_types'])->name('order_types_name.destroy');
    Route::get('/auth/api/get-order_types', [OrderTypes::class, 'index'])->name('product.order_types');

    // Route::get('/product_color_selected_order_type', [ProductsColorValues::class, 'get_selected_order_type'])->name('colors.order_type');
    Route::post('/update-product_color_order_types', [ProductsColorValues::class, 'update_color_product_order_types'])->name('update_product_color.order_type');
});

// Page Sections
Route::middleware(['auth', 'verified'])->group(function () {
    Route::post('/create-page_sections', [ToolsController::class, 'create_page_sections'])->name('page_sections_name.create');
    Route::post('/update-page_sections/{id}', [ToolsController::class, 'update_page_sections'])->name('page_sections_name.update');
    Route::post('/destroy-page_sections/{id}', [ToolsController::class, 'destroy_page_sections'])->name('page_sections_name.destroy');
});

// Add Products and its components
Route::middleware(['auth', 'verified'])->group(function () {
    Route::post('/create-products', [Products::class, 'create_products'])->name('products_name.create');
    Route::post('/update-status', [Products::class, 'update_status'])->name('product_update.status');
    Route::post('/update-model', [Products::class, 'update_model'])->name('update_product.model');
    Route::get('/edit-products/{id}', [Products::class, 'edit_product'])->name('product.edit');

    // get remove and add images
    Route::get('/get/product-keys/{id}', [Products::class, 'get_product_keys'])->name('storage.product_keys');
    Route::post('/create/product-keys/{id}', [Products::class, 'create_product_keys'])->name('storage_create.product_keys');
    Route::post('/remove_product_images', [Products::class, 'destroy_product_keys'])->name('product_image.destroy');

    // Route::post('/destroy-products/{id}', [Products::class, 'destroy_products'])->name('products_name.destroy');
    Route::get('/auth/api/get-products', [Products::class, 'index'])->name('all_product');
});