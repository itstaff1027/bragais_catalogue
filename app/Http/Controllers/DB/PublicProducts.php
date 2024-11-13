<?php

namespace App\Http\Controllers\DB;

use App\Http\Controllers\Controller;
use App\Models\PublicProducts as ModelsPublicProducts;
use Illuminate\Http\Request;

class PublicProducts extends Controller
{
    public function index()
    {
        $items = ModelsPublicProducts::leftJoin(
            'products', 
            'products.id', 
            '=', 
            'public_product.product_id'
        )->select(
            'products.model',
        )->groupBy('products.model')
        ->get();
        return response()->json($items);
    }

    public function show($id)
    {
        $items = ModelsPublicProducts::leftJoin(
            'products', 
            'products.id', 
            '=', 
            'public_product.product_id'
        )->select(
            'products.model',
            'products.category',
        )->where(
            'public_product.product_id', '=', $id
        )->get();
        return response()->json($items);
    }
}
