<?php

namespace App\Http\Controllers\DB;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use App\Models\ProductsSizes as ModelsProductsSizes;
use App\Models\ProductsSizeValues;

class ProductsSizes extends Controller
{
    public function get_size() {
        $sizes = ModelsProductsSizes::all();
        return response()->json($sizes);
    }

    public function create_size(Request $request): RedirectResponse 
    {
        $request->validate([
            'size_name' => 'required|string|max:255',
        ]);

        ModelsProductsSizes::create([
            'sizes' => $request->size_name,
        ]);

        return redirect()->back()->with('success', 'New size Added!');
    }

    public function update_size(Request $request, $id) {
        $request->validate([
            'size_name' => 'required|string|max:255',
        ]);
    
        $product = ModelsProductsSizes::findOrFail($id);
        $product->update(['sizes' => $request->input('size_name')]);

        return redirect()->back()->with('success', 'Updated size!');
    }

    public function destroy_size(Request $request, $id): RedirectResponse 
    {
        $request->validate([
            'size_name_id' => 'required',
        ]);

        $size = ModelsProductsSizes::findOrFail($id);
        
        if($size){
            $size->delete();
            return redirect()->back()->with('success', 'Successfully Deleted!');
        }
        else{
            return redirect()->back()->with('error', 'Cannot Find the size!');
        }
    }

    public function get_size_values(Request $request, $id) {

        // dd($request->id);
        // $request->validate([
        //     'id' => 'required'
        // ]);

        $size_values = ProductsSizeValues::leftJoin('products_sizes', 'products_sizes.id', '=', 'products_size_values.size_id')
        ->select('products_size_values.*', 'products_sizes.sizes') // Select relevant columns from both tables
        ->where("products_size_values.size_id", "=", $id)
        ->get();
        return response()->json($size_values);
    }

    public function create_size_values(Request $request): RedirectResponse 
    {
        $request->validate([
            'size_values' => 'required|string|max:255',
            'size_name_id' => 'required'
        ]);

        $valuesArray = explode(',', $request->size_values);

        foreach ($valuesArray as $values){
            ProductsSizeValues::create([
                'size_values' => $values,
                'size_id' => $request->size_name_id
            ]);
        }

        return redirect()->back()->with('success', 'New size Added!');
    }

    public function update_size_values(Request $request, $id) {
        $request->validate([
            'size_values' => 'required|string|max:255',
        ]);
        
        $size_values = ProductsSizeValues::findOrFail($id);
        $size_values->update(['size_values' => $request->input('size_values')]);

        return redirect()->back()->with('success', 'Updated size values!');
    }

    public function destroy_size_values(Request $request, $id): RedirectResponse 
    {
        // dd($request->id);
        $request->validate([
            'size_value_id' => 'required',
        ]);

        $size_values = ProductsSizeValues::findOrFail($id);
        
        if($size_values){
            $size_values->delete();
            return redirect()->back()->with('success', 'Successfully Deleted!');
        }
        else{
            return redirect()->back()->with('error', 'Cannot Find the size values!');
        }
    }
}
