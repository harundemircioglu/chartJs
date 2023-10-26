<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

//CATEGORY SECTION

Route::post('createCategory', [CategoryController::class, 'createCategory']);

Route::get('getCategories', [CategoryController::class, 'getCategory']);

Route::get('getCategoryById/{id}', [CategoryController::class, 'getCategoryById']);

Route::put('updateCategory/{id}', [CategoryController::class, 'updateCategory']);

Route::delete('deleteCategory/{id}', [CategoryController::class, 'deleteCategory']);


//PRODUCT SECTION

Route::post('createProduct', [ProductController::class, 'createProduct']);

Route::get('getProducts', [ProductController::class, 'getProducts']);

Route::get('getProductById/{id}', [ProductController::class, 'getProductById']);

Route::put('updateProduct/{id}', [ProductController::class, 'updateProduct']);

Route::delete('deleteProduct/{id}', [ProductController::class, 'deleteProduct']);
