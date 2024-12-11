<?php

namespace App\Http\Controllers\DB;

use App\Http\Controllers\Controller;
use App\Models\ProductsColorValues as ModelsProductsColorValues;
use Illuminate\Http\Request;

class ProductsColorValues extends Controller
{
    public function index(){
        $color = ModelsProductsColorValues::all();
        return response()->json($color);
    }
    public function color_product($id){
        // Fetch all color values related to the given product ID
        // $product_with_color = ModelsProductsColorValues::where('product_id', 5)
        //     ->leftJoin('products_colors', 'products_colors.id', '=', 'products_color_values.color_id')
        //     ->select('products_color_values.*', 'products_colors.*') // Select relevant columns
        //     ->get();
            
        // // Check if the product with color data exists
        // if ($product_with_color->isEmpty()) {
        //     return response()->json(['message' => 'No colors found for this product'], 404);
        // }

        // $color = ModelsProductsColorValues::all();
    
        // return response()->json($product_with_color);
        $color = ModelsProductsColorValues::where("product_id", "=", $id)
            ->leftJoin('products_colors', 'products_colors.id', '=', 'products_color_values.color_id')
            ->select(
                'products_color_values.id', 
                    'products_color_values.product_id', 
                    'products_color_values.color_id', 
                    'products_color_values.order_type_id', 
                    'products_colors.color'
                )
            ->get(); // Select relevant columns;
        return response()->json($color);
    }

    public function update_product_color(Request $request){
        // dd($request->color_id);
        // $decodedData = json_decode($request, true);

        // dd($decodedData['color_id']);
        ModelsProductsColorValues::create([
            'color_id' => $request->color_id, 
            'product_id' => $request->product_id, 
            'order_type_id' => 0 
        ]);

        // return redirect()->back()->with('success', 'Successfully Added New Color!');
        if ($request->header('X-Inertia')) {
            return redirect()->back()->with('success', 'Successfully Added New Color!');
        }
    
        return response()->json([
            'success' => true,
            'message' => 'Item successfully created!',
        ], 201);
    }

    public function destroy_product_color(Request $request){
        // $decodedData = json_decode($data, true);
        // dd($decodedData);
        $color = ModelsProductsColorValues::findOrFail($request->id);

        if($color){
            $color->delete();
            return redirect()->back()->with('success', 'Successfully Deleted!');
        }
        else{
            return redirect()->back()->with('error', 'Cannot Find the Color!');
        }
    }
}
