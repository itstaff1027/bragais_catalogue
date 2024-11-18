<?php

namespace App\Http\Controllers\DB;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use App\Models\Products as ModelsProducts;

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
