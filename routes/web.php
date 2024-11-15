<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
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

Route::get('/tools', function () {
    return Inertia::render('Tools/Page');
})->middleware(['auth', 'verified'])->name('tools');

Route::get('/users', function () {
    return Inertia::render('Users/Page');
})->middleware(['auth', 'verified'])->name('users');


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/products', function () {
        return Inertia::render('Products/Page');
    })->name('products');
    Route::get('/products/create-product', function () {
        return Inertia::render('Products/CreateProduct/Page');
    })->name('create-product');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
require __DIR__.'/api.php';
