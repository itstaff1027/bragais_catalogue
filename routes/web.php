<?php

use Inertia\Inertia;
use App\Http\Controllers\DB\Products;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\DB\PublicProducts;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Auth\RegisteredUserController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('registers'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/registers', function () {
    return Inertia::render('Auth/Registers');
})->middleware(['auth', 'verified'])->name('registers');

Route::post('/registers', [RegisteredUserController::class, 'store'])->middleware(['auth', 'verified'])->name('registers.store');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');


Route::get('/users', function () {
    return Inertia::render('Users/Page');
})->middleware(['auth', 'verified'])->name('users');

Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('/tools', function () {
        return Inertia::render('Tools/Page');
    })->name('tools');

    Route::get('/tools/create-colors', function () {
        return Inertia::render('Tools/Attributes/Colors/Page');
    })->name('create-colors');

    Route::get('/tools/create-sizes', function () {
        return Inertia::render('Tools/Attributes/Sizes/Page');
    })->name('create-sizes');

    Route::get('/tools/create-heel-heights', function () {
        return Inertia::render('Tools/Attributes/HeelHeights/Page');
    })->name('create-heel-heights');

    Route::get('/tools/create-categories', function () {
        return Inertia::render('Tools/Attributes/Categories/Page');
    })->name('create-categories');

    Route::get('/tools/create-order-types', function () {
        return Inertia::render('Tools/Attributes/OrderTypes/Page');
    })->name('create-order-types');
});


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/products', [Products::class, 'index'])->name('products');
    Route::get('/products/create-product', function () {
        return Inertia::render('Products/CreateProduct/Page');
    })->name('create-product');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/public_products', [PublicProducts::class, 'index'])->name('public_products');
Route::middleware(['web'])->group(function () {
    Route::get('/public_products/gallery/{id}', [PublicProducts::class, 'public_gallery'])->name('public_products.gallery');
});


require __DIR__.'/auth.php';
require __DIR__.'/api.php';
