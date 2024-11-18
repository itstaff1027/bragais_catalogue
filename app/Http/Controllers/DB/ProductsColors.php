<?php

namespace App\Http\Controllers\DB;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use App\Models\ProductsColors as ModelProductsColors;

class ProductsColors extends Controller
{
    public function get_color() {
        $colors = ModelProductsColors::all();
        return response()->json($colors);
    }

    public function create_color(Request $request): RedirectResponse 
    {
        $request->validate([
            'color_name' => 'required|string|max:255',
        ]);

        ModelProductsColors::create([
            'color' => $request->color_name,
        ]);

        return redirect()->back()->with('success', 'New Color Added!');
    }

    public function update_color(Request $request, $id) {
        $request->validate([
            'color_name' => 'required|string|max:255',
        ]);
    
        $product = ModelProductsColors::findOrFail($id);
        $product->update(['color' => $request->input('color_name')]);

        return redirect()->back()->with('success', 'Updated Color!');
    }

    public function destroy_color(Request $request, $id): RedirectResponse 
    {
        $request->validate([
            'id' => 'required',
        ]);

        $color = ModelProductsColors::findOrFail($id);
        
        if($color){
            $color->delete();
            return redirect()->back()->with('success', 'Successfully Deleted!');
        }
        else{
            return redirect()->back()->with('error', 'Cannot Find the Color!');
        }
    }
}
