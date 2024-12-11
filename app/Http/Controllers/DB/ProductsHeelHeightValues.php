<?php

namespace App\Http\Controllers\DB;

use App\Http\Controllers\Controller;
use App\Models\ProductsHeelHeightValues as ModelsProductsHeelHeightValues;
use Illuminate\Http\Request;

class ProductsHeelHeightValues extends Controller
{
    public function index(){
        $heelHeight = ModelsProductsHeelHeightValues::all();
        return response()->json($heelHeight);
    }
    public function heel_height_product($id){
        // Fetch all heelHeight values related to the given product ID
        $heelHeight = ModelsProductsHeelHeightValues::where("product_id", "=", $id)
            ->leftJoin('products_heel_heights', 'products_heel_heights.id', '=', 'products_heel_height_values.heel_height_id')
            ->select(
                'products_heel_height_values.id', 
                    'products_heel_height_values.product_id', 
                    'products_heel_height_values.heel_height_id', 
                    'products_heel_heights.heel_heights'
                )
            ->get(); // Select relevant columns;
        return response()->json($heelHeight);
    }

    public function update_product_heelHeight(Request $request){
        // dd(json_decode($data, true));
        // $decodedData = json_decode($data, true);

        // dd($decodedData['heelHeight_id']);
        ModelsProductsHeelHeightValues::create(
            ['heel_height_id' => $request->HeelHeight_id, 
            'product_id' => $request->product_id, 
        ]);

        return redirect()->back()->with('success', 'Successfully Added New heelHeight!');
        // return response()->json([
        //     'success' => true,
        //     'message' => 'Item successfully created!',
        // ], 201);
    }

    public function destroy_product_heelHeight(Request $request){
        // $decodedData = json_decode($data, true);
        // dd($decodedData);
        $heelHeight = ModelsProductsHeelHeightValues::findOrFail($request->id);

        if($heelHeight){
            $heelHeight->delete();
            return redirect()->back()->with('success', 'Successfully Deleted!');
        }
        else{
            return redirect()->back()->with('error', 'Cannot Find the heelHeight!');
        }
    }
}
