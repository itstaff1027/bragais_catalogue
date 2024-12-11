<?php

namespace App\Http\Controllers\DB;

use App\Http\Controllers\Controller;
use App\Models\ProductSizeValueIds as ModelsProductSizeValueIds;
use Illuminate\Http\Request;

class ProductSizeValueIds extends Controller
{
    public function index(){
        $sizes = ModelsProductSizeValueIds::all();
        return response()->json($sizes);
    }
    public function sizes_product($id){
        // Fetch all Sizes values related to the given product ID
        $sizes = ModelsProductSizeValueIds::where("product_id", "=", $id)
            ->leftJoin('products_sizes', 'products_sizes.id', '=', 'product_size_value_ids.size_value_id')
            ->select(
                'product_size_value_ids.id', 
                    'product_size_value_ids.product_id', 
                    'product_size_value_ids.size_value_id', 
                    'products_sizes.sizes'
                )
            ->get(); // Select relevant columns;
        return response()->json($sizes);
    }

    public function update_product_sizes(Request $request){
        // dd(json_decode($data, true));
        // $decodedData = json_decode($data, true);
        // dd($request);
        // dd($decodedData['Sizes_id']);
        ModelsProductSizeValueIds::create(
            ['size_value_id' => $request->size_id, 
            'product_id' => $request->product_id, 
        ]);

        return redirect()->back()->with('success', 'Successfully Added New Sizes!');
        // return response()->json([
        //     'success' => true,
        //     'message' => 'Item successfully created!',
        // ], 201);
    }

    public function destroy_product_sizes(Request $request){
        // $decodedData = json_decode($data, true);
        // dd($decodedData);
        $sizes = ModelsProductSizeValueIds::findOrFail($request->id);

        if($sizes){
            $sizes->delete();
            return redirect()->back()->with('success', 'Successfully Deleted!');
        }
        else{
            return redirect()->back()->with('error', 'Cannot Find the Sizes!');
        }
    }
}
