<?php

namespace App\Http\Controllers\DB;

use App\Http\Controllers\Controller;
use App\Models\Products as ModelsProducts;
use Illuminate\Http\Request;

class Products extends Controller
{
    public function index()
    {
        $items = ModelsProducts::all();
        return response()->json($items);
    }

    public function show($id)
    {
        $items = ModelsProducts::findOrFail($id);
        return response()->json($items);
    }

}
