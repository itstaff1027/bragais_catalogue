<?php

namespace App\Http\Controllers\DB;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use App\Models\ProductsHeelHeights as ModelsProductsHeelHeights;

class ProductsHeelHeights extends Controller
{
    public function get_heel_height() {
        $heel_heights = ModelsProductsHeelHeights::all();
        return response()->json($heel_heights);
    }

    public function create_heel_height(Request $request): RedirectResponse 
    {
        $request->validate([
            'heel_height_value' => 'required|string|max:255',
        ]);

        ModelsProductsHeelHeights::create([
            'heel_heights' => $request->heel_height_value,
        ]);

        return redirect()->back()->with('success', 'New heel_height Added!');
    }

    public function update_heel_height(Request $request, $id) {
        $request->validate([
            'heel_height_value' => 'required|string|max:255',
        ]);
    
        $product = ModelsProductsHeelHeights::findOrFail($id);
        $product->update(['heel_heights' => $request->input('heel_height_value')]);

        return redirect()->back()->with('success', 'Updated Heel Height!');
    }

    public function destroy_heel_height(Request $request, $id): RedirectResponse 
    {
        $request->validate([
            'id' => 'required',
        ]);

        $heel_height = ModelsProductsHeelHeights::findOrFail($id);
        
        if($heel_height){
            $heel_height->delete();
            return redirect()->back()->with('success', 'Successfully Deleted!');
        }
        else{
            return redirect()->back()->with('error', 'Cannot Find the Heel Height!');
        }
    }
}
